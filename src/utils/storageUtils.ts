import { UserStats, MistakeItem, Exam, GradeLevel } from '../types';

const STATS_KEY = 'educs_user_stats_v1';
const MISTAKES_KEY = 'educs_mistakes_v1';
const CUSTOM_EXAMS_KEY = 'educs_custom_exams_v1';

export const INITIAL_USER_STATS: UserStats = {
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  examsCompleted: 0,
  questionsAttempted: 0,
  questionsCorrect: 0,
  skillScores: {
    listening: 75,
    speaking: 70,
    reading: 85,
    writing: 72,
    terminology: 88,
  },
  gradeCompletedCounts: {
    6: 1,
    7: 1,
    8: 0,
    9: 0,
    10: 2,
    11: 1,
    12: 1,
  },
  masteredTermIds: ['term-g6-1', 'term-g6-4', 'term-g10-1'],
};

export function loadUserStats(): UserStats {
  try {
    const data = localStorage.getItem(STATS_KEY);
    if (!data) return INITIAL_USER_STATS;
    const parsed = JSON.parse(data);
    // Check streak
    const today = new Date().toISOString().split('T')[0];
    if (parsed.lastActiveDate !== today) {
      const last = new Date(parsed.lastActiveDate);
      const curr = new Date(today);
      const diffDays = Math.floor((curr.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        parsed.streakDays = (parsed.streakDays || 1) + 1;
      } else if (diffDays > 1) {
        parsed.streakDays = 1;
      }
      parsed.lastActiveDate = today;
      saveUserStats(parsed);
    }
    return { ...INITIAL_USER_STATS, ...parsed };
  } catch (e) {
    console.error('Failed to load user stats from localStorage:', e);
    return INITIAL_USER_STATS;
  }
}

export function saveUserStats(stats: UserStats) {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save user stats:', e);
  }
}

export function loadMistakes(): MistakeItem[] {
  try {
    const data = localStorage.getItem(MISTAKES_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load mistakes:', e);
    return [];
  }
}

export function saveMistakes(mistakes: MistakeItem[]) {
  try {
    localStorage.setItem(MISTAKES_KEY, JSON.stringify(mistakes));
  } catch (e) {
    console.error('Failed to save mistakes:', e);
  }
}

export function recordMistake(mistake: Omit<MistakeItem, 'id' | 'timestamp' | 'isResolved'>) {
  const current = loadMistakes();
  // Check if identical question already in mistakes
  const existingIndex = current.findIndex(m => m.questionId === mistake.questionId);
  const newMistake: MistakeItem = {
    ...mistake,
    id: `mistake-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now(),
    isResolved: false,
  };

  let updated: MistakeItem[];
  if (existingIndex >= 0) {
    updated = [...current];
    updated[existingIndex] = { ...updated[existingIndex], ...newMistake, isResolved: false };
  } else {
    updated = [newMistake, ...current];
  }
  saveMistakes(updated);
  return updated;
}

export function resolveMistake(id: string) {
  const current = loadMistakes();
  const updated = current.map(m => m.id === id ? { ...m, isResolved: true } : m);
  saveMistakes(updated);
  return updated;
}

export function loadCustomExams(): Exam[] {
  try {
    const data = localStorage.getItem(CUSTOM_EXAMS_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load custom exams:', e);
    return [];
  }
}

export function saveCustomExam(exam: Exam) {
  try {
    const current = loadCustomExams();
    const updated = [exam, ...current];
    localStorage.setItem(CUSTOM_EXAMS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save custom exam:', e);
    return [];
  }
}
