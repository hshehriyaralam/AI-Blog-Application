import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/dbConnect";
import { Blogs } from "../../../../lib/Models/Blog";
import { Like } from "../../../../lib/Models/Like";
import { User } from "../../../../lib/Models/user";
import { cookies } from "next/headers";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    // ✅ Await dynamic params
    const { id } = await params;

    // ✅ Validate ObjectId early
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid blog id" }, { status: 400 });
    }

    // ✅ Verify user
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
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ Convert to ObjectId
    const blogId = new mongoose.Types.ObjectId(id);

    // ✅ Check if blog exists
    const blog = await Blogs.findById(blogId);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // ✅ Resolve author field (supports author or userId)
    const authorId: any = (blog as any).author || (blog as any).userId;
    const author = authorId ? await User.findById(authorId) : null;
    if (!author) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    // ✅ Check if already liked
    const existingLike = await Like.findOne({ userId: user._id, blogId });

    // ✅ Fetch user's likedBlogs
    const userDoc = await User.findById(user._id).select("likedBlogs");
    const userLikedBlogs = userDoc?.likedBlogs || [];

    if (existingLike) {
      // 🔄 UNLIKE
      await Like.findByIdAndDelete(existingLike._id);

      // 1️⃣ Decrease blog likesCount (not below 0)
      blog.likesCount = Math.max((blog.likesCount || 1) - 1, 0);
      blog.likes = (blog.likes || []).filter(
        (uid: any) => uid.toString() !== user._id.toString()
      );
      await blog.save();

      // 2️⃣ Decrease author’s totalLikes (not below 0)
      author.totalLikes = Math.max((author.totalLikes || 1) - 1, 0);
      await author.save();

      // 3️⃣ Remove from liking user's likedBlogs
      const updatedUserLikes = userLikedBlogs.filter(
        (bid: any) => bid.toString() !== blogId.toString()
      );
      user.likedBlogs = updatedUserLikes;
      await user.save();

      return NextResponse.json(
        { message: "Blog unliked successfully", action: "unliked" },
        { status: 200 }
      );
    } else {
      // ❤️ LIKE
      await Like.create({ userId: user._id, blogId });

      // 1️⃣ Increase blog likesCount
      blog.likesCount = (blog.likesCount || 0) + 1;
      blog.likes = [...(blog.likes || []), user._id];
      await blog.save();

      // 2️⃣ Increase author’s totalLikes
      author.totalLikes = (author.totalLikes || 0) + 1;
      await author.save();

      // 3️⃣ Add to liking user's likedBlogs (avoid duplicates)
      if (!userLikedBlogs.map((bid: any) => bid.toString()).includes(blogId.toString())) {
        user.likedBlogs.push(blogId);
        await user.save();
      }

      return NextResponse.json(
        { message: "Blog liked successfully", action: "liked" },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error("Like/Unlike Error:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
