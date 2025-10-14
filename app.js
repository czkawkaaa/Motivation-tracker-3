// 🌸 Kawaii Quest - Complete JavaScript Application

// ======================
// DATA STORAGE
// ======================
const AppData = {
    challenge: {
        currentDay: 0,
        totalDays: 75,
        completedDays: []
    },
    streak: 0,
    steps: {},
    mood: {},
    studyHours: {},
    tasks: [
        "Rano: 5 minut stretchingu",
        "15 minut aktywności",
        "Wieczorny dziennik"
    ],
    completedTasks: {},
    gallery: [],
    badges: {},
    settings: {
        theme: 'pink',
        font: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        challengeLength: 75,
        stepsGoal: 25000,
        studyGoal: 100,
        restDay: 'none',
        countRestDays: false,
        soundEnabled: true,
        volume: 70
    }
};

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
    "Jesteś JEDNĄ decyzją od zmiany życia! 🔄"
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
    
    updateAllDisplays();
    startQuoteRotation();
    
    // Sprawdź czy jest zaplanowany reset danych
    checkScheduledReset();
});

// ======================
// DATA MANAGEMENT
// ======================
function loadData() {
    const saved = localStorage.getItem('kawaiiQuestData');
    if (saved) {
        const data = JSON.parse(saved);
        Object.assign(AppData, data);
    }
    applySettings();
}

function saveData() {
    localStorage.setItem('kawaiiQuestData', JSON.stringify(AppData));
    checkBadges();
}

function getTodayKey() {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

function isRestDay() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const restDay = AppData.settings.restDay;
    return restDay !== 'none' && parseInt(restDay) === dayOfWeek;
}

function isRestDayForDate(dateString) {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    const restDay = AppData.settings.restDay;
    return restDay !== 'none' && parseInt(restDay) === dayOfWeek;
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
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.dataset.theme;
            setTheme(theme);
            AppData.settings.theme = theme;
            saveData();
        });
    });
}

function setTheme(themeName) {
    const body = document.body;
    const themeClasses = ['theme-pink', 'theme-ocean', 'theme-mint', 'theme-lavender', 'theme-strawberry'];
    
    themeClasses.forEach(cls => body.classList.remove(cls));
    body.classList.add(`theme-${themeName}`);
    
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === themeName);
    });
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
        const steps = parseInt(stepsInput.value) || 0;
        AppData.steps[getTodayKey()] = steps;
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
            moodButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedMood = btn.dataset.mood;
        });
    });
    
    saveMoodBtn.addEventListener('click', () => {
        if (selectedMood) {
            AppData.mood[getTodayKey()] = selectedMood;
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
        const hours = parseFloat(studyHoursInput.value) || 0;
        AppData.studyHours[getTodayKey()] = hours;
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
            "Rano: 5 minut stretchingu",
            "15 minut aktywności",
            "Wieczorny dziennik"
        ];
    }
    
    renderTasks();
    
    // Edit tasks button
    editTasksBtn.addEventListener('click', () => {
        const isVisible = taskEditSection.style.display !== 'none';
        taskEditSection.style.display = isVisible ? 'none' : 'block';
        
        if (!isVisible) {
            renderEditTasks();
        }
    });
    
    // Save tasks
    saveTasksBtn.addEventListener('click', () => {
        const editItems = document.querySelectorAll('.edit-task-item input[type="text"]');
        AppData.tasks = Array.from(editItems).map(input => input.value).filter(val => val.trim());
        saveData();
        renderTasks();
        taskEditSection.style.display = 'none';
        showNotification('💾 Zadania zapisane!', 'success');
    });
    
    // Add task
    addTaskBtn.addEventListener('click', () => {
        const newTask = newTaskInput.value.trim();
        if (newTask) {
            AppData.tasks.push(newTask);
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
        const today = getTodayKey();
        const wasCompleted = AppData.challenge.completedDays.includes(today);
        
        const taskCheckboxes = document.querySelectorAll('.task-checkbox');
        taskCheckboxes.forEach(cb => {
            cb.checked = false;
            cb.closest('.task-item').classList.remove('completed');
        });
        
        // Remove day from completed if it was there
        if (wasCompleted) {
            const index = AppData.challenge.completedDays.indexOf(today);
            if (index > -1) {
                AppData.challenge.completedDays.splice(index, 1);
                AppData.challenge.currentDay = Math.max(0, AppData.challenge.currentDay - 1);
            }
            // Recalculate streak
            calculateStreak();
            showNotification('⚠️ Dzień został cofnięty. Ukończ zadania ponownie aby przywrócić streak!', 'warning');
        }
        
        updateTasksData();
        updateAllDisplays();
    });
    
    completeAllTasksBtn.addEventListener('click', () => {
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
            const today = getTodayKey();
            if (!AppData.challenge.completedDays.includes(today)) {
                AppData.challenge.completedDays.push(today);
                AppData.challenge.currentDay++;
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
    
    AppData.tasks.forEach((task, index) => {
        const label = document.createElement('label');
        label.className = 'task-item';
        label.innerHTML = `
            <input type="checkbox" class="task-checkbox" data-index="${index}">
            <span class="task-text">${task}</span>
        `;
        
        const checkbox = label.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => {
            label.classList.toggle('completed', checkbox.checked);
            updateTasksData();
            if (checkbox.checked) {
                checkDayCompletion();
            }
        });
        
        tasksList.appendChild(label);
    });
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
            AppData.tasks.splice(index, 1);
            renderEditTasks();
        });
        
        editTasksList.appendChild(div);
    });
}

