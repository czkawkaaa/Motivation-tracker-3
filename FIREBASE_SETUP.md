# 🔥 Konfiguracja Firebase - Instrukcja krok po kroku

## Krok 1: Utwórz projekt Firebase

1. Przejdź do: https://console.firebase.google.com/
2. Kliknij **"Dodaj projekt"** (Add project)
3. Nazwa projektu: `kawaii-quest` (lub dowolna)
4. Wyłącz Google Analytics (opcjonalnie)
5. Kliknij **"Utwórz projekt"**

## Krok 2: Dodaj aplikację webową

1. W konsoli Firebase kliknij ikonę **</>** (Web)
2. Nazwa aplikacji: `Kawaii Quest Web`
3. Zaznacz: **"Also set up Firebase Hosting"** (opcjonalnie)
4. Kliknij **"Zarejestruj aplikację"**

## Krok 3: Skopiuj konfigurację

Firebase pokaże Ci kod konfiguracyjny. Będzie wyglądał mniej więcej tak:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "kawaii-quest.firebaseapp.com",
  projectId: "kawaii-quest",
  storageBucket: "kawaii-quest.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

**ZAPISZ TE DANE** - będą potrzebne w następnym kroku!

## Krok 4: Włącz Authentication

1. W menu bocznym wybierz **"Authentication"**
2. Kliknij **"Get started"**
3. Kliknij **"Google"** w zakładce "Sign-in providers"
4. Przełącz na **"Enabled"**
5. Wybierz swój email jako Project support email
6. Kliknij **"Save"**

## Krok 5: Włącz Firestore Database

1. W menu bocznym wybierz **"Firestore Database"**
2. Kliknij **"Create database"**
3. Wybierz **"Start in production mode"** (później zmienimy reguły)
4. Wybierz lokalizację: **"europe-west3"** (Frankfurt) - najbliżej Polski
5. Kliknij **"Enable"**

## Krok 6: Ustaw reguły Firestore

W zakładce "Rules" wklej następujące reguły bezpieczeństwa:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Każdy użytkownik ma dostęp tylko do swoich danych
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Kliknij **"Publish"**

## Krok 7: Dodaj domenę do autoryzacji

1. W **Authentication** → **Settings** → **Authorized domains**
2. Dodaj swoje domeny:
   - `localhost` (już jest)
   - `czkawkaaa.github.io`
3. Kliknij **"Add domain"**

## Krok 8: Wklej konfigurację do pliku

Otwórz plik `firebase-config.js` w projekcie i wklej swoją konfigurację:

```javascript
// firebase-config.js
const firebaseConfig = {
  apiKey: "TWÓJ_API_KEY",
  authDomain: "TWÓJ_PROJECT.firebaseapp.com",
  projectId: "TWÓJ_PROJECT_ID",
  storageBucket: "TWÓJ_PROJECT.appspot.com",
  messagingSenderId: "TWÓJ_SENDER_ID",
  appId: "TWÓJ_APP_ID"
};
```

## ✅ Gotowe!

Teraz Twoja aplikacja będzie synchronizować dane między wszystkimi urządzeniami! 🎉

### Jak to działa:
- 📱 Logujesz się na telefonie → dane zapisują się w Firebase
- 💻 Logujesz się na komputerze tym samym kontem Google → dane się pobierają
- 🔄 Każda zmiana na dowolnym urządzeniu synchronizuje się automatycznie

### Bezpieczeństwo:
- 🔐 Tylko Ty masz dostęp do swoich danych
- ☁️ Dane są szyfrowane w chmurze Google
- 🚫 Nikt inny nie może zobaczyć Twoich postępów
