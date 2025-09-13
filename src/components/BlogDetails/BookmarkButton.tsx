'use client'
import { Heart, Share2, Bookmark, } from "lucide-react";



export default function BookmarkButton(){
    return(
          <button className="p-2 sm:p-2.5 rounded-full bg-amber-100  
          hover:bg-amber-200  transition-all shadow-md hover:scale-110 cursor-pointer ">
          <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 " />
        </button>
    )
}