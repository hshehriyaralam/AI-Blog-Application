import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/dbConnect";
import { Blogs } from "../../../../lib/Models/Blog";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { User } from "../../../../lib/Models/User";
import { Like } from "../../../../lib/Models/Like"; // ⚠️ added

export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token)
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    let decode: any;
    try {
      decode = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch {
      return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
    }

    const user = await User.findById(decode.id);
    if (!user) {
      (await cookies()).delete("token");
      return new Response(JSON.stringify({ error: "User Not Found" }), { status: 404 });
    }

    const { id } = context.params;
    const deletedBlog = await Blogs.findOneAndDelete({ _id: id, userId: user._id });

    if (!deletedBlog) {
      return NextResponse.json(
        { error: "Blog not found or unauthorized" },
        { status: 404 }
      );
    }

    // 🧹 Delete all likes related to this blog
    await Like.deleteMany({ blogId: deletedBlog._id });

    // 🧹 Remove this blog from users’ likedBlogs and adjust totalLikes
    await User.updateMany(
      { likedBlogs: deletedBlog._id },
      { $pull: { likedBlogs: deletedBlog._id }, $inc: { totalLikes: -1 } }
    );

    // 🧮 Decrement blog count
    await User.findByIdAndUpdate(user._id, { $inc: { blogCount: -1 } });

    return NextResponse.json(
      { message: "Blog deleted successfully with all related likes" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Delete Blog Error:", error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}
