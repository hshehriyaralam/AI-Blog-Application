import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "../../lib/dbConnect";
import {Bookmark} from "../../lib/Models/Bookmark";
import { User } from "../../lib/Models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let decode: any;
    try { decode = jwt.verify(token, process.env.JWT_SECRET as string); } 
    catch { return NextResponse.json({ error: "Invalid token" }, { status: 401 }); }

    const userId = decode.id;
    const { blogId } = await req.json();
    if (!blogId) return NextResponse.json({ error: "blogId required" }, { status: 400 });

    const exists = await Bookmark.findOne({ userId, blogId });

    if (exists) {
      await Bookmark.deleteOne({ userId, blogId });
      await User.findByIdAndUpdate(userId, { $pull: { bookmarks: exists._id } });
      return NextResponse.json({ success: true, message: "Bookmark removed" }, { status: 200 });
    } else {
      const bookmark = await Bookmark.create({ userId, blogId });
      await User.findByIdAndUpdate(userId, { $push: { bookmarks: bookmark._id } });
      return NextResponse.json({ success: true, message: "Bookmark added", bookmark }, { status: 201 });
    }
  } catch (error: any) {
    console.error("POST /bookmarks error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let decode: any;
    try { decode = jwt.verify(token, process.env.JWT_SECRET as string); } 
    catch { return NextResponse.json({ error: "Invalid token" }, { status: 401 }); }

    const userId = decode.id;

    const bookmarks = await Bookmark.find({ userId })
      .populate({
        path: "blogId",
        populate: [
          { path: "userId", select: "name profilePic" },
          { path: "likes", select: "name profilePic" },
        ],
      })
      .lean();

    return NextResponse.json({ success: true, bookmarks }, { status: 200 });
  } catch (error: any) {
    console.error("GET /bookmarks error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
