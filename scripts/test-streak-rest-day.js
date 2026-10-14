import assert from 'node:assert/strict';

function isGapAllowed(fromDate, toDate, restDay) {
  const start = fromDate instanceof Date ? new Date(fromDate.getTime()) : new Date(String(fromDate) + 'T12:00:00');
  const end = toDate instanceof Date ? new Date(toDate.getTime()) : new Date(String(toDate) + 'T12:00:00');
  if (end <= start) return true;

  const diffDays = Math.floor((end - start) / (1000 * 60 * 60 * 24));
  if (diffDays <= 1) return true;

  for (let offset = 1; offset < diffDays; offset++) {
    const candidateDate = new Date(start);
    candidateDate.setDate(candidateDate.getDate() + offset);
    const candidateKey = candidateDate.toISOString().slice(0, 10);
    const restDayOfWeek = new Date(candidateKey + 'T12:00:00').getDay();
    if (restDay !== String(restDayOfWeek)) {
      return false;
    }
  }

  return true;
}

function buildStreak(completedDays, restDay, todayKey = '2026-08-31') {
  const sorted = [...completedDays].sort().reverse();
  const today = new Date(todayKey + 'T12:00:00');
  const latestCompletedDate = new Date(sorted[0] + 'T12:00:00');

  if (!isGapAllowed(latestCompletedDate, today, restDay)) return 0;

  let streak = 1;
  let currentDate = latestCompletedDate;

  for (let i = 1; i < sorted.length; i++) {
    const prevDate = new Date(sorted[i] + 'T12:00:00');
    if (isGapAllowed(prevDate, currentDate, restDay)) {
      streak++;
      currentDate = prevDate;
      continue;
    }
    break;
  }

  return streak;
}

const restDay = '0';
assert.equal(buildStreak(['2026-08-31', '2026-08-29'], restDay, '2026-08-31'), 2, 'rest day should extend streak across skipped day');
assert.equal(buildStreak(['2026-08-29'], restDay, '2026-08-31'), 1, 'a rest day between the last completion and today should keep the streak alive');
assert.equal(buildStreak(['2026-08-31', '2026-08-28'], restDay, '2026-08-31'), 1, 'ordinary gap should still break the streak');
console.log('streak rest-day test passed');
