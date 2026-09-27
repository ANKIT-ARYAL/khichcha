import { getActiveBanner } from "@/lib/supabase-rest";

export async function PromoBanner() { const banner = await getActiveBanner(); if (!banner) return null; return <section className="promo-banner shell"><span className="eyebrow">{banner.eyebrow}</span><strong>{banner.headline}</strong><p>{banner.body}</p>{banner.ctaUrl && <a className="text-link" href={banner.ctaUrl} target="_blank" rel="noreferrer">{banner.ctaLabel || "Learn more"} ↗</a>}</section>; }
