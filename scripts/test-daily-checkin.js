import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8');
const storage = new Map();
const modals = [];
const reflectionInput = { value: '', addEventListener() {} };
let saveCheckin;

const context = {
  console,
  Math,
  Date,
  setTimeout() {},
  setInterval() {},
  clearTimeout() {},
  localStorage: {
    getItem(key) { return storage.get(key) ?? null; },
    setItem(key, value) { storage.set(key, String(value)); }
  },
  document: {
    body: { appendChild(node) { modals.push(node); }, classList: { add() {}, remove() {} }, style: {} },
    head: { appendChild() {} },
    documentElement: { style: { setProperty() {} } },
    addEventListener() {},
    createElement() { return { style: {}, classList: { add() {}, remove() {} }, setAttribute() {}, appendChild() {}, remove() {} }; },
    getElementById(id) {
      if (id === 'dailyReflectionInput') return reflectionInput;
      if (id === 'dailyReflectionCount') return { textContent: '' };
      if (id === 'dailyCheckinBtn') return { addEventListener(_, handler) { saveCheckin = handler; } };
      return null;
    },
    querySelector() { return null; },
    querySelectorAll() { return []; }
  },
  window: { AudioContext: null, webkitAudioContext: null, AppI18N: { translateExact(text) { return text; }, getCurrentLanguage() { return 'pl'; } }, addEventListener() {} },
  navigator: {}
};

vm.createContext(context);
const app = vm.runInContext(`(function() { ${source}; return { AppData, checkDailyLogin, getTodayKey, getDaySummary }; })()`, context);
const today = app.getTodayKey();
app.AppData.settings.soundEnabled = false;

app.checkDailyLogin();
assert.equal(storage.get('kawaiiQuestLastLogin'), today, 'first visit should record today');
assert.equal(modals.length, 1, 'first visit should display the check-in popup');

reflectionInput.value = 'To byla krotka refleksja o moim dniu.';
saveCheckin();
const savedData = JSON.parse(storage.get('kawaiiQuestData'));
assert.equal(savedData.reflections[today].answer, reflectionInput.value, 'saving the popup should store today\'s reflection');

app.checkDailyLogin();
assert.equal(modals.length, 1, 'a second visit on the same day should not display another popup');

storage.set('kawaiiQuestLastLogin', '2000-01-01');
app.checkDailyLogin();
assert.equal(modals.length, 2, 'a new day should display the popup again');

app.AppData.tasks = ['a', 'b'];
app.AppData.settings.restDays = [];
app.AppData.completedTasks = { [today]: [0, 1] };
assert.equal(app.getDaySummary(today).status, 'ukończony', 'all tasks should mark a day complete');

app.AppData.completedTasks[today] = [0];
assert.equal(app.getDaySummary(today).status, 'częściowy', 'one completed task should mark a day partial');

app.AppData.completedTasks[today] = [];
assert.equal(app.getDaySummary(today).status, 'nieudany', 'no completed tasks should mark a day missed');

app.AppData.settings.restDays = [String(new Date(today + 'T12:00:00').getDay())];
assert.equal(app.getDaySummary(today).status, 'odpoczynek', 'a configured rest day should override task status');

console.log('daily check-in popup tests passed');