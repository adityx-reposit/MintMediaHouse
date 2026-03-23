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
          <span className="block w-6 h-[1px] bg-muted"></span>
          Creative Media Agency · Est. 2021
        </motion.div>

        <motion.h1
          initial="initial"
          animate="animate"
          variants={fadeUp}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-bebas text-[clamp(4.5rem,9vw,9rem)] leading-[0.9] tracking-[0.04em] text-white"
        >
          WE<br />
          MAKE<br />
          BRANDS<br />
          <span className="text-[#ff3300]">VIRAL.</span>
        </motion.h1>

        <motion.p
          initial="initial"
          animate="animate"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 max-w-[440px] text-[0.95rem] font-light text-[#888888] leading-relaxed"
        >
          UI animations, launch videos & personal growth content built for founders who refuse to be ignored by their audience.
        </motion.p>

        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-10 flex gap-4 flex-wrap"
        >
          <a
            className="px-8 py-3.5 border border-white rounded-full text-white text-[0.7rem] tracking-[0.14em] uppercase font-medium transition-colors duration-200 hover:bg-white hover:text-black cursor-none"
            href="#work"
          >
            SEE OUR WORK
          </a>
          <a
            className="px-8 py-3.5 border border-[#ff3300] bg-[#ff3300] rounded-full text-white text-[0.7rem] tracking-[0.14em] uppercase font-medium transition-colors duration-200 hover:bg-[#e82d00] cursor-none"
            href="#quote"
          >
            GET A QUOTE
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
            <text fontFamily="Inter,sans-serif" fontSize="10.5" fill="#444444" letterSpacing="10">
              <textPath href="#cp">CREATIVE AGENCY · UI · VIDEO · GROWTH · </textPath>
            </text>
          </motion.svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#ff3300] rounded-full flex items-center justify-center text-3xl">
            🎬
          </div>
        </div>

        {/* Floating Cards */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[-5%] bg-[#111111] border border-[#1e1e1e] rounded-[10px] px-4 py-3 text-[0.72rem] tracking-[0.06em] text-[#888888]"
        >
          <strong className="block text-white font-bebas text-base tracking-[0.08em] mb-0.5">15+</strong>
          Brands Elevated
        </motion.div>

        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 2.7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-[38%] right-[-2%] bg-[#111111] border border-[#1e1e1e] rounded-[10px] px-4 py-3 text-[0.72rem] tracking-[0.06em] text-[#888888]"
        >
          <strong className="block text-white font-bebas text-base tracking-[0.08em] mb-0.5">10M+</strong>
          Views Generated
        </motion.div>

        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
          className="absolute bottom-[12%] left-[6%] bg-[#111111] border border-[#1e1e1e] rounded-[10px] px-4 py-3 text-[0.72rem] tracking-[0.06em] text-[#888888]"
        >
          <strong className="block text-white font-bebas text-base tracking-[0.08em] mb-0.5">5-DAY</strong>
          Delivery
        </motion.div>
      </motion.div>
    </section>
  );
}
