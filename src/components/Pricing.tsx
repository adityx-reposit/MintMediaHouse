"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "UI Animations",
      price: "$600",
      description: "Perfect for SaaS products needing micro-interactions",
      features: [
        "10-15 custom animations",
        "Lottie files (web & mobile)",
        "Developer handoff docs",
        "2 rounds of revisions",
        "5-7 business days",
      ],
      cta: "Get Custom Quote",
      isPrimary: false,
    },
    {
      name: "Launch Videos",
      price: "$900",
      description: "Product launch videos that convert",
      features: [
        "1 premium launch video",
        "4K quality delivery",
        "Multiple cuts included",
        "Music & sound design",
        "6-8 business days",
        "3 rounds of revisions",
      ],
      cta: "Get Custom Quote",
      isPrimary: true,
    },
    {
      name: "Personal Brand",
      price: "$1,200",
      description: "10+ videos building your founder brand",
      features: [
        "Monthly video strategy",
        "10+ videos per month",
        "Full video production",
        "Editing & color grading",
        "Unlimited revisions",
        "Priority support",
      ],
      cta: "Schedule a Call",
      isPrimary: false,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
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
        <motion.div
          variants={itemVariants}
          className="text-center mb-16"
        >
          <div className="text-[0.65rem] tracking-[0.2em] uppercase text-muted mb-4 flex items-center justify-center gap-2">
            <span className="text-[#ff3300]">//</span> TRANSPARENT PRICING
          </div>
          <h2 className="font-bebas text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[0.04em] text-white">
            Simple, <em className="not-italic text-[#ff3300]">No Hidden</em><br />
            Pricing
          </h2>
          <p className="text-[0.95rem] text-[#888888] mt-4 max-w-2xl mx-auto">
            Custom quotes based on your needs. All packages include revisions & support.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-6 mt-12"
        >
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`relative rounded-lg border p-8 transition-all ${
                plan.isPrimary
                  ? "bg-[#1a1a1a] border-[#ff3300] scale-105 shadow-xl shadow-[#ff3300]/20"
                  : "bg-[#111111] border-[#1e1e1e] hover:border-[#333333]"
              }`}
            >
              {plan.isPrimary && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#ff3300] text-white text-[0.65rem] tracking-[0.1em] uppercase font-bold rounded-full">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-bold text-white mb-2">
                {plan.name}
              </h3>
              <p className="text-[0.85rem] text-[#666666] mb-4">
                {plan.description}
              </p>

              <div className="mb-6">
                <div className="text-4xl font-bold text-white">
                  {plan.price}
                </div>
                <p className="text-[0.75rem] text-[#666666] mt-1">
                  Starting price
                </p>
              </div>

              <button
                className={`w-full py-3 px-4 rounded-lg text-[0.7rem] tracking-[0.1em] uppercase font-medium transition-all mb-6 ${
                  plan.isPrimary
                    ? "bg-[#ff3300] text-white hover:bg-[#e82d00]"
                    : "border border-white text-white hover:bg-white hover:text-black"
                }`}
              >
                {plan.cta}
              </button>

              <ul className="space-y-3">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-start gap-3">
                    <Check size={16} className="text-[#ff3300] mt-0.5 flex-shrink-0" />
                    <span className="text-[0.85rem] text-[#888888]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-center mt-12"
        >
          <p className="text-[0.9rem] text-[#666666] mb-4">
            Need a custom package or retainer?
          </p>
          <a
            href="#quote"
            className="inline-block px-8 py-3 border border-[#ff3300] bg-[#ff3300] text-white rounded-full text-[0.7rem] tracking-[0.14em] uppercase font-medium hover:bg-[#e82d00] transition-colors"
          >
            Get a Custom Quote
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
