// 🔥 Firebase Synchronization Module - Modular SDK
// Obsługuje logowanie i synchronizację danych między urządzeniami

import { auth, db, onAuthStateChanged } from './firebase-config.js';
import { 
    signInWithPopup, 
    GoogleAuthProvider, 
    signOut 
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { 
    doc, 
    getDoc, 
    setDoc, 
    onSnapshot,
    serverTimestamp 
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

let currentUser = null;
let unsubscribeSnapshot = null;

// Expose for diagnostics in UI
window.firebaseCurrentUser = null;
window.firebaseRealtimeSyncActive = false;
window.firebaseLastError = null;
window.firebaseLastWriteAttempt = null;
window.firebaseLastReadAttempt = null;

// Update sync status in UI
function updateSyncStatus(status, message, icon) {
    const syncStatus = document.getElementById('syncStatus');
    const syncStatusIcon = document.getElementById('syncStatusIcon');
    const syncStatusText = document.getElementById('syncStatusText');
    
    if (syncStatus && syncStatusIcon && syncStatusText) {
        syncStatus.style.display = 'flex';
        syncStatus.style.alignItems = 'center';
        syncStatus.style.gap = '0.5rem';
        syncStatusIcon.textContent = icon;
        syncStatusText.textContent = message;
        
        // Color based on status
        if (status === 'connected') {
            syncStatus.style.background = '#d4edda';
            syncStatus.style.color = '#155724';
        } else if (status === 'error') {
            syncStatus.style.background = '#f8d7da';
            syncStatus.style.color = '#721c24';
        } else if (status === 'syncing') {
            syncStatus.style.background = '#fff3cd';
            syncStatus.style.color = '#856404';
        } else {
            syncStatus.style.background = 'var(--hover-bg)';
            syncStatus.style.color = 'var(--text-primary)';
        }
    }
}

window.updateSyncStatus = updateSyncStatus;

// Smart merge helper: merges local and cloud data structures with simple rules:
// - For per-day maps (steps, studyHours, mood, completedTasks): union keys; for conflicts prefer source with newer lastModified timestamps if present, otherwise prefer non-empty values and cloud by default.
// - For arrays like completedDays: union + dedupe + sort.
// - For objects like badges/gallery: merge keys and prefer cloud when unsure.
function smartMergeData(local, cloud, cloudLastModified = 0) {
    if (!local) return cloud || {};
    if (!cloud) return local;

    const merged = { ...local };

    // Helper to merge maps (per-date)
    function mergeMaps(key) {
        merged[key] = merged[key] || {};
        const localMap = local[key] || {};
        const cloudMap = cloud[key] || {};
        const allKeys = Array.from(new Set([...Object.keys(localMap), ...Object.keys(cloudMap)]));
        allKeys.forEach(k => {
            const lv = localMap[k];
            const cv = cloudMap[k];
            if (lv === undefined) merged[key][k] = cv;
            else if (cv === undefined) merged[key][k] = lv;
            else {
                // Conflict: prefer the side with newer overall timestamp
                if ((local.lastModified || 0) > (cloudLastModified || 0)) merged[key][k] = lv;
                else merged[key][k] = cv;
            }
        });
    }

    // Merge per-day maps
    ['steps', 'studyHours', 'mood', 'completedTasks'].forEach(k => mergeMaps(k));

    // Merge completedDays (array) - union, dedupe, sort
    const localDays = Array.isArray(local.challenge?.completedDays) ? local.challenge.completedDays : [];
    const cloudDays = Array.isArray(cloud.challenge?.completedDays) ? cloud.challenge.completedDays : [];
    const mergedDays = Array.from(new Set([...localDays, ...cloudDays])).sort();
    merged.challenge = merged.challenge || {};
    merged.challenge.completedDays = mergedDays;

    // Merge challenge scalar fields: prefer the newest source
    merged.challenge.currentDay = (local.challenge?.currentDay || 0);
    if (cloud.challenge?.currentDay && cloudLastModified > (local.lastModified || 0)) {
        merged.challenge.currentDay = cloud.challenge.currentDay;
    }
    merged.challenge.totalDays = cloud.challenge?.totalDays || local.challenge?.totalDays || merged.challenge.totalDays || 75;
    
    // Preserve startDate - zawsze zachowaj z local jeśli istnieje
    merged.challenge.startDate = local.challenge?.startDate || cloud.challenge?.startDate;
    
    // Preserve completion/reset times
    if (local.challenge?.completionTime || cloud.challenge?.completionTime) {
        merged.challenge.completionTime = local.challenge?.completionTime || cloud.challenge?.completionTime;
    }
    if (local.challenge?.resetScheduled || cloud.challenge?.resetScheduled) {
        merged.challenge.resetScheduled = local.challenge?.resetScheduled || cloud.challenge?.resetScheduled;
    }

    // Merge tasks array (prefer longest / cloud if conflict)
    merged.tasks = cloud.tasks || local.tasks;
    
    // Merge weeklyTasks - zachowaj pełną strukturę
    if (local.weeklyTasks || cloud.weeklyTasks) {
        merged.weeklyTasks = {
            enabled: (cloudLastModified > (local.lastModified || 0)) 
                ? (cloud.weeklyTasks?.enabled ?? local.weeklyTasks?.enabled ?? false)
                : (local.weeklyTasks?.enabled ?? cloud.weeklyTasks?.enabled ?? false),
            monday: [...new Set([...(local.weeklyTasks?.monday || []), ...(cloud.weeklyTasks?.monday || [])])],
            tuesday: [...new Set([...(local.weeklyTasks?.tuesday || []), ...(cloud.weeklyTasks?.tuesday || [])])],
            wednesday: [...new Set([...(local.weeklyTasks?.wednesday || []), ...(cloud.weeklyTasks?.wednesday || [])])],
            thursday: [...new Set([...(local.weeklyTasks?.thursday || []), ...(cloud.weeklyTasks?.thursday || [])])],
            friday: [...new Set([...(local.weeklyTasks?.friday || []), ...(cloud.weeklyTasks?.friday || [])])],
            saturday: [...new Set([...(local.weeklyTasks?.saturday || []), ...(cloud.weeklyTasks?.saturday || [])])],
            sunday: [...new Set([...(local.weeklyTasks?.sunday || []), ...(cloud.weeklyTasks?.sunday || [])])]
        };
    }

    // Merge badges and gallery (shallow merge)
    merged.badges = { ...(local.badges || {}), ...(cloud.badges || {}) };
    merged.gallery = Array.isArray(local.gallery) || Array.isArray(cloud.gallery)
        ? Array.from(new Set([...(local.gallery || []), ...(cloud.gallery || [])]))
        : (cloud.gallery || local.gallery);

    // Merge settings: inteligentne łączenie, preferuj lokalne gdy są nowsze
    if (cloudLastModified > (local.lastModified || 0)) {
        // Cloud jest nowszy - użyj cloud, ale zachowaj lokalne jeśli cloud nie ma
        merged.settings = { ...(local.settings || {}), ...(cloud.settings || {}) };
    } else {
        // Local jest nowszy - użyj local, ale zachowaj cloud jeśli local nie ma
        merged.settings = { ...(cloud.settings || {}), ...(local.settings || {}) };
    }

    // Streak & longestStreak - zawsze bierz większe wartości (najlepsze osiągnięcia)
    merged.streak = Math.max(cloud.streak || 0, local.streak || 0);
    merged.longestStreak = Math.max(cloud.longestStreak || 0, local.longestStreak || 0);
    merged.lastModified = Math.max(local.lastModified || 0, cloud.lastModified || 0, Date.now());

    return merged;
}

// ======================
// AUTHENTICATION
// ======================

function setupAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    console.log('🔧 Setting up auth UI...');
    console.log('Login button:', loginBtn);
    console.log('Logout button:', logoutBtn);
    
    if (loginBtn) {
        console.log('✅ Adding click listener to login button');
        loginBtn.addEventListener('click', loginWithGoogle);
    } else {
        console.error('❌ Login button not found!');
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
}

async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    
    try {
        updateSyncStatus('syncing', 'Logowanie...', '⏳');
        if (typeof playClickSound === 'function') playClickSound();
        const result = await signInWithPopup(auth, provider);
        console.log('✅ Logged in as:', result.user.email);
        updateSyncStatus('connected', 'Połączono', '✅');
        if (typeof showNotification === 'function') {
            showNotification('🎉 Zalogowano pomyślnie!', 'success');
        }
    } catch (error) {
        console.error('❌ Login error:', error);
        window.firebaseLastError = error.message;
        updateSyncStatus('error', 'Błąd logowania', '❌');
        
        if (error.code === 'auth/popup-blocked') {
            if (typeof showNotification === 'function') {
                showNotification('⚠️ Odblokuj wyskakujące okna aby się zalogować', 'warning');
            }
        } else if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-closed-by-user') {
            updateSyncStatus('disconnected', 'Anulowano', '⚠️');
            // User zamknął okno - nic nie rób
        } else {
            if (typeof showNotification === 'function') {
                showNotification('❌ Błąd logowania: ' + error.message, 'error');
            }
        }
    }
}

