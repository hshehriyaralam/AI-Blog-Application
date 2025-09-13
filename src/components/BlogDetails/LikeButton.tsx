'use client'
import { Heart } from "lucide-react";
import { useState } from "react";

export default function LikeButton(){
    const [like, setLike] = useState(false)
    return (
        <button
        onClick={() => setLike(value => !value)}
        className={`p-2 sm:p-2.5  cursor-pointer rounded-full transition-all shadow-md hover:scale-110  ${like ? 'bg-pink-700' : 'bg-pink-200' }`}>
          <Heart className={`w-4 h-4 sm:w-5 sm:h-5  ${like ?  'text-pink-200'  : "text-pink-700"} `} />
        </button>
    )
}