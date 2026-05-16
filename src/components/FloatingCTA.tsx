"use client";

import { motion } from "framer-motion";

export default function FloatingCTA() {
  return (
    <motion.a
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      href="#book"
      className="fixed bottom-8 right-8 z-[50] py-2.5 px-[22px] border border-[#ff3300] bg-[#ff3300] text-white rounded-full no-underline text-[0.65rem] tracking-[0.14em] uppercase font-medium shadow-[0_8px_28px_rgba(255,51,0,0.35)] transition-all duration-200 hover:bg-[#e82d00] hover:scale-105 cursor-none"
    >
      📅 BOOK A CALL
    </motion.a>
  );
}