async function logout() {
    try {
        if (typeof playClickSound === 'function') playClickSound();
        await signOut(auth);
        updateSyncStatus('disconnected', 'Rozłączono', '⚠️');
        if (typeof showNotification === 'function') {
            showNotification('👋 Wylogowano pomyślnie', 'success');
        }
    } catch (error) {
        console.error('❌ Logout error:', error);
        window.firebaseLastError = error.message;
        updateSyncStatus('error', 'Błąd wylogowania', '❌');
        if (typeof showNotification === 'function') {
            showNotification('❌ Błąd wylogowania', 'error');
        }
    }
}

// ======================
// USER STATE CALLBACKS
// ======================

function onUserLogin(user) {
    currentUser = user;
    window.firebaseCurrentUser = user; // Expose for diagnostics
    
    // Pokaż info o użytkowniku
    const loginBtn = document.getElementById('loginBtn');
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    const userPhoto = document.getElementById('userPhoto');
    
    if (loginBtn) loginBtn.style.display = 'none';
    if (userInfo) userInfo.style.display = 'flex';
    if (userName) userName.textContent = user.displayName || user.email;
    if (userPhoto) userPhoto.src = user.photoURL || 'https://via.placeholder.com/36';
    
    // Załaduj dane z Firestore i ZAWSZE uruchom realtime sync
    (async () => {
        try {
            updateSyncStatus('syncing', 'Synchronizacja...', '🔄');
            await loadDataFromFirestore();
            updateSyncStatus('connected', 'Połączono', '✅');
        } catch (err) {
            console.error('❌ Error during initial cloud load:', err);
            window.firebaseLastError = err.message;
            updateSyncStatus('error', 'Błąd synchronizacji', '❌');
        }
        
        // ZAWSZE uruchom realtime sync po zalogowaniu
        // (nawet jeśli load był pominięty z powodu deletionReload)
        try {
            setupRealtimeSync();
            console.log('✅ Realtime sync setup completed');
            updateSyncStatus('connected', 'Synchronizacja aktywna', '✅');
        } catch (e) {
            console.error('❌ Failed to setup realtime sync:', e);
            window.firebaseLastError = e.message;
            updateSyncStatus('error', 'Błąd realtime sync', '❌');
        }
    })();
}

