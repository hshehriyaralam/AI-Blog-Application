import type { NextApiRequest, NextApiResponse } from "next";
import { googleLogin } from "../../lib/googleAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { code } = req.body; 
    if (!code) {
      return res.status(400).json({ error: "Missing Google authorization code" });
    }

    const { user, token } = await googleLogin(code); 
    res.status(200).json({ user, token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
