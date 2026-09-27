import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { uploadImage } from "@/lib/supabase-rest";
import { prisma } from "@/lib/prisma";

const optionalFields = [
  "brandName", "flavor", "ageRangeDescription", "itemForm", "specificUsesForProduct",
  "specialIngredients", "containerType", "breedRecommendation", "dogBreedSize",
  "animalFoodIngredientClaim", "productBenefits", "animalFoodNutrientContentClaim", "upc",
  "additionalFeatures", "recommendedUsesForProduct", "animalFoodDietType", "itemShape",
  "targetSpecies", "petType", "manufacturer", "asin",
] as const;

function value(form: FormData, key: string) { return String(form.get(key) || "").trim(); }

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try { return NextResponse.json(await prisma.product.findMany({ orderBy: { createdAt: "desc" } })); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Database is not configured." }, { status: 503 }); }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const form = await request.formData();
    const slug = value(form, "slug").toLowerCase().replace(/[^a-z0-9-]/g, "-");
    if (!slug) return NextResponse.json({ error: "Slug is required." }, { status: 400 });
    const existing = await prisma.product.findUnique({ where: { slug } });
    const file = form.get("image");
    let imageUrl = value(form, "imageUrl") || existing?.imageUrl || "";
    if (file instanceof File && file.size > 0) {
      const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
      imageUrl = await uploadImage(file, `products/${slug}-${Date.now()}.${extension}`);
    }
    const data = {
      name: value(form, "name"), size: value(form, "size"), description: value(form, "description"),
      amazonUrl: value(form, "amazonUrl"), imageUrl, details: value(form, "details"),
      ...Object.fromEntries(optionalFields.map((field) => [field, value(form, field)])),
    };
    return NextResponse.json(await prisma.product.upsert({ where: { slug }, update: data, create: { slug, ...data } }));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to save product." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const payload = await request.json();
    const slug = String(payload.slug || "").trim();
    if (!slug) return NextResponse.json({ error: "Product slug is required." }, { status: 400 });
    await prisma.product.delete({ where: { slug } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to delete product." }, { status: 500 });
  }
}
