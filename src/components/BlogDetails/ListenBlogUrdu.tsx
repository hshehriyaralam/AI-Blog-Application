'use client'
import { Heart, Share2, Bookmark, Volume2 } from "lucide-react";


export default function ListeBlogUrdu({
    isPlaying,
    blogContent,
    blogSummary,
    setCurrentIndex,
    setIsPlaying
}:any){
 const handleListenUrdu = () => {
  if (!isPlaying) {
    const synth = window.speechSynthesis;
    const urduText = `${blogContent} ${blogSummary || ""}`;

    const words = urduText.split(/\s+/);

    const utter = new SpeechSynthesisUtterance(urduText);
    utter.lang = "ur-PK";
    utter.rate = 1.2; 
    utter.pitch = 1;

    utter.onboundary = (event) => {
      if (event.name === "word" || event.charIndex !== undefined) {
        const currentChar = event.charIndex;

        let cumulative = 0;
        for (let i = 0; i < words.length; i++) {
          cumulative += words[i].length + 1; 
          if (currentChar < cumulative) {
            setCurrentIndex({ section: "content", index: i });
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
    return(
        <button
        onClick={handleListenUrdu}
        className="flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full 
          bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium 
          hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-105 cursor-pointer"
      >
        <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 " />
        {isPlaying ? "Stop" : "Listen Urdu"}
      </button>
    )
}