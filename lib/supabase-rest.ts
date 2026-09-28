import { prisma } from "@/lib/prisma";

const supabaseUrl = () => process.env.SUPABASE_URL?.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
const serviceKey = () => process.env.SUPABASE_SERVICE_ROLE_KEY;
const bucket = () => process.env.SUPABASE_STORAGE_BUCKET || "images";
export const hasSupabase = () => Boolean(supabaseUrl() && serviceKey());
function headers(extra: HeadersInit = {}) { return { apikey: serviceKey() || "", Authorization: `Bearer ${serviceKey() || ""}`, ...extra }; }
export async function supabaseTable(table: string, init: RequestInit = {}) { if (!hasSupabase()) throw new Error("Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."); return fetch(`${supabaseUrl()}/rest/v1/${table}`, { ...init, headers: headers({ "Content-Type": "application/json", ...(init.headers || {}) }), cache: "no-store" }); }
export async function uploadImage(file: File, path: string, maxBytes = 10 * 1024 * 1024) {
  if (!hasSupabase()) throw new Error("Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  if (!file.type.startsWith("image/")) throw new Error("Please upload a PNG, JPEG, or WebP image.");
  if (file.size > maxBytes) throw new Error(`Image must be smaller than ${Math.round(maxBytes / (1024 * 1024))} MB.`);
  const response = await fetch(`${supabaseUrl()}/storage/v1/object/${bucket()}/${path}`, {
    method: "POST",
    headers: headers({ "Content-Type": file.type, "x-upsert": "true" }),
    body: await file.arrayBuffer(),
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Image upload failed (${response.status}). ${detail.slice(0, 240)}`.trim());
  }
  return `${supabaseUrl()}/storage/v1/object/public/${bucket()}/${path}`;
}
export async function getActiveBanner() { if (!process.env.DATABASE_URL) return null; try { return await prisma.promotionalBanner.findFirst({ where: { slug: "primary", isActive: true } }); } catch { return null; } }
