'use client'

import { useParams } from "next/navigation";
import { useSingleUserQuery } from '../../../Redux/Services/userApi'
import { ContextTheme } from "../../../Context/DarkTheme";
import { useContext } from "react";
import { Mail, Calendar, FileText, Shield, Ban, User, Eye } from "lucide-react";

export default function AuthorsDetail() {
  const params = useParams();
  const id = params?.id as string;
  const { data, isLoading, error } = useSingleUserQuery(id);
  const { themeValue } = useContext(ContextTheme);

  const user = data?.data;

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Error fetching Author details.</p>;
  if (!user) return <p className="text-center py-10">User not found!</p>;

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
    : "N/A";

  return (
    <div className={`w-full min-h-screen flex flex-col items-center p-6 ${themeValue ? "bg-gray-100" : "bg-gray-900"}`}>
      
      {/* Main Profile Card */}
      <div
        className={`w-3/4 rounded-2xl shadow-lg overflow-hidden border transition-all 
        ${themeValue ? "bg-white border-gray-300" : "bg-gray-800 border-gray-700"}`}
      >
        {/* Top Section with Profile */}
        <div className="flex flex-col items-center p-6">
          <img
            src={user.profilePic}
            alt={user.name}
            className="w-28 h-28 rounded-full border-4 border-indigo-500 object-cover shadow-md"
          />
          <h2 className={`mt-4 text-2xl font-bold ${themeValue ? "text-gray-800" : "text-white"}`}>
            {user.name}
          </h2>
          <span
            className={`mt-1 px-3 py-1 text-sm rounded-full ${
              user.role === "admin"
                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            }`}
          >
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </span>
        </div>

        {/* Info Section */}
        <div className="p-6 space-y-4">
          <div className="flex items-center">
            <Mail className="w-5 h-5 mr-3 text-indigo-500" />
            <span className={`${themeValue ? "text-gray-700" : "text-gray-300"}`}>{user.email}</span>
          </div>

          {user.bio && (
            <div className="flex items-start">
              <User className="w-5 h-5 mr-3 text-green-500 mt-1" />
              <p className={`${themeValue ? "text-gray-700" : "text-gray-300"}`}>{user.bio}</p>
            </div>
          )}

          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-3 text-blue-500" />
            <span className={`${themeValue ? "text-gray-700" : "text-gray-300"}`}>
              Joined: {joinedDate}
            </span>
          </div>

          <div className="flex items-center">
            <Eye className="w-5 h-5 mr-3 text-purple-500" />
            <span className={`${themeValue ? "text-gray-700" : "text-gray-300"}`}>
              Last Seen: {lastSeen}
            </span>
          </div>

          <div className="flex items-center">
            <FileText className="w-5 h-5 mr-3 text-green-600" />
            <span className={`${themeValue ? "text-gray-700" : "text-gray-300"}`}>
              Blogs Published:{" "}
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                {user.blogCount || 0}
              </span>
            </span>
          </div>

          <div className="flex items-center space-x-6 mt-4">
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-yellow-500" />
              <span
                className={`text-sm font-medium ${
                  user.isAdmin ? "text-green-600 dark:text-green-400" : "text-gray-500"
                }`}
              >
                {user.isAdmin ? "Admin" : "User"}
              </span>
            </div>
            <div className="flex items-center">
              <Ban className="w-5 h-5 mr-2 text-red-500" />
              <span
                className={`text-sm font-medium ${
                  user.isBanned ? "text-red-600 dark:text-red-400" : "text-gray-500"
                }`}
              >
                {user.isBanned ? "Banned" : "Active"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section for 3 Cards */}
      <div className="w-3/4 mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className={`p-6 rounded-xl shadow ${themeValue ? "bg-white" : "bg-gray-800"}`}>
          Card 1 (future user)
        </div>
        <div className={`p-6 rounded-xl shadow ${themeValue ? "bg-white" : "bg-gray-800"}`}>
          Card 2 (future user)
        </div>
        <div className={`p-6 rounded-xl shadow ${themeValue ? "bg-white" : "bg-gray-800"}`}>
          Card 3 (future user)
        </div>
      </div>
    </div>
  );
}
