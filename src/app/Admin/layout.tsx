"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Users, ThumbsUp, Bookmark, LogOut, Menu, X } from "lucide-react";
import { ContextTheme } from "../../Context/DarkTheme";
import { useContext } from "react";

export default function DashboardLayout({ children }: any) {
    const { themeValue, light, dark,  } = useContext(ContextTheme);
    const pathname = usePathname();

    const menuItems = [
        { href: "/Admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/Admin/allBlogs", label: "All Blogs", icon: FileText },
        { href: "/Admin/allUsers", label: "All Users", icon: Users },
        { href: "/Admin/userLikes", label: "User Likes", icon: ThumbsUp },
        { href: "/Admin/userBookmarks", label: "User Bookmarks", icon: Bookmark },
    ];

     const MobilemenuItems = [
        { href: "/Admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/Admin/allBlogs", label: "All Blogs", icon: FileText },
        { href: "/Admin/allUsers", label: "All Users", icon: Users },
        { href: "/Admin/userLikes", label: "User Likes", icon: ThumbsUp },
        { href: "/Admin/userBookmarks", label: "User Bookmarks", icon: Bookmark },
    ];

    const isActive = (href: string) => pathname === href;

    return (
       <section className={`min-h-screen flex ${themeValue ? light : dark}`}>
  {/* Sidebar - Desktop */}
  <div
    className={`hidden md:flex w-56 flex-col border-r ${
      themeValue
        ? `${light} border-gray-200 text-black`
        : `${dark} border-gray-700 text-gray-200`
    } shadow-lg sticky top-0 h-screen`}
  >
    {/* Sidebar Header */}
    <div
      className={`p-6 border-b ${
        themeValue ? "border-gray-300" : "border-gray-800"
      }`}
    >
      <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Admin Control
      </h1>
      <p
        className={`text-sm ${
          themeValue ? "text-gray-600" : "text-gray-300"
        }`}
      >
        Manage your platform
      </p>
    </div>

    {/* Navigation Menu */}
    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
            isActive(item.href)
              ? "text-indigo-500 shadow-sm"
              : `hover:bg-gray-100 ${
                  themeValue
                    ? "text-black hover:text-gray-900"
                    : "hover:text-black text-gray-200"
                }`
          }`}
        >
          <item.icon size={20} />
          <span className="font-medium">{item.label}</span>
        </Link>
      ))}
    </nav>
  </div>

  {/* Main Content */}
  <div className="flex-1 flex flex-col min-h-screen">
    <main className="flex-1 p-4 overflow-y-auto">{children}</main>
  </div>
</section>

    );
}