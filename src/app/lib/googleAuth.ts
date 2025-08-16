import jwt from "jsonwebtoken";
import User from "./Models/user";
import { connectDB } from "./dbConnect";

export async function googleLogin(accessToken: string) {
  await connectDB();

  // Get user info from Google using the access token (popup flow)
  const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error("Failed to fetch Google userinfo: " + text);
  }

  const payload = await res.json();

  if (!payload || !payload.sub || !payload.email) {
    throw new Error("Invalid Google token payload");
  }

  const uid = payload.sub;
  const email = payload.email;
  const name = payload.name || "Unnamed User";
  const profilePic = payload.picture || null;

  // Find or create user
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({
      uid,
      email,
      name,
      profilePic,
      isAdmin: false,
      joiningTime: new Date(),
      lastSeenAt: new Date(),
    });
  } else {
    user.lastSeenAt = new Date();
    await user.save();
  }

  // Create app JWT
  const appToken = jwt.sign(
    { id: user._id, email: user.email, role: user.role, isAdmin: user.isAdmin },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  )

  return { user, token: appToken };
}
