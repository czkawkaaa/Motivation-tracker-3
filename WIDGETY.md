# 📱 Widgety PWA - Kawaii Quest

## 🎨 Co zostało dodane?

### 1. **Progress Bar Widget** 🔥
Widget pokazujący:
- Dzień wyzwania (np. "Dzień 15 z 75")
- Progress bar z procentami ukończenia
- Aktualną passę (streak) 🔥
- Liczbę ukończonych dni ✅
- Status dzisiejszego dnia

### 2. **Tasks Widget** 📝
Widget pokazujący:
- Liczbę ukończonych zadań dzisiaj
- Progress bar zadań dnia
- Szybki dostęp do listy zadań

---

## 📲 Jak zainstalować aplikację na telefonie?

### **Android (Chrome/Edge/Samsung Internet)**

1. **Otwórz stronę** w przeglądarce Chrome/Edge
2. Kliknij **menu (⋮)** w prawym górnym rogu
3. Wybierz **"Dodaj do ekranu głównego"** lub **"Zainstaluj aplikację"**
4. Potwierdź instalację
5. Ikona aplikacji pojawi się na ekranie głównym

### **iOS (Safari)**

1. Otwórz stronę w **Safari**
2. Kliknij przycisk **Udostępnij** (kwadrat ze strzałką w górę)
3. Przewiń w dół i wybierz **"Dodaj do ekranu początkowego"**
4. Nazwij aplikację i kliknij **"Dodaj"**
5. Ikona pojawi się na ekranie głównym

⚠️ **Uwaga:** iOS (iPhone/iPad) nie wspiera obecnie widgetów PWA. Widgety działają tylko na Androidzie.

---

## 🎯 Jak dodać widgety na ekran główny? (Android)

### **Metoda 1: Długie przytrzymanie ikony**

1. Po zainstalowaniu aplikacji **przytrzymaj ikonę** na ekranie głównym
2. Powinno pojawić się menu z opcją **"Widgety"**
3. Wybierz widgety Kawaii Quest
4. Przeciągnij wybrany widget na ekran główny

### **Metoda 2: Menu widgetów**

1. **Przytrzymaj palec** na pustym miejscu ekranu głównego
2. Wybierz **"Widgety"** z menu
3. Znajdź **"Kawaii Quest"** na liście
4. Wybierz:
   - **"Postęp wyzwania"** - pokazuje progress bar challengu
   - **"Dzisiejsze zadania"** - pokazuje postęp zadań
5. Przeciągnij na ekran główny

### **Co widgety pokazują?**

#### 🔥 Widget "Postęp wyzwania":
```
🌸 Kawaii Quest
75-dniowe wyzwanie

Dzień 15 z 75
[████████░░░░░░░░░░] 20% ukończone

🔥 7          ✅ 15
Passa        Ukończone

✨ Dzisiaj: Ukończone!
```

#### 📝 Widget "Dzisiejsze zadania":
```
📝 Dzisiejsze zadania

2 / 3 ukończone

[████████████░░░░░░] 67%

[Zobacz zadania]
```

---

## 🔄 Jak działają widgety?

### **Automatyczna aktualizacja**
- Widgety aktualizują się **automatycznie** gdy:
  - Ukończysz zadanie ✅
  - Zmienisz postęp w aplikacji 📊
  - Aplikacja zsynchronizuje dane z chmurą ☁️
  
- Częstotliwość aktualizacji: **co 5 minut** (w tle)
- Możesz **odświeżyć ręcznie** klikając w widget

### **Kliknięcie w widget**
- Kliknięcie w widget **otwiera aplikację**
- Widget "Zadania" otwiera bezpośrednio zakładkę z zadaniami
- Widget "Postęp" otwiera główny widok aplikacji

---

## 🎨 Shortcuts (Szybkie akcje)

Po zainstalowaniu aplikacji możesz użyć **szybkich akcji**:

1. **Przytrzymaj ikonę** aplikacji na ekranie głównym
2. Pojawi się menu z opcjami:
   - 📝 **Dodaj zadanie** - szybko dodaj nowe zadanie
   - 😊 **Dodaj nastrój** - zapisz swój nastrój
   - 📊 **Statystyki** - zobacz swoje statystyki

