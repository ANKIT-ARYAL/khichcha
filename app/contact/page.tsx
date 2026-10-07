import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Eyebrow } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  return (
    <main className="inner-page shell">
      <Breadcrumbs current="Contact" />
      <div className="contact-heading">
        <div>
          <Eyebrow>Say hello</Eyebrow>
          <h1  className="story-page__title">
            We’d love to
            <br />
            <em>hear from you.</em>
          </h1>
          <p className="inner-page__intro">
            Questions about KHICHCHA, wholesale, or sharing the story of the
            Himalayas?
          </p>
        </div>
        <div className="contact-heading__info">
          <a className="contact-email" href="mailto:info.aathmandu@gmail.com">
            info.aathmandu@gmail.com ↗
          </a>
          <p className="contact-address">
            Aathmandu Inc.            
          </p>
          <a
            className="text-link"
            href="https://www.instagram.com/aathmandu"
            target="_blank"
            rel="noreferrer"
          >
            Follow along on Instagram ↗
          </a>
        </div>
      </div>
      <div className="contact-layout">
        <div className="contact-visual">
          <Image
            className="inner-page__image"
            src="/contact-himalayan.png"
            alt="A handcrafted Himalayan parcel with dog chews"
            fill
            sizes="100vw"
            priority
          />
          <div className="contact-visual__form">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
