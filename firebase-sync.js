// 🔥 Firebase Synchronization Module - Modular SDK
import { app, auth, db, onAuthStateChanged, hasFirebaseConfig } from './firebase-config.js';
import { isMeaningfulData } from './scripts/data-safety.js';
import { signInWithRedirect, signInWithPopup, getRedirectResult, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { doc, getDoc, setDoc, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

let currentUser = null;
let unsubscribeSnapshot = null;

window.firebaseCurrentUser = null;
window.firebaseRealtimeSyncActive = false;
window.firebaseLastError = null;
window.firebaseLastWriteAttempt = null;
window.firebaseLastReadAttempt = null;

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
        if (status === 'connected') { syncStatus.style.background = '#d4edda'; syncStatus.style.color = '#155724'; }
        else if (status === 'error') { syncStatus.style.background = '#f8d7da'; syncStatus.style.color = '#721c24'; }
        else if (status === 'syncing') { syncStatus.style.background = '#fff3cd'; syncStatus.style.color = '#856404'; }
        else { syncStatus.style.background = 'var(--hover-bg)'; syncStatus.style.color = 'var(--text-primary)'; }
    }
}
window.updateSyncStatus = updateSyncStatus;

function smartMergeData(local, cloud, cloudLastModified = 0) {
    if (!local) return cloud || {};
    if (!cloud) return local;
    const merged = { ...local };
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
                if ((local.lastModified || 0) > (cloudLastModified || 0)) merged[key][k] = lv;
                else merged[key][k] = cv;
            }
        });
    }
    ['steps', 'studyHours', 'mood', 'completedTasks'].forEach(k => mergeMaps(k));
    const localDays = Array.isArray(local.challenge?.completedDays) ? local.challenge.completedDays : [];
    const cloudDays = Array.isArray(cloud.challenge?.completedDays) ? cloud.challenge.completedDays : [];
    merged.challenge = merged.challenge || {};
    merged.challenge.completedDays = Array.from(new Set([...localDays, ...cloudDays])).sort();
    merged.challenge.currentDay = (local.challenge?.currentDay || 0);
    if (cloud.challenge?.currentDay && cloudLastModified > (local.lastModified || 0)) merged.challenge.currentDay = cloud.challenge.currentDay;
    merged.challenge.totalDays = cloud.challenge?.totalDays || local.challenge?.totalDays || merged.challenge.totalDays || 75;
    merged.challenge.startDate = local.challenge?.startDate || cloud.challenge?.startDate;
    if (local.challenge?.completionTime || cloud.challenge?.completionTime) merged.challenge.completionTime = local.challenge?.completionTime || cloud.challenge?.completionTime;
    if (local.challenge?.resetScheduled || cloud.challenge?.resetScheduled) merged.challenge.resetScheduled = local.challenge?.resetScheduled || cloud.challenge?.resetScheduled;
    merged.tasks = cloud.tasks || local.tasks;
    if (local.weeklyTasks || cloud.weeklyTasks) {
        merged.weeklyTasks = {
            enabled: (cloudLastModified > (local.lastModified || 0)) ? (cloud.weeklyTasks?.enabled ?? local.weeklyTasks?.enabled ?? false) : (local.weeklyTasks?.enabled ?? cloud.weeklyTasks?.enabled ?? false),
            monday: [...new Set([...(local.weeklyTasks?.monday || []), ...(cloud.weeklyTasks?.monday || [])])],
            tuesday: [...new Set([...(local.weeklyTasks?.tuesday || []), ...(cloud.weeklyTasks?.tuesday || [])])],
            wednesday: [...new Set([...(local.weeklyTasks?.wednesday || []), ...(cloud.weeklyTasks?.wednesday || [])])],
            thursday: [...new Set([...(local.weeklyTasks?.thursday || []), ...(cloud.weeklyTasks?.thursday || [])])],
            friday: [...new Set([...(local.weeklyTasks?.friday || []), ...(cloud.weeklyTasks?.friday || [])])],
            saturday: [...new Set([...(local.weeklyTasks?.saturday || []), ...(cloud.weeklyTasks?.saturday || [])])],
            sunday: [...new Set([...(local.weeklyTasks?.sunday || []), ...(cloud.weeklyTasks?.sunday || [])])]
        };
    }
    merged.badges = { ...(local.badges || {}), ...(cloud.badges || {}) };
    merged.gallery = Array.isArray(local.gallery) || Array.isArray(cloud.gallery) ? Array.from(new Set([...(local.gallery || []), ...(cloud.gallery || [])])) : (cloud.gallery || local.gallery);
    if (cloudLastModified > (local.lastModified || 0)) merged.settings = { ...(local.settings || {}), ...(cloud.settings || {}) };
    else merged.settings = { ...(cloud.settings || {}), ...(local.settings || {}) };
    merged.streak = Math.max(cloud.streak || 0, local.streak || 0);
    merged.longestStreak = Math.max(cloud.longestStreak || 0, local.longestStreak || 0);
    merged.lastModified = Math.max(local.lastModified || 0, cloud.lastModified || 0, Date.now());
    return merged;
}

function setupAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    if (loginBtn) loginBtn.addEventListener('click', loginWithGoogle);
    if (logoutBtn) logoutBtn.addEventListener('click', logout);
}

function requireFirebaseAccess() {
    if (!hasFirebaseConfig || !auth || !db) {
        console.warn('⚠️ Firebase nie jest skonfigurowane — pomijam logowanie/synchronizację.');
        if (typeof showNotification === 'function') showNotification('⚠️ Synchronizacja Firebase jest wyłączona w tej wersji repozytorium. Użyj lokalnych danych.', 'warning');
        return false;
    }
    return true;
}

async function loginWithGoogle() {
    if (!requireFirebaseAccess()) return;
    console.log('🔐 loginWithGoogle called!');
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
        updateSyncStatus('syncing', 'Logowanie...', '⏳');
        if (typeof playClickSound === 'function') playClickSound();
        await signInWithRedirect(auth, provider);
    } catch (error) {
        window.firebaseLastError = error.message;
        updateSyncStatus('error', 'Błąd logowania', '❌');
        if (typeof showNotification === 'function') showNotification('❌ Błąd logowania: ' + error.message, 'error');
    }
}

async function logout() {
    if (!requireFirebaseAccess()) return;
    try {
        if (typeof playClickSound === 'function') playClickSound();
        await signOut(auth);
        updateSyncStatus('disconnected', 'Rozłączono', '⚠️');
        if (typeof showNotification === 'function') showNotification('👋 Wylogowano pomyślnie', 'success');
    } catch (error) {
        window.firebaseLastError = error.message;
        updateSyncStatus('error', 'Błąd wylogowania', '❌');
        if (typeof showNotification === 'function') showNotification('❌ Błąd wylogowania', 'error');
    }
}

function onUserLogin(user) {
    currentUser = user;
    window.firebaseCurrentUser = user;
    const loginBtn = document.getElementById('loginBtn');
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    const userPhoto = document.getElementById('userPhoto');
    if (loginBtn) loginBtn.style.display = 'none';
    if (userInfo) userInfo.style.display = 'flex';
    if (userName) userName.textContent = user.displayName || user.email;
    if (userPhoto) userPhoto.src = user.photoURL || 'https://via.placeholder.com/36';
    
    (async () => {
        try {
            updateSyncStatus('syncing', 'Synchronizacja...', '🔄');
            await loadDataFromFirestore();
            updateSyncStatus('connected', 'Połączono', '✅');
        } catch (err) {
            window.firebaseLastError = err.message;
            updateSyncStatus('error', 'Błąd synchronizacji', '❌');
        }
        try {
            setupRealtimeSync();
            const syncStatus = document.getElementById('syncStatus');
            if (syncStatus) syncStatus.style.display = 'none';
        } catch (e) {
            window.firebaseLastError = e.message;
            updateSyncStatus('error', 'Błąd realtime sync', '❌');
        }
    })();
}

function onUserLogout() {
    currentUser = null;
    window.firebaseCurrentUser = null;
    window.firebaseRealtimeSyncActive = false;
    const syncStatus = document.getElementById('syncStatus');
    if (syncStatus) syncStatus.style.display = 'none';
    const loginBtn = document.getElementById('loginBtn');
    const userInfo = document.getElementById('userInfo');
    if (loginBtn) loginBtn.style.display = 'block';
    if (userInfo) userInfo.style.display = 'none';
    if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
        unsubscribeSnapshot = null;
    }
}

