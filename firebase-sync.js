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
        if (typeof playClickSound === 'function') playClickSound();
        const result = await signInWithPopup(auth, provider);
        console.log('✅ Logged in as:', result.user.email);
        if (typeof showNotification === 'function') {
            showNotification('🎉 Zalogowano pomyślnie!', 'success');
        }
    } catch (error) {
        console.error('❌ Login error:', error);
        
        if (error.code === 'auth/popup-blocked') {
            if (typeof showNotification === 'function') {
                showNotification('⚠️ Odblokuj wyskakujące okna aby się zalogować', 'warning');
            }
        } else if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-closed-by-user') {
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
        if (typeof showNotification === 'function') {
            showNotification('👋 Wylogowano pomyślnie', 'success');
        }
    } catch (error) {
        console.error('❌ Logout error:', error);
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
    
    // Pokaż info o użytkowniku
    const loginBtn = document.getElementById('loginBtn');
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    const userPhoto = document.getElementById('userPhoto');
    
    if (loginBtn) loginBtn.style.display = 'none';
    if (userInfo) userInfo.style.display = 'flex';
    if (userName) userName.textContent = user.displayName || user.email;
    if (userPhoto) userPhoto.src = user.photoURL || 'https://via.placeholder.com/36';
    
    // Załaduj dane z Firestore i zawsze ustaw realtime sync
    (async () => {
        try {
            const loaded = await loadDataFromFirestore();
            // Zawsze ustaw realtime sync, nawet jeśli dane nie zostały załadowane
            // (np. z powodu niedawnego usunięcia). Realtime sync wyczyści flagę
            // deletionReload gdy zobaczy że dane są OK.
            setupRealtimeSync();
            
            if (!loaded) {
                console.log('⚠️ Data load was skipped (recent deletion), but realtime sync is active');
            }
        } catch (err) {
            console.error('❌ Error during initial cloud load:', err);
            // Wciąż próbuj ustawić realtime sync jako fallback
            try { setupRealtimeSync(); } catch (e) {}
        }
    })();
}

function onUserLogout() {
    currentUser = null;
    
    // Pokaż przycisk logowania
    const loginBtn = document.getElementById('loginBtn');
    const userInfo = document.getElementById('userInfo');
    
    if (loginBtn) loginBtn.style.display = 'block';
    if (userInfo) userInfo.style.display = 'none';
    
    // Zatrzymaj nasłuchiwanie
    if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
        unsubscribeSnapshot = null;
    }
}

// ======================
// FIRESTORE SYNC
// ======================

