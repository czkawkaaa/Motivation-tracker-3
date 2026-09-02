// 🌸 Kawaii Quest - Complete JavaScript Application

// ======================
// DATA STORAGE
// ======================
const AppData = {
    challenge: {
        currentDay: 0,
        totalDays: 75,
        completedDays: [],
        activityLog: [],
        restDaysEffectiveFrom: null
    },
    challengeHistory: [],
    streak: 0,
    longestStreak: 0,
    steps: {},
    mood: {},
    studyHours: {},
    reflections: {},
    tasks: [
        "Zapisz swoje zadania!"
    ],
    weeklyTasks: {
        enabled: false,
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
    },
    completedTasks: {},
    completedWorkouts: {},
    runLog: {},
    workoutFocus: {},
    gallery: [],
    badges: {},
    weeklyWorkouts: {
        enabled: false,
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
    },
    settings: {
        language: 'pl',
        theme: 'pink',
        font: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        challengeName: 'Kawaii Quest',
        challengeLength: 75,
        stepsGoal: 25000,
        studyGoal: 100,
        restDay: 'none',
        restDays: [],
        countRestDays: false,
        soundEnabled: true,
        volume: 70,
        workoutsEnabled: false,
        workouts: [],
        customWorkouts: [],
        workoutFilter: 'all',
        workoutsGoal: 150,
        stepsEnabled: true,
        studyEnabled: true,
        rulesAccepted: false,
        rules: [
            { id: 'your-rules', title: 'Zapisz swoje zasady <33', content: '' }
        ]
    }
};

const ALL_BADGE_IDS = [
    'first-steps', 'first-mood', 'first-photo',
    '3-day-streak', '7-day-streak', '14-day-streak', 'no-days-off', '30-day-streak',
    'goku-ultra', 'plus-ultra',
    'first-task', 'task-beginner', 'task-master', 'task-legend',
    'study-starter', 'study-scholar',
    'mood-tracker', 'mood-master', 'always-happy', 'mood-swinger',
    'steps-5k', 'steps-10k', 'steps-50k', 'steps-100k', 'steps-250k', 'rocky-balboa',
    'photographer', 'social-butterfly', 'memory-keeper',
    'workout-beginner', 'workout-warrior', 'workout-beast', 'workout-legend', 'one-punch',
    'iron-dedication', 'weekend-warrior',
    'optimus-prime', 'bumblebee', 'dark-knight', 'rainbow-master', 'theme-explorer',
    'megatron', 'challenge-named',
    'perfectionist', 'discipline-master', 'comeback-king', 'consistency-champion', 'time-traveler',
    'legend-collector',
    '15-day-warrior', '30-day-warrior', '50-day-champion', '75-day-legend',
    'rules-master', 'report-exporter'
];

function getAllBadgeIds() {
    return [...ALL_BADGE_IDS];
}

function getBadgeStats(data = AppData) {
    const badgeMap = data && typeof data === 'object' && data.badges ? data.badges : {};
    const allBadgeIds = getAllBadgeIds();
    const unlockedBadges = allBadgeIds.filter(id => badgeMap[id] && badgeMap[id].unlocked).length;
    const totalBadges = allBadgeIds.length;

    return {
        unlockedBadges,
        totalBadges,
        allBadgeIds
    };
}

// Motivational quotes
const motivationalQuotes = [
    "Jesteś silniejsza niż myślisz! 💖",
    "Każdy krok to postęp! ✨",
    "Wierzę w Ciebie! 🌸",
    "Możesz wszystko! 💪",
    "Dziś jest Twój dzień! ☀️",
    "Dumna z Ciebie! 🎀",
    "Keep going, Queen! 👑",
    "You're doing amazing! 💕",
    "Never give up! 🦋",
    "Sparkle every day! ✨",
    "Nie jutro, a DZIŚ! ⚡",
    "Musisz w siebie zainwestować! 💎",
    "Przestań gadać, zacznij działać! 🔥",
    "Twoja przyszłość zależy od tego, co robisz TERAZ! ⏰",
    "Nikt nie zrobi tego za Ciebie! 💪",
    "Wymówki nie budują marzeń! 🚫",
    "Albo teraz, albo nigdy! ⚡",
    "Jesteś mocniejsza niż Twoje wymówki! 🦁",
    "Sukces wymaga poświęceń! 🏆",
    "Twoja wygoda = Twoja granica! 🔓",
    "Każda sekunda się liczy! ⏳",
    "Nie czekaj na idealny moment - stwórz go! 🌟",
    "Zmęczenie jest tymczasowe, duma jest wieczna! 👑",
    "Twoje ciało osiągnie to, w co uwierzy Twój umysł! 🧠",
    "Nieudane próby to lekcje, nie porażki! 📚",
    "Bądź silniejsza niż Twoje najsilniejsze wymówki! 💥",
    "Dzisiaj to dobry dzień, żeby kopnąć tyłek celom! 🎯",
    "Komfortowa strefa to pułapka! 🚀",
    "Każdy dzień bez działania to stracona szansa! 💫",
    "Nie mów, że nie masz czasu - masz dokładnie tyle samo co wszyscy! ⏰",
    "Albo znajdziesz sposób, albo znajdziesz wymówkę! 🛤️",
    "Twoje marzenia nie pracują, dopóki Ty nie pracujesz! 💼",
    "Słabe momenty budują silnych ludzi! 🏋️",
    "Przestań planować, zacznij robić! ✅",
    "Nikt nie pamięta tych, którzy się poddali! 🔝",
    "Twój jedyny przeciwnik to Ty z wczoraj! 🥊",
    "Ból dzisiaj = Siła jutro! 💪",
    "Nie bój się porażki, bój się braku prób! 🎲",
    "Jeśli to było łatwe, każdy by to robił! 🔥",
    "Jesteś JEDNĄ decyzją od zmiany życia! 🔄",
    // Nowe cytaty - kawaii & pozytywne
    "Małe kroki każdego dnia tworzą wielkie zmiany! 🌱",
    "Uśmiechnij się - robisz to świetnie! 😊",
    "Twoja energia przyciąga cuda! ✨💫",
    "Dziś jest idealny dzień na nowy początek! 🌅",
    "Jesteś swoją największą inspiracją! 🌟",
    "Błyszczeć to Twoja druga natura! 💎",
    "Każdy dzień to nowa szansa! 🎁",
    "Twoja determinacja jest piękna! 🌺",
    "Wierzę w magię Twoich marzeń! 🦄",
    "Jesteś gwiazdą swojego życia! ⭐",
    // Motywacyjne - mocne
    "Przestań czekać na znak - to ON! 🎯",
    "Twoje 'jutro' zaczyna się dzisiaj! 📅",
    "Nie szukaj motywacji - bądź nią! 🔥",
    "Porażka to tylko opinia, nie fakt! 💭",
    "Twoja historia dopiero się zaczyna! 📖",
    "Konsystencja > Perfekcja! 🎯",
    "Każdy ekspert był kiedyś początkującym! 🌟",
    "Nie poddawaj się, to właśnie tu magia się dzieje! ✨",
    "Twoją supermocą jest wytrwałość! 🦸‍♀️",
    "Nie pytaj czy możesz - pokaż, że potrafisz! 💪",
    // Inspirujące
    "Kwitnij tam, gdzie jesteś posadzona! 🌸",
    "Twoja droga jest unikalna - celebruj ją! 🛤️✨",
    "Cierpliwość i pasja tworzą mistrzostwo! 🎨",
    "Jesteś dziełem w toku - i to jest piękne! 🖼️",
    "Twój potencjał nie ma granic! 🚀",
    "Drobne postępy to wciąż postępy! 📈",
    "Uwierz w siebie tak mocno jak ja w Ciebie wierzę! 💕",
    "Trudności są dowodem, że się rozwijasz! 🌱",
    "Twoja energia tworzy rzeczywistość! ⚡✨",
    "Nie porównuj się - inspiruj się! 🌈",
    // Pozytywne afirmacje
    "Zasługujesz na wszystkie dobre rzeczy! 💖",
    "Jesteś wystarczająca dokładnie taka, jaka jesteś! 🌟",
    "Twój głos ma znaczenie! 📢",
    "Jesteś liderką swojego życia! 👑",
    "Gratulacje - pokazałaś dzisiaj! 🎉",
    "Twoja obecność robi różnicę! 💫",
    "Jesteś dumą dla siebie z przeszłości! ⏮️💕",
    "Każdy dzień z Tobą to prezent! 🎁",
    "Wybierasz szczęście - i to piękne! 😊🌸",
    "Jesteś już na dobrej drodze! 🛣️✨"
];

// Transformers quotes - Male oriented
const transformersQuotes = [
    "Przekształć się w lepszą wersję siebie! 🤖⚡",
    "Siła pochodzi z determinacji, nie z wymówek! 💪",
    "Roboty pracują bez słów - działaj! 🔧",
    "Twoja misja to być najlepszy! 🎯",
    "Cybertron? Nie - Twoje ciało to pole bitwy! ⚔️",
    "Energon to konsystencja - palimy go codziennie! 🔥",
    "Transformacja to proces - cierpliwość! 🔄",
    "Z każdym dniem mocniejszy! 💪⚡",
    "Wymówkami są Deceptikony - pokonaj je! 🚫",
    "Cybertron czeka na Twoją moc! 🌟",
    "Nie ma drogi łatwo, jest droga mocna! 🛣️",
    "Potencjał to energia - aktywuj go! ⚡",
    "Walka to początek, zwyciestwo to koniec! 🏁",
    "Gniew przerób w moc! 🔥",
    "Mistrzostwo to powtarzana transformacja! 🔄",
    "Odpoczywaj by znowu działać! 😴⚡",
    "Nie szukaj motywacji - bądź nią! 🤖💥",
    "Każdy upadek to nauka do zwycięstwa! 📚",
    "Lider nie czeka - działa! 👑",
    "Twoja dyscyplina to supermoc! 🦸",
    "Z gruzów buduj bazę mocy! 🏗️",
    "Przegrałeś? Restart! 🔄",
    "Słabość to tylko etap przemiany! 💎",
    "Ostateczne zwycięstwo czeka zmotywowanego! 🏆",
    "Działaj jak masz do stracenia wszystko! ⚡",
    "Bądź tym, którego wszyscy będą naśladować! 👑",
    "Godzina do godziny - będziesz legendą! 📈"
];

// ======================
// INITIALIZATION
// ======================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌸 Kawaii Quest loaded!');
    
    loadData();
    initNavigation();
    initThemeSystem();
    initDashboard();
    initCalendar();
    initStats();
    initGallery();
    initBadges();
    initSettings();
    initRules();
    // Sync UI
    if (typeof initSyncUI === 'function') initSyncUI();
    if (window.AppI18N && typeof window.AppI18N.startObserver === 'function') {
        window.AppI18N.startObserver();
    }
    
    updateAllDisplays();
    startQuoteRotation();
    
    // Daily engagement features
    checkDailyLogin();
    checkDailyMilestones();
    
    // Sprawdź czy jest zaplanowany reset danych
    // WYŁĄCZONE: checkScheduledReset() może powodować niechciane resety
    // checkScheduledReset();
    
    // Zarejestruj Service Workera dla PWA / instalacji na telefonie
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/Motivation-tracker-3/sw.js', { scope: '/Motivation-tracker-3/' })
            .then((reg) => {
                console.log('✅ Service Worker zarejestrowany', reg);

                const checkForUpdates = () => reg.update().catch((err) => {
                    console.warn('⚠️ Nie udało się sprawdzić aktualizacji SW:', err);
                });

                checkForUpdates();
                setInterval(checkForUpdates, 60 * 1000);

                reg.addEventListener('updatefound', () => {
                    const installingWorker = reg.installing;
                    if (!installingWorker) return;

                    installingWorker.addEventListener('statechange', () => {
                        if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            console.log('🔄 Nowa wersja aplikacji została zainstalowana. Odświeżam widok...');
                            installingWorker.postMessage({ type: 'SKIP_WAITING' });
                            window.location.reload();
                        }
                    });
                });
            })
            .catch((err) => console.error('❌ Rejestracja Service Workera nie powiodła się', err));

        navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('🔁 Service Worker przejął kontrolę — odświeżam aplikację');
            window.location.reload();
        });
    }
});

// ======================
// DATA MANAGEMENT
// ======================
function normalizeCompletedWorkoutEntries(value) {
    if (Array.isArray(value)) {
        return Array.from(new Set(value
            .filter(item => item !== null && item !== undefined && item !== '')
            .map(item => String(item).trim())
            .filter(Boolean)));
    }

    if (value === null || value === undefined || value === '') {
        return [];
    }

    return [String(value).trim()].filter(Boolean);
}

function countCompletedWorkoutsMap(data) {
    if (!data || typeof data !== 'object') return 0;
    return Object.values(data).reduce((sum, dailyWorkouts) => sum + normalizeCompletedWorkoutEntries(dailyWorkouts).length, 0);
}

function hasMeaningfulAppData(data) {
    const source = data || {};

    if (source.settings && typeof source.settings === 'object' && Object.keys(source.settings).length > 0) {
        return true;
    }
    if (Array.isArray(source.tasks) && source.tasks.length > 0) return true;
    if (Array.isArray(source.gallery) && source.gallery.length > 0) return true;

    if (source.challenge && (Array.isArray(source.challenge.completedDays) ? source.challenge.completedDays.length > 0 : Boolean(source.challenge.currentDay || source.challenge.totalDays))) {
        return true;
    }

    const mapsToCheck = ['steps', 'studyHours', 'mood', 'completedTasks', 'completedWorkouts', 'badges'];
    for (const key of mapsToCheck) {
        if (source[key] && typeof source[key] === 'object' && Object.keys(source[key]).length > 0) {
            return true;
        }
    }

    return false;
}

function loadData() {
    const saved = localStorage.getItem('kawaiiQuestData');
    // If main data was cleared (e.g., by older sync logic or service worker), try to restore backup
    if (!saved) {
        try {
            const backup = localStorage.getItem('kawaiiQuestData_backup') || localStorage.getItem('kawaiiQuestData_cloudDeletionBackup');
            if (backup) {
                console.warn('⚠️ Główne dane zostały wyczyszczone — przywracam lokalny backup.');
                localStorage.setItem('kawaiiQuestData', backup);
            }
        } catch (e) {
            console.warn('⚠️ Nie udało się przywrócić backupu:', e);
        }
    }
    if (saved) {
        try {
            const data = JSON.parse(saved);
            
            // Zabezpieczenie: nie ładuj pustych danych
            const hasData = hasMeaningfulAppData(data);
            
            if (hasData) {
                Object.assign(AppData, data);
                // Normalize any date keys from older formats (with time or different formats)
                // Normalize completedDays array
                if (Array.isArray(AppData.challenge?.completedDays)) {
                    const normalized = AppData.challenge.completedDays
                        .map(d => normalizeDateKey(d))
                        .filter(Boolean);
                    // dedupe
                    AppData.challenge.completedDays = Array.from(new Set(normalized)).sort();
                }

                // Normalize per-day maps (steps, studyHours, mood, completedTasks, completedWorkouts)
                const mapsToNormalize = ['steps', 'studyHours', 'mood', 'completedTasks', 'completedWorkouts'];
                mapsToNormalize.forEach(mapName => {
                    if (AppData[mapName] && typeof AppData[mapName] === 'object') {
                        const newMap = {};
                        Object.keys(AppData[mapName]).forEach(k => {
                            const nk = normalizeDateKey(k);
                            if (!nk) return;
                            const val = AppData[mapName][k];
                            if (mapName === 'completedTasks') {
                                // Merge arrays of indices if duplicate keys
                                const existing = newMap[nk] || [];
                                const incoming = Array.isArray(val) ? val : [];
                                const merged = Array.from(new Set([...existing, ...incoming])).sort((a,b)=>a-b);
                                newMap[nk] = merged;
                            } else if (mapName === 'completedWorkouts') {
                                const normalized = normalizeCompletedWorkoutEntries(val);
                                if (normalized.length > 0) {
                                    newMap[nk] = normalized;
                                }
                            } else {
                                // For numeric/string maps, last one wins
                                newMap[nk] = val;
                            }
                        });
                        AppData[mapName] = newMap;
                    }
                });
                console.log('📱 Loaded data from localStorage');
            } else {
                console.warn('⚠️ localStorage contains empty data - using defaults');
            }
        } catch (e) {
            console.error('❌ Error parsing localStorage data:', e);
        }
        
        // CZYSZCZENIE: Usuń zaplanowany reset jeśli istnieje (nie używamy już tej funkcji)
        if (AppData.challenge && AppData.challenge.resetScheduled) {
            delete AppData.challenge.resetScheduled;
            console.log('🧹 Wyczyszczono zaplanowany reset (feature wyłączony)');
        }
        
        // MIGRACJA: Zaktualizuj stare zadania do nowych
        const oldTasks = [
            "15 minut aktywności",
            "Wpis w dzienniku",
            "Sen - przynajmniej 6 godzin",
            "Przynajmniej 10 minut czytania książki",
            "Zjedz prawdziwe/nieprzetworzone jedzenie",
            "Przynajmniej 1 litr wody"
        ];
        const newTasks = [
            "Codzienny trening",
            "Spacer minimum 20 minut",
            "Rozciąganie",
            "Sen - minimum 7 godzin",
            "10 minut czytania lub słuchania książki",
            "Jeden zdrowy posiłek domowy",
            "Zero słodzonych napojów",
            "Picie większej ilości wody"
        ];
        
        // Sprawdź czy użytkownik ma stare zadania
        const hasOldTasks = AppData.tasks && AppData.tasks.length === 6 && 
                           AppData.tasks[0] === "15 minut aktywności";
        
        if (hasOldTasks) {
            AppData.tasks = newTasks;
            console.log('🔄 Zaktualizowano zadania do nowej wersji');
            saveData();
        }
        
        // Inicjalizuj śledzenie motywów dla odznak
        if (!AppData.settings.themesUsed) {
            AppData.settings.themesUsed = [AppData.settings.theme];
        }
        if (!AppData.settings.challengeName) {
            AppData.settings.challengeName = 'Kawaii Quest';
        }
    } else {
        console.log('💾 No saved data found - using defaults');
        // Inicjalizuj śledzenie motywów dla nowych użytkowników
        if (!AppData.settings.themesUsed) {
            AppData.settings.themesUsed = [AppData.settings.theme];
        }
    }

    if (!AppData.badges || typeof AppData.badges !== 'object') {
        AppData.badges = {};
    }

    if (AppData.challenge?.startDate && AppData.settings && AppData.settings.rulesAccepted !== true) {
        AppData.settings.rulesAccepted = true;
    }

    if (!Array.isArray(AppData.settings?.restDays)) {
        AppData.settings.restDays = getRestDays();
    }
    if (AppData.settings.restDays.length === 0 && AppData.settings.restDay && AppData.settings.restDay !== 'none') {
        AppData.settings.restDays = normalizeRestDayList(AppData.settings.restDay);
    }
    AppData.settings.restDay = AppData.settings.restDays.length > 0 ? AppData.settings.restDays[0] : 'none';

    if (Array.isArray(AppData.challenge?.completedDays)) {
        AppData.challenge.completedDays = Array.from(new Set(AppData.challenge.completedDays.map(d => normalizeDateKey(d)).filter(Boolean))).sort();
    }
    if (!Array.isArray(AppData.challenge?.activityLog)) {
        AppData.challenge.activityLog = [];
    }
    if (!AppData.challenge.restDaysEffectiveFrom && AppData.challenge.startDate) {
        AppData.challenge.restDaysEffectiveFrom = AppData.challenge.startDate;
    }
    sanitizeChallengeCompletedDays();

    syncChallengeByDates({ updateUi: false });

    calculateStreak();
    applySettings();
    checkBadges();
}

function saveData() {
    // ZAWSZE ustaw timestamp PRZED zapisem
    AppData.lastModified = Date.now();
    
    // Zabezpieczenie: sprawdź czy AppData nie jest pusty
    const hasData = hasMeaningfulAppData(AppData);
    
    if (!hasData) {
        console.warn('⚠️ Próba zapisania pustych danych - pominięto');
        return;
    }
    
    // Zapisz lokalnie NAJPIERW (najpewniejsze)
    try {
        // Zrób kopię zapasową poprzednich lokalnych danych na wypadek, gdyby
        // przyszłe operacje chciały je usunąć (np. sync z chmurą).
        try {
            const prev = localStorage.getItem('kawaiiQuestData');
            if (prev) {
                // Nadpisuj jedynie jedną kopię backupu (możemy rozszerzyć do wersjonowania)
                localStorage.setItem('kawaiiQuestData_backup', prev);
            }
        } catch (e) {
            console.warn('⚠️ Nie udało się utworzyć backupu lokalnego przed zapisem:', e);
        }

        localStorage.setItem('kawaiiQuestData', JSON.stringify(AppData));
    } catch (e) {
        console.error('❌ Błąd zapisu do localStorage:', e);
    }
    
    // Synchronizuj z Firebase (jeśli dostępne) - nie blokuj jeśli błąd
    try {
        if (typeof window.saveDataToFirestore === 'function') {
            window.saveDataToFirestore().catch(err => {
                console.warn('⚠️ Firebase sync failed (offline?)', err);
                // Nie przeszkadzaj użytkownikowi - dane są bezpieczne w localStorage
            });
        }
    } catch (e) {
        console.warn('⚠️ Firebase sync error:', e);
    }
    
    checkBadges();
}

