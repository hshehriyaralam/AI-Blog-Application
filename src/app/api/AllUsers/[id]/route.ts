import { NextResponse } from "next/server";
import { User } from "../../../lib/Models/User";
import { Blogs } from "../../../lib/Models/Blog";
import { connectDB } from '../../../lib/dbConnect'


export async function GET(
  req: Request,
   context: { params: Promise<{ id: string }> } 
) {
  try {
    await connectDB();

    const { id } = await context.params; 

    // ✅ pehle user find karo
    const singleAuthor = await User.findById(id);
    if (!singleAuthor) {
      return NextResponse.json({ error: "Author not found" }, { status:404 });
    }

    // ✅ us user ke blogs lao
    const userBlogs = await Blogs.find({ userId: id }).populate("userId", "name profilePic totalLikes");

    return NextResponse.json(
      { data: { user: singleAuthor, blogs: userBlogs } },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: error || "Internal Error In Single Author" },
      { status: 500 }
    );
  }
}
