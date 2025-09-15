import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/dbConnect";
import { Blogs } from "../../../../lib/Models/Blog";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { User } from "../../../../lib/Models/user";

export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    let decode: any;
    try {
      decode = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
      });
    }

    const user = await User.findById(decode.id).select("-password");
    if (!user) {
      (await cookies()).delete("token");
      return new Response(JSON.stringify({ error: "User Not Found" }), {
        status: 404,
      });
    }

    const { id } = await context.params;
    const deleteBlog = await Blogs.findOneAndDelete({
      _id: id,
      userId: user._id,
    });

    if (!deleteBlog) {
      return NextResponse.json(
        { error: "Blog not found or unauthorized" },
        { status: 404 }
      );
    }

    // 🔥 Remove this blog from all users' likedBlogs
    await User.updateMany(
      { likedBlogs: deleteBlog._id },
      { $pull: { likedBlogs: deleteBlog._id }, $inc: { totalLikes: -1 } }
    );

    // decrement blogCount
    await User.findByIdAndUpdate(user._id, {
      $inc: { blogCount: -1 },
    });

    return NextResponse.json(
      { message: "Blog deleted successfully and likes cleaned" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