function recordChallengeActivity(type, payload = {}) {
    if (!AppData.challenge || typeof AppData.challenge !== 'object') return;
    const entry = {
        id: `activity-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
        type,
        dateKey: payload.dateKey || getTodayKey(),
        timestamp: payload.timestamp || Date.now(),
        summary: payload.summary || '',
        ...payload
    };

    const existing = Array.isArray(AppData.challenge.activityLog) ? AppData.challenge.activityLog : [];
    AppData.challenge.activityLog = [entry, ...existing].slice(0, 200);
}

function getTodayKey() {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

const reflectionQuestions = [
    'Co dziś było dla Ciebie ważne?', 'Z czego jesteś dziś dumna?', 'Co dało Ci dziś najwięcej energii?',
    'Co chcesz zapamiętać z tego dnia?', 'Jaki mały krok dziś zrobiłaś?', 'Co było dziś łatwiejsze niż zwykle?',
    'Za co możesz sobie dziś podziękować?', 'Co Cię dziś rozbawiło?', 'Czego dziś potrzebujesz?',
    'Co pomogło Ci zadbać o siebie?', 'Jaki moment dnia był najspokojniejszy?', 'Co chcesz jutro zrobić inaczej?',
    'Co dziś poszło lepiej, niż się spodziewałaś?', 'Jakie uczucie było dziś najsilniejsze?', 'Co Cię dziś zainspirowało?',
    'Jak okazałaś sobie dziś życzliwość?', 'Co było dziś Twoim małym sukcesem?', 'Co chcesz odpuścić po tym dniu?',
    'Jaka rzecz dała Ci dziś radość?', 'Co pomogło Ci ruszyć z miejsca?', 'Co dziś zrobiłaś tylko dla siebie?',
    'Za co jesteś dziś wdzięczna?', 'Co chciałabyś usłyszeć od bliskiej osoby?', 'Jak zadbałaś dziś o swoje ciało?',
    'Co dało Ci dziś poczucie spokoju?', 'Jaką myśl chcesz zabrać ze sobą na jutro?', 'Co było dziś wyzwaniem?',
    'Jak poradziłaś sobie z trudniejszym momentem?', 'Co chcesz częściej robić?', 'Co dziś zauważyłaś w sobie dobrego?',
    'Jaki drobiazg poprawił Ci dziś humor?', 'Co możesz sobie wybaczyć?', 'Co dziś było naprawdę Twoje?',
    'Jak wyglądałby dla Ciebie dobry wieczór?', 'Czego nauczył Cię dzisiejszy dzień?', 'Co dziś warto celebrować?',
    'Jaką troskę chcesz sobie jutro dać?', 'Co dziś dodało Ci odwagi?', 'Kiedy czułaś się dziś najbardziej sobą?',
    'Co pomogło Ci zwolnić?', 'Co chciałabyś zachować w swojej rutynie?', 'Jaki był Twój ulubiony moment dnia?',
    'Co dziś zrobiłaś mimo braku ochoty?', 'Jak możesz ułatwić sobie jutro?', 'Co dziś było wystarczająco dobre?',
    'Co Cię dziś pozytywnie zaskoczyło?', 'Jakie słowo opisuje Twój dzień?', 'Co daje Ci teraz nadzieję?',
    'Jaki mały gest możesz zrobić dla siebie jutro?', 'Z czym kończysz dzisiejszy dzień?'
];

function getTasksForDate(dateKey) {
    if (AppData.weeklyTasks?.enabled) {
        const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const weeklyTasks = AppData.weeklyTasks[dayNames[new Date(dateKey + 'T12:00:00').getDay()]];
        if (Array.isArray(weeklyTasks) && weeklyTasks.length > 0) return weeklyTasks;
    }
    return Array.isArray(AppData.tasks) ? AppData.tasks : [];
}

function getDaySummary(dateKey) {
    const tasks = getTasksForDate(dateKey);
    const savedTasks = AppData.completedTasks[dateKey];
    const completedCount = Array.isArray(savedTasks) ? new Set(savedTasks).size : Number(savedTasks) || 0;
    const isRest = isRestDayForDate(dateKey);
    const status = isRest ? 'odpoczynek' : completedCount >= tasks.length && tasks.length > 0 ? 'ukończony' : completedCount > 0 ? 'częściowy' : 'nieudany';
    return { completedCount: Math.min(completedCount, tasks.length), totalTasks: tasks.length, status };
}

function archiveCurrentChallenge() {
    if (!AppData.challenge?.startDate) return;

    const reflections = Object.fromEntries(Object.entries(AppData.reflections || {}).filter(([dateKey]) => isChallengeDayEligible(dateKey)));
    const completedDays = Array.isArray(AppData.challenge.completedDays) ? [...AppData.challenge.completedDays] : [];
    const dayStatuses = {};
    for (const dateKey of completedDays) {
        dayStatuses[dateKey] = getDaySummary(dateKey).status;
    }

    AppData.challengeHistory = Array.isArray(AppData.challengeHistory) ? AppData.challengeHistory : [];
    AppData.challengeHistory.unshift({
        id: `challenge-${Date.now()}`,
        name: getChallengeDisplayName(),
        startDate: AppData.challenge.startDate,
        endDate: getTodayKey(),
        totalDays: AppData.challenge.totalDays,
        completedDays,
        bestStreak: AppData.longestStreak || AppData.streak || 0,
        reflections,
        dayStatuses
    });
}

function getReflectionQuestion(dateKey = getTodayKey()) {
    const dayNumber = Math.floor(new Date(dateKey + 'T12:00:00').getTime() / (24 * 60 * 60 * 1000));
    return reflectionQuestions[Math.abs(dayNumber) % reflectionQuestions.length];
}

function isPartOfCurrentStreak(dayKey) {
    const completedDays = Array.isArray(AppData.challenge.completedDays) ? [...AppData.challenge.completedDays].sort().reverse() : [];
    if (completedDays.length === 0) return false;

    const today = new Date(getTodayKey() + 'T12:00:00');
    let currentDate = new Date(completedDays[0] + 'T12:00:00');
    if (Math.floor((today - currentDate) / (24 * 60 * 60 * 1000)) > 1) return false;

    if (completedDays[0] === dayKey) return true;
    for (let index = 1; index < completedDays.length; index++) {
        const previousDate = new Date(completedDays[index] + 'T12:00:00');
        const difference = Math.floor((currentDate - previousDate) / (24 * 60 * 60 * 1000));
        if (difference === 1 || (difference === 2 && isRestDayForDate(normalizeDateKey(new Date(currentDate.getTime() - 24 * 60 * 60 * 1000))))) {
            if (completedDays[index] === dayKey) return true;
            currentDate = previousDate;
            continue;
        }
        break;
    }
    return false;
}

function countWords(text) {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
}

// ======================
// DAILY ENGAGEMENT FEATURES
// ======================

/**
 * Sprawdź czy użytkownik wraca po nowym dniu
 * Pokaż modal powitalny z motivacją
 */
function checkDailyLogin() {
    const today = getTodayKey();
    const lastLoginDate = localStorage.getItem('kawaiiQuestLastLogin');
    
    if (lastLoginDate !== today) {
        // Nowy dzień! Pokaż powitanie
        localStorage.setItem('kawaiiQuestLastLogin', today);
        showDailyCheckinModal();
        
        // Sprawdź czy streak jest zagrożony
        if (AppData.streak > 0 && AppData.streak % 7 === 0) {
            setTimeout(() => showStreakMilestoneNotification(), 800);
        }
    }
}

/**
 * Pokaż ładny modal powitalny na nowy dzień
 */
function showDailyCheckinModal() {
    const motivationalQuote = [
        "🌅 Witaj! Nowy dzień = Nowe możliwości!",
        "💪 Dzisiaj wygrywasz dla siebie!",
        "✨ Jesteś silniejsza niż myślisz!",
        "🎯 Dzisiaj robisz to dla swojego zdrowia!",
        "🔥 Pokaż dzisiaj co w Tobie siedzi!",
        "🌟 Każdy dzień to szansa na wielkie rzeczy!",
        "💖 Wierzę w Ciebie! Teraz TY uwierz w siebie!",
        "🎉 Gratulacje! Jesteś tutaj ZNOWU!",
        "⚡ Energia czeka - załóż sobie sportowe ubrania!",
        "👑 Dzisiaj jesteś TY - zawłaszczaj dzień!"
    ];
    
    const randomMotivation = motivationalQuote[Math.floor(Math.random() * motivationalQuote.length)];
    
    const modal = document.createElement('div');
    modal.className = 'daily-checkin-modal';
    modal.innerHTML = `
        <div class="daily-checkin-content">
            <div class="daily-checkin-emoji">🌸</div>
            <h2>${translateAppText('Witaj ponownie!')}</h2>
            <p class="daily-message">"${randomMotivation}"</p>
            
            <div class="daily-stats">
                <div class="stat-mini">
                    <span class="stat-value">${AppData.streak}</span>
                    <span class="stat-label">🔥 ${translateAppText('Seria')}</span>
                </div>
                <div class="stat-mini">
                    <span class="stat-value">${AppData.challenge.currentDay}</span>
                    <span class="stat-label">📅 ${translateAppText('Dzień')}</span>
                </div>
                <div class="stat-mini">
                    <span class="stat-value">${Object.values(AppData.badges || {}).filter(b => b.unlocked).length}</span>
                    <span class="stat-label">🏆 ${translateAppText('Odznak')}</span>
                </div>
            </div>
            
            <div class="daily-tips">
                <p style="margin: 0; font-size: 0.9rem; color: #666;">
                    💡 ${getRandomTip()}
                </p>
            </div>

            <div class="daily-reflection">
                <p class="daily-reflection-question">${getReflectionQuestion()}</p>
                <textarea id="dailyReflectionInput" maxlength="700" rows="4" placeholder="${translateAppText('Twoja odpowiedź...')}"></textarea>
                <span id="dailyReflectionCount" class="daily-reflection-count">0 / 100 ${translateAppText('słów')}</span>
            </div>
            
            <button class="daily-checkin-btn" id="dailyCheckinBtn">
                🚀 ${translateAppText('Zapisz i zacznij dzień')}
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add styles
    if (!document.querySelector('style[data-daily-modal]')) {
        const styles = document.createElement('style');
        styles.setAttribute('data-daily-modal', 'true');
        styles.textContent = `
            .daily-checkin-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .daily-checkin-content {
                background: linear-gradient(135deg, #ff9ac2, #ffc1e0);
                color: white;
                border-radius: 25px;
                padding: 2.5rem;
                text-align: center;
                max-width: 400px;
                box-shadow: 0 20px 60px rgba(255, 154, 194, 0.3);
                animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            .daily-checkin-emoji {
                font-size: 3.5rem;
                margin-bottom: 1rem;
                animation: bounce 1.5s infinite;
            }
            
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            
            .daily-checkin-content h2 {
                font-size: 2rem;
                margin: 0 0 1rem 0;
                font-weight: 800;
            }
            
            .daily-message {
                font-size: 1.1rem;
                font-weight: 600;
                margin: 0 0 1.5rem 0;
                opacity: 0.95;
                line-height: 1.4;
            }
            
            .daily-stats {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1rem;
                margin: 1.5rem 0;
                background: rgba(255, 255, 255, 0.15);
                padding: 1.2rem;
                border-radius: 15px;
            }
            
            .stat-mini {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
            }
            
            .stat-mini .stat-value {
                font-size: 1.8rem;
                font-weight: 900;
                line-height: 1;
            }
            
            .stat-mini .stat-label {
                font-size: 0.75rem;
                opacity: 0.9;
                white-space: nowrap;
            }
            
            .daily-tips {
                background: rgba(255, 255, 255, 0.15);
                padding: 1rem;
                border-radius: 12px;
                margin: 1.5rem 0;
                font-size: 0.9rem;
                line-height: 1.5;
            }

            .daily-reflection {
                margin: 1rem 0 1.5rem;
                text-align: left;
            }

            .daily-reflection-question {
                margin: 0 0 0.6rem;
                font-weight: 700;
            }

            .daily-reflection textarea {
                width: 100%;
                resize: vertical;
                border: 0;
                border-radius: 10px;
                padding: 0.75rem;
                font: inherit;
            }

            .daily-reflection-count {
                display: block;
                margin-top: 0.35rem;
                font-size: 0.75rem;
                text-align: right;
            }
            
            .daily-checkin-btn {
                background: white;
                color: #ff9ac2;
                border: none;
                padding: 1rem 2rem;
                border-radius: 14px;
                font-size: 1rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
            }
            
            .daily-checkin-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
            }
            
            .daily-checkin-btn:active {
                transform: translateY(-1px);
            }
        `;
        document.head.appendChild(styles);
    }
    
    const reflectionInput = document.getElementById('dailyReflectionInput');
    const reflectionCount = document.getElementById('dailyReflectionCount');
    reflectionInput.addEventListener('input', () => {
        const words = countWords(reflectionInput.value);
        reflectionCount.textContent = `${words} / 100 ${translateAppText('słów')}`;
    });

    document.getElementById('dailyCheckinBtn').addEventListener('click', () => {
        const answer = reflectionInput.value.trim();
        if (countWords(answer) > 100) {
            showNotification(translateAppText('⚠️ Refleksja może mieć maksymalnie 100 słów.'), 'warning');
            return;
        }
        if (answer) {
            AppData.reflections = AppData.reflections || {};
            AppData.reflections[getTodayKey()] = { question: getReflectionQuestion(), answer };
            saveData();
        }
        playSuccessSound();
        modal.remove();
    });
}

/**
 * Pokaż powiadomienie o osiągnięciu milestone'a streaku
 */
function showStreakMilestoneNotification() {
    const streak = AppData.streak;
    let message = '';
    let emoji = '🔥';
    
    if (streak === 7) {
        message = '🎉 TYDZIEŃ! Już 7 dni z rzędu! To jest niesamowite!';
        emoji = '🌟';
    } else if (streak === 14) {
        message = '👑 DWA TYGODNIE! Jesteś LEGENDA! Śmiałam się nie wierzyć!';
        emoji = '👑';
    } else if (streak === 21) {
        message = '🚀 TRZY TYGODNIE! Konsystencja robi cuda! Jesteś niezniszczalna!';
        emoji = '🚀';
    } else if (streak === 30) {
        message = '💎 MIESIĄC! PEŁNY MIESIĄC BEZ PRZERWY! To jest EPICKIE!';
        emoji = '💎';
    } else if (streak % 10 === 0 && streak > 30) {
        message = `🔥 ${streak} DNI! Wow! Jesteś nieprzerwanie aktywna!`;
        emoji = '💪';
    } else {
        return; // Nie pokazuj dla innych liczb
    }
    
    showNotification(message, 'success');
    playSuccessSound();
    createConfetti();
}

/**
 * Losowy tip motywacyjny
 */
function getRandomTip() {
    const tips = [
        "Pamiętaj: małe kroki każdego dnia tworzą wielkie zmiany!",
        "Nie czekaj na idealny moment - zacznij TERAZ!",
        "Streaki są magiczne - nie przerywaj!",
        "Każdy trening zbliża Cię do celu!",
        "Woda, ruch, sny - to Twoja recepta na sukces!",
        "Konsystencja to Twoja supermoc!",
        "Czytaj, trenuj, śpij - proste!",
        "Dzisiaj jesteś o krok bliżej do celu!",
        "Gratulacje że wróciłaś! To pokazuje Twoją determinację!",
        "Każdy dzień liczy się. Nawet jeśli będzie ciężko!"
    ];
    return tips[Math.floor(Math.random() * tips.length)];
}

/**
 * Sprawdź czy są milestone'i streaku do świętowania
 */
function checkDailyMilestones() {
    const milestones = [3, 7, 14, 21, 30, 50, 75, 100];
    
    if (milestones.includes(AppData.streak)) {
        setTimeout(() => {
            showStreakMilestoneNotification();
        }, 2000);
    }
}

function getRunWorkoutId(dateKey = getTodayKey()) {
    return `run_${dateKey}`;
}

// Normalize a date key to YYYY-MM-DD (accepts Date or string)
function normalizeDateKey(input) {
    if (!input) return null;
    if (input instanceof Date) {
        const d = input;
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }
    // If string like '2025-10-15' or with time, parse and reformat
    const parsed = new Date(input);
    if (isNaN(parsed.getTime())) return null;
    return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}-${String(parsed.getDate()).padStart(2, '0')}`;
}

function normalizeRestDayList(value) {
    const values = Array.isArray(value) ? value : [value];
    const normalized = [];

    values.forEach(item => {
        if (item === null || item === undefined || item === 'none' || item === '') return;
        const parsed = Number(item);
        if (!Number.isNaN(parsed) && parsed >= 0 && parsed <= 6) {
            normalized.push(String(parsed));
        }
    });

    return Array.from(new Set(normalized)).sort((a, b) => Number(a) - Number(b));
}

function getRestDays() {
    const settings = AppData?.settings || {};
    const restDays = normalizeRestDayList(settings.restDays);

    if (restDays.length > 0) {
        settings.restDays = restDays;
        settings.restDay = restDays[0];
        return restDays;
    }

    const legacyRestDay = normalizeRestDayList(settings.restDay);
    if (legacyRestDay.length > 0) {
        settings.restDays = legacyRestDay;
        settings.restDay = legacyRestDay[0];
        return legacyRestDay;
    }

    settings.restDays = [];
    settings.restDay = 'none';
    return [];
}

function isRestDay() {
    // Use active date (selected in calendar) or today
    const dateKey = typeof getActiveDate === 'function' ? getActiveDate() : getTodayKey();
    return isRestDayForDate(dateKey);
}

function isRestDayForDate(dateString) {
    const normalizedDate = normalizeDateKey(dateString);
    if (!normalizedDate) return false;

    const date = new Date(normalizedDate + 'T12:00:00');
    const dayOfWeek = date.getDay();
    const restDays = getRestDays();
    if (restDays.length === 0) return false;

    const effectiveFrom = AppData.challenge?.restDaysEffectiveFrom;
    if (effectiveFrom && normalizedDate < effectiveFrom) {
        return false;
    }

    return restDays.includes(String(dayOfWeek));
}

// ======================
// NAVIGATION SYSTEM
// ======================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger-btn');
    const mainNav = document.querySelector('.main-nav');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            playClickSound(); // Dźwięk kliknięcia
            const view = link.dataset.view;
            switchView(view);
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Pigułki "Challenge mode" - skróty do motywów i odznak
    const goToView = (viewName) => {
        playClickSound();
        switchView(viewName);
        navLinks.forEach(l => l.classList.toggle('active', l.dataset.view === viewName));
    };

    const pillThemes = document.getElementById('pillThemes');
    if (pillThemes) {
        pillThemes.addEventListener('click', () => goToView('settings'));
        pillThemes.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goToView('settings'); }
        });
    }

    const pillBadges = document.getElementById('pillBadges');
    if (pillBadges) {
        pillBadges.addEventListener('click', () => goToView('badges'));
        pillBadges.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goToView('badges'); }
        });
    }
}

function switchView(viewName) {
    const views = document.querySelectorAll('.view');
    views.forEach(view => view.classList.remove('active'));
    
    const targetView = document.getElementById(`view-${viewName}`);
    if (targetView) {
        targetView.classList.add('active');
        
        // Update specific view when switched
        if (viewName === 'calendar') renderCalendar();
        if (viewName === 'stats') updateStats();
        if (viewName === 'rules') renderRulesView();
        if (viewName === 'settings') renderRulesSettings();
        if (viewName === 'badges') {
            updateBadgesDisplay();
            markBadgesAsViewed(); // Usuń glow po wejściu w widok
        }
    }
}

// ======================
// THEME SYSTEM
// ======================
function initThemeSystem() {
    // Usunięto obsługę przycisków z headera - motywy tylko w ustawieniach
}

function setTheme(themeName) {
    const body = document.body;
    const themeClasses = [
        'theme-pink', 
        'theme-ocean', 
        'theme-mint', 
        'theme-lavender', 
        'theme-strawberry',
        'theme-yellow',
        'theme-orange',
        'theme-red',
        'theme-blue',
        'theme-purple',
        'theme-black',
        'theme-transformers',
        'theme-aurora',
        'theme-peach-pop',
        'theme-forest-glow',
        'theme-cotton-candy',
        'theme-macaron',
        'theme-rose-garden',
        'theme-bloom',
        'theme-bluebell',
        'theme-cherry-cream'
    ];
    
    themeClasses.forEach(cls => body.classList.remove(cls));
    body.classList.add(`theme-${themeName}`);
}

// ======================
// DASHBOARD
// ======================
function initDashboard() {
    // Steps input
    const stepsInput = document.getElementById('stepsInput');
    const saveStepsBtn = document.getElementById('saveStepsBtn');
    const stepsSuccess = document.getElementById('stepsSuccess');
    
    saveStepsBtn.addEventListener('click', () => {
        playSuccessSound(); // Dźwięk sukcesu
        const steps = parseInt(stepsInput.value) || 0;
        const dateKey = normalizeDateKey(getActiveDate()); // Normalize
        if (!dateKey) return;
        AppData.steps[dateKey] = steps;
        saveData();
        
        stepsSuccess.classList.add('show');
        setTimeout(() => stepsSuccess.classList.remove('show'), 2000);
        
        updateAllDisplays();
    });
    
    // Mood selector
    const moodButtons = document.querySelectorAll('.card-mood .mood-btn');
    const saveMoodBtn = document.getElementById('saveMoodBtn');
    const moodSuccess = document.getElementById('moodSuccess');
    let selectedMood = null;
    
    moodButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            playClickSound(); // Dźwięk kliknięcia
            moodButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedMood = btn.dataset.mood;
        });
    });
    
    saveMoodBtn.addEventListener('click', () => {
        if (selectedMood) {
            playSuccessSound(); // Dźwięk sukcesu
            const dateKey = normalizeDateKey(getActiveDate()); // Normalize
            if (!dateKey) return;
            AppData.mood[dateKey] = selectedMood;
            saveData();
            
            moodSuccess.classList.add('show');
            setTimeout(() => moodSuccess.classList.remove('show'), 2000);
            
            updateAllDisplays();
        }
    });
    
    // Study hours
    const studyHoursInput = document.getElementById('studyHoursInput');
    const saveStudyBtn = document.getElementById('saveStudyBtn');
    const studySuccess = document.getElementById('studySuccess');
    
    // Load today's study hours
    const todayKey = getTodayKey();
    if (AppData.studyHours[todayKey]) {
        studyHoursInput.value = AppData.studyHours[todayKey];
    }
    
    saveStudyBtn.addEventListener('click', () => {
        playSuccessSound(); // Dźwięk sukcesu
        const hours = parseFloat(studyHoursInput.value) || 0;
        const dateKey = normalizeDateKey(getActiveDate()); // Normalize
        if (!dateKey) return;
        AppData.studyHours[dateKey] = hours;
        saveData();
        
        studySuccess.classList.add('show');
        setTimeout(() => studySuccess.classList.remove('show'), 2000);
        
        updateAllDisplays();
    });
    
    // Tasks
    const taskCheckboxes = document.querySelectorAll('.task-checkbox');
    const resetTasksBtn = document.getElementById('resetTasksBtn');
    const completeAllTasksBtn = document.getElementById('completeAllTasksBtn');
    const editTasksBtn = document.getElementById('editTasksBtn');
    const taskEditSection = document.getElementById('taskEditSection');
    const saveTasksBtn = document.getElementById('saveTasksBtn');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const newTaskInput = document.getElementById('newTaskInput');
    
    // Load tasks from storage or use defaults
    if (!AppData.tasks || AppData.tasks.length === 0) {
        AppData.tasks = [
            "15 minut aktywności",
            "Wpis w dzienniku",
            "Sen - przynajmniej 6 godzin",
            "Przynajmniej 10 minut czytania książki",
            "Zjedz prawdziwe/nieprzetworzone jedzenie",
            "Przynajmniej 1 litr wody"
        ];
    }
    
    renderTasks();
    
    // Edit tasks button
    editTasksBtn.addEventListener('click', () => {
        playClickSound(); // Dźwięk kliknięcia
        const isVisible = taskEditSection.style.display !== 'none';
        taskEditSection.style.display = isVisible ? 'none' : 'block';
        
        if (!isVisible) {
            renderEditTasks();
        }
    });
    
    // Save tasks
    saveTasksBtn.addEventListener('click', () => {
        playSuccessSound(); // Dźwięk sukcesu
        const editItems = document.querySelectorAll('.edit-task-item input[type="text"]');
        const previousTasks = [...AppData.tasks];
        AppData.tasks = Array.from(editItems).map(input => input.value).filter(val => val.trim());
        if (AppData.challenge?.startDate) {
            recordChallengeActivity('task-edit', {
                dateKey: getTodayKey(),
                summary: `Zmieniono zadania: ${JSON.stringify(previousTasks)} -> ${JSON.stringify(AppData.tasks)}`
            });
        }
        saveData();
        renderTasks();
        taskEditSection.style.display = 'none';
        showNotification('💾 Zadania zapisane!', 'success');
    });
    
    // Add task
    addTaskBtn.addEventListener('click', () => {
        playClickSound(); // Dźwięk kliknięcia
        const newTask = newTaskInput.value.trim();
        if (newTask) {
            AppData.tasks.push(newTask);
            if (AppData.challenge?.startDate) {
                recordChallengeActivity('task-add', {
                    dateKey: getTodayKey(),
                    summary: `Dodano zadanie: ${newTask}`
                });
            }
            newTaskInput.value = '';
            renderEditTasks();
        }
    });
    
    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });
    
    resetTasksBtn.addEventListener('click', () => {
        playClickSound(); // Dźwięk kliknięcia
    const dateKey = normalizeDateKey(getActiveDate()); // Normalize
    const wasCompleted = Array.isArray(AppData.challenge.completedDays) && AppData.challenge.completedDays.includes(dateKey);
        
        const taskCheckboxes = document.querySelectorAll('.task-checkbox');
        taskCheckboxes.forEach(cb => {
            cb.checked = false;
            cb.closest('.task-item').classList.remove('completed');
        });
        
        // Remove day from completed if it was there
        if (wasCompleted) {
            const index = AppData.challenge.completedDays.indexOf(dateKey);
            if (index > -1) {
                AppData.challenge.completedDays.splice(index, 1);
                // Don't decrement currentDay - it should always track calendar days, not completed days
            }
            // Recalculate streak
            calculateStreak();
            showNotification('⚠️ Dzień został cofnięty. Ukończ zadania ponownie aby przywrócić streak!', 'warning');
        }
        
        updateTasksData();
        updateAllDisplays();
    });
    
    completeAllTasksBtn.addEventListener('click', () => {
        playSuccessSound(); // Dźwięk sukcesu
        const taskCheckboxes = document.querySelectorAll('.task-checkbox');
        taskCheckboxes.forEach(cb => {
            cb.checked = true;
            cb.closest('.task-item').classList.add('completed');
        });
        updateTasksData();
        checkDayCompletion();
        
        // Trigger confetti animation
        createConfetti();
    });

    // Start Challenge button (new)
    const startChallengeBtn = document.getElementById('startChallengeBtn');
    if (startChallengeBtn) {
        startChallengeBtn.addEventListener('click', () => {
            playClickSound();
            startChallenge();
        });
    }
}

function renderTasks() {
    const tasksList = document.getElementById('tasksList');
    const restDayMessage = document.getElementById('restDayMessage');
    const taskActions = document.querySelector('.task-actions');
    const editTasksBtn = document.getElementById('editTasksBtn');
    
    // Check if today is rest day
    if (isRestDay()) {
        tasksList.style.display = 'none';
        taskActions.style.display = 'none';
        restDayMessage.style.display = 'block';
        editTasksBtn.style.display = 'none';
        
        // Auto-complete rest day if setting is enabled
        if (AppData.settings.countRestDays) {
            const dateKey = normalizeDateKey(getActiveDate()); // Normalize
            if (dateKey === getTodayKey() && isChallengeDayEligible(dateKey) && Array.isArray(AppData.challenge.completedDays) && !AppData.challenge.completedDays.includes(dateKey)) {
                AppData.challenge.completedDays.push(dateKey);
                if (AppData.challenge.completedDays.length >= AppData.challenge.totalDays) {
                    handleChallengeCompletion();
                }
                calculateStreak();
                saveData();
            }
        }
        return;
    }
    
    // Normal day - show tasks
    tasksList.style.display = 'block';
    taskActions.style.display = 'flex';
    restDayMessage.style.display = 'none';
    editTasksBtn.style.display = 'block';
    
    tasksList.innerHTML = '';
    
    const dateKey = normalizeDateKey(getActiveDate()); // Use selected date instead of just today
    const completedTasksToday = AppData.completedTasks[dateKey] || [];
    
    // Backward compatibility: jeśli to jest liczba zamiast tablicy, konwertuj
    const completedIndices = Array.isArray(completedTasksToday) 
        ? completedTasksToday 
        : Array.from({length: completedTasksToday}, (_, i) => i);
    
    // Pobierz zadania dla danego dnia
    let tasksToShow = AppData.tasks;
    if (AppData.weeklyTasks && AppData.weeklyTasks.enabled) {
        const date = new Date(dateKey + 'T12:00:00');
        const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const dayName = dayNames[dayOfWeek];
        
        if (AppData.weeklyTasks[dayName] && AppData.weeklyTasks[dayName].length > 0) {
            tasksToShow = AppData.weeklyTasks[dayName];
        }
    }
    
    tasksToShow.forEach((task, index) => {
        const label = document.createElement('label');
        label.className = 'task-item';
        
        // Sprawdź czy to zadanie jest ukończone
        const isCompleted = completedIndices.includes(index);
        
        label.innerHTML = `
            <input type="checkbox" class="task-checkbox" data-index="${index}" ${isCompleted ? 'checked' : ''}>
            <span class="task-text">${task}</span>
        `;
        
        if (isCompleted) {
            label.classList.add('completed');
        }
        
        const checkbox = label.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => {
            playCheckboxSound(); // Dźwięk checkboxa
            label.classList.toggle('completed', checkbox.checked);
            updateTasksData();
            checkDayCompletion(); // Check after any checkbox change
        });
        
        tasksList.appendChild(label);
    });
    
    // If all tasks are already checked (e.g., loading past day data),
    // mark day as completed but don't show notification
    const allTasksChecked = Array.from(document.querySelectorAll('.task-checkbox')).every(cb => cb.checked);
    if (allTasksChecked && tasksToShow.length > 0) {
        const markDateKey = normalizeDateKey(getActiveDate());
        if (markDateKey && isChallengeDayEligible(markDateKey) && Array.isArray(AppData.challenge.completedDays) && !AppData.challenge.completedDays.includes(markDateKey)) {
            AppData.challenge.completedDays.push(markDateKey);
            calculateStreak();
            saveData();
            updateAllDisplays();
            // No notification or confetti for silently marking completed days
        }
    }
}

function renderEditTasks() {
    const editTasksList = document.getElementById('editTasksList');
    editTasksList.innerHTML = '';
    
    AppData.tasks.forEach((task, index) => {
        const div = document.createElement('div');
        div.className = 'edit-task-item';
        div.innerHTML = `
            <input type="text" value="${task}">
            <button class="delete-task-btn" data-index="${index}">🗑️</button>
        `;
        
        const deleteBtn = div.querySelector('.delete-task-btn');
        deleteBtn.addEventListener('click', () => {
            playClickSound(); // Dźwięk kliknięcia
            const removedTask = AppData.tasks[index];
            AppData.tasks.splice(index, 1);
            if (AppData.challenge?.startDate) {
                recordChallengeActivity('task-remove', {
                    dateKey: getTodayKey(),
                    summary: `Usunięto zadanie: ${removedTask || 'nieznane'}`
                });
            }
            renderEditTasks();
        });
        
        editTasksList.appendChild(div);
    });
}

function updateTasksData() {
    const taskCheckboxes = document.querySelectorAll('.task-checkbox');
    const completedIndices = Array.from(taskCheckboxes)
        .map((cb, index) => cb.checked ? index : -1)
        .filter(index => index !== -1);
    const dateKey = normalizeDateKey(getActiveDate()); // Normalize date
    if (!dateKey) return;
    AppData.completedTasks[dateKey] = completedIndices;
    saveData();
}

function handleChallengeCompletion() {
    // Ustaw znacznik czasu ukończenia wyzwania
    const completionTime = Date.now();
    
    AppData.challenge.completionTime = completionTime;
    // USUNIĘTE: Automatyczny reset danych - użytkownik sam zdecyduje kiedy resetować
    // const resetTime = completionTime + (60 * 60 * 1000); // 1 godzina później
    // AppData.challenge.resetScheduled = resetTime;
    
    saveData();
    
    // Pokaż specjalny modal z gratulacjami i informacją o czasie
    showChallengeCompletionModal();
    
    // Dodatkowe confetti na ukończenie wyzwania
    createConfetti();
    setTimeout(createConfetti, 300);
    setTimeout(createConfetti, 600);
    
    // USUNIĘTE: Automatyczne planowanie resetu danych
    // scheduleDataReset();
}

function showChallengeCompletionModal() {
    const totalDays = AppData.challenge.totalDays || AppData.settings.challengeLength || 75;
    const modal = document.createElement('div');
    modal.className = 'completion-modal';
    modal.innerHTML = `
        <div class="completion-modal-content">
            <div class="completion-header">
                <h2>🎊 GRATULACJE! 🎊</h2>
                <p class="completion-title">Ukończyłeś ${totalDays}-dniowe wyzwanie!</p>
            </div>
            
            <div class="completion-body">
                <div class="completion-icon">👑</div>
                <p class="completion-message">
                    To niesamowite osiągnięcie! Jesteś prawdziwą legendą! 🌟
                </p>
                
                <p class="completion-message">Twoje dane pozostają zapisane. Możesz pobrać raport lub rozpocząć nowy cykl w ustawieniach, kiedy zechcesz.</p>
                
                <button class="btn-download-now" id="downloadReportBtn">
                    📥 Pobierz raport teraz
                </button>
                
                <button class="btn-close-modal" id="closeCompletionModal">
                    Rozumiem
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Event listeners
    document.getElementById('downloadReportBtn').addEventListener('click', () => {
        exportDataAsHTML();
    });
    
    document.getElementById('closeCompletionModal').addEventListener('click', () => {
        modal.remove();
    });
    
}

