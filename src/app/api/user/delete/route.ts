import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../lib/dbConnect";
import { User } from "../../../lib/Models/user";
import { Blogs } from "../../../lib/Models/Blog";
import { NextResponse } from "next/server";




export async function DELETE(req: Request) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decode: any;
    try {
      decode = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Fetch user
    const user = await User.findById(decode.id).select("-password");
    if (!user) {
      (await cookies()).delete("token");
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });
    }

    // Delete blogs first
    await Blogs.deleteMany({ userId: user._id });

    // Delete user account
    await User.findByIdAndDelete(user._id);

    // Delete cookie session
    (await cookies()).delete("token");

    return NextResponse.json(
      { message: "User and all related blogs deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Delete Account Error:", error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}
