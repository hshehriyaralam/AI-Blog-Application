"use client"
import { Heart, Share2, Bookmark, Volume2 } from "lucide-react";
import ListeBlogEng from './ListenBlogEng'
import ListeBlogUrdu  from './ListenBlogUrdu'

export default function ActionRow({
  blogContent,
  blogSummary,
  isPlaying,
  setIsPlaying,
  setCurrentIndex,
}: {
  blogContent: string;
  blogSummary?: string;
  isPlaying: boolean;
  setIsPlaying: (v: boolean) => void;
  setCurrentIndex: (v: { section: string; index: number | null }) => void;
}) {



 
  return (
    <div className="flex items-center justify-between mt-8">
      {/* Listen Button */}

      <div  className="flex gap-6">
      <ListeBlogEng
        isPlaying={isPlaying}
        blogContent={blogContent}
        blogSummary={blogSummary}
        setCurrentIndex={setCurrentIndex}
        setIsPlaying={setIsPlaying}
      />
        </div>

      {/* Like / Share / Bookmark */}
      <div className="flex gap-3 sm:gap-4">
        <button className="p-2 sm:p-2.5 rounded-full transition-all shadow-md hover:scale-110 bg-pink-100 hover:bg-pink-200">
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />
        </button>
        <button className="p-2 sm:p-2.5 rounded-full bg-emerald-100  
          hover:bg-emerald-200  transition-all shadow-md hover:scale-110">
          <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 " />
        </button>
        <button className="p-2 sm:p-2.5 rounded-full bg-amber-100  
          hover:bg-amber-200  transition-all shadow-md hover:scale-110">
          <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 " />
        </button>
      </div>
    </div>
  );
}
