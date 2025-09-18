'use client'
import {User,Mail,Calendar,FileText,Eye} from 'lucide-react'



export default function AuthorsProfileSection(
    {
        themeValue,
        light,
        dark,
        user,
        joinedDate,
        lastSeen,
        blogs,
        totalViews,
        avgReadTime,
        totalLikes,
        hasImage,
        setImgError
    }:any){
    return(
        <div className={`rounded-2xl border ${
          themeValue ? `${light} shadow-lg border-gray-200 ` : `${dark} shadow-xl border border-gray-700`
        } overflow-hidden mb-8`}>
          <div className="flex flex-col md:flex-row">
            {/* Profile Image */}
            <div className="md:w-1/3 p-8 flex flex-col items-center justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 p-1.5">
                  <div className="w-full h-full rounded-full bg-white  flex items-center justify-center overflow-hidden">
                    {hasImage ? (
                      <img
                        src={user.profilePic}
                        alt={`${ <User className="w-12 h-12 text-indigo-600 " />}`}
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <User className="w-12 h-12 text-indigo-600 " />
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                  user.role === "admin"
                    ? "bg-red-100 text-red-800 "
                    : "bg-indigo-100 text-indigo-800  "
                }`}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="md:w-2/3 p-8 border-l border-gray-200 dark:border-gray-700">
              <h1 className={`text-3xl font-bold mb-4 ${themeValue ? 'text-gray-800' : 'text-white'}`}>
                {user.name}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-indigo-500" />
                  <span className={themeValue ? "text-gray-700" : "text-gray-300"}>
                    {user.email}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <span className={themeValue ? "text-gray-700" : "text-gray-300"}>
                    Joined {joinedDate}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-purple-500" />
                  <span className={themeValue ? "text-gray-700" : "text-gray-300"}>
                    Last seen {lastSeen}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-green-500" />
                  <span className={themeValue ? "text-gray-700" : "text-gray-300"}>
                    {blogs.length} articles published
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className={`p-3 rounded-xl text-center ${
                  themeValue ? 'bg-indigo-50' : 'bg-indigo-900/30'
                }`}>
                  <div className="text-2xl font-bold text-indigo-600">{blogs.length}</div>
                  <div className="text-xs text-indigo-600 ">Articles</div>
                </div>
                <div className={`p-3 rounded-xl text-center ${
                  themeValue ? 'bg-green-100' : 'bg-green-900/30'
                }`}>
                  <div className="text-2xl font-bold text-green-600">{totalViews}</div>
                  <div className="text-xs text-green-600 ">Total Views</div>
                </div>
                <div className={`p-3 rounded-xl text-center ${
                  themeValue ? 'bg-blue-100' : 'bg-blue-900/30'
                }`}>
                  <div className="text-2xl font-bold text-blue-600">{avgReadTime}m</div>
                  <div className="text-xs text-blue-600 ">Avg Read</div>
                </div>
                <div className={`p-3 rounded-xl text-center ${
                  themeValue ? 'bg-purple-100' : 'bg-purple-900/30'
                }`}>
                  <div className="text-2xl font-bold text-purple-600">{totalLikes}</div>
                  <div className="text-xs text-purple-600 ">Likes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}