'use client'
import {Tag} from 'lucide-react'
import { useFetchBlogQuery } from '../../Redux/Services/blogApi';


export default function TagsFilter({themeValue,light,dark}:any){
    const { data, isLoading, isError } = useFetchBlogQuery([])

    const allTags = data?.data.map((blogs: { blogTags: string[] }) => blogs.blogTags).flat() || [];
    const uniqueTags = [...new Set(allTags)]
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
        {uniqueTags.slice(0,10).map((tag, index) => (
        <option value={String(tag)} key={index}>
            {String(tag)}
        </option>
        ))}
        </select>
    </div>
    )
}