async function loadDataFromFirestore() {
    if (!currentUser) return;
    window.firebaseLastReadAttempt = new Date().toISOString();
    const justDeleted = sessionStorage.getItem('deletionReload');
    if (justDeleted) return false;
    const alreadyNotifiedDeletion = sessionStorage.getItem('cloudDeletionPending');
    try {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const cloudData = docSnap.data();
            if (cloudData.deleted === true || cloudData.data === null) {
                try {
                    const prev = localStorage.getItem('kawaiiQuestData');
                    if (prev) localStorage.setItem('kawaiiQuestData_cloudDeletionBackup', prev);
                } catch (e) {}
                return false;
            }
            if (alreadyNotifiedDeletion) sessionStorage.removeItem('cloudDeletionPending');
            const localData = localStorage.getItem('kawaiiQuestData');
            if (localData) {
                const local = JSON.parse(localData);
                if (local.lastModified && cloudData.lastModified && local.lastModified > cloudData.lastModified) {
                    await saveDataToFirestore();
                    return true;
                }
            }
            if (typeof AppData !== 'undefined' && cloudData.data) {
                const hasData = isMeaningfulData(cloudData.data);
                if (hasData) {
                    const merged = smartMergeData(AppData, cloudData.data, cloudData.lastModified || 0);
                    Object.assign(AppData, merged);
                    localStorage.setItem('kawaiiQuestData', JSON.stringify(AppData));
                    if (typeof updateAllDisplays === 'function') updateAllDisplays();
                }
            }
            return true;
        } else {
            await saveDataToFirestore();
            return true;
        }
    } catch (error) {
        window.firebaseLastError = `READ: ${error.code} - ${error.message}`;
        if (error.code === 'permission-denied' && typeof showNotification === 'function') {
            showNotification('🔒 Brak uprawnień odczytu Firestore!', 'error');
        }
        return false;
    }
}

async function syncNow() {
    if (!currentUser) return await saveDataToFirestore();
    await loadDataFromFirestore();
    await saveDataToFirestore();
}

