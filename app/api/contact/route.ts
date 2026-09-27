import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const messageSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  email: z.string().trim().email("Please enter a valid email address.").max(160),
  message: z.string().trim().min(10, "Please include a little more detail.").max(4000),
});

export async function POST(request: Request) {
  try {
    const parsed = messageSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid message." }, { status: 400 });
    await prisma.message.create({ data: parsed.data });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to send your message." }, { status: 500 });
  }
}
