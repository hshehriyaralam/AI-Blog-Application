import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "../../lib/dbConnect";
import Bookmark from "../../lib/Models/Bookmark";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // ✅ Token read
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Verify JWT
    let decode: any;
    try {
      decode = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decode.id;

    // ✅ Body se blogId lo
    const { blogId } = await req.json();
    if (!blogId) {
      return NextResponse.json({ error: "blogId required" }, { status: 400 });
    }

    // ✅ Toggle Logic
    const exists = await Bookmark.findOne({ userId, blogId });

    if (exists) {
      await Bookmark.deleteOne({ userId, blogId });
      return NextResponse.json(
        { success: true, message: "Bookmark removed" },
        { status: 200 }
      );
    } else {
      const bookmark = await Bookmark.create({ userId, blogId });
      return NextResponse.json(
        { success: true, message: "Bookmark added", bookmark },
        { status: 201 }
      );
    }
  } catch (error: any) {
    console.error("POST /bookmarks error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();

    // ✅ Token read
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Verify JWT
    let decode: any;
    try {
      decode = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decode.id;

    // ✅ Full Blog Data + User Info + Likes
    const bookmarks = await Bookmark.find({ userId })
      .populate({
        path: "blogId",
        populate: [
          { path: "userId", select: "name profilePic" }, // blog ke user ka data
          { path: "likes", select: "name profilePic" },  // blog ke likes ka data
        ],
      })
      .lean();

    return NextResponse.json(
      { success: true, bookmarks },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("GET /bookmarks error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
