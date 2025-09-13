'use client'
import { Share2  } from "lucide-react";


export default function ShareButton(){
    return(
         <button className="p-2 sm:p-2.5 rounded-full bg-emerald-100  
          hover:bg-emerald-200  transition-all shadow-md hover:scale-110 cursor-pointer ">
          <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 " />
        </button>
    )
}