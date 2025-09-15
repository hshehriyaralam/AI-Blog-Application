import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../lib/dbConnect";
import { User } from "../../../lib/Models/user";
import { Blogs } from "../../../lib/Models/Blog";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decode: any;
    try {
      decode = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const user = await User.findById(decode.id).select("-password");
    if (!user) {
      (await cookies()).delete("token");
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });
    }

    // 🔥 Get all blogs of this user
    const blogs = await Blogs.find({ userId: user._id });

    // remove these blogs from other users' likedBlogs
    for (const blog of blogs) {
      await User.updateMany(
        { likedBlogs: blog._id },
        { $pull: { likedBlogs: blog._id }, $inc: { totalLikes: -1 } }
      );
    }

    // delete all blogs
    await Blogs.deleteMany({ userId: user._id });

    // delete user account
    await User.findByIdAndDelete(user._id);

    // clear token
    (await cookies()).delete("token");

    return NextResponse.json(
      { message: "User and all blogs (with likes) deleted successfully" },
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
