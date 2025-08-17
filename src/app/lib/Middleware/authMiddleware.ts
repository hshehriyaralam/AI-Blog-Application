import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export default async function authMiddleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  console.log("🔑 authMiddleware called");
  console.log("Token from cookie:", token);

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    console.log("JWT verification failed", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}