function onUserLogout() {
    currentUser = null;
    window.firebaseCurrentUser = null; // Clear diagnostics
    window.firebaseRealtimeSyncActive = false;
    
    // Hide sync status
    const syncStatus = document.getElementById('syncStatus');
    if (syncStatus) syncStatus.style.display = 'none';
    
    // Pokaż przycisk logowania
    const loginBtn = document.getElementById('loginBtn');
    const userInfo = document.getElementById('userInfo');
    
    if (loginBtn) loginBtn.style.display = 'block';
    if (userInfo) userInfo.style.display = 'none';
    
    // Zatrzymaj nasłuchiwanie
    if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
        unsubscribeSnapshot = null;
        window.firebaseRealtimeSyncActive = false;
    }
}

// ======================
// FIRESTORE SYNC
// ======================

async function loadDataFromFirestore() {
    if (!currentUser) return;
    
    window.firebaseLastReadAttempt = new Date().toISOString();
    
    // Sprawdź czy właśnie usunęliśmy dane (zapobiega pętli)
    const justDeleted = sessionStorage.getItem('deletionReload');
    if (justDeleted) {
        console.log('⚠️ Skipping load after deletion to prevent loop');
        // Nie usuwamy jeszcze flagi — zostanie usunięta dopiero gdy
        // realtime sync zobaczy, że dane nie są usunięte (lub po bezpiecznym czasie).
        return false;
    }
    
    // Sprawdź czy już poinformowaliśmy użytkownika o usunięciu w chmurze — jeśli tak, pomiń dalsze ostrzeżenia
    const alreadyNotifiedDeletion = sessionStorage.getItem('cloudDeletionPending');
    
    try {
        const docRef = doc(db, 'users', currentUser.uid);
        console.log('📖 Attempting to read from Firestore, user:', currentUser.uid);
        const docSnap = await getDoc(docRef);
        console.log('📖 Firestore read successful, exists:', docSnap.exists());
        
            if (docSnap.exists()) {
            const cloudData = docSnap.data();
            console.log('☁️ Loaded data from cloud:', cloudData);
            
            // Sprawdź czy dane nie zostały usunięte
            if (cloudData.deleted === true || cloudData.data === null) {
                console.log('🗑️ Dane zostały usunięte w chmurze - robię backup lokalnych danych');
                try {
                    // Zachowaj kopię lokalnych danych przed ewentualnym czyszczeniem
                    const prev = localStorage.getItem('kawaiiQuestData');
                    if (prev) localStorage.setItem('kawaiiQuestData_cloudDeletionBackup', prev);
                } catch (e) {
                    console.warn('⚠️ Nie udało się utworzyć backupu lokalnego przed czyszczeniem:', e);
                }

                // Pokaż powiadomienie TYLKO raz (jeśli nie było wcześniej ustawione)
                // KOMUNIKAT USUNIĘTY - nie pokazuj ostrzeżeń które mogą być mylące
                // if (!alreadyNotifiedDeletion) {
                //     sessionStorage.setItem('cloudDeletionPending', 'true');
                //     if (typeof showNotification === 'function') {
                //         showNotification('⚠️ Twoje dane zostały usunięte z chmury. Lokalna kopia została zapisana jako backup. Sprawdź ustawienia synchronizacji.', 'warning');
                //     }
                // }

                // Zwróć false żeby caller wiedział, że pominięto ładowanie
                return false;
            }
            
            // Jeśli dane są OK, wyczyść flagę cloudDeletionPending (user odzyskał dostęp do danych)
            if (alreadyNotifiedDeletion) {
                sessionStorage.removeItem('cloudDeletionPending');
                console.log('✅ Cloud data restored, clearing cloudDeletionPending flag');
            }
            
            // Merge z lokalnymi danymi (na wypadek offline changes)
            const localData = localStorage.getItem('kawaiiQuestData');
            if (localData) {
                const local = JSON.parse(localData);
                // Jeśli lokalne dane są nowsze, użyj ich
                if (local.lastModified && cloudData.lastModified) {
                    if (local.lastModified > cloudData.lastModified) {
                        console.log('📱 Local data is newer, syncing to cloud...');
                        await saveDataToFirestore();
                        return true;
                    }
                }
            }
            
            // Załaduj dane z chmury TYLKO jeśli nie są puste
            if (typeof AppData !== 'undefined' && cloudData.data) {
                // Zabezpieczenie: sprawdź czy dane z chmury nie są puste
                const hasData = cloudData.data.challenge || 
                               cloudData.data.steps || 
                               cloudData.data.tasks || 
                               cloudData.data.completedTasks;
                
                if (hasData) {
                    // Use smart merge to minimize conflicts between devices
                    const merged = smartMergeData(AppData, cloudData.data, cloudData.lastModified || 0);
                    Object.assign(AppData, merged);
                    localStorage.setItem('kawaiiQuestData', JSON.stringify(AppData));
                    if (typeof updateAllDisplays === 'function') {
                        updateAllDisplays();
                    }
                } else {
                    console.log('⚠️ Cloud data is empty, keeping local data');
                }
            }
            
            // USUNIĘTE: Powiadomienie przy każdym wczytaniu (irytujące)
            // if (typeof showNotification === 'function') {
            //     showNotification('☁️ Dane załadowane z chmury', 'success');
            // }
            return true;
        } else {
            console.log('📝 No cloud data found, creating new document');
            // Pierwsza synchronizacja - zapisz lokalne dane do chmury
            await saveDataToFirestore();
            return true;
        }
    } catch (error) {
        console.error('❌ Error loading from Firestore:', error);
        console.error('❌ Error code:', error.code);
        console.error('❌ Error message:', error.message);
        window.firebaseLastError = `READ: ${error.code} - ${error.message}`;
        
        if (error.code === 'permission-denied') {
            if (typeof showNotification === 'function') {
                showNotification('🔒 Brak uprawnień odczytu Firestore! Sprawdź reguły bezpieczeństwa.', 'error');
            }
        } else {
            // Komunikat usunięty - nie pokazuj ostrzeżenia jeśli to tylko tymczasowy błąd sieci
            console.log('ℹ️ Błąd ładowania z chmury (może być tymczasowy):', error.code);
        }
        return false;
    }
}

