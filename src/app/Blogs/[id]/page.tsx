"use client";

import { useParams } from "next/navigation";
import { useSingleBlogQuery } from "../../../Redux/Services/blogApi"; 
import { ContextTheme } from "../../../Context/DarkTheme";
import { useContext } from "react";
import { Heart, Share2, Bookmark, Volume2, User } from "lucide-react";

export default function BlogDetail() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, error } = useSingleBlogQuery(id);
  const { themeValue, light, dark, lightText, DarkText } = useContext(ContextTheme);

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Error fetching blog details.</p>;

  const blog = data?.data;
  if (!blog) return <p className="text-center py-10">Blog not found!</p>;

  // Format date
  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Author Short ID
  const shortId = blog.userId?._id ? blog.userId._id.slice(-4) : null;

  // Short Title (first 3 words instead of last chars)
  const words = blog.blogTitle?.split(" ") || [];
  const shortTitle = words.slice(0, 4).join(" ");

  return (
    <div
      className={`w-full min-h-screen px-4 sm:px-6 py-10 ${
        themeValue ? light : dark
      }`}
    >
      <div className="max-w-full sm:max-w-4xl md:max-w-5xl mx-auto">
        
        {/* Blog Image */}
        <div className="w-full flex justify-center mb-6">
          <img
            src={blog.blogImage}
            alt={blog.blogTitle}
            className="w-[85%] sm:w-[80%] md:w-[95%] h-[280px] sm:h-[320px] md:h-[380px] rounded-lg shadow-lg object-cover hover:scale-[1.01] transition-transform duration-300"
          />
        </div>

        {/* Blog Title */}
        <h2
          className={`text-3xl sm:text-4xl md:text-4xl font-bold  mb-4 text-center tracking-wide ${
            themeValue ? lightText : DarkText
          }`}
        >
          {blog.blogTitle}
        </h2>

        {/* Author Line */}
        <p
          className={`text-center mb-10 italic font-medium ${
            themeValue ? "text-indigo-600" : "text-indigo-400"
          }`}
        >
          By <span className="font-semibold">{blog.userId?.name || "Unknown Author"}</span> 
          {" "} · {formattedDate} · <span className="font-semibold">{shortTitle}{shortId}</span>
        </p>

        {/* Blog Content */}
        <div className="mb-12 px-2 sm:px-6">
          <h3
            className={`text-2xl font-semibold mb-4 ${
              themeValue ? lightText : DarkText
            }`}
          >
            Content
          </h3>
          <p
            className={`leading-8 text-justify text-lg ${
              themeValue ? lightText : "text-gray-300"
            }`}
          >
            {blog.blogContent}
          </p>
        </div>

        {/* AI Summary */}
        {blog.blogSummary && (
          <div className="mb-12 px-2 sm:px-6">
            <h3
              className={`text-2xl font-semibold mb-4 ${
                themeValue ? lightText : DarkText
              }`}
            >
              AI Summary
            </h3>
            <p
              className={`leading-7 italic text-lg ${
                themeValue ? lightText : "text-gray-300"
              }`}
            >
              {blog.blogSummary}
            </p>
          </div>
        )}

       {/* Tags */}
        {blog.blogTags?.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-12">
            {blog.blogTags.map((tag: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs sm:text-sm font-medium shadow-sm hover:scale-105 transition-transform"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}


        {/* Actions Row */}
        <div className="flex items-center justify-between mt-8">
          {/* Listen Button */}
          <button className="flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium shadow-md transition-transform hover:scale-105 cursor-pointer ">
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 " />
            Listen
          </button>

          {/* Like / Share / Bookmark */}
          <div className="flex gap-3 sm:gap-4">
            <button className="p-2 sm:p-2.5 rounded-full bg-pink-100 dark:bg-pink-800 hover:bg-pink-200 dark:hover:bg-pink-700 transition-all shadow-md hover:scale-110">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600 dark:text-pink-300 cursor-pointer" />
            </button>
            <button className="p-2 sm:p-2.5 rounded-full bg-emerald-100 dark:bg-emerald-800 hover:bg-emerald-200 dark:hover:bg-emerald-700 transition-all shadow-md hover:scale-110">
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-300 cursor-pointer " />
            </button>
            <button className="p-2 sm:p-2.5 rounded-full bg-amber-100 dark:bg-amber-700 hover:bg-amber-200 dark:hover:bg-amber-600 transition-all shadow-md hover:scale-110">
              <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-300 cursor-pointer" />
            </button>
          </div>
        </div>

{/* Author Info Bottom */}
<div className="flex items-center gap-3 mt-12 border-t pt-6">
  {blog.userId?.profilePic ? (
    <img
      src={blog.userId.profilePic}
      alt={blog.userId.name}
      className="w-12 h-12 rounded-full object-cover border"
    />
  ) : (
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700">
      <User className="w-6 h-6 text-gray-600 dark:text-gray-300" />
    </div>
  )}
  <div>
    <p className={`font-semibold ${themeValue ? lightText : DarkText}`}>
      {blog.userId?.name || "Unknown Author"}
    </p>
    <p className="text-xs text-gray-400 dark:text-gray-500">
      {new Date(blog.createdAt).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}
    </p>
  </div>
</div>

      </div>
    </div>
  );
}