function updateResetCountdown() {
    const countdownEl = document.getElementById('resetCountdown');
    if (!countdownEl) return;
    
    const resetTime = AppData.challenge.resetScheduled;
    if (!resetTime) return;
    
    const now = Date.now();
    const timeLeft = resetTime - now;
    
    if (timeLeft <= 0) {
        countdownEl.textContent = '00:00';
        return;
    }
    
    const minutes = Math.floor(timeLeft / (60 * 1000));
    const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);
    
    countdownEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    setTimeout(updateResetCountdown, 1000);
}

function scheduleDataReset() {
    const resetTime = AppData.challenge.resetScheduled;
    if (!resetTime) return;
    
    const now = Date.now();
    const delay = resetTime - now;
    
    if (delay <= 0) {
        performDataReset();
        return;
    }
    
    setTimeout(() => {
        performDataReset();
    }, delay);
}

function performDataReset() {
    // Resetuj historię kroków, nastroju i nauki
    AppData.steps = {};
    AppData.mood = {};
    AppData.studyHours = {};
    
    // Resetuj wszystkie odznaki
    Object.keys(AppData.badges).forEach(badgeId => {
        AppData.badges[badgeId] = { unlocked: false, isNew: false };
    });
    
    // Usuń znaczniki czasu
    delete AppData.challenge.completionTime;
    delete AppData.challenge.resetScheduled;
    
    // Zachowaj postęp wyzwania, galerię i ustawienia
    saveData();
    updateAllDisplays();
    
    // USUNIĘTE: Powiadomienie - reset jest teraz tylko manualny
    // showNotification('♻️ Historia danych i odznaki zostały zresetowane. Możesz rozpocząć nowy cykl!', 'success');
}

function checkScheduledReset() {
    if (AppData.challenge.resetScheduled) {
        const now = Date.now();
        const resetTime = AppData.challenge.resetScheduled;
        
        if (now >= resetTime) {
            // Czas minął, wykonaj reset
            performDataReset();
        } else {
            // Pokaż przypomnienie o zaplanowanym resecie
            showResetReminderBanner();
            // Zaplanuj reset
            scheduleDataReset();
        }
    }
}

function showResetReminderBanner() {
    const banner = document.createElement('div');
    banner.className = 'reset-reminder-banner';
    banner.innerHTML = `
        <div class="banner-content">
            <span class="banner-icon">⏰</span>
            <span class="banner-text">
                Reset danych nastąpi za: <strong id="bannerCountdown">--:--</strong>
            </span>
            <button class="banner-download-btn" onclick="exportDataAsHTML()">
                📥 Pobierz raport
            </button>
        </div>
    `;
    
    document.body.insertBefore(banner, document.body.firstChild);
    
    // Update banner countdown
    updateBannerCountdown();
}

function updateBannerCountdown() {
    const countdownEl = document.getElementById('bannerCountdown');
    if (!countdownEl) return;
    
    const resetTime = AppData.challenge.resetScheduled;
    if (!resetTime) return;
    
    const now = Date.now();
    const timeLeft = resetTime - now;
    
    if (timeLeft <= 0) {
        countdownEl.textContent = '00:00';
        return;
    }
    
    const minutes = Math.floor(timeLeft / (60 * 1000));
    const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);
    
    countdownEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    setTimeout(updateBannerCountdown, 1000);
}

function checkDayCompletion() {
    const dateKey = normalizeDateKey(getActiveDate()); // Use active date instead of today, normalized
    if (!dateKey || !isChallengeDayEligible(dateKey)) return;
    const taskCheckboxes = document.querySelectorAll('.task-checkbox');
    const allCompleted = Array.from(taskCheckboxes).every(cb => cb.checked);
    
    // Sprawdź ile zadań powinno być dla tego dnia
    const hasTasks = taskCheckboxes.length > 0;

    if (allCompleted && hasTasks) {
        if (Array.isArray(AppData.challenge.completedDays) && !AppData.challenge.completedDays.includes(dateKey)) {
            AppData.challenge.completedDays.push(dateKey);
            
            // Don't increment currentDay here - let syncChallengeByDates() handle it
            // This prevents currentDay from getting ahead of calendar days
            
            // Sprawdź czy wyzwanie zostało ukończone
            // Count completed days to check completion
            if (AppData.challenge.completedDays.length >= AppData.challenge.totalDays) {
                handleChallengeCompletion();
            }

            calculateStreak();
            saveData();
            updateAllDisplays();
            showNotification('🎉 Dzień ukończony! Świetna robota!', 'success');

            // Trigger confetti animation
            createConfetti();
        }
    } else {
        // If not all completed, ensure it's removed from completedDays if present
        const idx = AppData.challenge.completedDays.indexOf(dateKey);
        if (idx !== -1) {
            AppData.challenge.completedDays.splice(idx, 1);
            // Don't adjust currentDay - it should track calendar, not completed days
            calculateStreak();
            saveData();
            updateAllDisplays();
        }
    }
}

function calculateStreak() {
    if (!AppData.challenge.completedDays || AppData.challenge.completedDays.length === 0) {
        AppData.streak = 0;
        return;
    }

    const sorted = [...AppData.challenge.completedDays].sort().reverse();
    const todayKey = getTodayKey();
    const today = new Date(todayKey + 'T12:00:00');

    let currentDate = new Date(sorted[0] + 'T12:00:00');
    const latestCompletedDate = new Date(sorted[0] + 'T12:00:00');

    const daysSinceLastCompleted = Math.floor((today - latestCompletedDate) / (1000 * 60 * 60 * 24));

    if (daysSinceLastCompleted > 1) {
        AppData.streak = 0;
        return;
    }

    let streak = 1;

    for (let i = 1; i < sorted.length; i++) {
        const prevDate = new Date(sorted[i] + 'T12:00:00');
        const diff = Math.floor((currentDate - prevDate) / (1000 * 60 * 60 * 24));

        if (diff === 1) {
            streak++;
            currentDate = prevDate;
            continue;
        }

        if (diff === 2) {
            const skippedDate = new Date(currentDate);
            skippedDate.setDate(skippedDate.getDate() - 1);
            const skippedKey = normalizeDateKey(skippedDate);
            if (skippedKey && isRestDayForDate(skippedKey)) {
                streak++;
                currentDate = prevDate;
                continue;
            }
        }

        break;
    }

    AppData.streak = streak;

    if (streak > (AppData.longestStreak || 0)) {
        AppData.longestStreak = streak;
    }
}

function getChallengeDisplayName() {
    const raw = AppData.settings?.challengeName;
    const value = typeof raw === 'string' ? raw.trim() : '';
    return value || 'Kawaii Quest';
}

function applyChallengeNameToUI() {
    const label = document.getElementById('challengeNameLabel');
    if (label) {
        label.textContent = getChallengeDisplayName();
    }
}

function updateAllDisplays() {
    calculateStreak(); // Always recalculate streak when updating displays
    updateChallengeProgress();
    updateStreakDisplay();
    updateTodaySteps();
    updateTodayMood();
    applyChallengeNameToUI();
    
    // Odśwież też inne elementy UI
    if (typeof renderTasks === 'function') renderTasks();
    if (typeof renderCalendar === 'function') renderCalendar();
    if (typeof updateStats === 'function') updateStats();
    if (typeof renderGallery === 'function') renderGallery();
    if (typeof updateBadgesDisplay === 'function') updateBadgesDisplay();
    if (typeof applySettings === 'function') applySettings();
}

// ======================
// CHALLENGE LIFECYCLE
// ======================
function isChallengeActive() {
    return !!AppData.challenge.startDate && AppData.challenge.currentDay < AppData.challenge.totalDays;
}

function isDayInChallengeRange(dayKey) {
    // Check if a given day is within the challenge range (between startDate and current progress)
    if (!AppData.challenge.startDate) return false;
    
    const startDate = new Date(AppData.challenge.startDate + 'T00:00:00');
    const checkDate = new Date(dayKey + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Day must be after or equal to start date
    if (checkDate < startDate) return false;
    
    // Day must be before or equal to today (can't fail future days)
    if (checkDate > today) return false;
    
    // Calculate how many days from start
    const msPerDay = 24 * 60 * 60 * 1000;
    const daysSinceStart = Math.floor((checkDate - startDate) / msPerDay);
    
    // Day must be within the current progress
    return daysSinceStart < AppData.challenge.currentDay;
}

function isChallengeDayEligible(dayKey) {
    if (!AppData.challenge.startDate) return false;

    const normalizedDayKey = normalizeDateKey(dayKey);
    if (!normalizedDayKey) return false;

    const startDate = new Date(AppData.challenge.startDate + 'T00:00:00');
    const checkDate = new Date(normalizedDayKey + 'T00:00:00');
    const today = new Date(getTodayKey() + 'T00:00:00');
    const totalDays = AppData.challenge.totalDays || AppData.settings.challengeLength || 75;
    const daysSinceStart = Math.floor((checkDate - startDate) / (24 * 60 * 60 * 1000));

    return checkDate <= today && daysSinceStart >= 0 && daysSinceStart < totalDays;
}

function sanitizeChallengeCompletedDays() {
    if (!Array.isArray(AppData.challenge?.completedDays)) return;

    AppData.challenge.completedDays = AppData.challenge.completedDays.filter(isChallengeDayEligible);
}

function startChallenge() {
    // Check if rules were accepted
    if (!AppData.settings.rulesAccepted) {
        showRulesModal();
        return;
    }
    
    const todayKey = getTodayKey();
    if (!AppData.challenge.startDate) {
        AppData.challenge.startDate = todayKey;
        AppData.challenge.cycleStartedAt = Date.now();
        // Ensure totalDays is synced with settings
        AppData.challenge.totalDays = AppData.settings.challengeLength || AppData.challenge.totalDays || 75;
        // Start at day 1 (today is day 1 of the challenge)
        AppData.challenge.currentDay = 1;
        AppData.challenge.completedDays = [];
        delete AppData.challenge.completionTime;
        delete AppData.challenge.resetScheduled;
        saveData();
        
        // Hide start button in UI
        const startBtn = document.getElementById('startChallengeBtn');
        if (startBtn) startBtn.style.display = 'none';
        
        // Update UI immediately
        updateAllDisplays();
        
        showNotification('🚀 Wyzwanie rozpoczęte! Dzień 1 rozpoczyna się dzisiaj. Powodzenia!', 'success');
    }
}

function syncChallengeByDates(options = {}) {
    if (!AppData.challenge.startDate) return;

    if (AppData.settings && AppData.settings.rulesAccepted !== true) {
        AppData.settings.rulesAccepted = true;
    }

    if (!Array.isArray(AppData.challenge.completedDays)) {
        AppData.challenge.completedDays = [];
    }
    
    // Jeśli wyzwanie jest ukończone, nie przeliczaj
    if (AppData.challenge.completionTime) return;

    const start = new Date(AppData.challenge.startDate + 'T00:00:00');
    const today = new Date();

    const msPerDay = 24 * 60 * 60 * 1000;
    const daysPassed = Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())) / msPerDay);

    const total = AppData.challenge.totalDays || AppData.settings.challengeLength || 75;
    const previousCurrentDay = Number.isFinite(AppData.challenge.currentDay) ? AppData.challenge.currentDay : 0;
    const correctCurrentDay = Math.max(1, Math.min(daysPassed + 1, total));
    
    if (correctCurrentDay !== previousCurrentDay) {
        AppData.challenge.currentDay = correctCurrentDay;
        saveData();
        if (options.updateUi !== false) {
            updateAllDisplays();
        }
    }

    // Wywołaj completion tylko jeśli faktycznie ukończono wszystkie dni
    if (AppData.challenge.completedDays.length >= total && !AppData.challenge.completionTime) {
        handleChallengeCompletion();
    }
}

// Periodic sync: run once every minute to catch day changes while the app is open
setInterval(() => {
    if (isChallengeActive()) {
        syncChallengeByDates();
    }
}, 1000 * 60); // Check every minute instead of every hour

// Sync when user returns to tab
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && isChallengeActive()) {
        syncChallengeByDates();
    }
});

// Sync when window regains focus
window.addEventListener('focus', () => {
    if (isChallengeActive()) {
        syncChallengeByDates();
    }
});

// On load, hide start button when challenge active
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startChallengeBtn');
    const rulesWarning = document.getElementById('rulesWarning');
    const challengeStarted = !!(AppData.challenge && AppData.challenge.startDate);
    const rulesAccepted = AppData.settings && AppData.settings.rulesAccepted === true;
    
    if (startBtn) {
        if (challengeStarted) {
            startBtn.style.display = 'none';
            if (rulesWarning) rulesWarning.style.display = 'none';
        } else if (!rulesAccepted) {
            startBtn.style.display = 'none';
            if (rulesWarning) rulesWarning.style.display = 'block';
        } else {
            startBtn.style.display = 'block';
            if (rulesWarning) rulesWarning.style.display = 'none';
        }
    }
    if (challengeStarted) {
        syncChallengeByDates();
    }
});

function updateChallengeProgress() {
    let percent = (AppData.challenge.currentDay / AppData.challenge.totalDays) * 100;
    percent = Math.min(percent, 100);
    // Use one decimal for display, but keep float for CSS sizing
    const display = percent.toFixed(1);
    document.getElementById('challengeProgressBar').style.width = display + '%';
    document.getElementById('challengePercent').textContent = display + '%';
    document.getElementById('challengeDays').textContent = `${AppData.challenge.currentDay}/${AppData.challenge.totalDays} dni`;
}

function updateStreakDisplay() {
    document.getElementById('streakNumber').textContent = AppData.streak;
}

function updateTodaySteps() {
    const steps = AppData.steps[getTodayKey()] || 0;
    const stepsInputEl = document.getElementById('stepsInput');
    if (stepsInputEl) stepsInputEl.value = steps || '';
}

function updateTodayMood() {
    const mood = AppData.mood[getTodayKey()];
    if (mood) {
        const moodButtons = document.querySelectorAll('.card-mood .mood-btn');
        moodButtons.forEach(btn => {
            btn.classList.toggle('selected', btn.dataset.mood === mood);
        });
    }
}

function startQuoteRotation() {
    setInterval(() => {
        const quotes = AppData.settings.theme === 'transformers' ? transformersQuotes : motivationalQuotes;
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        document.getElementById('motivationalQuote').textContent = `"${randomQuote}"`;
    }, 15000);
}

// ======================
// CALENDAR
// ======================
let currentCalendarDate = new Date();
let selectedDate = null; // Stores the currently selected date for editing

function initCalendar() {
    document.getElementById('prevMonth').addEventListener('click', () => {
        playClickSound(); // Dźwięk kliknięcia
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
        renderCalendar();
    });
    
    document.getElementById('nextMonth').addEventListener('click', () => {
        playClickSound(); // Dźwięk kliknięcia
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
        renderCalendar();
    });

    const reflectionButton = document.getElementById('calendarReflectionBtn');
    if (reflectionButton) {
        reflectionButton.addEventListener('click', () => showReflectionEditorModal(getActiveDate()));
    }
    
    renderCalendar();
}

function getActiveDate() {
    return selectedDate || getTodayKey();
}

function showCalendarDayDetailsModal(dateKey) {
    const modal = document.createElement('div');
    modal.className = 'calendar-day-modal';

    const content = document.createElement('div');
    content.className = 'calendar-day-modal-content';

    const title = document.createElement('h2');
    title.textContent = '🌸 Szczegóły dnia';

    const dateLabel = document.createElement('div');
    dateLabel.className = 'calendar-day-modal-date';
    const parsedDate = new Date(dateKey + 'T12:00:00');
    dateLabel.textContent = parsedDate.toLocaleDateString('pl-PL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const summary = getDaySummary(dateKey);
    const streakText = isPartOfCurrentStreak(dateKey) ? '✨ Tak' : '💤 Nie';
    const moodValue = AppData.mood?.[dateKey];
    const moodEmoji = { 1: '😔', 2: '🙁', 3: '😐', 4: '🙂', 5: '😊' };
    const moodText = moodValue ? `${moodEmoji[moodValue] || '🙂'} ${moodValue}/5` : '—';
    const stepsCount = Number(AppData.steps?.[dateKey] || 0);
    const studyHours = Number(AppData.studyHours?.[dateKey] || 0);
    const todaysTasks = getTasksForDate(dateKey);
    const completedTaskIndexes = Array.isArray(AppData.completedTasks?.[dateKey]) ? AppData.completedTasks[dateKey] : [];
    const completedTaskList = todaysTasks
        .map((task, index) => ({ task, index, done: completedTaskIndexes.includes(index) }))
        .map(({ task, done }) => `<li class="calendar-day-modal-task ${done ? 'done' : ''}">${done ? '✅' : '◻️'} ${task}</li>`)
        .join('');
    const reflection = AppData.reflections?.[dateKey]?.answer;

    const meta = document.createElement('div');
    meta.className = 'calendar-day-modal-meta';
    meta.innerHTML = `
        <div><strong>📌 Status:</strong> ${translateAppText(summary.status)}</div>
        <div><strong>🔥 Streak:</strong> ${streakText}</div>
        <div><strong>👣 Kroki:</strong> ${stepsCount}</div>
        <div><strong>📚 Nauka:</strong> ${studyHours}h</div>
        <div><strong>😊 Nastrój:</strong> ${moodText}</div>
        <div><strong>📝 Zadania:</strong> ${summary.completedCount}/${summary.totalTasks}</div>
    `;

    const tasksWrap = document.createElement('div');
    tasksWrap.className = 'calendar-day-modal-section';
    const tasksTitle = document.createElement('h3');
    tasksTitle.textContent = '📋 Zadania dnia';
    const tasksList = document.createElement('ul');
    tasksList.className = 'calendar-day-modal-task-list';
    tasksList.innerHTML = completedTaskList || '<li class="calendar-day-modal-task empty">Brak zadań w tym dniu.</li>';

    const reflectionWrap = document.createElement('div');
    reflectionWrap.className = 'calendar-day-modal-section';
    const reflectionTitle = document.createElement('h3');
    reflectionTitle.textContent = '💭 Notatka / refleksja';
    const reflectionText = document.createElement('p');
    reflectionText.className = 'calendar-day-modal-reflection';
    reflectionText.textContent = reflection || 'Brak notatki dla tego dnia.';

    const actions = document.createElement('div');
    actions.className = 'calendar-day-modal-actions';
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'btn-secondary';
    closeButton.textContent = 'Zamknij';
    closeButton.addEventListener('click', () => modal.remove());

    const openButton = document.createElement('button');
    openButton.type = 'button';
    openButton.className = 'btn-primary';
    openButton.textContent = 'Otwórz dzień';
    openButton.addEventListener('click', () => {
        selectedDate = dateKey;
        loadDataForDate(dateKey);
        renderCalendar();
        modal.remove();
    });

    actions.append(closeButton, openButton);
    tasksWrap.append(tasksTitle, tasksList);
    reflectionWrap.append(reflectionTitle, reflectionText);
    content.append(title, dateLabel, meta, tasksWrap, reflectionWrap, actions);
    modal.appendChild(content);
    document.body.appendChild(modal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) modal.remove();
    });
}

function showReflectionEditorModal(dateKey) {
    const reflection = AppData.reflections?.[dateKey];
    const modal = document.createElement('div');
    modal.className = 'reflection-modal';

    const content = document.createElement('div');
    content.className = 'reflection-modal-content';
    const title = document.createElement('h2');
    title.textContent = translateAppText('Refleksja');
    const question = document.createElement('p');
    question.className = 'reflection-modal-question';
    question.textContent = reflection?.question || getReflectionQuestion(dateKey);
    const input = document.createElement('textarea');
    input.rows = 5;
    input.maxLength = 700;
    input.placeholder = translateAppText('Twoja odpowiedź...');
    input.value = reflection?.answer || '';
    const counter = document.createElement('span');
    counter.className = 'reflection-modal-count';
    const updateCounter = () => { counter.textContent = `${countWords(input.value)} / 100 ${translateAppText('słów')}`; };
    input.addEventListener('input', updateCounter);
    updateCounter();

    const actions = document.createElement('div');
    actions.className = 'reflection-modal-actions';
    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.className = 'btn-secondary';
    cancelButton.textContent = translateAppText('Anuluj');
    cancelButton.addEventListener('click', () => modal.remove());
    const saveButton = document.createElement('button');
    saveButton.type = 'button';
    saveButton.className = 'btn-primary';
    saveButton.textContent = translateAppText('Zapisz refleksję');
    saveButton.addEventListener('click', () => {
        const answer = input.value.trim();
        if (countWords(answer) > 100) {
            showNotification(translateAppText('⚠️ Refleksja może mieć maksymalnie 100 słów.'), 'warning');
            return;
        }
        AppData.reflections = AppData.reflections || {};
        if (answer) AppData.reflections[dateKey] = { question: question.textContent, answer };
        else delete AppData.reflections[dateKey];
        saveData();
        if (selectedDate === dateKey) renderSelectedDaySummary(dateKey);
        renderCalendar();
        modal.remove();
    });
    actions.append(cancelButton, saveButton);
    content.append(title, question, input, counter, actions);
    modal.appendChild(content);
    document.body.appendChild(modal);
    input.focus();
}

function loadDataForDate(dateKey) {
    // Update all dashboard inputs with data for the selected date
    
    // Steps
    const stepsInput = document.getElementById('stepsInput');
    if (stepsInput) {
        stepsInput.value = AppData.steps[dateKey] || '';
    }
    
    // Mood
    const moodButtons = document.querySelectorAll('.card-mood .mood-btn');
    const savedMood = AppData.mood[dateKey];
    moodButtons.forEach(btn => {
        btn.classList.toggle('selected', btn.dataset.mood === String(savedMood));
    });
    
    // Study hours
    const studyHoursInput = document.getElementById('studyHoursInput');
    if (studyHoursInput) {
        studyHoursInput.value = AppData.studyHours[dateKey] || '';
    }
    
    // Tasks - render with data for selected date
    renderTasks();
    renderSelectedDaySummary(dateKey);
    
    console.log(`📅 Loaded data for ${dateKey}`);
}

function renderSelectedDaySummary(dateKey) {
    const summaryElement = document.getElementById('dateDaySummary');
    if (!summaryElement) return;

    const summary = getDaySummary(dateKey);
    const reflection = AppData.reflections?.[dateKey];
    const isStreakDay = isPartOfCurrentStreak(dateKey);

    summaryElement.replaceChildren();
    const status = document.createElement('strong');
    status.textContent = `${translateAppText('Status')}: ${translateAppText(summary.status)}`;
    const tasks = document.createElement('span');
    tasks.textContent = `${translateAppText('Zadania')}: ${summary.completedCount}/${summary.totalTasks}`;
    const streak = document.createElement('span');
    streak.textContent = `${translateAppText('Streak')}: ${translateAppText(isStreakDay ? 'tak' : 'nie')}`;
    summaryElement.append(status, tasks, streak);

    if (reflection?.answer) {
        const reflectionText = document.createElement('p');
        reflectionText.textContent = `${translateAppText('Refleksja')}: ${reflection.answer}`;
        summaryElement.appendChild(reflectionText);
    }

    const editor = document.createElement('textarea');
    editor.rows = 3;
    editor.maxLength = 700;
    editor.placeholder = translateAppText('Twoja odpowiedź...');
    editor.value = reflection?.answer || '';
    editor.className = 'reflection-editor';
    const saveButton = document.createElement('button');
    saveButton.type = 'button';
    saveButton.className = 'btn-secondary reflection-save-btn';
    saveButton.textContent = translateAppText('Zapisz refleksję');
    saveButton.addEventListener('click', () => {
        const answer = editor.value.trim();
        if (countWords(answer) > 100) {
            showNotification(translateAppText('⚠️ Refleksja może mieć maksymalnie 100 słów.'), 'warning');
            return;
        }
        AppData.reflections = AppData.reflections || {};
        if (answer) AppData.reflections[dateKey] = { question: reflection?.question || getReflectionQuestion(dateKey), answer };
        else delete AppData.reflections[dateKey];
        saveData();
        renderSelectedDaySummary(dateKey);
        renderCalendar();
    });
    summaryElement.append(editor, saveButton);
}

function returnToToday() {
    selectedDate = null;
    
    // Hide date indicator
    const dateIndicator = document.getElementById('dateIndicator');
    if (dateIndicator) {
        dateIndicator.style.display = 'none';
    }
    
    // Reload data for today
    loadDataForDate(getTodayKey());
    
    // Refresh calendar to update highlighting
    renderCalendar();
    
    showNotification('📅 Powrócono do daty dzisiejszej', 'success');
}

