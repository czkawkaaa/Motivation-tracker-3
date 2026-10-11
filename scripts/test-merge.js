import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../firebase-sync.js', import.meta.url), 'utf8');
const functionStart = source.indexOf('function smartMergeData(');
const functionEnd = source.indexOf('\nfunction applySnapshotFromSource', functionStart);
assert.notEqual(functionStart, -1, 'production smartMergeData should be present');
assert.notEqual(functionEnd, -1, 'smartMergeData should end before snapshot application');

const context = vm.createContext({ Date });
const smartMergeData = vm.runInContext(
    `${source.slice(functionStart, functionEnd)}; smartMergeData;`,
    context
);

const local = {
    lastModified: 100,
    steps: {},
    studyHours: {},
    mood: {},
    completedTasks: {},
    completedWorkouts: {},
    reflections: {},
    runLog: {},
    workoutFocus: {},
    activityTimes: [],
    gallery: [],
    challenge: { currentDay: 1, totalDays: 30, cycleStartedAt: 200, completedDays: [] },
    tasks: ['a', 'b', 'c'],
    rewards: [{ id: 'local', title: 'Local goal', reward: 'Local prize' }],
    rewardsGoal: 'Local main goal',
    badges: {},
    streak: 0,
    longestStreak: 0,
    settings: { stepsGoal: 20000 }
};

const staleCloud = {
    lastModified: 300,
    steps: { '2026-08-29': 12000 },
    studyHours: { '2026-08-29': 4 },
    mood: { '2026-08-29': 1 },
    completedTasks: { '2026-08-29': [0, 1, 2] },
    completedWorkouts: { '2026-08-29': ['old-workout'] },
    reflections: { '2026-08-29': 'old reflection' },
    runLog: { '2026-08-29': { distance: 10 } },
    workoutFocus: { '2026-08-29': ['arms'] },
    activityTimes: [7, 18],
    gallery: ['old photo'],
    challenge: { currentDay: 10, totalDays: 75, cycleStartedAt: 100, completedDays: ['2026-08-29'] },
    tasks: ['a', 'b', 'c'],
    rewards: [{ id: 'cloud', title: 'Cloud goal', reward: 'Cloud prize' }],
    rewardsGoal: 'Cloud main goal',
    badges: { 'first-steps': { unlocked: true } },
    streak: 7,
    longestStreak: 10,
    settings: { stepsGoal: 25000 }
};

const resetMerged = smartMergeData(local, staleCloud, staleCloud.lastModified);
assert.equal(resetMerged.challenge.cycleStartedAt, 200, 'the newest challenge lifecycle should win over a newer stale snapshot');
assert.equal(resetMerged.challenge.currentDay, 1, 'the old challenge progress day must not return after reset');
assert.equal(resetMerged.challenge.totalDays, 30, 'the old challenge length must not override the new cycle');
for (const key of [
    'steps', 'studyHours', 'mood', 'completedTasks', 'completedWorkouts',
    'reflections', 'runLog', 'workoutFocus'
]) {
    assert.equal(JSON.stringify(resetMerged[key]), JSON.stringify(local[key]), `${key} from an older challenge must not return after reset`);
}
assert.deepEqual(resetMerged.activityTimes, [], 'old activity-time history must not return after reset');
assert.deepEqual(resetMerged.gallery, [], 'old photos must not return after reset');
assert.equal(Object.keys(resetMerged.badges).length, 0, 'unlocked badges from an older challenge must not return after reset');
assert.equal(resetMerged.streak, 0, 'the old streak must not return after reset');
assert.equal(resetMerged.longestStreak, 0, 'the old longest streak must not return after reset');

const sameCycleLocal = {
    lastModified: 100,
    challenge: { startDate: '2026-08-31', completedDays: ['2026-08-31'] },
    steps: { '2026-08-31': 5000 },
    badges: { 'first-steps': { unlocked: true } },
    gallery: ['local photo'],
    streak: 1
};
const sameCycleCloud = {
    lastModified: 200,
    challenge: { startDate: '2026-08-31', completedDays: [] },
    steps: { '2026-09-01': 6000 },
    badges: {},
    gallery: ['cloud photo'],
    streak: 2
};
const sameCycleMerged = smartMergeData(sameCycleLocal, sameCycleCloud, sameCycleCloud.lastModified);
assert.deepEqual([...sameCycleMerged.challenge.completedDays], ['2026-08-31'], 'same challenge must preserve completed days');
assert.equal(JSON.stringify(sameCycleMerged.steps), JSON.stringify({
    '2026-08-31': 5000,
    '2026-09-01': 6000
}), 'same challenge must continue merging daily stats');
assert.equal(Object.keys(sameCycleMerged.badges).length, 0, 'same-cycle badge state should still follow the newer snapshot');
assert.equal(sameCycleMerged.streak, 2, 'same-cycle streak should still use the larger value');
assert.deepEqual([...sameCycleMerged.gallery].sort(), ['cloud photo', 'local photo'], 'same-cycle photos should still merge');

const newCycleCloud = {
    lastModified: 300,
    challenge: { startDate: '2026-09-02', completedDays: [] }
};
const newCycleMerged = smartMergeData(sameCycleLocal, newCycleCloud, newCycleCloud.lastModified);
assert.deepEqual(newCycleMerged.challenge.completedDays, [], 'new challenge cycle must not inherit old completed days');
console.log('challenge merge regression tests passed');