async function loadDataFromFirestore() {
    if (!currentUser) return;
    
    // Sprawdź czy właśnie usunęliśmy dane (zapobiega pętli)
    const deletionReloadFlag = sessionStorage.getItem('deletionReload');
    if (deletionReloadFlag) {
        // Sprawdź czy flaga nie jest zbyt stara (maksymalnie 30 sekund)
        const deletionTimestamp = sessionStorage.getItem('deletionReloadTimestamp');
        const now = Date.now();
        
        if (deletionTimestamp) {
            const timeSinceReload = now - parseInt(deletionTimestamp);
            
            // Jeśli minęło więcej niż 30 sekund, usuń flagę i kontynuuj normalnie
            if (timeSinceReload > 30000) {
                console.log('⚠️ Deletion flag expired (>30s), clearing and loading normally');
                sessionStorage.removeItem('deletionReload');
                sessionStorage.removeItem('deletionReloadTimestamp');
                // Kontynuuj normalne ładowanie poniżej
            } else {
                // Flaga jest świeża, pomiń ładowanie
                console.log('⚠️ Skipping load after deletion to prevent loop (age: ' + timeSinceReload + 'ms)');
                
                // Ustaw timeout aby usunąć flagę po 30 sekundach
                setTimeout(() => {
                    sessionStorage.removeItem('deletionReload');
                    sessionStorage.removeItem('deletionReloadTimestamp');
                    console.log('✓ Deletion flag cleared after timeout');
                }, 30000 - timeSinceReload);
                
                return false;
            }
        } else {
            // Brak timestampu - stara wersja flagi, usuń ją
            console.log('⚠️ Old deletion flag found without timestamp, clearing');
            sessionStorage.removeItem('deletionReload');
            // Kontynuuj normalne ładowanie poniżej
        }
    }
    
    try {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const cloudData = docSnap.data();
            console.log('☁️ Loaded data from cloud:', cloudData);
            
            // Sprawdź czy dane nie zostały usunięte
            if (cloudData.deleted === true || cloudData.data === null) {
                console.log('🗑️ Dane zostały usunięte w chmurze - czyszczę lokalnie');
                localStorage.removeItem('kawaiiQuestData');
                if (typeof showNotification === 'function') {
                    showNotification('🗑️ Dane zostały usunięte', 'info');
                }
                // Zwróć false żeby caller wiedział, że pominięto ładowanie
                return false;
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
                        return;
                    }
                }
            }
            
            // Załaduj dane z chmury
            if (typeof AppData !== 'undefined' && cloudData.data) {
                Object.assign(AppData, cloudData.data);
                localStorage.setItem('kawaiiQuestData', JSON.stringify(AppData));
                if (typeof updateAllDisplays === 'function') {
                    updateAllDisplays();
                }
            }
            
            if (typeof showNotification === 'function') {
                showNotification('☁️ Dane załadowane z chmury', 'success');
            }
            return true;
        } else {
            console.log('📝 No cloud data found, creating new document');
            // Pierwsza synchronizacja - zapisz lokalne dane do chmury
            await saveDataToFirestore();
            return true;
        }
    } catch (error) {
        console.error('❌ Error loading from Firestore:', error);
        if (typeof showNotification === 'function') {
            showNotification('⚠️ Błąd ładowania danych z chmury', 'warning');
        }
        return false;
    }
}

async function saveDataToFirestore() {
    if (!currentUser) {
        // Nie ma użytkownika - zapisz tylko lokalnie
        if (typeof AppData !== 'undefined') {
            localStorage.setItem('kawaiiQuestData', JSON.stringify(AppData));
        }
        return;
    }
    
    try {
        const docRef = doc(db, 'users', currentUser.uid);
        
        // Dodaj timestamp do AppData
        if (typeof AppData !== 'undefined') {
            AppData.lastModified = Date.now();
        }
        
        await setDoc(docRef, {
            data: AppData,
            lastModified: AppData.lastModified,
            email: currentUser.email,
            updatedAt: serverTimestamp()
        }, { merge: true });
        
        // Zapisz też lokalnie jako backup
        localStorage.setItem('kawaiiQuestData', JSON.stringify(AppData));
        
        console.log('☁️ Data saved to cloud');
    } catch (error) {
        console.error('❌ Error saving to Firestore:', error);
        
        // Fallback do localStorage jeśli cloud nie działa
        if (typeof AppData !== 'undefined') {
            localStorage.setItem('kawaiiQuestData', JSON.stringify(AppData));
        }
        
        if (error.code === 'permission-denied') {
            if (typeof showNotification === 'function') {
                showNotification('⚠️ Brak uprawnień do zapisu. Sprawdź reguły Firestore.', 'warning');
            }
        }
    }
}

