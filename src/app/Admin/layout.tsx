"use client";
import Link from "next/link";
import { LayoutDashboard, FileText, Users, ThumbsUp, Bookmark } from "lucide-react";
import { ContextTheme } from "../../Context/DarkTheme";
import { useContext } from "react";


export default function DashboardLayout({ children }: any) {
    const { themeValue, light, dark } = useContext(ContextTheme);
  return (
    <section className={`min-h-screen flex ${themeValue ?  `${light} text-black  ` : `${dark} text-gray-200`}`}>
      {/* Sidebar - hidden on mobile */}
      <div className={`hidden md:flex w-56 flex-col py-6 px-4 shadow-lg  border-r ${themeValue ? 'border-gray-300' : 'border-gray-800'} `}>
        <h1 className="text-2xl font-bold text-center mb-4">Admin</h1>
        <Link href="/Admin" className={`flex items-center gap-3 p-3 rounded-lg ${themeValue ? 'hover:bg-gray-300' : 'hover:bg-gray-700'} `}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        <Link href="/Admin/allBlogs" className={`flex items-center gap-3 p-3 rounded-lg ${themeValue ? 'hover:bg-gray-300' : 'hover:bg-gray-700'} `}>
          <FileText size={20} />
          <span>All Blogs</span>
        </Link>
        <Link href="/Admin/allUsers" className={`flex items-center gap-3 p-3 rounded-lg ${themeValue ? 'hover:bg-gray-300' : 'hover:bg-gray-700'} `}>
          <Users size={20} />
          <span>All Users</span>
        </Link>
        <Link href="/Admin/userLikes" className={`flex items-center gap-3 p-3 rounded-lg ${themeValue ? 'hover:bg-gray-300' : 'hover:bg-gray-700'} `}>
          <ThumbsUp size={20} />
          <span>User Likes</span>
        </Link>
        <Link href="/Admin/userBookmarks" className={`flex items-center gap-3 p-3 rounded-lg ${themeValue ? 'hover:bg-gray-300' : 'hover:bg-gray-700'} `}>
          <Bookmark size={20} />
          <span>User Bookmarks</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">{children}</div>

      {/* Bottom Navbar - only on mobile */}
      <div
  className={`md:hidden fixed bottom-0 w-full border-t flex justify-around ${
    themeValue ? `${light} border-gray-200` : `${dark} border-gray-800`
  } py-2 z-50`}
>
  <Link href="/Admin" className="flex flex-col items-center text-sm">
    <LayoutDashboard className="w-6 h-6 mb-1" />
    <span>Dashboard</span>
  </Link>

  <Link href="/Admin/allBlogs" className="flex flex-col items-center text-sm">
    <FileText className="w-6 h-6 mb-1" />
    <span>Blogs</span>
  </Link>

  <Link href="/Admin/allUsers" className="flex flex-col items-center text-sm">
    <Users className="w-6 h-6 mb-1" />
    <span>Users</span>
  </Link>

  <Link href="/Admin/userLikes" className="flex flex-col items-center text-sm">
    <ThumbsUp className="w-6 h-6 mb-1" />
    <span>Likes</span>
  </Link>

  <Link href="/Admin/userBookmarks" className="flex flex-col items-center text-sm">
    <Bookmark className="w-6 h-6 mb-1" />
    <span>Bookmarks</span>
  </Link>
</div>

    </section>
  );
}
