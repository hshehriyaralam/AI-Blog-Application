'use client'
import { Calendar } from "lucide-react"


export default function DateFilter({themeValue,light,dark}:any){
    return(
        <div>
            <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${themeValue ? 'text-gray-700' : 'text-gray-300'}`}>
            <Calendar size={16} />
            Date
            </label>
            <select className={`w-full px-3 py-2 rounded-lg border ${
            themeValue 
                ? `${light} border-gray-300 text-gray-800` 
                : `${dark} border-gray-600 text-white`
            }`}>
            <option value="">All Time</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
            </select>
        </div>

    )
}