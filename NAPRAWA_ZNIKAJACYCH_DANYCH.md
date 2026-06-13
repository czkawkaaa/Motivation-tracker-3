# 🔧 Naprawa problemu znikających danych w aplikacji mobilnej

## 🐛 Problem

Na urządzeniach mobilnych (telefon) dane aplikacji znikały:
- ❌ Zaznaczone zadania znikają po odświeżeniu
- ❌ Postęp challenge (currentDay, completedDays) resetuje się
- ❌ Kroki i dane dzienne (mood, study hours) tracone
- ❌ Wystartowanie challenge nie zapisuje się

---

## 🔍 Zdiagnozowane przyczyny

### **Problem 1: Race condition podczas ładowania danych**
```javascript
// PRZED (firebase-sync.js, linia 176)
Object.assign(AppData, cloudData.data); // ❌ Bezwarunkowe nadpisanie
```
**Skutek:** Dane z chmury nadpisywały świeże lokalne dane, nawet jeśli były puste lub starsze.

### **Problem 2: Firebase inicjalizowany bez apiKey**
```javascript
// PRZED (firebase-config.js)
(async () => {
  const mod = await import('./firebase-config.local.js');
  firebaseConfig = { ...firebaseConfig, ...local }; // Za późno!
})();
const app = initializeApp(firebaseConfig); // ❌ Dzieje się PRZED async!
```
**Skutek:** Firebase mógł nie działać poprawnie, powodując błędy synchronizacji.

### **Problem 3: Realtime sync nadpisywał dane bez merge**
```javascript
// PRZED (firebase-sync.js, linia 337)
if (cloudData.lastModified > AppData.lastModified) {
    Object.assign(AppData, cloudData.data); // ❌ Brak merge!
}
```
**Skutek:** Jeśli użytkownik wprowadził dane offline, były tracone przy synchronizacji.

### **Problem 4: Brak zabezpieczenia przed pustymi danymi**
Nigdzie nie sprawdzano czy dane są puste przed zapisem/odczytem.

### **Problem 5: saveData() mogła nie zapisać timestamp**
```javascript
// PRZED (app.js)
localStorage.setItem(...);
window.saveDataToFirestore(); // ❌ Synchroniczne, mogło błędnie ustawić lastModified
```
**Skutek:** Konflikt timestampów powodował nadpisywanie nowszych danych starszymi.

---

## ✅ Wprowadzone rozwiązania

### **1. Przywrócono apiKey w firebase-config.js**
```javascript
// PO
const firebaseConfig = {
  apiKey: "<TWÓJ_KLUCZ_FIREBASE>", // ✅ Używaj wartości z Firebase Console, nie wpisuj go do dokumentacji publicznej
  authDomain: "kawaii-quest.firebaseapp.com",
  // ...
};
const app = initializeApp(firebaseConfig); // ✅ Synchronicznie
```
**Efekt:** Firebase zawsze działa poprawnie od pierwszego uruchomienia.

---

### **2. Dodano inteligentne mergowanie danych w loadDataFromFirestore()**
```javascript
// PO (firebase-sync.js, linia 176-190)
// Zabezpieczenie: sprawdź czy dane z chmury nie są puste
const hasData = cloudData.data.challenge || 
               cloudData.data.steps || 
               cloudData.data.tasks || 
               cloudData.data.completedTasks;

if (hasData) {
    Object.assign(AppData, cloudData.data);
    localStorage.setItem('kawaiiQuestData', JSON.stringify(AppData));
} else {
    console.log('⚠️ Cloud data is empty, keeping local data');
}
```
**Efekt:** Puste dane z chmury nie nadpiszą lokalnych danych.

---

### **3. Inteligentne mergowanie w realtime sync**
```javascript
// PO (firebase-sync.js, linia 337-365)
if (cloudData.lastModified > AppData.lastModified) {
    const hasData = cloudData.data.challenge || 
                   cloudData.data.steps || 
                   cloudData.data.tasks || 
                   cloudData.data.completedTasks;
    
    if (hasData) {
        // Inteligentne mergowanie - zachowaj lokalne jeśli chmura jest pusta
        const mergedData = {
            challenge: cloudData.data.challenge || AppData.challenge,
            steps: cloudData.data.steps || AppData.steps,
            completedTasks: cloudData.data.completedTasks || AppData.completedTasks,
            tasks: cloudData.data.tasks || AppData.tasks,
            // ... reszta pól z fallback na lokalne
        };
        Object.assign(AppData, mergedData);
    } else {
        console.log('⚠️ Cloud data is empty, keeping local data');
    }
}
```
**Efekt:** Synchronizacja nie traci lokalnych danych, nawet jeśli chmura ma puste wartości.

