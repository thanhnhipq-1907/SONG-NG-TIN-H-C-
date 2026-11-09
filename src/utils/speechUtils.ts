// Web Speech API wrapper for Text-to-Speech and Speech Recognition

export interface SpeechSynthesisOptions {
  rate?: number;
  pitch?: number;
  lang?: string;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

export function playTextToSpeech(text: string, options: SpeechSynthesisOptions = {}) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Web Speech API is not supported in this browser.');
    return null;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = options.lang || 'en-US';
  utterance.rate = options.rate ?? 1.0;
  utterance.pitch = options.pitch ?? 1.0;

  // Prefer English natural voices if available
  const voices = window.speechSynthesis.getVoices();
  const enVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('David')));
  if (enVoice) {
    utterance.voice = enVoice;
  }

  if (options.onEnd) {
    utterance.onend = options.onEnd;
  }
  if (options.onError) {
    utterance.onerror = options.onError;
  }

  window.speechSynthesis.speak(utterance);
  return utterance;
}

export function stopTextToSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

// Browser speech recognition wrapper
export function getSpeechRecognition() {
  if (typeof window === 'undefined') return null;
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRecognition) return null;

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  return recognition;
}