---

## 🔧 Rozwiązywanie problemów

### ❓ Nie widzę opcji "Dodaj do ekranu głównego"
- Sprawdź czy używasz **Chrome/Edge/Samsung Internet** (Android) lub **Safari** (iOS)
- Upewnij się że jesteś na **HTTPS** (bezpieczne połączenie)
- Spróbuj **odświeżyć stronę** (Ctrl+R lub ⟳)

### ❓ Widgety nie pojawiają się
- Widgety działają tylko na **Android 12+** (lub nowszym)
- Upewnij się że **zainstalowałeś aplikację** (nie tylko dodałeś skrót)
- Spróbuj **ponownie zainstalować** aplikację
- Nie wszystkie przeglądarki wspierają widgety (najlepiej działa **Chrome**)

### ❓ Widget nie aktualizuje się
- **Otwórz aplikację** - widget aktualizuje się gdy aplikacja jest używana
- Sprawdź czy masz włączoną **aktywność w tle** dla aplikacji w ustawieniach systemu
- **Kliknij w widget** aby wymusić aktualizację
- Upewnij się że masz połączenie z internetem (dla synchronizacji)

### ❓ Widget pokazuje stare dane
- **Wymuś aktualizację**: Otwórz aplikację → wykonaj akcję → wróć do ekranu głównego
- **Odinstaluj i zainstaluj ponownie** widget:
  1. Usuń widget z ekranu głównego
  2. Dodaj go ponownie z menu widgetów

---

## 🚀 Funkcje PWA

### ✅ Co działa offline?
- ✅ Wszystkie podstawowe funkcje
- ✅ Przeglądanie danych
- ✅ Dodawanie zadań, nastrojów
- ✅ Widgety (pokazują ostatnie zsynchronizowane dane)

### ☁️ Co wymaga internetu?
- Synchronizacja z chmurą Firebase
- Logowanie przez Google
- Aktualizacja danych na innych urządzeniach

---

## 📝 Pliki utworzone

1. **`manifest.json`** - rozszerzony o:
   - Definicje widgetów (`widgets`)
   - Szybkie akcje (`shortcuts`)
   - Kategorie aplikacji

2. **`sw.js`** - Service Worker:
   - Cache aplikacji (offline support)
   - Obsługa aktualizacji widgetów
   - Periodic Background Sync

3. **`widget-progress.json`** - szablon widgetu postępu
4. **`widget-tasks.json`** - szablon widgetu zadań
5. **`widget-data.json`** - dane dla widgetów (aktualizowane automatycznie)

6. **`app.js`** - dodana funkcja:
   - `updateWidgetData()` - aktualizuje dane widgetów

---

## 🎯 Status wsparcia widgetów

| System operacyjny | Wsparcie widgetów | Wersja |
|------------------|-------------------|--------|
| ✅ Android        | **TAK**          | 12+    |
| ❌ iOS            | NIE              | -      |
| ⚠️ Windows        | Częściowe        | 11+    |
| ❌ macOS          | NIE              | -      |
| ❌ Linux          | NIE              | -      |

---

## 💡 Tips & Tricks

1. **Dodaj oba widgety** - jeden dla postępu, drugi dla zadań
2. **Umieść widgety na pierwszym ekranie** - łatwiejszy dostęp
3. **Różne rozmiary** - większość systemów pozwala na zmianę rozmiaru widgetu (2x2, 4x2, itd.)
4. **Personalizacja** - możesz zmienić motyw w aplikacji, widget się dostosuje
5. **Przypomnienia** - włącz powiadomienia w przeglądarce aby dostawać przypomnienia

---

## 🔮 Przyszłe funkcje widgetów

Planowane usprawnienia:
- 📊 Widget ze statystykami tygodniowymi
- 😊 Widget nastrojów z wykresem
- 🏆 Widget odznak i osiągnięć
- 🎨 Personalizowane motywy widgetów
- 📸 Widget z galerią zdjęć
- ⏰ Widget z timerem/countdownem do końca challengu

---

Masz pytania? Problem z widgetami? Otwórz Issue na GitHubie! 🌸

