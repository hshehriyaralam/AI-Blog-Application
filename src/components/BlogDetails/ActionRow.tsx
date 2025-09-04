'use client'
import { useState } from "react";
import { Heart, Share2, Bookmark, Volume2 } from "lucide-react";

export default function ActionsBar() {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex items-center justify-between mt-8">
      {/* Listen Button */}
      <button className="flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full 
        bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium 
        hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-105 cursor-pointer">
        <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 " />
        Listen
      </button>

      {/* Like / Share / Bookmark */}
      <div className="flex gap-3 sm:gap-4">
        {/* ❤️ Like Button */}
        <button
          onClick={() => setLiked(!liked)}
          className={`p-2 sm:p-2.5 rounded-full transition-all shadow-md hover:scale-110 
            ${liked ? "bg-pink-600" : "bg-pink-100 hover:bg-pink-200"}`}
        >
          <Heart
            className={`w-4 h-4 sm:w-5 sm:h-5 cursor-pointer 
              ${liked ? "text-white fill-white" : "text-pink-600 dark:text-pink-300"}`}
          />
        </button>

        {/* 🔗 Share */}
        <button className="p-2 sm:p-2.5 rounded-full bg-emerald-100 dark:bg-emerald-800 
          hover:bg-emerald-200 dark:hover:bg-emerald-700 transition-all shadow-md hover:scale-110">
          <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-300 cursor-pointer" />
        </button>

        {/* 🔖 Bookmark */}
        <button className="p-2 sm:p-2.5 rounded-full bg-amber-100 dark:bg-amber-700 
          hover:bg-amber-200 dark:hover:bg-amber-600 transition-all shadow-md hover:scale-110">
          <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-300 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