// Manual sync helpers exposed to UI
async function syncNow() {
    if (!currentUser) return await saveDataToFirestore();
    // Try a pull then push merged
    await loadDataFromFirestore();
    await saveDataToFirestore();
}

async function forcePull() {
    // Force reloading from cloud ignoring local lastModified
    if (!currentUser) return;
    const docRef = doc(db, 'users', currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const cloud = docSnap.data();
        if (cloud.data) {
            const merged = smartMergeData(AppData, cloud.data, cloud.lastModified || 0);
            Object.assign(AppData, merged);
            localStorage.setItem('kawaiiQuestData', JSON.stringify(AppData));
            if (typeof updateAllDisplays === 'function') updateAllDisplays();
        }
    }
}

async function forcePush() {
    if (!currentUser) return;
    await saveDataToFirestore();
}

// Expose for UI
window.syncNow = syncNow;
window.forcePull = forcePull;
window.forcePush = forcePush;

async function saveDataToFirestore() {
    if (!currentUser) {
        // Nie ma użytkownika - zapisz tylko lokalnie
        if (typeof AppData !== 'undefined') {
            AppData.lastModified = Date.now();
            localStorage.setItem('kawaiiQuestData', JSON.stringify(AppData));
        }
        return;
    }
    
    window.firebaseLastWriteAttempt = new Date().toISOString();
    
    // Zabezpieczenie: nie zapisuj pustych danych
    if (typeof AppData === 'undefined') {
        console.warn('⚠️ AppData is undefined - skipping Firebase save');
        return;
    }
    
    const hasData = AppData.challenge || 
                   AppData.steps || 
                   AppData.tasks || 
                   AppData.completedTasks;
    
    if (!hasData) {
        console.warn('⚠️ AppData is empty - skipping Firebase save to prevent data loss');
        return;
    }
    
    try {
        const docRef = doc(db, 'users', currentUser.uid);
        
        // Dodaj timestamp do AppData
        if (typeof AppData !== 'undefined') {
            AppData.lastModified = Date.now();
        }
        
        console.log('💾 Attempting to write to Firestore, user:', currentUser.uid);
        console.log('💾 Data size:', JSON.stringify(AppData).length, 'bytes');
        
        await setDoc(docRef, {
            data: AppData,
            lastModified: AppData.lastModified,
            email: currentUser.email,
            updatedAt: serverTimestamp()
        }, { merge: true });
        
        console.log('✅ Data saved to cloud successfully');
        window.firebaseLastError = null; // Clear error on success
        
        // Zapisz też lokalnie jako backup
        localStorage.setItem('kawaiiQuestData', JSON.stringify(AppData));
    } catch (error) {
        console.error('❌ Error saving to Firestore:', error);
        console.error('❌ Error code:', error.code);
        console.error('❌ Error message:', error.message);
        window.firebaseLastError = `WRITE: ${error.code} - ${error.message}`;
        
        // Fallback do localStorage jeśli cloud nie działa
        if (typeof AppData !== 'undefined') {
            AppData.lastModified = Date.now();
            localStorage.setItem('kawaiiQuestData', JSON.stringify(AppData));
        }
        
        if (error.code === 'permission-denied') {
            if (typeof showNotification === 'function') {
                showNotification('🔒 Brak uprawnień zapisu Firestore! Sprawdź reguły bezpieczeństwa.', 'error');
            }
        } else {
            // Komunikat usunięty - nie pokazuj ostrzeżenia jeśli to tylko tymczasowy błąd sieci
            console.log('ℹ️ Błąd zapisu do chmury (może być tymczasowy):', error.code);
        }
    }
}

