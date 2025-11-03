import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/dbConnect";
import { Like } from "../../../lib/Models/Like";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    await connectDB();

    // ✅ Verify admin via token
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // 🧠 Optional admin check (if you have roles)
    // if (decoded.role !== "admin") {
    //   return NextResponse.json({ error: "Access denied" }, { status: 403 });
    // }

    // ✅ Fetch all likes directly from Like model
    const likes = await Like.find()
      .populate({
        path: "userId",
        model: "User",
        select: "name email profilePic",
      })
      .populate({
        path: "blogId",
        model: "Blog",
        select: "blogTitle blogSummary blogImage createdAt userId",
        populate: {
          path: "userId",
          model: "User",
          select: "name email profilePic",
        },
      })
      .sort({ createdAt: -1 }) // recent likes first
      .lean();

    // ✅ Transform for admin view
    const formatted = likes.map((like: any) => ({
      user: like.userId
        ? {
            name: like.userId.name,
            email: like.userId.email,
            profilePic: like.userId.profilePic,
          }
        : null,
      blog: like.blogId
        ? {
            blogTitle: like.blogId.blogTitle,
            blogSummary: like.blogId.blogSummary,
            blogImage: like.blogId.blogImage,
            createdAt: like.blogId.createdAt,
            author: like.blogId.userId
              ? {
                  name: like.blogId.userId.name,
                  email: like.blogId.userId.email,
                  profilePic: like.blogId.userId.profilePic,
                }
              : null,
          }
        : null,
      likedAt: like.createdAt, // ✅ from Like schema timestamps
    }));

    return NextResponse.json(
      {
        success: true,
        totalLikes: formatted.length,
        data: formatted,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching likes:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
