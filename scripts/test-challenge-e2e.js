import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

// Full end-to-end simulation of a real user session across several days:
// start a challenge, complete tasks each day, "reload the app" (loadData)
// every morning like a real PWA reload, and check the numbers shown on
// screen never regress. This is the exact scenario reported by users
// (start 31.08, check progress a few days later).

const RealDate = Date;
const source = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8');
const storage = new Map();
const elements = new Map();
let fakeNow = new RealDate(2026, 7, 31, 9, 0, 0); // 31 Aug 2026, 09:00 local

// Mirrors what renderTasks() would produce in a real browser: checkbox state
// always reflects the saved completedTasks for the currently active date.
function currentCheckboxStates() {
  const todayKey = app.getTodayKey();
  const total = app.AppData.tasks.length;
  const completed = new Set(app.AppData.completedTasks[todayKey] || []);
  return Array.from({ length: total }, (_, i) => completed.has(i));
}

function getElement(id) {
  if (!elements.has(id)) {
    elements.set(id, {
      id,
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
      closest() { return { classList: { add() {}, remove() {}, toggle() {} } }; },
      querySelector() { return null; },
      querySelectorAll() { return []; }
    });
  }
  return elements.get(id);
}

function makeNode() {
  return {
    style: {}, textContent: '', innerHTML: '', value: '', checked: false,
    classList: { add() {}, remove() {}, toggle() {} },
    appendChild() {}, removeChild() {}, remove() {}, setAttribute() {}, addEventListener() {},
    closest() { return { classList: { add() {}, remove() {}, toggle() {} } }; },
    querySelector(selector) {
      if (selector === '.task-checkbox') {
        const box = makeNode();
        box.checked = false;
        return box;
      }
      return null;
    }
  };
}

class FakeDate extends RealDate {
  constructor(...args) {
    if (args.length === 0) super(fakeNow.getTime());
    else super(...args);
  }
  static now() { return fakeNow.getTime(); }
}

const context = {
  console,
  Math,
  Date: FakeDate,
  setInterval() {},
  clearInterval() {},
  setTimeout(fn) { if (typeof fn === 'function') fn(); return 0; },
  alert() {},
  localStorage: {
    getItem(key) { return storage.has(key) ? storage.get(key) : null; },
    setItem(key, value) { storage.set(key, String(value)); }
  },
  document: {
    body: makeNode(),
    head: { appendChild() {} },
    documentElement: { style: { setProperty() {} } },
    addEventListener() {},
    createElement() { return makeNode(); },
    getElementById(id) { return getElement(id); },
    querySelectorAll(selector) {
      if (selector === '.task-checkbox') {
        return currentCheckboxStates().map(checked => {
          const node = makeNode();
          node.checked = checked;
          return node;
        });
      }
      return [];
    },
    querySelector(selector) {
      if (selector === '.task-actions') return makeNode();
      return null;
    }
  },
  window: {
    AppI18N: {
      apply() {}, setLanguage() {}, startObserver() {},
      translateExact(text) { return text; },
      getCurrentLanguage() { return 'pl'; },
      badgeTitle(id) { return id; }
    },
    navigator: {
      serviceWorker: {
        register() { return Promise.resolve({ addEventListener() {}, update() { return Promise.resolve(); }, getRegistration() { return Promise.resolve(); } }); },
        addEventListener() {}
      }
    },
    addEventListener() {}
  },
  navigator: {
    serviceWorker: {
      register() { return Promise.resolve({ addEventListener() {}, update() { return Promise.resolve(); }, getRegistration() { return Promise.resolve(); } }); },
      addEventListener() {}
    }
  }
};

vm.createContext(context);
const app = vm.runInContext(
  `(function() { ${source}; return { AppData, loadData, saveData, acceptRules, startChallenge, checkDayCompletion, getTodayKey, updateChallengeProgress, updateAllDisplays }; })()`,
  context
);

// Day 0: fresh install, accept rules and start the challenge today.
app.loadData();
app.AppData.settings.challengeLength = 31;
app.AppData.tasks = ['Zadanie A', 'Zadanie B', 'Zadanie C'];
app.acceptRules();
app.startChallenge();
assert.equal(app.AppData.challenge.startDate, '2026-08-31', 'challenge should start on the simulated day');
assert.equal(app.AppData.challenge.completedDays.length, 0, 'no days completed yet on day 0');

function simulateDay(dateOffset, completedTaskIndices, expectedCompletedCount, expectedCurrentDay) {
  fakeNow = new RealDate(2026, 7, 31 + dateOffset, 9, 0, 0);
  // Simulate reopening the PWA: reload from storage exactly like a real session.
  app.loadData();
  assert.equal(app.AppData.challenge.currentDay, expectedCurrentDay, `currentDay should be ${expectedCurrentDay} on day offset ${dateOffset}`);

  // Simulate the user ticking checkboxes: this is what updateTasksData() persists.
  app.AppData.completedTasks[app.getTodayKey()] = completedTaskIndices;
  app.checkDayCompletion();
  app.updateChallengeProgress();

  assert.equal(app.AppData.challenge.completedDays.length, expectedCompletedCount, `completedDays length should be ${expectedCompletedCount} after day offset ${dateOffset}`);
  assert.equal(getElement('challengeDays').textContent, `${expectedCompletedCount}/31 dni`, `progress label should show ${expectedCompletedCount}/31 on day offset ${dateOffset}`);
}

// Day 0 (31.08): complete all tasks.
simulateDay(0, [0, 1, 2], 1, 1);
// Day 1 (01.09): complete all tasks.
simulateDay(1, [0, 1, 2], 2, 2);
// Day 2 (02.09): only partially done - should not count.
simulateDay(2, [0, 2], 2, 3);
// Day 3 (03.09): reopening app after a partial day - progress must still show 2, not reset to 0.
fakeNow = new RealDate(2026, 8, 3, 9, 0, 0);
app.loadData();
app.updateChallengeProgress();
assert.equal(app.AppData.challenge.completedDays.length, 2, 'progress from earlier fully completed days must survive further reloads');
assert.equal(getElement('challengeDays').textContent, '2/31 dni', 'reported bug scenario: progress must not reset to 0/31 after a few days');
assert.equal(app.AppData.challenge.currentDay, 4, 'currentDay should track calendar days regardless of missed day');

console.log('challenge end-to-end regression test passed');