---

### **4. Zabezpieczenie saveData() przed pustymi danymi**
```javascript
// PO (app.js, linia 147-180)
function saveData() {
    // ZAWSZE ustaw timestamp PRZED zapisem
    AppData.lastModified = Date.now();
    
    // Zabezpieczenie: sprawdź czy AppData nie jest pusty
    const hasData = AppData.challenge || 
                   AppData.steps || 
                   AppData.tasks || 
                   AppData.completedTasks;
    
    if (!hasData) {
        console.warn('⚠️ Próba zapisania pustych danych - pominięto');
        return;
    }
    
    // Zapisz lokalnie NAJPIERW (najpewniejsze)
    try {
        localStorage.setItem('kawaiiQuestData', JSON.stringify(AppData));
    } catch (e) {
        console.error('❌ Błąd zapisu do localStorage:', e);
    }
    
    // Firebase jako drugorzędne (nie blokuj jeśli błąd)
    try {
        if (typeof window.saveDataToFirestore === 'function') {
            window.saveDataToFirestore().catch(err => {
                console.warn('⚠️ Firebase sync failed (offline?)', err);
            });
        }
    } catch (e) {
        console.warn('⚠️ Firebase sync error:', e);
    }
}
```
**Efekt:** 
- Puste dane nigdy nie są zapisywane
- localStorage ma priorytet (najbezpieczniejsze)
- Błędy Firebase nie blokują zapisu lokalnego
- Timestamp zawsze ustawiany przed zapisem

---

### **5. Zabezpieczenie loadData() przed pustymi danymi**
```javascript
// PO (app.js, linia 133-163)
function loadData() {
    const saved = localStorage.getItem('kawaiiQuestData');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            
            // Zabezpieczenie: nie ładuj pustych danych
            const hasData = data.challenge || 
                           data.steps || 
                           data.tasks || 
                           data.completedTasks;
            
            if (hasData) {
                Object.assign(AppData, data);
                console.log('📱 Loaded data from localStorage');
            } else {
                console.warn('⚠️ localStorage contains empty data - using defaults');
            }
        } catch (e) {
            console.error('❌ Error parsing localStorage data:', e);
        }
    } else {
        console.log('💾 No saved data found - using defaults');
    }
    applySettings();
}
```
**Efekt:** Zepsute/puste dane nie nadpisują wartości domyślnych.

---

### **6. Zabezpieczenie saveDataToFirestore()**
```javascript
// PO (firebase-sync.js, linia 257-298)
async function saveDataToFirestore() {
    // Zabezpieczenie: nie zapisuj pustych danych
    const hasData = AppData.challenge || 
                   AppData.steps || 
                   AppData.tasks || 
                   AppData.completedTasks;
    
    if (!hasData) {
        console.warn('⚠️ AppData is empty - skipping Firebase save to prevent data loss');
        return;
    }
    
    // Zawsze ustaw timestamp
    AppData.lastModified = Date.now();
    
    await setDoc(docRef, {
        data: AppData,
        lastModified: AppData.lastModified,
        email: currentUser.email,
        updatedAt: serverTimestamp()
    }, { merge: true });
    
    // Backup do localStorage
    localStorage.setItem('kawaiiQuestData', JSON.stringify(AppData));
}
```
**Efekt:** Puste dane nigdy nie trafiają do Firestore, co zapobiega utracie danych na innych urządzeniach.

---

## 🧪 Jak przetestować

### **Test 1: Zaznaczanie zadań (offline)**
1. Wyłącz internet/WiFi na telefonie
2. Otwórz aplikację
3. Zaznacz kilka zadań
4. Odśwież stronę (pull-to-refresh)
5. **Oczekiwany wynik:** ✅ Zadania nadal zaznaczone

### **Test 2: Wystartowanie challenge**
1. Kliknij "Start Challenge"
2. Odśwież stronę
3. **Oczekiwany wynik:** ✅ Challenge nadal aktywny, currentDay = 0

