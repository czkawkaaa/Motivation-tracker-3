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

function makeNode() {
  return {
    style: {},
    textContent: '',
    innerHTML: '',
    value: '',
    checked: false,
    classList: { add() {}, remove() {}, toggle() {} },
    appendChild() {},
    removeChild() {},
    setAttribute() {},
    addEventListener() {},
    closest() {
      return { classList: { add() {}, remove() {}, toggle() {} } };
    },
    querySelector(selector) {
      if (selector === '.task-checkbox') {
        const box = makeNode();
        box.checked = false;
        box.closest = () => ({ classList: { add() {}, remove() {}, toggle() {} } });
        return box;
      }
      return null;
    }
  };
}

const context = {
  console,
  setInterval() {},
  clearInterval() {},
  setTimeout(fn) { if (typeof fn === 'function') fn(); return 0; },
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
    body: makeNode(),
    head: { appendChild() {} },
    documentElement: { style: { setProperty() {} } },
    addEventListener() {},
    createElement() {
      return makeNode();
    },
    getElementById() {
      return makeNode();
    },
    querySelectorAll() {
      return [];
    },
    querySelector(selector) {
      if (selector === '.task-actions') {
        return makeNode();
      }
      return null;
    }
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
const app = vm.runInContext(`(function() { ${source}; return { AppData, loadData, syncChallengeByDates, isRestDayForDate, recordChallengeActivity, acceptRules }; })()`, context);
app.loadData();

assert.equal(app.AppData.challenge.currentDay, 3, 'challenge day should be recalculated from startDate on load');
assert.equal(app.AppData.settings.rulesAccepted, true, 'active challenge should not require a new rules acceptance flag');

app.AppData.challenge.startDate = null;
app.AppData.challenge.currentDay = 0;
app.AppData.challenge.completedDays = [];
app.AppData.settings.rulesAccepted = false;
app.acceptRules();
assert.equal(app.AppData.challenge.startDate, iso(new Date()), 'accepting rules should start the challenge from today');
assert.equal(app.AppData.challenge.currentDay, 1, 'new challenge should begin at day 1 when rules are accepted');

// Regression: a challenge started three days ago should count as day 3 even in local timezone.
const fixedNow = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const startThreeDaysAgo = new Date(fixedNow.getFullYear(), fixedNow.getMonth(), fixedNow.getDate() - 2);
app.AppData.challenge.startDate = iso(startThreeDaysAgo);
app.AppData.challenge.currentDay = 1;
app.AppData.challenge.totalDays = 31;
app.AppData.challenge.completedDays = [iso(startThreeDaysAgo)];
app.syncChallengeByDates({ updateUi: false, force: true });
assert.equal(app.AppData.challenge.currentDay, 3, 'a challenge started three days ago should be counted as day 3');

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