function setupRealtimeSync() {
    if (!currentUser) {
        console.warn('⚠️ Cannot setup realtime sync - no user logged in');
        return;
    }
    
    if (unsubscribeSnapshot) {
        console.log('ℹ️ Realtime sync already active, skipping setup');
        return;
    }
    
    console.log('🔄 Setting up realtime sync for user:', currentUser.uid);
    const docRef = doc(db, 'users', currentUser.uid);
    
    // Nasłuchuj zmian w czasie rzeczywistym
    unsubscribeSnapshot = onSnapshot(docRef, (docSnap) => {
        window.firebaseRealtimeSyncActive = true; // Mark as active when snapshot received
        if (docSnap.exists()) {
            const cloudData = docSnap.data();
            
            console.log('🔄 Realtime update received from Firestore');
            console.log('Cloud lastModified:', cloudData.lastModified);
            
            // Sprawdź czy dane zostały usunięte
            if (cloudData.deleted === true || cloudData.data === null) {
                console.log('🗑️ Dane zostały usunięte w chmurze');
                
                // Sprawdź czy już przeładowaliśmy z powodu usunięcia
                const alreadyReloaded = sessionStorage.getItem('deletionReload');
                const alreadyNotifiedDeletion = sessionStorage.getItem('cloudDeletionPending');
                
                if (alreadyReloaded || alreadyNotifiedDeletion) {
                    console.log('⚠️ Already handled deletion, skipping...');
                    // Wyłącz listener żeby zapobiec dalszym przeładowaniom
                    if (unsubscribeSnapshot) {
                        unsubscribeSnapshot();
                        unsubscribeSnapshot = null;
                    }
                    return;
                }
                
                // Wyłącz listener żeby zapobiec pętli
                if (unsubscribeSnapshot) {
                    unsubscribeSnapshot();
                    unsubscribeSnapshot = null;
                }

                // Utwórz backup lokalnych danych, ale NIE czyść lokalnego storage automatycznie.
                try {
                    const prev = localStorage.getItem('kawaiiQuestData');
                    if (prev) localStorage.setItem('kawaiiQuestData_cloudDeletionBackup', prev);
                } catch (e) {
                    console.warn('⚠️ Nie udało się utworzyć backupu lokalnego przy wykryciu usunięcia w chmurze:', e);
                }

                // Ustaw flagę że chmura zgłosiła usunięcie - pokaż powiadomienie TYLKO raz
                // KOMUNIKAT USUNIĘTY - nie pokazuj ostrzeżeń które mogą być mylące
                // sessionStorage.setItem('cloudDeletionPending', 'true');

                // if (typeof showNotification === 'function') {
                //     showNotification('⚠️ Twoje dane zostały usunięte w chmurze. Lokalna kopia została zapisana jako backup. Sprawdź ustawienia synchronizacji.', 'warning');
                // }

                console.log('DEBUG: onSnapshot detected deletion. cloudDeletionPending set. uid=', currentUser && currentUser.uid);

                // Nie przeładowuj automatycznie — użytkownik musi potwierdzić działanie
                return;
            }
            
            // Wyczyść flagi jeśli dane są OK (user odzyskał dostęp do danych w chmurze)
            if (sessionStorage.getItem('deletionReload')) {
                sessionStorage.removeItem('deletionReload');
                console.log('✅ Cloud data restored, clearing deletionReload flag');
            }
            if (sessionStorage.getItem('cloudDeletionPending')) {
                sessionStorage.removeItem('cloudDeletionPending');
                console.log('✅ Cloud data restored, clearing cloudDeletionPending flag');
            }
            
            // Sprawdź czy zmiana nie pochodzi z tego urządzenia
            if (typeof AppData !== 'undefined') {
                console.log('Local lastModified:', AppData.lastModified);
                
                // Jeśli dane z chmury są nowsze niż lokalne, załaduj je
                if (cloudData.lastModified && cloudData.lastModified > (AppData.lastModified || 0)) {
                    console.log('🔄 Cloud data is newer, updating local...');
                    if (cloudData.data) {
                        // Zabezpieczenie: sprawdź czy dane z chmury nie są puste
                        const hasData = cloudData.data.challenge || 
                                       cloudData.data.steps || 
                                       cloudData.data.tasks || 
                                       cloudData.data.completedTasks;
                        
                        if (hasData) {
                            // Smart merge cloud -> local
                            const merged = smartMergeData(AppData, cloudData.data, cloudData.lastModified || 0);
                            Object.assign(AppData, merged);
                            localStorage.setItem('kawaiiQuestData', JSON.stringify(AppData));
                            if (typeof updateAllDisplays === 'function') {
                                updateAllDisplays();
                            }
                        } else {
                            console.log('⚠️ Cloud data is empty, keeping local data');
                        }
                        
                        // USUNIĘTE: Powiadomienie o synchronizacji (irytujące)
                        // if (typeof showNotification === 'function') {
                        //     showNotification('🔄 Dane zsynchronizowane z innego urządzenia', 'success');
                        // }
                    }
                } else {
                    console.log('✓ Local data is up to date');
                }
            }
        }
    }, (error) => {
        console.error('❌ Realtime sync error:', error);
        console.error('❌ Error code:', error.code);
        console.error('❌ Error message:', error.message);
        window.firebaseLastError = `REALTIME: ${error.code} - ${error.message}`;
        window.firebaseRealtimeSyncActive = false;
        
        if (error.code === 'permission-denied') {
            if (typeof showNotification === 'function') {
                showNotification('🔒 Brak uprawnień realtime sync! Sprawdź reguły Firestore.', 'error');
            }
        }
    });
    
    // Ustaw flagę że listener został zarejestrowany
    window.firebaseRealtimeSyncActive = true;
    console.log('✅ Realtime sync listener registered');
}

