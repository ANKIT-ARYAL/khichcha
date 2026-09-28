import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { uploadImage } from "@/lib/supabase-rest";
import { prisma } from "@/lib/prisma";

const text = (form: FormData, key: string) =>
  String(form.get(key) || "").trim();
const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
export async function GET() {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    return NextResponse.json(
      await prisma.blog.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, slug: true, title: true, excerpt: true, imageUrl: true, isPublished: true } }),
    );
  } catch (error) {
    console.error("Admin blogs database query failed", error);
    return NextResponse.json(
      {
        error:
          "Blogs are unavailable until the blogs table is created in the current database.",
      },
      { status: 503 },
    );
  }
}
export async function POST(request: Request) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const form = await request.formData();
    const slug = slugify(text(form, "slug") || text(form, "title"));
    if (!slug)
      return NextResponse.json(
        { error: "Title is required." },
        { status: 400 },
      );
    const existing = await prisma.blog.findUnique({ where: { slug } });
    let imageUrl = existing?.imageUrl || "";
    const file = form.get("image");
    if (file instanceof File && file.size)
      imageUrl = await uploadImage(
        file,
        `blogs/${slug}-${Date.now()}.${file.name.split(".").pop() || "jpg"}`,
      );
    const data = {
      title: text(form, "title"),
      slug,
      excerpt: text(form, "excerpt"),
      content: text(form, "content"),
      imageUrl,
      isPublished: form.get("isPublished") === "on",
    };
    return NextResponse.json(
      await prisma.blog.upsert({ where: { slug }, update: data, create: data }),
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to save blog.",
      },
      { status: 500 },
    );
  }
}
export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { slug } = await request.json();
    await prisma.blog.delete({ where: { slug: String(slug) } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to delete blog." },
      { status: 500 },
    );
  }
}
