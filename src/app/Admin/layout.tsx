"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Users, ThumbsUp, Bookmark, LogOut, Menu, X } from "lucide-react";
import { ContextTheme } from "../../Context/DarkTheme";
import { useContext, useState } from "react";

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
            <div className={`hidden md:flex w-64 flex-col  border-r ${themeValue ? `${light} border-gray-200  text-black` : `${dark} border-gray-700  text-gray-200`} shadow-lg`}>
                {/* Sidebar Header */}
                <div className={`p-6 border-b ${themeValue ? 'border-gray-500 ' : 'border-gray-700 '}  `}>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Admin Dashboard
                    </h1>
                    <p className={`text-sm  ${themeValue ? 'text-gray-600' : 'text-gray-300'} mt-1`}>Manage your platform</p>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                                isActive(item.href)
                                    ? 'text-indigo-500 shadow-sm'
                                    : ` hover:bg-gray-100  ${themeValue ? 'text-black  hover:text-gray-900' : ' hover:text-black text-gray-200 '}`
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
                {/* Main Content Area */}
                <main className="flex-1 p-4 overflow-auto">
                    {children}
                </main>
            </div>

            {/* Bottom Navigation - Mobile */}
            <div className={`md:hidden fixed bottom-0 left-0 right-0 ${
                themeValue ? `${light} border-t border-gray-200` : `${dark} border-t border-gray-700`
            } py-3 z-50`}>
                <div className={`flex justify-around `}>
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center text-xs transition-all ${
                                isActive(item.href)
                                    ? 'text-indigo-600'
                                    : 'text-gray-500 '
                            }`}
                        >
                            <item.icon 
                                size={20} 
                                className={`mb-1 ${isActive(item.href) ? 'scale-110' : ''}`}
                            />
                            <span className={`text-[10px]  ${isActive(item.href) ? 'font-semibold' : 'font-normal'}`}>
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}