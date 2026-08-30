export function normalizeCompletedWorkoutEntries(value) {
  if (Array.isArray(value)) {
    return Array.from(new Set(value
      .filter(item => item !== null && item !== undefined && item !== '')
      .map(item => String(item).trim())
      .filter(Boolean)));
  }

  if (value === null || value === undefined || value === '') {
    return [];
  }

  return [String(value).trim()].filter(Boolean);
}

export function countCompletedWorkouts(data) {
  if (!data || typeof data !== 'object') return 0;
  return Object.values(data).reduce((sum, dailyWorkouts) => sum + normalizeCompletedWorkoutEntries(dailyWorkouts).length, 0);
}
