# 📱 Widget PWA - Dokumentacja

## 🎯 Widget Postępu Wyzwania

Aplikacja Kawaii Quest obsługuje widgety PWA, które umożliwiają wyświetlanie postępu wyzwania bezpośrednio na ekranie głównym urządzenia mobilnego.

### ✨ Funkcje

- **Pasek postępu**: Wizualizacja postępu wyzwania (0-100%)
- **Licznik dni**: Wyświetla ukończone dni z całkowitej liczby dni (np. "15/75 dni")
- **Procent ukończenia**: Pokazuje dokładny procent ukończenia wyzwania
- **Automatyczna aktualizacja**: Widget aktualizuje się automatycznie co godzinę

### 📊 Obliczanie Procentów

Widget używa **liczby ukończonych dni** do obliczania postępu, a nie liczby dni kalendarzowych od rozpoczęcia wyzwania.

**Przykład:**
- Dzień 1, zadania nieukończone: `0/75 dni (0%)`
- Dzień 1, wszystkie zadania ukończone: `1/75 dni (1%)`
- Dzień 37, wszystkie zadania ukończone: `37/75 dni (49%)`
- Wszystkie 75 dni ukończone: `75/75 dni (100%)`

### 🔧 Techniczne Szczegóły

#### Pliki związane z widgetem:

1. **manifest.json**: Definicja widgetu PWA
2. **widget-template.json**: Szablon widgetu (Adaptive Card)
3. **widget-data.json**: Dane widgetu (aktualizowane dynamicznie)
4. **service-worker.js**: Service Worker do obsługi cache i aktualizacji
5. **app.js**: Logika aktualizacji danych widgetu

#### Kluczowe funkcje:

```javascript
// Aktualizacja postępu wyzwania
function updateChallengeProgress() {
    const completedCount = AppData.challenge.completedDays.length;
    const percent = (completedCount / AppData.challenge.totalDays) * 100;
    // ... aktualizacja UI i widgetu
}

// Aktualizacja danych widgetu
function updateWidgetData(currentDay, totalDays, percent) {
    const widgetData = {
        challengeDays: `${currentDay}/${totalDays} dni`,
        progressValue: Math.min(percent / 100, 1),
        progressPercent: Math.round(percent) + '%'
    };
    // ... zapisz do localStorage i Service Worker
}
```

### 📱 Instalacja Widgetu

1. Otwórz aplikację w przeglądarce obsługującej PWA (Chrome, Edge)
2. Zainstaluj aplikację na ekranie głównym (opcja "Dodaj do ekranu głównego")
3. Po instalacji, długo naciśnij ikonę aplikacji
4. Wybierz "Widgety" lub "Widget"
5. Przeciągnij widget "Challenge Progress" na ekran główny

### 🔄 Synchronizacja

Widget synchronizuje się z aplikacją:
- **Automatycznie**: Co godzinę (3600 sekund)
- **Przy otwieraniu**: Gdy otworzysz aplikację
- **Po ukończeniu zadań**: Gdy ukończysz wszystkie zadania dnia

### ⚙️ Konfiguracja

Widget automatycznie dostosowuje się do ustawień aplikacji:
- Długość wyzwania (domyślnie 75 dni, można zmienić w ustawieniach)
- Motyw kolorystyczny aplikacji

### 🐛 Rozwiązywanie Problemów

**Widget nie aktualizuje się:**
1. Sprawdź, czy masz aktywne połączenie z internetem
2. Otwórz aplikację, aby wymusić aktualizację
3. Usuń i ponownie dodaj widget

**Widget pokazuje stare dane:**
- Odśwież stronę w aplikacji (pociągnij w dół)
- Service Worker zaktualizuje dane widgetu

**Widget nie jest dostępny:**
- Upewnij się, że używasz przeglądarki obsługującej PWA
- Sprawdź, czy aplikacja jest zainstalowana jako PWA
- Niektóre urządzenia/przeglądarki mogą nie obsługiwać widgetów PWA

### 📝 Uwagi

- Widgety PWA są eksperymentalną funkcją
- Obsługa może się różnić w zależności od przeglądarki i systemu operacyjnego
- Najlepsza obsługa: Chrome/Edge na Androidzie

---

**Wersja**: 1.0  
**Data aktualizacji**: 2025-10-15
