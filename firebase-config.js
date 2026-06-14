// 🔥 Firebase Configuration - Modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBLtdh-FELJEuzYPpKDF6OLuya55xRTjiY",
  authDomain: "czkawkaaa.github.io",
  projectId: "kawaii-quest",
  storageBucket: "kawaii-quest.firebasestorage.app",
  messagingSenderId: "845447529375",
  appId: "1:845447529375:web:9c6db3677504d72354f3aa"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const hasFirebaseConfig = true;

console.log('🔥 Firebase initialized successfully!');

const safeOnAuthStateChanged = (authInstance, callback) => {
  if (!authInstance) {
    return () => {};
  }
  return onAuthStateChanged(authInstance, callback);
};

export { app, auth, db, safeOnAuthStateChanged as onAuthStateChanged, hasFirebaseConfig };