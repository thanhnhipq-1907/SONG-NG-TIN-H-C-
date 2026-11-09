/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GradeLevel, Question, MistakeItem, UserStats } from './types';
import { Header } from './components/Header';
import { SkillsHub } from './components/SkillsHub';
import { ExamBank } from './components/ExamBank';
import { TerminologyGlossary } from './components/TerminologyGlossary';
import { MistakeNotebook } from './components/MistakeNotebook';
import { ProgressDashboard } from './components/ProgressDashboard';
import { AITutorDrawer } from './components/AITutorDrawer';
import {
  loadUserStats,
  saveUserStats,
  loadMistakes,
  recordMistake,
  saveMistakes,
} from './utils/storageUtils';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('skills');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | 'all'>('all');
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);

  // Persistent User Stats & Mistakes
  const [userStats, setUserStats] = useState<UserStats>(() => loadUserStats());
  const [mistakes, setMistakes] = useState<MistakeItem[]>(() => loadMistakes());

  // Save stats on change
  useEffect(() => {
    saveUserStats(userStats);
  }, [userStats]);

  const handleRecordMistake = (q: Question, selectedIndex: number) => {
    const updated = recordMistake({
      questionId: q.id,
      question: q.question,
      context: q.context,
      codeSnippet: q.codeSnippet,
      options: q.options,
      selectedAnswerIndex: selectedIndex,
      correctAnswerIndex: q.correctIndex,
      explanation: q.explanation,
      teacherTip: q.teacherTip,
      grade: q.grade,
      skill: q.skill,
      topic: q.topic,
    });
    setMistakes(updated);
  };

  const handleUpdateScore = (
    skill: 'listening' | 'speaking' | 'reading' | 'writing' | 'terminology',
    val: any
  ) => {
    setUserStats((prev) => {
      let newScore = prev.skillScores[skill];

      if (typeof val === 'boolean') {
        // Correct/incorrect answer
        const isCorrect = val;
        const total = prev.questionsAttempted + 1;
        const correct = prev.questionsCorrect + (isCorrect ? 1 : 0);
        newScore = isCorrect
          ? Math.min(100, newScore + 2)
          : Math.max(30, newScore - 1);

        return {
          ...prev,
          questionsAttempted: total,
          questionsCorrect: correct,
          skillScores: {
            ...prev.skillScores,
            [skill]: newScore,
          },
        };
      } else if (typeof val === 'number') {
        // Direct score from AI assessment (0-100)
        const smoothed = Math.round(newScore * 0.4 + val * 0.6);
        return {
          ...prev,
          skillScores: {
            ...prev.skillScores,
            [skill]: smoothed,
          },
        };
      }

      return prev;
    });
  };

  const handleExamCompleted = (examId: string, score: number, total: number) => {
    setUserStats((prev) => ({
      ...prev,
      examsCompleted: prev.examsCompleted + 1,
      questionsAttempted: prev.questionsAttempted + total,
      questionsCorrect: prev.questionsCorrect + score,
    }));
  };

  const handleToggleMasteredTerm = (termId: string) => {
    setUserStats((prev) => {
      const isMastered = prev.masteredTermIds.includes(termId);
      const updated = isMastered
        ? prev.masteredTermIds.filter((id) => id !== termId)
        : [...prev.masteredTermIds, termId];

      const newTermScore = Math.min(100, Math.round((updated.length / 50) * 100));

      return {
        ...prev,
        masteredTermIds: updated,
        skillScores: {
          ...prev.skillScores,
          terminology: Math.max(prev.skillScores.terminology, newTermScore),
        },
      };
    });
  };

  const unresolvedMistakesCount = mistakes.filter((m) => !m.isResolved).length;
  const resolvedMistakesCount = mistakes.filter((m) => m.isResolved).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        selectedGrade={selectedGrade}
        onSelectGrade={setSelectedGrade}
        streakDays={userStats.streakDays}
        unresolvedMistakesCount={unresolvedMistakesCount}
        onOpenAITutor={() => setIsAITutorOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentTab === 'skills' && (
          <SkillsHub
            selectedGrade={selectedGrade}
            onRecordMistake={handleRecordMistake}
            onUpdateScore={handleUpdateScore}
          />
        )}

        {currentTab === 'exams' && (
          <ExamBank
            selectedGrade={selectedGrade}
            onRecordMistake={handleRecordMistake}
            onExamCompleted={handleExamCompleted}
          />
        )}

        {currentTab === 'glossary' && (
          <TerminologyGlossary
            selectedGrade={selectedGrade}
            masteredTermIds={userStats.masteredTermIds}
            onToggleMastered={handleToggleMasteredTerm}
          />
        )}

        {currentTab === 'mistakes' && (
          <MistakeNotebook
            mistakes={mistakes}
            selectedGrade={selectedGrade}
            onUpdateMistakes={setMistakes}
          />
        )}

        {currentTab === 'progress' && (
          <ProgressDashboard
            stats={userStats}
            totalMistakesCount={mistakes.length}
            resolvedMistakesCount={resolvedMistakesCount}
          />
        )}
      </main>

      {/* AI Tutor Drawer */}
      <AITutorDrawer
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
      />

      {/* Simple Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-1">
          <p className="font-semibold text-slate-700">
            EduCS Bilingual • Nền tảng Ôn luyện Tiếng Anh dành cho Giáo viên Tin học Song ngữ (Lớp 6 - 12)
          </p>
          <p className="text-slate-400">
            Tích hợp chuẩn kiến thức GDPT 2018 Tin học, Tiếng Anh chuyên ngành CLIL và Đánh giá Trí tuệ Nhân tạo thông minh.
          </p>
        </div>
      </footer>
    </div>
  );
}
