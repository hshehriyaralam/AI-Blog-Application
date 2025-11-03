import { Blogs } from "../../lib/Models/Blog";
import { NextResponse } from "next/server";
import { connectDB } from "../../lib/dbConnect";
import { User } from "../../lib/Models/User";


export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      blogTitle,
      blogContent,
      blogSummary,
      blogTags,
      blogImage,
      userId,  
    } = body;

    if (!blogTitle || !blogContent || !blogSummary || !blogImage || !blogTags || !userId) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newBlog = await Blogs.create({
      blogTitle,
      blogContent,
      blogSummary,
      blogTags,
      blogImage,
      userId: userId || null,
    });

    await User.findByIdAndUpdate(
      userId,
      { $inc: { blogCount: 1 } },
      { new : true}
    )

    return NextResponse.json(
      { message: "Blog created successfully", blog: newBlog },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating blog:", error.message, error.stack);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