// Eksportuj funkcję dla użycia w app.js
// Provide a throttled scheduler to avoid too-frequent writes
let _saveTimer = null;
let _savePendingResolve = null;
function scheduleSaveToFirestore(delay = 800) {
    // Return a promise that resolves when actual save completes
    if (_saveTimer) {
        clearTimeout(_saveTimer);
        _saveTimer = null;
        if (_savePendingResolve) {
            // leave existing promise pending; we'll create a new one below
            _savePendingResolve = null;
        }
    }

    return new Promise((resolve) => {
        _savePendingResolve = resolve;
        _saveTimer = setTimeout(async () => {
            _saveTimer = null;
            try {
                await saveDataToFirestore();
            } catch (e) {
                console.warn('⚠️ Scheduled saveDataToFirestore failed:', e);
            }
            if (typeof resolve === 'function') resolve();
            _savePendingResolve = null;
        }, delay);
    });
}

window.saveDataToFirestore = scheduleSaveToFirestore;

// Funkcja do usuwania wszystkich danych z Firestore
async function deleteDataFromFirestore() {
    if (!currentUser) {
        console.log('⚠️ Brak zalogowanego użytkownika - usuwam tylko lokalnie');
        return;
    }
    
    try {
        const docRef = doc(db, 'users', currentUser.uid);
        
        // Usuń dokument z Firestore
        await setDoc(docRef, {
            data: null,
            lastModified: Date.now(),
            email: currentUser.email,
            deleted: true,
            updatedAt: serverTimestamp()
        });
        
        console.log('🗑️ Dane usunięte z Firestore');
        
        if (typeof showNotification === 'function') {
            showNotification('🗑️ Dane usunięte z chmury', 'success');
        }
    } catch (error) {
        console.error('❌ Błąd usuwania z Firestore:', error);
        
        if (error.code === 'permission-denied') {
            if (typeof showNotification === 'function') {
                showNotification('⚠️ Brak uprawnień do usunięcia. Sprawdź reguły Firestore.', 'warning');
            }
        }
        
        throw error; // Rzuć błąd dalej, żeby app.js mógł go obsłużyć
    }
}

