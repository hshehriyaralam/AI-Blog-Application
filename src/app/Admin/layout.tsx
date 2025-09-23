"use client";
import Link from "next/link";
import { LayoutDashboard, FileText, Users, ThumbsUp, Bookmark } from "lucide-react";
import { ContextTheme } from "../../Context/DarkTheme"
import { useContext } from "react";


export default function DashboardLayout({ children }: any) {
  const { themeValue, light, dark } = useContext(ContextTheme);
  return (
    <section className={`min-h-screen flex ${themeValue ?  `${light}`  : `${dark}` }`}>
      {/* Sidebar */}
      <div className={`w-56 border-r ${themeValue ? `${light} text-black border-gray-200 `: `${dark} text-gray-200 border-gray-700`} flex flex-col py-6 px-4 shadow-xl    border-gray-200 `}>
        <h1 className="text-2xl font-bold text-center mb-4">Admin</h1>
        <Link
          href="/Admin"
          className={`flex items-center gap-3 p-3 rounded-lg  ${themeValue ? `hover:bg-gray-300` : `hover:bg-gray-700`} transition`}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/Admin/allBlogs"
          className={`flex items-center gap-3 p-3 rounded-lg ${themeValue ? `hover:bg-gray-300` : `hover:bg-gray-700`} transition`}>
          <FileText size={20} />
          <span>All Blogs</span>
        </Link>

        <Link
          href="/Admin/allUsers"
          className={`flex items-center gap-3 p-3 rounded-lg ${themeValue ? `hover:bg-gray-300` : `hover:bg-gray-700`} transition`}>
          <Users size={20} />
          <span>All Users</span>
        </Link>

        <Link
          href="/Admin/userLikes"
          className={`flex items-center gap-3 p-3 rounded-lg ${themeValue ? `hover:bg-gray-300` : `hover:bg-gray-700`} transition`}>
          <ThumbsUp size={20} />
          <span>User Likes</span>
        </Link>

        <Link
          href="/Admin/userBookmarks"
          className={`flex items-center gap-3 p-3 rounded-lg ${themeValue ? `hover:bg-gray-300` : `hover:bg-gray-700`} transition`}>
          <Bookmark size={20} />
          <span>User Bookmarks</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-50">{children}</div>
    </section>
  )
}
