"use client";

import Image from "next/image";
import { useState } from "react";

export function FloatingContact() {
  const [open, setOpen] = useState(false);
  return <div className="floating-contact"><div className={open ? "floating-contact__panel floating-contact__panel--open" : "floating-contact__panel"} aria-hidden={!open}><span className="eyebrow">Say hello</span><h2>Need a hand?</h2><p>Questions about KHICHCHA or your order?</p><a href="mailto:info.aathmandu@gmail.com">info.aathmandu@gmail.com ↗</a><a href="https://www.instagram.com/aathmandu" target="_blank" rel="noreferrer">Instagram ↗</a></div><button className="floating-contact__button" type="button" aria-label={open ? "Close contact information" : "Open contact information"} aria-expanded={open} onClick={() => setOpen((value) => !value)}><Image src="/khichcha-mark.png" alt="KHICHCHA contact" width={1421} height={1107} /></button></div>;
}
