import assert from 'node:assert/strict';
import fs from 'node:fs';

const app = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8');
const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../styles.css', import.meta.url), 'utf8');
const i18n = fs.readFileSync(new URL('../i18n.js', import.meta.url), 'utf8');

const themes = {
  'misty-greens': ['#D1EDE1', '#7BC5AE', '#028C6A', '#003E19'],
  'subdued-succulent': ['#D1DDDB', '#85B8CB', '#1D6A96', '#283B42'],
  'turkish-delight': ['#B78338', '#915C4C', '#40686A', '#2F1812'],
  'bold-ballerinas': ['#FFA289', '#6A92CC', '#706FAB', '#50293C'],
  'foggy-fairytale': ['#FDDCEF', '#D5C5E9', '#3A5A69', '#030923'],
  'neon-doll': ['#EAC1DB', '#A1268E', '#9D1E31', '#2C0136'],
  'autumn-muse': ['#CC5B3B', '#982827', '#92617E', '#3C1832']
};

for (const [name, colors] of Object.entries(themes)) {
  assert.match(html, new RegExp(`<option value="${name}">`), `${name} should be selectable in settings`);
  assert.ok(app.includes(`'theme-${name}'`), `${name} should be removed when another theme is applied`);
  assert.ok(css.includes(`.theme-${name} {`), `${name} should define its theme variables`);

  for (const color of colors) {
    assert.ok(css.toLowerCase().includes(color.toLowerCase()), `${name} should use palette color ${color}`);
  }
}

for (const [name, english, italian] of [
  ['misty-greens', 'Misty Greens 🍃', 'Verdi velati 🍃'],
  ['subdued-succulent', 'Subdued Succulent 🪴', 'Succulente dai toni tenui 🪴'],
  ['turkish-delight', 'Turkish Delight ☕', 'Delizia turca ☕'],
  ['bold-ballerinas', 'Bold Ballerinas 🩰', 'Ballerine audaci 🩰'],
  ['foggy-fairytale', 'Foggy Fairytale 🦢', 'Fiaba nella nebbia 🦢'],
  ['neon-doll', 'Neon Doll 💖', 'Bambola neon 💖'],
  ['autumn-muse', 'Autumn Muse 🍂', 'Ispirazione autunnale 🍂']
]) {
  assert.ok(i18n.includes(`'${name}': { pl:`), `${name} should have a localized theme label`);
  assert.ok(i18n.includes(`en: '${english}'`), `${name} should have an English theme label`);
  assert.ok(i18n.includes(`it: '${italian}'`), `${name} should have an Italian theme label`);
}

assert.ok(!html.includes('✨ Nowe palety kolorów'), 'theme list should not call out new color palettes');
assert.ok(!i18n.includes('New color palettes'), 'theme translations should not include a new palettes label');

for (const [name, colors] of Object.entries(themes)) {
  for (const selector of [`.theme-${name} .app-header {`, `.theme-${name} .btn-primary {`]) {
    const ruleStart = css.indexOf(selector);
    const ruleEnd = css.indexOf('}', ruleStart);
    assert.notEqual(ruleStart, -1, `${name} should style ${selector}`);
    const gradient = css.slice(ruleStart, ruleEnd).match(/background:\s*linear-gradient\([^)]*\)/);
    assert.ok(gradient, `${name} ${selector} should combine multiple colors`);
    const gradientColors = gradient[0].match(/#[\da-f]{6}/gi) || [];
    assert.ok(gradientColors.length >= 2, `${name} ${selector} should use at least two palette colors`);
    assert.ok(
      gradientColors.every(color => colors.includes(color.toUpperCase())),
      `${name} ${selector} should only use colors from its source palette`
    );
  }
}

for (const selector of [
  '.reflection-modal-content',
  '.calendar-day-modal-content',
  '.completion-modal-content',
  '.rules-modal-content',
  '.rewards-date-dialog',
  '.workout-modal-close'
]) {
  const ruleStart = css.indexOf(`${selector} {`);
  const ruleEnd = css.indexOf('}', ruleStart);
  assert.notEqual(ruleStart, -1, `${selector} should have a theme-aware style rule`);
  assert.ok(css.slice(ruleStart, ruleEnd).includes('var(--'), `${selector} should use active theme variables`);
}

assert.ok(app.includes("'success': typeof getComputedStyle === 'function'"), 'success notifications should use the current theme color');
assert.ok(app.includes('var(--primary-color), var(--bg-gradient-end)'), 'daily check-in should use active theme variables');

console.log('theme palette tests passed');
