import type { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/site-chrome";
export const metadata: Metadata = { title: "KHICHCHA | From the Himalayas, for your best friend", description: "A slow, satisfying yak milk cheese chew for dogs, handcrafted in Nepal." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><SiteChrome>{children}</SiteChrome></body></html>; }
