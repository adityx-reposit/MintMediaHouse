"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";
import "lenis/dist/lenis.css";

export default function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true, duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) }}>
      {children as any}
    </ReactLenis>
  );
}
