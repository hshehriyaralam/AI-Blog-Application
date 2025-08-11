import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "./Models/user";
import { connectDB } from "./dbConnect";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI // e.g. "http://localhost:3000/api/auth/google/callback"
);

export async function googleLogin(code: string) {
  await connectDB();

  // 1️⃣ Exchange authorization code for tokens
  const { tokens } = await client.getToken(code);
  if (!tokens.id_token) {
    throw new Error("Failed to retrieve ID token from Google");
  }

  // 2️⃣ Verify the ID token
  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  if (!payload || !payload.sub || !payload.email) {
    throw new Error("Invalid Google token payload");
  }

  // Extract Google user info
  const uid = payload.sub;
  const email = payload.email;
  const name = payload.name || "Unnamed User";
  const profilePic = payload.picture || null;

  // 3️⃣ Find or create user
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

  // 4️⃣ Generate your own JWT
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

  return {
    user,
    token,
    googleAccessToken: tokens.access_token, // optional if you want to use Google APIs
    googleRefreshToken: tokens.refresh_token, // optional for long-term Google API calls
  };
}
