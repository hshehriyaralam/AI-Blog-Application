'use client'
import {Search} from 'lucide-react'


export default function TitleFilter({themeValue,light,dark}:any){
    return(
          <div>
            <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${themeValue ? 'text-gray-700' : 'text-gray-300'}`}>
            <Search size={16} />
            Title
            </label>
            <input
            type="text"
            placeholder="Filter by title..."
            className={`w-full px-3 py-2 rounded-lg border ${
                themeValue 
                ? `${light} border-gray-300 text-gray-800`
                : `${dark} border-gray-600 text-white`
            }`}
            />
        </div>
    )
}