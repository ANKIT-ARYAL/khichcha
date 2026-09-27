import { HomepageLoader } from "@/components/homepage-loader";
import { Hero } from "@/components/homepage/hero";
import { TrustStrip } from "@/components/homepage/trust-strip";
import { PromoBanner } from "@/components/homepage/promo-banner";
import { ProductSection } from "@/components/homepage/product-section";
import { BenefitsSection } from "@/components/homepage/benefits-section";
import { StorySection } from "@/components/homepage/story-section";
import { IngredientsSection } from "@/components/homepage/ingredients-section";
import { ReviewsSection } from "@/components/homepage/reviews-section";
import { FaqSection } from "@/components/homepage/faq-section";
import { getProducts } from "@/lib/products";
import { getPublishedReviews } from "@/lib/reviews";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getProducts();
  const reviews = await getPublishedReviews();
  return (
    <HomepageLoader>
      <main>
        <Hero />
        <TrustStrip />
        <PromoBanner />
        <ProductSection products={products} />
        <BenefitsSection />
        <StorySection />
        <IngredientsSection />
        <ReviewsSection reviews={reviews} />
        <FaqSection />
      </main>
    </HomepageLoader>
  );
}
