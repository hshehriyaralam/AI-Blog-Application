import { NextResponse } from "next/server";
import { connectDB } from "../../lib/dbConnect";
import { Blogs } from "../../lib/Models/Blog";
import { Like } from "../../lib/Models/Like";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    await connectDB();

    // ✅ Fetch all blogs with user info
    const blogs = await Blogs.find()
      .populate("userId", "name email profilePic")
      .sort({ createdAt: -1 })
      .lean();

    // ✅ Check if user is logged in
    let currentUserId = null;
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (token) {
      try {
        const decode: any = jwt.verify(token, process.env.JWT_SECRET as string);
        currentUserId = decode.id;
      } catch (error) {
        console.log("Token verification failed");
      }
    }

    // ✅ For each blog, get likes info
    const blogsWithLikes = await Promise.all(
      blogs.map(async (blog) => {
        const likes = await Like.find({ blogId: blog._id })
          .populate("userId", "name profilePic")
          .lean();

        const isLikedByCurrentUser = currentUserId
          ? likes.some((like: any) => like.userId._id.toString() === currentUserId)
          : false;

        return {
          ...blog,
          likes,
          likesCount: likes.length,
          isLikedByCurrentUser,
        };
      })
    );

    return NextResponse.json({ blogs: blogsWithLikes }, { status: 200 });
  } catch (error: any) {
    console.error("Get All Blogs Error:", error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}
