import React, { useState } from 'react';
import { ReadingPassage, GradeLevel, Question } from '../types';
import { READING_PASSAGES } from '../data/curriculumData';
import { playTextToSpeech, stopTextToSpeech } from '../utils/speechUtils';
import { BookOpen, Volume2, CheckCircle2, XCircle, Lightbulb, Sparkles, Languages, Eye, EyeOff } from 'lucide-react';

interface ReadingLoungeProps {
  selectedGrade: GradeLevel | 'all';
  onRecordMistake: (question: Question, selectedIndex: number) => void;
  onUpdateScore: (skill: 'reading', isCorrect: boolean) => void;
}

export const ReadingLounge: React.FC<ReadingLoungeProps> = ({
  selectedGrade,
  onRecordMistake,
  onUpdateScore,
}) => {
  const filteredPassages = selectedGrade === 'all'
    ? READING_PASSAGES
    : READING_PASSAGES.filter(p => p.grade === selectedGrade);

  const [activePassageIndex, setActivePassageIndex] = useState(0);
  const activePassage = filteredPassages[activePassageIndex] || filteredPassages[0];

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [selectedWord, setSelectedWord] = useState<{
    term: string;
    ipa: string;
    meaning: string;
    teachingNote: string;
  } | null>(null);

  // User quiz answers
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      stopTextToSpeech();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      playTextToSpeech(activePassage.content, {
        rate: 0.95,
        onEnd: () => setIsPlayingAudio(false),
        onError: () => setIsPlayingAudio(false),
      });
    }
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (submittedQuestions[questionId]) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleCheckAnswer = (q: Question) => {
    const selected = userAnswers[q.id];
    if (selected === undefined) return;

    setSubmittedQuestions(prev => ({ ...prev, [q.id]: true }));
    const isCorrect = selected === q.correctIndex;
    onUpdateScore('reading', isCorrect);

    if (!isCorrect) {
      onRecordMistake(q, selected);
    }
  };

  if (!activePassage) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
        <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-800">Không có bài đọc cho khối lớp này</h3>
        <p className="text-sm text-slate-500 mt-1">Vui lòng chọn khối lớp khác trên thanh lọc.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Passage selector */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            Bài đọc hiểu Tin học chuyên ngành ({filteredPassages.length} bài)
          </span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
            Khối lớp: {activePassage.grade}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {filteredPassages.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                setActivePassageIndex(idx);
                setUserAnswers({});
                setSubmittedQuestions({});
                setSelectedWord(null);
                stopTextToSpeech();
                setIsPlayingAudio(false);
              }}
              className={`p-3 rounded-xl text-left transition-all border cursor-pointer ${
                activePassageIndex === idx
                  ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950 ring-2 ring-emerald-500/20'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="text-[11px] font-semibold text-slate-500 mb-1">
                Lớp {p.grade} • {p.topic}
              </div>
              <p className="text-xs font-bold line-clamp-1">{p.title}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Reading Passage Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Text & Quizzes (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                  {activePassage.topic}
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  {activePassage.title}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleAudio}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    isPlayingAudio
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                  <span>{isPlayingAudio ? 'Dừng đọc' : 'Nghe đọc bài'}</span>
                </button>
                <button
                  onClick={() => setShowSummary(!showSummary)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  <Languages className="w-3.5 h-3.5 text-blue-600" />
                  <span>{showSummary ? 'Ẩn tóm tắt VN' : 'Tóm tắt VN'}</span>
                </button>
              </div>
            </div>

            {/* Vietnamese summary toggle */}
            {showSummary && (
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs text-slate-800 leading-relaxed">
                <p className="font-bold text-blue-900 uppercase tracking-wider mb-1">
                  Tóm tắt nội dung bài đọc (Tiếng Việt):
                </p>
                {activePassage.vietnameseSummary}
              </div>
            )}

            {/* Reading Article Body */}
            <div className="text-sm text-slate-800 font-normal leading-relaxed whitespace-pre-line">
              {activePassage.content}
            </div>
          </div>

          {/* Reading Comprehension Questions */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Câu hỏi đọc hiểu chuyên ngành ({activePassage.questions.length} câu)
            </h3>

            {activePassage.questions.map((q, idx) => {
              const selected = userAnswers[q.id];
              const isSubmitted = submittedQuestions[q.id];
              const isCorrect = isSubmitted && selected === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isSubmitted
                      ? isCorrect
                        ? 'bg-emerald-50/50 border-emerald-300'
                        : 'bg-rose-50/50 border-rose-300'
                      : 'bg-slate-50/80 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-bold text-slate-900">
                      <span className="text-emerald-600 mr-1.5">Câu {idx + 1}:</span>
                      {q.question}
                    </p>
                    {isSubmitted && (
                      <span>
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-600" />
                        )}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selected === optIdx;
                      let optionStyle = 'bg-white border-slate-200 text-slate-700';

                      if (isSubmitted) {
                        if (optIdx === q.correctIndex) {
                          optionStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-semibold';
                        } else if (isOptionSelected) {
                          optionStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-semibold line-through';
                        }
                      } else if (isOptionSelected) {
                        optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isSubmitted}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${optionStyle}`}
                        >
                          <span className="font-bold mr-1.5 text-slate-400">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {!isSubmitted && (
                    <div className="mt-3 flex justify-end">
                      <button
                        disabled={selected === undefined}
                        onClick={() => handleCheckAnswer(q)}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold disabled:opacity-40 hover:bg-emerald-700 transition-colors cursor-pointer"
                      >
                        Kiểm tra
                      </button>
                    </div>
                  )}

                  {isSubmitted && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200/80 text-xs space-y-1.5">
                      <p className="text-slate-800">
                        <span className="font-bold">Giải thích: </span>
                        {q.explanation}
                      </p>
                      {q.teacherTip && (
                        <p className="text-emerald-800 bg-emerald-50 p-2 rounded-md">
                          💡 <span className="font-semibold">Mẹo sư phạm: </span>{q.teacherTip}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Vocabulary & Key Terms Cards (1 col) */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4 sticky top-24">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Từ vựng trọng tâm bài đọc ({activePassage.vocabulary.length})
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Bấm vào từng thuật ngữ để nghe phát âm và xem gợi ý giảng bài song ngữ:
            </p>

            <div className="space-y-2.5">
              {activePassage.vocabulary.map((v, i) => {
                const isSelected = selectedWord?.term === v.term;
                return (
                  <div
                    key={i}
                    onClick={() => setSelectedWord(v)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-500/20'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900">{v.term}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playTextToSpeech(v.term, { rate: 0.9 });
                        }}
                        className="p-1 text-slate-400 hover:text-emerald-600 cursor-pointer"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] font-mono text-slate-500">{v.ipa}</p>
                    <p className="text-xs text-slate-700 font-semibold mt-1">{v.meaning}</p>
                    <p className="text-[11px] text-emerald-800 mt-1 italic">
                      💡 {v.teachingNote}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
