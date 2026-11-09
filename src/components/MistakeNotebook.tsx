import React, { useState } from 'react';
import { MistakeItem, GradeLevel, SkillType } from '../types';
import { resolveMistake, saveMistakes } from '../utils/storageUtils';
import {
  AlertCircle, CheckCircle2, RotateCcw, Filter, BookOpen,
  Lightbulb, Check, ChevronRight, X, ArrowRight, PlayCircle
} from 'lucide-react';

interface MistakeNotebookProps {
  mistakes: MistakeItem[];
  selectedGrade: GradeLevel | 'all';
  onUpdateMistakes: (mistakes: MistakeItem[]) => void;
}

export const MistakeNotebook: React.FC<MistakeNotebookProps> = ({
  mistakes,
  selectedGrade,
  onUpdateMistakes,
}) => {
  const [filterSkill, setFilterSkill] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'unresolved' | 'resolved'>('unresolved');

  // Re-test mode state
  const [isRetesting, setIsRetesting] = useState(false);
  const [retestIndex, setRetestIndex] = useState(0);
  const [retestSelected, setRetestSelected] = useState<Record<string, number>>({});
  const [retestSubmitted, setRetestSubmitted] = useState<Record<string, boolean>>({});

  // Filtered mistakes
  const filteredMistakes = mistakes.filter((m) => {
    const matchesGrade = selectedGrade === 'all' || m.grade === selectedGrade;
    const matchesSkill = filterSkill === 'all' || m.skill === filterSkill;
    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'unresolved'
        ? !m.isResolved
        : m.isResolved;
    return matchesGrade && matchesSkill && matchesStatus;
  });

  const handleToggleResolve = (id: string) => {
    const updated = mistakes.map((m) => (m.id === id ? { ...m, isResolved: !m.isResolved } : m));
    saveMistakes(updated);
    onUpdateMistakes(updated);
  };

  const handleSaveNotes = (id: string, notes: string) => {
    const updated = mistakes.map((m) => (m.id === id ? { ...m, notes } : m));
    saveMistakes(updated);
    onUpdateMistakes(updated);
  };

  const handleStartRetest = () => {
    setIsRetesting(true);
    setRetestIndex(0);
    setRetestSelected({});
    setRetestSubmitted({});
  };

  // RETEST MODE INTERFACE
  if (isRetesting && filteredMistakes.length > 0) {
    const currentM = filteredMistakes[retestIndex];
    const isSubmitted = retestSubmitted[currentM.id];
    const userChoice = retestSelected[currentM.id];
    const isCorrect = isSubmitted && userChoice === currentM.correctAnswerIndex;

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
              Luyện tập lại câu sai ({retestIndex + 1}/{filteredMistakes.length})
            </span>
            <h3 className="text-sm font-bold text-slate-800 mt-0.5">
              Lớp {currentM.grade} • {currentM.topic}
            </h3>
          </div>
          <button
            onClick={() => setIsRetesting(false)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
          >
            Thoát luyện tập
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <p className="text-sm font-bold text-slate-900 leading-relaxed">
            {currentM.question}
          </p>

          <div className="space-y-2">
            {currentM.options.map((opt, optIdx) => {
              const isSelected = userChoice === optIdx;
              let btnClass = 'bg-slate-50 border-slate-200 hover:border-blue-400 text-slate-800';

              if (isSubmitted) {
                if (optIdx === currentM.correctAnswerIndex) {
                  btnClass = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                } else if (isSelected) {
                  btnClass = 'bg-rose-100 border-rose-500 text-rose-950 line-through';
                }
              } else if (isSelected) {
                btnClass = 'bg-blue-50 border-blue-600 text-blue-900 font-bold';
              }

              return (
                <button
                  key={optIdx}
                  disabled={isSubmitted}
                  onClick={() => setRetestSelected((prev) => ({ ...prev, [currentM.id]: optIdx }))}
                  className={`w-full p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center gap-2.5 ${btnClass}`}
                >
                  <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center font-bold text-[11px] shrink-0">
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {!isSubmitted ? (
            <div className="flex justify-end pt-3">
              <button
                disabled={userChoice === undefined}
                onClick={() => {
                  setRetestSubmitted((prev) => ({ ...prev, [currentM.id]: true }));
                  if (userChoice === currentM.correctAnswerIndex) {
                    handleToggleResolve(currentM.id);
                  }
                }}
                className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold disabled:opacity-40 hover:bg-blue-700 cursor-pointer"
              >
                Kiểm tra kết quả
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div
                className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                  isCorrect
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    : 'bg-rose-50 text-rose-900 border border-rose-200'
                }`}
              >
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Chính xác! Câu này đã được đánh dấu là Đã Khắc Phục.</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    <span>Chưa đúng! Hãy đọc kỹ giải thích sư phạm bên dưới.</span>
                  </>
                )}
              </div>

              <p className="text-xs text-slate-700">
                <span className="font-bold">Giải thích: </span>
                {currentM.explanation}
              </p>

              <div className="flex items-center justify-between pt-2">
                <button
                  disabled={retestIndex === 0}
                  onClick={() => setRetestIndex((prev) => prev - 1)}
                  className="px-3 py-1.5 rounded-lg border text-xs font-semibold text-slate-600 disabled:opacity-40"
                >
                  Câu trước
                </button>
                <button
                  disabled={retestIndex === filteredMistakes.length - 1}
                  onClick={() => setRetestIndex((prev) => prev + 1)}
                  className="px-4 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold disabled:opacity-40"
                >
                  Câu tiếp theo →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            Sổ tay Lưu trữ & Ôn tập lỗi sai (Mistake Notebook)
          </span>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
            Tự động ghi nhớ câu làm sai để luyện tập lại đến khi thành thạo
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Mỗi khi bạn chọn sai đáp án trong bài thi hoặc bài đọc/nghe, hệ thống tự động lưu vào đây kèm phân tích nguyên nhân và giải thích sư phạm.
          </p>
        </div>

        {filteredMistakes.length > 0 && (
          <button
            onClick={handleStartRetest}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-extrabold text-xs shadow-lg hover:opacity-95 transition-all cursor-pointer shrink-0"
          >
            <PlayCircle className="w-4 h-4" />
            <span>Luyện tập lại {filteredMistakes.length} câu này</span>
          </button>
        )}
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2">
          {/* Status filter */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setFilterStatus('unresolved')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterStatus === 'unresolved' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Cần ôn lại ({mistakes.filter((m) => !m.isResolved).length})
            </button>
            <button
              onClick={() => setFilterStatus('resolved')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterStatus === 'resolved' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Đã khắc phục ({mistakes.filter((m) => m.isResolved).length})
            </button>
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterStatus === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Tất cả ({mistakes.length})
            </button>
          </div>
        </div>

        <span className="text-xs font-semibold text-slate-500">
          Hiển thị {filteredMistakes.length} lỗi
        </span>
      </div>

      {/* Mistakes Cards List */}
      {filteredMistakes.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Tuyệt vời! Không có lỗi sai nào trong danh mục này
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Hãy tiếp tục làm thêm các bài thi trong Ngân hàng đề hoặc bài luyện 4 kỹ năng. Nếu có câu chưa chuẩn, hệ thống sẽ lưu tại đây.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMistakes.map((m) => (
            <div
              key={m.id}
              className={`p-5 rounded-2xl border transition-all ${
                m.isResolved
                  ? 'bg-slate-50/70 border-slate-200 opacity-80'
                  : 'bg-white border-rose-200 shadow-2xs'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    Lớp {m.grade}
                  </span>
                  <span className="text-xs font-semibold text-slate-600">{m.topic}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleResolve(m.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      m.isResolved
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{m.isResolved ? 'Đã khắc phục ✓' : 'Đánh dấu đã hiểu'}</span>
                  </button>
                </div>
              </div>

              {/* Question */}
              <p className="text-sm font-bold text-slate-900 mt-3 leading-relaxed">
                {m.question}
              </p>

              {/* Answers Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs">
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
                  <p className="font-bold text-rose-800 uppercase tracking-wider text-[10px] mb-1">
                    Phương án bạn đã chọn (Sai):
                  </p>
                  <p className="text-rose-950 font-medium">
                    {m.selectedAnswerIndex >= 0 ? m.options[m.selectedAnswerIndex] : 'Chưa chọn'}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <p className="font-bold text-emerald-800 uppercase tracking-wider text-[10px] mb-1">
                    Đáp án đúng (Chuẩn mực):
                  </p>
                  <p className="text-emerald-950 font-bold">
                    {m.options[m.correctAnswerIndex]}
                  </p>
                </div>
              </div>

              {/* Explanation & Teacher Tip */}
              <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <p className="text-slate-800">
                  <span className="font-bold text-slate-900">Giải thích chi tiết: </span>
                  {m.explanation}
                </p>
                {m.teacherTip && (
                  <p className="text-amber-800">
                    💡 <span className="font-semibold">Mẹo sư phạm: </span>
                    {m.teacherTip}
                  </p>
                )}
              </div>

              {/* Teacher Personal Notes */}
              <div className="mt-3 pt-2">
                <input
                  type="text"
                  defaultValue={m.notes || ''}
                  onBlur={(e) => handleSaveNotes(m.id, e.target.value)}
                  placeholder="Thêm ghi chú sư phạm cá nhân (VD: cần phân biệt lại Big O O(n) và O(n^2))..."
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 font-sans"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