function setupRealtimeSync() {
    if (!currentUser || unsubscribeSnapshot) return;
    
    const docRef = doc(db, 'users', currentUser.uid);
    
    // Nasłuchuj zmian w czasie rzeczywistym
    unsubscribeSnapshot = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
            const cloudData = docSnap.data();
            
            console.log('🔄 Realtime update received from Firestore');
            console.log('Cloud lastModified:', cloudData.lastModified);
            
            // Sprawdź czy dane zostały usunięte
            if (cloudData.deleted === true || cloudData.data === null) {
                console.log('🗑️ Dane zostały usunięte w chmurze - czyszczę lokalnie');
                
                // Sprawdź czy już przeładowaliśmy z powodu usunięcia (z timestampem)
                const alreadyReloaded = sessionStorage.getItem('deletionReload');
                const deletionTimestamp = sessionStorage.getItem('deletionReloadTimestamp');
                
                if (alreadyReloaded) {
                    // Sprawdź wiek flagi
                    if (deletionTimestamp) {
                        const timeSinceReload = Date.now() - parseInt(deletionTimestamp);
                        
                        // Jeśli minęło więcej niż 30 sekund od usunięcia, pozwól na kolejne działania
                        if (timeSinceReload > 30000) {
                            console.log('⚠️ Deletion flag expired, clearing flags');
                            sessionStorage.removeItem('deletionReload');
                            sessionStorage.removeItem('deletionReloadTimestamp');
                            // Pozwól na dalsze przetwarzanie usunięcia
                        } else {
                            console.log('⚠️ Already reloaded for deletion, skipping... (age: ' + timeSinceReload + 'ms)');
                            console.log('DEBUG: onSnapshot skip. session deletionReload=', alreadyReloaded);
                            // Wyłącz listener żeby zapobiec dalszym przeładowaniom
                            if (unsubscribeSnapshot) {
                                unsubscribeSnapshot();
                                unsubscribeSnapshot = null;
                            }
                            return;
                        }
                    } else {
                        // Stara flaga bez timestampu, zachowaj poprzednie zachowanie
                        console.log('⚠️ Already reloaded for deletion, skipping...');
                        console.log('DEBUG: onSnapshot skip. session deletionReload=', alreadyReloaded);
                        // Wyłącz listener żeby zapobiec dalszym przeładowaniom
                        if (unsubscribeSnapshot) {
                            unsubscribeSnapshot();
                            unsubscribeSnapshot = null;
                        }
                        return;
                    }
                }
                
                // Wyłącz listener żeby zapobiec pętli
                if (unsubscribeSnapshot) {
                    unsubscribeSnapshot();
                    unsubscribeSnapshot = null;
                }
                
                // Wyczyść dane lokalne
                localStorage.clear();
                
                // Ustaw flagę że przeładowujemy wraz z timestampem
                sessionStorage.setItem('deletionReload', 'true');
                sessionStorage.setItem('deletionReloadTimestamp', Date.now().toString());
                
                if (typeof showNotification === 'function') {
                    showNotification('🗑️ Dane zostały usunięte', 'warning');
                }
                console.log('DEBUG: onSnapshot detected deletion. scheduling reload. uid=', currentUser && currentUser.uid);
                
                // Jednorazowe przeładowanie strony
                setTimeout(() => {
                    location.reload();
                }, 1000);
                
                return;
            }
            
            // Wyczyść flagę deletionReload jeśli dane są OK
            sessionStorage.removeItem('deletionReload');
            sessionStorage.removeItem('deletionReloadTimestamp');
            
            // Sprawdź czy zmiana nie pochodzi z tego urządzenia
            if (typeof AppData !== 'undefined') {
                console.log('Local lastModified:', AppData.lastModified);
                
                // Jeśli dane z chmury są nowsze niż lokalne, załaduj je
                if (cloudData.lastModified && cloudData.lastModified > (AppData.lastModified || 0)) {
                    console.log('🔄 Cloud data is newer, updating local...');
                    if (cloudData.data) {
                        Object.assign(AppData, cloudData.data);
                        localStorage.setItem('kawaiiQuestData', JSON.stringify(AppData));
                        if (typeof updateAllDisplays === 'function') {
                            updateAllDisplays();
                        }
                        
                        if (typeof showNotification === 'function') {
                            showNotification('🔄 Dane zsynchronizowane z innego urządzenia', 'success');
                        }
                    }
                } else {
                    console.log('✓ Local data is up to date');
                }
            }
        }
    }, (error) => {
        console.error('❌ Realtime sync error:', error);
    });
}

// Eksportuj funkcję dla użycia w app.js
window.saveDataToFirestore = saveDataToFirestore;

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
}

// Wywołaj inicjalizację gdy DOM jest gotowy
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFirebaseSync);
} else {
    // DOM już załadowany
    initFirebaseSync();
}
