import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8');
const createdElements = [];
const storage = new Map();
const reportThemeProperties = {
  '--primary-color': '#4fc3f7',
  '--bg-gradient-start': '#f0fbff',
  '--bg-gradient-end': '#e3f7ff'
};
let exportedHtml = '';

class FakeBlob {
  constructor(parts) { exportedHtml = parts.join(''); }
}

class FakeElement {
  constructor(tagName = 'div') {
    this.tagName = tagName;
    this.children = [];
    this.listeners = {};
    this.style = {};
    this.attributes = {};
    this.className = '';
    this.textContent = '';
    this.value = '';
    this.hidden = false;
    this.checked = false;
    this.open = false;
    this.classList = { add() {}, remove() {}, toggle() {} };
    createdElements.push(this);
  }

  addEventListener(type, listener) { this.listeners[type] = listener; }
  append(...nodes) { this.children.push(...nodes); }
  appendChild(node) { this.children.push(node); return node; }
  replaceChildren(...nodes) { this.children = [...nodes]; }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  focus() {}
  click() {}
  reset() {}
  removeChild() {}
  showModal() { this.open = true; }
  close() {
    this.open = false;
    this.listeners.close?.({ target: this });
  }
  dispatch(type) {
    const event = { target: this, preventDefault() {} };
    this.listeners[type]?.(event);
  }
}

const elements = new Map();
const getElement = (id) => {
  if (!elements.has(id)) elements.set(id, new FakeElement());
  return elements.get(id);
};
getElement('rewardFormWrap').hidden = true;
getElement('rewardMainGoalForm').hidden = true;

const context = {
  console,
  Date,
  Math,
  setInterval() {},
  clearInterval() {},
  setTimeout() {},
  localStorage: {
    getItem(key) { return storage.get(key) || null; },
    setItem(key, value) { storage.set(key, String(value)); }
  },
  document: {
    body: new FakeElement('body'),
    head: new FakeElement('head'),
    documentElement: { style: { setProperty() {} } },
    addEventListener() {},
    createElement(tagName) { return new FakeElement(tagName); },
    getElementById: getElement,
    querySelectorAll() { return []; },
    querySelector() { return null; }
  },
  window: {
    AppI18N: { translateExact(text) { return text; }, getCurrentLanguage() { return 'pl'; } },
    confirm() { return true; },
    open() { return null; },
    addEventListener() {}
  },
  Blob: FakeBlob,
  getComputedStyle() {
    return { getPropertyValue(name) { return reportThemeProperties[name] || ''; } };
  },
  URL: { createObjectURL() { return 'blob:report-test'; }, revokeObjectURL() {} },
  navigator: { serviceWorker: { register() { return Promise.resolve({}); }, addEventListener() {} } }
};

vm.createContext(context);
const app = vm.runInContext(
  `(function() { ${source}; return { AppData, initRewards, exportDataAsHTML }; })()`,
  context
);
app.initRewards();
getElement('editRewardMainGoalBtn').dispatch('click');
getElement('rewardMainGoalInput').value = 'Nauczyć się włoskiego';
getElement('rewardMainGoalForm').dispatch('submit');
assert.equal(app.AppData.rewardsGoal, 'Nauczyć się włoskiego', 'the main goal should be saved');
assert.equal(JSON.parse(storage.get('kawaiiQuestData')).rewardsGoal, 'Nauczyć się włoskiego', 'the main goal should persist locally');

getElement('addRewardBtn').dispatch('click');
getElement('rewardGoalInput').value = '-1 kg';
getElement('rewardPrizeInput').value = 'Nowa książka';
getElement('rewardForm').dispatch('submit');

assert.equal(app.AppData.rewards.length, 1, 'adding a goal should create a reward entry');
assert.equal(app.AppData.rewards[0].title, '-1 kg');
assert.equal(app.AppData.rewards[0].reward, 'Nowa książka');

let checkbox = createdElements.findLast(element => element.className === 'reward-complete-toggle');
checkbox.checked = true;
checkbox.dispatch('change');
assert.equal(getElement('rewardDateDialog').open, true, 'completing a goal should request a date');
getElement('rewardCompletedDate').value = '2026-09-15';
getElement('rewardDateForm').dispatch('submit');
assert.equal(app.AppData.rewards[0].completedAt, '2026-09-15', 'the selected achievement date should be saved');

