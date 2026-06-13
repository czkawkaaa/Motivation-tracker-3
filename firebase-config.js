// 🔥 Firebase Configuration - Modular SDK
// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// Firebase configuration.
// IMPORTANT: Never commit real Firebase credentials to a public repository.
// The app prefers a local generated config file (firebase-config.local.js).
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyBLtdh-FELJeuzYpPKDf60Luya55xRTjiY",
  authDomain: "kawaii-quest.firebaseapp.com",
  projectId: "kawaii-quest",
  storageBucket: "kawaii-quest.firebasestorage.app",
  messagingSenderId: "845447529375",
  appId: "1:845447529375:web:9c6db3677504d72354f3aa"
};


let firebaseConfig = { ...DEFAULT_FIREBASE_CONFIG };
let hasFirebaseConfig = false;

try {
  const localConfigModule = await import('./firebase-config.local.js');
  if (localConfigModule && localConfigModule.default) {
    firebaseConfig = { ...DEFAULT_FIREBASE_CONFIG, ...localConfigModule.default };
    console.log('🔐 Wczytano lokalną konfigurację Firebase z firebase-config.local.js');
  }
} catch (error) {
  console.info('ℹ️ Nie znaleziono lokalnej konfiguracji Firebase. Używam bezpiecznego placeholdera.');
}

const hasRealValues = Boolean(
  firebaseConfig &&
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.appId &&
  !String(firebaseConfig.apiKey).includes('YOUR_') &&
  !String(firebaseConfig.projectId).includes('YOUR_')
);

hasFirebaseConfig = hasRealValues;

const app = hasFirebaseConfig ? initializeApp(firebaseConfig) : null;
const auth = hasFirebaseConfig ? getAuth(app) : null;
const db = hasFirebaseConfig ? getFirestore(app) : null;

if (!hasFirebaseConfig) {
  console.info('ℹ️ Firebase sync będzie wyłączony do czasu utworzenia lokalnej konfiguracji w firebase-config.local.js.');
} else {
  console.log('🔥 Firebase initialized successfully!');
}

const safeOnAuthStateChanged = (authInstance, callback) => {
  if (!authInstance || !hasFirebaseConfig) {
    return () => {};
  }
  return onAuthStateChanged(authInstance, callback);
};

// Export dla innych modułów
export { app, auth, db, safeOnAuthStateChanged as onAuthStateChanged, hasFirebaseConfig };
