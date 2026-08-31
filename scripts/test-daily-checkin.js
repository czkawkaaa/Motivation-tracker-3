import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8');
const storage = new Map();
const modals = [];

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
    createElement() { return { style: {}, classList: { add() {}, remove() {} }, setAttribute() {}, appendChild() {} }; },
    getElementById() { return { addEventListener() {} }; },
    querySelector() { return null; },
    querySelectorAll() { return []; }
  },
  window: { AudioContext: null, webkitAudioContext: null, AppI18N: { translateExact(text) { return text; }, getCurrentLanguage() { return 'pl'; } }, addEventListener() {} },
  navigator: {}
};

vm.createContext(context);
const app = vm.runInContext(`(function() { ${source}; return { checkDailyLogin, getTodayKey }; })()`, context);
const today = app.getTodayKey();

app.checkDailyLogin();
assert.equal(storage.get('kawaiiQuestLastLogin'), today, 'first visit should record today');
assert.equal(modals.length, 1, 'first visit should display the check-in popup');

app.checkDailyLogin();
assert.equal(modals.length, 1, 'a second visit on the same day should not display another popup');

storage.set('kawaiiQuestLastLogin', '2000-01-01');
app.checkDailyLogin();
assert.equal(modals.length, 2, 'a new day should display the popup again');

console.log('daily check-in popup tests passed');