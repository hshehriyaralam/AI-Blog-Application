"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSingleUserQuery } from "../../../Redux/Services/userApi";
import { ContextTheme } from "../../../Context/DarkTheme";
import { useContext } from "react";
import {
  Mail,
  Calendar,
  FileText,
  Shield,
  Ban,
  User,
  Eye,
  Tag,
} from "lucide-react";
import LoadingPage from "../../../components/layout/LoadingPage";

export default function AuthorsDetail() {
  const params = useParams();
  const id = params?.id as string;
  const { data: SingleUser, isLoading, error } = useSingleUserQuery(id);
  const { themeValue } = useContext(ContextTheme);

  const user = SingleUser?.data?.user;
  const blogs = SingleUser?.data?.blogs || [];

  if (isLoading) return <LoadingPage />;
  if (error)
    return (
      <div className="w-full h-screen flex justify-center text-red-500 font-bold text-2xl items-center">
        Error fetching Author details.
      </div>
    );

  if (!user)
    return (
      <div className="w-full h-screen flex justify-center text-red-500 font-bold text-2xl items-center">
        User Not Found
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
    : "N/A";

  return (
    <div
      className={`w-full min-h-screen flex flex-col items-center p-6 ${
        themeValue ? "bg-gray-100" : "bg-gray-900"
      }`}
    >
      {/* ---------- Profile Section ---------- */}
      <div
        className={`w-3/4 rounded-2xl shadow-lg overflow-hidden border transition-all flex flex-col md:flex-row mb-10
        ${themeValue ? "bg-white border-gray-300" : "bg-gray-800 border-gray-700"}`}
      >
        {/* Profile Image */}
        <div className="flex justify-center items-center p-6 md:w-1/3">
          <img
            src={user.profilePic}
            alt={user.name}
            className="w-40 h-40 rounded-full border-4 border-indigo-500 object-cover shadow-md"
          />
        </div>

        {/* Profile Info */}
        <div className="p-6 md:w-2/3 space-y-4">
          <h2
            className={`text-3xl font-bold ${
              themeValue ? "text-gray-800" : "text-white"
            }`}
          >
            {user.name}
          </h2>
          <span
            className={`px-3 py-1 text-sm rounded-full ${
              user.role === "admin"
                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            }`}
          >
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </span>

          <div className="flex items-center">
            <Mail className="w-5 h-5 mr-3 text-indigo-500" />
            <span className={themeValue ? "text-gray-700" : "text-gray-300"}>
              {user.email}
            </span>
          </div>

          {user.bio && (
            <div className="flex items-start">
              <User className="w-5 h-5 mr-3 text-green-500 mt-1" />
              <p className={themeValue ? "text-gray-700" : "text-gray-300"}>
                {user.bio}
              </p>
            </div>
          )}

          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-3 text-blue-500" />
            <span className={themeValue ? "text-gray-700" : "text-gray-300"}>
              Joined: {joinedDate}
            </span>
          </div>

          <div className="flex items-center">
            <Eye className="w-5 h-5 mr-3 text-purple-500" />
            <span className={themeValue ? "text-gray-700" : "text-gray-300"}>
              Last Seen: {lastSeen}
            </span>
          </div>

          <div className="flex items-center">
            <FileText className="w-5 h-5 mr-3 text-green-600" />
            <span className={themeValue ? "text-gray-700" : "text-gray-300"}>
              Blogs Published:{" "}
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                {blogs.length}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* ---------- Blogs Section ---------- */}
      <div className="w-3/4 space-y-6">
         <h3 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
          Blogs by {user.name}
        </h3>

        {blogs.length === 0 ? (
          <p
            className={`text-center text-lg ${
              themeValue ? "text-gray-600" : "text-gray-300"
            }`}
          >
            No blogs published yet.
          </p>
        ) : (
          blogs.map((blog: any) => (
            <div key={blog._id} >
            <Link href={`/Blogs/${blog._id}`}>
            <div
              className={`rounded-xl shadow-md border p-6 flex flex-col md:flex-row gap-6
              ${themeValue ? "bg-white border-gray-300" : "bg-gray-800 border-gray-700"}`}
            >
              {/* Blog Image */}
              <img
                src={blog.blogImage}
                alt={blog.blogTitle}
                className="w-full md:w-1/3 h-48 object-cover rounded-lg shadow-sm"
              />

              {/* Blog Content */}
              <div className="flex-1 space-y-3">
                <h4
                  className={`text-xl font-semibold ${
                    themeValue ? "text-gray-800" : "text-white"
                  }`}
                >
                  {blog.blogTitle}
                </h4>
                <p
                  className={`line-clamp-3 ${
                    themeValue ? "text-gray-600" : "text-gray-300"
                  }`}
                >
                  {blog.blogSummary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {blog.blogTags.map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full flex items-center gap-1"
                    >
                      <Tag className="w-3 h-3" /> {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Published:{" "}
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
