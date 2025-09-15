import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/dbConnect";
import { Blogs } from "../../../../lib/Models/Blog";
import { User } from "../../../../lib/Models/user";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(
   req: Request,
  context: { params: { id: string } }
) {
  try {
    await connectDB();

    const blogId = context.params.id;

    // Token ko cookies se uthao
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Token verify
    let decode: any;
    try {
      decode = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    const userId = decode.id; // ✅ Active user ka id JWT se
    if (
      !mongoose.Types.ObjectId.isValid(blogId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid Blog or User ID" },
        { status: 400 }
      );
    }

    const blog = await Blogs.findById(blogId).populate("userId");
    const user = await User.findById(userId);

    if (!blog || !user) {
      return NextResponse.json(
        { success: false, message: "Blog or User not found" },
        { status: 404 }
      );
    }

    const author = await User.findById(blog.userId);

    let message = "";
    const alreadyLiked = blog.likes.some(
      (id: any) => id.toString() === user._id.toString()
    );

    if (alreadyLiked) {
      // Unlike logic
      blog.likes = blog.likes.filter(
        (id: any) => id.toString() !== user._id.toString()
      );
      blog.likesCount = blog.likes.length;

      user.likedBlogs = user.likedBlogs.filter(
        (id: any) => id.toString() !== blog._id.toString()
      );

      if (author) {
        author.totalLikes = Math.max(0, author.totalLikes - 1);
        await author.save();
      }
      message = "Blog unliked";
    } else {
      // Like logic
      blog.likes.push(user._id);
      blog.likesCount = blog.likes.length;

      user.likedBlogs.push(blog._id);

      if (author) {
        author.totalLikes += 1;
        await author.save();
      }
      message = "Blog liked";
    }

    await blog.save();
    await user.save();

    const updatedBlog = await Blogs.findById(blogId).populate("likes", "name profilePic");

    return NextResponse.json({
      success: true,
      message,
      blogLikes: updatedBlog?.likes.length || 0,
      likedUsers: updatedBlog?.likes || [],
      authorTotalLikes: author?.totalLikes || 0,
      userLikedBlogs: user.likedBlogs,
    });


  } catch (error) {
    console.error("Like API Error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
