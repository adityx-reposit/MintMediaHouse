"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section className="min-h-screen px-[5vw] pt-[120px] pb-20 md:pt-[120px] md:grid md:grid-cols-2 flex flex-col items-center gap-16 relative overflow-hidden">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[0.68rem] tracking-[0.2em] uppercase text-muted mb-5 flex items-center gap-3"
        >
          <h2 className="block w-6 h-[1px] bg-muted"></h2>
          <span className="sr-only">Mint Media House</span>
          10M+ VIEWS GENERATED · TRUSTED BY SAAS FOUNDERS
        </motion.div>

        <motion.h1
          initial="initial"
          animate="animate"
          variants={fadeUp}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-bebas text-[clamp(4.5rem,9vw,9rem)] leading-[0.9] tracking-[0.04em] text-white"
        >
          LAUNCH VIDEOS<br />
          THAT<br />
          <span className="text-[#ff3300]">CONVERT.</span>
        </motion.h1>

        <motion.p
          initial="initial"
          animate="animate"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 max-w-[440px] text-[0.95rem] font-light text-[#888888] leading-relaxed"
        >
          <strong>Mint Media House</strong> creates custom UI animations, launch videos & personal brand content for SaaS founders. We've helped 15+ startups generate millions of organic views and scale their revenue.
        </motion.p>

        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-10 flex gap-4 flex-wrap"
        >
          <a
            className="px-8 py-3.5 bg-[#ff3300] hover:bg-[#e82d00] rounded-full text-white text-[0.7rem] tracking-[0.14em] uppercase font-medium transition-colors duration-200 cursor-none"
            href="#quote"
          >
            Get Custom Quote →
          </a>
          <a
            className="px-8 py-3.5 border border-white rounded-full text-white text-[0.7rem] tracking-[0.14em] uppercase font-medium transition-colors duration-200 hover:bg-white hover:text-black cursor-none"
            href="#work"
          >
            See Our Work
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.8 }}
        className="relative h-[260px] md:h-[520px] w-full flex items-center justify-center"
      >
        <div className="relative w-[190px] h-[190px]">
          <motion.svg
            viewBox="0 0 190 190"
            width="190"
            height="190"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            <path id="cp" d="M 95 95 m -74 0 a 74 74 0 1 1 148 0 a 74 74 0 1 1 -148 0" fill="none" />
            <text fontFamily="Inter,sans-serif" fontSize="10.5" fill="#ffffff" letterSpacing="10" style={{ textShadow: "0 0 8px rgba(255,255,255,0.4)" }}>
              <textPath href="#cp">CREATIVE AGENCY · UI · VIDEO · GROWTH · </textPath>
            </text>
          </motion.svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl overflow-hidden z-10">
            <img src="/android-chrome-512x512.png" alt="Mint Media House — UI animation and launch video agency for SaaS founders" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Floating Cards - Logos */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[8%] left-[-10%] bg-[#111111] border border-[#2a2a2a] rounded-[16px] p-6 flex items-center justify-center shadow-2xl z-20"
        >
          <img src="/blackbox-logo.png" alt="Blackbox AI launch video client — Mint Media House SaaS case study" loading="lazy" decoding="async" className="h-[80px] object-contain" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 2.7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-[42%] right-[-8%] bg-[#111111] border border-[#2a2a2a] rounded-[16px] p-6 flex items-center justify-center shadow-2xl z-20"
        >
          <img src="/playai.png" alt="PlayAI Network launch video client — Mint Media House" loading="lazy" decoding="async" className="h-[80px] object-contain" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
          className="absolute bottom-[5%] left-[2%] bg-[#111111] border border-[#2a2a2a] rounded-[16px] p-6 flex items-center justify-center shadow-2xl z-20"
        >
          <img src="/base-logo.png" alt="Base L2 UI animation client — Mint Media House case study" loading="lazy" decoding="async" className="h-[80px] object-contain" />
        </motion.div>
      </motion.div>
    </section>
  );
}
