import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const source = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8');
const storage = {
  data: JSON.stringify({
    challenge: {
      currentDay: 1,
      totalDays: 75,
      completedDays: ['2026-08-30']
    },
    steps: { '2026-08-30': 12000 },
    mood: { '2026-08-30': 5 },
    completedTasks: { '2026-08-30': [0, 1, 2, 3] },
    completedWorkouts: {},
    gallery: [],
    settings: {
      language: 'pl',
      theme: 'pink',
      font: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      challengeName: 'Kawaii Quest',
      challengeLength: 75,
      stepsGoal: 25000,
      studyGoal: 100,
      restDay: 'none',
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
      rules: [],
      themesUsed: ['pink']
    },
    tasks: ['a', 'b', 'c'],
    streak: 0,
    longestStreak: 0,
    badges: {}
  })
};

const context = {
  console,
  setInterval() {},
  clearInterval() {},
  alert() {},
  localStorage: {
    getItem(key) {
      return key === 'kawaiiQuestData' ? storage.data : null;
    },
    setItem(key, value) {
      if (key === 'kawaiiQuestData') {
        storage.data = String(value);
      }
    }
  },
  document: {
    body: { classList: { remove() {}, add() {} }, style: {} },
    head: { appendChild() {} },
    documentElement: { style: { setProperty() {} } },
    addEventListener() {},
    createElement() {
      return {
        style: {},
        classList: { add() {}, remove() {}, toggle() {} },
        textContent: '',
        appendChild() {},
        setAttribute() {}
      };
    },
    getElementById() { return null; },
    querySelectorAll() { return []; },
    querySelector() { return null; }
  },
  window: {
    AppI18N: {
      apply() {},
      setLanguage() {},
      startObserver() {},
      translateExact(text) { return text; },
      getCurrentLanguage() { return 'pl'; },
      badgeTitle(id) { return id; }
    },
    navigator: {
      serviceWorker: {
        register() {
          return Promise.resolve({ addEventListener() {}, update() { return Promise.resolve(); }, getRegistration() { return Promise.resolve(); } });
        },
        addEventListener() {}
      }
    },
    addEventListener() {}
  },
  navigator: {
    serviceWorker: {
      register() {
        return Promise.resolve({ addEventListener() {}, update() { return Promise.resolve(); }, getRegistration() { return Promise.resolve(); } });
      },
      addEventListener() {}
    }
  }
};

vm.createContext(context);
const app = vm.runInContext(`(function() { ${source}; return { AppData, loadData, checkBadges }; })()`, context);

assert.ok(app.AppData, 'AppData should exist');
app.loadData();
assert.equal(app.AppData.streak, 1, 'streak should be recalculated after loading saved data');
assert.equal(app.AppData.badges['first-steps']?.unlocked, true, 'first-steps should unlock after loading saved data');
assert.equal(app.AppData.badges['task-beginner']?.unlocked, true, 'task-beginner should unlock after loading saved data');

storage.data = JSON.stringify({
  challenge: {
    currentDay: 1,
    totalDays: 75,
    completedDays: ['2026-08-31', '2026-08-30', '2026-08-29']
  },
  steps: { '2026-08-31': 12000 },
  mood: { '2026-08-31': 5 },
  completedTasks: { '2026-08-31': [0, 1, 2, 3] },
  completedWorkouts: {},
  gallery: [],
  settings: {
    language: 'pl',
    theme: 'pink',
    font: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    challengeName: 'Kawaii Quest',
    challengeLength: 75,
    stepsGoal: 25000,
    studyGoal: 100,
    restDay: 'none',
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
    rules: [],
    themesUsed: ['pink']
  },
  tasks: ['a', 'b', 'c'],
  streak: 0,
  longestStreak: 0,
  badges: {}
});

app.loadData();
assert.equal(app.AppData.streak, 3, 'streak should be calculated from completedDays history on load');

console.log('badge recalculation regression test passed');
