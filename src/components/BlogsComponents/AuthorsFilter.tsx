'use client'
import { User} from "lucide-react";



export default function AuthorsFilter({themeValue,light,dark}:any){
    return(
           <div>
            <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${themeValue ? 'text-gray-700' : 'text-gray-300'}`}>
            <User size={16} />
            Author
            </label>
            <select className={`w-full px-3 py-2 rounded-lg border ${
            themeValue 
                ? `${light} border-gray-300 text-gray-800` 
                : `${dark} border-gray-600 text-white`
            }`}>
            <option value="">All Authors</option>
            <option value="author1">John Doe</option>
            <option value="author2">Jane Smith</option>
            </select>
        </div>
    )
}