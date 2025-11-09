import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/dbConnect";
import { Blogs } from "../../../../lib/Models/Blog";
import { User } from "../../../../lib/Models/User";
import { Like } from "../../../../lib/Models/Like";
import { Bookmark } from "../../../../lib/Models/Bookmark";
import { deleteFromCloudinary } from "../../../../lib/deleteCloudinary";

export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    await connectDB();

    const { id } = context.params;

    // 🔍 Find the blog to delete
    const blog = await Blogs.findById(id);
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    // 🧹 1. Delete all likes related to this blog
    await Like.deleteMany({ blogId: blog._id });

    // 🧹 2. Remove blog from all users' likedBlogs and decrement totalLikes
    await User.updateMany(
      { likedBlogs: blog._id },
      { $pull: { likedBlogs: blog._id }, $inc: { totalLikes: -1 } }
    );

    // 🧹 3. Find and Delete all bookmarks related to this blog
    const blogBookmarks = await Bookmark.find({ blogId: blog._id });
    const bookmarkIds = blogBookmarks.map((b) => b._id);

    await Bookmark.deleteMany({ blogId: blog._id });

    // 🧹 4. Remove those bookmarks from all users’ bookmarks array
    if (bookmarkIds.length > 0) {
      await User.updateMany(
        { bookmarks: { $in: bookmarkIds } },
        { $pull: { bookmarks: { $in: bookmarkIds } } }
      );
    }

    // 🧮 5. Decrement the blog count of the blog owner
    await User.findByIdAndUpdate(blog.userId, { $inc: { blogCount: -1 } });

    // 🗑️ 6. Delete image from Cloudinary if exists
    if (blog.imageUrl) {
      try {
        await deleteFromCloudinary(blog.imageUrl);
        console.log("🗑️ Cloudinary image deleted:", blog.imageUrl);
      } catch (err) {
        console.warn("⚠️ Cloudinary deletion failed:", err);
      }
    }

    // 🗑️ 7. Finally delete the blog from DB
    await Blogs.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, message: "Blog deleted successfully with all related data cleaned" },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Admin Delete Blog Error:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting blog", error: error.message },
      { status: 500 }
    );
  }
}
