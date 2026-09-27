import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";

export default function StoryPage() {
  return (
    <main className="inner-page shell story-page">
      <Breadcrumbs current="Our story" />
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
        <div className="story-page__hero-copy py-24">
          <span className="eyebrow">Our story</span>
          <h2>Our story</h2>
          <p>
            Meet KHICHCHA, a yak milk cheese dog chew made in Nepal and rooted
            in generations of Himalayan tradition.
          </p>
          <p>
            Each chew is handcrafted from yak and cow milk using a time-honored
            chhurpi-style recipe from the mountains of Nepal. It’s simple,
            natural, and made to last.
          </p>
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
    </main>
  );
}
