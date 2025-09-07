'use client'
import {Tag} from 'lucide-react'


export default function TagsFilter({themeValue,light,dark}:any){
    return(
        <div>
        <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${themeValue ? 'text-gray-700' : 'text-gray-300'}`}>
        <Tag size={16} />
        Tags
        </label>
        <select className={`w-full px-3 py-2 rounded-lg border ${
        themeValue 
            ? `${light} border-gray-300 text-gray-800` 
            : `${dark} border-gray-600 text-white`
        }`}>
        <option value="">All Tags</option>
        <option value="technology">Technology</option>
        <option value="design">Design</option>
        <option value="business">Business</option>
        </select>
    </div>
    )
}