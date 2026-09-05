import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

// Regression: users already mid-challenge whose `challenge.completedDays` got
// wiped (by the old timezone bug or a bad cloud merge) should have their
// progress rebuilt from the per-day `completedTasks` checkboxes on next load,
// instead of permanently showing 0/X.

const source = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8');
const today = new Date();
const iso = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const start = new Date(today);
start.setDate(today.getDate() - 3);
const dayPlus = (n) => {
  const d = new Date(start);
  d.setDate(d.getDate() + n);
  return iso(d);
};

const storageData = JSON.stringify({
  challenge: {
    startDate: iso(start),
    currentDay: 4,
    totalDays: 31,
    completedDays: [] // wiped, simulating the reported bug
  },
  settings: {
    challengeLength: 31,
    restDay: 'none',
    restDays: [],
    rulesAccepted: true,
    theme: 'pink',
    challengeName: 'Kawaii Quest'
  },
  tasks: ['a', 'b', 'c'],
  completedTasks: {
    [dayPlus(0)]: [0, 1, 2],
    [dayPlus(1)]: [0, 1, 2],
    [dayPlus(2)]: [0, 1] // partially done, should NOT be recovered
  },
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
    querySelector() { return null; }
  };
}

const context = {
  console,
  setInterval() {},
  clearInterval() {},
  setTimeout(fn) { if (typeof fn === 'function') fn(); return 0; },
  alert() {},
  localStorage: {
    getItem(key) { return key === 'kawaiiQuestData' ? storageData : null; },
    setItem() {}
  },
  document: {
    body: makeNode(),
    head: { appendChild() {} },
    documentElement: { style: { setProperty() {} } },
    addEventListener() {},
    createElement() { return makeNode(); },
    getElementById() { return makeNode(); },
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
    navigator: { serviceWorker: { register() { return Promise.resolve({ addEventListener() {}, update() { return Promise.resolve(); }, getRegistration() { return Promise.resolve(); } }); }, addEventListener() {} } },
    addEventListener() {}
  },
  navigator: { serviceWorker: { register() { return Promise.resolve({ addEventListener() {}, update() { return Promise.resolve(); }, getRegistration() { return Promise.resolve(); } }); }, addEventListener() {} } }
};

vm.createContext(context);
const app = vm.runInContext(`(function() { ${source}; return { AppData, loadData }; })()`, context);
app.loadData();

assert.deepEqual(
  Array.from(app.AppData.challenge.completedDays),
  [dayPlus(0), dayPlus(1)],
  'fully completed past days must be recovered from completedTasks even if completedDays was wiped'
);
assert.ok(
  !app.AppData.challenge.completedDays.includes(dayPlus(2)),
  'partially completed days must not be recovered as completed'
);

console.log('challenge-recovery regression test passed');
