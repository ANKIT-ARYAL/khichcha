"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export function ScrollMark() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && element.setAttribute("data-visible", "true"), { threshold: 0.25 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div className="scroll-mark" ref={ref} aria-hidden="true"><Image src="/khichcha-mark.png" alt="" width={1421} height={1107} /><i>⌁</i></div>;
}