### **Test 3: Ukończenie dnia**
1. Zaznacz wszystkie zadania (dzień się ukończy)
2. Sprawdź czy currentDay zwiększył się
3. Odśwież stronę
4. **Oczekiwany wynik:** ✅ currentDay nadal zwiększony, completedDays zawiera dzisiejszą datę

### **Test 4: Kroki i mood**
1. Zapisz kroki (np. 5000)
2. Zapisz mood (np. 😊)
3. Odśwież stronę
4. **Oczekiwany wynik:** ✅ Kroki i mood zachowane

### **Test 5: Synchronizacja między urządzeniami**
1. Zaloguj się na telefonie, ukończ zadania
2. Zaloguj się na komputerze
3. **Oczekiwany wynik:** ✅ Dane zsynchronizowane
4. Na komputerze dodaj kroki
5. Na telefonie odśwież
6. **Oczekiwany wynik:** ✅ Kroki pojawiły się na telefonie

### **Test 6: Offline → Online**
1. Wyłącz internet, zaznacz zadania
2. Włącz internet
3. Poczekaj 5 sekund
4. **Oczekiwany wynik:** ✅ Dane automatycznie zsynchronizowane do chmury

---

## 📋 Logi diagnostyczne

Sprawdź konsolę przeglądarki (F12 na komputerze, Remote debugging na telefonie):

### **Oczekiwane logi po starcie:**
```
🌸 Kawaii Quest loaded!
📱 Loaded data from localStorage
🚀 Initializing Firebase sync...
✅ User logged in: email@example.com
☁️ Loaded data from cloud
✓ Local data is up to date
```

### **Podczas zapisywania:**
```
☁️ Data saved to cloud
```

### **Jeśli offline:**
```
⚠️ Firebase sync failed (offline?)
```

### **Jeśli dane puste (zabezpieczenie):**
```
⚠️ Cloud data is empty, keeping local data
```

---

## 🎯 Podsumowanie zmian

| Plik | Linie | Zmiana |
|------|-------|--------|
| `firebase-config.js` | 8-16 | Przywrócono apiKey (synchroniczna inicjalizacja) |
| `firebase-sync.js` | 176-190 | Dodano sprawdzanie pustych danych w loadDataFromFirestore() |
| `firebase-sync.js` | 257-298 | Dodano sprawdzanie pustych danych w saveDataToFirestore() |
| `firebase-sync.js` | 337-365 | Inteligentne mergowanie w realtime sync |
| `app.js` | 133-163 | Zabezpieczenie loadData() przed pustymi danymi |
| `app.js` | 147-180 | Zabezpieczenie saveData() przed pustymi danymi + priorytet localStorage |

---

## 📦 Wdrożenie

**Status:** ✅ Gotowe do testowania
**Branch:** main
**Data:** 2025-10-16

### Pliki zmienione:
- `firebase-config.js`
- `firebase-sync.js`
- `app.js`
- `NAPRAWA_ZNIKAJACYCH_DANYCH.md` (ten plik)

### Aby wdrożyć:
```bash
git add .
git commit -m "fix: Naprawa znikających danych w aplikacji mobilnej

- Przywrócono apiKey w firebase-config.js dla synchronicznej inicjalizacji
- Dodano inteligentne mergowanie danych w sync (nie nadpisuje lokalnych)
- Zabezpieczenia przed zapisem/odczytem pustych danych
- localStorage ma priorytet nad Firebase (bezpieczniejsze)
- Timestamp zawsze ustawiany przed zapisem
- Błędy Firebase nie blokują lokalnego zapisu"

git push origin main
```

---

## ⚠️ Notatki dla przyszłych zmian

1. **Nigdy nie używaj bezwarunkowego `Object.assign(AppData, ...)`** bez sprawdzenia czy dane nie są puste
2. **Zawsze ustaw `lastModified = Date.now()` PRZED zapisem**, nie po
3. **localStorage ma priorytet** - Firebase jest tylko backupem/synchronizacją
4. **Zawsze używaj try-catch** przy operacjach Firebase - mogą zawieść (offline, błędy sieci)
5. **Sprawdzaj `hasData`** przed każdym zapisem/odczytem

---

**Autor:** GitHub Copilot
**Data:** 16 października 2025
