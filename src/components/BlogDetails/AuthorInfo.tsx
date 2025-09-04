'use client'
import { User } from "lucide-react";


export default function AuthorInfo({blog,themeValue,lightText,DarkText}:any){
    return(
        <div className={`flex items-center gap-3 mt-12 border-t  ${themeValue ? "border-gray-700" : "border-gray-400"} pt-6`}>
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
    )
}
