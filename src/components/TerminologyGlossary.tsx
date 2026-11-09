import React, { useState } from 'react';
import { TermItem, GradeLevel } from '../types';
import { TERMS_DATA, TERM_CATEGORIES } from '../data/termsData';
import { playTextToSpeech } from '../utils/speechUtils';
import {
  Sparkles, Search, Volume2, RotateCcw, CheckCircle2,
  BookmarkCheck, BookOpen, Layers, Lightbulb, RefreshCw, X, ArrowRight
} from 'lucide-react';

interface TerminologyGlossaryProps {
  selectedGrade: GradeLevel | 'all';
  masteredTermIds: string[];
  onToggleMastered: (termId: string) => void;
}

export const TerminologyGlossary: React.FC<TerminologyGlossaryProps> = ({
  selectedGrade,
  masteredTermIds,
  onToggleMastered,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [viewMode, setViewMode] = useState<'table' | 'flashcards'>('table');

  // Flashcards state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // AI Term Breakdown state
  const [aiSearchInput, setAiSearchInput] = useState('');
  const [isAnalyzingTerm, setIsAnalyzingTerm] = useState(false);
  const [aiTermData, setAiTermData] = useState<any>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  // Filtered terms
  const filteredTerms = TERMS_DATA.filter((item) => {
    const matchesGrade = selectedGrade === 'all' || item.grade === selectedGrade;
    const matchesCategory = selectedCategory === 'Tất cả' || item.category === selectedCategory;
    const matchesSearch =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.vietnameseMeaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.conciseDefinition.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGrade && matchesCategory && matchesSearch;
  });

  const currentFlashcard = filteredTerms[cardIndex] || filteredTerms[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % filteredTerms.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev - 1 + filteredTerms.length) % filteredTerms.length);
  };

  const handleAnalyzeTermAI = async () => {
    if (!aiSearchInput.trim()) return;
    setIsAnalyzingTerm(true);
    setAiError(null);

    try {
      const response = await fetch('/api/gemini/explain-term', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          term: aiSearchInput,
          gradeLevel: selectedGrade === 'all' ? 10 : selectedGrade,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Lỗi khi tra cứu thuật ngữ với AI.');
      }

      setAiTermData(data.data);
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || 'Không thể tra cứu thuật ngữ.');
    } finally {
      setIsAnalyzingTerm(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & AI Term Lookup */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-3xl p-6 text-white shadow-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-300" />
              Từ điển Thuật ngữ Tin học Song ngữ (Bilingual CS Glossary)
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
              Hơn 100+ thuật ngữ Tin học chuẩn SGK 6-12 kèm phát âm & ví dụ sư phạm
            </h2>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl shrink-0">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Danh sách
            </button>
            <button
              onClick={() => {
                setViewMode('flashcards');
                setIsFlipped(false);
                setCardIndex(0);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'flashcards' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Thẻ Flashcards
            </button>
          </div>
        </div>

        {/* AI Term Prompt Bar */}
        <div className="pt-2">
          <p className="text-xs font-semibold text-slate-300 mb-1.5">
            🔍 Tra cứu chuyên sâu hoặc hỏi AI bất kỳ thuật ngữ Tin học nào:
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={aiSearchInput}
              onChange={(e) => setAiSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyzeTermAI()}
              placeholder="VD: Polymorphism, Deadlock, Gradient Descent, Paging, Docker, Binary Tree..."
              className="grow p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-cyan-400 font-sans"
            />
            <button
              disabled={isAnalyzingTerm || !aiSearchInput.trim()}
              onClick={handleAnalyzeTermAI}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              {isAnalyzingTerm ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>AI đang giải nghĩa...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>AI Tra cứu</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* AI Term Detailed Modal / Box if available */}
      {aiTermData && (
        <div className="p-6 rounded-2xl bg-white border-2 border-cyan-400 shadow-lg space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black text-slate-900">{aiTermData.term}</h3>
                  <button
                    onClick={() => playTextToSpeech(aiTermData.term, { rate: 0.9 })}
                    className="p-1 rounded-md text-slate-400 hover:text-cyan-600 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-slate-500">{aiTermData.ipa}</span>
                </div>
                <p className="text-sm font-semibold text-cyan-700">{aiTermData.vietnameseMeaning}</p>
              </div>
            </div>
            <button
              onClick={() => setAiTermData(null)}
              className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <p className="font-bold text-slate-700 uppercase tracking-wider">Định nghĩa cô đọng:</p>
              <p className="text-slate-800 leading-relaxed">{aiTermData.conciseDefinition}</p>
              <div className="pt-2 border-t border-slate-200">
                <p className="font-bold text-blue-700 uppercase tracking-wider">Cách giảng cho học sinh dễ hiểu:</p>
                <p className="text-slate-700 mt-0.5 leading-relaxed">{aiTermData.classroomExplanation}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-2">
              <p className="font-bold text-indigo-900 uppercase tracking-wider">Mẫu câu giáo viên nói trong tiết dạy:</p>
              <p className="text-indigo-950 font-medium italic leading-relaxed">
                "{aiTermData.teacherScript}"
              </p>
              {aiTermData.commonMistakes && (
                <div className="pt-2 border-t border-indigo-200">
                  <p className="font-bold text-rose-700 uppercase tracking-wider">Lỗi học sinh thường mắc:</p>
                  <p className="text-slate-700 mt-0.5">{aiTermData.commonMistakes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FLASHCARD MODE */}
      {viewMode === 'flashcards' && (
        <div className="max-w-xl mx-auto space-y-5">
          {filteredTerms.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500">
              Không có thẻ nhớ nào khớp với bộ lọc.
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Thẻ số {cardIndex + 1} / {filteredTerms.length}</span>
                <span>Bấm vào thẻ để lật mặt sau</span>
              </div>

              {/* 3D Flip Card */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="w-full min-h-[300px] bg-white rounded-3xl border-2 border-slate-200 p-8 shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between relative select-none"
              >
                {!isFlipped ? (
                  /* FRONT OF CARD */
                  <div className="space-y-4 my-auto text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
                        Lớp {currentFlashcard.grade}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {currentFlashcard.category}
                      </span>
                    </div>

                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                      {currentFlashcard.term}
                    </h3>

                    <div className="flex items-center justify-center gap-2 text-slate-500 font-mono text-sm">
                      <span>{currentFlashcard.ipa}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playTextToSpeech(currentFlashcard.term, { rate: 0.9 });
                        }}
                        className="p-1 rounded-md hover:bg-slate-100 text-blue-600"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-400 pt-4">
                      (Nhấn để lật xem định nghĩa & mẫu câu giảng bài)
                    </p>
                  </div>
                ) : (
                  /* BACK OF CARD */
                  <div className="space-y-4 my-auto animate-fadeIn">
                    <div className="border-b border-slate-100 pb-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Ý nghĩa tiếng Việt:
                      </span>
                      <h4 className="text-lg font-bold text-blue-600 mt-0.5">
                        {currentFlashcard.vietnameseMeaning}
                      </h4>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Định nghĩa tiếng Anh (Concise Definition):
                      </span>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed mt-0.5">
                        {currentFlashcard.conciseDefinition}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200">
                      <span className="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1">
                        <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
                        Mẫu câu giảng bài giáo viên dùng trực tiếp:
                      </span>
                      <p className="text-xs text-blue-950 font-medium italic mt-1 leading-relaxed">
                        "{currentFlashcard.classroomExample}"
                      </p>
                    </div>
                  </div>
                )}

                {/* Card footer indicator */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleMastered(currentFlashcard.id);
                    }}
                    className={`flex items-center gap-1 font-semibold transition-colors ${
                      masteredTermIds.includes(currentFlashcard.id)
                        ? 'text-emerald-600 font-bold'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <BookmarkCheck className="w-4 h-4" />
                    <span>{masteredTermIds.includes(currentFlashcard.id) ? 'Đã thành thạo' : 'Đánh dấu đã thuộc'}</span>
                  </button>
                  <span>Chạm để lật ↺</span>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={handlePrevCard}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Thẻ trước
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (masteredTermIds.includes(currentFlashcard.id)) {
                        onToggleMastered(currentFlashcard.id);
                      }
                      handleNextCard();
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold hover:bg-amber-100 cursor-pointer"
                  >
                    Cần ôn lại
                  </button>
                  <button
                    onClick={() => {
                      if (!masteredTermIds.includes(currentFlashcard.id)) {
                        onToggleMastered(currentFlashcard.id);
                      }
                      handleNextCard();
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 cursor-pointer"
                  >
                    Đã thuộc ✓
                  </button>
                </div>

                <button
                  onClick={handleNextCard}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Thẻ tiếp
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* TABLE / LIST VIEW */}
      {viewMode === 'table' && (
        <div className="space-y-4">
          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="relative grow max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm thuật ngữ, phiên âm hoặc nghĩa tiếng Việt..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-sans focus:outline-hidden focus:border-blue-600"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Chủ đề:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs p-2 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold cursor-pointer"
              >
                {TERM_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Terms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTerms.map((item) => {
              const isMastered = masteredTermIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                          Lớp {item.grade}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">{item.category}</span>
                      </div>

                      <button
                        onClick={() => onToggleMastered(item.id)}
                        className={`p-1 rounded-md transition-colors cursor-pointer ${
                          isMastered ? 'text-emerald-600' : 'text-slate-300 hover:text-slate-500'
                        }`}
                        title={isMastered ? 'Đã thành thạo' : 'Đánh dấu đã thuộc'}
                      >
                        <BookmarkCheck className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-bold text-slate-900">{item.term}</h4>
                        <button
                          onClick={() => playTextToSpeech(item.term, { rate: 0.9 })}
                          className="p-1 rounded-md text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                          title="Nghe phát âm"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <span className="text-xs font-mono text-slate-500">{item.ipa}</span>
                      </div>
                      <p className="text-xs font-bold text-blue-600 mt-0.5">{item.vietnameseMeaning}</p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.conciseDefinition}
                    </p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <p className="font-semibold text-slate-800 text-[11px] mb-1">
                        🎙️ Mẫu câu giáo viên giảng trên lớp:
                      </p>
                      <p className="italic text-slate-700 leading-relaxed font-sans">
                        "{item.classroomExample}"
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
