'use client';
import { Volume2 } from "lucide-react";
import { useEffect, useRef } from "react";

export default function ListeBlogEng({
  isPlaying,
  blogContent,
  blogSummary,
  setCurrentIndex,
  setIsPlaying,
}: any) {
  const fallbackInterval = useRef<any>(null);

  const handleListenEng = () => {
    if (!isPlaying) {
      if (!("speechSynthesis" in window)) {
        alert("Your browser does not support speech synthesis.");
        return;
      }

      // Cancel any existing queue & clear interval
      window.speechSynthesis.cancel();
      if (fallbackInterval.current) clearInterval(fallbackInterval.current);

      const sections = [
        { section: "content", text: blogContent || "" },
      ];
      if (blogSummary) sections.push({ section: "summary", text: blogSummary });

      // Prepare word list for highlighting
      let allWords: { section: string; word: string; localIndex: number }[] = [];
      sections.forEach(sec =>
        sec.text.split(/\s+/).forEach((w:any, idx:any) => allWords.push({ section: sec.section, word: w, localIndex: idx }))
      );

      const fullText = sections.map(s => s.text).join(" ");
      const utter = new SpeechSynthesisUtterance(fullText);
      utter.lang = "en-US";
      utter.rate = 1;
      utter.pitch = 1;

      const isMobile = /Mobi|Android/i.test(navigator.userAgent);

      // 🔹 Desktop highlight using onboundary
      if (!isMobile) {
        utter.onboundary = (event: any) => {
          if (event.charIndex !== undefined) {
            const currentChar = event.charIndex;
            let cumulative = 0;
            for (let i = 0; i < allWords.length; i++) {
              cumulative += allWords[i].word.length + 1; // +1 for space
              if (currentChar < cumulative) {
                setCurrentIndex({ section: allWords[i].section, index: allWords[i].localIndex });
                break;
              }
            }
          }
        };
      }

      // 🔹 Mobile highlight fallback using interval
      if (isMobile) {
        let i = 0;
        const avgTimePerWord = 300; // Approx 300ms per word
        fallbackInterval.current = setInterval(() => {
          if (i < allWords.length && isPlaying) {
            setCurrentIndex({ section: allWords[i].section, index: allWords[i].localIndex });
            i++;
          } else {
            clearInterval(fallbackInterval.current);
          }
        }, avgTimePerWord);
      }

      // 🔹 On end cleanup
      utter.onend = () => {
        if (fallbackInterval.current) clearInterval(fallbackInterval.current);
        setCurrentIndex({ section: "", index: null });
        setIsPlaying(false);
      };

      // Speak immediately
      window.speechSynthesis.speak(utter);
      setIsPlaying(true);

    } else {
      window.speechSynthesis.cancel();
      if (fallbackInterval.current) clearInterval(fallbackInterval.current);
      setCurrentIndex({ section: "", index: null });
      setIsPlaying(false);
    }
  };

  return (
    <button
      onClick={handleListenEng}
      className="flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full 
        bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium 
        hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-105 cursor-pointer"
    >
      <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
      {isPlaying ? "Stop" : "Listen"}
    </button>
  );
}
