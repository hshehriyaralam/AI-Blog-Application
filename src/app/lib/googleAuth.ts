import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "./Models/user";
import { connectDB } from "./dbConnect";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function googleLogin(idToken: string) {
  await connectDB();

  // 1️⃣ Verify Google ID token
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  // Payload
  const payload = ticket.getPayload();
  if (!payload || !payload.sub || !payload.email) {
    throw new Error("Invalid Google token");
  }

  // Extract Google info
  const uid = payload.sub;
  const email = payload.email;
  const name = payload.name || "Unnamed User";
  const profilePic = payload.picture || null;

  // 2️⃣ Check if user exists (search by email)
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
    // Update last seen if user exists
    user.lastSeenAt = new Date();
    await user.save();
  }

  // 3️⃣ Generate JWT (include isAdmin for middleware checks)
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  return { user, token };
}
