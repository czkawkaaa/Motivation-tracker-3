function createDefaultAppData() {
  return {
    challenge: {
      currentDay: 0,
      totalDays: 75,
      completedDays: []
    },
    streak: 0,
    longestStreak: 0,
    steps: {},
    mood: {},
    studyHours: {},
    tasks: [
      'Codzienny trening',
      'Spacer minimum 20 minut',
      'Rozciąganie',
      'Sen - minimum 7 godzin',
      '10 minut czytania lub słuchania książki',
      'Jeden zdrowy posiłek domowy',
      'Zero słodzonych napojów',
      'Picie większej ilości wody'
    ],
    weeklyTasks: {
      enabled: false,
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    },
    completedTasks: {},
    completedWorkouts: {},
    gallery: [],
    badges: {},
    weeklyWorkouts: {
      enabled: false,
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    },
    settings: {
      theme: 'pink',
      font: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      challengeLength: 75,
      stepsGoal: 25000,
      studyGoal: 100,
      restDay: 'none',
      countRestDays: false,
      soundEnabled: true,
      volume: 70,
      workoutsEnabled: false,
      workouts: [],
      customWorkouts: [],
      workoutsGoal: 150,
      stepsEnabled: true,
      studyEnabled: true,
      rulesAccepted: false,
      rules: []
    },
    lastModified: Date.now()
  };
}

function normalizeDateKey(input) {
  if (!input) return null;
  if (input instanceof Date) {
    const d = input;
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  const parsed = new Date(input);
  if (Number.isNaN(parsed.getTime())) return null;
  return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}-${String(parsed.getDate()).padStart(2, '0')}`;
}

function isMeaningfulData(data) {
  if (!data || typeof data !== 'object') return false;
  const hasChallenge = Boolean(data.challenge && (Array.isArray(data.challenge.completedDays) || data.challenge.currentDay || data.challenge.totalDays));
  const hasSteps = Boolean(data.steps && Object.keys(data.steps).length > 0);
  const hasTasks = Boolean(Array.isArray(data.tasks) && data.tasks.length > 0);
  const hasCompleted = Boolean(data.completedTasks && Object.keys(data.completedTasks).length > 0);
  return hasChallenge || hasSteps || hasTasks || hasCompleted;
}

function normalizeAppData(data) {
  const base = createDefaultAppData();
  const normalized = typeof data === 'object' && data ? data : {};

  const merged = {
    ...base,
    ...normalized,
    challenge: {
      ...base.challenge,
      ...(normalized.challenge || {})
    },
    settings: {
      ...base.settings,
      ...(normalized.settings || {})
    },
    weeklyTasks: {
      ...base.weeklyTasks,
      ...(normalized.weeklyTasks || {})
    },
    weeklyWorkouts: {
      ...base.weeklyWorkouts,
      ...(normalized.weeklyWorkouts || {})
    }
  };

  if (Array.isArray(normalized.challenge?.completedDays)) {
    merged.challenge.completedDays = Array.from(new Set(normalized.challenge.completedDays
      .map(normalizeDateKey)
      .filter(Boolean))).sort();
  }

  ['steps', 'studyHours', 'mood', 'completedTasks'].forEach((key) => {
    if (normalized[key] && typeof normalized[key] === 'object') {
      merged[key] = {};
      Object.keys(normalized[key]).forEach((k) => {
        const nk = normalizeDateKey(k);
        if (!nk) return;
        if (key === 'completedTasks') {
          const uniqueValues = Array.from(new Set(Array.isArray(normalized[key][k]) ? normalized[key][k] : []));
      merged[key][nk] = uniqueValues.sort((a, b) => a - b);
        } else {
          merged[key][nk] = normalized[key][k];
        }
      });
    }
  });

  merged.lastModified = typeof normalized.lastModified === 'number' ? normalized.lastModified : Date.now();
  return merged;
}

export { createDefaultAppData, normalizeAppData, isMeaningfulData, normalizeDateKey };
