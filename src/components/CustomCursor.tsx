"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const DOT_SPRING  = { damping: 28, stiffness: 280, mass: 0.4 };
const RING_SPRING = { damping: 45, stiffness: 160, mass: 0.8 };

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const dotX  = useSpring(cursorX, DOT_SPRING);
  const dotY  = useSpring(cursorY, DOT_SPRING);
  const ringX = useSpring(cursorX, RING_SPRING);
  const ringY = useSpring(cursorY, RING_SPRING);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setIsHovered(
        t.tagName === "A" || t.tagName === "BUTTON" ||
        t.tagName === "INPUT" || t.tagName === "TEXTAREA" ||
        t.tagName === "SELECT" ||
        !!t.closest("a") || !!t.closest("button")
      );
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-white mix-blend-difference"
        style={{
          x: dotX, y: dotY,
          translateX: "-50%", translateY: "-50%",
          willChange: "transform",
        }}
        animate={{ width: isHovered ? 18 : 10, height: isHovered ? 18 : 10 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-white/40"
        style={{
          x: ringX, y: ringY,
          translateX: "-50%", translateY: "-50%",
          willChange: "transform",
        }}
        animate={{ width: isHovered ? 50 : 32, height: isHovered ? 50 : 32 }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
