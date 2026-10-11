import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8');
const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

assert.equal((html.match(/<main>/g) || []).length, 1, 'page should have one main container');
assert.equal((html.match(/<\/main>/g) || []).length, 1, 'main container should close exactly once');
const mainStart = html.indexOf('<main>');
const mainEnd = html.indexOf('</main>');
assert.ok(html.indexOf('<div class="view active" id="view-dashboard">') > mainStart, 'dashboard should be inside main');
assert.ok(html.indexOf('id="view-settings"') < mainEnd, 'settings should be inside main');
assert.equal((html.match(/id="dateIndicator"/g) || []).length, 1, 'dashboard date indicator should exist exactly once');
assert.equal((html.match(/class="date-indicator-content"/g) || []).length, 1, 'date indicator content should have one wrapper');
assert.ok(html.indexOf('</main>') < html.indexOf('<dialog id="rewardDateDialog"'), 'reward dialog should follow main');
assert.equal((html.match(/<script src="i18n\.js"/g) || []).length, 1, 'i18n should load only once');

function makeElement(view = null) {
  const classes = new Set();
  return {
    dataset: view ? { view } : {},
    classList: {
      add(name) { classes.add(name); },
      remove(name) { classes.delete(name); },
      contains(name) { return classes.has(name); },
      toggle(name, force) {
        const shouldAdd = force === undefined ? !classes.has(name) : force;
        if (shouldAdd) classes.add(name);
        else classes.delete(name);
        return shouldAdd;
      }
    },
    addEventListener(type, listener) { this.listeners[type] = listener; },
    listeners: {}
  };
}

const settingsLink = makeElement('settings');
const dashboardView = makeElement();
dashboardView.id = 'view-dashboard';
dashboardView.classList.add('active');
const settingsView = makeElement();
settingsView.id = 'view-settings';
const mainNav = makeElement();

const context = {
  console,
  Date,
  Math,
  setInterval() {},
  clearInterval() {},
  document: {
    addEventListener() {},
    createElement() { return { style: {}, set textContent(value) {}, appendChild() {} }; },
    head: { appendChild() {} },
    body: { appendChild() {} },
    querySelectorAll(selector) {
      if (selector === '.nav-link') return [settingsLink];
      if (selector === '.view') return [dashboardView, settingsView];
      return [];
    },
    querySelector(selector) {
      if (selector === '.main-nav') return mainNav;
      return null;
    },
    getElementById(id) {
      return id === 'view-settings' ? settingsView : null;
    }
  },
  window: { addEventListener() {} },
  navigator: {}
};

vm.createContext(context);
const app = vm.runInContext(
  `(function() { ${source}; return { initNavigation }; })()`,
  context
);

app.initNavigation();
let defaultPrevented = false;
settingsLink.listeners.click({ preventDefault() { defaultPrevented = true; } });

assert.equal(defaultPrevented, true, 'navigation should prevent the placeholder link');
assert.equal(settingsView.classList.contains('active'), true, 'settings view should become active without Web Audio');
assert.equal(dashboardView.classList.contains('active'), false, 'previous view should be hidden');
assert.equal(settingsLink.classList.contains('active'), true, 'clicked navigation link should become active');

console.log('navigation works without Web Audio');