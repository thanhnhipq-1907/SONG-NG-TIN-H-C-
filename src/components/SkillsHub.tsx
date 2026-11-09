import React, { useState } from 'react';
import { GradeLevel, Question } from '../types';
import { ListeningLab } from './ListeningLab';
import { SpeakingStudio } from './SpeakingStudio';
import { ReadingLounge } from './ReadingLounge';
import { WritingWorkshop } from './WritingWorkshop';
import { Headphones, Mic, BookOpen, PenTool, Sparkles } from 'lucide-react';

interface SkillsHubProps {
  selectedGrade: GradeLevel | 'all';
  onRecordMistake: (question: Question, selectedIndex: number) => void;
  onUpdateScore: (skill: 'listening' | 'speaking' | 'reading' | 'writing' | 'terminology', value: any) => void;
}

export const SkillsHub: React.FC<SkillsHubProps> = ({
  selectedGrade,
  onRecordMistake,
  onUpdateScore,
}) => {
  const [activeSkill, setActiveSkill] = useState<'listening' | 'speaking' | 'reading' | 'writing'>('listening');

  const skills = [
    {
      id: 'listening' as const,
      name: 'Nghe (Listening Lab)',
      desc: 'Nghe bài giảng, chỉ dẫn phòng máy & thuật ngữ',
      icon: Headphones,
      badge: 'Web Speech TTS',
      color: 'text-blue-600',
      activeBg: 'bg-blue-600 text-white',
    },
    {
      id: 'speaking' as const,
      name: 'Nói (Speaking Studio)',
      desc: 'Ghi âm & Đánh giá sư phạm bằng AI (Gemini 3.8)',
      icon: Mic,
      badge: 'AI Chấm điểm',
      color: 'text-indigo-600',
      activeBg: 'bg-indigo-600 text-white',
    },
    {
      id: 'reading' as const,
      name: 'Đọc (Reading Lounge)',
      desc: 'Bài đọc chuẩn SGK 6-12 & Tra cứu thuật ngữ tức thì',
      icon: BookOpen,
      badge: 'Song ngữ CLIL',
      color: 'text-emerald-600',
      activeBg: 'bg-emerald-600 text-white',
    },
    {
      id: 'writing' as const,
      name: 'Viết (Writing Workshop)',
      desc: 'Soạn giáo án, đề bài code & Nhận xét bằng AI',
      icon: PenTool,
      badge: 'AI Sửa câu từ',
      color: 'text-purple-600',
      activeBg: 'bg-purple-600 text-white',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 4 Skills Sub-Navigation Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {skills.map((s) => {
          const Icon = s.icon;
          const isActive = activeSkill === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSkill(s.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? `${s.activeBg} shadow-md ring-2 ring-blue-500/20`
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 ' + s.color
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {s.badge}
                  </span>
                </div>
                <h3 className="font-bold text-sm tracking-tight">{s.name}</h3>
                <p
                  className={`text-[11px] mt-1 line-clamp-1 ${
                    isActive ? 'text-white/80' : 'text-slate-500'
                  }`}
                >
                  {s.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Render Active Skill Component */}
      <div>
        {activeSkill === 'listening' && (
          <ListeningLab
            selectedGrade={selectedGrade}
            onRecordMistake={onRecordMistake}
            onUpdateScore={(skill, isCorrect) => onUpdateScore(skill, isCorrect)}
          />
        )}

        {activeSkill === 'speaking' && (
          <SpeakingStudio
            selectedGrade={selectedGrade}
            onUpdateScore={(skill, score) => onUpdateScore(skill, score)}
          />
        )}

        {activeSkill === 'reading' && (
          <ReadingLounge
            selectedGrade={selectedGrade}
            onRecordMistake={onRecordMistake}
            onUpdateScore={(skill, isCorrect) => onUpdateScore(skill, isCorrect)}
          />
        )}

        {activeSkill === 'writing' && (
          <WritingWorkshop
            selectedGrade={selectedGrade}
            onUpdateScore={(skill, score) => onUpdateScore(skill, score)}
          />
        )}
      </div>
    </div>
  );
};
