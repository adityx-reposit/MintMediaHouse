"use client";

import { motion } from "framer-motion";
import { Check, Clock } from "lucide-react";

const plans = [
  {
    id: "signal",
    name: "The Signal",
    tagline: "Perfect for testing cold email & LinkedIn outreach with video for the first time",
    delivery: "7 business days",
    features: [
      "1 × UI/Product Animation Video (30–60s)",
      "The mintmedia Motion Brief™",
      "Feature-to-Feeling Script™",
      "2 export formats: 16:9 + 1:1",
      "2 rounds of revisions",
      "Full commercial rights",
    ],
    isPrimary: false,
  },
  {
    id: "launch",
    badge: "Most Popular",
    name: "The Launch Stack",
    tagline: "Launching a feature, running ads, or going outbound at scale",
    delivery: "14 business days",
    features: [
      "1 × Launch/Explainer Video (60–90s)",
      "2 × UI Animation Clips (30–45s each)",
      "3 × Ad Creative Variants (15s each)",
      "Motion Brief™ + Feature-to-Feeling Script™",
      "SaaS Objection Overlay™",
      "All aspect ratios: 16:9, 9:16, 1:1",
      "LinkedIn caption copy (3 videos)",
      "3 rounds of revisions",
      "Full commercial rights",
    ],
    isPrimary: true,
  },
  {
    id: "motion-os",
    name: "Motion OS",
    tagline: "Build video as a compounding growth channel with a monthly retainer",
    delivery: "5-day turnaround · 2-month minimum",
    features: [
      "4 × UI/Product Animation Videos/mo",
      "6 × Ad Creative Variants/mo",
      "Unlimited minor revision requests",
      "Monthly Content Strategy Call (30 min)",
      "The Motion Content Calendar™",
      "All aspect ratios & formats",
      "Full commercial rights",
    ],
    isPrimary: false,
  },
];

export default function Pricing() {
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

  return (
    <section id="pricing" className="bg-[#0a0a0a] py-[110px] px-[5vw]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="text-[0.65rem] tracking-[0.2em] uppercase text-muted mb-4 flex items-center justify-center gap-2">
            <span className="text-[#ff3300]">//</span> Our Packages
          </div>
          <h2 className="font-bebas text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[0.04em] text-white">
            Motion Content That
            <br />
            <em className="not-italic text-[#ff3300]">Pays For Itself</em>
          </h2>
          <p className="text-[0.95rem] text-[#888] mt-4 max-w-2xl mx-auto leading-relaxed">
            Premium motion content tailored to your exact needs.{" "}
            <span className="text-[#ff3300] font-semibold">Custom quote within 24 hours.</span>
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-6"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={itemVariants}
              className={`relative rounded-2xl border flex flex-col transition-all duration-300 ${
                plan.isPrimary
                  ? "bg-[#161616] border-[#ff3300] shadow-[0_0_60px_rgba(255,51,0,0.12)] scale-[1.025]"
                  : "bg-[#111] border-[#1e1e1e] hover:border-[#2e2e2e]"
              }`}
            >
              {/* Popular badge */}
              {"badge" in plan && plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#ff3300] text-white text-[0.6rem] tracking-[0.14em] uppercase font-bold rounded-full shadow-[0_4px_12px_rgba(255,51,0,0.4)]">
                  {plan.badge}
                </div>
              )}

              <div className="p-7 flex flex-col flex-1">
                {/* Plan name */}
                <div className="mb-6">
                  <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[#ff3300] mb-1.5">
                    {plan.id === "signal" ? "01 //" : plan.id === "launch" ? "02 //" : "03 //"}
                  </p>
                  <h3 className="font-bebas text-[1.7rem] tracking-[0.05em] text-white leading-none mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-[0.8rem] text-[#666] leading-relaxed">
                    {plan.tagline}
                  </p>
                </div>

                {/* Custom pricing badge — replaces PriceReveal */}
                <div className="mb-6 flex items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ff3300]/10 border border-[#ff3300]/20 text-[#ff5533] text-[0.62rem] tracking-[0.1em] uppercase font-bold">
                    <span>✦</span> Custom Pricing
                  </span>
                  <span className="text-[0.7rem] text-[#555]">· tailored to you</span>
                </div>

                {/* Delivery */}
                <div className="flex items-center gap-2 mb-5 text-[0.7rem] text-[#555]">
                  <Clock size={12} className="text-[#ff3300] flex-shrink-0" />
                  <span>{plan.delivery}</span>
                </div>

                {/* Feature list */}
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-2.5">
                      <Check size={13} className="text-[#ff3300] mt-[3px] flex-shrink-0" />
                      <span className="text-[0.8rem] text-[#888] leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#quote"
                  className={`w-full py-3 rounded-xl text-[0.7rem] tracking-[0.12em] uppercase font-bold text-center transition-all duration-200 mt-auto block ${
                    plan.isPrimary
                      ? "bg-[#ff3300] hover:bg-[#e82d00] text-white shadow-[0_4px_20px_rgba(255,51,0,0.3)]"
                      : "border border-[#2a2a2a] text-[#aaa] hover:border-[#ff3300] hover:text-white"
                  }`}
                >
                  Get Quote
                </a>
              </div>

              {/* Bottom accent line on primary */}
              {plan.isPrimary && (
                <div className="h-[2px] rounded-b-2xl bg-gradient-to-r from-transparent via-[#ff3300] to-transparent" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Guarantee strip */}
        <motion.div
          variants={itemVariants}
          className="mt-12 rounded-2xl border border-[#1e1e1e] bg-[#111] px-8 py-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
        >
          <div className="text-3xl flex-shrink-0">🛡️</div>
          <div>
            <p className="text-[0.75rem] tracking-[0.14em] uppercase text-[#ff3300] font-semibold mb-1">
              Love It or Redo It Guarantee
            </p>
            <p className="text-[0.82rem] text-[#777] leading-relaxed">
              If the video doesn&apos;t feel right after revisions, we redo it — different angle, different approach, no extra charge. Still not happy?{" "}
              <span className="text-white">Full refund, no questions asked.</span>
            </p>
          </div>
          <a
            href="#quote"
            className="flex-shrink-0 px-6 py-3 rounded-full bg-[#ff3300] hover:bg-[#e82d00] text-white text-[0.68rem] tracking-[0.14em] uppercase font-bold transition-colors shadow-[0_4px_16px_rgba(255,51,0,0.3)]"
          >
            Get a Custom Quote
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
