# 🔒 Sprawdzanie Reguł Firestore - NAJBARDZIEJ PRAWDOPODOBNA PRZYCZYNA

## Problem
Brak synchronizacji między urządzeniami mimo że:
- ✅ Jesteś zalogowany/a na obu urządzeniach
- ✅ To samo konto Google
- ✅ Ten sam ID użytkownika
- ❌ **Dane się NIE synchronizują**

## Najprawdopodobniejsza przyczyna: Reguły Firestore

### Jak sprawdzić:

1. **Otwórz Firebase Console:**
   https://console.firebase.google.com/project/kawaii-quest/firestore/rules

2. **Sprawdź reguły w zakładce "Rules"**

3. **POPRAWNE reguły powinny wyglądać tak:**

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Zezwól zalogowanym użytkownikom na odczyt/zapis WŁASNYCH danych
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Co może być nie tak:

#### ❌ ZŁE REGUŁY (blokują synchronizację):
```
// PRZYKŁAD 1: Tylko odczyt dla wszystkich (brak zapisu!)
match /users/{userId} {
  allow read: if request.auth != null && request.auth.uid == userId;
  // BRAKUJE allow write!
}

// PRZYKŁAD 2: Całkowity zakaz
match /{document=**} {
  allow read, write: if false;
}

// PRZYKŁAD 3: Wymaga dodatkowych pól (których nie ma w dokumencie)
match /users/{userId} {
  allow read, write: if request.auth != null 
    && request.auth.uid == userId 
    && request.resource.data.email == request.auth.token.email; // <- może blokować
}
```

### Jak naprawić:

1. **Wejdź na:** https://console.firebase.google.com/project/kawaii-quest/firestore/rules

2. **Usuń obecne reguły i wklej:**
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. **Kliknij "Publish" (Opublikuj)**

4. **Zaczekaj 1-2 minuty** na propagację zmian

5. **Przetestuj sync:**
   - Odśwież stronę na komputerze
   - Zaznacz jakieś zadanie
   - Odśwież stronę na telefonie
   - Sprawdź czy zadanie się pojawiło

## Jak zdiagnozować problem w aplikacji:

1. **Otwórz panel Synchronizacji w Ustawieniach**
2. **Sprawdź pole "Ostatni błąd":**
   - ✅ `Brak błędów` = reguły OK
   - ❌ `WRITE: permission-denied` = brak uprawnień zapisu
   - ❌ `READ: permission-denied` = brak uprawnień odczytu

3. **Otwórz konsolę przeglądarki (F12)**
4. **Spróbuj zapisać dane (zmień coś w aplikacji)**
5. **Szukaj w konsoli:**
   ```
   ❌ Error saving to Firestore: FirebaseError: Missing or insufficient permissions
   ```

## Alternatywne przyczyny (mniej prawdopodobne):

### 1. Quota Firestore wyczerpana
- Sprawdź: https://console.firebase.google.com/project/kawaii-quest/usage
- Darmowy tier: 50,000 odczytów/dzień, 20,000 zapisów/dzień
- Rozwiązanie: Zaczekaj do jutra lub dodaj kartę płatniczą (ale nie zostaniesz obciążona jeśli nie przekroczysz limitów)

### 2. Blokada CORS
- Sprawdź w konsoli przeglądarki czy są błędy CORS
- Rozwiązanie: Dodaj domenę `czkawkaaa.github.io` do listy autoryzowanych w Firebase Console → Authentication → Settings → Authorized domains

### 3. Service Worker cache
- Przeglądarka może cachować starą wersję plików
- Rozwiązanie:
  - Ctrl+Shift+R (hard refresh)
  - Lub wejdź w F12 → Application → Service Workers → Unregister
  - Odśwież stronę

### 4. Firebase API Key nieprawidłowy
- Sprawdź czy apiKey w firebase-config.js jest poprawny
- Aktualny klucz Firebase powinien być pobrany z konsoli Firebase / Google Cloud i nie powinien być publikowany w repozytorium.
- Projekt: `kawaii-quest`

## Test końcowy:

Po naprawieniu reguł, w konsoli przeglądarki uruchom:

```javascript
// Test zapisu
await window.forcePush();
// Czekaj 5 sekund
await new Promise(r => setTimeout(r, 5000));
// Test odczytu
await window.forcePull();
```

Jeśli nie ma błędów = wszystko działa! 🎉

## Najważniejsze:
**Sprawdź reguły Firestore jako PIERWSZE - to najczęstsza przyczyna problemów z sync!**
