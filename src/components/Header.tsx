import React from 'react';
import { GradeLevel } from '../types';
import { BookOpen, Sparkles, Flame, AlertCircle, Headphones, MessageSquare, Mic, PenTool, BarChart3, HelpCircle } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  selectedGrade: GradeLevel | 'all';
  onSelectGrade: (grade: GradeLevel | 'all') => void;
  streakDays: number;
  unresolvedMistakesCount: number;
  onOpenAITutor: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  selectedGrade,
  onSelectGrade,
  streakDays,
  unresolvedMistakesCount,
  onOpenAITutor,
}) => {
  const grades: (GradeLevel | 'all')[] = ['all', 6, 7, 8, 9, 10, 11, 12];

  const tabs = [
    { id: 'skills', label: '4 Kỹ năng (CLIL)', icon: Headphones },
    { id: 'exams', label: 'Ngân hàng bộ đề & AI', icon: BookOpen },
    { id: 'glossary', label: 'Thuật ngữ & Flashcards', icon: Sparkles },
    { id: 'mistakes', label: 'Sổ tay lỗi sai', icon: AlertCircle, badge: unresolvedMistakesCount },
    { id: 'progress', label: 'Tiến độ & Đánh giá', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <span className="font-extrabold text-lg tracking-tight">CS</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-none">
                  EduCS <span className="text-blue-600 font-extrabold">Bilingual</span>
                </h1>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  SGK 6 - 12
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
                Tiếng Anh Sư phạm & Tin học Song ngữ (GDPT 2018)
              </p>
            </div>
          </div>

          {/* Quick stats & AI Tutor CTA */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Streak counter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold" title="Chuỗi ngày học liên tục">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{streakDays} ngày streak</span>
            </div>

            {/* Mistakes alert */}
            {unresolvedMistakesCount > 0 && (
              <button
                onClick={() => onSelectTab('mistakes')}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold hover:bg-rose-100 transition-colors cursor-pointer"
                title="Số câu sai cần ôn tập lại"
              >
                <AlertCircle className="w-4 h-4 text-rose-500" />
                <span>{unresolvedMistakesCount} lỗi</span>
              </button>
            )}

            {/* AI Assistant Button */}
            <button
              onClick={onOpenAITutor}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold shadow-xs hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span className="hidden sm:inline">Hỏi Trợ lý AI</span>
              <span className="sm:hidden">AI Coach</span>
            </button>
          </div>
        </div>

        {/* Navigation tabs & Grade Filter row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 border-t border-slate-100">
          {/* Main Tabs */}
          <nav className="flex space-x-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive ? 'bg-white text-blue-700' : 'bg-rose-500 text-white'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Grade filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pl-1">
              Khối lớp:
            </span>
            {grades.map((g) => {
              const isSelected = selectedGrade === g;
              return (
                <button
                  key={g}
                  onClick={() => onSelectGrade(g)}
                  className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {g === 'all' ? 'Tất cả 6-12' : `Lớp ${g}`}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
