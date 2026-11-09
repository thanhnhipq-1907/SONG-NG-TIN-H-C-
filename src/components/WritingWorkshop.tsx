import React, { useState } from 'react';
import { WritingScenario, GradeLevel, AIWritingResult } from '../types';
import { WRITING_SCENARIOS } from '../data/curriculumData';
import { PenTool, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, Eye, EyeOff, BookOpen } from 'lucide-react';

interface WritingWorkshopProps {
  selectedGrade: GradeLevel | 'all';
  onUpdateScore: (skill: 'writing', score: number) => void;
}

export const WritingWorkshop: React.FC<WritingWorkshopProps> = ({
  selectedGrade,
  onUpdateScore,
}) => {
  const filteredScenarios = selectedGrade === 'all'
    ? WRITING_SCENARIOS
    : WRITING_SCENARIOS.filter(s => s.grade === selectedGrade);

  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const activeScenario = filteredScenarios[activeScenarioIndex] || filteredScenarios[0];

  const [submissionText, setSubmissionText] = useState('');
  const [showSample, setShowSample] = useState(false);

  // AI evaluation states
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalResult, setEvalResult] = useState<AIWritingResult | null>(null);
  const [evalError, setEvalError] = useState<string | null>(null);

  const handleScenarioChange = (idx: number) => {
    setActiveScenarioIndex(idx);
    setSubmissionText('');
    setEvalResult(null);
    setEvalError(null);
    setShowSample(false);
  };

  const handleEvaluateAI = async () => {
    if (!submissionText.trim()) {
      alert('Vui lòng soạn thảo bài viết của bạn trước khi yêu cầu AI chấm điểm.');
      return;
    }

    setIsEvaluating(true);
    setEvalError(null);

    try {
      const response = await fetch('/api/gemini/evaluate-writing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: activeScenario.topic,
          prompt: activeScenario.taskPrompt,
          submission: submissionText,
          gradeLevel: activeScenario.grade,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Lỗi khi gửi bài viết tới AI.');
      }

      setEvalResult(data.evaluation);
      onUpdateScore('writing', data.evaluation.overallScore);
    } catch (err: any) {
      console.error(err);
      setEvalError(err.message || 'Không thể đánh giá bài viết qua AI.');
    } finally {
      setIsEvaluating(false);
    }
  };

  if (!activeScenario) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
        <PenTool className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-800">Không có bài tập viết cho khối lớp này</h3>
        <p className="text-sm text-slate-500 mt-1">Vui lòng chọn khối lớp khác trên thanh lọc.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Scenario tabs */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <PenTool className="w-4 h-4 text-purple-600" />
            Nhiệm vụ viết sư phạm Tin học ({filteredScenarios.length} bài)
          </span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">
            Khối lớp: {activeScenario.grade}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {filteredScenarios.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => handleScenarioChange(idx)}
              className={`p-3 rounded-xl text-left transition-all border cursor-pointer ${
                activeScenarioIndex === idx
                  ? 'bg-purple-50/80 border-purple-400 text-purple-950 ring-2 ring-purple-500/20'
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

      {/* Main Workspace Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-5">
        <div>
          <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
            Lớp {activeScenario.grade} • {activeScenario.topic}
          </span>
          <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
            {activeScenario.title}
          </h2>
          <div className="mt-3 p-4 rounded-xl bg-purple-50/50 border border-purple-200 text-sm">
            <p className="text-xs font-bold text-purple-900 uppercase tracking-wider mb-1">
              Yêu cầu nhiệm vụ viết (Task Prompt):
            </p>
            <p className="text-slate-900 font-semibold leading-relaxed">
              {activeScenario.taskPrompt}
            </p>
          </div>
        </div>

        {/* Guidelines & Keywords */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Tiêu chí hướng dẫn sư phạm:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {activeScenario.guidelines.map((g, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Thuật ngữ gợi ý đưa vào bài viết:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {activeScenario.keywordsToUse.map((kw, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-white border border-slate-300 text-slate-800 text-xs font-medium"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Writing input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Soạn bài viết tiếng Anh của bạn:</span>
            <span>{submissionText.split(/\s+/).filter(Boolean).length} từ</span>
          </div>
          <textarea
            value={submissionText}
            onChange={(e) => setSubmissionText(e.target.value)}
            placeholder="Viết bài giảng, đề bài hoặc nhận xét code của bạn tại đây bằng tiếng Anh..."
            className="w-full h-44 p-4 rounded-xl border border-slate-300 text-sm font-sans focus:outline-hidden focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20 leading-relaxed"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <button
            onClick={() => setShowSample(!showSample)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            {showSample ? <EyeOff className="w-4 h-4 text-purple-600" /> : <Eye className="w-4 h-4 text-purple-600" />}
            <span>{showSample ? 'Ẩn bài viết mẫu của chuyên gia' : 'Xem bài viết mẫu của chuyên gia'}</span>
          </button>

          <button
            disabled={isEvaluating || !submissionText.trim()}
            onClick={handleEvaluateAI}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-md disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-95 transition-all cursor-pointer"
          >
            {isEvaluating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AI đang chấm điểm & chữa bài...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Chấm điểm & Nhận xét bằng AI</span>
              </>
            )}
          </button>
        </div>

        {/* Expert Sample Toggle Box */}
        {showSample && (
          <div className="p-5 rounded-xl bg-slate-900 text-white space-y-3 animate-fadeIn">
            <p className="text-xs font-bold uppercase tracking-wider text-purple-300">
              Bài viết mẫu chuẩn sư phạm (Teacher Reference Sample):
            </p>
            <p className="text-sm font-mono whitespace-pre-line text-slate-100 leading-relaxed">
              {activeScenario.sampleTeacherResponse}
            </p>
            <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
              <span className="text-purple-300 font-semibold">Bản dịch tham khảo: </span>
              {activeScenario.sampleTranslation}
            </div>
          </div>
        )}

        {evalError && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{evalError}</span>
          </div>
        )}

        {/* AI Writing Evaluation Results */}
        {evalResult && (
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50/50 via-indigo-50/40 to-white border-2 border-purple-200 shadow-md space-y-5 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-purple-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  Đánh giá bài viết sư phạm bằng AI
                </span>
                <p className="text-sm font-semibold text-slate-800 mt-1">
                  Đánh giá toàn diện cấu trúc câu, tính học thuật và phong cách sư phạm CLIL.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-center px-4 py-2 rounded-xl bg-white border border-purple-200 shadow-xs">
                  <p className="text-[10px] uppercase font-bold text-slate-500">Khung CEFR</p>
                  <p className="text-xl font-extrabold text-purple-700">{evalResult.cefrLevel}</p>
                </div>
                <div className="text-center px-4 py-2 rounded-xl bg-purple-700 text-white shadow-xs">
                  <p className="text-[10px] uppercase font-bold text-purple-200">Điểm tổng</p>
                  <p className="text-xl font-extrabold">{evalResult.overallScore}/100</p>
                </div>
              </div>
            </div>

            {/* Critique breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-700">Ngữ pháp & Cú pháp</span>
                  <span className="text-xs font-extrabold text-purple-600">
                    {evalResult.critique.grammarAndSyntax.score}/10
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  {evalResult.critique.grammarAndSyntax.comment}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-700">Sử dụng thuật ngữ Tin học</span>
                  <span className="text-xs font-extrabold text-blue-600">
                    {evalResult.critique.csTerminologyUsage.score}/10
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  {evalResult.critique.csTerminologyUsage.comment}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-700">Văn phong sư phạm</span>
                  <span className="text-xs font-extrabold text-indigo-600">
                    {evalResult.critique.pedagogicalToneAndClarity.score}/10
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  {evalResult.critique.pedagogicalToneAndClarity.comment}
                </p>
              </div>
            </div>

            {/* Suggested Edits */}
            {evalResult.suggestedEdits && evalResult.suggestedEdits.length > 0 && (
              <div className="p-4 rounded-xl bg-white border border-purple-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Gợi ý nâng cấp & Sửa lỗi chi tiết từng câu:
                </h4>
                <div className="space-y-2">
                  {evalResult.suggestedEdits.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
                      <p className="text-rose-700 line-through">
                        <span className="font-semibold text-slate-500 mr-1.5">Nguyên bản:</span>
                        "{item.original}"
                      </p>
                      <p className="text-emerald-700 font-semibold">
                        <span className="text-slate-500 mr-1.5">Nâng cấp:</span>
                        "{item.improved}"
                      </p>
                      <p className="text-slate-500 italic text-[11px]">
                        Lý do: {item.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Polished Teacher Version */}
            <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                Bản viết hoàn thiện gợi ý bởi AI (Polished Version):
              </span>
              <p className="text-sm font-sans whitespace-pre-line text-slate-100 leading-relaxed">
                {evalResult.polishedTeacherVersion}
              </p>
              {evalResult.vietnameseNotes && (
                <div className="pt-2 border-t border-slate-800 text-xs text-slate-400">
                  <span className="text-purple-300 font-semibold">Ghi chú sư phạm: </span>
                  {evalResult.vietnameseNotes}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
