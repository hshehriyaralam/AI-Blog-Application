"use client";
import Image from "next/image";
import { FileText, Trash2, Eye, User, Calendar, Edit } from "lucide-react";

interface Blog {
  _id: string;
  blogTitle: string;
  blogContent: string;
  blogImage?: string;
  status: "published" | "draft";
  createdAt: string;
  userId: {
    name: string;
    profilePic?: string;
  };
}


export default function AllBlogList({ filteredBlogs, themeValue,light,dark }: any) {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusStyles = (status: string) => {
    if (themeValue) {
      // Light theme
      return status === "published" 
        ? "bg-green-100 text-green-800 border-green-200" 
        : "bg-yellow-100 text-yellow-800 border-yellow-200";
    } else {
      // Dark theme
      return status === "published"
        ? "bg-green-900/30 text-green-400 border-green-700"
        : "bg-yellow-900/30 text-yellow-400 border-yellow-700";
    }
  };

  return (
    <div>
      <div className={`divide-y ${
        themeValue ? `${light}` : `${dark}`
      }`}>
        {filteredBlogs.length === 0 ? (
          <div className="p-12 text-center">
            <FileText
              size={48}
              className={`mx-auto mb-4 ${
                themeValue ? 'text-gray-300' : 'text-gray-600'
              }`}
            />
            <p className={themeValue ? 'text-gray-600' : 'text-gray-300'}>
              No blogs found matching your criteria
            </p>
          </div>
        ) : (
          filteredBlogs.map((blog: Blog) => (
            <div
              key={blog._id}
              className={`grid grid-cols-12 gap-4 p-6 transition-colors duration-200 items-center group ${
                themeValue 
                  ? 'hover:bg-gray-50' 
                  : 'hover:bg-gray-700/50'
              }`}
            >
              {/* Thumbnail */}
              <div className="col-span-2 md:col-span-1 flex justify-center">
                {blog?.blogImage ? (
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden shadow-sm">
                    <img
                      src={blog.blogImage}
                      alt={blog.blogTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className={`w-14 h-14 rounded-lg flex items-center justify-center shadow-sm ${
                    themeValue 
                      ? 'bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-400' 
                      : 'bg-gradient-to-br from-blue-900/20 to-indigo-900/20 text-blue-400'
                  }`}>
                    <FileText size={20} />
                  </div>
                )}
              </div>

              {/* Blog Info */}
              <div className="col-span-10 md:col-span-5 lg:col-span-5">
                <h3 className={`font-semibold mb-2 line-clamp-2 leading-tight ${
                  themeValue ? 'text-gray-900' : 'text-white'
                } group-hover:text-indigo-600 transition-colors`}>
                  {blog.blogTitle}
                </h3>
                <p className={`text-sm line-clamp-1 mb-2 ${
                  themeValue ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  {blog.blogContent}
                </p>
                <div className="flex items-center space-x-3 text-xs">
                  <span className={`flex items-center ${
                    themeValue ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    <Calendar size={12} className="mr-1" />
                    {formatDate(blog.createdAt)}
                  </span>
                </div>
              </div>

              {/* Author */}
              <div className="col-span-6 md:col-span-2 lg:col-span-2 flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {blog?.userId?.profilePic ? (
                    <div className="relative w-8 h-8">
                      <img
                        src={blog.userId.profilePic}
                        alt={blog?.userId?.name || "Author"}
                        className="rounded-full object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      themeValue 
                        ? 'bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600' 
                        : 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 text-purple-400'
                    }`}>
                      <User size={14} />
                    </div>
                  )}
                  <span className={`text-sm font-medium truncate max-w-[100px] ${
                    themeValue ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    {blog?.userId?.name}
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="col-span-3 md:col-span-2 lg:col-span-2">
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                    getStatusStyles(blog.status)
                  }`}
                >
                  {blog.status?.charAt(0).toUpperCase() + blog.status?.slice(1) || "Published"}
                </span>
              </div>

              {/* Actions */}
              <div className="col-span-3 md:col-span-2 lg:col-span-2 flex items-center justify-end space-x-1">
                <button
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    themeValue
                      ? 'bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700'
                      : 'bg-blue-900/30 hover:bg-blue-900/50 text-blue-400 hover:text-blue-300'
                  } group/tooltip relative`}
                  title="View Blog"
                >
                  <Eye size={16} />
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap">
                    View Blog
                  </span>
                </button>
                
                <button
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    themeValue
                      ? 'bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700'
                      : 'bg-red-900/30 hover:bg-red-900/50 text-red-400 hover:text-red-300'
                  } group/tooltip relative`}
                  title="Delete Blog"
                >
                  <Trash2 size={16} />
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap">
                    Delete Blog
                  </span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Mobile View Enhancements */}
      <style jsx>{`
        @media (max-width: 768px) {
          .grid-cols-12 > div {
            margin-bottom: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}