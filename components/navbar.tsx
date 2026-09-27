"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return <header className="site-header shell"><Link href="/" className="brand-logo-image" onClick={close}><Image src="/logo-transparent.png" alt="Aathmandu" width={1254} height={1254} priority /></Link><nav className={open ? "site-nav site-nav--open" : "site-nav"}><Link href="/shop" onClick={close}>Shop</Link><Link href="/story" onClick={close}>Our story</Link><Link href="/faq" onClick={close}>FAQ</Link><Link href="/contact" onClick={close}>Contact</Link></nav><a className="header-cta" href="https://www.amazon.com/dp/B0H535NKCW" target="_blank" rel="noreferrer" onClick={close}>Buy on Amazon <span>↗</span></a><button className={open ? "menu-toggle menu-toggle--open" : "menu-toggle"} type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(value => !value)}><i /><i /><i /></button><div className="navbar-flags" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <i key={index} />)}</div></header>;
}
