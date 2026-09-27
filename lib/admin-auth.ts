import { cookies } from "next/headers";

const encoder = new TextEncoder();
const secret = () => process.env.AUTH_SECRET || "development-only-change-me";
const base64url = (input: ArrayBuffer | string) => Buffer.from(input instanceof ArrayBuffer ? new Uint8Array(input) : input).toString("base64url");
async function sign(value: string) { const key = await crypto.subtle.importKey("raw", encoder.encode(secret()), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]); return base64url(await crypto.subtle.sign("HMAC", key, encoder.encode(value))); }
export async function createAdminToken(email: string) { const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" })); const payload = base64url(JSON.stringify({ sub: email, role: "admin", exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8 })); return `${header}.${payload}.${await sign(`${header}.${payload}`)}`; }
export async function isAdminAuthenticated() { const token = (await cookies()).get("aathmandu_admin")?.value; if (!token) return false; const [header, payload, signature] = token.split("."); if (!header || !payload || !signature) return false; try { const valid = signature === await sign(`${header}.${payload}`); const data = JSON.parse(Buffer.from(payload, "base64url").toString()); return valid && data.role === "admin" && data.exp > Math.floor(Date.now() / 1000); } catch { return false; } }