function updateTasksData() {
    const taskCheckboxes = document.querySelectorAll('.task-checkbox');
    const completed = Array.from(taskCheckboxes).filter(cb => cb.checked).length;
    AppData.completedTasks[getTodayKey()] = completed;
    saveData();
}

function handleChallengeCompletion() {
    // Ustaw znacznik czasu ukończenia wyzwania
    const completionTime = Date.now();
    const resetTime = completionTime + (60 * 60 * 1000); // 1 godzina później
    
    AppData.challenge.completionTime = completionTime;
    AppData.challenge.resetScheduled = resetTime;
    
    saveData();
    
    // Pokaż specjalny modal z gratulacjami i informacją o czasie
    showChallengeCompletionModal();
    
    // Dodatkowe confetti na ukończenie wyzwania
    createConfetti();
    setTimeout(createConfetti, 300);
    setTimeout(createConfetti, 600);
    
    // Ustaw timer na reset danych
    scheduleDataReset();
}

function showChallengeCompletionModal() {
    const modal = document.createElement('div');
    modal.className = 'completion-modal';
    modal.innerHTML = `
        <div class="completion-modal-content">
            <div class="completion-header">
                <h2>🎊 GRATULACJE! 🎊</h2>
                <p class="completion-title">Ukończyłeś 75-dniowe wyzwanie!</p>
            </div>
            
            <div class="completion-body">
                <div class="completion-icon">👑</div>
                <p class="completion-message">
                    To niesamowite osiągnięcie! Jesteś prawdziwą legendą! 🌟
                </p>
                
                <div class="completion-warning">
                    <p><strong>⏰ WAŻNE:</strong></p>
                    <p>Twoje dane historyczne (kroki, nastroje, nauka) oraz <strong>wszystkie odznaki</strong> zostaną automatycznie zresetowane za <strong>1 godzinę</strong>.</p>
                    <p>Masz czas aby pobrać raport ze swoimi osiągnięciami!</p>
                </div>
                
                <div class="completion-timer">
                    <p>Czas do resetu:</p>
                    <div id="resetCountdown" class="countdown-display">59:59</div>
                </div>
                
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
    
    // Start countdown
    updateResetCountdown();
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
    
    showNotification('♻️ Historia danych i odznaki zostały zresetowane. Możesz rozpocząć nowy cykl!', 'success');
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
    const today = getTodayKey();
    const taskCheckboxes = document.querySelectorAll('.task-checkbox');
    const allCompleted = Array.from(taskCheckboxes).every(cb => cb.checked);
    
    if (allCompleted && AppData.tasks.length > 0 && !AppData.challenge.completedDays.includes(today)) {
        AppData.challenge.completedDays.push(today);
        AppData.challenge.currentDay++;
        
        // Sprawdź czy wyzwanie zostało ukończone
        if (AppData.challenge.currentDay >= AppData.challenge.totalDays) {
            handleChallengeCompletion();
        }
        
        calculateStreak();
        saveData();
        updateAllDisplays();
        showNotification('🎉 Dzień ukończony! Świetna robota!', 'success');
        
        // Trigger confetti animation
        createConfetti();
    }
}

function calculateStreak() {
    const sorted = AppData.challenge.completedDays.sort().reverse();
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < sorted.length; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(checkDate.getDate() - i);
        const checkKey = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
        
        if (sorted.includes(checkKey)) {
            streak++;
        } else {
            break;
        }
    }
    
    AppData.streak = streak;
}

function updateAllDisplays() {
    updateChallengeProgress();
    updateStreakDisplay();
    updateTodaySteps();
    updateTodayMood();
}

function updateChallengeProgress() {
    const percent = (AppData.challenge.currentDay / AppData.challenge.totalDays) * 100;
    document.getElementById('challengeProgressBar').style.width = percent + '%';
    document.getElementById('challengePercent').textContent = Math.round(percent) + '%';
    document.getElementById('challengeDays').textContent = `${AppData.challenge.currentDay}/${AppData.challenge.totalDays} dni`;
}

function updateStreakDisplay() {
    document.getElementById('streakNumber').textContent = AppData.streak;
}

function updateTodaySteps() {
    const steps = AppData.steps[getTodayKey()] || 0;
    document.getElementById('stepsInput').value = steps || '';
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
        const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
        document.getElementById('motivationalQuote').textContent = `"${randomQuote}"`;
    }, 15000);
}

// ======================
// CALENDAR
// ======================
let currentCalendarDate = new Date();

function initCalendar() {
    document.getElementById('prevMonth').addEventListener('click', () => {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
        renderCalendar();
    });
    
    document.getElementById('nextMonth').addEventListener('click', () => {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
        renderCalendar();
    });
    
    renderCalendar();
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
    
    // Calculate which days have streak
    const sortedDays = AppData.challenge.completedDays.sort();
    const streakDays = new Set();
    
    for (let i = 0; i < sortedDays.length; i++) {
        const currentDate = new Date(sortedDays[i]);
        if (i === 0) {
            streakDays.add(sortedDays[i]);
        } else {
            const prevDate = new Date(sortedDays[i - 1]);
            const dayDiff = (currentDate - prevDate) / (1000 * 60 * 60 * 24);
            if (dayDiff === 1 || (dayDiff === 2 && isRestDayForDate(sortedDays[i - 1]))) {
                streakDays.add(sortedDays[i]);
                if (streakDays.has(sortedDays[i - 1])) {
                    streakDays.add(sortedDays[i]);
                }
            } else {
                streakDays.clear();
                streakDays.add(sortedDays[i]);
            }
        }
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dayKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day';
        dayDiv.textContent = day;
        
        // Check if rest day
        if (isRestDayForDate(dayKey)) {
            dayDiv.classList.add('rest');
        }
        
        if (dayKey === today) {
            dayDiv.classList.add('today');
        }
        
        if (AppData.challenge.completedDays.includes(dayKey)) {
            dayDiv.classList.add('completed');
        }
        
        // Add streak indicator
        if (streakDays.has(dayKey)) {
            dayDiv.classList.add('has-streak');
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
}

function updateStepsChart() {
    const todaySteps = AppData.steps[getTodayKey()] || 0;
    const goal = AppData.settings.stepsGoal;
    const percent = Math.min((todaySteps / goal) * 100, 100);
    
    const circle = document.getElementById('stepsCircle');
    const circumference = 2 * Math.PI * 80;
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    
    document.getElementById('stepsPercent').textContent = Math.round(percent) + '%';
    document.getElementById('stepsLabel').textContent = `${todaySteps.toLocaleString()}/${goal.toLocaleString()}`;
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
        const percent = (count / maxCount) * 100;
        
        if (barItems[index]) {
            const barFill = barItems[index].querySelector('.bar-fill');
            const barValue = barItems[index].querySelector('.bar-value');
            barFill.style.height = percent + '%';
            barValue.textContent = count;
        }
    });
}

function updateStudyChart() {
    // Calculate total hours and goal
    const totalHours = Object.values(AppData.studyHours).reduce((sum, h) => sum + h, 0);
    const goal = AppData.settings.studyGoal;
    const percent = Math.min((totalHours / goal) * 100, 100);
    
    const circle = document.getElementById('studyCircle');
    if (!circle) return;
    
    const circumference = 2 * Math.PI * 80;
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    
    document.getElementById('studyPercent').textContent = Math.round(percent) + '%';
    document.getElementById('studyLabel').textContent = `${totalHours.toFixed(1)}/${goal}h`;
}

// ======================
// GALLERY
// ======================
function initGallery() {
    const uploadBtn = document.getElementById('uploadBtn');
    const photoInput = document.getElementById('photoInput');
    
    uploadBtn.addEventListener('click', () => {
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
    if (AppData.streak >= 30) {
        unlockBadge('30-day-streak');
    }
    
    // === ZADANIA ===
    const completedAllCount = Object.values(AppData.completedTasks).filter(count => count >= 3).length;
    if (completedAllCount >= 1) {
        unlockBadge('task-beginner');
    }
    if (completedAllCount >= 10) {
        unlockBadge('task-master');
    }
    if (completedAllCount >= 30) {
        unlockBadge('task-legend');
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
    
    // === GALERIA ===
    if (AppData.gallery.length >= 10) {
        unlockBadge('photographer');
    }
    if (AppData.gallery.length >= 50) {
        unlockBadge('memory-keeper');
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
    
    // Pokaż powiadomienie o nowych odznakach
    if (newlyUnlocked.length > 0) {
        showBadgeNotification(newlyUnlocked);
    }
    
    updateBadgesDisplay();
}

function showBadgeNotification(badgeIds) {
    // Prosta notyfikacja
    const badgeNames = badgeIds.map(id => {
        const card = document.querySelector(`[data-badge="${id}"]`);
        return card ? card.querySelector('h3').textContent : id;
    });
    
    alert(`🎉 Nowa odznaka!\n\n${badgeNames.join('\n')}`);
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
    // Theme select
    const themeSelect = document.getElementById('themeSelect');
    themeSelect.value = AppData.settings.theme;
    themeSelect.addEventListener('change', (e) => {
        setTheme(e.target.value);
        AppData.settings.theme = e.target.value;
        saveData();
    });
    
    // Font select
    const fontSelect = document.getElementById('fontSelect');
    fontSelect.value = AppData.settings.font;
    fontSelect.addEventListener('change', (e) => {
        setFont(e.target.value);
        AppData.settings.font = e.target.value;
        saveData();
    });
    
    // Custom color
    const customColor = document.getElementById('customColor');
    customColor.addEventListener('change', (e) => {
        document.documentElement.style.setProperty('--primary-color', e.target.value);
    });
    
    // Challenge length
    const challengeLength = document.getElementById('challengeLength');
    challengeLength.value = AppData.settings.challengeLength;
    challengeLength.addEventListener('change', (e) => {
        AppData.settings.challengeLength = parseInt(e.target.value);
        AppData.challenge.totalDays = parseInt(e.target.value);
        saveData();
        updateAllDisplays();
    });
    
    // Steps goal
    const stepsGoal = document.getElementById('stepsGoal');
    stepsGoal.value = AppData.settings.stepsGoal;
    stepsGoal.addEventListener('change', (e) => {
        AppData.settings.stepsGoal = parseInt(e.target.value);
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
    
    // Rest day
    const restDay = document.getElementById('restDay');
    restDay.value = AppData.settings.restDay;
    restDay.addEventListener('change', (e) => {
        AppData.settings.restDay = e.target.value;
        saveData();
    });
    
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
    });
    
    // Volume slider
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeValue = document.getElementById('volumeValue');
    volumeSlider.value = AppData.settings.volume;
    volumeValue.textContent = AppData.settings.volume + '%';
    volumeSlider.addEventListener('input', (e) => {
        AppData.settings.volume = parseInt(e.target.value);
        volumeValue.textContent = e.target.value + '%';
        saveData();
    });
    
    // Reset button
    const resetAllBtn = document.getElementById('resetAllBtn');
    resetAllBtn.addEventListener('click', () => {
        if (confirm('⚠️ Czy na pewno chcesz zresetować cały postęp? Ta akcja jest nieodwracalna!')) {
            if (confirm('🚨 Ostatnie ostrzeżenie! Wszystkie dane zostaną usunięte bezpowrotnie!')) {
                localStorage.clear();
                location.reload();
            }
        }
    });
    
    // Export data button
    const exportDataBtn = document.getElementById('exportDataBtn');
    exportDataBtn.addEventListener('click', () => {
        exportDataAsHTML();
    });
}

function applySettings() {
    setTheme(AppData.settings.theme);
    setFont(AppData.settings.font);
    AppData.challenge.totalDays = AppData.settings.challengeLength;
}

function setFont(fontFamily) {
    document.documentElement.style.setProperty('--font-family', fontFamily);
}

// ======================
// UTILITIES
// ======================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
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
    const now = new Date().toLocaleDateString('pl-PL');
    
    // Calculate statistics
    const totalSteps = Object.values(data.steps).reduce((sum, val) => sum + val, 0);
    const totalStudyHours = Object.values(data.studyHours).reduce((sum, val) => sum + val, 0);
    const completedDays = data.challenge.completedDays.length;
    const completionRate = ((completedDays / data.challenge.totalDays) * 100).toFixed(1);
    const currentStreak = data.challenge.currentStreak || 0;
    const longestStreak = data.challenge.longestStreak || 0;
    
    // Count unlocked badges
    const unlockedBadges = Object.values(data.badges).filter(b => b.unlocked).length;
    const totalBadges = Object.keys(data.badges).length;
    
    // Get mood statistics
    const moodEntries = Object.entries(data.mood);
    const moodCounts = {};
    moodEntries.forEach(([_, mood]) => {
        moodCounts[mood] = (moodCounts[mood] || 0) + 1;
    });
    
    // Generate HTML
    const html = `
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kawaii Quest - Raport Postępów</title>
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
            padding: 3rem;
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
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
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
        
        footer {
            text-align: center;
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 2px solid #ffe0ef;
            color: #666;
        }
        
        @media print {
            body {
                background: white;
                padding: 0;
            }
            
            .container {
                box-shadow: none;
                padding: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🌸 Kawaii Quest 🌸</h1>
            <p class="date">Raport wygenerowany: ${now}</p>
        </header>
        
        <section>
            <h2>📊 Podsumowanie</h2>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value">${completedDays}</div>
                    <div class="stat-label">Dni ukończone</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${completionRate}%</div>
                    <div class="stat-label">Postęp wyzwania</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${currentStreak}</div>
                    <div class="stat-label">Aktualna passa</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${longestStreak}</div>
                    <div class="stat-label">Najdłuższa passa</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${totalSteps.toLocaleString('pl-PL')}</div>
                    <div class="stat-label">Łącznie kroków</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${totalStudyHours.toFixed(1)}</div>
                    <div class="stat-label">Godzin nauki</div>
                </div>
            </div>
        </section>
        
        <section>
            <h2>🏆 Odznaki (${unlockedBadges}/${totalBadges})</h2>
            <div class="badge-grid">
                ${generateBadgesHTML(data.badges)}
            </div>
        </section>
        
        <section>
            <h2>📝 Zadania</h2>
            <ul class="task-list">
                ${data.tasks.map(task => `<li class="task-item">${task}</li>`).join('')}
            </ul>
        </section>
        
        <section>
            <h2>😊 Statystyki nastroju</h2>
            <div class="mood-stats">
                ${Object.entries(moodCounts).map(([mood, count]) => `
                    <div class="mood-item">
                        <div class="mood-emoji">${mood}</div>
                        <div>${count} dni</div>
                    </div>
                `).join('')}
            </div>
        </section>
        
        ${data.gallery.length > 0 ? `
        <section>
            <h2>📸 Galeria (${data.gallery.length} zdjęć)</h2>
            <div class="gallery-grid">
                ${data.gallery.slice(0, 20).map(photo => `
                    <div class="gallery-item">
                        <img src="${photo.url}" alt="${photo.date}">
                    </div>
                `).join('')}
            </div>
            ${data.gallery.length > 20 ? `<p style="margin-top: 1rem; color: #666;">... i ${data.gallery.length - 20} więcej zdjęć</p>` : ''}
        </section>
        ` : ''}
        
        <footer>
            <p>Made with 💖</p>
            <p style="margin-top: 0.5rem; font-size: 0.9rem;">
                Aby zapisać jako PDF: Naciśnij Ctrl+P (lub Cmd+P na Mac) i wybierz "Zapisz jako PDF"
            </p>
        </footer>
    </div>
</body>
</html>
    `;
    
    // Helper function to generate badges HTML
    function generateBadgesHTML(badges) {
        const badgeInfo = {
            'steps-5k': { name: '5K Kroków', icon: '👟' },
            'steps-10k': { name: '10K Kroków', icon: '🏃' },
            'steps-50k': { name: '50K Kroków', icon: '🎯' },
            'steps-100k': { name: '100K Kroków', icon: '⭐' },
            'steps-250k': { name: '250K Kroków', icon: '🏆' },
            'mood-week': { name: 'Tydzień nastrojów', icon: '😊' },
            'mood-month': { name: 'Miesiąc nastrojów', icon: '🌟' },
            'study-10h': { name: '10h Nauki', icon: '📚' },
            'study-50h': { name: '50h Nauki', icon: '🎓' },
            'study-100h': { name: '100h Nauki', icon: '🏅' },
            'task-week': { name: 'Tydzień zadań', icon: '✅' },
            'task-month': { name: 'Miesiąc zadań', icon: '💪' },
            'streak-7': { name: '7 dni z rzędu', icon: '🔥' },
            'streak-30': { name: '30 dni z rzędu', icon: '🌈' },
            'photos-10': { name: '10 zdjęć', icon: '📷' },
            'photos-50': { name: '50 zdjęć', icon: '🎨' },
            'early-bird': { name: 'Ranny ptaszek', icon: '🌅' },
            'night-owl': { name: 'Nocny marek', icon: '🦉' },
            'perfectionist': { name: 'Perfekcjonista', icon: '💯' },
            'explorer': { name: 'Odkrywca', icon: '🗺️' },
            'champion': { name: 'Mistrz', icon: '👑' },
            'legend': { name: 'Legenda', icon: '⚡' }
        };
        
        return Object.entries(badges).map(([id, badge]) => {
            const info = badgeInfo[id] || { name: id, icon: '🏅' };
            const unlocked = badge.unlocked ? 'unlocked' : '';
            return `
                <div class="badge-item ${unlocked}">
                    <div class="badge-icon">${info.icon}</div>
                    <div class="badge-name">${info.name}</div>
                </div>
            `;
        }).join('');
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
    URL.revokeObjectURL(url);
    
    showNotification('📥 Raport został pobrany! Otwórz plik i naciśnij Ctrl+P aby zapisać jako PDF', 'success');
}

