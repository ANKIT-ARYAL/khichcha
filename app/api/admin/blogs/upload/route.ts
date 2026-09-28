import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { uploadImage } from "@/lib/supabase-rest";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try { const form = await request.formData(); const file = form.get("image"); if (!(file instanceof File) || !file.size) return NextResponse.json({ error: "Image is required." }, { status: 400 }); const extension = file.name.split(".").pop()?.toLowerCase() || "jpg"; const url = await uploadImage(file, `blogs/content-${Date.now()}.${extension}`, 1024 * 1024); return NextResponse.json({ url }); } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to upload image." }, { status: 500 }); }
}
