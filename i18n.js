(function (global) {
    const supportedLanguages = ['pl', 'en', 'it'];

    const phraseMap = {
        'pl': {},
        'en': {
            // EMOJI HEADERS & UI - EXACT MATCHES
            '🔐 Zaloguj przez Google': '🔐 Sign in with Google',
            '🏠 Główna': '🏠 Home',
            '📅 Kalendarz': '📅 Calendar',
            '📊 Statystyki': '📊 Stats',
            '💪 Workouty': '💪 Workouts',
            '📜 Zasady': '📜 Rules',
            '🖼️ Galeria': '🖼️ Gallery',
            '🏆 Odznaki': '🏆 Badges',
            '⚙️ Ustawienia': '⚙️ Settings',
            '✨ personalizacja motywów': '✨ theme customization',
            '🏆 odznaki i progres': '🏆 badges and progress',
            '📈 dashboard bez chaosu': '📈 a clean dashboard',
            '🎯 Wyzwanie': '🎯 Challenge',
            '🔥 Streak': '🔥 Streak',
            '👣 Dzisiejsze kroki': '👣 Today\'s steps',
            '✅ Kroki zapisane!': '✅ Steps saved!',
            '😊 Dziennik samopoczucia': '😊 Mood journal',
            '✅ Nastrój zapisany!': '✅ Mood saved!',
            '📚 Dzisiejsza nauka': '📚 Today\'s study',
            'Godziny nauki zapisane! 📖': 'Study hours saved! 📖',
            '📝 Zadania na dziś': '📝 Tasks for today',
            '🔄 Resetuj': '🔄 Reset',
            '✅ Ukończ wszystko': '✅ Complete all',
            '✏️ Edytuj zadania': '✏️ Edit tasks',
            '➕ Dodaj': '➕ Add',
            '💾 Zapisz zmiany': '💾 Save changes',
            '👣 Postęp kroków': '👣 Steps progress',
            '😊 Historia nastroju': '😊 Mood history',
            '📚 Postęp nauki': '📚 Study progress',
            '💪 Postęp workoutów': '💪 Workouts progress',
            '💪 Workouty – uporządkowane i gotowe do codziennej roboty': '💪 Workouts – organized and ready for daily work',
            '🏃 Bieg / aktywność': '🏃 Run / activity',
            '🦾 Siłownia / partie ciała': '🦾 Gym / body parts',
            '🎥 Filmy / zadania': '🎥 Videos / tasks',
            '🗂️ Filtry kategorii': '🗂️ Category filters',
            '🏃 Bieganie': '🏃 Running',
            '🦾 Siłownia': '🦾 Gym',
            '🧘 Rozciąganie': '🧘 Stretching',
            '🎥 Film': '🎥 Video',
            '💪 Własne': '💪 Custom',
            '📜 Zasady Wyzwania': '📜 Challenge Rules',
            '✅ Zgadzam się i akceptuję zasady': '✅ I agree and accept the rules',
            '📸 Wybierz zdjęcie': '📸 Select photo',
            '🎨 Personalizacja': '🎨 Personalization',
            'Język / Language:': 'Language:',
            'Motyw:': 'Theme:',
            'Czcionka:': 'Font:',
            '🎯 Konfiguracja wyzwania': '🎯 Challenge configuration',
            'Długość wyzwania (dni):': 'Challenge length (days):',
            'Cel kroków:': 'Steps goal:',
            'Cel godzin nauki:': 'Study hours goal:',
            'Cel workoutów:': 'Workouts goal:',
            'Dzień odpoczynku:': 'Rest day:',
            '🔊 Dźwięki i efekty': '🔊 Sounds and effects',
            'Głośność:': 'Volume:',
            '📅 Zadania tygodniowe': '📅 Weekly tasks',
            '🌟 Poniedziałek': '🌟 Monday',
            '💪 Wtorek': '💪 Tuesday',
            '🌸 Środa': '🌸 Wednesday',
            '⚡ Czwartek': '⚡ Thursday',
            '🎉 Piątek': '🎉 Friday',
            '🌈 Sobota': '🌈 Saturday',
            '✨ Niedziela': '✨ Sunday',
            '📊 Eksport danych': '📊 Data export',
            '📥 Pobierz pełny raport ze statystykami': '📥 Download full statistics report',
            '📜 Zasady wyzwania - Edycja': '📜 Challenge rules - Edit',
            '💪 Workouty - Zarządzanie': '💪 Workouts - Management',
            '🔁 Synchronizacja': '🔁 Synchronization',
            '🔄 Wymuś sync': '🔄 Force sync',
            '⬇️ Pobierz chmurę': '⬇️ Pull from cloud',
            '⬆️ Wypchnij lokalne': '⬆️ Push local',
            '🔄 Aplikacja': '🔄 Application',
            '⬇️ Pobierz najnowszą wersję': '⬇️ Download latest version',
            '⚠️ Strefa niebezpieczna': '⚠️ Danger zone',
            '🗑️ Resetuj cały postęp': '🗑️ Reset all progress',
            '❌ Usuń konto i wszystkie dane': '❌ Delete account and all data',
            '✅ Akceptuję zasady': '✅ I accept the rules',
            'Dodaj link YouTube:': 'Add YouTube link:',
            'Dodaj własne ćwiczenie (bez YouTube):': 'Add custom exercise (no YouTube):',
            'Dobra robota, odpocznij! 💖': 'Great job, rest up! 💖',
            'Dziś jest Twój dzień odpoczynku': 'Today is your rest day',

            // STANDARD STRINGS
            'Główna': 'Home',
            'Kalendarz': 'Calendar',
            'Statystyki': 'Stats',
            'Workouty': 'Workouts',
            'Zasady': 'Rules',
            'Galeria': 'Gallery',
            'Odznaki': 'Badges',
            'Ustawienia': 'Settings',
            'Łączenie...': 'Connecting...',
            'Wyloguj': 'Logout',
            'Zaloguj przez Google': 'Sign in with Google',
            'Wyświetlane dane dla:': 'Showing data for:',
            'Wróć do dzisiaj': 'Back to today',
            'Challenge mode': 'Challenge mode',
            'Twoje codzienne wyzwanie, uśmiech i do dzieła': 'Your daily challenge, a smile, and let\'s do this',
            'Śledź progres, odznaki i codzienny rytm w jednym miejscu — od pierwszego dnia aż po ostatnie poty.': 'Track progress, badges, and your daily rhythm in one place - from day one to the last drop of sweat.',
            'Wyzwanie 75 dni': '75-day challenge',
            'Wyzwanie': 'Challenge',
            'Twój progres wygląda lepiej, kiedy masz jasny rytm i wizualny feedback.': 'Your progress looks better when you have a clear rhythm and visual feedback.',
            'Przed rozpoczęciem wyzwania musisz zaakceptować zasady w zakładce': 'Before starting the challenge, you must accept the rules in the',
            'Rozpocznij wyzwanie': 'Start challenge',
            'Streak': 'Streak',
            'Dzisiejsze kroki': 'Today\'s steps',
            'Zapisz': 'Save',
            'Dziennik samopoczucia': 'Mood journal',
            'Zapisz nastrój': 'Save mood',
            'Wszystkie treningi z YouTube i własne zadania są teraz w jednej, czytelnej sekcji z odznaką „wykonane dziś”.': 'All YouTube workouts and custom tasks are now in one clear section with a “done today” badge.',
            'Kroki': 'Steps',
            'Samopoczucie': 'Mood',
            'Nauka': 'Study',
            'Zadania': 'Tasks',
            'Zasady wyzwania': 'Challenge rules',
            'Odznaki zdobyte 🏆': 'Badges earned 🏆',
            'Zadania ukończone': 'Tasks completed',
            'Pokaż sekcję kroków w głównym widoku 👣': 'Show the steps section on the main view 👣',
            'Włącz kroki': 'Enable steps',
            'Całkowity cel kroków do osiągnięcia przez całe wyzwanie': 'Total steps goal for the entire challenge',
            'Pokaż sekcję nauki w głównym widoku 📚': 'Show the study section on the main view 📚',
            'Włącz naukę': 'Enable study',
            'Całkowity cel godzin nauki do osiągnięcia przez całe wyzwanie': 'Total study hours goal for the entire challenge',
            'Włącz workouty': 'Enable workouts',
            'Pokaż sekcję workoutów w głównym widoku 💪': 'Show the workouts section on the main view 💪',
            'Całkowity cel workoutów do zrobienia przez całe wyzwanie': 'Total workouts goal for the whole challenge',
            'Brak': 'None',
            'Liczyć dni odpoczynku jako ukończone': 'Count rest days as completed',
            'Dźwięki interfejsu': 'Interface sounds',
            'Zadania tygodniowe': 'Weekly tasks',
            'Dostosuj zadania do dnia tygodnia': 'Adjust tasks to the day of the week',
            'Zamiast tych samych zadań każdego dnia, możesz ustawić różne zadania dla każdego dnia tygodnia 🗓️': 'Instead of the same tasks every day, you can set different tasks for each day of the week 🗓️',
            'Nowe zadanie...': 'New task...',
            'Eksport danych': 'Data export',
            'Pobierz pełny raport ze statystykami': 'Download the full statistics report',
            'Pobierz kompletny raport z wszystkimi statystykami, odznakami, treningami i osiągnięciami. Plik HTML otworzy się automatycznie - naciśnij': 'Download a complete report with all stats, badges, workouts and achievements. The HTML file will open automatically - press',
            'aby zapisać swoje osiągnięcia!': 'to save your achievements!',
            'Zasady wyzwania - Edycja': 'Challenge rules - Edit',
            'Tutaj możesz edytować zasady wyzwania. Aby zaakceptować zasady, przejdź do zakładki "📜 Zasady".': 'Here you can edit the challenge rules. To accept the rules, go to the "📜 Rules" tab.',
            'Workouty - Zarządzanie': 'Workouts - Management',
            'Dostosuj workouty do dnia tygodnia': 'Adjust workouts to the day of the week',
            'Zamiast tych samych workoutów każdego dnia, możesz ustawić różne workouty dla każdego dnia tygodnia 🗓️': 'Instead of the same workouts every day, you can set different workouts for each day of the week 🗓️',
            'Wklej link do YouTube z ćwiczeniami i przypisz kategorię dla lepszego porządku.': 'Paste a YouTube exercise link and assign a category for better organization.',
            'Własne ćwiczenia bez wideo 💪': 'Custom exercises without video 💪',
            'Budzik': 'Alarm',
            'Dzisiaj': 'Today',
            'Motywacja': 'Motivation',
            'Powrót': 'Back',
            'Zapisz bieg': 'Save run',
            'Dzisiejsze treningi': 'Today\'s workouts',
            'Filtry kategorii': 'Category filters',
            'Szybko przełączaj widok między bieganiem, siłownią, rozciąganiem i filmami z YouTube.': 'Quickly switch between running, gym, stretching and YouTube videos.',
            'Wszystkie': 'All',
            'Bieganie': 'Running',
            'Siłownia': 'Gym',
            'Rozciąganie': 'Stretching',
            'Film': 'Video',
            'Własne': 'Custom',
            'Brak workoutów na dziś': 'No workouts for today',
            'Brak workoutów w tej kategorii. Zmień filtr, aby zobaczyć inne treningi.': 'No workouts in this category. Change the filter to see other workouts.',
            'Kliknij, aby odtworzyć film': 'Click to play the video',
            'Własne ćwiczenie (tygodniowe)': 'Custom exercise (weekly)',
            'Własne ćwiczenie': 'Custom exercise',
            'Ukończone dziś': 'Done today',
            'Do zrobienia': 'To do',
            'Zrób dziś': 'Do today',
            'Gotowe': 'Done',
            'Otwórz': 'Open',
            'Dodaj': 'Add',
            'Usuń': 'Delete',
            'Zasady zostały zaakceptowane!': 'The rules have been accepted!',
            'Musisz zaakceptować zasady aby rozpocząć wyzwanie': 'You must accept the rules to start the challenge',
            'Dodano:': 'Added:',
            'Brak danych biegu dziś – wpisz dystans i czas.': 'No run data today - enter distance and time.',
            'Wybrane partie:': 'Selected body parts:',
            'Brak wybranych partii – kliknij, aby zaznaczyć dziś trening.': 'No body parts selected - click to mark today\'s workout.',
            'Ukończono dziś': 'Completed today',
            'z zaplanowanych zadań treningowych. Kliknij „Zrób dziś” albo checkbox, aby śledzić progres.': 'of planned workout tasks. Click “Do today” or the checkbox to track progress.',
            'Dodaj pierwszy film lub własne ćwiczenie, aby rozpocząć plan treningowy na dziś.': 'Add your first video or custom exercise to start today\'s workout plan.',
            'Workouty wyłączone. Włącz je w ustawieniach!': 'Workouts are turned off. Enable them in settings!',
            'Bieg / aktywność': 'Run / activity',
            'Zapisz dzisiejszy bieg, czas i rekord, a aplikacja pokaże Ci, jak wygląda Twój progres.': 'Save today\'s run, time and record, and the app will show your progress.',
            'Siłownia / partie ciała': 'Gym / body parts',
            'Wybierz partie, które dziś ćwiczyłaś i od razu zobaczysz swój plan w jednym miejscu.': 'Choose the body parts you trained today and see your plan in one place.',
            'Filmy / zadania': 'Videos / tasks',
            'Ukończono dziś zadań treningowych. Możesz oznaczać gotowe filmy i ćwiczenia jednym kliknięciem.': 'workout tasks completed today. You can mark finished videos and exercises with one click.',
            'Kliknij, aby zagrać': 'Click to play',
            'Wyzwanie rozpoczęte! Dzień 1 rozpoczyna się dzisiaj. Powodzenia!': 'Challenge started! Day 1 begins today. Good luck!',
            'Przed rozpoczęciem wyzwania musisz zaakceptować zasady': 'Before starting the challenge you must accept the rules',
            'Zadania są dostosowane do dnia tygodnia:': 'Tasks are adjusted to the day of the week:',
            'na Mac': 'on Mac',
            'aby zapisać jako PDF: Naciśnij Ctrl+P (lub Cmd+P na Mac) i wybierz "Zapisz jako PDF"': 'to save as PDF: Press Ctrl+P (or Cmd+P on Mac) and choose "Save as PDF"',
            'Wszystkie informacje ze strony': 'All information from the site',
            'Raport zawiera teraz wszystkie dane z aplikacji': 'The report now includes all app data',
            'Ostatni zapis': 'Latest entry',
            'Najdłuższy bieg': 'Longest run',
            'Kawaii Quest - Raport Postępów': 'Kawaii Quest - Progress Report',
            'Raport wygenerowany:': 'Report generated:',
            'Dni ukończone': 'Days completed',
            'Postęp wyzwania': 'Challenge progress',
            'Aktualna passa': 'Current streak',
            'Najdłuższa passa': 'Longest streak',
            'Łącznie kroków': 'Total steps',
            'Średnio kroków/dzień': 'Average steps/day',
            'Rekord kroków': 'Step record',
            'Treningi ukończone': 'Workouts completed',
            'Perfekcyjne dni': 'Perfect days',
            'Godzin nauki': 'Study hours',
            'Średni nastrój': 'Average mood',
            'Zdjęcia w galerii': 'Photos in gallery',
            'Odznaki zdobyte': 'Badges earned',
            'Treningów ukończonych': 'Workouts completed',
            'Biegi łącznie': 'Runs total',
            'Czas biegania': 'Running time',
            'Zapisane biegi': 'Saved runs',
            'Kategorie workoutów': 'Workout categories',
            'Biegi': 'Runs',
            'Brak zapisanych biegów': 'No saved runs',
            'Brak zapisanych partii ciała': 'No saved body parts',
            'Partie ciała': 'Body parts',
            'Twoje treningi': 'Your workouts',
            'Brak workoutów do pokazania': 'No workouts to show',
            'Historia aktywności': 'Activity history',
            'Dni z danymi': 'Days with data',
            'Historia': 'History',
            'Ustawienia aplikacji': 'App settings',
            'Język': 'Language',
            'Motyw': 'Theme',
            'Czcionka': 'Font',
            'Długość wyzwania': 'Challenge length',
            'Cel nauki': 'Study goal',
            'Cel workoutów': 'Workouts goal',
            'Wybrane partie': 'Selected parts',
            'Dzień odpoczynku': 'Rest day',
            'Bieg': 'Run',
            'Data': 'Date',
            'zdjęć': 'photos',
            'więcej zdjęć': 'more photos',
            'Zdjęcie z galerii': 'Gallery photo',
            'dni': 'days',
            'Poniedziałek': 'Monday',
            'Wtorek': 'Tuesday',
            'Środa': 'Wednesday',
            'Czwartek': 'Thursday',
            'Piątek': 'Friday',
            'Sobota': 'Saturday',
            'Niedziela': 'Sunday',
            'Trening': 'Workout',
            'Status logowania:': 'Login status:',
            'ID użytkownika:': 'User ID:',
            'Realtime sync:': 'Realtime sync:',
            'Ostatni sync:': 'Last sync:',
            'Ostatni błąd:': 'Last error:',
            'Ostatni odczyt:': 'Last read:',
            'Ostatni zapis:': 'Last write:',
            'Przestrzegaj tych zasad przez cały czas trwania wyzwania!': 'Follow these rules for the entire duration of the challenge!',
            'Brak danych jeszcze dziś.': 'No data yet today.',
            'Brak wybranych partii.': 'No parts selected.',
            'Ładuję dzisiejsze treningi…': 'Loading today\'s workouts…',
            'Synchronizacja odbywa się automatycznie przy powrocie do karty i po odzyskaniu połączenia.': 'Sync happens automatically when returning to the tab and after regaining connection.',
            'Musisz być zalogowany/a przez Google aby synchronizacja działała między urządzeniami.': 'You must be logged in with Google for sync to work between devices.',
            'Jeśli widzisz błąd "permission-denied", skontaktuj się - trzeba zaktualizować reguły Firestore!': 'If you see a "permission-denied" error, contact us - Firestore rules need to be updated!',
            'Usunięcie konta spowoduje trwałe usunięcie wszystkich danych z urządzenia i chmury. Ta operacja jest nieodwracalna!': 'Deleting your account will permanently remove all data from your device and the cloud. This action cannot be undone!',
            'Przed rozpoczęciem challengu musisz zaakceptować poniższe zasady:': 'Before starting the challenge you must accept the following rules:',
            'Wpisz "USUŃ" aby potwierdzić usunięcie konta:': 'Type "USUŃ" to confirm account deletion:',
            '✅ Najnowsza wersja została pobrana. Odświeżam stronę...': '✅ Latest version downloaded. Refreshing page...',
            '✅ Zasady zaakceptowane! Możesz teraz rozpocząć wyzwanie klikając przycisk na stronie głównej!': '✅ Rules accepted! You can now start the challenge by clicking the button on the home page!',
            '✅ Zasada zaktualizowana': '✅ Rule updated',
            '✅ Workout dodany!': '✅ Workout added!',
            '✅ Ćwiczenie dodane!': '✅ Exercise added!',
            '⚠️ Dzień został cofnięty. Ukończ zadania ponownie aby przywrócić streak!': '⚠️ Day was undone. Complete tasks again to restore your streak!',
            '💾 Zadania zapisane!': '💾 Tasks saved!',
            '🎉 Dzień ukończony! Świetna robota!': '🎉 Day completed! Great job!',
            '🎊 GRATULACJE! 🎊': '🎊 CONGRATULATIONS! 🎊',
            'Ukończyłeś 75-dniowe wyzwanie!': 'You completed the 75-day challenge!',
            'To niesamowite osiągnięcie! Jesteś prawdziwą legendą! 🌟': 'This is an amazing achievement! You are a true legend! 🌟',
            '🗑️ Zdjęcie zostało usunięte': '🗑️ Photo deleted',
            '🎉 Nowa odznaka!': '🎉 New badge!',
            '✅ Dane usunięte z chmury': '✅ Data deleted from cloud',
            '✅ localStorage wyczyszczony': '✅ localStorage cleared',
            '✅ Zalogowany': '✅ Logged in',
            '❌ Niezalogowany': '❌ Not logged in',
            '🔄 Synchronizacja zakończona': '🔄 Sync complete',
            '⬇️ Pobieranie z chmury zakończone': '⬇️ Download from cloud complete',
            '⬆️ Wypchnięto lokalne dane': '⬆️ Local data pushed',
            '❌ Błąd podczas resetowania:': '❌ Error during reset:',
            '✅ Konto zostało usunięte. Aplikacja zostanie odświeżona.': '✅ Account deleted. The app will be refreshed.'
        },
        'it': {
            // EMOJI HEADERS & UI - EXACT MATCHES
            '🔐 Zaloguj przez Google': '🔐 Accedi con Google',
            '🏠 Główna': '🏠 Home',
            '📅 Kalendarz': '📅 Calendario',
            '📊 Statystyki': '📊 Statistiche',
            '💪 Workouty': '💪 Allenamenti',
            '📜 Zasady': '📜 Regole',
            '🖼️ Galeria': '🖼️ Galleria',
            '🏆 Odznaki': '🏆 Badge',
            '⚙️ Ustawienia': '⚙️ Impostazioni',
            '✨ personalizacja motywów': '✨ personalizzazione dei temi',
            '🏆 odznaki i progres': '🏆 badge e progressi',
            '📈 dashboard bez chaosu': '📈 dashboard ordinata',
            '🎯 Wyzwanie': '🎯 Sfida',
            '🔥 Streak': '🔥 Serie',
            '👣 Dzisiejsze kroki': '👣 Passi di oggi',
            '✅ Kroki zapisane!': '✅ Passi salvati!',
            '😊 Dziennik samopoczucia': '😊 Diario dell\'umore',
            '✅ Nastrój zapisany!': '✅ Umore salvato!',
            '📚 Dzisiejsza nauka': '📚 Studio di oggi',
            'Godziny nauki zapisane! 📖': 'Ore di studio salvate! 📖',
            '📝 Zadania na dziś': '📝 Compiti per oggi',
            '🔄 Resetuj': '🔄 Ripristina',
            '✅ Ukończ wszystko': '✅ Completa tutto',
            '✏️ Edytuj zadania': '✏️ Modifica compiti',
            '➕ Dodaj': '➕ Aggiungi',
            '💾 Zapisz zmiany': '💾 Salva modifiche',
            '👣 Postęp kroków': '👣 Progressi passi',
            '😊 Historia nastroju': '😊 Cronologia umore',
            '📚 Postęp nauki': '📚 Progressi studio',
            '💪 Postęp workoutów': '💪 Progressi allenamenti',
            '💪 Workouty – uporządkowane i gotowe do codziennej roboty': '💪 Allenamenti – organizzati e pronti per l\'uso quotidiano',
            '🏃 Bieg / aktywność': '🏃 Corsa / attività',
            '🦾 Siłownia / partie ciała': '🦾 Palestra / parti del corpo',
            '🎥 Filmy / zadania': '🎥 Video / compiti',
            '🗂️ Filtry kategorii': '🗂️ Filtri categoria',
            '🏃 Bieganie': '🏃 Corsa',
            '🦾 Siłownia': '🦾 Palestra',
            '🧘 Rozciąganie': '🧘 Stretching',
            '🎥 Film': '🎥 Video',
            '💪 Własne': '💪 Personalizzato',
            '📜 Zasady Wyzwania': '📜 Regole della sfida',
            '✅ Zgadzam się i akceptuję zasady': '✅ Sono d\'accordo e accetto le regole',
            '📸 Wybierz zdjęcie': '📸 Seleziona foto',
            '🎨 Personalizacja': '🎨 Personalizzazione',
            'Język / Language:': 'Lingua:',
            'Motyw:': 'Tema:',
            'Czcionka:': 'Carattere:',
            '🎯 Konfiguracja wyzwania': '🎯 Configurazione sfida',
            'Długość wyzwania (dni):': 'Durata della sfida (giorni):',
            'Cel kroków:': 'Obiettivo passi:',
            'Cel godzin nauki:': 'Obiettivo ore di studio:',
            'Cel workoutów:': 'Obiettivo allenamenti:',
            'Dzień odpoczynku:': 'Giorno di riposo:',
            '🔊 Dźwięki i efekty': '🔊 Suoni ed effetti',
            'Głośność:': 'Volume:',
            '📅 Zadania tygodniowe': '📅 Compiti settimanali',
            '🌟 Poniedziałek': '🌟 Lunedì',
            '💪 Wtorek': '💪 Martedì',
            '🌸 Środa': '🌸 Mercoledì',
            '⚡ Czwartek': '⚡ Giovedì',
            '🎉 Piątek': '🎉 Venerdì',
            '🌈 Sobota': '🌈 Sabato',
            '✨ Niedziela': '✨ Domenica',
            '📊 Eksport danych': '📊 Esportazione dati',
            '📥 Pobierz pełny raport ze statystykami': '📥 Scarica report completo con statistiche',
            '📜 Zasady wyzwania - Edycja': '📜 Regole della sfida - Modifica',
            '💪 Workouty - Zarządzanie': '💪 Allenamenti - Gestione',
            '🔁 Synchronizacja': '🔁 Sincronizzazione',
            '🔄 Wymuś sync': '🔄 Forza sincronizzazione',
            '⬇️ Pobierz chmurę': '⬇️ Scarica dal cloud',
            '⬆️ Wypchnij lokalne': '⬆️ Invia dati locali',
            '🔄 Aplikacja': '🔄 Applicazione',
            '⬇️ Pobierz najnowszą wersję': '⬇️ Scarica l\'ultima versione',
            '⚠️ Strefa niebezpieczna': '⚠️ Zona di pericolo',
            '🗑️ Resetuj cały postęp': '🗑️ Ripristina tutti i progressi',
            '❌ Usuń konto i wszystkie dane': '❌ Elimina account e tutti i dati',
            '✅ Akceptuję zasady': '✅ Accetto le regole',
            'Dodaj link YouTube:': 'Aggiungi link YouTube:',
            'Dodaj własne ćwiczenie (bez YouTube):': 'Aggiungi esercizio personalizzato (senza YouTube):',
            'Dobra robota, odpocznij! 💖': 'Ottimo lavoro, riposati! 💖',
            'Dziś jest Twój dzień odpoczynku': 'Oggi è il tuo giorno di riposo',

            // STANDARD STRINGS
            'Główna': 'Home',
            'Kalendarz': 'Calendario',
            'Statystyki': 'Statistiche',
            'Workouty': 'Allenamenti',
            'Zasady': 'Regole',
            'Galeria': 'Galleria',
            'Odznaki': 'Badge',
            'Ustawienia': 'Impostazioni',
            'Łączenie...': 'Connessione...',
            'Wyloguj': 'Esci',
            'Zaloguj przez Google': 'Accedi con Google',
            'Wyświetlane dane dla:': 'Dati mostrati per:',
            'Wróć do dzisiaj': 'Torna a oggi',
            'Challenge mode': 'Modalità sfida',
            'Twoje codzienne wyzwanie, uśmiech i do dzieła': 'La tua sfida quotidiana, un sorriso e via',
            'Śledź progres, odznaki i codzienny rytm w jednym miejscu — od pierwszego dnia aż po ostatnie poty.': 'Segui i progressi, i badge e il ritmo quotidiano in un unico posto - dal primo giorno fino all\'ultimo sudore.',
            'Wyzwanie 75 dni': 'Sfida di 75 giorni',
            'Wyzwanie': 'Sfida',
            'Twój progres wygląda lepiej, kiedy masz jasny rytm i wizualny feedback.': 'I tuoi progressi appaiono meglio quando hai un ritmo chiaro e un feedback visivo.',
            'Przed rozpoczęciem wyzwania musisz zaakceptować zasady w zakładce': 'Prima di iniziare la sfida devi accettare le regole nella scheda',
            'Rozpocznij wyzwanie': 'Inizia la sfida',
            'Streak': 'Serie',
            'Dzisiejsze kroki': 'Passi di oggi',
            'Zapisz': 'Salva',
            'Dziennik samopoczucia': 'Diario dell\'umore',
            'Zapisz nastrój': 'Salva umore',
            'Wszystkie treningi z YouTube i własne zadania są teraz w jednej, czytelnej sekcji z odznaką „wykonane dziś”.': 'Tutti gli allenamenti YouTube e i compiti personalizzati sono ora in un\'unica sezione chiara con il badge “fatto oggi”.',
            'Kroki': 'Passi',
            'Samopoczucie': 'Umore',
            'Nauka': 'Studio',
            'Zadania': 'Compiti',
            'Zasady wyzwania': 'Regole della sfida',
            'Odznaki zdobyte 🏆': 'Badge ottenuti 🏆',
            'Zadania ukończone': 'Compiti completati',
            'Pokaż sekcję kroków w głównym widoku 👣': 'Mostra la sezione passi nella vista principale 👣',
            'Włącz kroki': 'Abilita passi',
            'Całkowity cel kroków do osiągnięcia przez całe wyzwanie': 'Obiettivo totale di passi per l\'intera sfida',
            'Pokaż sekcję nauki w głównym widoku 📚': 'Mostra la sezione studio nella vista principale 📚',
            'Włącz naukę': 'Abilita studio',
            'Całkowity cel godzin nauki do osiągnięcia przez całe wyzwanie': 'Obiettivo totale di ore di studio per l\'intera sfida',
            'Włącz workouty': 'Abilita allenamenti',
            'Pokaż sekcję workoutów w głównym widoku 💪': 'Mostra la sezione allenamenti nella vista principale 💪',
            'Całkowity cel workoutów do zrobienia przez całe wyzwanie': 'Obiettivo totale di allenamenti per l\'intera sfida',
            'Brak': 'Nessuno',
            'Liczyć dni odpoczynku jako ukończone': 'Conta i giorni di riposo come completati',
            'Dźwięki interfejsu': 'Suoni dell\'interfaccia',
            'Zadania tygodniowe': 'Compiti settimanali',
            'Dostosuj zadania do dnia tygodnia': 'Adatta i compiti al giorno della settimana',
            'Zamiast tych samych zadań każdego dnia, możesz ustawić różne zadania dla każdego dnia tygodnia 🗓️': 'Invece degli stessi compiti ogni giorno, puoi impostare compiti diversi per ogni giorno della settimana 🗓️',
            'Nowe zadanie...': 'Nuovo compito...',
            'Eksport danych': 'Esportazione dati',
            'Pobierz pełny raport ze statystykami': 'Scarica il report completo delle statistiche',
            'Pobierz kompletny raport z wszystkimi statystykami, odznakami, treningami i osiągnięciami. Plik HTML otworzy się automatycznie - naciśnij': 'Scarica un report completo con tutte le statistiche, badge, allenamenti e risultati. Il file HTML si aprirà automaticamente - premi',
            'aby zapisać swoje osiągnięcia!': 'per salvare i tuoi risultati!',
            'Zasady wyzwania - Edycja': 'Regole della sfida - Modifica',
            'Tutaj możesz edytować zasady wyzwania. Aby zaakceptować zasady, przejdź do zakładki "📜 Zasady".': 'Qui puoi modificare le regole della sfida. Per accettare le regole, vai alla scheda "📜 Regole".',
            'Workouty - Zarządzanie': 'Allenamenti - Gestione',
            'Dostosuj workouty do dnia tygodnia': 'Adatta gli allenamenti al giorno della settimana',
            'Zamiast tych samych workoutów każdego dnia, możesz ustawić różne workouty dla każdego dnia tygodnia 🗓️': 'Invece degli stessi allenamenti ogni giorno, puoi impostare allenamenti diversi per ogni giorno della settimana 🗓️',
            'Wklej link do YouTube z ćwiczeniami i przypisz kategorię dla lepszego porządku.': 'Incolla il link YouTube e assegna una categoria per una migliore organizzazione.',
            'Własne ćwiczenia bez wideo 💪': 'Esercizi personalizzati senza video 💪',
            'Budzik': 'Sveglia',
            'Dzisiaj': 'Oggi',
            'Motywacja': 'Motivazione',
            'Powrót': 'Indietro',
            'Zapisz bieg': 'Salva corsa',
            'Dzisiejsze treningi': 'Allenamenti di oggi',
            'Filtry kategorii': 'Filtri categoria',
            'Szybko przełączaj widok między bieganiem, siłownią, rozciąganiem i filmami z YouTube.': 'Passa rapidamente tra corsa, palestra, stretching e video YouTube.',
            'Wszystkie': 'Tutti',
            'Bieganie': 'Corsa',
            'Siłownia': 'Palestra',
            'Rozciąganie': 'Stretching',
            'Film': 'Video',
            'Własne': 'Personalizzato',
            'Brak workoutów na dziś': 'Nessun allenamento per oggi',
            'Brak workoutów w tej kategorii. Zmień filtr, aby zobaczyć inne treningi.': 'Nessun allenamento in questa categoria. Cambia il filtro per vedere altri allenamenti.',
            'Kliknij, aby odtworzyć film': 'Clicca per riprodurre il video',
            'Własne ćwiczenie (tygodniowe)': 'Esercizio personalizzato (settimanale)',
            'Własne ćwiczenie': 'Esercizio personalizzato',
            'Ukończone dziś': 'Fatto oggi',
            'Do zrobienia': 'Da fare',
            'Zrób dziś': 'Fai oggi',
            'Gotowe': 'Fatto',
            'Otwórz': 'Apri',
            'Dodaj': 'Aggiungi',
            'Usuń': 'Elimina',
            'Zasady zostały zaakceptowane!': 'Le regole sono state accettate!',
            'Musisz zaakceptować zasady aby rozpocząć wyzwanie': 'Devi accettare le regole per iniziare la sfida',
            'Dodano:': 'Aggiunto:',
            'Brak danych biegu dziś – wpisz dystans i czas.': 'Nessun dato sulla corsa oggi - inserisci distanza e tempo.',
            'Wybrane partie:': 'Parti selezionate:',
            'Brak wybranych partii – kliknij, aby zaznaczyć dziś trening.': 'Nessuna parte selezionata - clicca per segnare l\'allenamento di oggi.',
            'Ukończono dziś': 'Completati oggi',
            'z zaplanowanych zadań treningowych. Kliknij „Zrób dziś” albo checkbox, aby śledzić progres.': 'dei compiti di allenamento pianificati. Clicca "Fai oggi" o la casella di controllo per monitorare i progressi.',
            'Dodaj pierwszy film lub własne ćwiczenie, aby rozpocząć plan treningowy na dziś.': 'Aggiungi il tuo primo video o esercizio personalizzato per iniziare il piano di allenamento di oggi.',
            'Workouty wyłączone. Włącz je w ustawieniach!': 'Allenamenti disattivati. Abilitali nelle impostazioni!',
            'Bieg / aktywność': 'Corsa / attività',
            'Zapisz dzisiejszy bieg, czas i rekord, a aplikacja pokaże Ci, jak wygląda Twój progres.': 'Salva la corsa di oggi, il tempo e il record, e l\'app mostrerà i tuoi progressi.',
            'Siłownia / partie ciała': 'Palestra / parti del corpo',
            'Wybierz partie, które dziś ćwiczyłaś i od razu zobaczysz swój plan w jednym miejscu.': 'Scegli le parti del corpo che hai allenato oggi e vedi il tuo piano in un solo posto.',
            'Filmy / zadania': 'Video / compiti',
            'Ukończono dziś zadań treningowych. Możesz oznaczać gotowe filmy i ćwiczenia jednym kliknięciem.': 'compiti di allenamento completati oggi. Puoi segnare i video e gli esercizi finiti con un clic.',
            'Kliknij, aby zagrać': 'Clicca per giocare',
            'Wyzwanie rozpoczęte! Dzień 1 rozpoczyna się dzisiaj. Powodzenia!': 'Sfida iniziata! Il giorno 1 inizia oggi. Buona fortuna!',
            'Przed rozpoczęciem wyzwania musisz zaakceptować zasady': 'Prima di iniziare la sfida devi accettare le regole',
            'Zadania są dostosowane do dnia tygodnia:': 'I compiti sono adattati al giorno della settimana:',
            'na Mac': 'su Mac',
            'aby zapisać jako PDF: Naciśnij Ctrl+P (lub Cmd+P na Mac) i wybierz "Zapisz jako PDF"': 'per salvare come PDF: premi Ctrl+P (o Cmd+P su Mac) e scegli "Salva come PDF"',
            'Wszystkie informacje ze strony': 'Tutte le informazioni dal sito',
            'Raport zawiera teraz wszystkie dane z aplikacji': 'Il report ora include tutti i dati dell\'app',
            'Ostatni zapis': 'Ultima voce',
            'Najdłuższy bieg': 'Corsa più lunga',
            'Kawaii Quest - Raport Postępów': 'Kawaii Quest - Report dei progressi',
            'Raport wygenerowany:': 'Report generato:',
            'Dni ukończone': 'Giorni completati',
            'Postęp wyzwania': 'Progresso della sfida',
            'Aktualna passa': 'Serie attuale',
            'Najdłuższa passa': 'Serie più lunga',
            'Łącznie kroków': 'Passi totali',
            'Średnio kroków/dzień': 'Passi medi/giorno',
            'Rekord kroków': 'Record di passi',
            'Treningi ukończone': 'Allenamenti completati',
            'Perfekcyjne dni': 'Giorni perfetti',
            'Godzin nauki': 'Ore di studio',
            'Średni nastrój': 'Umore medio',
            'Zdjęcia w galerii': 'Foto in galleria',
            'Odznaki zdobyte': 'Badge ottenuti',
            'Treningów ukończonych': 'Allenamenti completati',
            'Biegi łącznie': 'Corse totali',
            'Czas biegania': 'Tempo di corsa',
            'Zapisane biegi': 'Corse salvate',
            'Kategorie workoutów': 'Categorie di allenamenti',
            'Biegi': 'Corse',
            'Brak zapisanych biegów': 'Nessuna corsa salvata',
            'Brak zapisanych partii ciała': 'Nessuna parte del corpo salvata',
            'Partie ciała': 'Parti del corpo',
            'Twoje treningi': 'I tuoi allenamenti',
            'Brak workoutów do pokazania': 'Nessun allenamento da mostrare',
            'Historia aktywności': 'Cronologia delle attività',
            'Dni z danymi': 'Giorni con dati',
            'Historia': 'Cronologia',
            'Ustawienia aplikacji': 'Impostazioni dell\'app',
            'Język': 'Lingua',
            'Motyw': 'Tema',
            'Czcionka': 'Carattere',
            'Długość wyzwania': 'Lunghezza della sfida',
            'Cel nauki': 'Obiettivo di studio',
            'Cel workoutów': 'Obiettivo di allenamento',
            'Wybrane partie': 'Parti selezionate',
            'Dzień odpoczynku': 'Giorno di riposo',
            'Bieg': 'Corsa',
            'Data': 'Data',
            'zdjęć': 'foto',
            'więcej zdjęć': 'più foto',
            'Zdjęcie z galerii': 'Foto dalla galleria',
            'dni': 'giorni',
            'Poniedziałek': 'Lunedì',
            'Wtorek': 'Martedì',
            'Środa': 'Mercoledì',
            'Czwartek': 'Giovedì',
            'Piątek': 'Venerdì',
            'Sobota': 'Sabato',
            'Niedziela': 'Domenica',
            'Trening': 'Allenamento',
            'Status logowania:': 'Stato di accesso:',
            'ID użytkownika:': 'ID utente:',
            'Realtime sync:': 'Sincronizzazione in tempo reale:',
            'Ostatni sync:': 'Ultima sincronizzazione:',
            'Ostatni błąd:': 'Ultimo errore:',
            'Ostatni odczyt:': 'Ultima lettura:',
            'Ostatni zapis:': 'Ultimo salvataggio:',
            'Przestrzegaj tych zasad przez cały czas trwania wyzwania!': 'Segui queste regole per l\'intera durata della sfida!',
            'Brak danych jeszcze dziś.': 'Nessun dato ancora oggi.',
            'Brak wybranych partii.': 'Nessuna parte selezionata.',
            'Ładuję dzisiejsze treningi…': 'Caricamento degli allenamenti di oggi...',
            'Synchronizacja odbywa się automatycznie przy powrocie do karty i po odzyskaniu połączenia.': 'La sincronizzazione avviene automaticamente al ritorno alla scheda e dopo aver recuperato la connessione.',
            'Musisz być zalogowany/a przez Google aby synchronizacja działała między urządzeniami.': 'Devi accedere a Google per far funzionare la sincronizzazione tra i dispositivi.',
            'Jeśli widzisz błąd "permission-denied", skontaktuj się - trzeba zaktualizować reguły Firestore!': 'Se vedi l\'errore "permission-denied", contattaci: è necessario aggiornare le regole di Firestore!',
            'Usunięcie konta spowoduje trwałe usunięcie wszystkich danych z urządzenia i chmury. Ta operacja jest nieodwracalna!': 'L\'eliminazione del tuo account rimuoverà in modo permanente tutti i dati dal tuo dispositivo e dal cloud. Questa azione è irreversibile!',
            'Przed rozpoczęciem challengu musisz zaakceptować poniższe zasady:': 'Prima di iniziare la sfida devi accettare le seguenti regole:',
            'Wpisz "USUŃ" aby potwierdzić usunięcie konta:': 'Digita "USUŃ" per confermare l\'eliminazione dell\'account:',
            '✅ Najnowsza wersja została pobrana. Odświeżam stronę...': '✅ L\'ultima versione è stata scaricata. Aggiornamento pagina...',
            '✅ Zasady zaakceptowane! Możesz teraz rozpocząć wyzwanie klikając przycisk na stronie głównej!': '✅ Regole accettate! Ora puoi iniziare la sfida cliccando sul pulsante nella home page!',
            '✅ Zasada zaktualizowana': '✅ Regola aggiornata',
            '✅ Workout dodany!': '✅ Allenamento aggiunto!',
            '✅ Ćwiczenie dodane!': '✅ Esercizio aggiunto!',
            '⚠️ Dzień został cofnięty. Ukończ zadania ponownie aby przywrócić streak!': '⚠️ Giorno annullato. Completa i compiti di nuovo per ripristinare la serie!',
            '💾 Zadania zapisane!': '💾 Compiti salvati!',
            '🎉 Dzień ukończony! Świetna robota!': '🎉 Giorno completato! Ottimo lavoro!',
            '🎊 GRATULACJE! 🎊': '🎊 CONGRATULAZIONI! 🎊',
            'Ukończyłeś 75-dniowe wyzwanie!': 'Hai completato la sfida di 75 giorni!',
            'To niesamowite osiągnięcie! Jesteś prawdziwą legendą! 🌟': 'È un risultato incredibile! Sei una vera leggenda! 🌟',
            '🗑️ Zdjęcie zostało usunięte': '🗑️ Foto eliminata',
            '🎉 Nowa odznaka!': '🎉 Nuovo badge!',
            '✅ Dane usunięte z chmury': '✅ Dati eliminati dal cloud',
            '✅ localStorage wyczyszczony': '✅ localStorage cancellato',
            '✅ Zalogowany': '✅ Connesso',
            '❌ Niezalogowany': '❌ Non connesso',
            '🔄 Synchronizacja zakończona': '🔄 Sincronizzazione completata',
            '⬇️ Pobieranie z chmury zakończone': '⬇️ Download dal cloud completato',
            '⬆️ Wypchnięto lokalne dane': '⬆️ Dati locali caricati',
            '❌ Błąd podczas resetowania:': '❌ Errore durante il reset:',
            '✅ Konto zostało usunięte. Aplikacja zostanie odświeżona.': '✅ L\'account è stato eliminato. L\'app verrà aggiornata.'
        }
    };

    const badgeMeta = {
        'first-steps': { icon: '👣', name: { pl: 'Pierwsze kroki', en: 'First steps', it: 'Primi passi' }, description: { pl: 'Ukończ pierwszy dzień', en: 'Complete your first day', it: 'Completa il primo giorno' } },
        'first-mood': { icon: '💭', name: { pl: 'Pierwsze wrażenie', en: 'First impression', it: 'Prima impressione' }, description: { pl: 'Zapisz pierwszy nastrój', en: 'Log your first mood', it: 'Registra il primo umore' } },
        'first-photo': { icon: '📷', name: { pl: 'Pierwsza chwila', en: 'First moment', it: 'Primo momento' }, description: { pl: 'Dodaj pierwsze zdjęcie', en: 'Add your first photo', it: 'Aggiungi la tua prima foto' } },
        '3-day-streak': { icon: '🔥', name: { pl: 'Startowy ogień', en: 'Starter fire', it: 'Fuoco iniziale' }, description: { pl: '3 dni z rzędu', en: '3 days in a row', it: '3 giorni di fila' } },
        '7-day-streak': { icon: '🔥🔥', name: { pl: 'Tygodniowy płomień', en: 'Weekly flame', it: 'Fiamma settimanale' }, description: { pl: '7 dni z rzędu', en: '7 days in a row', it: '7 giorni di fila' } },
        '14-day-streak': { icon: '🔥🔥🔥', name: { pl: 'Dwutygodniowa fala', en: 'Two-week wave', it: 'Onda di due settimane' }, description: { pl: '14 dni z rzędu', en: '14 days in a row', it: '14 giorni di fila' } },
        'no-days-off': { icon: '🔥💯', name: { pl: 'No Days Off', en: 'No Days Off', it: 'Nessun giorno libero' }, description: { pl: '21-dniowy streak bez przerwy', en: '21-day streak without a break', it: 'Serie di 21 giorni senza pausa' } },
        '30-day-streak': { icon: '🔥✨', name: { pl: 'Miesięczny mistrz', en: 'Monthly master', it: 'Maestro mensile' }, description: { pl: '30 dni z rzędu', en: '30 days in a row', it: '30 giorni di fila' } },
        'goku-ultra': { icon: '👊⚡', name: { pl: 'Ultra Instinct', en: 'Ultra Instinct', it: 'Ultra Istinto' }, description: { pl: 'Osiągnij 50-dniowy streak', en: 'Reach a 50-day streak', it: 'Raggiungi una serie di 50 giorni' } },
        'plus-ultra': { icon: '⚡💪', name: { pl: 'Plus Ultra!', en: 'Plus Ultra!', it: 'Plus Ultra!' }, description: { pl: 'Przekrocz własne limity - 60-dniowy streak', en: 'Push past your limits - 60-day streak', it: 'Supera i tuoi limiti - serie di 60 giorni' } },
        'task-beginner': { icon: '✅', name: { pl: 'Początkujący', en: 'Beginner', it: 'Principiante' }, description: { pl: 'Ukończ 1 dzień pełen zadań', en: 'Complete 1 full task day', it: 'Completa 1 giorno pieno di compiti' } },
        'task-master': { icon: '✅✅', name: { pl: 'Mistrz zadań', en: 'Task master', it: 'Maestro dei compiti' }, description: { pl: 'Ukończ 10 dni pełnych zadań', en: 'Complete 10 full task days', it: 'Completa 10 giorni pieni di compiti' } },
        'task-legend': { icon: '✅👑', name: { pl: 'Legendarny wykonawca', en: 'Legendary performer', it: 'Esecutore leggendario' }, description: { pl: 'Ukończ 30 dni pełnych zadań', en: 'Complete 30 full task days', it: 'Completa 30 giorni pieni di compiti' } },
        'mood-tracker': { icon: '😊', name: { pl: 'Łowca nastrojów', en: 'Mood hunter', it: 'Cacciatore di umori' }, description: { pl: 'Zapisz 5 dni nastroju', en: 'Log mood for 5 days', it: 'Registra l\'umore per 5 giorni' } },
        'mood-master': { icon: '😊💖', name: { pl: 'Mistrz emocji', en: 'Emotion master', it: 'Maestro delle emozioni' }, description: { pl: 'Zapisz 30 dni nastroju', en: 'Log mood for 30 days', it: 'Registra l\'umore per 30 giorni' } },
        'always-happy': { icon: '🥰', name: { pl: 'Promyk słońca', en: 'Sunbeam', it: 'Raggio di sole' }, description: { pl: '5 dni z najlepszym nastrojem', en: '5 days with the best mood', it: '5 giorni con il miglior umore' } },
        'mood-swinger': { icon: '🎭', name: { pl: 'Emocjonalna huśtawka', en: 'Mood swing', it: 'Altalena emotiva' }, description: { pl: 'Zapisz wszystkie 5 typów nastroju', en: 'Log all 5 mood types', it: 'Registra tutti e 5 i tipi di umore' } },
        'steps-5k': { icon: '🚶', name: { pl: 'Pierwsze kroki (5K)', en: 'First steps (5K)', it: 'Primi passi (5K)' }, description: { pl: 'Zrób 5 000 kroków w jednym dniu', en: 'Take 5,000 steps in one day', it: 'Fai 5.000 passi in un giorno' } },
        'steps-10k': { icon: '🏃', name: { pl: 'Aktywny (10K)', en: 'Active (10K)', it: 'Attivo (10K)' }, description: { pl: 'Zrób 10 000 kroków w jednym dniu', en: 'Take 10,000 steps in one day', it: 'Fai 10.000 passi in un giorno' } },
        'steps-50k': { icon: '🏃‍♀️', name: { pl: 'Biegacz (50K)', en: 'Runner (50K)', it: 'Corridore (50K)' }, description: { pl: 'Zbierz 50 000 kroków łącznie', en: 'Collect 50,000 steps in total', it: 'Raccogli 50.000 passi in totale' } },
        'steps-100k': { icon: '🏃‍♀️💨', name: { pl: 'Maratończyk (100K)', en: 'Marathoner (100K)', it: 'Maratoneta (100K)' }, description: { pl: 'Zbierz 100 000 kroków łącznie', en: 'Collect 100,000 steps in total', it: 'Raccogli 100.000 passi in totale' } },
        'steps-250k': { icon: '👟⚡', name: { pl: 'Legenda kroków (250K)', en: 'Step legend (250K)', it: 'Leggenda dei passi (250K)' }, description: { pl: 'Zbierz 250 000 kroków łącznie', en: 'Collect 250,000 steps in total', it: 'Raccogli 250.000 passi in totale' } },
        'rocky-balboa': { icon: '🥊🏃', name: { pl: 'Rocky Balboa', en: 'Rocky Balboa', it: 'Rocky Balboa' }, description: { pl: 'Przebiegnij 500,000 kroków łącznie', en: 'Reach 500,000 steps total', it: 'Raggiungi 500.000 passi totali' } },
        'photographer': { icon: '📸', name: { pl: 'Fotograf', en: 'Photographer', it: 'Fotografo' }, description: { pl: 'Dodaj 10 zdjęć do galerii', en: 'Add 10 photos to the gallery', it: 'Aggiungi 10 foto alla galleria' } },
        'social-butterfly': { icon: '🦋✨', name: { pl: 'Motyl społeczny', en: 'Social butterfly', it: 'Farfalla sociale' }, description: { pl: 'Dodaj 25 zdjęć do galerii', en: 'Add 25 photos to the gallery', it: 'Aggiungi 25 foto alla galleria' } },
        'memory-keeper': { icon: '📸✨', name: { pl: 'Strażnik wspomnień', en: 'Memory keeper', it: 'Custode dei ricordi' }, description: { pl: 'Dodaj 50 zdjęć do galerii', en: 'Add 50 photos to the gallery', it: 'Aggiungi 50 foto alla galleria' } },
        'workout-beginner': { icon: '💪', name: { pl: 'Początkujący atleta', en: 'Beginner athlete', it: 'Atleta principiante' }, description: { pl: 'Ukończ pierwszy trening', en: 'Complete your first workout', it: 'Completa il tuo primo allenamento' } },
        'workout-warrior': { icon: '🏋️', name: { pl: 'Wojownik siłowni', en: 'Gym warrior', it: 'Guerriero della palestra' }, description: { pl: 'Ukończ 10 treningów', en: 'Complete 10 workouts', it: 'Completa 10 allenamenti' } },
        'workout-beast': { icon: '🦍', name: { pl: 'Bestia treningu', en: 'Workout beast', it: 'Bestia dell\'allenamento' }, description: { pl: 'Ukończ 30 treningów', en: 'Complete 30 workouts', it: 'Completa 30 allenamenti' } },
        'workout-legend': { icon: '🏆💪', name: { pl: 'Legenda fitnessu', en: 'Fitness legend', it: 'Leggenda del fitness' }, description: { pl: 'Ukończ 75 treningów', en: 'Complete 75 workouts', it: 'Completa 75 allenamenti' } },
        'one-punch': { icon: '🥊💥', name: { pl: 'One Punch', en: 'One Punch', it: 'One Punch' }, description: { pl: 'Ukończ 100 treningów', en: 'Complete 100 workouts', it: 'Completa 100 allenamenti' } },
        'iron-dedication': { icon: '⚡💪', name: { pl: 'Żelazne zaangażowanie', en: 'Iron dedication', it: 'Dedizione di ferro' }, description: { pl: '7-dniowa passa treningowa', en: '7-day workout streak', it: 'Serie di allenamenti di 7 giorni' } },
        'weekend-warrior': { icon: '💪🎉', name: { pl: 'Wojownik weekendu', en: 'Weekend warrior', it: 'Guerriero del weekend' }, description: { pl: 'Ćwicz w sobotę i niedzielę', en: 'Work out on Saturday and Sunday', it: 'Allenati sabato e domenica' } },
        'optimus-prime': { icon: '🤖', name: { pl: 'Optimus Prime', en: 'Optimus Prime', it: 'Optimus Prime' }, description: { pl: 'Użyj motywu Transformers', en: 'Use the Transformers theme', it: 'Usa il tema Transformers' } },
        'bumblebee': { icon: '🐝⚡', name: { pl: 'Bumblebee', en: 'Bumblebee', it: 'Bumblebee' }, description: { pl: 'Zmień motyw na żółty', en: 'Switch to the yellow theme', it: 'Passa al tema giallo' } },
        'dark-knight': { icon: '🌙🦇', name: { pl: 'Mroczny rycerz', en: 'Dark Knight', it: 'Cavaliere oscuro' }, description: { pl: 'Użyj trybu ciemnego', en: 'Use dark mode', it: 'Usa la modalità scura' } },
        'rainbow-master': { icon: '🌈', name: { pl: 'Mistrz kolorów', en: 'Color master', it: 'Maestro dei colori' }, description: { pl: 'Wypróbuj 5 różnych motywów', en: 'Try 5 different themes', it: 'Prova 5 temi diversi' } },
        'theme-explorer': { icon: '🎨✨', name: { pl: 'Odkrywca stylów', en: 'Style explorer', it: 'Esploratore di stili' }, description: { pl: 'Wypróbuj wszystkie motywy', en: 'Try all themes', it: 'Prova tutti i temi' } },
        'perfectionist': { icon: '💯', name: { pl: 'Perfekcjonista', en: 'Perfectionist', it: 'Perfezionista' }, description: { pl: 'Ukończ 10 dni bez przegapienia żadnego zadania', en: 'Complete 10 days without missing any task', it: 'Completa 10 giorni senza saltare nessun compito' } },
        'discipline-master': { icon: '🎯💎', name: { pl: 'Mistrz dyscypliny', en: 'Discipline master', it: 'Maestro della disciplina' }, description: { pl: 'Ukończ 50 dni bez przegapienia zadań', en: 'Complete 50 days without missing tasks', it: 'Completa 50 giorni senza saltare compiti' } },
        'comeback-king': { icon: '👑🔥', name: { pl: 'Król powrotu', en: 'Comeback king', it: 'Re del ritorno' }, description: { pl: 'Odzyskaj streak po jego zerwaniu', en: 'Recover your streak after breaking it', it: 'Recupera la serie dopo averla interrotta' } },
        'consistency-champion': { icon: '📅✨', name: { pl: 'Mistrz konsystencji', en: 'Consistency champion', it: 'Campione della costanza' }, description: { pl: 'Zapisuj dane przez 14 dni z rzędu', en: 'Log data for 14 days in a row', it: 'Registra dati per 14 giorni di fila' } },
        'time-traveler': { icon: '⏰🌀', name: { pl: 'Podróżnik w czasie', en: 'Time traveler', it: 'Viaggiatore del tempo' }, description: { pl: 'Zapisuj dane o różnych porach dnia', en: 'Log data at different times of day', it: 'Registra dati in diversi momenti della giornata' } },
        'legend-collector': { icon: '🏆✨', name: { pl: 'Kolekcjoner legend', en: 'Legend collector', it: 'Collezionista di leggende' }, description: { pl: 'Zdobądź 50 odznak', en: 'Earn 50 badges', it: 'Ottieni 50 badge' } },
        '15-day-warrior': { icon: '🛡️', name: { pl: 'Początkujący wojownik', en: 'Beginner warrior', it: 'Guerriero principiante' }, description: { pl: 'Ukończ 15 dni wyzwania', en: 'Complete 15 challenge days', it: 'Completa 15 giorni di sfida' } },
        '30-day-warrior': { icon: '⚔️', name: { pl: '30-dniowy wojownik', en: '30-day warrior', it: 'Guerriero di 30 giorni' }, description: { pl: 'Ukończ 30 dni wyzwania', en: 'Complete 30 challenge days', it: 'Completa 30 giorni di sfida' } },
        '50-day-champion': { icon: '🏆', name: { pl: 'Mistrz wyzwania', en: 'Challenge champion', it: 'Campione della sfida' }, description: { pl: 'Ukończ 50 dni wyzwania', en: 'Complete 50 challenge days', it: 'Completa 50 giorni di sfida' } },
        '75-day-legend': { icon: '👑', name: { pl: 'Legenda 75 Hard', en: '75 Hard legend', it: 'Leggenda 75 Hard' }, description: { pl: 'Ukończ wszystkie 75 dni!', en: 'Complete all 75 days!', it: 'Completa tutti i 75 giorni!' } }
    };

    const taskTranslations = {
        'Codzienny trening': { en: 'Daily workout', it: 'Allenamento quotidiano' },
        'Spacer minimum 20 minut': { en: 'Walk at least 20 minutes', it: 'Camminata di almeno 20 minuti' },
        'Rozciąganie': { en: 'Stretching', it: 'Stretching' },
        'Sen - minimum 7 godzin': { en: 'Sleep - at least 7 hours', it: 'Sonno - almeno 7 ore' },
        '10 minut czytania lub słuchania książki': { en: '10 minutes of reading or listening to a book', it: '10 minuti di lettura o ascolto di un libro' },
        'Jeden zdrowy posiłek domowy': { en: 'One healthy home-cooked meal', it: 'Un pasto sano fatto in casa' },
        'Zero słodzonych napojów': { en: 'No sugary drinks', it: 'Niente bevande zuccherate' },
        'Picie większej ilości wody': { en: 'Drink more water', it: 'Bere più acqua' }
    };

    const defaultRules = {
        movement: {
            title: { pl: 'Ruch', en: 'Movement', it: 'Movimento' },
            content: { pl: 'Codzienny trening, spacer minimum 20 minut i rozciąganie.', en: 'Daily workout, at least 20 minutes of walking and stretching.', it: 'Allenamento quotidiano, almeno 20 minuti di camminata e stretching.' }
        },
        diet: {
            title: { pl: 'Dieta', en: 'Diet', it: 'Alimentazione' },
            content: { pl: 'Jeden zdrowy posiłek domowy dziennie, zero słodzonych napojów i ograniczenie niezdrowego jedzenia (jeden cheat meal na tydzień).', en: 'One healthy home-cooked meal a day, no sugary drinks, and limit unhealthy food (one cheat meal per week).', it: 'Un pasto sano fatto in casa al giorno, niente bevande zuccherate e limita il cibo poco sano (un cheat meal a settimana).' }
        },
        water: {
            title: { pl: 'Woda', en: 'Water', it: 'Acqua' },
            content: { pl: 'Picie większej ilości wody niż dotychczas.', en: 'Drink more water than before.', it: 'Bere più acqua di prima.' }
        },
        sleep: {
            title: { pl: 'Sen', en: 'Sleep', it: 'Sonno' },
            content: { pl: 'Minimum 7 godzin snu.', en: 'At least 7 hours of sleep.', it: 'Almeno 7 ore di sonno.' }
        },
        development: {
            title: { pl: 'Rozwój', en: 'Growth', it: 'Crescita' },
            content: { pl: '10 minut czytania lub słuchania książki.', en: '10 minutes of reading or listening to a book.', it: '10 minuti di lettura o ascolto di un libro.' }
        }
    };

    const textPatterns = [
        { pattern: /^Dziś: ([0-9.,]+) km • ([0-9.,]+) min • rekord: ([0-9.,]+) km$/, en: 'Today: $1 km • $2 min • record: $3 km', it: 'Oggi: $1 km • $2 min • record: $3 km' },
        { pattern: /^Ukończono dziś ([0-9]+) z ([0-9]+) zaplanowanych zadań treningowych\. Kliknij „Zrób dziś” albo checkbox, aby śledzić progres\.$/, en: 'Completed today: $1 of $2 planned workout tasks. Click “Do today” or the checkbox to track progress.', it: 'Completati oggi: $1 di $2 attività di allenamento pianificate. Clicca “Fai oggi” o la casella per seguire i progressi.' },
        { pattern: /^Brak workoutów na dziś$/, en: 'No workouts for today', it: 'Nessun allenamento per oggi' },
        { pattern: /^Brak workoutów w tej kategorii\. Zmień filtr, aby zobaczyć inne treningi\.$/, en: 'No workouts in this category. Change the filter to see other workouts.', it: 'Nessun allenamento in questa categoria. Cambia il filtro per vedere altri allenamenti.' },
        { pattern: /^... i ([0-9]+) więcej zdjęć$/, en: '... and $1 more photos', it: '... e altre $1 foto' },
        { pattern: /^Łącznie: ([0-9.,]+)$/, en: 'Total: $1', it: 'Totale: $1' },
        { pattern: /^([ - ąćęłńóśźżĄĆĘŁŃÓŚŹŻ ]+)$/, en: null, it: null }
    ];

    let currentLanguage = 'pl';
    let observerStarted = false;
    let mutationObserver = null;

    function normalizeLanguage(language) {
        return supportedLanguages.includes(language) ? language : 'pl';
    }

    function getCurrentLanguage() {
        return normalizeLanguage(global.AppData?.settings?.language || currentLanguage);
    }

    function pick(value, language) {
        if (!value) return '';
        if (typeof value === 'string') return value;
        return value[language] || value.pl || value.en || value.it || '';
    }

    function translateExact(text, language) {
        if (!text) return text;
        const direct = phraseMap[language]?.[text] || null;
        if (direct) return direct;

        const trimmed = text.trim();
        const directTrimmed = phraseMap[language]?.[trimmed] || null;
        if (directTrimmed) {
            const start = text.match(/^\s*/)?.[0] || '';
            const end = text.match(/\s*$/)?.[0] || '';
            return `${start}${directTrimmed}${end}`;
        }

        for (const entry of textPatterns) {
            const match = trimmed.match(entry.pattern);
            if (match) {
                const template = entry[language];
                if (!template) return text;
                const translated = template.replace(/\$(\d+)/g, (_, index) => match[Number(index)] ?? '');
                const start = text.match(/^\s*/)?.[0] || '';
                const end = text.match(/\s*$/)?.[0] || '';
                return `${start}${translated}${end}`;
            }
        }

        return text;
    }

    function translateTaskText(text, language) {
        return taskTranslations[text]?.[language] || text;
    }

    function translateRuleText(rule, language) {
        if (!rule || !rule.id || !defaultRules[rule.id]) {
            return rule || null;
        }

        return {
            title: pick(defaultRules[rule.id].title, language),
            content: rule.content === defaultRules[rule.id].content.pl || !rule.content
                ? pick(defaultRules[rule.id].content, language)
                : rule.content
        };
    }

    function badgeTitle(badgeId, language) {
        return pick(badgeMeta[badgeId]?.name, language) || badgeId;
    }

    function badgeDescription(badgeId, language) {
        return pick(badgeMeta[badgeId]?.description, language) || '';
    }

    function badgeIcon(badgeId) {
        return badgeMeta[badgeId]?.icon || '🏅';
    }

    function translateMessage(message, language) {
        return translateExact(message, language);
    }

    function updateMeta(language) {
        const titleMap = {
            pl: '🌸 Kawaii Quest - Motivation Tracker',
            en: '🌸 Kawaii Quest - Motivation Tracker',
            it: '🌸 Kawaii Quest - Tracker di motivazione'
        };
        const descMap = {
            pl: '75-dniowe wyzwanie motywacyjne z synchronizacją w chmurze',
            en: 'A 75-day motivational challenge with cloud sync',
            it: 'Una sfida motivazionale di 75 giorni con sincronizzazione cloud'
        };
        const appleMap = {
            pl: 'Kawaii Quest',
            en: 'Kawaii Quest',
            it: 'Kawaii Quest'
        };

        document.title = titleMap[language] || titleMap.pl;
        const description = document.querySelector('meta[name="description"]');
        if (description) description.setAttribute('content', descMap[language] || descMap.pl);
        const appleTitle = document.querySelector('meta[name="apple-mobile-web-app-title"]');
        if (appleTitle) appleTitle.setAttribute('content', appleMap[language] || appleMap.pl);
        const themeColor = document.querySelector('meta[name="theme-color"]');
        if (themeColor) {
            themeColor.setAttribute('content', language === 'it' ? '#8ec5ff' : '#ff9ac2');
        }
        document.documentElement.lang = language;
    }

    function translateOptions(language) {
        const themeSelect = document.getElementById('themeSelect');
        if (themeSelect) {
            const optionMap = {
                pink: { pl: 'Kawaii Pink 🎀', en: 'Kawaii Pink 🎀', it: 'Rosa kawaii 🎀' },
                ocean: { pl: 'Ocean Blue 🌊', en: 'Ocean Blue 🌊', it: 'Blu oceano 🌊' },
                mint: { pl: 'Mint Green 🍃', en: 'Mint Green 🍃', it: 'Verde menta 🍃' },
                lavender: { pl: 'Lavender Purple 💜', en: 'Lavender Purple 💜', it: 'Viola lavanda 💜' },
                strawberry: { pl: 'Strawberry 🍓', en: 'Strawberry 🍓', it: 'Fragola 🍓' },
                yellow: { pl: 'Sunny Yellow ☀️', en: 'Sunny Yellow ☀️', it: 'Giallo solare ☀️' },
                orange: { pl: 'Orange Sunset 🍊', en: 'Orange Sunset 🍊', it: 'Arancione tramonto 🍊' },
                red: { pl: 'Ruby Red ❤️', en: 'Ruby Red ❤️', it: 'Rosso rubino ❤️' },
                blue: { pl: 'Sky Blue 💙', en: 'Sky Blue 💙', it: 'Blu cielo 💙' },
                purple: { pl: 'Deep Purple 🔮', en: 'Deep Purple 🔮', it: 'Viola intenso 🔮' },
                black: { pl: 'Dark Mode 🌙', en: 'Dark Mode 🌙', it: 'Modalità scura 🌙' },
                transformers: { pl: 'Transformers 🤖⚡', en: 'Transformers 🤖⚡', it: 'Transformers 🤖⚡' }
            };
            Array.from(themeSelect.options).forEach(option => {
                option.textContent = pick(optionMap[option.value], language) || option.textContent;
            });
        }

        const fontSelect = document.getElementById('fontSelect');
        if (fontSelect) {
            const optgroups = fontSelect.querySelectorAll('optgroup');
            if (optgroups[0]) optgroups[0].label = language === 'it' ? '✨ Font kawaii' : language === 'en' ? '✨ Kawaii fonts' : '✨ Czcionki Kawaii';
            if (optgroups[1]) optgroups[1].label = language === 'it' ? '📝 Font base' : language === 'en' ? '📝 Base fonts' : '📝 Czcionki Podstawowe';
            const optionMap = {
                "'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', cursive": { pl: 'Comic Sans (Kawaii)', en: 'Comic Sans (Kawaii)', it: 'Comic Sans (kawaii)' },
                "'Quicksand', sans-serif": { pl: 'Quicksand (Miękka)', en: 'Quicksand (Soft)', it: 'Quicksand (morbida)' },
                "'Fredoka One', cursive": { pl: 'Fredoka (Zaokrąglona)', en: 'Fredoka (Rounded)', it: 'Fredoka (arrotondata)' },
                "'Baloo 2', cursive": { pl: 'Baloo (Przyjazna)', en: 'Baloo (Friendly)', it: 'Baloo (amichevole)' },
                "'Bubblegum Sans', cursive": { pl: 'Bubblegum (Bąbelkowa)', en: 'Bubblegum (Bubble)', it: 'Bubblegum (frizzante)' },
                "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif": { pl: 'Segoe UI (Domyślna)', en: 'Segoe UI (Default)', it: 'Segoe UI (predefinito)' },
                'Arial, Helvetica, sans-serif': { pl: 'Arial', en: 'Arial', it: 'Arial' },
                "'Helvetica Neue', Helvetica, sans-serif": { pl: 'Helvetica', en: 'Helvetica', it: 'Helvetica' },
                "'Roboto', sans-serif": { pl: 'Roboto', en: 'Roboto', it: 'Roboto' },
                "'Open Sans', sans-serif": { pl: 'Open Sans', en: 'Open Sans', it: 'Open Sans' },
                "'Lato', sans-serif": { pl: 'Lato', en: 'Lato', it: 'Lato' },
                "'Montserrat', sans-serif": { pl: 'Montserrat', en: 'Montserrat', it: 'Montserrat' },
                "'Poppins', sans-serif": { pl: 'Poppins', en: 'Poppins', it: 'Poppins' },
                'Georgia, serif': { pl: 'Georgia', en: 'Georgia', it: 'Georgia' },
                "'Times New Roman', Times, serif": { pl: 'Times New Roman', en: 'Times New Roman', it: 'Times New Roman' }
            };
            Array.from(fontSelect.options).forEach(option => {
                option.textContent = pick(optionMap[option.value], language) || option.textContent;
            });
        }

        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            const optionMap = {
                pl: { pl: 'Polski', en: 'Polish', it: 'Polacco' },
                en: { pl: 'Angielski', en: 'English', it: 'Inglese' },
                it: { pl: 'Włoski', en: 'Italian', it: 'Italiano' }
            };
            Array.from(languageSelect.options).forEach(option => {
                option.textContent = pick(optionMap[option.value], language) || option.textContent;
            });
        }

        const restDay = document.getElementById('restDay');
        if (restDay) {
            const optionMap = {
                none: { pl: 'Brak', en: 'None', it: 'Nessuno' },
                0: { pl: 'Niedziela', en: 'Sunday', it: 'Domenica' },
                1: { pl: 'Poniedziałek', en: 'Monday', it: 'Lunedì' },
                2: { pl: 'Wtorek', en: 'Tuesday', it: 'Martedì' },
                3: { pl: 'Środa', en: 'Wednesday', it: 'Mercoledì' },
                4: { pl: 'Czwartek', en: 'Thursday', it: 'Giovedì' },
                5: { pl: 'Piątek', en: 'Friday', it: 'Venerdì' },
                6: { pl: 'Sobota', en: 'Saturday', it: 'Sabato' }
            };
            Array.from(restDay.options).forEach(option => {
                option.textContent = pick(optionMap[option.value], language) || option.textContent;
            });
        }
    }

    function translateStaticText(language) {
        const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
        const skipParents = new Set(['SCRIPT', 'STYLE', 'TEXTAREA']);
        let node;
        while ((node = textNodes.nextNode())) {
            const parent = node.parentElement;
            if (!parent || skipParents.has(parent.tagName)) continue;
            const original = node.nodeValue;
            if (!original || !original.trim()) continue;
            const translated = translateExact(original, language);
            if (translated !== original) {
                node.nodeValue = translated;
            }
        }

        document.querySelectorAll('[placeholder]').forEach((element) => {
            const placeholder = element.getAttribute('placeholder');
            if (!placeholder) return;
            const translated = translateExact(placeholder, language);
            if (translated !== placeholder) {
                element.setAttribute('placeholder', translated);
            }
        });

        document.querySelectorAll('[aria-label]').forEach((element) => {
            const aria = element.getAttribute('aria-label');
            if (!aria) return;
            const translated = translateExact(aria, language);
            if (translated !== aria) {
                element.setAttribute('aria-label', translated);
            }
        });
    }

    function translateBadgeCards(language) {
        document.querySelectorAll('.badge-card[data-badge]').forEach((card) => {
            const badgeId = card.dataset.badge;
            const title = card.querySelector('h3');
            const desc = card.querySelector('p');
            if (title) title.textContent = badgeTitle(badgeId, language);
            if (desc) desc.textContent = badgeDescription(badgeId, language);
        });
    }

    function translateRules(language) {
        document.querySelectorAll('#rulesList .rule-card, #rulesSettingsList .rule-card').forEach((card) => {
            const index = Array.from(card.parentElement.children).indexOf(card);
            const rule = global.AppData?.settings?.rules?.[index];
            if (!rule) return;
            const translated = translateRuleText(rule, language);
            const heading = card.querySelector('h3');
            const content = card.querySelector('p');
            if (heading) heading.textContent = translated.title;
            if (content) content.textContent = translated.content;
        });
    }

    function translateTasks(language) {
        document.querySelectorAll('.task-text').forEach((element) => {
            element.textContent = translateTaskText(element.textContent, language);
        });
        document.querySelectorAll('#editTasksList input[type="text"]').forEach((input) => {
            input.value = translateTaskText(input.value, language);
        });
        document.querySelectorAll('#tasksList .task-item').forEach((item) => {
            const label = item.textContent.replace(/^✓\s*/, '').trim();
            const translated = translateTaskText(label, language);
            if (translated !== label) item.textContent = `✓ ${translated}`;
        });
    }

    function translateWorkoutText(language) {
        document.querySelectorAll('#workoutsContent, #normalWorkoutsConfig, #weeklyWorkoutsConfig, #workoutsList, #customWorkoutsList').forEach((container) => {
            container.querySelectorAll('h3, h4, p, small, label, button, span').forEach((el) => {
                if (el.classList.contains('workout-chip')) {
                    el.textContent = translateExact(el.textContent, language);
                }
                if (el.textContent) {
                    el.textContent = translateExact(el.textContent, language);
                }
            });
        });
    }

    function apply(language = getCurrentLanguage()) {
        const normalized = normalizeLanguage(language);
        currentLanguage = normalized;
        updateMeta(normalized);
        translateOptions(normalized);
        translateStaticText(normalized);
        translateBadgeCards(normalized);
        translateRules(normalized);
        translateTasks(normalized);
        translateWorkoutText(normalized);
    }

    function setLanguage(language, persist = true) {
        const normalized = normalizeLanguage(language);
        currentLanguage = normalized;
        if (global.AppData) {
            global.AppData.settings = global.AppData.settings || {};
            global.AppData.settings.language = normalized;
            if (persist && typeof global.saveData === 'function') {
                global.saveData();
            }
        }
        apply(normalized);
    }

    function startObserver() {
        if (observerStarted || !global.MutationObserver || !document.body) return;
        observerStarted = true;
        mutationObserver = new MutationObserver((mutations) => {
            const language = getCurrentLanguage();
            for (const mutation of mutations) {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.TEXT_NODE) {
                        node.nodeValue = translateExact(node.nodeValue, language);
                        return;
                    }
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        translateStaticText(language);
                        translateBadgeCards(language);
                        translateRules(language);
                        translateTasks(language);
                    }
                });
            }
        });
        mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    global.AppI18N = {
        setLanguage,
        apply,
        startObserver,
        translateMessage,
        translateTaskText,
        badgeTitle,
        badgeDescription,
        badgeIcon,
        defaultRules,
        taskTranslations,
        phraseMap,
        badgeMeta,
        translateExact,
        getCurrentLanguage,
        translateRuleText
    };
})(window);