"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";
import "lenis/dist/lenis.css";

export default function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.085, smoothWheel: true }}>
      {children as any}
    </ReactLenis>
  );
}
