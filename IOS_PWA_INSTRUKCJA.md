# 📱 Instrukcja instalacji aplikacji PWA na iOS

## 🍎 Jak zainstalować Kawaii Quest na iPhone/iPad

Aplikacja **Kawaii Quest** jest Progressive Web App (PWA), co oznacza, że można ją zainstalować na urządzeniach iOS bez potrzeby korzystania z App Store.

---

## 📋 Wymagania

- **iOS 11.3** lub nowszy (zalecane iOS 14+)
- **Safari** - instalacja PWA działa tylko w przeglądarce Safari
- Dostęp do internetu

---

## 🚀 Instrukcja krok po kroku

### Krok 1: Otwórz aplikację w Safari

1. Otwórz przeglądarkę **Safari** na swoim iPhone lub iPad
2. Wejdź na stronę: **https://czkawkaaa.github.io/Motivation-tracker-3/**
3. Poczekaj, aż strona się w pełni załaduje

> ⚠️ **WAŻNE:** Instalacja PWA na iOS działa **tylko w Safari**. Jeśli używasz Chrome, Firefox lub innej przeglądarki, przejdź do Safari.

### Krok 2: Dodaj do ekranu głównego

1. Naciśnij przycisk **"Udostępnij"** (ikonę kwadratu ze strzałką w górę) na dolnym pasku Safari
2. Przewiń w dół i znajdź opcję **"Dodaj do ekranu początkowego"** lub **"Add to Home Screen"**
3. Kliknij tę opcję

