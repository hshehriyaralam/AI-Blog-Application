import { connectDB } from "../../lib/dbConnect";
import { Blogs } from "../../lib/Models/Blog";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const blogs = await Blogs.find()
      .populate("userId", "name profilePic ")
      .sort({ createdAt: -1 });

    return NextResponse.json({ data: blogs }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
