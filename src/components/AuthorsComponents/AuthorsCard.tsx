'use client'
import { ContextTheme } from "../../Context/DarkTheme";
import { useContext } from "react";
import { User, Mail, Calendar, Eye, FileText, ArrowRight, Circle } from "lucide-react";
import Link from "next/link";


export default function AuthorsCard({user,isYou,joinedDate,lastSeen}:any){
    const { themeValue } = useContext(ContextTheme);
    return(
         <div
        className={`group rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300
            border hover:border-indigo-400 hover:shadow-xl hover:scale-105 
            min-w-[320px]
            ${themeValue ? "bg-white border-gray-300" : "bg-gray-800 border-gray-700"}
        `}>
                {/* Profile Image */}
                <div className="relative mb-4">
                  {user.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt={user.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-indigo-400"
                    />
                  ) : (
                    <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600 border-2 border-indigo-400">
                      <User className="w-8 h-8 text-gray-600 dark:text-gray-300" />
                    </div>
                  )}
                </div>

                {/* Author Info */}
                <h2 className={`text-lg font-semibold mb-1 ${themeValue ? "text-gray-800" : "text-white"}`}>
                  {user.name} {isYou && <span className="text-sm text-indigo-500 font-bold">(You)</span>}
                </h2>

                {/* Role Badge */}
                <div className="flex items-center justify-center mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    }`}
                  >
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </div>

                {/* Email */}
                <div className="flex items-center justify-center mb-4 w-full">
                  <Mail className="w-4 h-4 mr-2 text-indigo-500" />
                  <span
                    title={user.email}
                    className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[200px]"
                  >
                    {user.email}
                  </span>
                </div>

                {/* Stats */}
                <div className="w-full space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-2 text-green-500" />
                      <span className={themeValue ? "text-gray-600" : "text-gray-400"}>Blogs</span>
                    </div>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      {user.blogCount || 0}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      <span className={themeValue ? "text-gray-600" : "text-gray-400"}>Joined</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{joinedDate}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-2 text-purple-500" />
                      <span className={themeValue ? "text-gray-600" : "text-gray-400"}>Last Seen</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{lastSeen}</span>
                  </div>
                </div>

                {/* View Profile Button */}
                <Link
                href={`/Authors/${user.id}`}
                className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-105"
                >
                <button className="flex justify-center items-center cursor-pointer" >
                  View Profile &  Blogs
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
                </Link>
              </div>
    )
}