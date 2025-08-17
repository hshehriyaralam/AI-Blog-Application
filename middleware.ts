
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export default async function middleware(req: NextRequest) {
  console.log("🔥 Middleware running:", req.nextUrl.pathname);

  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  // Token missing → redirect
  if (!token) {
    console.log("❌ No token found");
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    // Verify JWT
    const { payload } = await jwtVerify(token, secret);
    const role = payload.role; // JWT me role hona chahiye

    console.log("✅ Token verified, role:", role);

    // Admin routes
    if (pathname.startsWith("/Admin")) {
      if (role !== "admin") {
        console.log("🚫 Access denied: Not admin");
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // Protected user routes (example: /Create, /Blogs)
    if (pathname.startsWith("/Create") || pathname.startsWith("/Blogs")) {
      if (role !== "user" && role !== "admin") {
        console.log("🚫 Access denied: Not user/admin");
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.log("JWT verification failed:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: [
    "/Admin/:path*",
    "/Create/:path*",
    "/Blogs/:path*",
  ],
};
