import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "../../lib/dbConnect";

// ensure Like imported earlier if other code depends on it, but we WON'T use it to override likedBlogs
import { Like } from "../../lib/Models/Like";
import { User } from "../../lib/Models/user";
import { Blogs } from "../../lib/Models/Blog";

export async function GET(req: Request) {
  try {
    await connectDB();

    // read token
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    // verify token
    let decode: any;
    try {
      decode = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch {
      return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
    }

    // fetch user FROM DB and DO NOT override likedBlogs with Like model data
    const user = await User.findById(decode.id).select("-password").lean();
    if (!user) {
      (await cookies()).delete("token");
      return new Response(JSON.stringify({ error: "User Not Found" }), { status: 404 });
    }

    // fetch user's own blogs (you can still attach likes info for each blog if you want)
    const blogs = await Blogs.find({ userId: user._id }).lean();

    // OPTIONAL: if you still want likes per blog (from Like model) you can fetch,
    // but DO NOT overwrite user.likedBlogs here. If you don't want blog-level likes either,
    // skip the following block.
    const blogsWithLikes = await Promise.all(
      blogs.map(async (blog) => {
        // fetch like documents for this blog (but keep user.likedBlogs untouched)
        const likes = await Like.find({ blogId: blog._id })
          .populate("userId", "name profilePic")
          .lean();

        return {
          ...blog,
          likes,
          likesCount: likes.length,
        };
      })
    );

    // RETURN user as-is (so likedBlogs reflects DB)
    return new Response(
      JSON.stringify({
        user: { ...user }, // IMPORTANT: do not inject likedBlogs from Like model
        blogs: blogsWithLikes,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("API /User error:", error);
    return new Response(JSON.stringify({ error: error.message || "Server error" }), {
      status: 500,
    });
  }
}
