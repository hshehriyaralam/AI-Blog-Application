import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/app/lib/dbConnect";
import { User } from "@/app/lib/Models/User";
import { Blogs } from "@/app/lib/Models/Blog";
import { Like } from "@/app/lib/Models/Like";
import { Bookmark } from "@/app/lib/Models/Bookmark";

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

    const admin = await User.findById(decode.id);
    if (!admin || admin.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const userToDelete = await User.findById(id);
    if (!userToDelete) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete user's blogs
    const userBlogs = await Blogs.find({ userId: id });
    const blogIds = userBlogs.map((b) => b._id);

    // Delete likes for user's blogs
    await Like.deleteMany({ blogId: { $in: blogIds } });

    // Delete bookmarks for user's blogs
    await Bookmark.deleteMany({ blogId: { $in: blogIds } });

    // Delete user's blogs
    await Blogs.deleteMany({ userId: id });

    // Delete user's likes
    await Like.deleteMany({ userId: id });

    // Delete user's bookmarks
    await Bookmark.deleteMany({ userId: id });

    // Delete user
    await User.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Delete User Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
