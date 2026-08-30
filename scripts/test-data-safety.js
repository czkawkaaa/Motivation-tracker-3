import assert from 'node:assert/strict';
import { isMeaningfulData, normalizeAppData, createDefaultAppData } from './data-safety.js';

function run() {
  const empty = {};
  assert.equal(isMeaningfulData(empty), false, 'Puste dane powinny być uznane jako puste');

  const defaultData = createDefaultAppData();
  assert.equal(isMeaningfulData(defaultData), true, 'Domyślne dane powinny być uznane jako sensowne');
  assert.ok(Array.isArray(defaultData.tasks), 'Domyślne zadania powinny być tablicą');

  const data = normalizeAppData({
    challenge: { completedDays: ['2025-01-01', '2025-01-01'], currentDay: 2 },
    steps: { '2025-01-01': 5000 },
    completedTasks: { '2025-01-01': [0, 1] },
    settings: { theme: 'pink' }
  });

  const settingsOnly = {
    settings: {
      studyEnabled: false,
      restDay: '2',
      restDays: ['2', '5'],
      countRestDays: true
    }
  };

  const normalizedSettingsOnly = normalizeAppData(settingsOnly);

  assert.equal(isMeaningfulData(settingsOnly), true, 'Same ustawienia powinny być zapisane jako sensowne dane');
  assert.deepEqual(normalizedSettingsOnly.settings.restDays, ['2', '5'], 'Powinno zachować wiele dni odpoczynku');
  assert.equal(data.challenge.completedDays.length, 1, 'Powinno usunąć duplikaty dat');
  assert.equal(typeof data.lastModified, 'number', 'Powinien dodać timestamp');
  assert.equal(data.settings.theme, 'pink', 'Powinien zachować ustawienia');

  console.log('✅ Testy danych przeszły pomyślnie');
}

run();
