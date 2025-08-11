import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Sirf admin routes protect karna
  if (pathname.startsWith("/Admin")) {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const token = authHeader.split(" ")[1];

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET as string) as {
        isAdmin: boolean;
      };

      if (!decode.isAdmin) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Admin/:path*"],
};
