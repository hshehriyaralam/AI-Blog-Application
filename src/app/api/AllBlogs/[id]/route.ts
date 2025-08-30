import { NextResponse } from "next/server";
import { connectDB } from '../../../lib/dbConnect'
import { Blogs } from '../../../lib/Models/Blog'

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }   
) {
  try {
    await connectDB();

    const {id} = await context.params;   
    const singleBlog = await Blogs.findById(id).populate("userId", "name profilePic");

    if (!singleBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ data: singleBlog }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
