"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";
import "lenis/dist/lenis.css";

// Defined outside component — stable reference, never recreated on render
const easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

const LENIS_OPTIONS = {
  lerp: 0.1,
  smoothWheel: true,
  duration: 1.1,
  easing,
} as const;

export default function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      {children as any}
    </ReactLenis>
  );
}
