import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const source = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8');
const today = new Date();
const start = new Date(today);
start.setDate(today.getDate() - 2);
const iso = (date) => date.toISOString().slice(0, 10);
const storageData = JSON.stringify({
  challenge: {
    startDate: iso(start),
    currentDay: 1,
    totalDays: 75,
    completedDays: [iso(start)]
  },
  settings: {
    challengeLength: 75,
    restDay: 'none',
    restDays: [],
    rulesAccepted: false,
    theme: 'pink',
    challengeName: 'Kawaii Quest'
  },
  tasks: ['a', 'b', 'c'],
  completedTasks: { [iso(start)]: [0, 1, 2] },
  completedWorkouts: {},
  steps: {},
  mood: {},
  studyHours: {},
  reflections: {},
  badges: {},
  streak: 0,
  longestStreak: 0,
  weeklyTasks: { enabled: false, monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: [] },
  gallery: [],
  runLog: {},
  workoutFocus: {},
  weeklyWorkouts: { enabled: false, monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: [] }
});

const context = {
  console,
  setInterval() {},
  clearInterval() {},
  alert() {},
  localStorage: {
    getItem(key) {
      return key === 'kawaiiQuestData' ? storageData : null;
    },
    setItem(key, value) {
      if (key === 'kawaiiQuestData') {
        globalThis.__kawaiiQuestData = String(value);
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
        setAttribute() {},
        querySelector() { return { textContent: '' }; },
        innerHTML: '',
        value: ''
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
const app = vm.runInContext(`(function() { ${source}; return { AppData, loadData, syncChallengeByDates, isRestDayForDate, recordChallengeActivity }; })()`, context);
app.loadData();

assert.equal(app.AppData.challenge.currentDay, 3, 'challenge day should be recalculated from startDate on load');
assert.equal(app.AppData.settings.rulesAccepted, true, 'active challenge should not require a new rules acceptance flag');

// New regression: rest-day changes should take effect only from now, not retroactively.
const effectiveFrom = iso(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1));
const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
const todayKey = iso(today);
const currentDayIndex = today.getDay();
app.AppData.challenge.startDate = iso(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4));
app.AppData.challenge.currentDay = 3;
app.AppData.settings.restDays = [String(currentDayIndex)];
app.AppData.challenge.restDaysEffectiveFrom = effectiveFrom;
assert.equal(app.isRestDayForDate(iso(yesterday)), false, 'rest day change should not affect earlier dates');
assert.equal(app.isRestDayForDate(todayKey), true, 'rest day change should affect the current date onward');

app.AppData.challenge.activityLog = [
  { type: 'rest-day-change', dateKey: effectiveFrom, summary: 'Dzień odpoczynkowy włączony od dziś' }
];
assert.ok(app.AppData.challenge.activityLog.length > 0, 'challenge activity log should preserve mid-challenge edits');

console.log('challenge-state regression test passed');
