"use client";

import { motion } from "framer-motion";

export default function FloatingCTA() {
  const text = "BOOK A CALL · BOOK A CALL · ";
  const chars = text.split("");
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const charAngle = 360 / chars.length;

  return (
    <motion.a
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      href="#book"
      className="fixed bottom-8 right-8 z-[50] no-underline cursor-none"
      aria-label="Book a Call"
    >
      <div className="relative w-[110px] h-[110px] group">

        {/* Spinning ring with text */}
        <motion.svg
          viewBox="0 0 110 110"
          className="absolute inset-0 w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          {chars.map((char, i) => {
            const angle = (charAngle * i - 90) * (Math.PI / 180);
            const x = 55 + radius * Math.cos(angle);
            const y = 55 + radius * Math.sin(angle);
            return (
              <text
                key={i}
                x={x}
                y={y}
                fill="#ff3300"
                fontSize="7.5"
                fontFamily="Arial, sans-serif"
                fontWeight="600"
                letterSpacing="0.5"
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${charAngle * i}, ${x}, ${y})`}
              >
                {char}
              </text>
            );
          })}
        </motion.svg>

        {/* Centre circle */}
        <div
          className="absolute inset-[16px] rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105"
          style={{
            background: "#111",
            border: "1px solid rgba(255,51,0,0.3)",
            boxShadow: "0 0 24px rgba(255,51,0,0.25)",
          }}
        >
          {/* Mint Media logo */}
          <svg viewBox="0 0 100 68" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-auto">
            <rect x="1"  y="44" width="13" height="22" rx="3" fill="#EDEAE0"/>
            <rect x="19" y="28" width="13" height="38" rx="3" fill="#EDEAE0"/>
            <rect x="37" y="8"  width="13" height="58" rx="3" fill="#EDEAE0"/>
            <path d="M52 6 L100 34 L52 62 Z" fill="#3DD9B5"/>
          </svg>
        </div>
      </div>
    </motion.a>
  );
}