function renderCalendar() {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    
    const monthNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
                        'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
    
    document.getElementById('calendarTitle').textContent = `${monthNames[month]} ${year}`;
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const calendarGrid = document.getElementById('calendarGrid');
    calendarGrid.innerHTML = '';
    
    // Day headers
    const dayHeaders = ['Nd', 'Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'];
    dayHeaders.forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-day-header';
        header.textContent = day;
        calendarGrid.appendChild(header);
    });
    
    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        empty.className = 'calendar-day empty';
        calendarGrid.appendChild(empty);
    }
    
    // Days
    const today = getTodayKey();
    
    // Calculate which days are part of current streak (from today backwards)
    const streakDays = new Set();
    
    if (AppData.challenge.completedDays.length > 0) {
        const sortedDaysDesc = [...AppData.challenge.completedDays].sort().reverse();
        const todayDate = new Date(today + 'T12:00:00');
        const latestCompletedDate = new Date(sortedDaysDesc[0] + 'T12:00:00');

        const daysSinceLastCompleted = Math.floor((todayDate - latestCompletedDate) / (1000 * 60 * 60 * 24));

        if (daysSinceLastCompleted <= 1) {
            streakDays.add(sortedDaysDesc[0]);
            let currentDate = latestCompletedDate;

            for (let i = 1; i < sortedDaysDesc.length; i++) {
                const prevDate = new Date(sortedDaysDesc[i] + 'T12:00:00');
                const diff = Math.floor((currentDate - prevDate) / (1000 * 60 * 60 * 24));

                if (diff === 1) {
                    streakDays.add(sortedDaysDesc[i]);
                    currentDate = prevDate;
                } else if (diff === 2) {
                    const skippedDate = new Date(currentDate);
                    skippedDate.setDate(skippedDate.getDate() - 1);
                    const skippedKey = normalizeDateKey(skippedDate);
                    if (skippedKey && isRestDayForDate(skippedKey)) {
                        streakDays.add(sortedDaysDesc[i]);
                        currentDate = prevDate;
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }
        }
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dayKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day';
        dayDiv.textContent = day;
        
        // Make day clickable
        dayDiv.style.cursor = 'pointer';
        dayDiv.addEventListener('click', () => {
            playClickSound();
            selectedDate = dayKey;

            const dateIndicator = document.getElementById('dateIndicator');
            if (dateIndicator) {
                const dateObj = new Date(dayKey + 'T00:00:00');
                const formattedDate = dateObj.toLocaleDateString('pl-PL', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                });
                dateIndicator.querySelector('.selected-date-text').textContent = formattedDate;
                dateIndicator.style.display = 'flex';
            }

            loadDataForDate(dayKey);
            renderCalendar();
            showCalendarDayDetailsModal(dayKey);
        });
        
        // Check if rest day
        if (isRestDayForDate(dayKey)) {
            dayDiv.classList.add('rest');
        }
        
        if (dayKey === today) {
            dayDiv.classList.add('today');
        }
        
        // Highlight selected date
        if (dayKey === selectedDate) {
            dayDiv.classList.add('selected');
        }
        
        // Check if day is in challenge range
        const isInChallengeRange = isDayInChallengeRange(dayKey);
        const isCompleted = Array.isArray(AppData.challenge.completedDays) && AppData.challenge.completedDays.includes(dayKey);
        const daySummary = getDaySummary(dayKey);
        
        if (isCompleted) {
            dayDiv.classList.add('completed');
        } else if (isInChallengeRange && !isRestDayForDate(dayKey)) {
            // Day is in challenge range but not completed = failed
            dayDiv.classList.add('failed');
        }
        
        // Add streak indicator
        if (streakDays.has(dayKey)) {
            dayDiv.classList.add('has-streak');
        }

        if (isInChallengeRange) {
            const statusClass = daySummary.status === 'ukończony' ? 'complete' : daySummary.status === 'częściowy' ? 'partial' : daySummary.status === 'odpoczynek' ? 'rest' : 'missed';
            const statusIcon = document.createElement('span');
            statusIcon.className = `calendar-status-icon status-${statusClass}`;
            statusIcon.textContent = daySummary.status === 'ukończony' ? '🌸' : daySummary.status === 'częściowy' ? '✨' : daySummary.status === 'odpoczynek' ? '💤' : '💔';
            dayDiv.appendChild(statusIcon);
        }

        if (AppData.reflections?.[dayKey]?.answer) {
            const reflectionIcon = document.createElement('span');
            reflectionIcon.className = 'calendar-reflection-icon';
            reflectionIcon.textContent = '💭';
            dayDiv.appendChild(reflectionIcon);
        }
        
        calendarGrid.appendChild(dayDiv);
    }
}

// ======================
// STATISTICS
// ======================
function initStats() {
    updateStats();
}

function updateStats() {
    updateStepsChart();
    updateMoodChart();
    updateStudyChart();
    updateWorkoutsStats();
}

function updateStepsChart() {
    const stepsStatsCard = document.getElementById('stepsStatsCard');
    
    // Hide if steps are disabled
    if (!AppData.settings.stepsEnabled) {
        if (stepsStatsCard) stepsStatsCard.style.display = 'none';
        return;
    }
    
    if (stepsStatsCard) stepsStatsCard.style.display = 'block';
    
    // Calculate TOTAL steps from entire challenge
    const totalSteps = Object.values(AppData.steps).reduce((sum, s) => sum + s, 0);
    const goal = AppData.settings.stepsGoal;
    let percent = Math.min((totalSteps / goal) * 100, 100);
    percent = Math.max(0, percent);
    
    const circle = document.getElementById('stepsCircle');
    const circumference = 2 * Math.PI * 80;
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    
    // Display one decimal
    document.getElementById('stepsPercent').textContent = percent.toFixed(1) + '%';
    document.getElementById('stepsLabel').textContent = `${totalSteps.toLocaleString()}/${goal.toLocaleString()}`;
}

function updateMoodChart() {
    const moodCounts = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
    
    Object.values(AppData.mood).forEach(mood => {
        if (moodCounts[mood] !== undefined) {
            moodCounts[mood]++;
        }
    });
    
    const maxCount = Math.max(...Object.values(moodCounts), 1);
    const barItems = document.querySelectorAll('.bar-item');
    
    Object.keys(moodCounts).forEach((mood, index) => {
        const count = moodCounts[mood];
    let percent = (count / maxCount) * 100;
    percent = Math.max(0, Math.min(percent, 100));
        
        if (barItems[index]) {
            const barFill = barItems[index].querySelector('.bar-fill');
            const barValue = barItems[index].querySelector('.bar-value');
            // Use one decimal for bar height to reflect small differences
            barFill.style.height = percent.toFixed(1) + '%';
            barValue.textContent = count;
        }
    });
}

function updateStudyChart() {
    const studyStatsCard = document.getElementById('studyStatsCard');
    
    // Hide if study is disabled
    if (!AppData.settings.studyEnabled) {
        if (studyStatsCard) studyStatsCard.style.display = 'none';
        return;
    }
    
    if (studyStatsCard) studyStatsCard.style.display = 'block';
    
    // Calculate total hours and goal
    const totalHours = Object.values(AppData.studyHours).reduce((sum, h) => sum + h, 0);
    const goal = AppData.settings.studyGoal;
    let percent = Math.min((totalHours / goal) * 100, 100);
    percent = Math.max(0, percent);
    
    const circle = document.getElementById('studyCircle');
    if (!circle) return;
    
    const circumference = 2 * Math.PI * 80;
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    
    // Display one decimal
    document.getElementById('studyPercent').textContent = percent.toFixed(1) + '%';
    document.getElementById('studyLabel').textContent = `${totalHours.toFixed(1)}/${goal}h`;
}

function updateWorkoutsStats() {
    const workoutsStatsCard = document.getElementById('workoutsStatsCard');
    const circle = document.getElementById('workoutsCircle');
    const percentEl = document.getElementById('workoutsPercent');
    const labelEl = document.getElementById('workoutsLabel');
    
    if (!workoutsStatsCard || !circle || !percentEl || !labelEl) return;
    
    // Show/hide card based on whether workouts are enabled
    if (!AppData.settings.workoutsEnabled) {
        workoutsStatsCard.style.display = 'none';
        return;
    }
    
    workoutsStatsCard.style.display = 'block';
    
    // Calculate total completed workouts during challenge
    if (!AppData.completedWorkouts) {
        AppData.completedWorkouts = {};
    }

    const totalCompletions = countCompletedWorkoutsMap(AppData.completedWorkouts);
    
    // Calculate percentage based on goal
    const goal = AppData.settings.workoutsGoal || 150;
    
    let percent = 0;
    if (goal > 0) {
        percent = Math.min((totalCompletions / goal) * 100, 100);
    }
    percent = Math.max(0, percent);
    
    const circumference = 2 * Math.PI * 80;
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    
    percentEl.textContent = percent.toFixed(1) + '%';
    labelEl.textContent = `${totalCompletions}/${goal}`;
}

// ======================
// GALLERY
// ======================
function initGallery() {
    const uploadBtn = document.getElementById('uploadBtn');
    const photoInput = document.getElementById('photoInput');
    
    uploadBtn.addEventListener('click', () => {
        playClickSound(); // Dźwięk kliknięcia
        photoInput.click();
    });
    
    photoInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                AppData.gallery.push(e.target.result);
                saveData();
                renderGallery();
            };
            reader.readAsDataURL(file);
        });
    });
    
    renderGallery();
}

