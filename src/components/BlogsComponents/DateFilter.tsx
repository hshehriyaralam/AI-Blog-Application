'use client'
import { Calendar } from "lucide-react"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react"


export default function DateFilter({themeValue,light,dark,BlogsDate}:any){
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
            {BlogsDate.map((date: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined):any => ( 
            <option value=""
            key={index}
            >{date}</option>
            ))}
            {/* <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option> */}
            </select>
        </div>

    )
}