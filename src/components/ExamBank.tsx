import React, { useState, useEffect } from 'react';
import { Exam, Question, GradeLevel, SkillType } from '../types';
import { INITIAL_EXAMS } from '../data/examsData';
import { loadCustomExams, saveCustomExam } from '../utils/storageUtils';
import confetti from 'canvas-confetti';
import {
  BookOpen, Sparkles, PlusCircle, Clock, CheckCircle2, XCircle,
  AlertCircle, Flag, ChevronLeft, ChevronRight, RotateCcw,
  Lightbulb, ArrowRight, Layers, Filter, Check, RefreshCw, X
} from 'lucide-react';

interface ExamBankProps {
  selectedGrade: GradeLevel | 'all';
  onRecordMistake: (question: Question, selectedIndex: number) => void;
  onExamCompleted: (examId: string, score: number, total: number) => void;
}

export const ExamBank: React.FC<ExamBankProps> = ({
  selectedGrade,
  onRecordMistake,
  onExamCompleted,
}) => {
  // Combine initial exams + custom AI generated exams
  const [exams, setExams] = useState<Exam[]>(() => {
    const custom = loadCustomExams();
    return [...custom, ...INITIAL_EXAMS];
  });

  const [filterSkill, setFilterSkill] = useState<string>('all');
  const [activeExam, setActiveExam] = useState<Exam | null>(null);

  // Test Taking State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);

  // AI Exam Generator Modal state
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiGrade, setAiGrade] = useState<GradeLevel>(10);
  const [aiTopic, setAiTopic] = useState('Lập trình Python, Cấu trúc rẽ nhánh & Vòng lặp');
  const [aiSkill, setAiSkill] = useState<SkillType>('mixed');
  const [aiQuestionCount, setAiQuestionCount] = useState(5);
  const [aiDifficulty, setAiDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [isGeneratingExam, setIsGeneratingExam] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Filtered exams
  const filteredExams = exams.filter((e) => {
    const matchesGrade = selectedGrade === 'all' || e.grade === selectedGrade;
    const matchesSkill = filterSkill === 'all' || e.skill === filterSkill;
    return matchesGrade && matchesSkill;
  });

  // Timer countdown
  useEffect(() => {
    if (!activeExam || isTestSubmitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeExam, isTestSubmitted, timeLeft]);

  const handleStartExam = (exam: Exam) => {
    setActiveExam(exam);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setTimeLeft((exam.durationMinutes || 15) * 60);
    setIsTestSubmitted(false);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isTestSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleToggleFlag = (questionId: string) => {
    setFlaggedQuestions((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleSubmitTest = () => {
    if (!activeExam) return;
    setIsTestSubmitted(true);

    let correctCount = 0;
    activeExam.questions.forEach((q) => {
      const chosen = selectedAnswers[q.id];
      if (chosen === q.correctIndex) {
        correctCount++;
      } else {
        // Record mistake to mistake notebook
        onRecordMistake(q, chosen ?? -1);
      }
    });

    onExamCompleted(activeExam.id, correctCount, activeExam.questions.length);

    // Fire celebration confetti if score is >= 80%
    const percentage = Math.round((correctCount / activeExam.questions.length) * 100);
    if (percentage >= 80) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore confetti errors
      }
    }
  };

  const handleGenerateExamAI = async () => {
    setIsGeneratingExam(true);
    setAiError(null);

    try {
      const response = await fetch('/api/gemini/generate-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade: aiGrade,
          topic: aiTopic,
          skill: aiSkill,
          questionCount: aiQuestionCount,
          difficulty: aiDifficulty,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Lỗi khi tạo bộ đề mới từ AI.');
      }

      const newExam: Exam = {
        ...data.exam,
        isCustomAiGenerated: true,
        durationMinutes: aiQuestionCount * 3,
      };

      saveCustomExam(newExam);
      setExams((prev) => [newExam, ...prev]);
      setIsAiModalOpen(false);

      // Auto start newly generated exam
      handleStartExam(newExam);
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || 'Không thể tạo đề mới. Vui lòng thử lại.');
    } finally {
      setIsGeneratingExam(false);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // If in active test mode
  if (activeExam) {
    const currentQ = activeExam.questions[currentQuestionIndex];
    const totalQuestions = activeExam.questions.length;
    const answeredCount = Object.keys(selectedAnswers).length;

    // Calculate results if submitted
    const correctCount = activeExam.questions.filter(
      (q) => selectedAnswers[q.id] === q.correctIndex
    ).length;
    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

    return (
      <div className="space-y-6">
        {/* Test Header Banner */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
                Lớp {activeExam.grade}
              </span>
              <span className="text-xs text-slate-500">• {activeExam.topic}</span>
              {activeExam.isCustomAiGenerated && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-600" /> Đề AI tạo
                </span>
              )}
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">{activeExam.title}</h2>
          </div>

          <div className="flex items-center gap-4">
            {!isTestSubmitted && (
              <div
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono text-sm font-bold border ${
                  timeLeft < 180
                    ? 'bg-rose-50 border-rose-300 text-rose-600 animate-pulse'
                    : 'bg-slate-100 border-slate-200 text-slate-800'
                }`}
              >
                <Clock className="w-4 h-4 text-blue-600" />
                <span>{formatTimer(timeLeft)}</span>
              </div>
            )}

            {!isTestSubmitted ? (
              <button
                onClick={handleSubmitTest}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer transition-colors"
              >
                Nộp bài thi ({answeredCount}/{totalQuestions})
              </button>
            ) : (
              <button
                onClick={() => setActiveExam(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold cursor-pointer transition-colors"
              >
                Trở về Ngân hàng đề
              </button>
            )}
          </div>
        </div>

        {/* RESULTS SCREEN IF SUBMITTED */}
        {isTestSubmitted && (
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-white border-2 border-blue-200 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Kết quả bài thi ôn luyện
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  {scorePercentage >= 80 ? '🎉 Xuất sắc! Kết quả rất ấn tượng' : 'Cố gắng lên! Hãy ôn lại các câu sai'}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Đúng {correctCount}/{totalQuestions} câu • Các câu trả lời sai đã được tự động lưu vào{' '}
                  <span className="font-bold text-rose-600">Sổ tay lỗi sai</span> để bạn ôn tập lại.
                </p>
              </div>

              <div className="text-center px-6 py-3 rounded-2xl bg-white border border-blue-200 shadow-sm">
                <p className="text-xs font-semibold text-slate-500 uppercase">Điểm số</p>
                <p className="text-3xl font-black text-blue-600">{scorePercentage}%</p>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => handleStartExam(activeExam)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Làm lại bài này
              </button>
              <button
                onClick={() => setActiveExam(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer"
              >
                Chọn bài thi khác
              </button>
            </div>
          </div>
        )}

        {/* Question Area & Navigator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Question Display (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
              {/* Question Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Câu hỏi {currentQuestionIndex + 1} / {totalQuestions}
                </span>

                {!isTestSubmitted && (
                  <button
                    onClick={() => handleToggleFlag(currentQ.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      flaggedQuestions[currentQ.id]
                        ? 'bg-amber-100 text-amber-800'
                        : 'text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    <Flag className={`w-3.5 h-3.5 ${flaggedQuestions[currentQ.id] ? 'fill-amber-600 text-amber-600' : ''}`} />
                    <span>{flaggedQuestions[currentQ.id] ? 'Đã đánh dấu xem lại' : 'Đánh dấu câu này'}</span>
                  </button>
                )}
              </div>

              {/* Context if available */}
              {currentQ.context && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 italic">
                  {currentQ.context}
                </div>
              )}

              {/* Code Snippet if available */}
              {currentQ.codeSnippet && (
                <pre className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto">
                  {currentQ.codeSnippet}
                </pre>
              )}

              {/* Question text */}
              <p className="text-base font-bold text-slate-900 leading-relaxed">
                {currentQ.question}
              </p>

              {/* Options */}
              <div className="space-y-2.5 pt-2">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[currentQ.id] === optIdx;
                  let optionClass = 'bg-slate-50/70 border-slate-200 hover:border-blue-400 text-slate-800';

                  if (isTestSubmitted) {
                    if (optIdx === currentQ.correctIndex) {
                      optionClass = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-semibold';
                    } else if (isSelected) {
                      optionClass = 'bg-rose-100 border-rose-500 text-rose-950 font-semibold line-through';
                    } else {
                      optionClass = 'bg-white border-slate-200 opacity-60';
                    }
                  } else if (isSelected) {
                    optionClass = 'bg-blue-50 border-blue-600 text-blue-950 font-semibold ring-2 ring-blue-500/20';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isTestSubmitted}
                      onClick={() => handleSelectOption(currentQ.id, optIdx)}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-start gap-3 cursor-pointer ${optionClass}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="leading-relaxed">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Teacher Tip if submitted */}
              {isTestSubmitted && (
                <div className="mt-4 pt-4 border-t border-slate-200 space-y-2 text-xs">
                  <p className="text-slate-800">
                    <span className="font-bold text-slate-900">Giải thích chi tiết: </span>
                    {currentQ.explanation}
                  </p>
                  {currentQ.teacherTip && (
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Mẹo sư phạm cho giáo viên: </span>
                        <span>{currentQ.teacherTip}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Pagination buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 disabled:opacity-40 hover:bg-slate-50 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Câu trước
                </button>

                <button
                  disabled={currentQuestionIndex === totalQuestions - 1}
                  onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 disabled:opacity-40 hover:bg-slate-50 cursor-pointer"
                >
                  Câu tiếp theo <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Question Map Sidebar (1 col) */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4 sticky top-24">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Mục lục câu hỏi
                </span>
                <span className="text-xs font-bold text-blue-600">
                  {answeredCount}/{totalQuestions} đã làm
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {activeExam.questions.map((q, idx) => {
                  const isCurrent = currentQuestionIndex === idx;
                  const isAnswered = selectedAnswers[q.id] !== undefined;
                  const isFlagged = flaggedQuestions[q.id];

                  let btnStyle = 'bg-slate-100 text-slate-700 hover:bg-slate-200';

                  if (isTestSubmitted) {
                    const isCorrect = selectedAnswers[q.id] === q.correctIndex;
                    btnStyle = isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-500 text-white';
                  } else if (isCurrent) {
                    btnStyle = 'bg-blue-600 text-white ring-2 ring-blue-500/30';
                  } else if (isFlagged) {
                    btnStyle = 'bg-amber-100 text-amber-800 border border-amber-300 font-bold';
                  } else if (isAnswered) {
                    btnStyle = 'bg-blue-100 text-blue-800 font-semibold';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`h-9 rounded-lg font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${btnStyle}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-blue-100 border border-blue-300" />
                  <span>Đã chọn đáp án</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-amber-100 border border-amber-300" />
                  <span>Đã gắn cờ xem lại</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-slate-100 border border-slate-300" />
                  <span>Chưa làm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // EXAMS LISTING VIEW
  return (
    <div className="space-y-6">
      {/* Top Banner & AI Generator CTA */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-300" />
              Ngân hàng đề thi song ngữ & Tạo đề tự động AI
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Luyện đề SGK Tiếng Anh & Tin học Lớp 6 - 12
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Các bộ đề bám sát chương trình GDPT Tin học kết hợp tiếng Anh chuyên ngành. Bạn có thể làm ngay các bộ đề có sẵn hoặc yêu cầu AI tạo đề thi mới theo chuyên đề tùy chọn bất kỳ lúc nào!
            </p>
          </div>

          <button
            onClick={() => setIsAiModalOpen(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-extrabold text-xs shadow-lg hover:from-cyan-300 hover:to-blue-400 transition-all cursor-pointer shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tạo bộ đề mới bằng AI</span>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Kỹ năng:
          </span>
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'mixed', label: 'Tổng hợp' },
            { id: 'reading', label: 'Đọc hiểu' },
            { id: 'listening', label: 'Nghe hiểu' },
            { id: 'terminology', label: 'Thuật ngữ' },
          ].map((sk) => (
            <button
              key={sk.id}
              onClick={() => setFilterSkill(sk.id)}
              className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                filterSkill === sk.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sk.label}
            </button>
          ))}
        </div>

        <span className="text-xs font-semibold text-slate-500">
          Hiển thị {filteredExams.length} bộ đề
        </span>
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredExams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
                  Lớp {exam.grade}
                </span>
                <div className="flex items-center gap-1.5">
                  {exam.isCustomAiGenerated && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5 text-purple-600" /> AI
                    </span>
                  )}
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      exam.difficulty === 'hard'
                        ? 'bg-rose-50 text-rose-700'
                        : exam.difficulty === 'medium'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {exam.difficulty}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {exam.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {exam.description}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  {exam.questions.length} câu hỏi
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {exam.durationMinutes || 15} phút
                </span>
              </div>
            </div>

            <button
              onClick={() => handleStartExam(exam)}
              className="mt-5 w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-blue-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Vào làm đề ngay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* AI Exam Generator Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Tạo bộ đề Tin học mới bằng AI
                  </h3>
                  <p className="text-xs text-slate-500">Gemini 3.8 Flash sinh đề thi chuẩn SGK</p>
                </div>
              </div>
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Select Grade */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Chọn Khối lớp:
                </label>
                <div className="grid grid-cols-7 gap-1">
                  {[6, 7, 8, 9, 10, 11, 12].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setAiGrade(g as GradeLevel)}
                      className={`py-1.5 rounded-lg font-bold border transition-all cursor-pointer ${
                        aiGrade === g
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      Lớp {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic input */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Chủ đề Tin học mong muốn:
                </label>
                <input
                  type="text"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="VD: Cấu trúc dữ liệu Stack & Queue, Thuật toán sắp xếp, Mạng LAN, OOP..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-sans focus:outline-hidden focus:border-blue-600"
                />
              </div>

              {/* Skill focus & Question count */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Trọng tâm kỹ năng:
                  </label>
                  <select
                    value={aiSkill}
                    onChange={(e) => setAiSkill(e.target.value as SkillType)}
                    className="w-full p-2 rounded-xl border border-slate-300 font-sans bg-white cursor-pointer"
                  >
                    <option value="mixed">Tổng hợp các kỹ năng</option>
                    <option value="reading">Đọc hiểu chuyên ngành</option>
                    <option value="terminology">Thuật ngữ & Khái niệm</option>
                    <option value="listening">Nghe hiểu chỉ dẫn lab</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Số lượng câu hỏi:
                  </label>
                  <select
                    value={aiQuestionCount}
                    onChange={(e) => setAiQuestionCount(Number(e.target.value))}
                    className="w-full p-2 rounded-xl border border-slate-300 font-sans bg-white cursor-pointer"
                  >
                    <option value={3}>3 câu hỏi ngắn</option>
                    <option value={5}>5 câu hỏi tiêu chuẩn</option>
                    <option value={8}>8 câu hỏi chuyên sâu</option>
                  </select>
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Mức độ khó:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'easy', label: 'Cơ bản (Easy)' },
                    { id: 'medium', label: 'Trung bình (Medium)' },
                    { id: 'hard', label: 'Nâng cao (Hard)' },
                  ].map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setAiDifficulty(d.id as any)}
                      className={`py-2 rounded-lg font-semibold border text-center transition-all cursor-pointer ${
                        aiDifficulty === d.id
                          ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold'
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {aiError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                  {aiError}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsAiModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="button"
                disabled={isGeneratingExam}
                onClick={handleGenerateExamAI}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md disabled:opacity-40 hover:opacity-95 cursor-pointer"
              >
                {isGeneratingExam ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>AI đang tạo bộ đề...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    <span>Tạo & Lưu vào kho đề</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
