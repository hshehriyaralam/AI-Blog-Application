"use client";
import { ContextTheme } from "../../Context/DarkTheme";
import { useContext } from "react";
import { User, Mail, Calendar, Eye, FileText, ArrowRight, Circle } from "lucide-react";
import { useAllUserQuery } from "../../Redux/Services/userApi";

// TODO: Replace this with actual logged-in user ID from auth context/store
const loggedInUserId = "12345"; 

export default function Authors() {
  const { data } = useAllUserQuery(undefined);
  const { themeValue, light, dark } = useContext(ContextTheme);

  const users = data?.data || [];

  return (
    <div className={`w-full min-h-screen px-4 py-8 ${themeValue ? light : dark}`}>
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
          Meet Our Creative Authors
        </h1>
        <p className={`text-lg ${themeValue ? "text-gray-600" : "text-gray-400"} max-w-2xl mx-auto`}>
          Discover the talented writers and contributors who bring amazing content to our platform
        </p>
      </div>

      {/* Authors Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user: any, index: number) => {
            const isYou = user._id === loggedInUserId;

          const joinedDate = user.createdAt
            ? new Date(user.createdAt).toLocaleDateString("en-US", {
                month: "long", // e.g. August
                day: "numeric", // e.g. 16
                year: "numeric", // e.g. 2025
              })
            : "N/A";

            // Last Seen → Full Date + Time
            const lastSeen = user.lastSeenAt
              ? new Date(user.lastSeenAt).toLocaleString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A";

            return (
              <div
                key={index}
                className={`group rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300
                  border hover:border-indigo-400 hover:shadow-xl hover:scale-105 
                  min-w-[320px]
                  ${themeValue ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"}
                `}
              >
                {/* Profile Image */}
                <div className="relative mb-4">
                  {user.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt={user.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-indigo-400"
                    />
                  ) : (
                    <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600 border-2 border-indigo-400">
                      <User className="w-8 h-8 text-gray-600 dark:text-gray-300" />
                    </div>
                  )}

                  {/* Active Badge */}
                  {user.isOnline && (
                    <span className="absolute bottom-1 right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <Circle className="relative w-4 h-4 text-green-500 fill-green-500 rounded-full" />
                    </span>
                  )}
                </div>

                {/* Author Info */}
                <h2 className={`text-lg font-semibold mb-1 ${themeValue ? "text-gray-800" : "text-white"}`}>
                  {user.name} {isYou && <span className="text-sm text-indigo-500">(You)</span>}
                </h2>

                {/* Role Badge */}
                <div className="flex items-center justify-center mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    }`}
                  >
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </div>

                {/* Email */}
                <div className="flex items-center justify-center mb-4 w-full">
                  <Mail className="w-4 h-4 mr-2 text-indigo-500" />
                  <span
                    title={user.email}
                    className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[200px]"
                  >
                    {user.email}
                  </span>
                </div>

                {/* Stats */}
                <div className="w-full space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-2 text-green-500" />
                      <span className={themeValue ? "text-gray-600" : "text-gray-400"}>Blogs</span>
                    </div>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      {user.blogCount || 0}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      <span className={themeValue ? "text-gray-600" : "text-gray-400"}>Joined</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{joinedDate}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-2 text-purple-500" />
                      <span className={themeValue ? "text-gray-600" : "text-gray-400"}>Last Seen</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{lastSeen}</span>
                  </div>
                </div>

                {/* View Profile Button */}
                <button className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-105">
                  View Profile
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
