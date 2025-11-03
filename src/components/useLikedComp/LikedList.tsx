"use client"
import { Heart,  Calendar,  Eye } from "lucide-react";
import { ContextTheme } from "../../Context/DarkTheme"
import { useContext } from "react";


export default function LikedLists({filteredLikes,searchQuery}:any){
  const { themeValue, light, dark } = useContext(ContextTheme);
    const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
    return(
         <div className={`rounded-xl shadow-lg border overflow-hidden ${
          themeValue ? `${light} border-gray-200` : `${dark} border-gray-700`
        }`}>
          {/* Table Header */}
          <div className={`grid grid-cols-12 gap-4 p-6 border-b ${
            themeValue ? `${light} border-gray-200  text-gray-900` : `${dark} border-gray-700  text-white`
          } font-semibold text-sm`}>
            <div className="col-span-4">User</div>
            <div className="col-span-5">Blog</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-1 text-right">Action</div>
          </div>

          {/* Table Body */}
          <div className={`divide-y ${
            themeValue ? 'divide-gray-200' : 'divide-gray-700'
          }`}>
            {filteredLikes.length === 0 ? (
              <div className="p-12 text-center">
                <Heart size={48} className={`mx-auto mb-4 ${
                  themeValue ? 'text-gray-300' : 'text-gray-600'
                }`} />
                <p className={themeValue ? 'text-gray-600' : 'text-gray-300'}>
                  {searchQuery ? "No likes found matching your search" : "No likes data available"}
                </p>
              </div>
            ) : (
              filteredLikes.map((like:any) => (
                <div
                  key={like.id}
                  className={`grid grid-cols-12 gap-4 p-6 transition-colors duration-200 items-center ${
                    themeValue 
                      ? 'hover:bg-gray-50' 
                      : 'hover:bg-gray-700/50'
                  }`}
                >
                  {/* User Info */}
                  <div className="col-span-4 flex items-center space-x-3">
                    <img
                      src={like.userAvatar}
                      alt={like.userName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className={`font-semibold truncate ${
                        themeValue ? 'text-gray-900' : 'text-white'
                      }`}>
                        {like.userName}
                      </h3>
                      <p className={`text-sm truncate ${
                        themeValue ? 'text-gray-600' : 'text-gray-300'
                      }`}>
                        {like.userEmail}
                      </p>
                    </div>
                  </div>

                  {/* Blog Info */}
                  <div className="col-span-5">
                    <h4 className={`font-medium mb-1 ${
                      themeValue ? 'text-gray-800' : 'text-gray-200'
                    }`}>
                      {like.blogTitle}
                    </h4>
                    <p className={`text-sm ${
                      themeValue ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      by {like.blogAuthor}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="col-span-2">
                    <p className={`text-sm flex items-center ${
                      themeValue ? 'text-gray-600' : 'text-gray-300'
                    }`}>
                      <Calendar size={14} className="mr-2" />
                      {formatDate(like.likedAt)}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="col-span-1 flex justify-end">
                    <button
                      className={`p-2 rounded-lg transition-colors ${
                        themeValue
                          ? 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                          : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      }`}
                      title="View Blog"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
    )
}