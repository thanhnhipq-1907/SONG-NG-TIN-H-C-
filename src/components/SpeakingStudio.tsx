import React, { useState, useEffect, useRef } from 'react';
import { SpeakingScenario, GradeLevel, AISpeakingResult } from '../types';
import { SPEAKING_SCENARIOS } from '../data/curriculumData';
import { playTextToSpeech, stopTextToSpeech, getSpeechRecognition } from '../utils/speechUtils';
import { Mic, MicOff, Volume2, Sparkles, Award, CheckCircle, AlertTriangle, ArrowRight, RefreshCw, BookOpen, VolumeX } from 'lucide-react';

interface SpeakingStudioProps {
  selectedGrade: GradeLevel | 'all';
  onUpdateScore: (skill: 'speaking', score: number) => void;
}

export const SpeakingStudio: React.FC<SpeakingStudioProps> = ({
  selectedGrade,
  onUpdateScore,
}) => {
  const filteredScenarios = selectedGrade === 'all'
    ? SPEAKING_SCENARIOS
    : SPEAKING_SCENARIOS.filter(s => s.grade === selectedGrade);

  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const activeScenario = filteredScenarios[activeScenarioIndex] || filteredScenarios[0];

  // Recording & Transcript states
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isModelPlaying, setIsModelPlaying] = useState(false);

  // AI Evaluation states
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<AISpeakingResult | null>(null);
  const [evalError, setEvalError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Reset scenario state on switch
    setTranscript('');
    setEvaluationResult(null);
    setEvalError(null);
    stopTextToSpeech();
    setIsModelPlaying(false);
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  }, [activeScenarioIndex, selectedGrade]);

  const handleToggleRecording = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    } else {
      const recognition = getSpeechRecognition();
      if (!recognition) {
        alert('Trình duyệt của bạn không hỗ trợ Web Speech Recognition trực tiếp. Bạn vẫn có thể nhập hoặc chỉnh sửa nội dung bài nói vào ô văn bản bên dưới để AI đánh giá chi tiết!');
        return;
      }

      recognitionRef.current = recognition;
      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript + ' ';
        }
        setTranscript(currentTranscript.trim());
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    }
  };

  const handlePlayModelAnswer = () => {
    if (isModelPlaying) {
      stopTextToSpeech();
      setIsModelPlaying(false);
    } else {
      setIsModelPlaying(true);
      playTextToSpeech(activeScenario.modelAnswer, {
        rate: 0.95,
        onEnd: () => setIsModelPlaying(false),
        onError: () => setIsModelPlaying(false),
      });
    }
  };

  const handleEvaluateWithAI = async () => {
    if (!transcript.trim()) {
      alert('Vui lòng ghi âm hoặc nhập bài nói của bạn trước khi yêu cầu AI đánh giá.');
      return;
    }

    setIsEvaluating(true);
    setEvalError(null);

    try {
      const response = await fetch('/api/gemini/evaluate-speaking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: activeScenario.topic,
          prompt: activeScenario.pedagogicalPrompt,
          spokenText: transcript,
          gradeLevel: activeScenario.grade,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Lỗi khi gửi yêu cầu đánh giá.');
      }

      setEvaluationResult(data.evaluation);
      onUpdateScore('speaking', data.evaluation.score);
    } catch (err: any) {
      console.error(err);
      setEvalError(err.message || 'Không thể đánh giá bài nói qua AI.');
    } finally {
      setIsEvaluating(false);
    }
  };

  if (!activeScenario) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
        <Mic className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-800">Không có tình huống nói cho khối lớp này</h3>
        <p className="text-sm text-slate-500 mt-1">Vui lòng chọn khối lớp khác trên thanh lọc.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Scenario selector tabs */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Mic className="w-4 h-4 text-indigo-600" />
            Tình huống sư phạm luyện nói ({filteredScenarios.length} tình huống)
          </span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
            Khối lớp: {activeScenario.grade}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {filteredScenarios.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => setActiveScenarioIndex(idx)}
              className={`p-3 rounded-xl text-left transition-all border cursor-pointer ${
                activeScenarioIndex === idx
                  ? 'bg-indigo-50/80 border-indigo-400 text-indigo-950 ring-2 ring-indigo-500/20'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="text-[11px] font-semibold text-slate-500 mb-1">
                Lớp {sc.grade} • {sc.topic}
              </div>
              <p className="text-xs font-bold line-clamp-1">{sc.title}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Speaking Workspace */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-6">
        <div>
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            Lớp {activeScenario.grade} • {activeScenario.topic}
          </span>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">
            {activeScenario.title}
          </h2>
          <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Bối cảnh lớp học (Classroom Context):
            </p>
            <p className="text-slate-800 font-medium italic">
              "{activeScenario.context}"
            </p>
            <div className="mt-3 pt-3 border-t border-slate-200">
              <p className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-1">
                Nhiệm vụ nói của giáo viên (Pedagogical Task):
              </p>
              <p className="text-slate-900 font-bold">
                {activeScenario.pedagogicalPrompt}
              </p>
            </div>
          </div>
        </div>

        {/* Target Terminology Keywords */}
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Thuật ngữ Tin học trọng tâm cần dùng trong bài nói:
          </p>
          <div className="flex flex-wrap gap-2">
            {activeScenario.targetKeyTerms.map((term, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold"
              >
                #{term}
              </span>
            ))}
          </div>
        </div>

        {/* Recording Section */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 text-white space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={handleToggleRecording}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg ${
                  isRecording
                    ? 'bg-rose-500 text-white animate-pulse ring-4 ring-rose-500/30'
                    : 'bg-indigo-600 text-white hover:bg-indigo-500'
                }`}
              >
                {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
              <div>
                <p className="text-sm font-bold">
                  {isRecording ? 'Đang lắng nghe giọng nói của bạn...' : 'Bấm micro để bắt đầu nói tiếng Anh'}
                </p>
                <p className="text-xs text-slate-400">
                  {isRecording
                    ? 'Hãy giải thích tự nhiên như đang đứng trước học sinh trên lớp.'
                    : 'Nhấn một lần để bật, nhấn lại để dừng. Hoặc nhập văn bản trực tiếp bên dưới.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePlayModelAnswer}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span>{isModelPlaying ? 'Dừng câu mẫu' : 'Nghe câu mẫu chuẩn'}</span>
              </button>
            </div>
          </div>

          {/* Transcript input area */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
              <span>Nội dung bài nói của bạn (Transcript):</span>
              <span>{transcript.split(/\s+/).filter(Boolean).length} từ</span>
            </div>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Nội dung bạn nói sẽ hiển thị tại đây theo thời gian thực. Bạn cũng có thể tự gõ hoặc chỉnh sửa lại câu chữ..."
              className="w-full h-28 bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-hidden focus:border-indigo-500 font-sans"
            />
          </div>

          {/* AI Assessment Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <p className="text-xs text-slate-400">
              Trí tuệ nhân tạo Gemini 3.8 Flash sẽ đánh giá độ chuẩn xác thuật ngữ, tính sư phạm và ngữ pháp.
            </p>
            <button
              disabled={isEvaluating || !transcript.trim()}
              onClick={handleEvaluateWithAI}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-xs shadow-md disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-95 transition-all cursor-pointer"
            >
              {isEvaluating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>AI đang phân tích bài nói...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>Đánh giá kỹ năng bằng AI</span>
                </>
              )}
            </button>
          </div>
        </div>

        {evalError && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{evalError}</span>
          </div>
        )}

        {/* AI Evaluation Results Panel */}
        {evaluationResult && (
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/60 via-blue-50/40 to-white border-2 border-indigo-200 shadow-md space-y-5 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-indigo-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  Kết quả đánh giá AI (Bilingual CS Pedagogy)
                </span>
                <p className="text-sm font-semibold text-slate-800 mt-1">
                  {evaluationResult.summary}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-center px-4 py-2 rounded-xl bg-white border border-indigo-200 shadow-xs">
                  <p className="text-[10px] uppercase font-bold text-slate-500">Khung CEFR</p>
                  <p className="text-xl font-extrabold text-indigo-600">{evaluationResult.cefrLevel}</p>
                </div>
                <div className="text-center px-4 py-2 rounded-xl bg-indigo-600 text-white shadow-xs">
                  <p className="text-[10px] uppercase font-bold text-indigo-200">Điểm tổng</p>
                  <p className="text-xl font-extrabold">{evaluationResult.score}/100</p>
                </div>
              </div>
            </div>

            {/* 3 Pillar Scores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-700">Độ chuẩn thuật ngữ IT</span>
                  <span className="text-xs font-extrabold text-blue-600">
                    {evaluationResult.terminologyAccuracy.score}/10
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {evaluationResult.terminologyAccuracy.feedback}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-700">Tính sư phạm & Rõ ràng</span>
                  <span className="text-xs font-extrabold text-indigo-600">
                    {evaluationResult.pedagogicalClarity.score}/10
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {evaluationResult.pedagogicalClarity.feedback}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-700">Ngữ pháp & Độ trôi chảy</span>
                  <span className="text-xs font-extrabold text-purple-600">
                    {evaluationResult.grammarAndFluency.score}/10
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {evaluationResult.grammarAndFluency.feedback}
                </p>
              </div>
            </div>

            {/* Strengths & Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Điểm mạnh đã thể hiện
                </h4>
                <ul className="space-y-1.5 text-xs text-emerald-950">
                  {evaluationResult.strengths.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Gợi ý cải thiện sư phạm
                </h4>
                <ul className="space-y-1.5 text-xs text-amber-950">
                  {evaluationResult.improvements.map((imp, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Suggested Golden Model Script */}
            <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Mẫu câu giảng chuẩn mực quốc tế (Teacher Model Script):
                </span>
                <button
                  onClick={() => {
                    playTextToSpeech(evaluationResult.modelClassroomScript, { rate: 0.95 });
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-700 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Nghe phát âm</span>
                </button>
              </div>
              <p className="text-sm text-slate-100 font-normal leading-relaxed italic">
                "{evaluationResult.modelClassroomScript}"
              </p>
              {evaluationResult.vietnameseTranslation && (
                <div className="pt-2 border-t border-slate-800 text-xs text-slate-400">
                  <span className="text-cyan-300 font-semibold">Dịch nghĩa: </span>
                  {evaluationResult.vietnameseTranslation}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
