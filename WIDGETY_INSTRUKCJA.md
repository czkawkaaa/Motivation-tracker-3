# 🎨 Instrukcja testowania widgetów PWA

## Co zostało naprawione

### 1. **Dodano sekcję `widgets` w manifest.json**
   - Wcześniej manifest **nie miał deklaracji widgetów**, więc system nie wiedział, że aplikacja oferuje widgety
   - Dodano dwa widgety:
     - **Challenge Progress** - pokazuje postęp wyzwania 75-dniowego
     - **Daily Tasks** - pokazuje ukończone zadania dzisiaj
   - Każdy widget ma:
     - `tag` - unikalny identyfikator
     - `template` - plik JSON z układem Adaptive Card
     - `data` - plik JSON z danymi (aktualizowany przez SW)
     - `update: 900` - częstotliwość aktualizacji (15 min)

### 2. **Dodano rejestrację Service Workera w app.js**
   - Automatyczna rejestracja przy starcie aplikacji
   - Handler dla komunikacji MessageChannel (GET_WIDGET_DATA)
   - Funkcja `gatherWidgetData()` - zbiera aktualne dane
   - Funkcja `sendWidgetUpdateToSW()` - wysyła aktualizację do SW
   - Wywołanie przy każdym `saveData()` - automatyczna aktualizacja widgetów

### 3. **Poprawiono Service Worker (sw.js)**
   - Dodano pliki widgetów do cache (manifest, templates, data, ikony)
   - Poprawiono ścieżki cache (pełne ścieżki /Motivation-tracker-3/...)
   - Dodano obsługę GET_WIDGET_DATA przez MessageChannel
   - Zabezpieczono wywołania `self.widgets.updateByTag()` (try/catch)
   - Zwiększono wersję cache do v2 (wymusi odświeżenie)

### 4. **Dodano scope w manifest.json**
   - `"scope": "/Motivation-tracker-3/"` - określa zakres działania PWA

## ⚠️ WAŻNE OGRANICZENIA

### Wsparcie platformowe dla PWA widgets:

**✅ Android 12+ z Chrome 114+**
- Pełne wsparcie dla PWA widgets
- Widgety dostępne przez długie przytrzymanie ikony aplikacji

**❌ iOS / Safari**
- **Brak wsparcia** - iOS nie obsługuje PWA widgets w ogóle
- Zamiast tego można użyć Web Clips lub Shortcuts (ale to nie są widgety z tej implementacji)
- **Instrukcja instalacji PWA na iOS:** Zobacz [IOS_PWA_INSTRUKCJA.md](IOS_PWA_INSTRUKCJA.md)

**❌ Desktop (Windows/Mac/Linux)**
- Ograniczone lub brak wsparcia (zależy od systemu i przeglądarki)

**🔸 Android < 12 lub Chrome < 114**
- Brak wsparcia - widgety nie pojawią się jako opcja

## 📱 Jak przetestować na Androidzie

### Krok 1: Wymagania
- Android 12 lub nowszy
- Chrome 114 lub nowszy (najlepiej najnowsza wersja)
- Dostęp do strony przez HTTPS (GitHub Pages lub localhost z ngrok)

### Krok 2: Instalacja PWA
1. Otwórz stronę w Chrome: `https://czkawkaaa.github.io/Motivation-tracker-3/`
2. Kliknij menu (⋮) → **Dodaj do ekranu głównego** / **Install app**
3. Poczekaj, aż ikona aplikacji pojawi się na ekranie głównym

### Krok 3: Sprawdzenie Service Workera (DevTools Mobile)
1. W Chrome na komputerze: otwórz `chrome://inspect/#devices`
2. Podłącz telefon USB (z włączonym debugowaniem USB)
3. Znajdź stronę/PWA i kliknij **Inspect**
4. W DevTools:
   - Application → Service Workers → sprawdź czy `sw.js` jest **activated and running**
   - Application → Cache Storage → sprawdź czy `kawaii-quest-v2` zawiera:
     - `widget-data.json`
     - `widget-progress.json`
     - `widget-tasks.json`
     - `manifest.json`
   - Console → sprawdź logi:
     - `✅ Service Worker zarejestrowany`
     - `📨 Received widget update request`
     - `✅ Widget data updated in cache`

### Krok 4: Dodanie widgetu
1. Na ekranie głównym Androida: **długie przytrzymanie** ikony aplikacji "Kawaii Quest"
2. Powinno pojawić się menu kontekstowe
3. Szukaj opcji **"Widgets"** lub ikony widgetu
4. Jeśli opcja jest dostępna:
   - Przeciągnij widget na ekran główny
   - Wybierz rozmiar (jeśli dostępne)
   - Widget powinien się pojawić z danymi z aplikacji

