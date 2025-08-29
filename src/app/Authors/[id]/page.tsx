"use client";
import { useParams } from "next/navigation";
import { useSingleUserQuery } from "../../../Redux/Services/userApi";
import { useFetchBlogQuery } from "../../../Redux/Services/blogApi";
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
} from "lucide-react";
import LoadingPage from "../../../components/layout/LoadingPage";

export default function AuthorsDetail() {
  const params = useParams();
  const id = params?.id as string;
  const { data: SingleUser, isLoading, error } = useSingleUserQuery(id);
  const { data } = useFetchBlogQuery([]);
  const { themeValue } = useContext(ContextTheme);

  const user = SingleUser?.data;
  const blogs = data?.data;

  if (isLoading) return <LoadingPage />;
  if (error)
    return (
      <div
        className={`w-full h-screen flex justify-center
        text-red-500 font-bold text-2xl items-center`}
      >
        Error fetching Author details.
      </div>
    );

  if (!user)
    return (
      <div
        className={`w-full h-screen flex justify-center
        text-red-500 font-bold text-2xl items-center`}
      >
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
      {/* Main Profile Card */}
      <div
        className={`w-3/4 rounded-2xl shadow-lg overflow-hidden border transition-all flex flex-col md:flex-row 
        ${themeValue ? "bg-white border-gray-300" : "bg-gray-800 border-gray-700"}`}
      >
        {/* Left Side: Profile Image */}
        <div className="flex justify-center items-center p-6 md:w-1/3">
          <img
            src={user.profilePic}
            alt={user.name}
            className="w-40 h-40 rounded-full border-4 border-indigo-500 object-cover shadow-md"
          />
        </div>

        {/* Right Side: Info */}
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
            <span
              className={`${themeValue ? "text-gray-700" : "text-gray-300"}`}
            >
              {user.email}
            </span>
          </div>

          {user.bio && (
            <div className="flex items-start">
              <User className="w-5 h-5 mr-3 text-green-500 mt-1" />
              <p
                className={`${themeValue ? "text-gray-700" : "text-gray-300"}`}
              >
                {user.bio}
              </p>
            </div>
          )}

          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-3 text-blue-500" />
            <span
              className={`${themeValue ? "text-gray-700" : "text-gray-300"}`}
            >
              Joined: {joinedDate}
            </span>
          </div>

          <div className="flex items-center">
            <Eye className="w-5 h-5 mr-3 text-purple-500" />
            <span
              className={`${themeValue ? "text-gray-700" : "text-gray-300"}`}
            >
              Last Seen: {lastSeen}
            </span>
          </div>

          <div className="flex items-center">
            <FileText className="w-5 h-5 mr-3 text-green-600" />
            <span
              className={`${themeValue ? "text-gray-700" : "text-gray-300"}`}
            >
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
                  user.isAdmin
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-500"
                }`}
              >
                {user.isAdmin ? "Admin" : "User"}
              </span>
            </div>
            <div className="flex items-center">
              <Ban className="w-5 h-5 mr-2 text-red-500" />
              <span
                className={`text-sm font-medium ${
                  user.isBanned
                    ? "text-red-600 dark:text-red-400"
                    : "text-gray-500"
                }`}
              >
                {user.isBanned ? "Banned" : "Active"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <div className="w-3/4 mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.length > 0 ? (
          data?.data?.slice(0, 3).map((blog: any) => (
            <div
              key={blog._id}
              className={`p-6 rounded-xl shadow ${
                themeValue ? "bg-white" : "bg-gray-800"
              }`}
            >
              <h3
                className={`text-lg font-bold mb-2 ${
                  themeValue ? "text-gray-800" : "text-white"
                }`}
              >
                {blog.title}
              </h3>
              <p
                className={`text-sm line-clamp-3 ${
                  themeValue ? "text-gray-600" : "text-gray-400"
                }`}
              >
                {blog.content}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500">
            No blogs published yet.
          </div>
        )}
      </div>
    </div>
  );
}
