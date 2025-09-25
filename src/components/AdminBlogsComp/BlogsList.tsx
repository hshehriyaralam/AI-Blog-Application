"use client";
import Image from "next/image";
import { FileText, Trash2, Eye, User, Calendar, Edit } from "lucide-react";
import ActionsAdmin from "./Actions";

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
      <div className={`divide ${
        themeValue ? `${light}  ` : `${dark} `
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
  className={`grid grid-cols-12 gap-4 p-4 transition-colors duration-200 items-center group ${
    themeValue
      ? "hover:bg-gray-50 border-b border-gray-300"
      : "hover:bg-gray-700/50 border-b border-gray-700"
  }`}
>
  {/* Thumbnail */}
  <div className="col-span-12 md:col-span-1 flex justify-center md:justify-start">
    {blog?.blogImage ? (
      <div className="relative w-14 h-14 rounded-lg overflow-hidden shadow-sm">
        <img
          src={blog.blogImage}
          alt={blog.blogTitle}
          className="w-full h-full object-cover"
        />
      </div>
    ) : (
      <div
        className={`w-14 h-14 rounded-lg flex items-center justify-center shadow-sm ${
          themeValue
            ? "bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-400"
            : "bg-gradient-to-br from-blue-900/20 to-indigo-900/20 text-blue-400"
        }`}
      >
        <FileText size={20} />
      </div>
    )}
  </div>

  {/* Blog Info */}
  <div className="col-span-12 md:col-span-5">
    <h3
      className={`font-semibold mb-1 line-clamp-2 leading-tight ${
        themeValue ? "text-gray-900" : "text-white"
      } group-hover:text-indigo-600 transition-colors`}
    >
      {blog.blogTitle}
    </h3>
    <p
      className={`text-sm line-clamp-1 mb-1 ${
        themeValue ? "text-gray-600" : "text-gray-300"
      }`}
    >
      {blog.blogContent}
    </p>
    <div className="flex items-center space-x-3 text-xs">
      <span
        className={`flex items-center ${
          themeValue ? "text-gray-500" : "text-gray-400"
        }`}
      >
        <Calendar size={12} className="mr-1" />
        {formatDate(blog.createdAt)}
      </span>
    </div>
  </div>

  {/* Author */}
  <div className="col-span-6 md:col-span-2 flex items-center space-x-2">
    {blog?.userId?.profilePic ? (
      <div className="relative w-8 h-8">
        <img
          src={blog.userId.profilePic}
          alt={blog?.userId?.name || "Author"}
          className="rounded-full object-cover w-full h-full"
        />
      </div>
    ) : (
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          themeValue
            ? "bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600"
            : "bg-gradient-to-br from-purple-900/30 to-pink-900/30 text-purple-400"
        }`}
      >
        <User size={14} />
      </div>
    )}
    <span
      className={`text-sm font-medium truncate max-w-[100px] ${
        themeValue ? "text-gray-700" : "text-gray-200"
      }`}
    >
      {blog?.userId?.name}
    </span>
  </div>

  {/* Actions */}
  <div className="col-span-6 md:col-span-2 flex items-center space-x-2 justify-end md:justify-start">
    <ActionsAdmin themeValue={themeValue} blog={blog} />
  </div>

  {/* Status */}
  <div className="hidden md:block  col-span-12 md:col-span-2 flex items-center mt-2 md:mt-0">
    <span
      className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusStyles(
        blog.status
      )}`}
    >
      {blog.status?.charAt(0).toUpperCase() + blog.status?.slice(1) || "Published"}
    </span>
  </div>
</div>))
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