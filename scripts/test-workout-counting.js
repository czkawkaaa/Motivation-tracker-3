import assert from 'node:assert/strict';
import { normalizeCompletedWorkoutEntries, countCompletedWorkouts } from './workout-stats.js';

const mixedData = {
  '2026-08-24': ['video_1', 'custom_8'],
  '2026-08-25': 'video_2',
  '2026-08-26': ['custom_4', 'custom_4', 'video_3'],
  '2026-08-27': 1,
};

assert.deepEqual(normalizeCompletedWorkoutEntries(mixedData['2026-08-24']), ['video_1', 'custom_8']);
assert.deepEqual(normalizeCompletedWorkoutEntries(mixedData['2026-08-25']), ['video_2']);
assert.equal(countCompletedWorkouts(mixedData), 6);

console.log('workout counting tests passed');