function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = '';
    
    if (!Array.isArray(AppData.gallery)) return;
    AppData.gallery.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${photo}" alt="Gallery photo ${index + 1}">
            <button class="delete-photo-btn" data-index="${index}">🗑️</button>
        `;
        
        const img = item.querySelector('img');
        img.addEventListener('click', () => {
            openLightbox(photo, index);
        });
        
        const deleteBtn = item.querySelector('.delete-photo-btn');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            playClickSound(); // Dźwięk kliknięcia
            deletePhoto(index);
        });
        
        galleryGrid.appendChild(item);
    });
}

function deletePhoto(index) {
    if (confirm('🗑️ Czy na pewno chcesz usunąć to zdjęcie?')) {
        AppData.gallery.splice(index, 1);
        saveData();
        renderGallery();
        showNotification('🗑️ Zdjęcie zostało usunięte', 'success');
    }
}

function openLightbox(photo, index) {
    // Create lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">✕</button>
            <button class="lightbox-prev">◀</button>
            <img src="${photo}" alt="Full size photo">
            <button class="lightbox-next">▶</button>
            <div class="lightbox-counter">${index + 1} / ${AppData.gallery.length}</div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Close button
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', () => {
        closeLightbox(lightbox);
    });
    
    // Click outside to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox(lightbox);
        }
    });
    
    // Navigation
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    const img = lightbox.querySelector('img');
    const counter = lightbox.querySelector('.lightbox-counter');
    
    let currentIndex = index;
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + AppData.gallery.length) % AppData.gallery.length;
        img.src = AppData.gallery[currentIndex];
        counter.textContent = `${currentIndex + 1} / ${AppData.gallery.length}`;
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % AppData.gallery.length;
        img.src = AppData.gallery[currentIndex];
        counter.textContent = `${currentIndex + 1} / ${AppData.gallery.length}`;
    });
    
    // Keyboard navigation
    const handleKeyboard = (e) => {
        if (e.key === 'Escape') {
            closeLightbox(lightbox);
        } else if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    };
    
    document.addEventListener('keydown', handleKeyboard);
    lightbox.dataset.keyboardHandler = 'attached';
    
    // Animate in
    setTimeout(() => {
        lightbox.classList.add('active');
    }, 10);
}

function closeLightbox(lightbox) {
    lightbox.classList.remove('active');
    setTimeout(() => {
        document.body.removeChild(lightbox);
    }, 300);
}

// ======================
// BADGES
// ======================
function initBadges() {
    updateBadgesDisplay();
}

function checkBadges() {
    let newlyUnlocked = [];
    
    // Helper: zdobądź odznakę
    const unlockBadge = (badgeId) => {
        if (!AppData.badges[badgeId]) {
            AppData.badges[badgeId] = { unlocked: true, isNew: true };
            newlyUnlocked.push(badgeId);
            return true;
        } else if (AppData.badges[badgeId] && !AppData.badges[badgeId].unlocked) {
            AppData.badges[badgeId] = { unlocked: true, isNew: true };
            newlyUnlocked.push(badgeId);
            return true;
        }
        return false;
    };
    
    // === PODSTAWOWE ===
    // Pierwsze kroki
    if (Object.keys(AppData.steps).length > 0) {
        unlockBadge('first-steps');
    }
    
    // Pierwsze wrażenie
    if (Object.keys(AppData.mood).length > 0) {
        unlockBadge('first-mood');
    }
    
    // Pierwsza chwila
    if (AppData.gallery.length > 0) {
        unlockBadge('first-photo');
    }
    
    // === STREAK ===
    if (AppData.streak >= 3) {
        unlockBadge('3-day-streak');
    }
    if (AppData.streak >= 7) {
        unlockBadge('7-day-streak');
    }
    if (AppData.streak >= 14) {
        unlockBadge('14-day-streak');
    }
    if (AppData.streak >= 21) {
        unlockBadge('no-days-off');
    }
    if (AppData.streak >= 30) {
        unlockBadge('30-day-streak');
    }
    if (AppData.streak >= 50) {
        unlockBadge('goku-ultra'); // Dragon Ball reference!
    }
    if (AppData.streak >= 60) {
        unlockBadge('plus-ultra'); // My Hero Academia reference!
    }
    
    // === ZADANIA ===
    const hasCompletedTask = Object.values(AppData.completedTasks).some(tasks => {
        const count = Array.isArray(tasks) ? tasks.length : Number(tasks) || 0;
        return count > 0;
    });
    if (hasCompletedTask) {
        unlockBadge('first-task');
    }

    // Policz dni, w których ukończono wszystkie zadania (3 lub więcej)
    const completedAllCount = Object.values(AppData.completedTasks).filter(tasks => {
        // Wspieraj zarówno nowy format (tablica) jak i stary (liczba)
        const count = Array.isArray(tasks) ? tasks.length : tasks;
        return count >= 3;
    }).length;
    if (completedAllCount >= 1) {
        unlockBadge('task-beginner');
    }
    if (completedAllCount >= 10) {
        unlockBadge('task-master');
    }
    if (completedAllCount >= 30) {
        unlockBadge('task-legend');
    }

    // === NAUKA ===
    const studySessions = Object.values(AppData.studyHours).filter(hours => Number(hours) > 0);
    const totalStudyHours = studySessions.reduce((sum, hours) => sum + Number(hours), 0);
    if (studySessions.length >= 1) {
        unlockBadge('study-starter');
    }
    if (totalStudyHours >= 10) {
        unlockBadge('study-scholar');
    }
    
    // === NASTRÓJ ===
    const moodDays = Object.keys(AppData.mood).length;
    if (moodDays >= 5) {
        unlockBadge('mood-tracker');
    }
    if (moodDays >= 30) {
        unlockBadge('mood-master');
    }
    
    // Promyk słońca - 5 dni z najlepszym nastrojem
    const happyDays = Object.values(AppData.mood).filter(m => m === 5).length;
    if (happyDays >= 5) {
        unlockBadge('always-happy');
    }
    
    // === KROKI ===
    // Sprawdź maksymalne kroki w jednym dniu
    const maxDailySteps = Math.max(...Object.values(AppData.steps), 0);
    if (maxDailySteps >= 5000) {
        unlockBadge('steps-5k');
    }
    if (maxDailySteps >= 10000) {
        unlockBadge('steps-10k');
    }
    
    // Suma wszystkich kroków
    const totalSteps = Object.values(AppData.steps).reduce((sum, s) => sum + s, 0);
    if (totalSteps >= 50000) {
        unlockBadge('steps-50k');
    }
    if (totalSteps >= 100000) {
        unlockBadge('steps-100k');
    }
    if (totalSteps >= 250000) {
        unlockBadge('steps-250k');
    }
    if (totalSteps >= 500000) {
        unlockBadge('rocky-balboa'); // Rocky reference!
    }
    
    // === GALERIA ===
    if (AppData.gallery.length >= 10) {
        unlockBadge('photographer');
    }
    if (AppData.gallery.length >= 25) {
        unlockBadge('social-butterfly');
    }
    if (AppData.gallery.length >= 50) {
        unlockBadge('memory-keeper');
    }
    
    // === TRENINGI ===
    const totalWorkouts = countCompletedWorkoutsMap(AppData.completedWorkouts);
    
    if (totalWorkouts >= 1) {
        unlockBadge('workout-beginner');
    }
    if (totalWorkouts >= 10) {
        unlockBadge('workout-warrior');
    }
    if (totalWorkouts >= 30) {
        unlockBadge('workout-beast');
    }
    if (totalWorkouts >= 75) {
        unlockBadge('workout-legend');
    }
    if (totalWorkouts >= 100) {
        unlockBadge('one-punch'); // One Punch Man reference!
    }
    
    // Sprawdź 7-dniową passę treningową
    const today = new Date();
    let consecutiveWorkouts = 0;
    for (let i = 0; i < 7; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(checkDate.getDate() - i);
        const dateStr = checkDate.toISOString().split('T')[0];
        const workoutsOnDay = AppData.completedWorkouts[dateStr];
        if (workoutsOnDay && (Array.isArray(workoutsOnDay) ? workoutsOnDay.length > 0 : workoutsOnDay > 0)) {
            consecutiveWorkouts++;
        } else {
            break;
        }
    }
    if (consecutiveWorkouts >= 7) {
        unlockBadge('iron-dedication');
    }
    
    // === MOTYWY ===
    // Śledzenie użytych motywów
    if (!AppData.settings.themesUsed) {
        AppData.settings.themesUsed = [AppData.settings.theme];
    }
    
    if (AppData.settings.theme === 'transformers') {
        unlockBadge('optimus-prime');
    }
    if (AppData.settings.theme === 'yellow') {
        unlockBadge('bumblebee');
    }
    if (AppData.settings.theme === 'black') {
        unlockBadge('dark-knight');
    }
    
    const uniqueThemes = new Set(AppData.settings.themesUsed || []);
    if (uniqueThemes.size >= 5) {
        unlockBadge('rainbow-master');
    }
    if (uniqueThemes.size >= 21) { // Wszystkie motywy
        unlockBadge('theme-explorer');
    }
    
    // === FUN ODZNAKI ===
    // Perfekcjonista - 10 dni z wszystkimi zadaniami (min 3)
    const perfectDays = Object.values(AppData.completedTasks).filter(tasks => {
        const count = Array.isArray(tasks) ? tasks.length : tasks;
        return count >= (AppData.tasks ? AppData.tasks.length : 0);
    }).length;
    if (perfectDays >= 10) {
        unlockBadge('perfectionist');
    }
    if (perfectDays >= 50) {
        unlockBadge('discipline-master');
    }
    
    // Król powrotu - odzyskaj streak po jego zerwaniu
    if (AppData.longestStreak > 0 && AppData.streak >= 3 && AppData.streak !== AppData.longestStreak) {
        // Sprawdź czy był restart (streak był na 0 lub 1)
        unlockBadge('comeback-king');
    }
    
    // Wojownik weekendu - trening w sobotę i niedzielę
    const todayDate = new Date();
    const dayOfWeek = todayDate.getDay(); // 0 = Niedziela, 6 = Sobota
    
    // Sprawdź ostatni weekend
    let saturdayDate = new Date(todayDate);
    let sundayDate = new Date(todayDate);
    
    if (dayOfWeek === 0) { // Niedziela
        saturdayDate.setDate(todayDate.getDate() - 1);
    } else if (dayOfWeek === 6) { // Sobota
        sundayDate.setDate(todayDate.getDate() + 1);
    } else {
        // Znajdź poprzedni weekend
        const daysToSaturday = (dayOfWeek + 1) % 7;
        saturdayDate.setDate(todayDate.getDate() - daysToSaturday);
        sundayDate.setDate(saturdayDate.getDate() + 1);
    }
    
    const saturdayStr = saturdayDate.toISOString().split('T')[0];
    const sundayStr = sundayDate.toISOString().split('T')[0];
    
    const saturdayWorkouts = AppData.completedWorkouts[saturdayStr];
    const sundayWorkouts = AppData.completedWorkouts[sundayStr];
    
    if (saturdayWorkouts && sundayWorkouts) {
        const satCount = Array.isArray(saturdayWorkouts) ? saturdayWorkouts.length : saturdayWorkouts;
        const sunCount = Array.isArray(sundayWorkouts) ? sundayWorkouts.length : sundayWorkouts;
        if (satCount > 0 && sunCount > 0) {
            unlockBadge('weekend-warrior');
        }
    }
    
    // Megatron - czerwony lub fioletowy motyw
    if (AppData.settings.theme === 'red' || AppData.settings.theme === 'purple') {
        unlockBadge('megatron');
    }
    
    // Emocjonalna huśtawka - wszystkie 5 typów nastroju
    const uniqueMoods = new Set(Object.values(AppData.mood));
    if (uniqueMoods.size >= 5) {
        unlockBadge('mood-swinger');
    }
    
    // Mistrz konsystencji - 14 dni z rzędu z jakimiś danymi
    let consecutiveDays = 0;
    const todayForConsistency = new Date();
    for (let i = 0; i < 14; i++) {
        const checkDate = new Date(todayForConsistency);
        checkDate.setDate(checkDate.getDate() - i);
        const dateStr = checkDate.toISOString().split('T')[0];
        
        // Sprawdź czy są jakieś dane tego dnia
        const hasSteps = AppData.steps[dateStr] && AppData.steps[dateStr] > 0;
        const hasMood = AppData.mood[dateStr];
        const hasTasks = AppData.completedTasks[dateStr] && AppData.completedTasks[dateStr].length > 0;
        const hasWorkouts = AppData.completedWorkouts[dateStr] && 
            (Array.isArray(AppData.completedWorkouts[dateStr]) ? AppData.completedWorkouts[dateStr].length > 0 : AppData.completedWorkouts[dateStr] > 0);
        
        if (hasSteps || hasMood || hasTasks || hasWorkouts) {
            consecutiveDays++;
        } else {
            break;
        }
    }
    if (consecutiveDays >= 14) {
        unlockBadge('consistency-champion');
    }
    
    // Podróżnik w czasie - zapisuj dane o różnych porach
    if (!AppData.activityTimes) {
        AppData.activityTimes = [];
    }
    const currentTime = new Date().getHours();
    if (!AppData.activityTimes.includes(currentTime)) {
        AppData.activityTimes.push(currentTime);
    }
    // Sprawdź czy są dane z różnych pór dnia (rano, południe, wieczór, noc)
    const morning = AppData.activityTimes.some(h => h >= 6 && h < 12);
    const afternoon = AppData.activityTimes.some(h => h >= 12 && h < 18);
    const evening = AppData.activityTimes.some(h => h >= 18 && h < 24);
    const night = AppData.activityTimes.some(h => h >= 0 && h < 6);
    
    if ([morning, afternoon, evening, night].filter(Boolean).length >= 3) {
        unlockBadge('time-traveler');
    }
    
    const challengeName = typeof AppData.settings.challengeName === 'string'
        ? AppData.settings.challengeName.trim()
        : '';
    if (challengeName && challengeName !== 'Kawaii Quest') {
        unlockBadge('challenge-named');
    }
    
    // Kolekcjoner legend - 50 odznak
    const unlockedBadgesCount = Object.values(AppData.badges).filter(b => b && b.unlocked).length;
    if (unlockedBadgesCount >= 50) {
        unlockBadge('legend-collector');
    }
    
    // === WYZWANIE ===
    if (AppData.challenge.currentDay >= 15) {
        unlockBadge('15-day-warrior');
    }
    if (AppData.challenge.currentDay >= 30) {
        unlockBadge('30-day-warrior');
    }
    if (AppData.challenge.currentDay >= 50) {
        unlockBadge('50-day-champion');
    }
    if (AppData.challenge.currentDay >= 75) {
        unlockBadge('75-day-legend');
    }
    
    // === KLUCZOWE FUNKCJE APLIKACJI ===
    // Zasady zaakceptowane - świadomy start wyzwania
    if (AppData.settings.rulesAccepted) {
        unlockBadge('rules-master');
    }
    
    // Eksport raportu postępów
    if (AppData.settings.hasExportedReport) {
        unlockBadge('report-exporter');
    }
    
    // Pokaż powiadomienie o nowych odznakach
    if (newlyUnlocked.length > 0) {
        showBadgeNotification(newlyUnlocked);
    }
    
    updateBadgesDisplay();
}

function showBadgeNotification(badgeIds) {
    // Prosta notyfikacja
    const language = window.AppI18N && typeof window.AppI18N.getCurrentLanguage === 'function'
        ? window.AppI18N.getCurrentLanguage()
        : (AppData.settings.language || 'pl');

    const badgeNames = badgeIds.map(id => {
        if (window.AppI18N && typeof window.AppI18N.badgeTitle === 'function') {
            return window.AppI18N.badgeTitle(id, language);
        }

        const card = document.querySelector(`[data-badge="${id}"]`);
        return card ? card.querySelector('h3').textContent : id;
    });
    
    const headline = window.AppI18N && typeof window.AppI18N.translateExact === 'function'
        ? window.AppI18N.translateExact('🎉 Nowa odznaka!', language)
        : '🎉 Nowa odznaka!';

    alert(`${headline}\n\n${badgeNames.join('\n')}`);
}

function updateBadgesDisplay() {
    const badgeCards = document.querySelectorAll('.badge-card');
    badgeCards.forEach(card => {
        const badgeId = card.dataset.badge;
        const badge = AppData.badges[badgeId];
        
        // Usuń wszystkie klasy
        card.classList.remove('locked', 'unlocked', 'newly-unlocked');
        
        if (badge && badge.unlocked) {
            if (badge.isNew) {
                card.classList.add('newly-unlocked');
            } else {
                card.classList.add('unlocked');
            }
        } else {
            card.classList.add('locked');
        }
    });
}

// Oznacz odznaki jako obejrzane (usuń efekt glow) po wejściu w widok
function markBadgesAsViewed() {
    Object.keys(AppData.badges).forEach(badgeId => {
        if (AppData.badges[badgeId] && AppData.badges[badgeId].isNew) {
            AppData.badges[badgeId].isNew = false;
        }
    });
    saveData();
    updateBadgesDisplay();
}

// ======================
// SETTINGS
// ======================
function initSettings() {
    const languageSelect = document.getElementById('languageSelect');

    if (languageSelect) {
        if (AppData.settings.language === undefined) {
            AppData.settings.language = 'pl';
        }
        languageSelect.value = AppData.settings.language;
        languageSelect.addEventListener('change', (e) => {
            AppData.settings.language = e.target.value;
            if (window.AppI18N && typeof window.AppI18N.setLanguage === 'function') {
                window.AppI18N.setLanguage(e.target.value, false);
            }
            saveData();
            updateAllDisplays();
        });
    }

    // Theme select
    const themeSelect = document.getElementById('themeSelect');
    themeSelect.value = AppData.settings.theme;
    themeSelect.addEventListener('change', (e) => {
        setTheme(e.target.value);
        AppData.settings.theme = e.target.value;
        
        // Śledź użyte motywy dla odznak
        if (!AppData.settings.themesUsed) {
            AppData.settings.themesUsed = [];
        }
        if (!AppData.settings.themesUsed.includes(e.target.value)) {
            AppData.settings.themesUsed.push(e.target.value);
        }
        
        saveData();
        checkBadges(); // Sprawdź odznaki motywów
        
        // Zmień cytaty gdy zmienisz motyw
        const quoteEl = document.getElementById('motivationalQuote');
        if (quoteEl) {
            const quotes = e.target.value === 'transformers' ? transformersQuotes : motivationalQuotes;
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            quoteEl.textContent = `"${randomQuote}"`;
        }
    });
    
    // Font select
    const fontSelect = document.getElementById('fontSelect');
    fontSelect.value = AppData.settings.font;
    fontSelect.addEventListener('change', (e) => {
        setFont(e.target.value);
        AppData.settings.font = e.target.value;
        saveData();
    });
    
    // Challenge name
    const challengeNameInput = document.getElementById('challengeName');
    if (challengeNameInput) {
        challengeNameInput.value = getChallengeDisplayName();
        challengeNameInput.addEventListener('input', (e) => {
            const nextName = (e.target.value || '').trim();
            AppData.settings.challengeName = nextName || 'Kawaii Quest';
            e.target.value = AppData.settings.challengeName;
            saveData();
            applyChallengeNameToUI();
            updateAllDisplays();
        });
    }

    // Challenge length
    const challengeLength = document.getElementById('challengeLength');
    challengeLength.value = AppData.settings.challengeLength;
    challengeLength.addEventListener('change', (e) => {
        AppData.settings.challengeLength = parseInt(e.target.value);
        AppData.challenge.totalDays = parseInt(e.target.value);
        saveData();
        updateAllDisplays();
    });
    
    // Steps toggle
    const stepsToggle = document.getElementById('stepsToggle');
    const stepsCard = document.getElementById('stepsCard');
    const stepsGoalSetting = document.getElementById('stepsGoalSetting');
    if (AppData.settings.stepsEnabled === undefined) {
        AppData.settings.stepsEnabled = true;
    }
    stepsToggle.checked = AppData.settings.stepsEnabled;
    if (stepsCard) stepsCard.style.display = AppData.settings.stepsEnabled ? 'block' : 'none';
    if (stepsGoalSetting) stepsGoalSetting.style.display = AppData.settings.stepsEnabled ? 'block' : 'none';
    stepsToggle.addEventListener('change', (e) => {
        AppData.settings.stepsEnabled = e.target.checked;
        if (stepsCard) stepsCard.style.display = e.target.checked ? 'block' : 'none';
        if (stepsGoalSetting) stepsGoalSetting.style.display = e.target.checked ? 'block' : 'none';
        saveData();
        updateStats();
    });
    
    // Steps goal
    const stepsGoal = document.getElementById('stepsGoal');
    stepsGoal.value = AppData.settings.stepsGoal;
    stepsGoal.addEventListener('change', (e) => {
        AppData.settings.stepsGoal = parseInt(e.target.value);
        saveData();
        updateStats();
    });
    
    // Study toggle
    const studyToggle = document.getElementById('studyToggle');
    const studyCard = document.getElementById('studyCard');
    const studyGoalSetting = document.getElementById('studyGoalSetting');
    if (AppData.settings.studyEnabled === undefined) {
        AppData.settings.studyEnabled = true;
    }
    studyToggle.checked = AppData.settings.studyEnabled;
    if (studyCard) studyCard.style.display = AppData.settings.studyEnabled ? 'block' : 'none';
    if (studyGoalSetting) studyGoalSetting.style.display = AppData.settings.studyEnabled ? 'block' : 'none';
    studyToggle.addEventListener('change', (e) => {
        AppData.settings.studyEnabled = e.target.checked;
        if (studyCard) studyCard.style.display = e.target.checked ? 'block' : 'none';
        if (studyGoalSetting) studyGoalSetting.style.display = e.target.checked ? 'block' : 'none';
        saveData();
        updateStats();
    });
    
    // Study goal
    const studyGoal = document.getElementById('studyGoal');
    studyGoal.value = AppData.settings.studyGoal;
    studyGoal.addEventListener('change', (e) => {
        AppData.settings.studyGoal = parseInt(e.target.value);
        saveData();
        updateStats();
    });
    
    // Workouts toggle
    const workoutsToggleMain = document.getElementById('workoutsToggleMain');
    const workoutsSettingsSection = document.getElementById('workoutsSettingsSection');
    const workoutsGoalSetting = document.getElementById('workoutsGoalSetting');
    if (AppData.settings.workoutsEnabled === undefined) {
        AppData.settings.workoutsEnabled = false;
    }
    if (workoutsToggleMain) {
        workoutsToggleMain.checked = AppData.settings.workoutsEnabled;
        if (workoutsSettingsSection) workoutsSettingsSection.style.display = AppData.settings.workoutsEnabled ? 'block' : 'none';
        if (workoutsGoalSetting) workoutsGoalSetting.style.display = AppData.settings.workoutsEnabled ? 'block' : 'none';
        workoutsToggleMain.addEventListener('change', (e) => {
            AppData.settings.workoutsEnabled = e.target.checked;
            if (workoutsSettingsSection) workoutsSettingsSection.style.display = e.target.checked ? 'block' : 'none';
            if (workoutsGoalSetting) workoutsGoalSetting.style.display = e.target.checked ? 'block' : 'none';
            saveData();
            updateWorkoutsDisplay();
            updateStats();
        });
    }
    
    // Workouts goal
    const workoutsGoal = document.getElementById('workoutsGoal');
    if (workoutsGoal) {
        if (AppData.settings.workoutsGoal === undefined) {
            AppData.settings.workoutsGoal = 150;
        }
        workoutsGoal.value = AppData.settings.workoutsGoal;
        workoutsGoal.addEventListener('change', (e) => {
            AppData.settings.workoutsGoal = parseInt(e.target.value);
            saveData();
            updateStats();
        });
    }
    
    // Rest day (multiple selection supported)
    const restDayCheckBoxes = Array.from(document.querySelectorAll('.rest-day-checkbox'));
    const restDayNone = document.getElementById('restDayNone');
    const syncRestDaySelection = () => {
        const selected = new Set(getRestDays());
        restDayCheckBoxes.forEach(cb => {
            cb.checked = selected.has(cb.value);
        });
        if (restDayNone) {
            restDayNone.checked = selected.size === 0;
        }
    };

    if (restDayCheckBoxes.length > 0) {
        syncRestDaySelection();
        restDayCheckBoxes.forEach(cb => {
            cb.addEventListener('change', () => {
                const selected = restDayCheckBoxes.filter(box => box.checked).map(box => box.value);
                const previous = [...(AppData.settings.restDays || [])];
                AppData.settings.restDays = normalizeRestDayList(selected);
                AppData.settings.restDay = AppData.settings.restDays.length > 0 ? AppData.settings.restDays[0] : 'none';
                if (AppData.challenge?.startDate) {
                    AppData.challenge.restDaysEffectiveFrom = getTodayKey();
                    recordChallengeActivity('rest-day-change', {
                        dateKey: getTodayKey(),
                        summary: `Zmiana dni odpoczynkowych: ${JSON.stringify(AppData.settings.restDays || []) || 'brak'} (wcześniej: ${JSON.stringify(previous) || 'brak'})`
                    });
                }
                if (restDayNone) restDayNone.checked = selected.length === 0;
                saveData();
                updateAllDisplays();
            });
        });
    }

    if (restDayNone) {
        restDayNone.addEventListener('change', () => {
            if (restDayNone.checked) {
                const previous = [...(AppData.settings.restDays || [])];
                AppData.settings.restDays = [];
                AppData.settings.restDay = 'none';
                if (AppData.challenge?.startDate) {
                    AppData.challenge.restDaysEffectiveFrom = getTodayKey();
                    recordChallengeActivity('rest-day-change', {
                        dateKey: getTodayKey(),
                        summary: `Usunięcie dni odpoczynkowych (wcześniej: ${JSON.stringify(previous) || 'brak'})`
                    });
                }
                saveData();
                updateAllDisplays();
                syncRestDaySelection();
            }
        });
    }
    
    // Count rest days
    const countRestDays = document.getElementById('countRestDays');
    countRestDays.checked = AppData.settings.countRestDays;
    countRestDays.addEventListener('change', (e) => {
        AppData.settings.countRestDays = e.target.checked;
        saveData();
    });
    
    // Sound toggle
    const soundToggle = document.getElementById('soundToggle');
    soundToggle.checked = AppData.settings.soundEnabled;
    soundToggle.addEventListener('change', (e) => {
        AppData.settings.soundEnabled = e.target.checked;
        saveData();
        // Odtwórz dźwięk testowy jeśli włączono
        if (e.target.checked) {
            setTimeout(() => playClickSound(), 100);
        }
    });
    
    // Volume slider
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeValue = document.getElementById('volumeValue');
    volumeSlider.value = AppData.settings.volume;
    volumeValue.textContent = AppData.settings.volume + '%';
    
    let volumeTimeout = null;
    volumeSlider.addEventListener('input', (e) => {
        AppData.settings.volume = parseInt(e.target.value);
        volumeValue.textContent = e.target.value + '%';
        saveData();
        
        // Odtwórz dźwięk podglądu po zatrzymaniu przesuwania
        clearTimeout(volumeTimeout);
        volumeTimeout = setTimeout(() => {
            playClickSound();
        }, 150);
    });
    
    // Weekly tasks toggle
    const weeklyTasksToggle = document.getElementById('weeklyTasksToggle');
    const weeklyTasksConfig = document.getElementById('weeklyTasksConfig');
    
    // Initialize weeklyTasks if not exists
    if (!AppData.weeklyTasks) {
        AppData.weeklyTasks = {
            enabled: false,
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: []
        };
    }
    
    weeklyTasksToggle.checked = AppData.weeklyTasks.enabled || false;
    weeklyTasksConfig.style.display = AppData.weeklyTasks.enabled ? 'block' : 'none';
    
    weeklyTasksToggle.addEventListener('change', (e) => {
        AppData.weeklyTasks.enabled = e.target.checked;
        weeklyTasksConfig.style.display = e.target.checked ? 'block' : 'none';
        saveData();
        renderTasks(); // Odśwież zadania
        if (e.target.checked) {
            playSuccessSound();
            showNotification('✨ Zadania tygodniowe włączone! Ustaw zadania dla każdego dnia 🗓️', 'success');
        }
    });
    
    // Initialize weekly tasks editors
    const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    dayNames.forEach(day => {
        renderDayTasks(day);
        
        // Add task button
        const addBtn = document.querySelector(`.btn-add-day-task[data-day="${day}"]`);
        const input = document.getElementById(`${day}TaskInput`);
        
        if (addBtn && input) {
            addBtn.addEventListener('click', () => {
                const taskText = input.value.trim();
                if (taskText) {
                    playClickSound();
                    if (!AppData.weeklyTasks[day]) AppData.weeklyTasks[day] = [];
                    AppData.weeklyTasks[day].push(taskText);
                    input.value = '';
                    saveData();
                    renderDayTasks(day);
                    renderTasks(); // Odśwież główny widok zadań
                }
            });
            
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    addBtn.click();
                }
            });
        }
    });
    
    const resetChallengeDaysBtn = document.getElementById('resetChallengeDaysBtn');
    if (resetChallengeDaysBtn) {
        resetChallengeDaysBtn.addEventListener('click', async () => {
            playClickSound();
            if (!confirm('Rozpocząć nowe wyzwanie od dzisiaj? Zadania i ustawienia zostaną zachowane.')) return;

            archiveCurrentChallenge();
            AppData.challenge = {
                currentDay: 1,
                totalDays: AppData.settings.challengeLength || 75,
                completedDays: [],
                startDate: getTodayKey(),
                cycleStartedAt: Date.now()
            };
            AppData.completedTasks = {};
            AppData.steps = {};
            AppData.mood = {};
            AppData.studyHours = {};
            AppData.reflections = {};
            AppData.completedWorkouts = {};
            AppData.runLog = {};
            AppData.workoutFocus = {};
            AppData.gallery = [];
            AppData.activityTimes = [];
            AppData.streak = 0;
            AppData.longestStreak = 0;
            AppData.badges = {};
            saveData();
            updateAllDisplays();
            renderChallengeHistory();
            if (typeof window.flushPendingFirestoreSave === 'function') {
                await window.flushPendingFirestoreSave();
            }

            const startChallengeBtn = document.getElementById('startChallengeBtn');
            if (startChallengeBtn) startChallengeBtn.style.display = 'none';
            showNotification('🔄 Nowe wyzwanie rozpoczęte! Dzień 1 zaczyna się dzisiaj.', 'success');
        });
    }

    // Reset button
    const resetAllBtn = document.getElementById('resetAllBtn');
    if (resetAllBtn) {
        resetAllBtn.addEventListener('click', async () => {
            playClickSound(); // Dźwięk kliknięcia
            if (confirm('⚠️ Czy na pewno chcesz zresetować cały postęp? Ta akcja jest nieodwracalna!')) {
                if (confirm('🚨 Ostatnie ostrzeżenie! Wszystkie dane zostaną usunięte bezpowrotnie!')) {
                    try {
                        // Zapisz nowy stan zamiast zostawiać pusty localStorage.
                        // Pusty stan może zostać zastąpiony starym snapshotem z chmury.
                        const resetData = {
                            challenge: {
                                currentDay: 0,
                                totalDays: AppData.settings.challengeLength || 75,
                                completedDays: []
                            },
                            streak: 0,
                            longestStreak: 0,
                            steps: {},
                            mood: {},
                            studyHours: {},
                            completedTasks: {},
                            completedWorkouts: {},
                            runLog: {},
                            workoutFocus: {},
                            gallery: [],
                            badges: {},
                            tasks: AppData.tasks,
                            weeklyTasks: AppData.weeklyTasks,
                            weeklyWorkouts: AppData.weeklyWorkouts,
                            settings: AppData.settings,
                            lastModified: Date.now()
                        };

                        Object.keys(AppData).forEach(key => delete AppData[key]);
                        Object.assign(AppData, resetData);
                        saveData();
                        updateAllDisplays();
                        const startChallengeBtn = document.getElementById('startChallengeBtn');
                        if (startChallengeBtn) startChallengeBtn.style.display = 'block';
                        console.log('✅ Postęp wyzwania został zresetowany');
                    } catch (error) {
                        console.error('❌ Błąd podczas resetowania:', error);
                        alert('Wystąpił błąd podczas resetowania. Spróbuj ponownie.');
                    }
                }
            }
        });
    } else {
        console.error('❌ Przycisk resetAllBtn nie został znaleziony!');
    }
    
    // Delete account button
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', async () => {
            playClickSound();
            if (confirm('🚨 UWAGA! Czy na pewno chcesz USUNĄĆ KONTO i wszystkie dane?\n\nTa operacja:\n• Usuwa wszystkie dane z urządzenia\n• Usuwa wszystkie dane z chmury\n• Jest NIEODWRACALNA\n\nNie będzie możliwości odzyskania danych!')) {
                if (confirm('⚠️ OSTATNIE OSTRZEŻENIE!\n\nWpisz "USUŃ" w następnym oknie aby potwierdzić.')) {
                    const confirmation = prompt('Wpisz "USUŃ" aby potwierdzić usunięcie konta:');
                    if (confirmation === 'USUŃ') {
                        // Usuń dane z Firebase/chmury
                        if (window.deleteDataFromFirestore) {
                            try {
                                await window.deleteDataFromFirestore();
                                console.log('✅ Dane usunięte z chmury');
                            } catch (error) {
                                console.error('❌ Błąd usuwania z chmury:', error);
                            }
                        }
                        
                        // Wyloguj użytkownika jeśli jest zalogowany
                        if (window.logoutUser) {
                            try {
                                await window.logoutUser();
                                console.log('✅ Użytkownik wylogowany');
                            } catch (error) {
                                console.error('❌ Błąd wylogowania:', error);
                            }
                        }
                        
                        // Usuń wszystkie dane lokalne
                        localStorage.clear();
                        sessionStorage.clear();
                        
                        // Wyczyść cache aplikacji
                        if ('caches' in window) {
                            caches.keys().then(names => {
                                names.forEach(name => caches.delete(name));
                            });
                        }
                        
                        // Wymuś przeładowanie
                        alert('✅ Konto zostało usunięte. Aplikacja zostanie odświeżona.');
                        location.reload(true);
                    } else {
                        showNotification('❌ Anulowano usuwanie konta', 'error');
                    }
                }
            }
        });
    }
    
    // Export data button
    const exportDataBtn = document.getElementById('exportDataBtn');
    exportDataBtn.addEventListener('click', () => {
        playClickSound(); // Dźwięk kliknięcia
        AppData.settings.hasExportedReport = true;
        checkBadges();
        saveData();
        exportDataAsHTML();
    });
    
    // Refresh app button
    const refreshAppBtn = document.getElementById('refreshAppBtn');
    if (refreshAppBtn) {
        refreshAppBtn.addEventListener('click', () => {
            playClickSound();
            refreshAppBtn.disabled = true;
            refreshAppBtn.textContent = '⏳ Sprawdzam aktualizacje...';
            let finished = false;

            const finishRefresh = () => {
                if (finished) return;
                finished = true;
                showNotification('✅ Najnowsza wersja została pobrana. Odświeżam stronę...', 'success');
                setTimeout(() => {
                    window.location.reload();
                }, 350);
            };

            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistration('/Motivation-tracker-3/')
                    .then((registration) => {
                        if (!registration) {
                            finishRefresh();
                            return;
                        }

                        const onControllerChange = () => {
                            navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
                            finishRefresh();
                        };

                        navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);

                        registration.update()
                            .then(() => {
                                if (registration.waiting) {
                                    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                                } else if (!registration.installing) {
                                    setTimeout(() => {
                                        navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
                                        finishRefresh();
                                    }, 500);
                                }
                            })
                            .catch((error) => {
                                console.warn('Błąd podczas aktualizacji Service Workera:', error);
                                navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
                                finishRefresh();
                            });
                    })
                    .catch((error) => {
                        console.warn('Nie udało się pobrać rejestracji Service Workera:', error);
                        finishRefresh();
                    });
            } else {
                finishRefresh();
            }
        });
    }
    
    // Render rules in settings
    renderRulesSettings();
    renderChallengeHistory();

    // Workouts init
    initWorkouts();
}

function renderDayTasks(day) {
    const tasksList = document.getElementById(`${day}TasksList`);
    if (!tasksList) return;
    
    tasksList.innerHTML = '';
    
    const tasks = AppData.weeklyTasks[day] || [];
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.className = 'day-task-item';
        taskItem.innerHTML = `
            <span class="day-task-text">${task}</span>
            <button class="btn-remove-day-task" data-day="${day}" data-index="${index}">🗑️</button>
        `;
        
        const removeBtn = taskItem.querySelector('.btn-remove-day-task');
        removeBtn.addEventListener('click', () => {
            playClickSound();
            AppData.weeklyTasks[day].splice(index, 1);
            saveData();
            renderDayTasks(day);
            renderTasks(); // Odśwież główny widok zadań
        });
        
        tasksList.appendChild(taskItem);
    });
}

function renderChallengeHistory() {
    const list = document.getElementById('challengeHistoryList');
    if (!list) return;

    list.replaceChildren();
    const history = Array.isArray(AppData.challengeHistory) ? AppData.challengeHistory : [];
    if (history.length === 0) {
        const empty = document.createElement('p');
        empty.textContent = translateAppText('Nie masz jeszcze zapisanych wcześniejszych wyzwań.');
        list.appendChild(empty);
        return;
    }

    history.forEach((challenge) => {
        const item = document.createElement('article');
        item.className = 'challenge-history-item';
        const title = document.createElement('h3');
        title.textContent = challenge.name || translateAppText('Wyzwanie');
        const dates = document.createElement('p');
        dates.textContent = `${challenge.startDate} - ${challenge.endDate}`;
        const stats = document.createElement('p');
        const reflectionCount = Object.keys(challenge.reflections || {}).length;
        stats.textContent = `${(challenge.completedDays || []).length}/${challenge.totalDays || 75} ${translateAppText('dni')} · ${translateAppText('Najlepszy streak')}: ${challenge.bestStreak || 0} · ${translateAppText('Refleksje')}: ${reflectionCount}`;
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'btn-danger challenge-history-delete';
        deleteButton.textContent = translateAppText('Usuń z archiwum');
        deleteButton.addEventListener('click', () => {
            if (!confirm(translateAppText('Usunąć to wyzwanie z archiwum?'))) return;
            AppData.challengeHistory = AppData.challengeHistory.filter(entry => entry.id !== challenge.id);
            saveData();
            renderChallengeHistory();
        });
        item.append(title, dates, stats, deleteButton);
        list.appendChild(item);
    });
}

function initSyncUI() {
    const lastSyncEl = document.getElementById('lastSyncStatus');
    const loginStatusEl = document.getElementById('syncLoginStatus');
    const userIDEl = document.getElementById('syncUserID');
    const realtimeStatusEl = document.getElementById('syncRealtimeStatus');
    const btnSyncNow = document.getElementById('btnSyncNow');
    const btnForcePull = document.getElementById('btnForcePull');
    const btnForcePush = document.getElementById('btnForcePush');

    function updateLastSync(ts) {
        if (!lastSyncEl) return;
        if (!ts) {
            lastSyncEl.textContent = '—';
            return;
        }
        const d = new Date(ts);
        lastSyncEl.textContent = d.toLocaleString();
    }

    function updateSyncStatus() {
        // Check if user is logged in (via firebase-sync currentUser)
        // We'll expose currentUser via window for diagnostics
        const isLoggedIn = window.firebaseCurrentUser !== undefined && window.firebaseCurrentUser !== null;
        
        if (loginStatusEl) {
            loginStatusEl.textContent = isLoggedIn ? '✅ Zalogowany' : '❌ Niezalogowany';
            loginStatusEl.style.color = isLoggedIn ? 'green' : 'red';
        }
        
        if (userIDEl) {
            userIDEl.textContent = isLoggedIn && window.firebaseCurrentUser ? window.firebaseCurrentUser.uid : '—';
        }
        
        if (realtimeStatusEl) {
            const hasRealtimeSync = window.firebaseRealtimeSyncActive === true;
            realtimeStatusEl.textContent = hasRealtimeSync ? '✅ Aktywny' : (isLoggedIn ? '⚠️ Nieaktywny' : '—');
            realtimeStatusEl.style.color = hasRealtimeSync ? 'green' : 'orange';
        }
        
        // Show error diagnostics
        const errorEl = document.getElementById('syncErrorStatus');
        if (errorEl) {
            if (window.firebaseLastError) {
                errorEl.textContent = window.firebaseLastError;
                errorEl.style.color = 'red';
                errorEl.style.fontWeight = 'bold';
            } else {
                errorEl.textContent = '✅ Brak błędów';
                errorEl.style.color = 'green';
            }
        }
        
        // Show last read/write attempts
        const lastReadEl = document.getElementById('syncLastRead');
        const lastWriteEl = document.getElementById('syncLastWrite');
        if (lastReadEl && window.firebaseLastReadAttempt) {
            lastReadEl.textContent = new Date(window.firebaseLastReadAttempt).toLocaleTimeString();
        }
        if (lastWriteEl && window.firebaseLastWriteAttempt) {
            lastWriteEl.textContent = new Date(window.firebaseLastWriteAttempt).toLocaleTimeString();
        }
    }

    // Try to read lastModified from AppData
    try {
        if (AppData && AppData.lastModified) updateLastSync(AppData.lastModified);
    } catch (e) {}

    // Update status on init and periodically
    updateSyncStatus();
    setInterval(updateSyncStatus, 10000);

    if (btnSyncNow) btnSyncNow.addEventListener('click', async () => {
        if (typeof window.syncNow === 'function') {
            await window.syncNow();
            if (AppData && AppData.lastModified) updateLastSync(AppData.lastModified);
            updateSyncStatus();
            showNotification && showNotification('🔄 Synchronizacja zakończona', 'success');
        } else {
            showNotification && showNotification('⚠️ Funkcja sync nie jest dostępna', 'warning');
        }
    });

    if (btnForcePull) btnForcePull.addEventListener('click', async () => {
        if (typeof window.forcePull === 'function') {
            await window.forcePull();
            if (AppData && AppData.lastModified) updateLastSync(AppData.lastModified);
            updateSyncStatus();
            showNotification && showNotification('⬇️ Pobieranie z chmury zakończone', 'success');
        }
    });

    if (btnForcePush) btnForcePush.addEventListener('click', async () => {
        if (typeof window.forcePush === 'function') {
            await window.forcePush();
            if (AppData && AppData.lastModified) updateLastSync(AppData.lastModified);
            updateSyncStatus();
            showNotification && showNotification('⬆️ Wypchnięto lokalne dane', 'success');
        }
    });
}

function applySettings() {
    setTheme(AppData.settings.theme);
    setFont(AppData.settings.font);
    AppData.challenge.totalDays = AppData.settings.challengeLength;
    AppData.settings.challengeName = AppData.settings.challengeName || 'Kawaii Quest';
    applyChallengeNameToUI();

    if (window.AppI18N && typeof window.AppI18N.apply === 'function') {
        window.AppI18N.apply(AppData.settings.language || 'pl');
    }
}

function setFont(fontFamily) {
    document.documentElement.style.setProperty('--font-family', fontFamily);
}

// ======================
// SOUND SYSTEM
// ======================
// Tworzenie dźwięków przy użyciu Web Audio API
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext = null;

function initAudioContext() {
    if (!audioContext) {
        audioContext = new AudioContext();
    }
    return audioContext;
}

function playClickSound() {
    if (!AppData.settings.soundEnabled) return;
    
    const ctx = initAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Ustawienia dźwięku
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    // Głośność
    const volume = AppData.settings.volume / 100;
    gainNode.gain.setValueAtTime(volume * 0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
}

function playSuccessSound() {
    if (!AppData.settings.soundEnabled) return;
    
    const ctx = initAudioContext();
    const volume = AppData.settings.volume / 100;
    
    // Odtwórz 3 nuty (akord sukcesu)
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    
    notes.forEach((freq, index) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.frequency.value = freq;
        oscillator.type = 'sine';
        
        const startTime = ctx.currentTime + (index * 0.1);
        gainNode.gain.setValueAtTime(volume * 0.2, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.3);
    });
}

function playCheckboxSound() {
    if (!AppData.settings.soundEnabled) return;
    
    const ctx = initAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = 600;
    oscillator.type = 'square';
    
    const volume = AppData.settings.volume / 100;
    gainNode.gain.setValueAtTime(volume * 0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.08);
}

function playHoverSound() {
    if (!AppData.settings.soundEnabled) return;
    
    const ctx = initAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = 1000;
    oscillator.type = 'sine';
    
    const volume = AppData.settings.volume / 100;
    gainNode.gain.setValueAtTime(volume * 0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.05);
}

// ======================
// UTILITIES
// ======================
function translateAppText(text) {
    if (!text || typeof text !== 'string') return text;
    if (window.AppI18N && typeof window.AppI18N.translateExact === 'function') {
        const language = window.AppI18N.getCurrentLanguage ? window.AppI18N.getCurrentLanguage() : 'pl';
        return window.AppI18N.translateExact(text, language);
    }
    return text;
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = translateAppText(message);
    
    const colors = {
        'success': '#4caf50',
        'error': '#f44336',
        'warning': '#ff9800'
    };
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '80px',
        right: '20px',
        padding: '1rem 1.5rem',
        background: colors[type] || colors['success'],
        color: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '1000',
        fontSize: '0.9rem',
        fontWeight: '500',
        opacity: '0',
        transform: 'translateY(-20px)',
        transition: 'all 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Floating hearts animation
document.addEventListener('click', (e) => {
    if (Math.random() < 0.05 && AppData.settings.soundEnabled) {
        createFloatingHeart(e.clientX, e.clientY);
    }
});

function createFloatingHeart(x, y) {
    const hearts = ['💖', '💕', '💗', '💓', '💝', '🌸', '✨'];
    const heart = document.createElement('div');
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '1.5rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.animation = 'floatUp 2s ease-out forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        document.body.removeChild(heart);
    }, 2000);
}

// CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(0.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ======================
// CONFETTI ANIMATION
// ======================
function createConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#FFB6C1', '#87CEEB', '#FFD700', '#98FB98', '#DDA0DD', '#FFA07A'];
    
    // Create 50 confetti pieces
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        
        // Random position
        confetti.style.left = Math.random() * 100 + '%';
        
        // Random delay
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        
        // Random size
        const size = Math.random() * 10 + 5;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        
        // Random color
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Random rotation speed
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        container.appendChild(confetti);
        
        
        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, 3500);
    }
}

// ======================
// DATA EXPORT
// ======================
function exportDataAsHTML() {
    const data = AppData;
    const challengeName = getChallengeDisplayName();
    const language = window.AppI18N && typeof window.AppI18N.getCurrentLanguage === 'function'
        ? window.AppI18N.getCurrentLanguage()
        : (data.settings.language || 'pl');
    const tr = (text) => (window.AppI18N && typeof window.AppI18N.translateExact === 'function')
        ? window.AppI18N.translateExact(text, language)
        : text;
    const locale = language === 'en' ? 'en-GB' : language === 'it' ? 'it-IT' : 'pl-PL';
    const now = new Date().toLocaleDateString(locale);
    const formatNumber = (value) => Number(value || 0).toLocaleString(locale);
    const formatDate = (value) => value ? new Date(value).toLocaleDateString(locale) : '—';
    const formatDateTime = (value) => value ? new Date(value).toLocaleString(locale) : '—';
    const moodLabels = {
        1: { pl: '1 - bardzo słabo', en: '1 - very low', it: '1 - molto basso' },
        2: { pl: '2 - słabo', en: '2 - low', it: '2 - basso' },
        3: { pl: '3 - neutralnie', en: '3 - neutral', it: '3 - neutro' },
        4: { pl: '4 - dobrze', en: '4 - good', it: '4 - bene' },
        5: { pl: '5 - świetnie', en: '5 - great', it: '5 - ottimo' }
    };
    const moodEmojis = { 1: '😔', 2: '🙁', 3: '😐', 4: '🙂', 5: '😊' };
    const localizedMoodLabel = (value) => (moodLabels[value] && moodLabels[value][language]) || String(value);
    const normalizeCompletedWorkoutEntries = (value) => {
        if (Array.isArray(value)) {
            return Array.from(new Set(value
                .filter(item => item !== null && item !== undefined && item !== '')
                .map(item => String(item).trim())
                .filter(Boolean)));
        }
        if (value === null || value === undefined || value === '') {
            return [];
        }
        return [String(value).trim()].filter(Boolean);
    };

    const runEntries = Object.entries(data.runLog || {}).sort((a, b) => a[0].localeCompare(b[0]));
    const totalRunDistance = runEntries.reduce((sum, [, entry]) => sum + Number(entry?.distance || 0), 0);
    const totalRunMinutes = runEntries.reduce((sum, [, entry]) => sum + Number(entry?.duration || 0), 0);
    const bestRun = runEntries.reduce((best, [, entry]) => {
        const distance = Number(entry?.distance || 0);
        if (distance > (best.distance || 0)) {
            return { distance, duration: Number(entry?.duration || 0), updatedAt: entry?.updatedAt || null };
        }
        return best;
    }, { distance: 0, duration: 0, updatedAt: null });

    const focusEntries = Object.entries(data.workoutFocus || {}).sort((a, b) => a[0].localeCompare(b[0]));
    const focusCounts = focusEntries.reduce((acc, [, parts]) => {
        (Array.isArray(parts) ? parts : []).forEach(part => {
            acc[part] = (acc[part] || 0) + 1;
        });
        return acc;
    }, {});

    const workoutCategoryCounts = {
        running: 0,
        gym: 0,
        stretch: 0,
        video: 0,
        custom: 0,
        weekly: 0
    };
    (data.settings.workouts || []).forEach(workout => {
        const category = workout.category || 'video';
        workoutCategoryCounts[category] = (workoutCategoryCounts[category] || 0) + 1;
    });
    (data.settings.customWorkouts || []).forEach(() => {
        workoutCategoryCounts.custom += 1;
    });
    if (data.weeklyWorkouts && data.weeklyWorkouts.enabled) {
        Object.keys(data.weeklyWorkouts).forEach(day => {
            if (day === 'enabled') return;
            workoutCategoryCounts.weekly += Array.isArray(data.weeklyWorkouts[day]) ? data.weeklyWorkouts[day].length : 0;
        });
    }

    const historyDates = new Set([
        ...Object.keys(data.steps || {}),
        ...Object.keys(data.studyHours || {}),
        ...Object.keys(data.mood || {}),
        ...Object.keys(data.completedTasks || {}),
        ...Object.keys(data.completedWorkouts || {}),
        ...Object.keys(data.runLog || {}),
        ...Object.keys(data.workoutFocus || {}),
        ...(Array.isArray(data.challenge?.completedDays) ? data.challenge.completedDays : [])
    ]);
    const historyRows = Array.from(historyDates).sort().reverse().map(dateKey => {
        const steps = Number(data.steps?.[dateKey] || 0);
        const mood = data.mood?.[dateKey];
        const tasks = Array.isArray(data.completedTasks?.[dateKey]) ? data.completedTasks[dateKey].length : Number(data.completedTasks?.[dateKey] || 0);
        const workouts = normalizeCompletedWorkoutEntries(data.completedWorkouts?.[dateKey]).length;
        const run = data.runLog?.[dateKey];
        const focusParts = Array.isArray(data.workoutFocus?.[dateKey]) ? data.workoutFocus[dateKey] : [];
        return `
            <tr>
                <td>${formatDate(dateKey)}</td>
                <td>${steps.toLocaleString(locale)}</td>
                <td>${mood ? `${moodEmojis[mood] || ''} ${localizedMoodLabel(mood)}` : '—'}</td>
                <td>${tasks}</td>
                <td>${workouts}</td>
                <td>${run ? `${Number(run.distance || 0).toFixed(1)} km / ${Number(run.duration || 0)} min` : '—'}</td>
                <td>${focusParts.length > 0 ? focusParts.join(', ') : '—'}</td>
            </tr>
        `;
    }).join('');

    const challengeActivityLog = Array.isArray(data.challenge?.activityLog) ? data.challenge.activityLog : [];
    const activityLogRows = challengeActivityLog.slice(0, 25).map(entry => `
        <div style="background: #fff5f8; padding: 0.85rem 1rem; border-radius: 10px; border-left: 4px solid #ff9ac2; margin-bottom: 0.5rem;">
            <div style="font-weight: 700; color: #ff9ac2; margin-bottom: 0.2rem;">${formatDate(entry.dateKey || entry.timestamp ? new Date(entry.timestamp || entry.dateKey).toISOString().slice(0,10) : '')}</div>
            <div style="color: #666;">${entry.summary || entry.type || 'Aktywność'}</div>
        </div>
    `).join('');

    const progressHistorySummary = historyDates.size > 0
        ? `${tr('Historia aktywności')}: ${historyDates.size}`
        : tr('Brak historii aktywności');

    const settingsSummaryCards = `
        <section>
            <h2>${tr('Ustawienia aplikacji')}</h2>
            <div class="stats-grid">
                <div class="stat-card"><div class="stat-value">${tr(data.settings.language || 'pl').toUpperCase()}</div><div class="stat-label">${tr('Język')}</div></div>
                <div class="stat-card"><div class="stat-value">${tr(data.settings.theme || 'pink')}</div><div class="stat-label">${tr('Motyw')}</div></div>
                <div class="stat-card"><div class="stat-value">${tr(data.settings.font || 'default')}</div><div class="stat-label">${tr('Czcionka')}</div></div>
                <div class="stat-card"><div class="stat-value">${data.settings.challengeLength || 75}</div><div class="stat-label">${tr('Długość wyzwania')}</div></div>
                <div class="stat-card"><div class="stat-value">${data.settings.stepsGoal?.toLocaleString(locale) || '—'}</div><div class="stat-label">${tr('Cel kroków')}</div></div>
                <div class="stat-card"><div class="stat-value">${data.settings.studyGoal || 0}h</div><div class="stat-label">${tr('Cel nauki')}</div></div>
                <div class="stat-card"><div class="stat-value">${data.settings.workoutsGoal || 0}</div><div class="stat-label">${tr('Cel workoutów')}</div></div>
                <div class="stat-card"><div class="stat-value">${(() => {
                    const restDays = Array.isArray(data.settings?.restDays) && data.settings.restDays.length > 0 ? data.settings.restDays : (data.settings?.restDay && data.settings.restDay !== 'none' ? [data.settings.restDay] : []);
                    if (restDays.length === 0) return tr('Brak');
                    const labels = restDays.map(day => {
                        const names = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
                        return tr(names[Number(day)] || day);
                    });
                    return labels.join(', ');
                })()}</div><div class="stat-label">${tr('Dni odpoczynku')}</div></div>
            </div>
        </section>
    `;
    
    // Calculate statistics
    const totalSteps = Object.values(data.steps).reduce((sum, val) => sum + val, 0);
    const avgSteps = totalSteps / Math.max(Object.keys(data.steps).length, 1);
    const maxSteps = Math.max(...Object.values(data.steps), 0);
    
    const totalStudyHours = Object.values(data.studyHours).reduce((sum, val) => sum + val, 0);
    
    const totalWorkouts = Object.values(data.completedWorkouts || {}).reduce((sum, workouts) => {
        return sum + normalizeCompletedWorkoutEntries(workouts).length;
    }, 0);
    
    const totalTasks = Object.values(data.completedTasks).reduce((sum, tasks) => {
        return sum + (Array.isArray(tasks) ? tasks.length : (tasks || 0));
    }, 0);
    
    const perfectDays = Object.values(data.completedTasks).filter(tasks => {
        const count = Array.isArray(tasks) ? tasks.length : tasks;
        return count >= data.tasks.length;
    }).length;
    
    const completedDays = data.challenge.completedDays.length;
    const completionRate = ((completedDays / data.challenge.totalDays) * 100).toFixed(1);
    const currentStreak = data.streak || 0;
    const longestStreak = data.longestStreak || data.streak || 0;
    
    // Count unlocked badges against the full badge catalog, not only badges that were ever initialized in storage.
    const { unlockedBadges, totalBadges } = getBadgeStats(data);
    
    // Get mood statistics
    const moodEntries = Object.entries(data.mood);
    const moodCounts = {};
    moodEntries.forEach(([_, mood]) => {
        moodCounts[mood] = (moodCounts[mood] || 0) + 1;
    });
    const avgMood = moodEntries.length > 0 
        ? (Object.keys(moodCounts).reduce((sum, mood) => sum + parseInt(mood) * moodCounts[mood], 0) / moodEntries.length).toFixed(1)
        : 0;
    const latestHistoryDate = Array.from(historyDates).sort().reverse()[0] || null;
    const heroCards = [
        { value: completedDays, label: tr('Dni ukończone') },
        { value: `${completionRate}%`, label: tr('Postęp wyzwania') },
        { value: `${currentStreak} 🔥`, label: tr('Aktualna passa') },
        { value: `${totalSteps.toLocaleString(locale)}`, label: tr('Łącznie kroków') },
        { value: `${totalWorkouts}`, label: tr('Treningi ukończone') },
        { value: `${unlockedBadges}/${totalBadges}`, label: tr('Odznaki zdobyte') }
    ];
    
    // Generate HTML
    let html = `
