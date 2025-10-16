// Test smartMergeData behavior
function smartMergeData(local, cloud, cloudLastModified = 0) {
    if (!local) return cloud || {};
    if (!cloud) return local;

    const merged = { ...local };

    function mergeMaps(key) {
        merged[key] = merged[key] || {};
        const localMap = local[key] || {};
        const cloudMap = cloud[key] || {};
        const allKeys = Array.from(new Set([...Object.keys(localMap), ...Object.keys(cloudMap)]));
        allKeys.forEach(k => {
            const lv = localMap[k];
            const cv = cloudMap[k];
            if (lv === undefined) merged[key][k] = cv;
            else if (cv === undefined) merged[key][k] = lv;
            else {
                if ((local.lastModified || 0) > (cloudLastModified || 0)) merged[key][k] = lv;
                else merged[key][k] = cv;
            }
        });
    }

    ['steps', 'studyHours', 'mood', 'completedTasks'].forEach(k => mergeMaps(k));

    const localDays = Array.isArray(local.challenge?.completedDays) ? local.challenge.completedDays : [];
    const cloudDays = Array.isArray(cloud.challenge?.completedDays) ? cloud.challenge.completedDays : [];
    const mergedDays = Array.from(new Set([...localDays, ...cloudDays])).sort();
    merged.challenge = merged.challenge || {};
    merged.challenge.completedDays = mergedDays;

    merged.challenge.currentDay = (local.challenge?.currentDay || 0);
    if (cloud.challenge?.currentDay && cloudLastModified > (local.lastModified || 0)) {
        merged.challenge.currentDay = cloud.challenge.currentDay;
    }
    merged.challenge.totalDays = cloud.challenge?.totalDays || local.challenge?.totalDays || merged.challenge.totalDays || 75;

    merged.tasks = cloud.tasks || local.tasks;

    merged.badges = { ...(local.badges || {}), ...(cloud.badges || {}) };
    merged.gallery = Array.isArray(local.gallery) || Array.isArray(cloud.gallery)
        ? Array.from(new Set([...(local.gallery || []), ...(cloud.gallery || [])]))
        : (cloud.gallery || local.gallery);

    merged.settings = { ...(local.settings || {}), ...(cloud.settings || {}) };

    merged.streak = cloud.streak ?? local.streak;
    merged.lastModified = Math.max(local.lastModified || 0, cloud.lastModified || 0, Date.now());

    return merged;
}

const local = {
    lastModified: 1697450000000,
    steps: { '2025-10-14': 5000, '2025-10-15': 3000 },
    studyHours: { '2025-10-14': 1.5 },
    completedTasks: { '2025-10-14': [0,1], '2025-10-15': [0] },
    challenge: { currentDay: 10, completedDays: ['2025-10-14'] },
    tasks: ["a","b","c"],
    badges: { b1: { unlocked: true } },
    settings: { stepsGoal: 20000 }
};

const cloud = {
    lastModified: 1697455000000,
    steps: { '2025-10-15': 4000, '2025-10-16': 2000 },
    studyHours: { '2025-10-15': 0.5 },
    completedTasks: { '2025-10-15': [0,2], '2025-10-16': [1] },
    challenge: { currentDay: 11, completedDays: ['2025-10-15'] },
    tasks: ["a","b","c","d"],
    badges: { b2: { unlocked: true } },
    settings: { stepsGoal: 25000 }
};

console.log('LOCAL\n', JSON.stringify(local, null, 2));
console.log('CLOUD\n', JSON.stringify(cloud, null, 2));

const merged = smartMergeData(local, cloud, cloud.lastModified);
console.log('\nMERGED\n', JSON.stringify(merged, null, 2));
