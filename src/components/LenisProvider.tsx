"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";
import "lenis/dist/lenis.css";

export default function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.12, smoothWheel: true, duration: 1.0 }}>
      {children as any}
    </ReactLenis>
  );
}
