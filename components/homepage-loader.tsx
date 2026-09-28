"use client";

import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";

export function HomepageLoader({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1650);
    return () => window.clearTimeout(timer);
  }, []);
  return <div className="homepage-shell">{visible && <div className="homepage-loader" aria-label="Loading Aathmandu" role="status"><Image className="homepage-loader__logo" src="/logo-transparent.png" alt="Aathmandu" width={1254} height={1254} priority /></div>}{children}</div>;
}
