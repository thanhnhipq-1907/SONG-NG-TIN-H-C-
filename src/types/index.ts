export type SkillType = 'listening' | 'speaking' | 'reading' | 'writing' | 'terminology' | 'mixed';
export type GradeLevel = 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface Question {
  id: string;
  question: string;
  context?: string;
  codeSnippet?: string;
  audioText?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  teacherTip?: string;
  keyTerms?: string[];
  grade: GradeLevel;
  skill: SkillType;
  topic: string;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  grade: GradeLevel;
  skill: SkillType;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: Question[];
  durationMinutes?: number;
  isCustomAiGenerated?: boolean;
}

export interface TermItem {
  id: string;
  term: string;
  ipa: string;
  vietnameseMeaning: string;
  category: string;
  grade: GradeLevel;
  conciseDefinition: string;
  classroomExample: string;
  vietnameseExampleTranslation?: string;
  isMastered?: boolean;
}

export interface MistakeItem {
  id: string;
  questionId: string;
  question: string;
  context?: string;
  codeSnippet?: string;
  options: string[];
  selectedAnswerIndex: number;
  correctAnswerIndex: number;
  explanation: string;
  teacherTip?: string;
  grade: GradeLevel;
  skill: SkillType;
  topic: string;
  timestamp: number;
  isResolved: boolean;
  notes?: string;
}

export interface SpeakingScenario {
  id: string;
  grade: GradeLevel;
  title: string;
  topic: string;
  context: string;
  pedagogicalPrompt: string;
  targetKeyTerms: string[];
  modelAnswer: string;
  modelAnswerTranslation: string;
  tips: string[];
}

export interface WritingScenario {
  id: string;
  grade: GradeLevel;
  title: string;
  topic: string;
  scenarioType: 'lesson_plan' | 'problem_statement' | 'concept_explanation' | 'student_feedback';
  taskPrompt: string;
  guidelines: string[];
  sampleTeacherResponse: string;
  sampleTranslation: string;
  keywordsToUse: string[];
}

export interface ReadingPassage {
  id: string;
  grade: GradeLevel;
  title: string;
  topic: string;
  content: string;
  vietnameseSummary: string;
  vocabulary: {
    term: string;
    ipa: string;
    meaning: string;
    teachingNote: string;
  }[];
  questions: Question[];
}

export interface ListeningExercise {
  id: string;
  grade: GradeLevel;
  title: string;
  topic: string;
  speakerRole: string; // e.g. "CS Teacher lecturing", "Teacher guiding lab work"
  script: string;
  vietnameseTranslation: string;
  speedRecommendation?: number;
  questions: Question[];
}

export interface UserStats {
  streakDays: number;
  lastActiveDate: string;
  examsCompleted: number;
  questionsAttempted: number;
  questionsCorrect: number;
  skillScores: {
    listening: number;
    speaking: number;
    reading: number;
    writing: number;
    terminology: number;
  };
  gradeCompletedCounts: Record<GradeLevel, number>;
  masteredTermIds: string[];
}

export interface AISpeakingResult {
  score: number;
  cefrLevel: string;
  summary: string;
  terminologyAccuracy: {
    score: number;
    feedback: string;
  };
  pedagogicalClarity: {
    score: number;
    feedback: string;
  };
  grammarAndFluency: {
    score: number;
    feedback: string;
  };
  strengths: string[];
  improvements: string[];
  modelClassroomScript: string;
  vietnameseTranslation: string;
}

export interface AIWritingResult {
  overallScore: number;
  cefrLevel: string;
  critique: {
    grammarAndSyntax: { score: number; comment: string };
    csTerminologyUsage: { score: number; comment: string };
    pedagogicalToneAndClarity: { score: number; comment: string };
  };
  keyHighlights: string[];
  suggestedEdits: {
    original: string;
    improved: string;
    reason: string;
  }[];
  polishedTeacherVersion: string;
  vietnameseNotes: string;
}