async function forcePull() {
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

window.syncNow = syncNow;
window.forcePull = forcePull;
window.forcePush = forcePush;

async function saveDataToFirestore() {
    if (!currentUser) {
        if (typeof AppData !== 'undefined') {
            AppData.lastModified = Date.now();
            localStorage.setItem('kawaiiQuestData', JSON.stringify(AppData));
        }
        return;
    }
    window.firebaseLastWriteAttempt = new Date().toISOString();
    if (typeof AppData === 'undefined') return;
    const hasData = isMeaningfulData(AppData);
    if (!hasData) return;
    try {
        const docRef = doc(db, 'users', currentUser.uid);
        if (typeof AppData !== 'undefined') AppData.lastModified = Date.now();
        await setDoc(docRef, {
            data: AppData,
            lastModified: AppData.lastModified,
            email: currentUser.email,
            updatedAt: serverTimestamp()
        }, { merge: true });
        window.firebaseLastError = null;
        localStorage.setItem('kawaiiQuestData', JSON.stringify(AppData));
    } catch (error) {
        window.firebaseLastError = `WRITE: ${error.code} - ${error.message}`;
        if (typeof AppData !== 'undefined') {
            AppData.lastModified = Date.now();
            localStorage.setItem('kawaiiQuestData', JSON.stringify(AppData));
        }
        if (error.code === 'permission-denied' && typeof showNotification === 'function') {
            showNotification('🔒 Brak uprawnień zapisu Firestore!', 'error');
        }
    }
}

function setupRealtimeSync() {
    if (!currentUser || unsubscribeSnapshot) return;
    const docRef = doc(db, 'users', currentUser.uid);
    unsubscribeSnapshot = onSnapshot(docRef, (docSnap) => {
        window.firebaseRealtimeSyncActive = true;
        if (docSnap.exists()) {
            const cloudData = docSnap.data();
            if (cloudData.deleted === true || cloudData.data === null) {
                const alreadyReloaded = sessionStorage.getItem('deletionReload');
                const alreadyNotifiedDeletion = sessionStorage.getItem('cloudDeletionPending');
                if (alreadyReloaded || alreadyNotifiedDeletion) {
                    if (unsubscribeSnapshot) { unsubscribeSnapshot(); unsubscribeSnapshot = null; }
                    return;
                }
                if (unsubscribeSnapshot) { unsubscribeSnapshot(); unsubscribeSnapshot = null; }
                try {
                    const prev = localStorage.getItem('kawaiiQuestData');
                    if (prev) localStorage.setItem('kawaiiQuestData_cloudDeletionBackup', prev);
                } catch (e) {}
                return;
            }
            if (sessionStorage.getItem('deletionReload')) sessionStorage.removeItem('deletionReload');
            if (sessionStorage.getItem('cloudDeletionPending')) sessionStorage.removeItem('cloudDeletionPending');
            
            if (typeof AppData !== 'undefined') {
                if (cloudData.lastModified && cloudData.lastModified > (AppData.lastModified || 0)) {
                    if (cloudData.data) {
                        const hasData = isMeaningfulData(cloudData.data);
                        if (hasData) {
                            const merged = smartMergeData(AppData, cloudData.data, cloudData.lastModified || 0);
                            Object.assign(AppData, merged);
                            localStorage.setItem('kawaiiQuestData', JSON.stringify(AppData));
                            if (typeof updateAllDisplays === 'function') updateAllDisplays();
                        }
                    }
                }
            }
        }
    }, (error) => {
        window.firebaseLastError = `REALTIME: ${error.code} - ${error.message}`;
        window.firebaseRealtimeSyncActive = false;
    });
    window.firebaseRealtimeSyncActive = true;
}

let _saveTimer = null;
let _savePendingResolve = null;
function scheduleSaveToFirestore(delay = 800) {
    if (_saveTimer) {
        clearTimeout(_saveTimer);
        _saveTimer = null;
        if (_savePendingResolve) _savePendingResolve = null;
    }
    return new Promise((resolve) => {
        _savePendingResolve = resolve;
        _saveTimer = setTimeout(async () => {
            _saveTimer = null;
            try { await saveDataToFirestore(); } catch (e) {}
            if (typeof resolve === 'function') resolve();
            _savePendingResolve = null;
        }, delay);
    });
}
window.saveDataToFirestore = scheduleSaveToFirestore;

async function deleteDataFromFirestore() {
    if (!currentUser) return;
    try {
        const docRef = doc(db, 'users', currentUser.uid);
        await setDoc(docRef, { data: null, lastModified: Date.now(), email: currentUser.email, deleted: true, updatedAt: serverTimestamp() });
        if (typeof showNotification === 'function') showNotification('🗑️ Dane usunięte z chmury', 'success');
    } catch (error) {
        if (error.code === 'permission-denied' && typeof showNotification === 'function') showNotification('⚠️ Brak uprawnień do usunięcia.', 'warning');
        throw error;
    }
}
window.deleteDataFromFirestore = deleteDataFromFirestore;

async function initFirebaseSync() {
    if (!hasFirebaseConfig || !auth || !db) return;
    
    try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
            updateSyncStatus('connected', 'Połączono', '✅');
            if (typeof showNotification === 'function') showNotification('🎉 Zalogowano pomyślnie!', 'success');
        }
    } catch (error) {
        window.firebaseLastError = error.message;
        updateSyncStatus('error', 'Błąd logowania', '❌');
    }

    setupAuthUI();
    onAuthStateChanged(auth, (user) => {
        if (user) onUserLogin(user);
        else onUserLogout();
    });
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && typeof window.syncNow === 'function') window.syncNow();
    });
    window.addEventListener('online', () => {
        if (typeof window.syncNow === 'function') window.syncNow();
    });
    window.addEventListener('beforeunload', (e) => {
        if (typeof window.forcePush === 'function') { try { window.forcePush(); } catch (err) {} }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFirebaseSync);
} else {
    initFirebaseSync();
}

window.loginWithGoogle = loginWithGoogle;
window.logoutUser = logout;
window.auth = auth;
window.db = db;