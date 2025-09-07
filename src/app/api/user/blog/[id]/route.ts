import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/dbConnect";
import { Blogs } from "../../../../lib/Models/Blog";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { User } from "../../../../lib/Models/user";

export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    await connectDB();

    // Token ko cookies se read kro
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    // verify JWT
    let decode: any;
    try {
      decode = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
      });
    }

    // user fetch
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

    await User.findByIdAndUpdate(user._id, {
      $inc: { blogCount: -1 },
    });

    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
