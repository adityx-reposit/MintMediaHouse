"use client";

import { motion } from "framer-motion";

export default function BookCall() {
  return (
    <>
      {/* BOOK */}
      <section id="book" className="bg-[#0a0a0a] text-center py-[110px] px-[5vw]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.65 }}
        >
          <div className="text-[0.65rem] tracking-[0.2em] uppercase text-muted mb-5 flex items-center justify-center gap-2">
            <span className="text-[#ff3300]">//</span> Book a Call
          </div>
          <h2 className="font-bebas text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[0.04em] text-white">
            FREE <em className="not-italic text-[#ff3300]">DISCOVERY</em><br />
            SESSION
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="max-w-[600px] mx-auto mt-12"
        >
          <div className="border border-[#1e1e1e] p-[3rem_2.5rem] bg-[#111111]">
            <p className="text-[0.9rem] text-[#888888] font-light leading-[1.8] mb-8">
              Pick a time that works — 30 minutes, zero pressure. We'll map out exactly how MintMediaHouse can grow your brand. Instant cal.com confirmation.
            </p>
            <a
              className="inline-flex items-center gap-3 px-9 py-[15px] border border-white rounded-full text-white text-[0.72rem] tracking-[0.14em] uppercase font-medium transition-colors duration-200 hover:bg-white hover:text-black cursor-none"
              href="https://cal.com/mintmediahouse"
              target="_blank"
            >
              📅 {"\u00A0"}OPEN CAL.COM & BOOK NOW
            </a>
            <div className="mt-5 text-[0.65rem] tracking-[0.1em] uppercase text-muted">
              FREE 30-MIN STRATEGY CALL · NO COMMITMENT · INSTANT CONFIRMATION
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section id="cta" className="bg-[#111111] text-center py-[130px] px-[5vw]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.65 }}
        >
          <motion.div
            className="text-[2.5rem] mb-8 inline-block"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            ⊕
          </motion.div>
          <div className="font-bebas text-[clamp(3.5rem,9vw,10rem)] leading-[0.9] tracking-[0.03em] text-white">
            READY TO<br />COLLABORATE?
          </div>
          <p className="text-[0.95rem] text-[#888888] my-6 mx-auto max-w-[420px] font-light">
            Have a project in mind? Let's create something extraordinary together.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <a
              className="px-8 py-3.5 border border-white rounded-full text-white text-[0.7rem] tracking-[0.14em] uppercase font-medium transition-colors duration-200 hover:bg-white hover:text-black cursor-none"
              href="#quote"
            >
              GET A QUOTE
            </a>
            <a
              className="px-8 py-3.5 border border-[#ff3300] bg-[#ff3300] rounded-full text-white text-[0.7rem] tracking-[0.14em] uppercase font-medium transition-colors duration-200 hover:bg-[#e82d00] cursor-none"
              href="https://cal.com/mintmediahouse"
              target="_blank"
            >
              BOOK A CALL
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
