import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/dbConnect";
import { Blogs } from "../../../lib/Models/Blog";
import { Like } from "../../../lib/Models/Like";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    // ✅ Await params first
    const { id } = await params;

    // Fetch blog with user info
    const blog = await Blogs.findById(id)
      .populate("userId", "name email profilePic")
      .lean();

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Fetch all likes for this blog
    const likes = await Like.find({ blogId: id })
      .populate("userId", "name profilePic")
      .lean();

    // Check if current user has liked this blog
    let isLikedByCurrentUser = false;
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (token) {
      try {
        const decode: any = jwt.verify(token, process.env.JWT_SECRET as string);
        const userLike = await Like.findOne({ blogId: id, userId: decode.id });
        isLikedByCurrentUser = !!userLike;
      } catch (error) {
        console.log("Token verification failed in blog details");
      }
    }

    return NextResponse.json(
      {
        blog: {
          ...blog,
          likes,
          likesCount: likes.length,
          isLikedByCurrentUser,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Get Blog Details Error:", error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}
