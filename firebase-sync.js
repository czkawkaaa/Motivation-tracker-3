// 🔥 Firebase Synchronization Module
// Obsługuje logowanie i synchronizację danych między urządzeniami

let currentUser = null;
let unsubscribeSnapshot = null;

// ======================
// AUTHENTICATION
// ======================

function setupAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userInfo = document.getElementById('userInfo');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', loginWithGoogle);
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
}

async function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    
    try {
        playClickSound();
        const result = await auth.signInWithPopup(provider);
        console.log('✅ Logged in as:', result.user.email);
        showNotification('🎉 Zalogowano pomyślnie!', 'success');
    } catch (error) {
        console.error('❌ Login error:', error);
        
        if (error.code === 'auth/popup-blocked') {
            showNotification('⚠️ Odblokuj wyskakujące okna aby się zalogować', 'warning');
        } else if (error.code === 'auth/cancelled-popup-request') {
            // User zamknął okno - nic nie rób
        } else {
            showNotification('❌ Błąd logowania: ' + error.message, 'error');
        }
    }
}

async function logout() {
    try {
        playClickSound();
        await auth.signOut();
        showNotification('👋 Wylogowano pomyślnie', 'success');
    } catch (error) {
        console.error('❌ Logout error:', error);
        showNotification('❌ Błąd wylogowania', 'error');
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
    
    // Załaduj dane z Firestore
    loadDataFromFirestore();
    
    // Nasłuchuj zmian w czasie rzeczywistym
    setupRealtimeSync();
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
    
    // Wyczyść dane lokalne (opcjonalnie)
    // localStorage.clear();
}

// ======================
// FIRESTORE SYNC
// ======================

async function loadDataFromFirestore() {
    if (!currentUser) return;
    
    try {
        const docRef = db.collection('users').doc(currentUser.uid);
        const doc = await docRef.get();
        
        if (doc.exists) {
            const cloudData = doc.data();
            console.log('☁️ Loaded data from cloud:', cloudData);
            
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
            Object.assign(AppData, cloudData.data || {});
            localStorage.setItem('kawaiiQuestData', JSON.stringify(AppData));
            updateAllDisplays();
            
            showNotification('☁️ Dane załadowane z chmury', 'success');
        } else {
            console.log('📝 No cloud data found, creating new document');
            // Pierwsza synchronizacja - zapisz lokalne dane do chmury
            await saveDataToFirestore();
        }
    } catch (error) {
        console.error('❌ Error loading from Firestore:', error);
        showNotification('⚠️ Błąd ładowania danych z chmury', 'warning');
    }
}

async function saveDataToFirestore() {
    if (!currentUser) {
        // Nie ma użytkownika - zapisz tylko lokalnie
        localStorage.setItem('kawaiiQuestData', JSON.stringify(AppData));
        return;
    }
    
    try {
        const docRef = db.collection('users').doc(currentUser.uid);
        
        await docRef.set({
            data: AppData,
            lastModified: Date.now(),
            email: currentUser.email,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        
        // Zapisz też lokalnie jako backup
        localStorage.setItem('kawaiiQuestData', JSON.stringify(AppData));
        
        console.log('☁️ Data saved to cloud');
    } catch (error) {
        console.error('❌ Error saving to Firestore:', error);
        
        // Fallback do localStorage jeśli cloud nie działa
        localStorage.setItem('kawaiiQuestData', JSON.stringify(AppData));
        
        if (error.code === 'permission-denied') {
            showNotification('⚠️ Brak uprawnień do zapisu. Sprawdź reguły Firestore.', 'warning');
        }
    }
}

function setupRealtimeSync() {
    if (!currentUser || unsubscribeSnapshot) return;
    
    const docRef = db.collection('users').doc(currentUser.uid);
    
    // Nasłuchuj zmian w czasie rzeczywistym
    unsubscribeSnapshot = docRef.onSnapshot((doc) => {
        if (doc.exists) {
            const cloudData = doc.data();
            
            // Sprawdź czy zmiana nie pochodzi z tego urządzenia
            const localData = localStorage.getItem('kawaiiQuestData');
            const local = localData ? JSON.parse(localData) : {};
            
            // Jeśli dane się zmieniły na innym urządzeniu, załaduj je
            if (cloudData.lastModified && cloudData.lastModified !== local.lastModified) {
                console.log('🔄 Data changed on another device, syncing...');
                Object.assign(AppData, cloudData.data || {});
                AppData.lastModified = cloudData.lastModified;
                localStorage.setItem('kawaiiQuestData', JSON.stringify(AppData));
                updateAllDisplays();
                
                showNotification('🔄 Dane zsynchronizowane z innego urządzenia', 'success');
            }
        }
    }, (error) => {
        console.error('❌ Realtime sync error:', error);
    });
}

// ======================
// OVERRIDE saveData
// ======================

// Nadpisz oryginalną funkcję saveData z app.js
const originalSaveData = window.saveData;

window.saveData = function() {
    // Dodaj timestamp
    AppData.lastModified = Date.now();
    
    // Zapisz do Firestore i localStorage
    saveDataToFirestore();
    
    // Wywołaj oryginalne checkBadges
    checkBadges();
};

// ======================
// INITIALIZATION
// ======================

// Inicjalizuj Firebase po załadowaniu DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Firebase sync...');
    
    // Sprawdź czy firebase-config.js został załadowany
    if (typeof firebaseConfig === 'undefined') {
        console.warn('⚠️ Firebase config not found. Please configure firebase-config.js');
        showNotification('⚠️ Firebase nie skonfigurowany. Zobacz FIREBASE_SETUP.md', 'warning');
        return;
    }
    
    // Sprawdź czy to jest template config
    if (firebaseConfig.apiKey === 'TWÓJ_API_KEY') {
        console.warn('⚠️ Firebase config is using template values. Please update firebase-config.js with your actual config.');
        showNotification('⚠️ Skonfiguruj Firebase w pliku firebase-config.js', 'warning');
        return;
    }
    
    // Inicjalizuj Firebase
    initializeFirebase();
    
    // Ustaw UI autoryzacji
    setupAuthUI();
});
