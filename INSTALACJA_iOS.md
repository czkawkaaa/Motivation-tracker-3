# 📱 Instalacja Kawaii Quest na iOS

## Tak! Aplikacja może być zainstalowana na iOS jako PWA (Progressive Web App)

Aplikacja **Kawaii Quest** może być dodana do ekranu głównego iPhone'a lub iPada i działać jak natywna aplikacja.

---

## 🚀 Jak zainstalować na iOS?

### Krok 1: Otwórz aplikację w Safari
1. Uruchom przeglądarkę **Safari** na swoim iPhone lub iPad
2. Wejdź na stronę aplikacji: `https://czkawkaaa.github.io/Motivation-tracker-3/`
3. Poczekaj, aż strona się załaduje

> ⚠️ **WAŻNE**: Musisz używać przeglądarki Safari! Inne przeglądarki (Chrome, Firefox) nie obsługują instalacji PWA na iOS.

### Krok 2: Dodaj do ekranu głównego
1. Kliknij przycisk **"Udostępnij"** (ikona kwadratu ze strzałką w górę) na dolnym pasku Safari
2. Przewiń listę opcji w dół i znajdź **"Dodaj do ekranu początkowego"** / **"Add to Home Screen"**
3. Kliknij tę opcję

### Krok 3: Potwierdź instalację
1. Zobaczysz podgląd ikony aplikacji i nazwę "Kawaii Quest"
2. Możesz zmienić nazwę, jeśli chcesz
3. Kliknij **"Dodaj"** / **"Add"** w prawym górnym rogu

### Krok 4: Gotowe! 🎉
Aplikacja pojawi się na ekranie głównym jak zwykła aplikacja!

---

## ✨ Co oferuje aplikacja na iOS?

### ✅ Działa:
- **Tryb offline** - aplikacja działa bez internetu
- **Pełny ekran** - bez paska adresu Safari
- **Ikona na ekranie głównym** - jak natywna aplikacja
- **Synchronizacja w chmurze** - przez Firebase (gdy jesteś online)
- **Wszystkie funkcje** - challenge, zadania, nastroje, galeria, odznaki

### ❌ Nie działa (ograniczenia iOS):
- **Widgety** - iOS nie obsługuje PWA widgets
- **Push notifications** - ograniczona funkcjonalność
- **Instalacja z App Store** - aplikacja nie jest w App Store

---

## 🔍 Rozwiązywanie problemów

### Problem: "Nie widzę opcji 'Dodaj do ekranu początkowego'"
**Rozwiązanie:** 
- Upewnij się, że używasz przeglądarki Safari (nie Chrome ani Firefox)
- Sprawdź, czy jesteś w trybie normalnym (nie prywatnym)
- Zaktualizuj iOS do najnowszej wersji

### Problem: "Aplikacja nie działa offline"
**Rozwiązanie:**
- Otwórz aplikację raz gdy masz internet, aby pobrać pliki
- Service Worker musi się zarejestrować (dzieje się automatycznie)
- Sprawdź, czy masz wystarczająco miejsca na urządzeniu

### Problem: "Dane się nie synchronizują"
**Rozwiązanie:**
- Zaloguj się do aplikacji przez Firebase
- Sprawdź połączenie z internetem
- Upewnij się, że jesteś zalogowany na tym samym koncie na obu urządzeniach

### Problem: "Po zainstalowaniu aplikacja nie uruchamia się"
**Rozwiązanie:**
- Usuń aplikację z ekranu głównego
- Otwórz Safari i wyczyść cache (Ustawienia → Safari → Wyczyść historię i dane)
- Spróbuj zainstalować ponownie

---

## 📋 Wymagania systemowe

- **iOS 11.3 lub nowszy** (zalecane iOS 15+)
- **Safari** - najnowsza wersja
- **~5 MB wolnego miejsca** dla plików aplikacji
- **Połączenie internetowe** do pierwszej instalacji i synchronizacji

---

## 🆚 Różnice między iOS a Androidem

| Funkcja | iOS (Safari) | Android (Chrome) |
|---------|--------------|------------------|
| Instalacja PWA | ✅ Tak | ✅ Tak |
| Tryb offline | ✅ Tak | ✅ Tak |
| Synchronizacja | ✅ Tak | ✅ Tak |
| Widgety PWA | ❌ Nie | ✅ Tak (Android 12+) |
| Push Notifications | ⚠️ Ograniczone | ✅ Pełne |
| Ikona adaptacyjna | ❌ Nie | ✅ Tak |

---

## 💡 Wskazówki

1. **Synchronizacja między urządzeniami**: Zaloguj się na to samo konto Firebase na wszystkich urządzeniach
2. **Tworzenie kopii zapasowej**: Użyj funkcji "Eksportuj dane" w ustawieniach
3. **Najlepsza wydajność**: Aktualizuj iOS i Safari do najnowszych wersji
4. **Oszczędzanie baterii**: Aplikacja nie działa w tle (to ograniczenie iOS)

---

## 🆘 Wsparcie

Jeśli masz problemy z instalacją lub użytkowaniem aplikacji:
1. Sprawdź [GitHub Issues](https://github.com/czkawkaaa/Motivation-tracker-3/issues)
2. Przeczytaj dokumentację: `README.md`, `WIDGETY_INSTRUKCJA.md`
3. Sprawdź konsolę deweloperską w Safari (Ustawienia → Safari → Zaawansowane → Web Inspector)

---

Made with 💖 by Kawaii Quest Team
