import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const speechLangMap: Record<string, string> = {
  en: "en-US",
  hi: "hi-IN",
  te: "te-IN",
  ta: "ta-IN",
  kn: "kn-IN",
  mr: "mr-IN",
};

export const useTextToSpeech = () => {
  const { language } = useLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  /* -------- Load voices safely -------- */
  useEffect(() => {
    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  /* -------- Speak function -------- */
  const speak = (text: string) => {
    if (!text) return;

    // 🔴 HARD reset (this is the magic)
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    // ⏱ give browser a tick to reset
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);

      const langCode = speechLangMap[language] || "en-US";
      utterance.lang = langCode;
      utterance.rate = 0.9;
      utterance.pitch = 1;

      const voice =
        voicesRef.current.find(v => v.lang === langCode) ||
        voicesRef.current.find(v =>
          v.lang.startsWith(langCode.split("-")[0])
        );

      if (voice) utterance.voice = voice;

      utterance.onstart = () => setIsSpeaking(true);

      utterance.onend = () => {
        setIsSpeaking(false);
        window.speechSynthesis.cancel(); // 👈 extra safety
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        window.speechSynthesis.cancel();
      };

      window.speechSynthesis.speak(utterance);
    }, 100); // 🔑 tiny delay fixes reuse bug
  };

  /* -------- Stop function -------- */
  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return { speak, stop, isSpeaking };
};
