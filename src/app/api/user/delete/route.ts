import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../lib/dbConnect";
import { User } from "../../../lib/Models/User";
import { Blogs } from "../../../lib/Models/Blog";
import { Like } from "../../../lib/Models/Like";
import { Bookmark } from "../../../lib/Models/Bookmark"; 
import { deleteFromCloudinary } from "../../../lib/deleteCloudinary";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    await connectDB();

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
    if (!user) {
      (await cookies()).delete("token");
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });
    }

    // 🧹 Get all blog IDs of this user
    const blogs = await Blogs.find({ userId: user._id });
    const blogIds = blogs.map((b) => b._id);

    // 🧹 Delete images from Cloudinary
    for (const blog of blogs) {
      if (blog.blogImage) {
        await deleteFromCloudinary(blog.blogImage);
      }
    }

    // 🧹 Delete all likes done by this user
    await Like.deleteMany({ userId: user._id });

    // 🧹 Delete all likes on user's blogs
    await Like.deleteMany({ blogId: { $in: blogIds } });

    // 🧹 Delete all bookmarks done by this user
    await Bookmark.deleteMany({ userId: user._id });

    // 🧹 Delete all bookmarks on user's blogs (from other users)
    await Bookmark.deleteMany({ blogId: { $in: blogIds } });

    // 🧹 Remove deleted blogs from others’ likedBlogs & bookmarks fields
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

    // 🧹 Delete all blogs of this user
    await Blogs.deleteMany({ userId: user._id });

    // 🧹 Finally delete user account
    await User.findByIdAndDelete(user._id);

    // 🧹 Clear token
    (await cookies()).delete("token");

    return NextResponse.json(
      { message: "User, blogs, likes, bookmarks, and Cloudinary images deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Delete Account Error:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
