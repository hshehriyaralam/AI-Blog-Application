'use client'
import { Heart, Share2, Bookmark, Volume2 } from "lucide-react";


export default function ListeBlog({
    isPlaying,
    blogContent,
    blogSummary,
    setCurrentIndex,
    setIsPlaying
}:any){
    const handleListen = () => {
    if (!isPlaying) {
      const synth = window.speechSynthesis;

      const sections: { section: string; words: string[]; heading: string }[] = [];
      if (blogContent) sections.push({ section: "content", words: blogContent.split(" "), heading: "Content" });
      if (blogSummary) sections.push({ section: "summary", words: blogSummary.split(" "), heading: "AI Summary" });

      let sectionIndex = 0;
      let wordIndex = -1; 

      const chunkSize = 1; 

const speakNext = () => {
  if (sectionIndex < sections.length) {
    const { section, words, heading } = sections[sectionIndex];

    if (wordIndex === -1) {
      // 🔊 Heading pehle
      const headingUtter = new SpeechSynthesisUtterance(heading);
      headingUtter.rate = 1.7; 
      headingUtter.pitch = 1;

      headingUtter.onstart = () =>
        setCurrentIndex({ section: `${section}-heading`, index: null });

      headingUtter.onend = () => {
        wordIndex = 0;
        speakNext();
      };

      synth.speak(headingUtter);
      return;
    }

    if (wordIndex < words.length) {
      // 🔊 Chunk of words
      const chunk = words.slice(wordIndex, wordIndex + chunkSize).join(" ");
      const utter = new SpeechSynthesisUtterance(chunk);
      utter.lang = "en-US";
      utter.rate = 1.5;
      utter.pitch = 1;

      // highlight starting word of chunk
      utter.onstart = () =>
        setCurrentIndex({ section, index: wordIndex });

      utter.onend = () => {
        wordIndex += chunkSize;
        speakNext();
      };

      synth.speak(utter);
    } else {
      sectionIndex++;
      wordIndex = -1;
      speakNext();
    }
  } else {
    setCurrentIndex({ section: "", index: null });
    setIsPlaying(false);
  }
};


      speakNext();
      setIsPlaying(true);
    } else {
      window.speechSynthesis.cancel();
      setCurrentIndex({ section: "", index: null });
      setIsPlaying(false);
    }
  };


    return(
        <button
        onClick={handleListen}
        className="flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full 
          bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium 
          hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-105 cursor-pointer"
      >
        <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 " />
        {isPlaying ? "Stop" : "Listen"}
      </button>
    )
}