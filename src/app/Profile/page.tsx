"use client";
import { useDispatch } from "react-redux";
import { googleLoginThunk } from "../../Redux/Slices/authSlice";
import type { AppDispatch } from "../../Redux/store";
import { useGetProfileQuery, useDeleteProfileMutation } from "../../Redux/Services/userApi";
import { useDeleteBlogMutation } from "../../Redux/Services/blogApi";
import { Button } from "../../components/ui/button";
import { User, Trash2, Plus, Mail, Calendar, Eye, FileText, LogOut } from "lucide-react";
import { useState, useContext } from "react";
import { ContextTheme } from "../../Context/DarkTheme";
import Link from "next/link";
import { taintObjectReference } from "next/dist/server/app-render/entry-base";


export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const { themeValue, light, dark } = useContext(ContextTheme);
  const { data: Profile, isLoading } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [deleteProfile] = useDeleteProfileMutation();
  const [deleteBlog, { isLoading: deleting }] = useDeleteBlogMutation();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const user = Profile?.user;
  const blogs = Profile?.blogs || [];

  const handleDeleteBlog = async (id: string) => {
    try {
      await deleteBlog(id).unwrap();
      alert("Blog deleted successfully ✅");
    } catch {
      alert("Failed to delete blog ❌");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteProfile().unwrap();
      alert("Account deleted successfully ✅");
    } catch {
      alert("Failed to delete account ❌");
    }
  };

  const handleGoogleLogin = () => {
    dispatch(googleLoginThunk());
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className={`${themeValue ? "text-gray-800" : "text-gray-300"}`}>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className={`text-center p-8 rounded-2xl shadow-lg ${themeValue ? light : dark}`}>
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">No Profile Found</h2>
          <p className="mb-6 text-gray-500">Please sign in to view your profile</p>
          <Button onClick={handleGoogleLogin} className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            Sign In with Google
          </Button>
        </div>
      </div>
    );
  }

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

  // Calculate total views
  const totalViews = blogs.reduce((sum: number, blog: any) => sum + (blog.views || 0), 0);

  return (
    <div className={`min-h-screen ${themeValue ? light : dark} py-8`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Section - Matching Authors Detail Design */}
        <div className={`rounded-2xl border ${
          themeValue ? `${light} shadow-lg border-gray-200` : `${dark} shadow-xl border-gray-700`
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
                        alt={user.name}
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
                    ? "bg-red-100 text-red-800  "
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


              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className={`p-3 rounded-xl text-center ${
                  themeValue ? 'bg-indigo-100' : 'bg-indigo-900/30'
                }`}>
                  <div className="text-2xl font-bold text-indigo-600 ">{blogs.length}</div>
                  <div className="text-xs text-indigo-600 ">Articles</div>
                </div>
                <div className={`p-3 rounded-xl text-center ${
                  themeValue ? 'bg-green-100' : 'bg-green-900/30'
                }`}>
                  <div className="text-2xl font-bold text-green-600 ">{totalViews}</div>
                  <div className="text-xs text-green-600 ">Total Views</div>
                </div>
                <div className={`p-3 rounded-xl text-center ${
                  themeValue ? 'bg-blue-100' : 'bg-blue-900/30'
                }`}>
                  <div className="text-2xl font-bold text-blue-600 ">24</div>
                  <div className="text-xs text-blue-600 ">Followers</div>
                </div>
                <div className={`p-3 rounded-xl text-center ${
                  themeValue ? 'bg-purple-100' : 'bg-purple-900/30'
                }`}>
                  <div className="text-2xl font-bold text-purple-600">42</div>
                  <div className="text-xs text-purple-600 ">Likes</div>
                </div>
              </div>

              {/* Account Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleGoogleLogin}
                  className={`flex items-center gap-2    cursor-pointer  bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-md `}
                >
                  <LogOut className="w-4 h-4" />
                  Switch Account
                </Button>
                <Button 
                  onClick={() => setShowDeleteConfirm(true)}
                  variant="destructive"
                  className="flex items-center gap-2  cursor-pointer   bg-gradient-to-r from-red-500 to-red-700 text-white hover:from-red-600 hover:to-red-800 shadow-md"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Account
                </Button>
              </div>

              {/* Delete Confirmation */}
              {showDeleteConfirm && (
                <div className={`p-4 rounded-xl mt-4 ${
                  themeValue ? 'bg-red-500 border border-red-200' : 'bg-red-900/20 border border-red-800'
                }`}>
                  <h4 className="font-semibold text-red-800  mb-2">
                    Confirm Account Deletion
                  </h4>
                  <p className="text-red-200  text-sm mb-4">
                    This action cannot be undone. All your data will be permanently deleted.
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={handleDeleteAccount}
                      className="border border-red-600 cursor-pointer"
                    >
                      Confirm Delete
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowDeleteConfirm(false)}
                      className="border border-amber-500 text-gray-100 cursor-pointer"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Blogs Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${themeValue ? 'text-gray-800' : 'text-white'}`}>
              Your Articles
            </h2>
            <span className={`text-sm ${themeValue ? 'text-gray-600' : 'text-gray-400'}`}>
              {blogs.length} articles published
            </span>
          </div>

          {blogs.length === 0 ? (
            <div className={`text-center py-12 rounded-2xl ${
              themeValue ? `${light} shadow-lg` : `${dark} shadow-xl`
            }`}>
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className={`text-lg font-semibold mb-2 ${themeValue ? 'text-gray-800' : 'text-white'}`}>
                No articles yet
              </h3>
              <p className={`text-gray-600 dark:text-gray-400`}>
                Start writing your first article to share with the world!
              </p>
              <Link  href='/Create'>
              <Button className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600   cursor-pointer"  >
                <Plus className="w-4 h-4 mr-2" />
                Create Article
              </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog: any) => (
                <Link key={blog._id} href={`/Blogs/${blog._id}`}>
                  <div className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                    themeValue ? `${light} border border-gray-200` : `${dark} border border-gray-700`
                  }`}>
                    {/* Blog Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.blogImage}
                        alt={blog.blogTitle}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className={`font-semibold mb-2 text-lg ${themeValue ? 'text-gray-800' : 'text-white'}`}>
                        {blog.blogTitle}
                      </h3>
                      <p className={`text-sm mb-3 line-clamp-2 ${themeValue ? 'text-gray-600' : 'text-gray-300'}`}>
                        {blog.blogSummary}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                        <span className="text-xs text-gray-500">
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`${themeValue ? 'text-red-600 hover:text-red-700 hover:bg-red-50' : 'text-red-600  hover:text-red-500   '}   cursor-pointer `}
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeleteBlog(blog._id);
                          }}
                          disabled={deleting}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}