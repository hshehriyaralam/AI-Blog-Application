import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/app/lib/dbConnect";
import { Bookmark } from "@/app/lib/Models/Bookmark";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let decode: any;
    try { decode = jwt.verify(token, process.env.JWT_SECRET as string); } 
    catch { return NextResponse.json({ error: "Invalid token" }, { status: 401 }); }

    if (decode.role !== "admin") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const totalBookmarks = await Bookmark.countDocuments();

    const allBookmarks = await Bookmark.find()
      .populate({
        path: "blogId",
        select: "blogTitle blogSummary blogImage userId",
        populate: { path: "userId", select: "name profilePic" },
      })
      .populate({ path: "userId", select: "name email profilePic" })
      .sort({ createdAt: -1 })
      .lean();

    const formattedData = allBookmarks.map((b: any) => ({
      bookmarkId: b._id,
      blogId: b.blogId?._id,
      authorId: b.blogId?.userId?._id,
      userId: b.userId?._id,
      blogTitle: b.blogId?.blogTitle || "Untitled Blog",
      blogDescription: b.blogId?.blogSummary || "",
      blogImage: b.blogId?.blogImage || "",
      authorName: b.blogId?.userId?.name || "Unknown Author",
      authorProfilePic: b.blogId?.userId?.profilePic || "",
      bookmarkedByName: b.userId?.name || "",
      bookmarkedByEmail: b.userId?.email || "",
      bookmarkedByProfilePic: b.userId?.profilePic || "",
      bookmarkedAt: b.createdAt,
    }));

    return NextResponse.json({ success: true, totalBookmarks, bookmarks: formattedData }, { status: 200 });
  } catch (error: any) {
    console.error("GET /admin/bookmarks error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
