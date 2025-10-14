// 🔥 Firebase Configuration
// INSTRUKCJA: Wklej tutaj swoją konfigurację z Firebase Console
// Zobacz: FIREBASE_SETUP.md

const firebaseConfig = {
  apiKey: "TWÓJ_API_KEY",
  authDomain: "TWÓJ_PROJECT.firebaseapp.com",
  projectId: "TWÓJ_PROJECT_ID",
  storageBucket: "TWÓJ_PROJECT.appspot.com",
  messagingSenderId: "TWÓJ_SENDER_ID",
  appId: "TWÓJ_APP_ID"
};

// Nie edytuj poniżej tej linii
// ================================

// Inicjalizacja Firebase
let app, auth, db;

function initializeFirebase() {
    try {
        app = firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
        db = firebase.firestore();
        
        console.log('🔥 Firebase initialized successfully!');
        
        // Nasłuchuj zmian stanu autoryzacji
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log('✅ User logged in:', user.email);
                onUserLogin(user);
            } else {
                console.log('❌ User logged out');
                onUserLogout();
            }
        });
        
    } catch (error) {
        console.error('❌ Firebase initialization error:', error);
    }
}
