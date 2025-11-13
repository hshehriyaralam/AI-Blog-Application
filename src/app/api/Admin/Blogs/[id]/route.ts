import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/app/lib/dbConnect";
import { Blogs } from "@/app/lib/Models/Blog";
import { Like } from "@/app/lib/Models/Like";
import { Bookmark } from "@/app/lib/Models/bookmark";
import { User } from "@/app/lib/Models/user";
import { deleteFromCloudinary } from "@/app/lib/deleteCloudinary";

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

    // Check if user is admin
    if (user.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    // Find blog
    const blog = await Blogs.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Delete likes
    await Like.deleteMany({ blogId: blog._id });

    // Update users who liked this blog
    await User.updateMany(
      { likedBlogs: blog._id },
      { $pull: { likedBlogs: blog._id }, $inc: { totalLikes: -1 } }
    );

    // Delete bookmarks
    const blogBookmarks = await Bookmark.find({ blogId: blog._id });
    const bookmarkIds = blogBookmarks.map((b) => b._id);

    await Bookmark.deleteMany({ blogId: blog._id });

    if (bookmarkIds.length > 0) {
      await User.updateMany(
        { bookmarks: { $in: bookmarkIds } },
        { $pull: { bookmarks: { $in: bookmarkIds } } }
      );
    }

    // Decrease author's blog count
    await User.findByIdAndUpdate(blog.userId, { $inc: { blogCount: -1 } });

    // Delete Cloudinary image
    if (blog.imageUrl) {
      try {
        await deleteFromCloudinary(blog.imageUrl);
      } catch (err) {
        console.warn("⚠️ Cloudinary deletion failed:", err);
      }
    }

    // Delete blog
    await Blogs.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Blog deleted successfully" },
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
