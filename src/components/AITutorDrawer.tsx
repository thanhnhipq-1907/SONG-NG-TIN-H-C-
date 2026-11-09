import React, { useState } from 'react';
import { Sparkles, Send, X, Bot, User, Volume2, Copy, Check, RefreshCw } from 'lucide-react';
import { playTextToSpeech } from '../utils/speechUtils';

interface AITutorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

export const AITutorDrawer: React.FC<AITutorDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Xin chào Thầy/Cô! Tôi là Trợ lý Sư phạm Tin học Song ngữ (EduCS Coach). Thầy/Cô cần hỗ trợ dịch thuật ngữ, soạn câu lệnh tiếng Anh trên lớp, hay giải thích khái niệm Tin học nào cho học sinh hôm nay?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const quickPrompts = [
    'Giải thích Đệ quy (Recursion) cho học sinh lớp 11 bằng tiếng Anh',
    'Các câu tiếng Anh quản lý phòng máy (Lab management)',
    'Cách giải thích vòng lặp For vs While bằng ví dụ đời thực',
    'Mẫu câu khen ngợi & sửa lỗi code cho học sinh',
  ];

  const handleSend = async (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim() || isLoading) return;

    const newMessages: Message[] = [...messages, { sender: 'user', text: q }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/ask-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Lỗi khi kết nối với AI.');
      }

      setMessages([...newMessages, { sender: 'ai', text: data.answer }]);
    } catch (err: any) {
      setMessages([
        ...newMessages,
        {
          sender: 'ai',
          text: `Rất tiếc: ${err.message || 'Không thể kết nối tới trợ lý AI vào lúc này. Vui lòng thử lại.'}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-slideLeft">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-400 text-slate-950 flex items-center justify-center font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold flex items-center gap-1.5">
                <span>EduCS AI Coach</span>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.2 rounded-full border border-cyan-400/30">
                  Gemini 3.8
                </span>
              </h3>
              <p className="text-[11px] text-slate-300">Trợ lý Sư phạm Tiếng Anh & Tin học 6-12</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 whitespace-nowrap transition-colors cursor-pointer shrink-0 font-medium"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="grow p-4 overflow-y-auto space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                  m.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-cyan-300'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed space-y-2 ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
                }`}
              >
                <div className="whitespace-pre-wrap">{m.text}</div>

                {m.sender === 'ai' && (
                  <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60 text-slate-500">
                    <button
                      onClick={() => playTextToSpeech(m.text, { rate: 0.95 })}
                      className="hover:text-blue-600 flex items-center gap-1 text-[11px] cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Nghe
                    </button>
                    <button
                      onClick={() => handleCopy(m.text, idx)}
                      className="hover:text-blue-600 flex items-center gap-1 text-[11px] cursor-pointer ml-2"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" /> Đã sao chép
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Sao chép
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
              <span>EduCS AI đang soạn câu trả lời sư phạm...</span>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-3 border-t border-slate-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi hoặc yêu cầu sư phạm..."
              className="grow p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-sans focus:outline-hidden focus:border-blue-600"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2.5 rounded-xl bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700 transition-colors cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
