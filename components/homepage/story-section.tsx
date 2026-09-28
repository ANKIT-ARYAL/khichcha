import Image from "next/image";
import { Eyebrow, SectionHeading } from "@/components/ui";

export function StorySection({ content }: { content?: string }) {
  return (
    <section className="story shell py-16" id="story">
      <div className="story__visual">
        <Image
          className="story__image"
          src="/story-himalayan.png"
          alt="A dog and yak milk cheese chew in the Himalayas"
          width={1536}
          height={2048}
        />
      </div>
      <div className="story__copy">
        <Eyebrow>Our story</Eyebrow>
        <SectionHeading>
          A taste of the
          <br />
          <em>mountains.</em>
        </SectionHeading>
        {content ? (
          content.split("\n").map((para, i) => <p key={i}>{para}</p>)
        ) : (
          <>
            <p>
              Meet KHICHCHA, a yak milk cheese dog chew made in Nepal and rooted in
              generations of Himalayan tradition.
            </p>
            <p>
              Each chew is handcrafted from yak and cow milk using a time-honored
              chhurpi-style recipe from the mountains of Nepal. It’s simple,
              natural, and made to last, so your dog gets a slow, satisfying chew
              instead of a snack that’s gone in seconds.
            </p>
            <p>
              Even the name has a story: “Khichcha” means “dog” in Newari, one of
              Nepal’s indigenous languages.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
