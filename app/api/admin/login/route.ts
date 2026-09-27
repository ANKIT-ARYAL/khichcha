import { NextResponse } from "next/server";
import { createAdminToken } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = String(body.email || "").trim();
  const password = String(body.password || "");
  if (
    !process.env.ADMIN_EMAIL ||
    !process.env.ADMIN_PASSWORD ||
    !process.env.AUTH_SECRET
  )
    return NextResponse.json(
      {
        error:
          "Admin auth is not configured. Add ADMIN_EMAIL, ADMIN_PASSWORD, and AUTH_SECRET to .env.local, then restart pnpm dev.",
      },
      { status: 503 },
    );
  if (
    !email ||
    email !== process.env.ADMIN_EMAIL ||
    !password ||
    password !== process.env.ADMIN_PASSWORD
  )
    return NextResponse.json(
      { error: "Invalid admin credentials." },
      { status: 401 },
    );
  const response = NextResponse.json({ ok: true });
  response.cookies.set("aathmandu_admin", await createAdminToken(email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  return response;
}
