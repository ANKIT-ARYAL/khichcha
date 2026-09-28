"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FloatingContact } from "@/components/floating-contact";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const admin = pathname.startsWith("/admin");
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (admin || !ref.current) return;
    const root = ref.current;
    const targets = root.querySelectorAll<HTMLElement>(
      "main h1, main h2, main h3, main p, main .eyebrow, main .button, main .text-link, main label, main .product-card, main .review, main details, main .inner-page__image, main .contact-form",
    );
    targets.forEach((target) => target.classList.add("reveal-target"));
    root.classList.add("reveal-ready");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.05, rootMargin: "0px 0px -4%" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [admin]);

  if (admin) return <>{children}</>;
  return (
    <div className="public-site" ref={ref}>
      <Navbar />
      {children}
      <Footer />
      <FloatingContact />
    </div>
  );
}
