# 🌸 Kawaii Quest — Motivation Tracker

**Aplikacja motywacyjna stworzona przez Wiktorię Radomską**

Kawaii Quest to konfigurowalny tracker wyzwań i codziennych nawyków. Nie narzuca jednego zestawu zadań ani nie wymaga realizowania gotowego planu 75 Hard — możesz dopasować wyzwanie, zadania i zasady do siebie.

**Wersja online:** https://czkawkaaa.github.io/Motivation-tracker-3/

## Co można śledzić

- **Wyzwanie:** własna nazwa i długość od 1 do 365 dni. Wyzwanie rozpoczyna się po zaakceptowaniu zasad.
- **Codzienne zadania:** edytuj listę zadań, dodawaj i usuwaj pozycje oraz zmieniaj ich kolejność.
- **Zadania według dni tygodnia:** opcjonalnie ustawiaj osobny zestaw zadań na każdy dzień tygodnia.
- **Zasady:** edytuj treść zasad w ustawieniach i zapoznaj się z nimi przed rozpoczęciem wyzwania. Zasady nie są narzuconą listą reguł 75 Hard.
- **Dni odpoczynku:** wybierz jeden lub więcej dni odpoczynku i zdecyduj, czy mają być wliczane do streaka.
- **Postępy:** zapisuj kroki, nastrój i czas nauki; włączaj lub wyłączaj sekcje kroków, nauki i workoutów oraz ustawiaj cele.
- **Refleksje:** zapisuj odpowiedzi i wracaj do nich w kalendarzu.

## Pozostałe funkcje

- **Kalendarz** z historią dni, aktywności, streaka i refleksji.
- **Statystyki** postępów, nastroju, kroków, nauki i aktywności treningowej.
- **Workouty:** planuj treningi, dodawaj linki do filmów z YouTube lub własne ćwiczenia, kategoryzuj aktywności, zapisuj biegi i ćwiczone partie ciała. Możesz też ustawić różne treningi na poszczególne dni tygodnia.
- **Cele i nagrody:** zapisz cel główny, podziel go na mniejsze etapy, przypisz im nagrody i oznaczaj osiągnięcia.
- **Galeria** zdjęć postępów.
- **Odznaki** przyznawane za wybrane aktywności i osiągnięcia.
- **Raport postępów:** wygeneruj raport HTML, a następnie użyj drukowania w przeglądarce, by zapisać go jako PDF.
- **Personalizacja:** wybierz motyw, czcionkę i język interfejsu.
- **PWA:** aplikację można zainstalować na urządzeniu z poziomu obsługiwanej przeglądarki.

## Dane i synchronizacja

Postępy są zapisywane lokalnie w przeglądarce. Aplikacja udostępnia również logowanie przez Google i synchronizację przez Firebase, aby korzystać z danych na różnych urządzeniach. Synchronizacja wymaga działającej konfiguracji Firebase i reguł Firestore; dane lokalne pozostają oddzielne od konta przeglądarki.

W ustawieniach dostępny jest **raport HTML do wydruku/PDF**. To raport postępów, a nie pełna kopia zapasowa danych do zaimportowania.

## Uruchomienie i wdrożenie

Aplikacja jest statyczną stroną internetową. Do lokalnego uruchomienia użyj lokalnego serwera HTTP — na przykład rozszerzenia Live Server w VS Code — i otwórz w przeglądarce plik `index.html`. Serwer jest potrzebny m.in. do poprawnego działania modułów JavaScript i service workera.

Aby opublikować własną kopię przez GitHub Pages:

1. Wypchnij repozytorium na GitHuba.
2. Otwórz **Settings → Pages**.
3. Wybierz wdrażanie z gałęzi `main` i katalogu `/(root)`.
4. Zapisz ustawienia i otwórz adres Pages przypisany do repozytorium.

Przy własnym wdrożeniu z synchronizacją Firebase skonfiguruj projekt Firebase, logowanie Google, Firestore, autoryzowane domeny i `firebase-config.js`.

## Technologie

- HTML, CSS i JavaScript (bez frameworka aplikacyjnego)
- Firebase Authentication i Cloud Firestore
- `localStorage` do lokalnego zapisu danych
- Service worker i manifest PWA

## Języki

Ustawienia oferują język polski, angielski i włoski. Nie wszystkie teksty i komunikaty muszą być przetłumaczone we wszystkich widokach.

---

Stworzone z 💖 przez Wiktorię Radomską