<!DOCTYPE html>
<html lang="${(window.AppI18N && typeof window.AppI18N.getCurrentLanguage === 'function') ? window.AppI18N.getCurrentLanguage() : 'pl'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${challengeName} - ${tr('Raport Postępów')}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #ffeef8 0%, #fff5f8 100%);
            padding: 2rem;
            color: #333;
        }
        
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            padding: 2.5rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        header {
            text-align: center;
            margin-bottom: 3rem;
            padding-bottom: 2rem;
            border-bottom: 3px solid #ff9ac2;
        }
        
        h1 {
            font-size: 3rem;
            color: #ff9ac2;
            margin-bottom: 0.5rem;
        }
        
        .date {
            color: #666;
            font-size: 1rem;
        }

        .report-hero {
            background: linear-gradient(135deg, #ff9ac2, #ffc1e0);
            color: white;
            border-radius: 18px;
            padding: 1.5rem;
            margin: 1.5rem 0 2rem 0;
            box-shadow: 0 12px 24px rgba(255, 154, 194, 0.22);
        }

        .report-hero-top {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
            align-items: flex-start;
            flex-wrap: wrap;
            margin-bottom: 1rem;
        }

        .report-hero-title {
            font-size: 1.15rem;
            font-weight: 700;
            letter-spacing: 0.03em;
            text-transform: uppercase;
            opacity: 0.95;
        }

        .report-hero-subtitle {
            font-size: 0.95rem;
            opacity: 0.9;
            margin-top: 0.35rem;
            max-width: 60ch;
            line-height: 1.45;
        }

        .report-hero-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 0.75rem;
        }

        .report-hero-card {
            background: rgba(255, 255, 255, 0.16);
            border: 1px solid rgba(255, 255, 255, 0.26);
            border-radius: 14px;
            padding: 0.9rem;
            backdrop-filter: blur(6px);
        }

        .report-hero-value {
            font-size: 1.5rem;
            font-weight: 800;
            line-height: 1.1;
        }

        .report-hero-label {
            font-size: 0.8rem;
            opacity: 0.9;
            margin-top: 0.35rem;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 1rem;
            margin-bottom: 3rem;
        }
        
        .stat-card {
            background: linear-gradient(135deg, #ff9ac2, #ffc1e0);
            color: white;
            padding: 1.5rem;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 4px 10px rgba(255, 154, 194, 0.3);
        }
        
        .stat-value {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
        }
        
        .stat-label {
            font-size: 0.9rem;
            opacity: 0.9;
        }
        
        section {
            margin-bottom: 3rem;
        }
        
        h2 {
            font-size: 1.8rem;
            color: #ff9ac2;
            margin-bottom: 1.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #ffe0ef;
        }
        
        .badge-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 1rem;
        }
        
        .badge-item {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 12px;
            text-align: center;
            border: 2px solid #e9ecef;
        }
        
        .badge-item.unlocked {
            background: linear-gradient(135deg, #fff5f8, #ffffff);
            border-color: #ff9ac2;
        }
        
        .badge-icon {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }
        
        .badge-name {
            font-size: 0.85rem;
            font-weight: 600;
            color: #333;
        }
        
        .task-list {
            list-style: none;
        }
        
        .task-item {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 10px;
            margin-bottom: 0.5rem;
            border-left: 4px solid #ff9ac2;
        }
        
        .mood-stats {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        .mood-item {
            background: #f8f9fa;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            text-align: center;
            flex: 1;
            min-width: 120px;
        }
        
        .mood-emoji {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }
        
        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 1rem;
        }
        
        .gallery-item {
            aspect-ratio: 1;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .report-table {
            width: 100%;
            border-collapse: collapse;
            min-width: 900px;
            background: white;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
        }

        .report-table th,
        .report-table td {
            padding: 0.8rem;
            border-bottom: 1px solid #f1d8e3;
            vertical-align: top;
        }

        .report-table th {
            background: #fff5f8;
            font-weight: 700;
        }

        .report-note {
            background: #fff8fb;
            border-left: 4px solid #ff9ac2;
            color: #6a4c59;
            padding: 1rem 1.2rem;
            border-radius: 12px;
            line-height: 1.5;
        }
        
        footer {
            text-align: center;
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 2px solid #ffe0ef;
            color: #666;
        }
        
        @media print {
            @page {
                size: A4;
                margin: 12mm;
            }

            body {
                background: white;
                padding: 0;
                color-adjust: exact;
                -webkit-print-color-adjust: exact;
            }
            
            .container {
                box-shadow: none;
                padding: 0;
                max-width: 100%;
            }

            .report-hero {
                box-shadow: none;
                break-inside: avoid;
                margin-top: 0.75rem;
            }
            
            .stats-grid {
                grid-template-columns: repeat(3, 1fr);
                gap: 0.75rem;
                margin-bottom: 2rem;
            }
            
            .stat-card {
                page-break-inside: avoid;
                break-inside: avoid;
                padding: 1rem;
            }
            
            section {
                page-break-inside: avoid;
                break-inside: avoid;
                margin-bottom: 1.6rem;
            }
            
            h2 {
                page-break-after: avoid;
            }
            
            .badge-grid, .gallery-grid {
                grid-template-columns: repeat(6, 1fr);
                gap: 0.5rem;
            }

            .report-table {
                min-width: 0;
                width: 100%;
                box-shadow: none;
            }

            .report-table th,
            .report-table td {
                padding: 0.55rem;
            }
            
            .badge-item {
                padding: 0.5rem;
                font-size: 0.8rem;
            }
            
            .badge-icon {
                font-size: 1.5rem;
            }
            
            footer {
                page-break-before: avoid;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🌸 ${challengeName} 🌸</h1>
            <p class="date">${tr('Raport wygenerowany:')} ${now}</p>
        </header>

        <section class="report-hero">
            <div class="report-hero-top">
                <div>
                    <div class="report-hero-title">${tr('Wszystkie informacje ze strony')}</div>
                    <div class="report-hero-subtitle">${tr('Raport zawiera teraz wszystkie dane z aplikacji')}</div>
                </div>
                <div class="report-note" style="background: rgba(255,255,255,0.16); border-left-color: rgba(255,255,255,0.65); color: white; max-width: 320px;">
                    ${latestHistoryDate ? `${tr('Ostatni zapis')}: ${formatDate(latestHistoryDate)}` : tr('Brak historii aktywności')}
                    ${bestRun.distance > 0 ? `<br>${tr('Najdłuższy bieg')}: ${bestRun.distance.toFixed(1)} km / ${bestRun.duration} min` : ''}
                </div>
            </div>
            <div class="report-hero-grid">
                ${heroCards.map(card => `
                    <div class="report-hero-card">
                        <div class="report-hero-value">${card.value}</div>
                        <div class="report-hero-label">${card.label}</div>
                    </div>
                `).join('')}
            </div>
        </section>
        
        <section>
            <h2>${tr('📊 Podsumowanie')}</h2>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value">${completedDays}</div>
                    <div class="stat-label">${tr('Dni ukończone')}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${completionRate}%</div>
                    <div class="stat-label">${tr('Postęp wyzwania')}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${currentStreak} 🔥</div>
                    <div class="stat-label">${tr('Aktualna passa')}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${longestStreak} ⚡</div>
                    <div class="stat-label">${tr('Najdłuższa passa')}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${formatNumber(totalSteps)}</div>
                    <div class="stat-label">${tr('Łącznie kroków')}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${totalWorkouts}</div>
                    <div class="stat-label">${tr('Treningi ukończone')} 💪</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${totalTasks}</div>
                    <div class="stat-label">${tr('Zadania ukończone')}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${perfectDays}</div>
                    <div class="stat-label">${tr('Perfekcyjne dni')} 💯</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${totalStudyHours.toFixed(1)}h</div>
                    <div class="stat-label">${tr('Godzin nauki')} 📚</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${data.gallery.length}</div>
                    <div class="stat-label">${tr('Zdjęcia w galerii')} 📸</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${unlockedBadges}</div>
                    <div class="stat-label">${tr('Odznaki zdobyte')} 🏆</div>
                </div>
            </div>
        </section>
        
        <section>
            <h2>${tr('🏆 Odznaki')} (${unlockedBadges}/${totalBadges})</h2>
            <div class="badge-grid">
                ${generateBadgesHTML(data.badges)}
            </div>
        </section>
        
        <section>
            <h2>${tr('📝 Zadania')}</h2>
            ${data.weeklyTasks && data.weeklyTasks.enabled ? `
                <p style="margin-bottom: 1rem; color: #666;">${tr('Zadania są dostosowane do dnia tygodnia:')}</p>
                <div style="display: grid; gap: 1rem;">
                    ${['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day, index) => {
                        const dayNames = [
                            tr('Poniedziałek') + ' 🌟',
                            tr('Wtorek') + ' 💪',
                            tr('Środa') + ' 🌸',
                            tr('Czwartek') + ' ⚡',
                            tr('Piątek') + ' 🎉',
                            tr('Sobota') + ' 🌈',
                            tr('Niedziela') + ' ✨'
                        ];
                        const tasks = data.weeklyTasks[day] || [];
                        if (tasks.length === 0) return '';
                        return `
                            <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; border-left: 4px solid #ff9ac2;">
                                <h4 style="margin: 0 0 0.5rem 0; color: #ff9ac2;">${dayNames[index]}</h4>
                                <ul style="list-style: none; padding-left: 0; margin: 0;">
                                    ${tasks.map(task => `<li style="padding: 0.3rem 0;">✓ ${task}</li>`).join('')}
                                </ul>
                            </div>
                        `;
                    }).join('')}
                </div>
            ` : `
                <ul class="task-list">
                    ${data.tasks.map(task => `<li class="task-item">${window.AppI18N && typeof window.AppI18N.translateTaskText === 'function' ? window.AppI18N.translateTaskText(task, language) : task}</li>`).join('')}
                </ul>
            `}
        </section>
        
        ${data.settings && data.settings.workoutsEnabled ? `
        <section>
            <h2>${tr('💪 Treningi')}</h2>
            <div class="stats-grid">
                <div class="stat-card"><div class="stat-value">${totalWorkouts}</div><div class="stat-label">${tr('Treningów ukończonych')}</div></div>
                <div class="stat-card"><div class="stat-value">${totalRunDistance.toFixed(1)} km</div><div class="stat-label">${tr('Biegi łącznie')}</div></div>
                <div class="stat-card"><div class="stat-value">${totalRunMinutes} min</div><div class="stat-label">${tr('Czas biegania')}</div></div>
                <div class="stat-card"><div class="stat-value">${runEntries.length}</div><div class="stat-label">${tr('Zapisane biegi')}</div></div>
            </div>

            <div style="display: grid; gap: 1rem;">
                <div style="background: #fff5f8; padding: 1rem; border-radius: 12px; border-left: 4px solid #ff9ac2;">
                    <h3 style="margin: 0 0 0.75rem 0; color: #ff9ac2;">${tr('Kategorie workoutów')}</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 0.75rem;">
                        <div><strong>${tr('Bieganie')}:</strong> ${workoutCategoryCounts.running}</div>
                        <div><strong>${tr('Siłownia')}:</strong> ${workoutCategoryCounts.gym}</div>
                        <div><strong>${tr('Rozciąganie')}:</strong> ${workoutCategoryCounts.stretch}</div>
                        <div><strong>${tr('Film')}:</strong> ${workoutCategoryCounts.video}</div>
                        <div><strong>${tr('Własne')}:</strong> ${workoutCategoryCounts.custom}</div>
                        <div><strong>${tr('Tygodniowe')}:</strong> ${workoutCategoryCounts.weekly}</div>
                    </div>
                </div>

                <div style="background: #f8f9fa; padding: 1rem; border-radius: 12px; border-left: 4px solid #ff9ac2;">
                    <h3 style="margin: 0 0 0.75rem 0; color: #ff9ac2;">${tr('Biegi')}</h3>
                    ${runEntries.length > 0 ? `
                        <div style="display: grid; gap: 0.5rem;">
                            ${runEntries.map(([dateKey, run]) => `
                                <div style="background: white; padding: 0.75rem; border-radius: 8px; border: 1px solid #eee; display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
                                    <span>${formatDate(dateKey)}</span>
                                    <span>${Number(run?.distance || 0).toFixed(1)} km</span>
                                    <span>${Number(run?.duration || 0)} min</span>
                                </div>
                            `).join('')}
                        </div>
                    ` : `<p style="margin: 0; color: #666;">${tr('Brak zapisanych biegów')}</p>`}
                </div>

                <div style="background: #f8f9fa; padding: 1rem; border-radius: 12px; border-left: 4px solid #ff9ac2;">
                    <h3 style="margin: 0 0 0.75rem 0; color: #ff9ac2;">${tr('Partie ciała')}</h3>
                    ${Object.keys(focusCounts).length > 0 ? `
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 0.5rem;">
                            ${Object.entries(focusCounts).map(([part, count]) => `<div><strong>${part}:</strong> ${count}</div>`).join('')}
                        </div>
                    ` : `<p style="margin: 0; color: #666;">${tr('Brak zapisanych partii ciała')}</p>`}
                </div>

                <div style="background: #f8f9fa; padding: 1rem; border-radius: 12px; border-left: 4px solid #ff9ac2;">
                    <h3 style="margin: 0 0 0.75rem 0; color: #ff9ac2;">${tr('Twoje treningi')}</h3>
                    ${(data.settings.workouts && data.settings.workouts.length > 0) || (data.settings.customWorkouts && data.settings.customWorkouts.length > 0) ? `
                        <div style="display: grid; gap: 0.5rem;">
                            ${(data.settings.workouts || []).map(w => `
                                <div style="background: white; padding: 0.75rem; border-radius: 8px; border: 1px solid #eee;">
                                    ${tr(getWorkoutCategoryLabel(w.category || 'video'))}
                                </div>
                            `).join('')}
                            ${(data.settings.customWorkouts || []).map(w => `
                                <div style="background: white; padding: 0.75rem; border-radius: 8px; border: 1px solid #eee;">
                                    ${w.name || tr('Własne ćwiczenie')}
                                </div>
                            `).join('')}
                        </div>
                    ` : `<p style="margin: 0; color: #666;">${tr('Brak workoutów do pokazania')}</p>`}
                </div>
            </div>
        </section>
        ` : ''}

        <section>
            <h2>${tr('🗂️ Historia aktywności')}</h2>
            ${historyRows ? `
                <div style="overflow-x: auto;">
                    <table class="report-table">
                        <thead>
                            <tr>
                                <th style="text-align: left;">${tr('Data')}</th>
                                <th style="text-align: left;">${tr('Kroki')}</th>
                                <th style="text-align: left;">${tr('Samopoczucie')}</th>
                                <th style="text-align: left;">${tr('Zadania')}</th>
                                <th style="text-align: left;">${tr('Workouty')}</th>
                                <th style="text-align: left;">${tr('Bieg')}</th>
                                <th style="text-align: left;">${tr('Partie ciała')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${historyRows}
                        </tbody>
                    </table>
                </div>
            ` : `<p style="color: #666;">${tr('Brak historii aktywności')}</p>`}
        </section>

        ${challengeActivityLog.length > 0 ? `
        <section>
            <h2>${tr('🧩 Zmiany w trakcie wyzwania')}</h2>
            ${activityLogRows}
        </section>
        ` : ''}

        ${settingsSummaryCards}
        
        <section>
            <h2>${tr('😊 Statystyki nastroju')}</h2>
            <div class="mood-stats">
                ${Object.entries(moodCounts).map(([mood, count]) => `
                    <div class="mood-item">
                        <div class="mood-emoji">${mood}</div>
                        <div>${count} ${tr('dni')}</div>
                    </div>
                `).join('')}
            </div>
        </section>
        
        ${data.gallery.length > 0 ? `
        <section>
            <h2>${tr('📸 Galeria')} (${data.gallery.length} ${tr('zdjęć')})</h2>
            <div class="gallery-grid">
                ${data.gallery.slice(0, 12).map(photo => `
                    <div class="gallery-item">
                        <img src="${typeof photo === 'string' ? photo : photo.url || photo}" alt="${tr('Zdjęcie z galerii')}" style="display: block; width: 100%; height: 100%; object-fit: cover; border-radius: 12px;">
                    </div>
                `).join('')}
            </div>
            ${data.gallery.length > 12 ? `<p style="margin-top: 1rem; color: #666;">${tr('... i')} ${data.gallery.length - 12} ${tr('więcej zdjęć')}</p>` : ''}
        </section>
        ` : ''}
        
        ${data.settings && data.settings.rules && data.settings.rules.length > 0 ? `
        <section>
            <h2>${tr('📜 Zasady wyzwania')}</h2>
            <div style="display: grid; gap: 1rem;">
                ${data.settings.rules.map(rule => `
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #ff9ac2;">
                        <h3 style="margin: 0 0 0.5rem 0; color: #ff9ac2;">${rule.title}</h3>
                        <p style="margin: 0; color: #666;">${rule.content}</p>
                    </div>
                `).join('')}
            </div>
        </section>
        ` : ''}
        
        <footer>
            <p>${tr('Made with 💖')}</p>
            <p style="margin-top: 0.5rem; font-size: 0.9rem;">
                ${tr('Aby zapisać jako PDF: Naciśnij Ctrl+P (lub Cmd+P na Mac) i wybierz "Zapisz jako PDF"')}
            </p>
        </footer>
    </div>
</body>
</html>
    `;
    
    function translateReportHtmlString(sourceHtml) {
        if (!window.AppI18N || typeof window.AppI18N.translateExact !== 'function') {
            return sourceHtml;
        }

        const language = window.AppI18N.getCurrentLanguage ? window.AppI18N.getCurrentLanguage() : 'pl';
        const parser = new DOMParser();
        const documentFragment = parser.parseFromString(sourceHtml, 'text/html');
        const walker = document.createTreeWalker(documentFragment.documentElement, NodeFilter.SHOW_TEXT, null);
        let node;

        while ((node = walker.nextNode())) {
            const parent = node.parentElement;
            if (!parent || ['SCRIPT', 'STYLE', 'TEXTAREA'].includes(parent.tagName)) continue;
            const translated = window.AppI18N.translateExact(node.nodeValue, language);
            if (translated && translated !== node.nodeValue) {
                node.nodeValue = translated;
            }
        }

        return '<!DOCTYPE html>\n' + documentFragment.documentElement.outerHTML;
    }

    // Helper function to generate badges HTML
    function generateBadgesHTML(badges) {
        const badgeInfo = {
            // Podstawowe
            'first-steps': { name: 'Pierwsze kroki', icon: '👣' },
            'first-mood': { name: 'Pierwsze wrażenie', icon: '💭' },
            'first-photo': { name: 'Pierwsza chwila', icon: '📷' },
            
            // Streak
            '3-day-streak': { name: 'Startowy ogień', icon: '🔥' },
            '7-day-streak': { name: 'Tygodniowy płomień', icon: '🔥🔥' },
            '14-day-streak': { name: 'Dwutygodniowa fala', icon: '🔥🔥🔥' },
            'no-days-off': { name: 'No Days Off', icon: '🔥💯' },
            '30-day-streak': { name: 'Miesięczny mistrz', icon: '🔥✨' },
            'goku-ultra': { name: 'Ultra Instinct', icon: '👊⚡' },
            'plus-ultra': { name: 'Plus Ultra!', icon: '⚡💪' },
            
            // Zadania
            'first-task': { name: 'Pierwsze zadanie', icon: '🌱' },
            'task-beginner': { name: 'Początkujący', icon: '✅' },
            'task-master': { name: 'Mistrz zadań', icon: '✅✅' },
            'task-legend': { name: 'Legendarny wykonawca', icon: '✅👑' },

            // Nauka
            'study-starter': { name: 'Pierwsza lekcja', icon: '📚✨' },
            'study-scholar': { name: 'Wiedza rośnie', icon: '🎓📖' },
            
            // Nastrój
            'mood-tracker': { name: 'Łowca nastrojów', icon: '😊' },
            'mood-master': { name: 'Mistrz emocji', icon: '😊💖' },
            'always-happy': { name: 'Promyk słońca', icon: '🥰' },
            'mood-swinger': { name: 'Emocjonalna huśtawka', icon: '🎭' },
            
            // Kroki
            'steps-5k': { name: 'Pierwsze kroki (5K)', icon: '🚶' },
            'steps-10k': { name: 'Aktywny (10K)', icon: '🏃' },
            'steps-50k': { name: 'Biegacz (50K)', icon: '🏃‍♀️' },
            'steps-100k': { name: 'Maratończyk (100K)', icon: '🏃‍♀️💨' },
            'steps-250k': { name: 'Legenda kroków (250K)', icon: '👟⚡' },
            'rocky-balboa': { name: 'Rocky Balboa (500K)', icon: '🥊🏃' },
            
            // Galeria
            'photographer': { name: 'Fotograf', icon: '📸' },
            'social-butterfly': { name: 'Motyl społeczny', icon: '🦋✨' },
            'memory-keeper': { name: 'Strażnik wspomnień', icon: '📸✨' },
            
            // Treningi
            'workout-beginner': { name: 'Początkujący atleta', icon: '💪' },
            'workout-warrior': { name: 'Wojownik siłowni', icon: '🏋️' },
            'workout-beast': { name: 'Bestia treningu', icon: '🦍' },
            'workout-legend': { name: 'Legenda fitnessu', icon: '🏆💪' },
            'one-punch': { name: 'One Punch', icon: '🥊💥' },
            'iron-dedication': { name: 'Żelazne zaangażowanie', icon: '⚡💪' },
            'weekend-warrior': { name: 'Wojownik weekendu', icon: '💪🎉' },
            
            // Motywy
            'optimus-prime': { name: 'Optimus Prime', icon: '🤖' },
            'bumblebee': { name: 'Bumblebee', icon: '🐝⚡' },
            'dark-knight': { name: 'Mroczny rycerz', icon: '🌙🦇' },
            'rainbow-master': { name: 'Mistrz kolorów', icon: '🌈' },
            'theme-explorer': { name: 'Odkrywca stylów', icon: '🎨✨' },
            'megatron': { name: 'Megatron', icon: '🤖⚡' },
            'challenge-named': { name: 'Po swojemu', icon: '✍️✨' },
            
            // Fun odznaki
            'perfectionist': { name: 'Perfekcjonista', icon: '💯' },
            'discipline-master': { name: 'Mistrz dyscypliny', icon: '🎯💎' },
            'comeback-king': { name: 'Król powrotu', icon: '👑🔥' },
            'consistency-champion': { name: 'Mistrz konsystencji', icon: '📅✨' },
            'time-traveler': { name: 'Podróżnik w czasie', icon: '⏰🌀' },
            'legend-collector': { name: 'Kolekcjoner legend', icon: '🏆✨' },
            
            // Wyzwanie
            '15-day-warrior': { name: 'Początkujący wojownik', icon: '🛡️' },
            '30-day-warrior': { name: '30-dniowy wojownik', icon: '⚔️' },
            '50-day-champion': { name: 'Mistrz wyzwania', icon: '🏆' },
            '75-day-legend': { name: 'Legenda 75 Hard', icon: '👑' },
            'rules-master': { name: 'Świadomy start', icon: '📜✅' },
            'report-exporter': { name: 'Kronikarz postępów', icon: '📊📥' }
        };

        const badgeIds = getAllBadgeIds();
        return badgeIds.map((id) => {
            const badge = badges && badges[id] ? badges[id] : null;
            const info = badgeInfo[id] || { name: id, icon: '🏅' };
            const unlocked = badge && badge.unlocked ? 'unlocked' : '';
            return `
                <div class="badge-item ${unlocked}">
                    <div class="badge-icon">${info.icon}</div>
                    <div class="badge-name">${info.name}</div>
                </div>
            `;
        }).join('');
    }
    
    if (window.AppI18N) {
        html = translateReportHtmlString(html);
    }

    // Create and download the HTML file
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Kawaii-Quest-Raport-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Otwórz w nowej karcie do drukowania
    const printWindow = window.open(url, '_blank');
    if (printWindow) {
        printWindow.addEventListener('load', () => {
            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 1000);
        });
    } else {
        URL.revokeObjectURL(url);
    }
    
    showNotification('📥 Raport został pobrany i otworzony w nowej karcie! Naciśnij Ctrl+P aby zapisać jako PDF', 'success');
}

// ========== WORKOUTS ==========
function extractYouTubeVideoId(url) {
    const patterns = [
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
        /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
        /^([a-zA-Z0-9_-]{11})$/
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
}

function initWorkouts() {
    const btnAddWorkout = document.getElementById('btnAddWorkout');
    const workoutURLInput = document.getElementById('workoutURLInput');
    const workoutCategorySelect = document.getElementById('workoutCategorySelect');
    const weeklyWorkoutsToggle = document.getElementById('weeklyWorkoutsToggle');
    const normalWorkoutsConfig = document.getElementById('normalWorkoutsConfig');
    const weeklyWorkoutsConfig = document.getElementById('weeklyWorkoutsConfig');
    const saveRunBtn = document.getElementById('saveRunBtn');
    const runDistanceInput = document.getElementById('runDistanceInput');
    const runDurationInput = document.getElementById('runDurationInput');
    const saveManualWorkoutBtn = document.getElementById('saveManualWorkoutBtn');
    const manualWorkoutNameInput = document.getElementById('manualWorkoutNameInput');
    
    // Initialize weeklyWorkouts if not exists
    if (!AppData.weeklyWorkouts) {
        AppData.weeklyWorkouts = {
            enabled: false,
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: []
        };
    }
    
    // Weekly workouts toggle
    if (weeklyWorkoutsToggle && normalWorkoutsConfig && weeklyWorkoutsConfig) {
        weeklyWorkoutsToggle.checked = AppData.weeklyWorkouts.enabled;
        normalWorkoutsConfig.style.display = AppData.weeklyWorkouts.enabled ? 'none' : 'block';
        weeklyWorkoutsConfig.style.display = AppData.weeklyWorkouts.enabled ? 'block' : 'none';
        
        weeklyWorkoutsToggle.addEventListener('change', (e) => {
            AppData.weeklyWorkouts.enabled = e.target.checked;
            normalWorkoutsConfig.style.display = e.target.checked ? 'none' : 'block';
            weeklyWorkoutsConfig.style.display = e.target.checked ? 'block' : 'none';
            saveData();
            updateWorkoutsDisplay();
            if (e.target.checked) {
                renderAllDayWorkouts();
            }
        });
        
        if (AppData.weeklyWorkouts.enabled) {
            renderAllDayWorkouts();
        }
    }
    
    // Add workout button (normal mode)
    if (btnAddWorkout && workoutURLInput) {
        btnAddWorkout.addEventListener('click', () => addWorkout(workoutCategorySelect));
        workoutURLInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addWorkout(workoutCategorySelect);
        });
    }

    if (saveRunBtn) {
        saveRunBtn.addEventListener('click', saveWorkoutRun);
    }
    if (runDistanceInput) {
        runDistanceInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') saveWorkoutRun();
        });
    }
    if (runDurationInput) {
        runDurationInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') saveWorkoutRun();
        });
    }
    if (saveManualWorkoutBtn && manualWorkoutNameInput) {
        saveManualWorkoutBtn.addEventListener('click', saveManualWorkout);
        manualWorkoutNameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') saveManualWorkout();
        });
    }

    document.querySelectorAll('.body-part-chip').forEach(chip => {
        chip.addEventListener('click', () => toggleBodyPart(chip.dataset.part));
    });

    const workoutFilterButtons = document.querySelectorAll('#workoutCategoryFilter .body-part-chip');
    const applyWorkoutFilterState = () => {
        const activeFilter = AppData.settings.workoutFilter || 'all';
        workoutFilterButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.filter === activeFilter);
        });
    };

    if (workoutFilterButtons.length > 0) {
        if (AppData.settings.workoutFilter === undefined) {
            AppData.settings.workoutFilter = 'all';
        }
        applyWorkoutFilterState();

        workoutFilterButtons.forEach(button => {
            button.addEventListener('click', () => {
                AppData.settings.workoutFilter = button.dataset.filter || 'all';
                saveData();
                applyWorkoutFilterState();
                updateWorkoutsDisplay();
            });
        });
    }

    // Add custom workout button
    const btnAddCustomWorkout = document.getElementById('btnAddCustomWorkout');
    const customWorkoutInput = document.getElementById('customWorkoutInput');
    if (btnAddCustomWorkout && customWorkoutInput) {
        btnAddCustomWorkout.addEventListener('click', addCustomWorkout);
        customWorkoutInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addCustomWorkout();
        });
    }
    
    updateWorkoutQuickStats();
    updateBodyPartChips();

    // Render existing workouts
    updateWorkoutsDisplay();
    updateCustomWorkoutsDisplay();
}

function getWorkoutCategoryLabel(category) {
    const map = {
        running: '🏃 Bieganie',
        gym: '🦾 Siłownia',
        stretch: '🧘 Rozciąganie',
        video: '🎥 Film / YouTube'
    };
    return map[category] || '🎥 Film / YouTube';
}

function updateWorkoutQuickStats() {
    const runSummaryBox = document.getElementById('runSummaryBox');
    const focusSummaryBox = document.getElementById('focusSummaryBox');
    const todayWorkoutSummary = document.getElementById('todayWorkoutSummary');

    const today = getTodayKey();
    const runData = AppData.runLog && AppData.runLog[today] ? AppData.runLog[today] : null;
    const focusList = AppData.workoutFocus && AppData.workoutFocus[today] ? AppData.workoutFocus[today] : [];
    const completedToday = AppData.completedWorkouts && AppData.completedWorkouts[today] ? AppData.completedWorkouts[today] : [];

    if (runSummaryBox) {
        if (runData && (Number(runData.distance) > 0 || Number(runData.duration) > 0)) {
            runSummaryBox.textContent = translateAppText(`Dziś: ${Number(runData.distance).toFixed(1)} km • ${Number(runData.duration)} min • rekord: ${Math.max(Number(runData.distance) || 0, 0)} km`);
        } else {
            runSummaryBox.textContent = translateAppText('Brak danych biegu dziś – wpisz dystans i czas.');
        }
    }

    if (focusSummaryBox) {
        if (focusList.length > 0) {
            focusSummaryBox.textContent = translateAppText('Wybrane partie: ') + focusList.join(', ');
        } else {
            focusSummaryBox.textContent = translateAppText('Brak wybranych partii – kliknij, aby zaznaczyć dziś trening.');
        }
    }

    if (todayWorkoutSummary) {
        const plannedToday = (AppData.settings.workouts || []).length + (AppData.settings.customWorkouts || []).length;
        if (plannedToday > 0) {
            todayWorkoutSummary.textContent = translateAppText(`Ukończono dziś ${completedToday.length} z ${plannedToday} zaplanowanych zadań treningowych. Kliknij „Zrób dziś” albo checkbox, aby śledzić progres.`);
        } else {
            todayWorkoutSummary.textContent = translateAppText('Dodaj pierwszy film lub własne ćwiczenie, aby rozpocząć plan treningowy na dziś.');
        }
    }
}

function updateBodyPartChips() {
    const today = getTodayKey();
    const selected = AppData.workoutFocus && AppData.workoutFocus[today] ? AppData.workoutFocus[today] : [];
    document.querySelectorAll('.body-part-chip').forEach(chip => {
        chip.classList.toggle('active', selected.includes(chip.dataset.part));
    });
}

function toggleBodyPart(part) {
    if (!AppData.workoutFocus) AppData.workoutFocus = {};
    const today = getTodayKey();
    if (!AppData.workoutFocus[today]) AppData.workoutFocus[today] = [];

    if (AppData.workoutFocus[today].includes(part)) {
        AppData.workoutFocus[today] = AppData.workoutFocus[today].filter(item => item !== part);
    } else {
        AppData.workoutFocus[today].push(part);
    }

    saveData();
    updateBodyPartChips();
    updateWorkoutQuickStats();
    showNotification('✅ Partie treningowe zaktualizowane', 'success');
}

function saveWorkoutRun() {
    const distanceInput = document.getElementById('runDistanceInput');
    const durationInput = document.getElementById('runDurationInput');
    const distance = Number(distanceInput?.value || 0);
    const duration = Number(durationInput?.value || 0);

    if (!distance && !duration) {
        showNotification('⚠️ Wpisz dystans lub czas biegu', 'warning');
        return;
    }

    const today = getTodayKey();

    if (!AppData.runLog) AppData.runLog = {};
    AppData.runLog[today] = {
        distance: distance || 0,
        duration: duration || 0,
        updatedAt: new Date().toISOString()
    };

    if (!AppData.completedWorkouts) AppData.completedWorkouts = {};
    const runWorkoutId = getRunWorkoutId(today);
    const completedForDay = normalizeCompletedWorkoutEntries(AppData.completedWorkouts[today]);
    if (!completedForDay.includes(runWorkoutId)) {
        completedForDay.push(runWorkoutId);
        AppData.completedWorkouts[today] = completedForDay;
    }

    saveData();
    updateWorkoutsDisplay();
    updateWorkoutQuickStats();
    updateStats();
    showNotification('✅ Bieg zapisany i dodany do workoutów!', 'success');
}

function addWorkout(selectedCategoryElement) {
    const workoutURLInput = document.getElementById('workoutURLInput');
    const workoutCategorySelect = selectedCategoryElement || document.getElementById('workoutCategorySelect');
    if (!workoutURLInput || !workoutURLInput.value.trim()) {
        showNotification('⚠️ Wklej link YouTube!', 'warning');
        return;
    }
    
    const url = workoutURLInput.value.trim();
    const videoId = extractYouTubeVideoId(url);
    
    if (!videoId) {
        showNotification('❌ Nieprawidłowy link YouTube', 'error');
        return;
    }
    
    // Check for duplicates
    if (!AppData.settings.workouts) {
        AppData.settings.workouts = [];
    }
    
    const isDuplicate = AppData.settings.workouts.some(w => w.videoId === videoId);
    if (isDuplicate) {
        showNotification('⚠️ Ten workout jest już dodany!', 'warning');
        return;
    }
    
    // Add workout
    AppData.settings.workouts.push({
        videoId: videoId,
        url: url,
        category: workoutCategorySelect ? workoutCategorySelect.value : 'video',
        addedDate: new Date().toISOString()
    });
    
    saveData();
    workoutURLInput.value = '';
    updateWorkoutsDisplay();
    updateStats();
    showNotification('✅ Workout dodany!', 'success');
}

function removeWorkout(videoId) {
    AppData.settings.workouts = AppData.settings.workouts.filter(w => w.videoId !== videoId);
    saveData();
    updateWorkoutsDisplay();
    updateStats();
    showNotification('🗑️ Workout usunięty', 'success');
}

function addCustomWorkout() {
    const customWorkoutInput = document.getElementById('customWorkoutInput');
    if (!customWorkoutInput || !customWorkoutInput.value.trim()) {
        showNotification('⚠️ Wpisz nazwę ćwiczenia!', 'warning');
        return;
    }
    
    const name = customWorkoutInput.value.trim();
    
    // Initialize customWorkouts if not exists
    if (!AppData.settings.customWorkouts) {
        AppData.settings.customWorkouts = [];
    }
    
    // Generate unique ID
    const id = 'custom_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // Add custom workout
    AppData.settings.customWorkouts.push({
        id: id,
        name: name,
        addedDate: new Date().toISOString()
    });
    
    saveData();
    customWorkoutInput.value = '';
    updateCustomWorkoutsDisplay();
    updateWorkoutsDisplay();
    updateStats();
    showNotification('✅ Własne ćwiczenie dodane!', 'success');
}

function saveManualWorkout() {
    const input = document.getElementById('manualWorkoutNameInput');
    if (!input || !input.value.trim()) {
        showNotification('⚠️ Wpisz nazwę treningu!', 'warning');
        return;
    }

    const name = input.value.trim();
    const id = 'manual_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    if (!AppData.settings.customWorkouts) AppData.settings.customWorkouts = [];
    AppData.settings.customWorkouts.push({
        id: id,
        name: name,
        addedDate: new Date().toISOString(),
        manual: true
    });

    saveData();
    input.value = '';
    updateCustomWorkoutsDisplay();
    updateWorkoutsDisplay();
    updateStats();
    showNotification('✅ Trening bez filmu dodany do listy. Zaznacz checkbox, gdy będzie wykonany.', 'success');
}

function removeCustomWorkout(id) {
    AppData.settings.customWorkouts = AppData.settings.customWorkouts.filter(w => w.id !== id);
    saveData();
    updateCustomWorkoutsDisplay();
    updateWorkoutsDisplay();
    updateStats();
    showNotification('🗑️ Ćwiczenie usunięte', 'success');
}

function updateCustomWorkoutsDisplay() {
    const customWorkoutsList = document.getElementById('customWorkoutsList');
    if (!customWorkoutsList) return;

    if (!AppData.settings.customWorkouts || AppData.settings.customWorkouts.length === 0) {
        customWorkoutsList.innerHTML = '';
        return;
    }

    customWorkoutsList.innerHTML = AppData.settings.customWorkouts.map(workout => `
        <article class="workout-card workout-card--custom" style="display: flex; gap: 1rem; margin-bottom: 1rem; padding: 1rem; background: var(--card-bg); border-radius: 14px; align-items: center; box-shadow: 0 14px 26px rgba(15, 23, 42, 0.08);">
            <div style="width: 56px; height: 56px; background: linear-gradient(145deg, var(--primary-color), #111827); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.35rem; flex-shrink: 0;">
                💪
            </div>
            <div style="flex: 1; min-width: 0;">
                <span class="workout-chip">Własne</span>
                <p style="font-size: 0.95em; color: var(--text-color); margin: 0.35rem 0 0.35rem 0; font-weight: 700;">${workout.name}</p>
                <p style="font-size: 0.85em; color: var(--text-secondary); margin: 0;">Dodano: ${new Date(workout.addedDate).toLocaleDateString('pl-PL')}</p>
            </div>
            <button onclick="removeCustomWorkout('${workout.id}')" style="padding: 0.55rem 0.9rem; background: #f44336; color: white; border: none; border-radius: 10px; cursor: pointer; white-space: nowrap; font-weight: 600;">🗑️ Usuń</button>
        </article>
    `).join('');
}

function updateWorkoutsDisplay() {
    // Update settings list
    const workoutsList = document.getElementById('workoutsList');
    const workoutsViewList = document.getElementById('workoutsViewList');
    const workoutsContent = document.getElementById('workoutsContent');
    const workoutStatusMsg = document.getElementById('workoutStatusMsg');
    
    if (!AppData.completedWorkouts) {
        AppData.completedWorkouts = {};
    }
    
    const today = new Date().toISOString().split('T')[0];
    const completedToday = normalizeCompletedWorkoutEntries(AppData.completedWorkouts[today]);
    
    // Determine which workouts to display
    let workoutsToDisplay = [];
    const activeFilter = AppData.settings.workoutFilter || 'all';
    
    if (AppData.weeklyWorkouts && AppData.weeklyWorkouts.enabled) {
        // Get today's day of week
        const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const dayOfWeek = new Date().getDay();
        const dayName = dayNames[dayOfWeek];
        workoutsToDisplay = AppData.weeklyWorkouts[dayName] || [];
    } else {
        // Normal mode - same workouts every day
        workoutsToDisplay = AppData.settings.workouts || [];
    }
    
    const settingsHtml = !AppData.settings.workouts || AppData.settings.workouts.length === 0
        ? `<p style="color: #999; font-size: 0.9em;">${translateAppText('Brak dodanych workoutów')}</p>`
        : AppData.settings.workouts.map(workout => `
            <article class="workout-card" style="display: flex; gap: 1rem; margin-bottom: 1rem; padding: 1rem; background: var(--card-bg); border-radius: 14px; align-items: center; box-shadow: 0 14px 26px rgba(15, 23, 42, 0.08);">
                <div style="position: relative; cursor: pointer; flex-shrink: 0;" onclick="playWorkoutVideo('${workout.videoId}')">
                    <img src="https://img.youtube.com/vi/${workout.videoId}/mqdefault.jpg" alt="Thumbnail" style="width: 120px; height: 90px; border-radius: 10px; object-fit: cover; display: block;">
                    <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.28); border-radius: 10px; transition: background 0.2s;">
                        <span style="font-size: 2rem;">▶️</span>
                    </div>
                </div>
                <div style="flex: 1; min-width: 0;">
                    <span class="workout-chip">${getWorkoutCategoryLabel(workout.category || 'video')}</span>
                    <p style="font-size: 0.95em; color: var(--text-color); margin: 0.35rem 0 0.35rem 0; font-weight: 700; cursor: pointer;" onclick="playWorkoutVideo('${workout.videoId}')">Kliknij aby zagrać</p>
                    <p style="font-size: 0.85em; color: var(--text-secondary); margin: 0;">Dodano: ${new Date(workout.addedDate).toLocaleDateString('pl-PL')}</p>
                </div>
                <button onclick="removeWorkout('${workout.videoId}')" style="padding: 0.55rem 0.9rem; background: #f44336; color: white; border: none; border-radius: 10px; cursor: pointer; white-space: nowrap; font-weight: 600;">🗑️ Usuń</button>
            </article>
        `).join('');
    
    // Get custom workouts (always the same every day)
    const customWorkouts = AppData.settings.customWorkouts || [];
    const runData = AppData.runLog && AppData.runLog[today] ? AppData.runLog[today] : null;
    const hasRunToday = !!(runData && (Number(runData.distance) > 0 || Number(runData.duration) > 0));
    const runWorkoutId = getRunWorkoutId(today);
    const completedTodayNormalized = normalizeCompletedWorkoutEntries(completedToday);
    
    // Build view HTML with both YouTube and custom workouts
    let viewHtmlParts = [];

    if (hasRunToday) {
        const isRunCompleted = completedTodayNormalized.includes(runWorkoutId);
        viewHtmlParts.push(`
            <article class="workout-card ${isRunCompleted ? 'workout-card--done' : ''}" style="display: grid; grid-template-columns: auto 120px 1fr auto; gap: 0.9rem; align-items: center; margin-bottom: 1rem; padding: 1rem; background: ${isRunCompleted ? 'linear-gradient(145deg, rgba(243,244,246,0.95), rgba(255,255,255,0.98))' : 'linear-gradient(145deg, rgba(255,255,255,0.96), var(--card-bg))'}; border-radius: 18px; box-shadow: 0 14px 26px rgba(15, 23, 42, 0.08); border: 1px solid rgba(255,255,255,0.9); opacity: ${isRunCompleted ? '0.82' : '1'};">
                <label style="display: flex; align-items: center; justify-content: center; cursor: pointer;">
                    <input type="checkbox" ${isRunCompleted ? 'checked' : ''} onchange="toggleWorkoutComplete('${runWorkoutId}')" style="width: 24px; height: 24px; cursor: pointer; accent-color: var(--primary-color);">
                </label>
                <div style="width: 120px; height: 90px; background: linear-gradient(145deg, #34d399, #0f766e); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 2rem; flex-shrink: 0;">
                    🏃
                </div>
                <div style="min-width: 0;">
                    <div style="display: flex; flex-wrap: wrap; gap: 0.45rem; align-items: center; margin-bottom: 0.35rem;">
                        <span class="workout-chip">🏃 ${translateAppText('Bieganie')}</span>
                        <span class="workout-chip" style="background: ${isRunCompleted ? 'rgba(34,197,94,0.12)' : 'rgba(59,130,246,0.14)'}; color: ${isRunCompleted ? '#166534' : 'var(--text-primary)'}; text-transform: none; letter-spacing: normal;">${isRunCompleted ? '✅ ' + translateAppText('Ukończone dziś') : '⏳ ' + translateAppText('Do zrobienia')}</span>
                    </div>
                    <p style="font-size: 0.95em; color: var(--text-color); margin: 0 0 0.25rem 0; font-weight: 700; ${isRunCompleted ? 'text-decoration: line-through;' : ''}">${translateAppText('Bieg / aktywność bez filmu')}</p>
                    <p style="font-size: 0.85em; color: var(--text-secondary); margin: 0;">${translateAppText('Dystans:')} ${Number(runData.distance).toFixed(1)} km • ${translateAppText('Czas:')} ${Number(runData.duration)} min</p>
                </div>
                <button onclick="toggleWorkoutComplete('${runWorkoutId}')" style="padding: 0.45rem 0.75rem; background: ${isRunCompleted ? 'linear-gradient(145deg, #22c55e, #15803d)' : 'linear-gradient(145deg, var(--primary-color), #2563eb)'}; color: white; border: none; border-radius: 10px; cursor: pointer; white-space: nowrap; font-weight: 700;">${isRunCompleted ? '✔ ' + translateAppText('Gotowe') : translateAppText('Zrób dziś')}</button>
            </article>
        `);
    }
    
    const filteredWorkouts = workoutsToDisplay.filter(workout => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'custom') return !workout.videoId;
        return (workout.category || 'video') === activeFilter;
    });

    // Add workouts from weekly or normal mode
    if (filteredWorkouts.length > 0) {
        filteredWorkouts.forEach(workout => {
            // Check if it's YouTube workout or custom workout
            if (workout.videoId) {
                // YouTube workout
                const isCompleted = completedToday.includes(workout.videoId);
                viewHtmlParts.push(`
            <article class="workout-card ${isCompleted ? 'workout-card--done' : ''}" style="display: grid; grid-template-columns: auto 120px 1fr auto; gap: 0.9rem; align-items: center; margin-bottom: 1rem; padding: 1rem; background: ${isCompleted ? 'linear-gradient(145deg, rgba(243,244,246,0.95), rgba(255,255,255,0.98))' : 'linear-gradient(145deg, rgba(255,255,255,0.96), var(--card-bg))'}; border-radius: 18px; box-shadow: 0 14px 26px rgba(15, 23, 42, 0.08); border: 1px solid rgba(255,255,255,0.9); opacity: ${isCompleted ? '0.82' : '1'};">
                <label style="display: flex; align-items: center; justify-content: center; cursor: pointer;">
                    <input type="checkbox" ${isCompleted ? 'checked' : ''} onchange="toggleWorkoutComplete('${workout.videoId}')" style="width: 24px; height: 24px; cursor: pointer; accent-color: var(--primary-color);">
                </label>
                <div style="position: relative; cursor: pointer; flex-shrink: 0;" onclick="playWorkoutVideo('${workout.videoId}')">
                    <img src="https://img.youtube.com/vi/${workout.videoId}/mqdefault.jpg" alt="Thumbnail" style="width: 120px; height: 90px; border-radius: 12px; object-fit: cover; display: block;">
                    <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.28); border-radius: 12px; transition: background 0.2s;">
                        <span style="font-size: 1.8rem;">▶️</span>
                    </div>
                </div>
                <div style="min-width: 0;">
                    <div style="display: flex; flex-wrap: wrap; gap: 0.45rem; align-items: center; margin-bottom: 0.35rem;">
                        <span class="workout-chip">${getWorkoutCategoryLabel(workout.category || 'video')}</span>
                        <span class="workout-chip" style="background: ${isCompleted ? 'rgba(34,197,94,0.12)' : 'rgba(59,130,246,0.14)'}; color: ${isCompleted ? '#166534' : 'var(--text-primary)'}; text-transform: none; letter-spacing: normal;">${isCompleted ? '✅ Ukończone dziś' : '⏳ Do zrobienia'}</span>
                    </div>
                    <p style="font-size: 0.95em; color: var(--text-color); margin: 0 0 0.25rem 0; font-weight: 700; cursor: pointer; ${isCompleted ? 'text-decoration: line-through;' : ''}" onclick="playWorkoutVideo('${workout.videoId}')">${translateAppText('Kliknij, aby odtworzyć film')}</p>
                    <p style="font-size: 0.85em; color: var(--text-secondary); margin: 0;">${translateAppText('Dodano:')} ${new Date(workout.addedDate).toLocaleDateString('pl-PL')}</p>
                </div>
                <button onclick="playWorkoutVideo('${workout.videoId}')" style="padding: 0.45rem 0.75rem; background: linear-gradient(145deg, var(--primary-color), #2563eb); color: white; border: none; border-radius: 10px; cursor: pointer; white-space: nowrap; font-weight: 700;">▶ ${translateAppText('Otwórz')}</button>
            </article>
        `);
            } else if (workout.id && workout.name) {
                // Custom workout from weekly workouts
                const isCompleted = completedToday.includes(workout.id);
                viewHtmlParts.push(`
            <article class="workout-card ${isCompleted ? 'workout-card--done' : ''}" style="display: grid; grid-template-columns: auto 120px 1fr auto; gap: 0.9rem; align-items: center; margin-bottom: 1rem; padding: 1rem; background: ${isCompleted ? 'linear-gradient(145deg, rgba(243,244,246,0.95), rgba(255,255,255,0.98))' : 'linear-gradient(145deg, rgba(255,255,255,0.96), var(--card-bg))'}; border-radius: 18px; box-shadow: 0 14px 26px rgba(15, 23, 42, 0.08); border: 1px solid rgba(255,255,255,0.9); opacity: ${isCompleted ? '0.82' : '1'};">
                <label style="display: flex; align-items: center; justify-content: center; cursor: pointer;">
                    <input type="checkbox" ${isCompleted ? 'checked' : ''} onchange="toggleWorkoutComplete('${workout.id}')" style="width: 24px; height: 24px; cursor: pointer; accent-color: var(--primary-color);">
                </label>
                <div style="width: 120px; height: 90px; background: linear-gradient(145deg, var(--primary-color), #111827); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 2rem; flex-shrink: 0;">
                    💪
                </div>
                <div style="min-width: 0;">
                    <div style="display: flex; flex-wrap: wrap; gap: 0.45rem; align-items: center; margin-bottom: 0.35rem;">
                        <span class="workout-chip">${translateAppText('Własne')}</span>
                        <span class="workout-chip" style="background: ${isCompleted ? 'rgba(34,197,94,0.12)' : 'rgba(59,130,246,0.14)'}; color: ${isCompleted ? '#166534' : 'var(--text-primary)'}; text-transform: none; letter-spacing: normal;">${isCompleted ? '✅ ' + translateAppText('Ukończone dziś') : '⏳ ' + translateAppText('Do zrobienia')}</span>
                    </div>
                    <p style="font-size: 0.95em; color: var(--text-color); margin: 0 0 0.25rem 0; font-weight: 700; ${isCompleted ? 'text-decoration: line-through;' : ''}">${workout.name}</p>
                    <p style="font-size: 0.85em; color: var(--text-secondary); margin: 0;">${translateAppText('Własne ćwiczenie (tygodniowe)')}</p>
                </div>
                <button onclick="toggleWorkoutComplete('${workout.id}')" style="padding: 0.45rem 0.75rem; background: ${isCompleted ? 'linear-gradient(145deg, #22c55e, #15803d)' : 'linear-gradient(145deg, var(--primary-color), #2563eb)'}; color: white; border: none; border-radius: 10px; cursor: pointer; white-space: nowrap; font-weight: 700;">${isCompleted ? '✔ ' + translateAppText('Gotowe') : translateAppText('Zrób dziś')}</button>
            </article>
        `);
            }
        });
    }
    
    // Add custom workouts from global settings (if not in weekly mode)
    if (!AppData.weeklyWorkouts || !AppData.weeklyWorkouts.enabled) {
        if (customWorkouts.length > 0) {
            const filteredCustomWorkouts = activeFilter === 'all' || activeFilter === 'custom'
                ? customWorkouts
                : customWorkouts.filter(() => false);

            filteredCustomWorkouts.forEach(workout => {
                const isCompleted = completedToday.includes(workout.id);
                viewHtmlParts.push(`
            <article class="workout-card ${isCompleted ? 'workout-card--done' : ''}" style="display: grid; grid-template-columns: auto 120px 1fr auto; gap: 0.9rem; align-items: center; margin-bottom: 1rem; padding: 1rem; background: ${isCompleted ? 'linear-gradient(145deg, rgba(243,244,246,0.95), rgba(255,255,255,0.98))' : 'linear-gradient(145deg, rgba(255,255,255,0.96), var(--card-bg))'}; border-radius: 18px; box-shadow: 0 14px 26px rgba(15, 23, 42, 0.08); border: 1px solid rgba(255,255,255,0.9); opacity: ${isCompleted ? '0.82' : '1'};">
                <label style="display: flex; align-items: center; justify-content: center; cursor: pointer;">
                    <input type="checkbox" ${isCompleted ? 'checked' : ''} onchange="toggleWorkoutComplete('${workout.id}')" style="width: 24px; height: 24px; cursor: pointer; accent-color: var(--primary-color);">
                </label>
                <div style="width: 120px; height: 90px; background: linear-gradient(145deg, var(--primary-color), #111827); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 2rem; flex-shrink: 0;">
                    💪
                </div>
                <div style="min-width: 0;">
                    <div style="display: flex; flex-wrap: wrap; gap: 0.45rem; align-items: center; margin-bottom: 0.35rem;">
                        <span class="workout-chip">${translateAppText('Własne')}</span>
                        <span class="workout-chip" style="background: ${isCompleted ? 'rgba(34,197,94,0.12)' : 'rgba(59,130,246,0.14)'}; color: ${isCompleted ? '#166534' : 'var(--text-primary)'}; text-transform: none; letter-spacing: normal;">${isCompleted ? '✅ ' + translateAppText('Ukończone dziś') : '⏳ ' + translateAppText('Do zrobienia')}</span>
                    </div>
                    <p style="font-size: 0.95em; color: var(--text-color); margin: 0 0 0.25rem 0; font-weight: 700; ${isCompleted ? 'text-decoration: line-through;' : ''}">${workout.name}</p>
                    <p style="font-size: 0.85em; color: var(--text-secondary); margin: 0;">${translateAppText('Własne ćwiczenie')}</p>
                </div>
                <button onclick="toggleWorkoutComplete('${workout.id}')" style="padding: 0.45rem 0.75rem; background: ${isCompleted ? 'linear-gradient(145deg, #22c55e, #15803d)' : 'linear-gradient(145deg, var(--primary-color), #2563eb)'}; color: white; border: none; border-radius: 10px; cursor: pointer; white-space: nowrap; font-weight: 700;">${isCompleted ? '✔ ' + translateAppText('Gotowe') : translateAppText('Zrób dziś')}</button>
            </article>
        `);
            });
        }
    }
    
    const viewHtml = viewHtmlParts.length === 0
        ? `<p style="color: #999; font-size: 0.9em;">${translateAppText('Brak workoutów w tej kategorii. Zmień filtr, aby zobaczyć inne treningi.')}</p>`
        : viewHtmlParts.join('');
    
    // Update settings view (no checkboxes)
    if (workoutsList) {
        workoutsList.innerHTML = settingsHtml;
    }
    
    // Update main workouts view (with checkboxes)
    if (workoutsViewList) {
        workoutsViewList.innerHTML = viewHtml;
    }
    
    updateWorkoutQuickStats();
    updateBodyPartChips();

    // Show/hide workouts content based on toggle
    if (workoutsContent && workoutStatusMsg) {
        const hasWorkouts = viewHtmlParts.length > 0;
        if (AppData.settings.workoutsEnabled && hasWorkouts) {
            workoutStatusMsg.style.display = 'none';
            workoutsContent.style.display = 'block';
        } else {
            workoutStatusMsg.style.display = 'block';
            workoutsContent.style.display = 'none';
        }
    }
}

function toggleWorkoutComplete(videoId) {
    if (!AppData.completedWorkouts) {
        AppData.completedWorkouts = {};
    }
    
    const today = new Date().toISOString().split('T')[0];
    const workoutKey = String(videoId).trim();
    const todayEntries = normalizeCompletedWorkoutEntries(AppData.completedWorkouts[today]);
    const index = todayEntries.indexOf(workoutKey);
    
    if (index > -1) {
        todayEntries.splice(index, 1);
        AppData.completedWorkouts[today] = todayEntries;
        showNotification('⏱️ Workout oznaczony jako nieukończony', 'info');
    } else {
        todayEntries.push(workoutKey);
        AppData.completedWorkouts[today] = Array.from(new Set(todayEntries));
        playClickSound();
        showNotification('✅ Workout ukończony!', 'success');
    }
    
    saveData();
    updateWorkoutsDisplay();
    updateStats();
    updateWorkoutQuickStats();
}

function playWorkoutVideo(videoId) {
    const modal = document.getElementById('workoutModal');
    const iframe = document.getElementById('workoutIframe');
    
    if (!modal || !iframe) return;
    
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    modal.style.display = 'flex';
}

function closeWorkoutModal() {
    const modal = document.getElementById('workoutModal');
    const iframe = document.getElementById('workoutIframe');
    
    if (!modal || !iframe) return;
    
    modal.style.display = 'none';
    iframe.src = '';
}

function addDayWorkout(day) {
    const input = document.getElementById(`${day}WorkoutInput`);
    if (!input || !input.value.trim()) {
        showNotification('⚠️ Wklej link YouTube!', 'warning');
        return;
    }
    
    const url = input.value.trim();
    const videoId = extractYouTubeVideoId(url);
    
    if (!videoId) {
        showNotification('❌ Nieprawidłowy link YouTube', 'error');
        return;
    }
    
    // Check for duplicates
    if (!AppData.weeklyWorkouts[day]) {
        AppData.weeklyWorkouts[day] = [];
    }
    
    const isDuplicate = AppData.weeklyWorkouts[day].some(w => w.videoId === videoId);
    if (isDuplicate) {
        showNotification('⚠️ Ten workout jest już dodany!', 'warning');
        return;
    }
    
    // Add workout
    AppData.weeklyWorkouts[day].push({
        videoId: videoId,
        url: url,
        addedDate: new Date().toISOString()
    });
    
    saveData();
    input.value = '';
    renderDayWorkouts(day);
    updateWorkoutsDisplay();
    updateStats();
    showNotification('✅ Workout dodany!', 'success');
}

function addDayCustomWorkout(day) {
    const input = document.getElementById(`${day}CustomWorkoutInput`);
    if (!input || !input.value.trim()) {
        showNotification('⚠️ Wpisz nazwę ćwiczenia!', 'warning');
        return;
    }
    
    const name = input.value.trim();
    
    // Check for duplicates
    if (!AppData.weeklyWorkouts[day]) {
        AppData.weeklyWorkouts[day] = [];
    }
    
    const isDuplicate = AppData.weeklyWorkouts[day].some(w => w.name === name && !w.videoId);
    if (isDuplicate) {
        showNotification('⚠️ To ćwiczenie jest już dodane!', 'warning');
        return;
    }
    
    // Generate unique ID for custom workout
    const customId = 'custom_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // Add custom workout
    AppData.weeklyWorkouts[day].push({
        id: customId,
        name: name,
        addedDate: new Date().toISOString()
    });
    
    saveData();
    input.value = '';
    renderDayWorkouts(day);
    updateWorkoutsDisplay();
    updateStats();
    showNotification('✅ Ćwiczenie dodane!', 'success');
}

function removeDayWorkout(day, id) {
    AppData.weeklyWorkouts[day] = AppData.weeklyWorkouts[day].filter(w => {
        // Remove by videoId or custom id
        return (w.videoId !== id) && (w.id !== id);
    });
    saveData();
    renderDayWorkouts(day);
    updateWorkoutsDisplay();
    updateStats();
    showNotification('🗑️ Workout usunięty', 'success');
}

function renderDayWorkouts(day) {
    const list = document.getElementById(`${day}WorkoutsList`);
    if (!list) return;
    
    list.innerHTML = '';
    
    const workouts = AppData.weeklyWorkouts[day] || [];
    workouts.forEach((workout) => {
        const item = document.createElement('div');
        item.className = 'day-task-item';
        
        // Check if it's YouTube or custom workout
        if (workout.videoId) {
            // YouTube workout
            const workoutId = workout.videoId;
            item.innerHTML = `
                <img src="https://img.youtube.com/vi/${workout.videoId}/default.jpg" alt="Thumbnail" style="width: 60px; height: 45px; border-radius: 4px; object-fit: cover;">
                <span class="day-task-text" style="flex: 1;">▶️ YouTube video</span>
                <button class="btn-remove-day-task" onclick="removeDayWorkout('${day}', '${workoutId}')">🗑️</button>
            `;
        } else if (workout.id && workout.name) {
            // Custom workout
            const workoutId = workout.id;
            item.innerHTML = `
                <div style="width: 60px; height: 45px; background: var(--primary-color); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">💪</div>
                <span class="day-task-text" style="flex: 1;">${workout.name}</span>
                <button class="btn-remove-day-task" onclick="removeDayWorkout('${day}', '${workoutId}')">🗑️</button>
            `;
        }
        
        list.appendChild(item);
    });
}

function renderAllDayWorkouts() {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    days.forEach(day => renderDayWorkouts(day));
}

// ========== RULES SYSTEM ==========

function initRules() {
    // Zawsze upewnij się, że struktura rules istnieje, ale NIGDY nie nadpisuj istniejących zasad użytkownika.
    // Wersja zasad służy głównie do migracji, a nie do kasowania danych edytowanych przez użytkownika.
    const RULES_VERSION = 2;
    const defaultRules = [
        { id: 'movement', title: 'Ruch', content: 'Codzienny zaplanowany ruch, minumum 7000 kroków dziennie.' },
        { id: 'diet', title: 'Dieta', content: 'Codziennie zdrowy posiłek, zakaz kupowania słodyczy, jeden cheat meal w tygodniu, deficyt kaloryczny.' },
        { id: 'water', title: 'Woda', content: 'Picie większej ilości wody niż dotychczas, rozpoczęcie dnia od wody.' },
        { id: 'sleep', title: 'Sen', content: 'Minimum 7 godzin snu, pobudka około 8:30' },
        { id: 'development', title: 'Rozwój', content: 'Ograniczenia tik toka i instagrama, regularne słuchanie książek, szydełkowanie, pisanie itp.' }
    ];

    const hasCustomRules = Array.isArray(AppData.settings.rules) && AppData.settings.rules.length > 0;
    if (!hasCustomRules) {
        AppData.settings.rules = [...defaultRules];
    }

    const currentRulesVersion = Number(AppData.settings.rulesVersion);
    const versionMissing = AppData.settings.rulesVersion === undefined || AppData.settings.rulesVersion === null || Number.isNaN(currentRulesVersion);
    if (versionMissing || currentRulesVersion < RULES_VERSION) {
        AppData.settings.rulesVersion = RULES_VERSION;
        saveData();
    }
    
    // Initialize rulesAccepted flag if not present
    if (AppData.settings.rulesAccepted === undefined) {
        AppData.settings.rulesAccepted = false;
        saveData();
    }
    
    renderRulesView();
    
    // Accept rules button handler in Rules tab
    const btnAcceptRulesView = document.getElementById('btnAcceptRulesView');
    if (btnAcceptRulesView) {
        btnAcceptRulesView.addEventListener('click', () => {
            AppData.settings.rulesAccepted = true;
            checkBadges();
            saveData();
            renderRulesView();
            
            // Show start button and hide warning
            const startBtn = document.getElementById('startChallengeBtn');
            const warning = document.getElementById('rulesWarning');
            if (startBtn) startBtn.style.display = 'block';
            if (warning) warning.remove();
            
            showNotification('✅ Zasady zaakceptowane! Możesz teraz rozpocząć wyzwanie!', 'success');
        });
    }
    
    // Accept rules button handler in Modal
    const btnAcceptRules = document.getElementById('btnAcceptRules');
    if (btnAcceptRules) {
        btnAcceptRules.addEventListener('click', acceptRules);
    }
}

function showRulesModal() {
    const modal = document.getElementById('rulesModal');
    const modalList = document.getElementById('rulesModalList');
    
    if (!modal || !modalList) return;
    
    // Render rules in modal
    let html = '';
    AppData.settings.rules.forEach(rule => {
        html += `
            <div class="rule-item" style="background: var(--hover-bg); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                <h3 style="margin: 0 0 0.5rem 0; color: var(--primary-color);">${rule.title}</h3>
                <p style="margin: 0; line-height: 1.6;">${rule.content}</p>
            </div>
        `;
    });
    
    modalList.innerHTML = html;
    modal.style.display = 'flex';
}

function acceptRules() {
    AppData.settings.rulesAccepted = true;
    checkBadges();
    saveData();
    
    const modal = document.getElementById('rulesModal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    // Show start button and hide warning after accepting rules
    const startBtn = document.getElementById('startChallengeBtn');
    const warning = document.getElementById('rulesWarning');
    if (startBtn) startBtn.style.display = 'block';
    if (warning) warning.style.display = 'none';
    
    showNotification('✅ Zasady zaakceptowane! Możesz teraz rozpocząć wyzwanie klikając przycisk na stronie głównej!', 'success');
}

function renderRulesView() {
    const rulesList = document.getElementById('rulesList');
    if (!rulesList) return;
    
    let html = '';
    
    // Render rules without edit buttons (read-only)
    AppData.settings.rules.forEach((rule, index) => {
        html += `
            <div class="rule-card" style="background: var(--card-bg); padding: 1.5rem; border-radius: 12px; margin-bottom: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <h3 style="margin: 0 0 0.8rem 0; color: var(--primary-color); font-size: 1.2rem;">${rule.title}</h3>
                <p style="margin: 0; line-height: 1.8; font-size: 1rem; color: var(--text-primary);">${rule.content}</p>
            </div>
        `;
    });
    
    rulesList.innerHTML = html;
    
    // Update accept button and status
    const btnAccept = document.getElementById('btnAcceptRulesView');
    const statusText = document.getElementById('rulesAcceptStatus');
    
    if (btnAccept && statusText) {
        if (AppData.settings.rulesAccepted) {
            statusText.innerHTML = '✅ <strong>Zasady zostały zaakceptowane!</strong>';
            statusText.style.color = 'var(--primary-color)';
            btnAccept.style.display = 'none';
        } else {
            statusText.innerHTML = '⚠️ Musisz zaakceptować zasady aby rozpocząć wyzwanie';
            statusText.style.color = '#ff9800';
            btnAccept.style.display = 'inline-block';
        }
    }
}

function renderRulesSettings() {
    const rulesSettingsList = document.getElementById('rulesSettingsList');
    if (!rulesSettingsList) return;
    
    let html = '';
    
    // Render rules with edit buttons (editable)
    AppData.settings.rules.forEach((rule, index) => {
        html += `
            <div class="rule-card" style="background: var(--hover-bg); padding: 1.5rem; border-radius: 12px; margin-bottom: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                    <h3 style="margin: 0; color: var(--primary-color); font-size: 1.2rem;">${rule.title}</h3>
                    <button class="btn-edit-rule" onclick="editRuleSetting(${index})" style="background: transparent; border: none; cursor: pointer; font-size: 1.2rem; padding: 0.25rem 0.5rem;">✏️</button>
                </div>
                <p id="ruleSettingContent-${index}" style="margin: 0; line-height: 1.8; font-size: 1rem;">${rule.content}</p>
                <textarea id="ruleSettingEdit-${index}" style="display: none; width: 100%; min-height: 80px; padding: 0.8rem; border: 2px solid var(--primary-color); border-radius: 8px; font-family: inherit; font-size: 1rem; background: var(--card-bg); color: var(--text-primary); resize: vertical;">${rule.content}</textarea>
                <div id="ruleSettingButtons-${index}" style="display: none; margin-top: 1rem; gap: 0.5rem; flex-direction: row;">
                    <button onclick="saveRuleSetting(${index})" style="padding: 0.5rem 1rem; background: var(--primary-color); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 0.9rem;">💾 Zapisz</button>
                    <button onclick="cancelEditRuleSetting(${index})" style="padding: 0.5rem 1rem; background: #999; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 0.9rem;">❌ Anuluj</button>
                </div>
            </div>
        `;
    });
    
    rulesSettingsList.innerHTML = html;
}

function editRuleSetting(index) {
    const content = document.getElementById(`ruleSettingContent-${index}`);
    const edit = document.getElementById(`ruleSettingEdit-${index}`);
    const buttons = document.getElementById(`ruleSettingButtons-${index}`);
    
    if (content && edit && buttons) {
        content.style.display = 'none';
        edit.style.display = 'block';
        buttons.style.display = 'flex';
    }
}

function saveRuleSetting(index) {
    const edit = document.getElementById(`ruleSettingEdit-${index}`);
    if (!edit) return;
    
    const newContent = edit.value.trim();
    if (newContent) {
        AppData.settings.rules[index].content = newContent;
        saveData();
        renderRulesSettings();
        renderRulesView(); // Update view tab too
        showNotification('✅ Zasada zaktualizowana', 'success');
    }
}

function cancelEditRuleSetting(index) {
    const content = document.getElementById(`ruleSettingContent-${index}`);
    const edit = document.getElementById(`ruleSettingEdit-${index}`);
    const buttons = document.getElementById(`ruleSettingButtons-${index}`);
    
    if (content && edit && buttons) {
        edit.value = AppData.settings.rules[index].content; // Reset to original
        content.style.display = 'block';
        edit.style.display = 'none';
        buttons.style.display = 'none';
    }
}

// Old functions for backward compatibility - now redirects to settings versions
function editRule(index) {
    editRuleSetting(index);
}

function saveRule(index) {
    saveRuleSetting(index);
}

function cancelEditRule(index) {
    cancelEditRuleSetting(index);
}