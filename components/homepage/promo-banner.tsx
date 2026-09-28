import { getActiveBanner } from "@/lib/supabase-rest";

export async function PromoBanner() {
  const banner = await getActiveBanner();
  if (!banner || !banner.imageUrl) return null;
  return (
    <section className="promo-banner shell">
      <img
        src={banner.imageUrl}
        alt="Promotional Banner"
        style={{
          width: "100%",
          aspectRatio: "16/9",
          objectFit: "cover",
          display: "block",
          borderRadius: "clamp(0.5rem, 2vw, 1rem)",
        }}
      />
    </section>
  );
}
