"use client";

import { useEffect, useState } from "react";
import { Eyebrow, SectionHeading } from "@/components/ui";
import type { ReviewData } from "@/lib/reviews";

export function ReviewsSection({ reviews }: { reviews: ReviewData[] }) {
  const [active, setActive] = useState(0);
  const total = reviews.length;

  useEffect(() => {
    if (total < 2) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % total), 4500);
    return () => window.clearInterval(timer);
  }, [total]);

  return <section className="section shell reviews" id="reviews"><div className="reviews__header"><div><Eyebrow>From the pack</Eyebrow><SectionHeading>Good words from<br /><em>good people.</em></SectionHeading></div><a className="text-link" href="https://www.amazon.com/dp/B0H535NKCW" target="_blank" rel="noreferrer">Read more on Amazon ↗</a></div>{total > 0 && <div className="review-slider" aria-roledescription="carousel" aria-label="Customer reviews" onMouseEnter={() => undefined}><div className="review-slider__track" style={{ transform: `translateX(-${active * 100}%)` }}>{reviews.map((review) => <figure className="review review-slider__slide" key={review.id || review.name}><div className="stars" aria-label="5 out of 5 stars">★★★★★</div><blockquote>“{review.quote}”</blockquote><figcaption>{review.name}<small>{review.meta}</small></figcaption></figure>)}</div><div className="review-slider__dots">{reviews.map((review, index) => <button type="button" key={review.id || review.name} aria-label={`Show review ${index + 1}`} aria-current={index === active} onClick={() => setActive(index)} />)}</div></div>}</section>;
}
