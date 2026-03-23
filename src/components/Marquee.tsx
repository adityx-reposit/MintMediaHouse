"use client";

import { motion } from "framer-motion";

export default function Marquee() {
  const items = [
    "UI Animations",
    "Launch Videos",
    "Personal Growth",
    "Ad Creatives",
    "Motion Design",
    "Social Content",
    "Brand Films",
    "Course Trailers",
    "Podcast Branding",
    "Authority Reels",
  ];

  const tripleItems = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden border-t border-b border-[#1e1e1e] py-4 bg-[#111111]">
      <motion.div
        className="flex gap-12 whitespace-nowrap w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 24, ease: "linear", repeat: Infinity }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {tripleItems.map((item, i) => (
          <div
            key={i}
            className="text-[0.68rem] tracking-[0.18em] uppercase text-muted flex items-center gap-4"
          >
            {item} <span className="text-[#ff3300]">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