// Eksportuj funkcję usuwania
window.deleteDataFromFirestore = deleteDataFromFirestore;

// ======================
// INITIALIZATION
// ======================

// Inicjalizuj po załadowaniu DOM
function initFirebaseSync() {
    console.log('🚀 Initializing Firebase sync...');
    console.log('🔍 Firebase app:', app);
    console.log('🔍 Auth instance:', auth);
    console.log('🔍 Firestore instance:', db);
    
    // Test connection
    auth.onAuthStateChanged(() => {
        console.log('✅ Firebase Auth is responding');
    }, (error) => {
        console.error('❌ Firebase Auth error:', error);
        window.firebaseLastError = error.message;
    });
    
    // Ustaw UI autoryzacji
    setupAuthUI();
    
    // Nasłuchuj zmian stanu autoryzacji
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('✅ User logged in:', user.email);
            onUserLogin(user);
        } else {
            console.log('❌ User logged out');
            onUserLogout();
        }
    });

    // Auto-sync when page becomes visible or regains connectivity
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            console.log('📶 Visibility regained - attempting sync');
            if (typeof window.syncNow === 'function') window.syncNow();
        }
    });

    window.addEventListener('online', () => {
        console.log('🔌 Back online - attempting sync');
        if (typeof window.syncNow === 'function') window.syncNow();
    });

    // Try to push local changes before unloading
    window.addEventListener('beforeunload', (e) => {
        if (typeof window.forcePush === 'function') {
            try { window.forcePush(); } catch (err) {}
        }
    });
}

// Wywołaj inicjalizację gdy DOM jest gotowy
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFirebaseSync);
} else {
    // DOM już załadowany
    initFirebaseSync();
}
