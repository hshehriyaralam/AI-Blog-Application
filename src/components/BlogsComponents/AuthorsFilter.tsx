'use client'
import { User} from "lucide-react";
import { useAllUserQuery } from "../../Redux/Services/userApi"



export default function AuthorsFilter({themeValue,light,dark}:any){
    const { data, isLoading, isError } = useAllUserQuery({})
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
             {data?.data?.map((user: any) => (
            <option
            key={user.id}
            value="">{user.name}</option>
             ))}   
            </select>
        </div>
    )
}