"use client";

import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";

export function HomepageLoader({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1650);
    return () => window.clearTimeout(timer);
  }, []);
  return <div className="homepage-shell">{visible && <div className="homepage-loader" aria-label="Loading KHICHCHA" role="status"><Image className="homepage-loader__logo" src="/khichcha-mark.png" alt="KHICHCHA" width={1421} height={1107} priority /></div>}{children}</div>;
}
