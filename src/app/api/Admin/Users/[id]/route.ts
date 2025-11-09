import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/dbConnect";
import { User } from "../../../../lib/Models/User";
import { Blogs } from "../../../../lib/Models/Blog";
import { Like } from "../../../../lib/Models/Like";
import { Bookmark } from "../../../../lib/Models/Bookmark";
import { deleteFromCloudinary } from "../../../../lib/deleteCloudinary";

export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = context.params;

    // 🔍 Find user first
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // 🧩 Get all blogs created by this user
    const blogs = await Blogs.find({ userId: user._id });
    const blogIds = blogs.map((b) => b._id);

    // 🧹 1. Delete all images from Cloudinary
    for (const blog of blogs) {
      if (blog.blogImage) {
        try {
          await deleteFromCloudinary(blog.blogImage);
        } catch (err) {
          console.warn("⚠️ Cloudinary deletion failed:", err);
        }
      }
    }

    // 🧹 2. Delete all likes made by this user
    await Like.deleteMany({ userId: user._id });

    // 🧹 3. Delete all likes on user's blogs
    await Like.deleteMany({ blogId: { $in: blogIds } });

    // 🧹 4. Delete all bookmarks made by this user
    await Bookmark.deleteMany({ userId: user._id });

    // 🧹 5. Delete all bookmarks on user's blogs (from other users)
    await Bookmark.deleteMany({ blogId: { $in: blogIds } });

    // 🧹 6. Remove deleted blogs from others' likedBlogs & bookmarks
    await Promise.all([
      User.updateMany(
        { likedBlogs: { $in: blogIds } },
        { $pull: { likedBlogs: { $in: blogIds } }, $inc: { totalLikes: -1 } }
      ),
      User.updateMany(
        { bookmarks: { $in: blogIds } },
        { $pull: { bookmarks: { $in: blogIds } } }
      ),
    ]);

    // 🧹 7. Delete all blogs of this user
    await Blogs.deleteMany({ userId: user._id });

    // 🧹 8. Finally delete user record
    await User.findByIdAndDelete(user._id);

    return NextResponse.json(
      {
        success: true,
        message:
          "User, blogs, likes, bookmarks, and Cloudinary images deleted successfully by Admin",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Admin Delete User Error:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting user", error: error.message },
      { status: 500 }
    );
  }
}
