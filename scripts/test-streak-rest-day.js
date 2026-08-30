import assert from 'node:assert/strict';

function buildStreak(completedDays, restDay, todayKey = '2026-08-31') {
  const sorted = [...completedDays].sort().reverse();
  const today = new Date(todayKey + 'T12:00:00');
  const latestCompletedDate = new Date(sorted[0] + 'T12:00:00');
  const daysSinceLastCompleted = Math.floor((today - latestCompletedDate) / (1000 * 60 * 60 * 24));

  if (daysSinceLastCompleted > 1) return 0;

  let streak = 1;
  let currentDate = latestCompletedDate;

  for (let i = 1; i < sorted.length; i++) {
    const prevDate = new Date(sorted[i] + 'T12:00:00');
    const diff = Math.floor((currentDate - prevDate) / (1000 * 60 * 60 * 24));

    if (diff === 1) {
      streak++;
      currentDate = prevDate;
      continue;
    }

    if (diff === 2) {
      const skippedDate = new Date(currentDate);
      skippedDate.setDate(skippedDate.getDate() - 1);
      const skippedKey = skippedDate.toISOString().slice(0, 10);
      const restDayOfWeek = new Date(skippedKey + 'T12:00:00').getDay();
      if (restDay === String(restDayOfWeek) && skippedKey) {
        streak++;
        currentDate = prevDate;
        continue;
      }
    }

    break;
  }

  return streak;
}

const restDay = '0';
assert.equal(buildStreak(['2026-08-31', '2026-08-29'], restDay, '2026-08-31'), 2, 'rest day should extend streak across skipped day');
assert.equal(buildStreak(['2026-08-31', '2026-08-28'], restDay, '2026-08-31'), 1, 'ordinary gap should still break the streak');
console.log('streak rest-day test passed');