![iOS Share Button](https://support.apple.com/library/content/dam/edam/applecare/images/en_US/iOS/ios15-iphone12-pro-safari-share-icon.png)

### Krok 3: Potwierdź instalację

1. Pojawi się okno z nazwą aplikacji: **"Kawaii Quest"**
2. Możesz zmienić nazwę, jeśli chcesz
3. Kliknij **"Dodaj"** w prawym górnym rogu

### Krok 4: Uruchom aplikację

1. Wróć do ekranu głównego swojego urządzenia
2. Znajdź ikonę **"Kawaii Quest"** 🌸
3. Dotknij ikony, aby uruchomić aplikację

Aplikacja otworzy się **w trybie pełnoekranowym** bez paska adresu Safari - będzie wyglądać jak natywna aplikacja!

---

## ✨ Zalety instalacji PWA na iOS

### ✅ Działa jak natywna aplikacja
- Uruchamia się w trybie pełnoekranowym
- Brak paska adresu przeglądarki
- Własna ikona na ekranie głównym
- Szybki dostęp jednym kliknięciem

### ✅ Działanie offline
- Dzięki Service Worker aplikacja działa nawet bez internetu
- Dane są zapisywane lokalnie
- Możesz korzystać z większości funkcji offline

### ✅ Synchronizacja danych
- Po zalogowaniu przez Google dane są synchronizowane między urządzeniami
- Możesz korzystać z aplikacji na telefonie i komputerze jednocześnie

---

## ⚠️ Ograniczenia na iOS

### Czego NIE ma na iOS (w porównaniu do Android)

#### ❌ Brak widgetów PWA
- iOS **nie obsługuje** widgetów PWA na ekranie głównym
- Widgety działają tylko na Android 12+ z Chrome 114+
- Alternatywa: można użyć Shortcuts lub Web Clips (wymaga dodatkowej konfiguracji)

#### ❌ Ograniczone powiadomienia push
- Safari na iOS ma ograniczone wsparcie dla Web Push Notifications
- Powiadomienia push PWA nie są w pełni wspierane (stan na iOS 16)

#### ⚠️ Ograniczenia pamięci cache
- iOS może wyczyścić cache aplikacji po pewnym czasie nieaktywności
- Zalecamy częste logowanie, aby dane były synchronizowane z chmurą

---

## 🔧 Rozwiązywanie problemów

### Problem: Nie widzę opcji "Dodaj do ekranu początkowego"

**Rozwiązania:**
1. Upewnij się, że używasz **przeglądarki Safari** (nie Chrome, Firefox ani inna)
2. Sprawdź, czy masz najnowszą wersję iOS (Ustawienia → Ogólne → Aktualizacja oprogramowania)
3. Spróbuj zamknąć Safari i otworzyć go ponownie
4. Wyczyść cache Safari: Ustawienia → Safari → Wyczyść historię i dane

### Problem: Aplikacja nie działa offline

**Rozwiązania:**
1. Odinstaluj aplikację (długie przytrzymanie → Usuń aplikację)
2. Otwórz stronę w Safari ponownie
3. Poczekaj, aż strona się w pełni załaduje (Service Worker musi się zarejestrować)
4. Zainstaluj aplikację ponownie przez "Dodaj do ekranu początkowego"

### Problem: Dane nie synchronizują się między urządzeniami

**Rozwiązania:**
1. Upewnij się, że jesteś zalogowany przez Google (kliknij "🔐 Zaloguj przez Google")
2. Sprawdź połączenie z internetem
3. Spróbuj wylogować się i zalogować ponownie
4. Sprawdź czy masz te same dane na innym urządzeniu (może być opóźnienie synchronizacji)

### Problem: Aplikacja działa wolno

**Rozwiązania:**
1. Zamknij inne aplikacje w tle
2. Sprawdź dostępną pamięć na urządzeniu
3. Wyczyść cache Safari
4. Zrestartuj urządzenie

---

## 🆚 Różnice między iOS a Android

| Funkcja | iOS (Safari) | Android (Chrome) |
|---------|-------------|------------------|
| Instalacja PWA | ✅ Tak (przez Safari) | ✅ Tak (przez Chrome) |
| Tryb pełnoekranowy | ✅ Tak | ✅ Tak |
| Service Worker | ✅ Tak | ✅ Tak |
| Praca offline | ✅ Tak | ✅ Tak |
| Widgety PWA | ❌ Nie | ✅ Tak (Android 12+) |
| Push Notifications | ⚠️ Ograniczone | ✅ Pełne wsparcie |
| Synchronizacja danych | ✅ Tak | ✅ Tak |

---

## 📸 Zrzuty ekranu procesu instalacji

### 1. Przycisk "Udostępnij" w Safari
<details>
<summary>Kliknij, aby zobaczyć</summary>

Na dolnym pasku Safari (iPhone) lub górnym (iPad) znajdziesz ikonę udostępniania - kwadrat ze strzałką w górę.

</details>

### 2. Menu "Dodaj do ekranu początkowego"
<details>
<summary>Kliknij, aby zobaczyć</summary>

Po kliknięciu "Udostępnij" przewiń w dół, aż znajdziesz opcję "Dodaj do ekranu początkowego" z ikoną plusa.

</details>

### 3. Potwierdzenie instalacji
<details>
<summary>Kliknij, aby zobaczyć</summary>

Pojawi się okno z podglądem ikony, nazwą aplikacji i adresem URL. Kliknij "Dodaj" w prawym górnym rogu.

</details>

---

## 💡 Wskazówki

### Jak zaktualizować aplikację?
- Aplikacja **automatycznie aktualizuje się** przy każdym uruchomieniu (jeśli jest połączenie z internetem)
- Service Worker pobiera najnowszą wersję w tle
- Nie musisz niczego robić - aktualizacje są bezproblemowe!

### Jak odinstalować aplikację?
1. Długie przytrzymanie ikony "Kawaii Quest" na ekranie głównym
2. Wybierz **"Usuń aplikację"** lub **"Remove App"**
3. Potwierdź usunięcie

### Czy mogę używać aplikacji na wielu urządzeniach?
- **Tak!** Po zalogowaniu przez Google Twoje dane są synchronizowane
- Możesz używać aplikacji na iPhone, iPad, komputerze, Androidzie
- Wszystkie urządzenia będą miały aktualne dane

---

## 🎓 Więcej informacji

### Co to jest PWA?
**Progressive Web App (PWA)** to nowoczesny typ aplikacji internetowej, która:
- Działa jak natywna aplikacja
- Nie wymaga instalacji ze sklepu (App Store/Google Play)
- Automatycznie się aktualizuje
- Działa offline dzięki Service Worker
- Zajmuje mniej miejsca niż tradycyjna aplikacja

### Czy PWA jest bezpieczne?
- **Tak!** PWA działa przez HTTPS, co zapewnia szyfrowane połączenie
- Aplikacja jest hostowana na GitHub Pages (zaufana platforma)
- Kod źródłowy jest otwarty i można go sprawdzić na GitHub
- Logowanie przez Google używa OAuth 2.0 (standard bezpieczeństwa)

### Ile miejsca zajmuje aplikacja?
- Sama aplikacja PWA zajmuje **tylko kilka MB**
- Cache (dla pracy offline) zajmuje około **5-10 MB**
- Zdjęcia w galerii są zapisywane lokalnie i mogą zwiększyć rozmiar
- Znacznie mniej niż natywna aplikacja z App Store!

---

## 📞 Potrzebujesz pomocy?

Jeśli masz problemy z instalacją lub korzystaniem z aplikacji:

1. Sprawdź sekcję **"Rozwiązywanie problemów"** powyżej
2. Upewnij się, że spełniasz **wymagania systemowe** (iOS 11.3+, Safari)
3. Zajrzyj do pliku **WIDGETY_INSTRUKCJA.md** dla informacji o widgetach (tylko Android)
4. Otwórz issue na GitHub: https://github.com/czkawkaaa/Motivation-tracker-3/issues

---

## ✅ Podsumowanie

**Aplikacja Kawaii Quest działa świetnie na iOS!** 🎉

Chociaż iOS nie wspiera wszystkich funkcji PWA (np. widgetów), możesz:
- ✅ Zainstalować aplikację na ekranie głównym
- ✅ Korzystać z niej w trybie pełnoekranowym
- ✅ Używać offline
- ✅ Synchronizować dane między urządzeniami
- ✅ Śledzić swoje 75-dniowe wyzwanie

**Ciesz się motywacją w stylu kawaii!** 🌸💖

---

**Ostatnia aktualizacja:** 2025-10-15  
**Status:** Gotowe do użycia na iOS 11.3+
