'use client'
import { ContextTheme } from '../../Context/DarkTheme'
import { useContext, useState } from 'react';
import { User, TrendingUp, ArrowRight, Loader2 } from "lucide-react";
import { useAllUserQuery } from "../../Redux/Services/userApi"
import Link from 'next/link';

function AuthorItem({ user, themeValue, index }: any) {
  const [imgError, setImgError] = useState(false);
  const hasImage = user?.profilePic && user.profilePic.trim() !== "" && !imgError;

  return (
    <Link href={`/Authors/${user.id}`}>
      <li className={`flex items-center gap-3 p-2.5 rounded-lg transition-all duration-200
        ${themeValue ? `hover:bg-gray-300 ` : `hover:bg-gray-800 `} group`}>
        
        {/* Author Avatar */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 p-0.5">
            <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
              {hasImage ? (
                <img
                  src={user.profilePic}
                  alt={`${user.name || "Author"}-pic`}
                  className="w-9 h-9 rounded-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              )}
            </div>
          </div>
        </div>

        {/* Author Info */}
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold truncate ${themeValue ? 'text-gray-800' : 'text-white'}`}>
            {user.name}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <TrendingUp size={12} className="text-indigo-500" />
            <p className="text-xs text-indigo-600 font-medium">
              {user?.blogCount || 0} Articles
            </p>
          </div>
        </div>   
      </li>
    </Link>
  )
}

export default function TopAuthors() {
  const { data, isLoading, isError } = useAllUserQuery(undefined)
  const { themeValue } = useContext(ContextTheme)

  // 🔹 Loading State
  if (isLoading) {
    return (
      <div className={`p-4 rounded-xl flex items-center justify-center ${
        themeValue 
          ? 'bg-white shadow-md border border-gray-100' 
          : 'bg-gray-800/40 backdrop-blur-sm border border-gray-700/30 shadow-lg'
      }`}>
        <Loader2 className="animate-spin text-indigo-500" size={24} />
        <span className={`ml-2 text-sm ${themeValue ? 'text-gray-700' : 'text-gray-200'}`}>
          Loading...
        </span>
      </div>
    )
  }

  // 🔹 Error State
  if (isError) {
    return (
      <div className={`p-4 rounded-xl text-center ${
        themeValue 
          ? 'bg-white shadow-md border border-gray-100' 
          : 'bg-gray-800/40 backdrop-blur-sm border border-gray-700/30 shadow-lg'
      }`}>
        <p className={`text-sm ${themeValue ? 'text-red-600' : 'text-red-400'}`}>
          Failed to load authors 😢
        </p>
      </div>
    )
  }

  const Authors = data?.data.map((user: any) => ({
    name: user.name,
    blogCount: user.blogCount || 0,
    profilePic: user.profilePic,
    id: user.id 
  })) || [];

  // Sort descending (most articles first)
  const TopAuthors = Authors.sort((a: any, b: any) => b.blogCount - a.blogCount).slice(0, 5);

  return (
    <div className={`p-4 rounded-xl ${
      themeValue 
        ? 'bg-white shadow-md border border-gray-100' 
        : 'bg-gray-800/40 backdrop-blur-sm border border-gray-700/30 shadow-lg'
    }`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className={`p-1.5 rounded-md ${
          themeValue 
            ? 'bg-indigo-100 text-indigo-600' 
            : 'bg-indigo-900/30 text-indigo-300'
        }`}>
          <TrendingUp size={16} />
        </div>
        <h3 className={`text-base font-semibold ${themeValue ? 'text-gray-800' : 'text-white'}`}>
          Top Authors
        </h3>
      </div>

      {/* Authors List */}
      <ul className="space-y-2">
        {TopAuthors.map((user: any, index: number) => (
          <AuthorItem 
            key={user.id || index} 
            user={user} 
            themeValue={themeValue}
            index={index}
          />
        ))}
      </ul>

      {/* View All Link */}
      {Authors.length > 6 && (
        <div className="mt-2 pt-2 border-t border-gray-700/50">
          <Link href={'/Authors'}>
            <button className={`flex items-center gap-1.5 text-sm font-medium transition-all hover:underline w-full justify-center cursor-pointer ${
              themeValue 
                ? 'text-indigo-600 hover:text-indigo-700' 
                : 'text-indigo-400 hover:text-indigo-300'
            }`}>
              View all authors
              <ArrowRight size={14} />
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}
