import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    return NextResponse.json(await prisma.message.findMany({ orderBy: { createdAt: "desc" } }));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to load messages." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id, isRead } = await request.json();
    if (typeof id !== "string") return NextResponse.json({ error: "Message id is required." }, { status: 400 });
    return NextResponse.json(await prisma.message.update({ where: { id }, data: { isRead: Boolean(isRead) } }));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to update message." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await request.json();
    if (typeof id !== "string") return NextResponse.json({ error: "Message id is required." }, { status: 400 });
    await prisma.message.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to delete message." }, { status: 500 });
  }
}