### Krok 5: Weryfikacja aktualizacji
1. Otwórz aplikację PWA
2. Wykonaj akcję (np. zaznacz zadanie, dodaj kroki)
3. W konsoli DevTools powinien pojawić się log: `📨 Received widget update request`
4. Widget na ekranie głównym powinien się zaktualizować (może potrwać do 15 minut lub natychmiast, zależy od systemu)

## 🔍 Diagnostyka problemów

### Problem: "Nie widzę opcji Widgets"

**Możliwe przyczyny:**
1. **Urządzenie nie wspiera PWA widgets**
   - Sprawdź wersję Androida: Ustawienia → O telefonie → Wersja Androida (wymagany 12+)
   - Sprawdź wersję Chrome: Chrome → Menu → Ustawienia → Informacje o Chrome (wymagany 114+)

2. **PWA nie jest zainstalowana poprawnie**
   - Odinstaluj PWA (długie przytrzymanie → Usuń)
   - Wyczyść cache przeglądarki
   - Zainstaluj ponownie

3. **Manifest.json nie został załadowany**
   - Sprawdź w DevTools → Application → Manifest
   - Powinna być sekcja "Widgets" z dwoma widgetami
   - Sprawdź w Network czy `manifest.json` zwraca 200 OK

4. **Service Worker nie jest aktywny**
   - DevTools → Application → Service Workers
   - Powinien być status: "activated and running"
   - Jeśli nie: kliknij "Unregister" i odśwież stronę

### Problem: "Widget się nie aktualizuje"

**Rozwiązania:**
1. Sprawdź logi w konsoli - czy `sendWidgetUpdateToSW()` jest wywoływane
2. Sprawdź cache - czy `widget-data.json` jest aktualizowany
3. Sprawdź `self.widgets` w konsoli SW:
   ```javascript
   console.log('Widgets API available:', typeof self.widgets);
   ```
4. Wymuś aktualizację: odinstaluj i zainstaluj ponownie PWA

### Problem: "Błędy w konsoli"

**Typowe błędy i rozwiązania:**
- `❌ Rejestracja Service Workera nie powiodła się` → sprawdź scope i start_url
- `⚠️ No widget data available` → wykonaj akcję w aplikacji (zapisz kroki/zadanie)
- `Widgets API error` → normalne, jeśli platforma nie wspiera (Android < 12)
- `Failed to fetch` dla widget-*.json → upewnij się, że pliki są w repozytorium i w cache

## 📊 Status plików

### Pliki widgetów (wszystkie powinny być w repo):
- ✅ `manifest.json` - z sekcją widgets
- ✅ `widget-progress.json` - template Adaptive Card dla postępu
- ✅ `widget-tasks.json` - template Adaptive Card dla zadań
- ✅ `widget-data.json` - dane inicjalne (aktualizowane przez SW)
- ✅ `sw.js` - Service Worker z obsługą widgetów
- ✅ `app.js` - z rejestracją SW i komunikacją widgetów

### Ścieżki plików (wszystkie względem `/Motivation-tracker-3/`):
- Manifest: `/Motivation-tracker-3/manifest.json`
- Templates: `/Motivation-tracker-3/widget-progress.json`, `widget-tasks.json`
- Data: `/Motivation-tracker-3/widget-data.json`
- SW: `/Motivation-tracker-3/sw.js`
- Ikony: `/Motivation-tracker-3/icon-192.png`, `icon-512.png`

## 🚀 Następne kroki

1. **Commit i push zmian**:
   ```bash
   git add manifest.json sw.js app.js WIDGETY_INSTRUKCJA.md
   git commit -m "feat: dodano pełne wsparcie dla PWA widgets"
   git push origin main
   ```

2. **Poczekaj na deploy GitHub Pages** (2-5 minut)

3. **Testuj na Androidzie 12+** z najnowszym Chrome

4. **Jeśli widgety nadal nie działają**:
   - To najprawdopodobniej ograniczenie platformy
   - Sprawdź dokładną wersję Androida i Chrome
   - Rozważ alternatywne rozwiązania (np. Web Push Notifications z rich content)

## 💡 Alternatywne rozwiązania jeśli widgety nie działają

Jeśli Twoje urządzenie nie wspiera PWA widgets, możesz:

1. **Web Push Notifications** - powiadomienia z postępem (bardziej kompatybilne)
2. **Shortcuts w manifest** - szybkie akcje z ikony (działa na iOS i Android)
3. **Badged icon** - licznik na ikonie aplikacji (Android, częściowo iOS)
4. **Quick actions** - menu kontekstowe ikony z akcjami

---

**Ostatnia aktualizacja:** 2025-10-15
**Status:** Gotowe do testowania na Android 12+ Chrome 114+
