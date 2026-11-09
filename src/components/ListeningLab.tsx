import React, { useState, useEffect } from 'react';
import { ListeningExercise, GradeLevel, Question } from '../types';
import { LISTENING_EXERCISES } from '../data/curriculumData';
import { playTextToSpeech, stopTextToSpeech } from '../utils/speechUtils';
import { Headphones, Play, Pause, RotateCcw, Volume2, Eye, EyeOff, CheckCircle2, XCircle, Lightbulb, ChevronRight, Gauge } from 'lucide-react';

interface ListeningLabProps {
  selectedGrade: GradeLevel | 'all';
  onRecordMistake: (question: Question, selectedIndex: number) => void;
  onUpdateScore: (skill: 'listening', isCorrect: boolean) => void;
}

export const ListeningLab: React.FC<ListeningLabProps> = ({
  selectedGrade,
  onRecordMistake,
  onUpdateScore,
}) => {
  const filteredExercises = selectedGrade === 'all'
    ? LISTENING_EXERCISES
    : LISTENING_EXERCISES.filter(e => e.grade === selectedGrade);

  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const activeExercise = filteredExercises[activeExerciseIndex] || filteredExercises[0];

  const [isPlaying, setIsPlaying] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  // User quiz answers state: { [questionId]: selectedOptionIndex }
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Reset answers when switching exercise
    setUserAnswers({});
    setSubmittedQuestions({});
    setShowTranscript(false);
    setShowTranslation(false);
    stopTextToSpeech();
    setIsPlaying(false);
  }, [activeExerciseIndex, selectedGrade]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopTextToSpeech();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playTextToSpeech(activeExercise.script, {
        rate: speechRate,
        onEnd: () => setIsPlaying(false),
        onError: () => setIsPlaying(false),
      });
    }
  };

  const handleSpeedChange = (speed: number) => {
    setSpeechRate(speed);
    if (isPlaying) {
      stopTextToSpeech();
      playTextToSpeech(activeExercise.script, {
        rate: speed,
        onEnd: () => setIsPlaying(false),
        onError: () => setIsPlaying(false),
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
    onUpdateScore('listening', isCorrect);

    if (!isCorrect) {
      onRecordMistake(q, selected);
    }
  };

  if (!activeExercise) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
        <Headphones className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-800">Không có bài nghe cho khối lớp này</h3>
        <p className="text-sm text-slate-500 mt-1">Vui lòng chọn khối lớp khác hoặc chọn "Tất cả 6-12" trên thanh lọc.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Exercise selector pills */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Headphones className="w-4 h-4 text-blue-600" />
            Chọn bài luyện nghe Tin học ({filteredExercises.length} bài)
          </span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
            Khối lớp: {activeExercise.grade}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {filteredExercises.map((ex, idx) => (
            <button
              key={ex.id}
              onClick={() => setActiveExerciseIndex(idx)}
              className={`p-3 rounded-xl text-left transition-all border cursor-pointer ${
                activeExerciseIndex === idx
                  ? 'bg-blue-50/80 border-blue-400 text-blue-950 ring-2 ring-blue-500/20'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1">
                <span>Lớp {ex.grade}</span>
                <span>{ex.questions.length} câu hỏi</span>
              </div>
              <p className="text-xs font-bold line-clamp-1">{ex.title}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Player Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-6">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                {activeExercise.topic}
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
                {activeExercise.title}
              </h2>
            </div>
            <div className="text-xs font-medium px-3 py-1 bg-slate-100 rounded-full text-slate-600">
              🎙️ {activeExercise.speakerRole}
            </div>
          </div>
        </div>

        {/* Audio control station */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-xl p-5 shadow-inner">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Play Button & Wave */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleTogglePlay}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg ${
                  isPlaying
                    ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                    : 'bg-blue-600 text-white hover:bg-blue-500'
                }`}
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
              </button>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {isPlaying ? 'Đang phát âm thanh bài giảng...' : 'Sẵn sàng nghe bài giảng'}
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  {[40, 75, 55, 90, 60, 80, 45, 95, 70, 85, 50, 65].map((h, i) => (
                    <div
                      key={i}
                      className={`w-1.5 rounded-full transition-all duration-300 ${
                        isPlaying ? 'bg-cyan-400 animate-pulse' : 'bg-slate-700'
                      }`}
                      style={{ height: `${isPlaying ? (h * 0.3) : 6}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Speed settings & Actions */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5" /> Tốc độ:
              </span>
              {[0.8, 1.0, 1.2].map((s) => (
                <button
                  key={s}
                  onClick={() => handleSpeedChange(s)}
                  className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                    speechRate === s
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {s}x
                </button>
              ))}

              <button
                onClick={() => {
                  stopTextToSpeech();
                  setIsPlaying(false);
                }}
                className="p-1.5 rounded-md bg-slate-800 text-slate-400 hover:text-white cursor-pointer ml-2"
                title="Dừng phát"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Transcript toggles */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            {showTranscript ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {showTranscript ? 'Ẩn lời thoại (Transcript)' : 'Xem lời thoại (Transcript)'}
          </button>

          {showTranscript && (
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer"
            >
              <span>{showTranslation ? 'Ẩn bản dịch tiếng Việt' : 'Hiện bản dịch tiếng Việt'}</span>
            </button>
          )}
        </div>

        {/* Transcript Box */}
        {showTranscript && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm space-y-3 animate-fadeIn">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Audio Script (English):
              </p>
              <p className="text-slate-800 font-normal leading-relaxed">
                {activeExercise.script}
              </p>
            </div>
            {showTranslation && (
              <div className="pt-3 border-t border-slate-200">
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                  Bản dịch Sư phạm (Tiếng Việt):
                </p>
                <p className="text-slate-700 font-normal leading-relaxed">
                  {activeExercise.vietnameseTranslation}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Comprehension Quiz Questions */}
        <div className="space-y-6 pt-4 border-t border-slate-100">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>Câu hỏi kiểm tra mức độ nghe hiểu ({activeExercise.questions.length} câu)</span>
          </h3>

          {activeExercise.questions.map((q, idx) => {
            const selected = userAnswers[q.id];
            const isSubmitted = submittedQuestions[q.id];
            const isCorrect = isSubmitted && selected === q.correctIndex;
            const isIncorrect = isSubmitted && selected !== q.correctIndex;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-xl border transition-all ${
                  isSubmitted
                    ? isCorrect
                      ? 'bg-emerald-50/50 border-emerald-300'
                      : 'bg-rose-50/50 border-rose-300'
                    : 'bg-slate-50/80 border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-bold text-slate-900">
                    <span className="text-blue-600 mr-1.5">Câu {idx + 1}:</span>
                    {q.question}
                  </p>
                  {isSubmitted && (
                    <span className="shrink-0">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600" />
                      )}
                    </span>
                  )}
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                  {q.options.map((opt, optIdx) => {
                    const isOptionSelected = selected === optIdx;
                    let optionStyle = 'bg-white border-slate-200 text-slate-700 hover:border-blue-300';

                    if (isSubmitted) {
                      if (optIdx === q.correctIndex) {
                        optionStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-semibold';
                      } else if (isOptionSelected) {
                        optionStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-semibold line-through';
                      } else {
                        optionStyle = 'bg-white border-slate-200 opacity-60';
                      }
                    } else if (isOptionSelected) {
                      optionStyle = 'bg-blue-50 border-blue-500 text-blue-900 font-semibold ring-2 ring-blue-500/20';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isSubmitted}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`p-3 rounded-lg border text-left text-xs transition-all cursor-pointer ${optionStyle}`}
                      >
                        <span className="font-bold mr-2 text-slate-500">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Check answer button */}
                {!isSubmitted && (
                  <div className="mt-4 flex justify-end">
                    <button
                      disabled={selected === undefined}
                      onClick={() => handleCheckAnswer(q)}
                      className="px-4 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      Kiểm tra đáp án
                    </button>
                  </div>
                )}

                {/* Explanation & Teacher Tip */}
                {isSubmitted && (
                  <div className="mt-4 pt-3 border-t border-slate-200/80 space-y-2 text-xs">
                    <p className="text-slate-800">
                      <span className="font-bold text-slate-900">Giải thích: </span>
                      {q.explanation}
                    </p>
                    {q.teacherTip && (
                      <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
                        <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">Mẹo sư phạm cho giáo viên: </span>
                          <span>{q.teacherTip}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
