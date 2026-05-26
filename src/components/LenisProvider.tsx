"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function GSAPLenisBridge() {
  const lenis = useLenis(({ scroll }) => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    if (!lenis) return;
    const lenisInstance = lenis;
    function onFrame(time: number) {
      lenisInstance.raf(time * 1000);
    }
    gsap.ticker.add(onFrame);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(onFrame);
    };
  }, [lenis]);

  return null;
}

export default function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, duration: 1.2, autoRaf: false }}>
      <GSAPLenisBridge />
      {children as any}
    </ReactLenis>
  );
}
