import React from 'react';
import { UserStats, GradeLevel } from '../types';
import {
  BarChart3, Award, Flame, CheckCircle, Clock, BookOpen,
  Sparkles, Target, TrendingUp, ShieldCheck, ChevronRight
} from 'lucide-react';

interface ProgressDashboardProps {
  stats: UserStats;
  totalMistakesCount: number;
  resolvedMistakesCount: number;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  stats,
  totalMistakesCount,
  resolvedMistakesCount,
}) => {
  const accuracyRate = stats.questionsAttempted > 0
    ? Math.round((stats.questionsCorrect / stats.questionsAttempted) * 100)
    : 80;

  // Compute average skill score
  const avgSkillScore = Math.round(
    (stats.skillScores.listening +
      stats.skillScores.speaking +
      stats.skillScores.reading +
      stats.skillScores.writing +
      stats.skillScores.terminology) /
      5
  );

  const getCefrBadge = (score: number) => {
    if (score >= 85) return { level: 'C1', title: 'Giáo viên Song ngữ Chuyên nghiệp (Proficient CLIL Teacher)' };
    if (score >= 70) return { level: 'B2', title: 'Giáo viên Song ngữ Độc lập (Independent CLIL Teacher)' };
    return { level: 'B1', title: 'Giáo viên Song ngữ Đang phát triển (Developing CLIL Teacher)' };
  };

  const cefr = getCefrBadge(avgSkillScore);

  const skillsList = [
    { name: 'Kỹ năng Nghe (Listening)', score: stats.skillScores.listening, color: 'bg-blue-600', icon: '🎧' },
    { name: 'Kỹ năng Nói (Speaking)', score: stats.skillScores.speaking, color: 'bg-indigo-600', icon: '🎙️' },
    { name: 'Kỹ năng Đọc (Reading)', score: stats.skillScores.reading, color: 'bg-emerald-600', icon: '📖' },
    { name: 'Kỹ năng Viết (Writing)', score: stats.skillScores.writing, color: 'bg-purple-600', icon: '✍️' },
    { name: 'Thuật ngữ Tin học (Terminology)', score: stats.skillScores.terminology, color: 'bg-cyan-600', icon: '💡' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner with Teacher CEFR Level */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-cyan-300" />
            Hồ sơ Năng lực Tiếng Anh Giảng dạy Tin học
          </span>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Thầy/Cô đang đạt trình độ: <span className="text-cyan-300">{cefr.level}</span>
          </h2>
          <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
            {cefr.title} • Đánh giá dựa trên chuẩn năng lực ngôn ngữ giảng dạy nội dung tích hợp (CLIL) và chuẩn SGK GDPT 2018.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/15 backdrop-blur-xs shrink-0">
          <div className="text-center">
            <p className="text-[10px] font-bold text-slate-300 uppercase">Điểm trung bình</p>
            <p className="text-3xl font-black text-cyan-300">{avgSkillScore}/100</p>
          </div>
          <div className="h-10 w-px bg-white/20" />
          <div className="text-center">
            <p className="text-[10px] font-bold text-slate-300 uppercase">Chuỗi học tập</p>
            <p className="text-3xl font-black text-amber-400">{stats.streakDays} ngày</p>
          </div>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase">Bộ đề đã hoàn thành</span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{stats.examsCompleted}</p>
          <p className="text-[11px] text-slate-500 mt-1">Các bài thi chuẩn hóa & AI tạo</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase">Tỷ lệ chính xác</span>
            <Target className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-600">{accuracyRate}%</p>
          <p className="text-[11px] text-slate-500 mt-1">Đúng {stats.questionsCorrect}/{stats.questionsAttempted} câu hỏi</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase">Thuật ngữ đã thuộc</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-600">{stats.masteredTermIds.length}</p>
          <p className="text-[11px] text-slate-500 mt-1">Trên tổng số 100+ thuật ngữ</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase">Lỗi sai đã khắc phục</span>
            <ShieldCheck className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-black text-purple-600">
            {resolvedMistakesCount}/{totalMistakesCount}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Trong Sổ tay lỗi sai</p>
        </div>
      </div>

      {/* 5 Skills Progress Bar breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: 4 skills + terminology */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              Đánh giá thành thạo 5 Trụ cột Song ngữ
            </span>
            <span className="text-xs font-semibold text-slate-500">Mục tiêu: 90+ C1</span>
          </div>

          <div className="space-y-4">
            {skillsList.map((sk) => (
              <div key={sk.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700 flex items-center gap-1.5">
                    <span>{sk.icon}</span>
                    <span>{sk.name}</span>
                  </span>
                  <span className="text-slate-900 font-extrabold">{sk.score}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${sk.color}`}
                    style={{ width: `${sk.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Grade Completion Matrix (Lớp 6 to 12) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              Phủ sóng kiến thức SGK Tin học (Lớp 6 - 12)
            </span>
            <span className="text-xs font-semibold text-slate-500">GDPT 2018</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {([6, 7, 8, 9, 10, 11, 12] as GradeLevel[]).map((g) => {
              const count = stats.gradeCompletedCounts[g] || 0;
              const isStarted = count > 0;
              return (
                <div
                  key={g}
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    isStarted
                      ? 'bg-blue-50/60 border-blue-200 text-blue-950'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold">Tin học Lớp {g}</p>
                    <p className="text-[11px] text-slate-500">
                      {isStarted ? `Đã hoàn thành ${count} bài ôn` : 'Chưa luyện tập'}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isStarted ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isStarted ? 'Đang học' : 'Sẵn sàng'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
