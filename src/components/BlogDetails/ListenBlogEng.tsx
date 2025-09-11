'use client'
import { Volume2 } from "lucide-react";

export default function ListeBlogEng({
  isPlaying,
  blogContent,
  blogSummary,
  setCurrentIndex,
  setIsPlaying,
}: any) {
  const handleListenEng = () => {
    if (!isPlaying) {
      const synth = window.speechSynthesis;

      const sections = [
        { section: "content-heading", text: "Content" },
        { section: "content", text: blogContent || "" },
      ];

      if (blogSummary) {
        sections.push({ section: "summary-heading", text: "AI Summary" });
        sections.push({ section: "summary", text: blogSummary });
      }

      let allWords: { section: string; word: string; localIndex: number }[] = [];
      sections.forEach((sec) => {
        sec.text.split(/\s+/).forEach((w:any, idx:number) => {
          allWords.push({ section: sec.section, word: w, localIndex: idx });
        });
      });

      const fullText = sections.map((s) => s.text).join(" ");
      const utter = new SpeechSynthesisUtterance(fullText);
      utter.lang = "en-US"; 
      utter.rate = 1.1;
      utter.pitch = 1;

      utter.onboundary = (event) => {
        if (event.name === "word" || event.charIndex !== undefined) {
          const currentChar = event.charIndex;

          let cumulative = 0;
          for (let i = 0; i < allWords.length; i++) {
            cumulative += allWords[i].word.length + 1;
            if (currentChar < cumulative) {
              setCurrentIndex({
                section: allWords[i].section,
                index: allWords[i].localIndex, 
              });
              break;
            }
          }
        }
      };

      utter.onend = () => {
        setCurrentIndex({ section: "", index: null });
        setIsPlaying(false);
      };
      synth.speak(utter);
      setIsPlaying(true);
    } else {
      window.speechSynthesis.cancel();
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
      <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 " />
      {isPlaying ? "Stop" : "Listen Eng"}
    </button>
  );
}
