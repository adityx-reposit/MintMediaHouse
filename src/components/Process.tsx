"use client";

import { motion } from "framer-motion";

export default function Process() {
  const steps = [
    { num: "01", title: "DISCOVERY CALL", desc: "30-min deep dive into your brand, goals, and audience to map the perfect content strategy together." },
    { num: "02", title: "CREATIVE BRIEF", desc: "Detailed brief with references, scripts, and timeline — approved by you before we touch a single frame." },
    { num: "03", title: "PRODUCTION", desc: "Our team executes with precision. Draft updates in a shared workspace so nothing is ever a surprise." },
    { num: "04", title: "DELIVER & SCALE", desc: "Final assets in all formats. We measure, iterate, and keep producing content that grows with you." },
  ];

  return (
    <section id="process" className="bg-[#0a0a0a] py-[110px] px-[5vw]">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.65 }}
        className="text-center max-w-[600px] mx-auto"
      >
        <div className="text-[0.65rem] tracking-[0.2em] uppercase text-muted mb-5 flex items-center justify-center gap-2">
          <span className="text-[#ff3300]">//</span> Our Process
        </div>
        <h2 className="font-bebas text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[0.04em] text-white">
          SIMPLE. FAST.<br />
          <em className="not-italic text-[#ff3300]">EXTRAORDINARY.</em>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.65, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-[#1e1e1e] mt-16"
      >
        {steps.map((s, i) => (
          <div
            key={i}
            className="group px-8 py-10 border-b md:border-b-0 lg:border-r border-[#1e1e1e] cursor-none transition-colors duration-300 hover:bg-[#111111] last:border-b-0 lg:last:border-r-0 md:[&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-b-0"
          >
            <div className="font-bebas text-[3rem] text-white/[0.08] leading-none mb-5 transition-colors duration-300 group-hover:text-[#ff3300]">
              {s.num}
            </div>
            <div className="font-bebas text-[1.3rem] tracking-[0.06em] text-white mb-2.5">
              {s.title}
            </div>
            <div className="text-[0.8rem] text-[#888888] leading-[1.75] font-light">
              {s.desc}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
