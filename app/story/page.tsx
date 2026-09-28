import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { getHomepageContent } from "@/lib/site-content";
import { BenefitsSection } from "@/components/homepage/benefits-section";
import { IngredientsSection } from "@/components/homepage/ingredients-section";

export const dynamic = "force-dynamic";

export default async function StoryPage() {
  const siteContent = await getHomepageContent();

  return (
    <main className="inner-page shell story-page">
      <div className="story-breadcrumb-rail">
        <Breadcrumbs current="Our story" />
      </div>
      <div className="story-page__hero">
        <Image
          className="inner-page__image"
          src="/story-page-himalayan.png"
          alt="A Himalayan dog beside a handcrafted cheese chew"
          fill
          sizes="100vw"
          priority
        />
        <h1 className="story-page__title">
          From the Himalayas,
          <br />
          <em>for your best friend.</em>
        </h1>
        <div className="story-page__hero-copy" style={{ top: "clamp(12rem, 16vw, 16rem)", transform: "none" }}>
          <span className="eyebrow pt-16">Our story</span>
          <h2>Our story</h2>
          {siteContent?.story ? (
            siteContent.story.split("\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))
          ) : (
            <>
              <p>
                Meet KHICHCHA, a yak milk cheese dog chew made in Nepal and rooted
                in generations of Himalayan tradition.
              </p>
              <p>
                Each chew is handcrafted from yak and cow milk using a time-honored
                chhurpi-style recipe from the mountains of Nepal. It’s simple,
                natural, and made to last.
              </p>
            </>
          )}
          <div className="story-page__about">
            <h3>About Aathmandu Inc.</h3>
            <p>
              Aathmandu Inc. brings the natural goodness of the Himalayas to
              homes across the US.
            </p>
            <p>
              Based in New York, we partner with makers in Nepal to share
              products rooted in centuries-old Himalayan tradition. KHICHCHA is
              just the beginning.
            </p>
          </div>
        </div>
      </div>
      <BenefitsSection content={siteContent.benefits} />
      <IngredientsSection content={siteContent.ingredients} />
    </main>
  );
}
