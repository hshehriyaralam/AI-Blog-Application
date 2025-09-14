import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "../../lib/dbConnect";
import { User } from "../../lib/Models/user";
import { Blogs } from "../../lib/Models/Blog";

export async function GET(req: Request) {
  try {
    await connectDB();

    // ✅ Token read
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    // ✅ Verify JWT
    let decode: any;
    try {
      decode = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
      });
    }

    // ✅ User fetch
    const user = await User.findById(decode.id)
      .select("-password")
      .populate({
        path: "likedBlogs",
        select: "blogTitle blogImage likesCount", // user ne kaunse blogs like kiye
      });

    if (!user) {
      (await cookies()).delete("token");
      return new Response(JSON.stringify({ error: "User Not Found" }), {
        status: 404,
      });
    }

    // ✅ User ke apne blogs + jin users ne like kiya
    const blogs = await Blogs.find({ userId: user._id })
      .select("blogTitle blogImage likesCount likes")
      .populate("likes", "name profilePic"); // jin users ne like kiya unki list

    return new Response(
      JSON.stringify({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          profilePic: user.profilePic,
          totalLikes: user.totalLikes, // ✅ author ke total likes
          likedBlogs: user.likedBlogs, // ✅ user ne kaunse blogs like kiye
        },
        blogs, // ✅ user ke blogs + likes count + kisne like kiya
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("API /profile error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Server error" }),
      { status: 500 }
    );
  }
}