let editButton = createdElements.findLast(element => element.className === 'reward-action-btn' && element.textContent === 'Edytuj');
editButton.dispatch('click');
getElement('rewardGoalInput').value = '-1.5 kg';
getElement('rewardPrizeInput').value = 'Nowe buty';
getElement('rewardForm').dispatch('submit');
assert.equal(app.AppData.rewards[0].title, '-1.5 kg', 'editing should update the goal');
assert.equal(app.AppData.rewards[0].reward, 'Nowe buty', 'editing should update the reward');
assert.equal(app.AppData.rewards[0].completedAt, '2026-09-15', 'editing should retain completion date');

const goalBody = createdElements.findLast(element => element.className === 'reward-item-body');
goalBody.dispatch('click');
assert.equal(app.AppData.rewards[0].completedAt, null, 'clicking a completed goal should immediately undo completion');

const deleteButton = createdElements.findLast(element => element.className === 'reward-action-btn reward-delete-btn');
deleteButton.dispatch('click');
assert.equal(app.AppData.rewards.length, 0, 'deleting should remove the goal and its reward');
assert.equal(JSON.parse(storage.get('kawaiiQuestData')).rewards.length, 0, 'the final list should be persisted locally');

app.AppData.rewards = [{
  id: 'report-test',
  title: '<img src=x onerror="alert(1)">',
  reward: 'A & B',
  completedAt: '2026-09-15'
}];
app.AppData.rewardsGoal = 'Cel <główny>';
app.AppData.challenge.startDate = '2026-09-01';
app.AppData.challenge.currentDay = 7;
app.AppData.challenge.totalDays = 75;
app.AppData.challenge.completedDays = ['2026-09-01', '2026-09-02'];
app.AppData.mood = { '2026-09-01': 5, '2026-09-02': 4, '2026-09-03': 3 };
app.AppData.completedTasks = {
  '2026-09-01': [0, 1, 2],
  '2026-09-02': [0],
  '2026-09-03': []
};
app.AppData.steps = { '2026-09-01': 8500, '2026-09-02': 6000 };
app.AppData.studyHours = { '2026-09-01': 2, '2026-09-02': 1.5 };
app.AppData.reflections = {
  '2026-09-04': { question: 'Co poszło dobrze?', answer: '<script>alert(1)</script>\nUdało mi się odpocząć.' },
  '2026-09-03': 'Starsza notatka'
};
app.AppData.settings.stepsGoal = 15000;
app.AppData.settings.studyGoal = 10;
context.window.AppI18N = null;
app.exportDataAsHTML();
assert.ok(exportedHtml.includes('&lt;img src=x onerror=&quot;alert(1)&quot;&gt;'), 'report should escape custom goal text');
assert.ok(exportedHtml.includes('A &amp; B'), 'report should escape custom reward text');
assert.ok(exportedHtml.includes('Cel &lt;główny&gt;'), 'report should include and escape the main goal');
assert.ok(exportedHtml.includes('15.09.2026'), 'report should include the formatted achievement date');
assert.ok(exportedHtml.includes('--report-primary: #4fc3f7;'), 'report accents should use the active theme color');
assert.ok(exportedHtml.includes('--report-background-start: #f0fbff;'), 'report background should use the active theme');
assert.ok(!exportedHtml.includes('#ff9ac2'), 'report should not keep the default pink styling when another theme is active');
assert.ok(exportedHtml.includes('class="report-charts-section"'), 'report should include a statistics and charts section');
assert.ok(exportedHtml.includes('<svg class="report-donut"'), 'report should render print-friendly inline pie charts');
assert.ok(exportedHtml.includes('Rozkład nastroju'), 'report charts should include mood distribution');
assert.ok(exportedHtml.includes('Realizacja zadań'), 'report charts should include task completion breakdown');
assert.ok(exportedHtml.includes('Cel kroków') && exportedHtml.includes('Cel nauki'), 'report charts should include progress toward activity goals');
assert.ok(exportedHtml.includes('data-report-order="12"'), 'badge details should be ordered at the end of the report');
assert.ok(exportedHtml.includes('data-report-order="6"') && exportedHtml.includes('Co poszło dobrze?'), 'report should include reflections after activity history');
assert.ok(exportedHtml.includes('&lt;script&gt;alert(1)&lt;/script&gt;<br>Udało mi się odpocząć.'), 'report should escape reflection text and preserve its line breaks');
assert.ok(exportedHtml.includes('Starsza notatka'), 'report should retain older plain-text reflections');
assert.ok(exportedHtml.includes('<th style="text-align: left;">Refleksja</th>'), 'activity history should show which days include a reflection');
assert.ok(source.includes("sort((a, b) => Number(a.dataset.reportOrder) - Number(b.dataset.reportOrder))"), 'report sections should be sorted into summary-first order');

console.log('rewards feature tests passed');