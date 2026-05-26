"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

const STATS = [
  { label: "WORLDWIDE CLIENTS",   value: 15,  suffix: "+",  sub: "BRANDS ELEVATED",     orange: "+" },
  { label: "VIEWS GENERATED",     value: 10,  suffix: "M+", sub: "ORGANIC IMPRESSIONS",  orange: "M+" },
  { label: "SATISFACTION RATE",   value: 98,  suffix: "%",  sub: "CLIENT RETENTION",     orange: "%" },
];

function CountUp({
  progress,
  target,
  suffix,
  orangeSuffix,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  target: number;
  suffix: string;
  orangeSuffix: string;
}) {
  const count = useTransform(progress, [0.05, 0.7], [0, target]);
  const [display, setDisplay] = useState(0);
  useMotionValueEvent(count, "change", (v) => setDisplay(Math.round(v)));

  const base = suffix.slice(0, suffix.length - orangeSuffix.length);

  return (
    <span
      className="font-bebas leading-none block"
      style={{ fontSize: "clamp(1.8rem, 7.5vw, 7rem)", letterSpacing: "0.02em" }}
    >
      <span className="text-white">
        {display}{base}
      </span>
      <span style={{ color: "#ff3300" }}>{orangeSuffix}</span>
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 20%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const yVal    = useTransform(scrollYProgress, [0, 0.25], [28, 0]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, y: yVal, background: "#0d0d0d" }}
      className="w-full border-t border-b border-[#1a1a1a]"
    >
      <div className="flex flex-row">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`flex-1 px-3 sm:px-[5vw] py-6 sm:py-10 flex flex-col gap-1.5 sm:gap-2.5 ${
              i < 2 ? "border-r border-[#1a1a1a]" : ""
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-[#ff3300] text-[0.5rem] sm:text-[0.6rem] font-semibold">//</span>
              <span className="text-[0.42rem] sm:text-[0.56rem] tracking-[0.18em] sm:tracking-[0.24em] uppercase text-[#444] font-inter leading-tight">
                {s.label}
              </span>
            </div>
            <CountUp
              progress={scrollYProgress}
              target={s.value}
              suffix={s.suffix}
              orangeSuffix={s.orange}
            />
            <span className="text-[0.42rem] sm:text-[0.56rem] tracking-[0.16em] sm:tracking-[0.2em] uppercase text-[#444] font-inter">
              {s.sub}
            </span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
