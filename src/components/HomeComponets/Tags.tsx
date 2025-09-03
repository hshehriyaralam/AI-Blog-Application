'use client'
import { useContext } from 'react';
import { ContextTheme } from '../../Context/DarkTheme'
import { useFetchBlogQuery } from '../../Redux/Services/blogApi';
import { Hash, Loader2 } from 'lucide-react';

export default function Tags() {
  const { themeValue, lightText, DarkText } = useContext(ContextTheme)
  const { data, isLoading, isError } = useFetchBlogQuery([])

  if (isLoading) {
    return (
      <div className={`p-5 rounded-xl flex items-center justify-center ${
        themeValue 
          ? `bg-white shadow-md border border-gray-100`
          : `bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 shadow-lg`
      }`}>
        <Loader2 className="animate-spin text-indigo-500" size={24} />
        <span className={`ml-2 text-sm ${themeValue ? 'text-gray-700' : 'text-gray-200'}`}>
          Loading...
        </span>
      </div>
    )
  }

  // Agar error aaya ho
  if (isError) {
    return (
      <div className={`p-5 rounded-xl text-center ${
        themeValue 
          ? `bg-white shadow-md border border-gray-100`
          : `bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 shadow-lg`
      }`}>
        <p className={`text-sm ${themeValue ? lightText : DarkText}`}>Failed to load tags 😢</p>
      </div>
    )
  }

  const allTags = data?.data.map((blogs: { blogTags: string[] }) => blogs.blogTags).flat() || [];
  const uniqueTags = [...new Set(allTags)]

  return (
    <div className={`p-5 rounded-xl ${themeValue 
      ? `bg-white shadow-md border border-gray-100`
      : `bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 shadow-lg`
    }`}>
      <div className="flex items-center gap-2 mb-4">
        <div className={`p-2 rounded-lg ${themeValue 
          ? 'bg-indigo-100 text-indigo-600' 
          : 'bg-indigo-900/30 text-indigo-300'
        }`}>
          <Hash size={18} />
        </div>
        <h3 className={`text-lg font-semibold ${themeValue ? lightText : DarkText}`}>
          Popular Tags
        </h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {uniqueTags.slice(0, 6).map((tag: any, index: any) => (
          <span
            key={index}
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer group ${
              themeValue 
                ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 hover:from-indigo-100 hover:to-purple-100 hover:text-indigo-800 shadow-sm' 
                : 'bg-gradient-to-r from-indigo-900/30 to-purple-900/30 text-indigo-200 hover:from-indigo-900/40 hover:to-purple-900/40 hover:text-white shadow-md'
            }`}
          >
            <Hash size={12} className="mr-1 opacity-70 group-hover:opacity-100" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
