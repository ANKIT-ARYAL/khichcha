import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

function text(value: unknown) { return String(value || "").trim(); }

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try { return NextResponse.json(await prisma.review.findMany({ orderBy: { createdAt: "desc" } })); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to load reviews." }, { status: 500 }); }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const payload = await request.json();
    const data = { name: text(payload.name), quote: text(payload.quote), meta: text(payload.meta), isPublished: Boolean(payload.isPublished) };
    if (!data.name || !data.quote) return NextResponse.json({ error: "Reviewer name and quote are required." }, { status: 400 });
    const review = payload.id
      ? await prisma.review.update({ where: { id: text(payload.id) }, data })
      : await prisma.review.create({ data });
    return NextResponse.json(review);
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to save review." }, { status: 500 }); }
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const payload = await request.json();
    const id = text(payload.id);
    if (!id) return NextResponse.json({ error: "Review id is required." }, { status: 400 });
    await prisma.review.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to delete review." }, { status: 500 }); }
}
