import { googleLogin } from "../../lib/googleAuth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { accessToken } = body;

    if (!accessToken) {
      return new Response(JSON.stringify({ error: "Missing accessToken" }), { status: 400 });
    }

    const { user, token } = await googleLogin(accessToken);

    return new Response(JSON.stringify({ user, token }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("API /auth error:", error);
    return new Response(JSON.stringify({ error: error.message || "Server error" }), { status: 500 });
  }
}
