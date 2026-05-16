"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  {
    icon: "📱",
    title: "PLATFORM STRATEGY",
    text: "Tailored content playbooks for Instagram, LinkedIn, and X — built around your personal voice and growth goals.",
    pill: "Multi-Platform",
    accent: false,
  },
  {
    icon: "🎬",
    title: "HIGH-PERFORMING CONTENT",
    text: "Premium video content designed to stop the scroll, build authority, and convert followers into loyal fans.",
    pill: "Content Creation",
    accent: true,
  },
  {
    icon: "📈",
    title: "COMPOUNDING GROWTH",
    text: "Consistent weekly publishing cadence engineered to compound your reach and build an audience that shows up.",
    pill: "Growth Engine",
    accent: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export default function SelfGrowthChannel() {
  return (
    <section id="self-growth" className="bg-[#111111] py-[110px] px-[5vw] border-y border-[#1e1e1e]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="text-[0.65rem] tracking-[0.2em] uppercase text-muted mb-5 flex items-center gap-2">
            <span className="text-[#ff3300]">//</span> New Offering
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <h2 className="font-bebas text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[0.04em] text-white">
                SELF GROWTH
                <br />
                <em className="not-italic text-[#ff3300]">CHANNEL</em>
              </h2>
              <p className="text-[0.95rem] text-[#888] mt-5 max-w-[520px] leading-relaxed">
                Create a premium self-growth personal brand with high-performing content strategies across social platforms.
              </p>
            </div>

            {/* CTA */}
            <motion.div variants={itemVariants} className="flex-shrink-0">
              <Link
                href="/waitlist"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#ff3300] hover:bg-[#e82d00] text-white rounded-full text-[0.72rem] tracking-[0.14em] uppercase font-bold transition-all duration-200 shadow-[0_4px_24px_rgba(255,51,0,0.35)] hover:shadow-[0_4px_36px_rgba(255,51,0,0.5)] hover:scale-[1.02]"
              >
                Join Waitlist
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </Link>
              <p className="mt-3 text-[0.62rem] tracking-[0.12em] uppercase text-[#555] text-center lg:text-left">
                Limited spots · Applications open
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#1e1e1e]"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="relative bg-[#0a0a0a] p-10 overflow-hidden group transition-colors duration-300 hover:bg-[#0d0d0d]"
            >
              {/* Large background number */}
              <div className="absolute font-bebas text-[9rem] leading-none text-white/[0.025] tracking-[-0.02em] pointer-events-none top-0 right-0">
                {String(i + 1).padStart(2, "0")}
              </div>

              <div className="relative z-10">
                <div className="text-[2.2rem] mb-6">{f.icon}</div>
                <h3 className="font-bebas text-[1.6rem] tracking-[0.06em] text-white mb-3 leading-tight">
                  {f.title}
                </h3>
                <p className="text-[0.88rem] text-[#888888] leading-[1.8] font-light mb-6">
                  {f.text}
                </p>
                <div
                  className={`inline-block px-3.5 py-1 border rounded-full text-[0.62rem] tracking-[0.14em] uppercase transition-colors duration-200 ${
                    f.accent
                      ? "border-[#ff3300] text-[#ff3300]"
                      : "border-[#2a2a2a] text-muted group-hover:border-[#3a3a3a]"
                  }`}
                >
                  {f.pill}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom strip */}
        <motion.div
          variants={itemVariants}
          className="mt-10 rounded-2xl border border-[#1e1e1e] bg-[#0a0a0a] px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-5"
        >
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-[#ff3300] animate-pulse" />
            <p className="text-[0.82rem] text-[#888] leading-relaxed">
              Building the next generation of <span className="text-white font-medium">personal brand creators</span> — across every platform that matters.
            </p>
          </div>
          <Link
            href="/waitlist"
            className="flex-shrink-0 px-6 py-2.5 rounded-full border border-[#2a2a2a] text-[#aaa] hover:border-[#ff3300] hover:text-white text-[0.68rem] tracking-[0.14em] uppercase font-medium transition-all duration-200 whitespace-nowrap"
          >
            Join Waitlist →
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
