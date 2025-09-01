"use client";
import Script from "next/script";
import { useDispatch } from "react-redux";
import { googleLoginThunk } from "../../Redux/Slices/authSlice";
import type { AppDispatch } from "../../Redux/store";
import { useGetProfileQuery } from "../../Redux/Services/userApi";
import { Button } from "../../components/ui/button";
import { useDeleteBlogMutation } from "../../Redux/Services/blogApi";

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: Profile, isLoading } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 10000,
  });


  const [deleteBlog, { isLoading: deleting }] = useDeleteBlogMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteBlog(id).unwrap();
      alert("Blog deleted successfully ✅");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete blog ❌");
    }
  };

  const handleGoogleLogin = () => {
    dispatch(googleLoginThunk());
  };

  return (
    <div>
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
      <h1>Profile</h1>

      <button
        className="p-2 border rounded-xl text-center m-10 cursor-pointer"
        onClick={handleGoogleLogin}
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Switch Account"}
      </button>

      <p>Name : {Profile?.user?.name}</p>
      <p>Email : {Profile?.user?.email}</p>
      <p>Role : {Profile?.user?.role}</p>
      <p>BlogCount : {Profile?.blogs?.length}</p>
      <p>Id : {Profile?.user?._id}</p>
      <img src={Profile?.user?.profilePic} width={100} height={100} alt="user" />

      {Profile?.blogs?.length > 0 ? (
        Profile.blogs.map((blog: any) => (
          <div key={blog._id} className="border p-2 m-2 rounded-lg shadow-md">
            <img
              src={blog.blogImage}
              alt={blog.blogTitle}
              width={200}
              className="rounded-md mb-2"
            />
            <h3 className="text-lg font-bold">{blog.blogTitle}</h3>
            <p className="text-gray-600">{blog.blogSummary}</p>
            <small className="text-xs text-gray-400">
              Created: {new Date(blog.createdAt).toLocaleDateString()}
            </small>

            {/* ✅ Delete Button */}
            <Button
              onClick={() => handleDelete(blog._id)}
              className="border rounded-xl mx-2 cursor-pointer bg-red-500 text-white"
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        ))
      ) : (
        <p>No blogs found</p>
      )}
    </div>
  );
}
