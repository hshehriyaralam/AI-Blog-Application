"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSingleUserQuery } from "../../../Redux/Services/userApi";
import { ContextTheme } from "../../../Context/DarkTheme";
import { useContext, useState } from "react";
import {
  Mail,
  Calendar,
  FileText,
  User,
  Eye,
  Tag,
  BookOpen,
  Clock,
  ArrowRight,
  Shield,
  TrendingUp,
  BarChart3
} from "lucide-react";
import LoadingPage from "../../../components/layout/LoadingPage";
import BlogCard from "../../../components/BlogsComponents/BLogCard";

export default function AuthorsDetail() {
  const params = useParams();
  const id = params?.id as string;
  const { data: SingleUser, isLoading, error } = useSingleUserQuery(id);
  const { themeValue, light, dark } = useContext(ContextTheme);

  const user = SingleUser?.data?.user;
  const blogs = SingleUser?.data?.blogs || [];

  if (isLoading) return <LoadingPage />;
  if (error)
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        themeValue ? `${light}` : `${dark}`
      }`}>
        <div className="text-center">
          <div className="text-red-500 text-2xl font-bold mb-4">Error fetching author details</div>
          <p className="text-gray-600 dark:text-gray-400">Please try again later</p>
        </div>
      </div>
    );

  if (!user)
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        themeValue ? `${light}` : `${dark}`
      }`}>
        <div className="text-center">
          <div className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Author not found</div>
          <p className="text-gray-600 dark:text-gray-400">The author you're looking for doesn't exist</p>
        </div>
      </div>
    );

  // Date formatting
  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  const lastSeen = user.lastSeenAt
    ? new Date(user.lastSeenAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Recently active";

  // Calculate total views and average read time
  const totalViews = blogs.reduce((sum: number, blog: any) => sum + (blog.views || 0), 0);
  const totalReadTime = blogs.reduce((sum: number, blog: any) => {
    const wordCount = blog.blogContent?.split(/\s+/).length || 0;
    return sum + Math.ceil(wordCount / 200);
  }, 0);
  const avgReadTime = blogs.length > 0 ? Math.round(totalReadTime / blogs.length) : 0;
  return (
    <div className={`min-h-screen ${
        themeValue ? `${light}` : `${dark}`
      } py-8`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Section */}
        <div className={`rounded-2xl border ${
          themeValue ? `${light} shadow-lg border-gray-200 ` : `${dark} shadow-xl border border-gray-700`
        } overflow-hidden mb-8`}>
          <div className="flex flex-col md:flex-row">
            {/* Profile Image */}
            <div className="md:w-1/3 p-8 flex flex-col items-center justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 p-1.5">
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                    {user.profilePic ? (
                      <img
                        src={user.profilePic}
                        alt={`${ <User className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />}`}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <User className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
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

              {user.bio && (
                <div className={`p-4 rounded-xl mb-6 ${
                  themeValue ? 'bg-gray-50' : 'bg-gray-700/50'
                }`}>
                  <p className={`text-sm ${themeValue ? 'text-gray-600' : 'text-gray-300'}`}>
                    {user.bio}
                  </p>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className={`p-3 rounded-xl text-center ${
                  themeValue ? 'bg-indigo-50' : 'bg-indigo-900/30'
                }`}>
                  <div className="text-2xl font-bold text-indigo-600">{blogs.length}</div>
                  <div className="text-xs text-indigo-600 dark:text-indigo-400">Articles</div>
                </div>
                <div className={`p-3 rounded-xl text-center ${
                  themeValue ? 'bg-green-50' : 'bg-green-900/30'
                }`}>
                  <div className="text-2xl font-bold text-green-600">{totalViews}</div>
                  <div className="text-xs text-green-600 dark:text-green-400">Total Views</div>
                </div>
                <div className={`p-3 rounded-xl text-center ${
                  themeValue ? 'bg-blue-50' : 'bg-blue-900/30'
                }`}>
                  <div className="text-2xl font-bold text-blue-600">{avgReadTime}m</div>
                  <div className="text-xs text-blue-600 dark:text-blue-400">Avg Read</div>
                </div>
                <div className={`p-3 rounded-xl text-center ${
                  themeValue ? 'bg-purple-50' : 'bg-purple-900/30'
                }`}>
                  <div className="text-2xl font-bold text-purple-600">24</div>
                  <div className="text-xs text-purple-600 dark:text-purple-400">Followers</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blogs Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${themeValue ? 'text-gray-800' : 'text-white'}`}>
              Articles by {user.name}
            </h2>
            <span className={`text-sm ${themeValue ? 'text-gray-600' : 'text-gray-400'}`}>
              {blogs.length} articles published
            </span>
          </div>

          {blogs.length === 0 ? (
            <div className={`text-center py-12 rounded-2xl ${
              themeValue ? 'bg-white shadow-lg' : 'bg-gray-800 shadow-xl'
            }`}>
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className={`text-lg font-semibold mb-2 ${themeValue ? 'text-gray-800' : 'text-white'}`}>
                No articles yet
              </h3>
              <p className={`text-gray-600 dark:text-gray-400`}>
                {user.name} hasn't published any articles yet.
              </p>
            </div>
          ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {blogs.map((blog: any, index: number) => {
    const hasImage =
      blog.userId?.profilePic &&
      blog.userId.profilePic.trim() !== "" 

    return (
      <Link key={blog._id} href={`/Blogs/${blog._id}`}>
        <div
          className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer
            ${themeValue ? `${light} border border-gray-200` : `${dark} border border-gray-700`}
          `}
        >
          {/* Image with Gradient */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={blog.blogImage}
              alt={blog.blogTitle}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

            {/* Tags */}
            {blog.blogTags.length > 0 && (
              <div className="absolute bottom-2 left-3 flex flex-wrap gap-2">
                {blog.blogTags.slice(0, 2).map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3
              className={`font-semibold mb-2 text-lg ${
                themeValue ? "text-gray-800" : "text-white"
              }`}
            >
              {blog.blogTitle}
            </h3>

            <p
              className={`text-sm mb-3 line-clamp-2 ${
                themeValue ? "text-gray-600" : "text-gray-300"
              }`}
            >
              {blog.blogSummary}
            </p>

            {/* Author + Date */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 p-0.5">
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden">
                    {hasImage ? (
                      <img
                        src={blog.userId.profilePic}
                        alt={blog.userId?.name || "Author"}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-indigo-600">No Pic</span>
                    )}
                  </div>
                </div>
                <div className="ml-3">
                  <p
                    className={`text-sm font-medium ${
                      themeValue ? "text-gray-800" : "text-white"
                    }`}
                  >
                    {blog.userId?.name || "Unknown Author"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <span
                className={`text-xs font-medium ${
                  themeValue ? "text-indigo-600" : "text-indigo-400"
                }`}
              >
                Read more →
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  })}
</div>

          )}
        </div>
      </div>
    </div>
  );
}