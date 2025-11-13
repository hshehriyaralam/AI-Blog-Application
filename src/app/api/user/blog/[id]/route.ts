import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/dbConnect";
import { Blogs } from "../../../../lib/Models/Blog";
import { Like } from "../../../../lib/Models/Like";
import { Bookmark } from "../../../../lib/Models/bookmark";
import { User } from "../../../../lib/Models/user";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { deleteFromCloudinary } from "../../../../lib/deleteCloudinary";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    // ✅ Await params first
    const { id } = await params;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let decode: any;
    try {
      decode = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const user = await User.findById(decode.id);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Find the blog first
    const blog = await Blogs.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Check permission (author or admin only)
    if (user.role !== "admin" && blog.userId.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: "Unauthorized to delete this blog" },
        { status: 403 }
      );
    }

    // Delete all Likes for this Blog
    await Like.deleteMany({ blogId: blog._id });

    // Remove this Blog from all users' likedBlogs + decrement totalLikes
    await User.updateMany(
      { likedBlogs: blog._id },
      { $pull: { likedBlogs: blog._id }, $inc: { totalLikes: -1 } }
    );

    // Delete all Bookmarks related to this Blog
    const blogBookmarks = await Bookmark.find({ blogId: blog._id });
    const bookmarkIds = blogBookmarks.map((b) => b._id);

    await Bookmark.deleteMany({ blogId: blog._id });

    // Remove those bookmarks from all users' bookmarks array
    if (bookmarkIds.length > 0) {
      await User.updateMany(
        { bookmarks: { $in: bookmarkIds } },
        { $pull: { bookmarks: { $in: bookmarkIds } } }
      );
    }

    // Decrease Author's blogCount
    await User.findByIdAndUpdate(blog.userId, { $inc: { blogCount: -1 } });

    // Delete Cloudinary image if exists
    if (blog.imageUrl) {
      try {
        await deleteFromCloudinary(blog.imageUrl);
        console.log("🗑️ Cloudinary image deleted:", blog.imageUrl);
      } catch (err) {
        console.warn("⚠️ Cloudinary deletion failed:", err);
      }
    }

    // Finally delete the blog itself
    await Blogs.findByIdAndDelete(id);

    return NextResponse.json(
      {
        message: "Blog deleted successfully with all related data cleaned",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Delete Blog Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
