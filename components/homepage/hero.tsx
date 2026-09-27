import Image from "next/image";
import { Button, Eyebrow } from "@/components/ui";
import { TrustStrip } from "@/components/homepage/trust-strip";

export function Hero() {
  return (
    <section className="hero shell" id="top">
      <div className="hero__copy">
        <div className="hero__note">
          <span className="hero__stamp">Made in Nepal</span>
          <span>From the Himalayas,<br />for your best friend.</span>
        </div>
        <Eyebrow>Himalayan-made • US available</Eyebrow>
        <h1>
          A longer-lasting chew, <em>rooted in Nepal.</em>
        </h1>
        <p className="hero__lede">
          Simple ingredients. A slow, satisfying chew. KHICHCHA brings a little
          piece of the Himalayas to your dog’s everyday ritual.
        </p>
        <div className="hero__actions">
          <Button href="/shop">Shop KHICHCHA</Button>
          <a className="text-link" href="/story">
            Our story <span>↘</span>
          </a>
        </div>
      </div>
      <div
        className="hero__art"
        aria-label="Illustration of a Himalayan dog chew"
      >
        <Image
          className="hero__product-image"
          src="/hero-himalayan.png"
          alt="A golden dog enjoying a Himalayan cheese chew"
          width={1664}
          height={936}
          priority
        />
      </div>
      <TrustStrip />
    </section>
  );
}
