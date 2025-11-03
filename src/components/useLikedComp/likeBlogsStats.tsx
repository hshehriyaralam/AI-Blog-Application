"use client"
import { Heart, User, FileText  } from "lucide-react";

export default function LikeBlogsStats({themeValue,likes,light,dark}:any){
    return(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className={`rounded-xl p-6 shadow-lg border ${
            themeValue ? `${light} border-gray-200` : `${dark} border-gray-700`
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${themeValue ? 'text-gray-600' : 'text-gray-300'}`}>Total Likes</p>
                <p className={`text-2xl font-bold mt-1 ${themeValue ? 'text-gray-900' : 'text-white'}`}>
                  {likes.length}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${
                themeValue ? 'bg-pink-50' : 'bg-pink-900/30'
              }`}>
                <Heart size={24} className="text-pink-600" />
              </div>
            </div>
          </div>

          <div className={`rounded-xl p-6 shadow-lg border ${
            themeValue ? `${light} border-gray-200` : `${dark} border-gray-700`
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${themeValue ? 'text-gray-600' : 'text-gray-300'}`}>Unique Users</p>
                <p className={`text-2xl font-bold mt-1 ${themeValue ? 'text-gray-900' : 'text-white'}`}>
                  {new Set(likes.map((like:any) => like.userId)).size}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${
                themeValue ? 'bg-blue-50' : 'bg-blue-900/30'
              }`}>
                <User size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className={`rounded-xl p-6 shadow-lg border ${
            themeValue ? `${light} border-gray-200` :  `${dark} border-gray-700`
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${themeValue ? 'text-gray-600' : 'text-gray-300'}`}>Blogs Liked</p>
                <p className={`text-2xl font-bold mt-1 ${themeValue ? 'text-gray-900' : 'text-white'}`}>
                  {new Set(likes.map((like:any) => like.blogId)).size}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${
                themeValue ? 'bg-green-50' : 'bg-green-900/30'
              }`}>
                <FileText size={24} className="text-green-600" />
              </div>
            </div>
          </div>
        </div>
    )
}