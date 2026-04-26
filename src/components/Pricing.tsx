"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Clock } from "lucide-react";

const plans = [
  {
    id: "signal",
    badge: null,
    name: "The Signal",
    tagline: "Perfect for testing cold email & LinkedIn outreach with video for the first time",
    usPrice: 3700,
    ourPrice: 1500,
    suffix: "",
    delivery: "7 business days",
    features: [
      "1 × UI/Product Animation Video (30–60s)",
      "The mintmedia Motion Brief™",
      "Feature-to-Feeling Script™",
      "2 export formats: 16:9 + 1:1",
      "2 rounds of revisions",
      "Full commercial rights",
    ],
    cta: "Get Started",
    isPrimary: false,
  },
  {
    id: "launch",
    badge: "Most Popular",
    name: "The Launch Stack",
    tagline: "Launching a feature, running ads, or going outbound at scale",
    usPrice: 14100,
    ourPrice: 4500,
    suffix: "",
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
    cta: "Get Started",
    isPrimary: true,
  },
  {
    id: "motion-os",
    badge: null,
    name: "Motion OS",
    tagline: "Build video as a compounding growth channel with a monthly retainer",
    usPrice: 13800,
    ourPrice: 3200,
    suffix: "/mo",
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
    cta: "Book a Call",
    isPrimary: false,
  },
];

function PriceReveal({
  usPrice,
  ourPrice,
  suffix,
}: {
  usPrice: number;
  ourPrice: number;
  suffix: string;
}) {
  const [phase, setPhase] = useState<"hidden" | "counting" | "done">("hidden");
  const [displayPrice, setDisplayPrice] = useState(usPrice);

  const startReveal = useCallback(() => {
    if (phase !== "hidden") return;
    setPhase("counting");
    setDisplayPrice(usPrice);

    const DURATION = 2200;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      // ease-out quart: fast drop, satisfying deceleration near final price
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(usPrice - (usPrice - ourPrice) * eased);
      setDisplayPrice(current);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplayPrice(ourPrice);
        setPhase("done");
      }
    };

    // Short pause so user sees the US price before countdown starts
    setTimeout(() => requestAnimationFrame(tick), 700);
  }, [phase, usPrice, ourPrice]);

  const savings = usPrice - ourPrice;
  const savingsPct = Math.round((savings / usPrice) * 100);

  return (
    <div className="mb-6 min-h-[84px] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {phase === "hidden" ? (
          <motion.button
            key="reveal-btn"
            onClick={startReveal}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.18 } }}
            whileHover={{ scale: 1.02, boxShadow: "0 6px 32px rgba(255,51,0,0.5)" }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3.5 rounded-xl text-white text-[0.72rem] tracking-[0.18em] uppercase font-bold flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#ff3300] to-[#cc2900] shadow-[0_4px_24px_rgba(255,51,0,0.32)]"
          >
            <span className="text-[1rem] leading-none">✦</span>
            Reveal Price
          </motion.button>
        ) : (
          <motion.div
            key="price-display"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
          >
            {/* US agency rate — strikethrough once counting done */}
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[0.58rem] tracking-[0.14em] uppercase text-[#555]">
                US agencies charge
              </span>
              <span
                className={`text-[0.82rem] font-semibold tabular-nums transition-all duration-500 ${
                  phase === "done"
                    ? "line-through text-[#333]"
                    : "text-[#888]"
                }`}
              >
                ${usPrice.toLocaleString()}
                {suffix}
              </span>
            </div>

            {/* Animated main price */}
            <div className="flex items-baseline gap-1">
              <span className={`font-bebas text-[3.5rem] leading-none tracking-[0.02em] tabular-nums transition-colors duration-500 ${phase === "done" ? "text-[#22c55e]" : "text-white"}`}>
                ${displayPrice.toLocaleString()}
              </span>
              {suffix && (
                <span className="text-[#777] text-[0.88rem] mb-0.5">{suffix}</span>
              )}
            </div>

            {/* Savings badge — pops in after count finishes */}
            <AnimatePresence>
              {phase === "done" && (
                <motion.div
                  initial={{ opacity: 0, x: -8, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22, delay: 0.08 }}
                  className="mt-1.5 flex items-center gap-2"
                >
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ff3300]/12 border border-[#ff3300]/25 text-[#ff5533] text-[0.6rem] tracking-[0.1em] uppercase font-bold">
                    <span>✓</span> You save ${savings.toLocaleString()} ({savingsPct}% off)
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
            <span className="text-[#ff3300]">//</span> The Grand Slam Offer
          </div>
          <h2 className="font-bebas text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[0.04em] text-white">
            Motion Content That
            <br />
            <em className="not-italic text-[#ff3300]">Pays For Itself</em>
          </h2>
          <p className="text-[0.95rem] text-[#888] mt-4 max-w-2xl mx-auto leading-relaxed">
            US prices. Our prices. <span className="text-[#ff3300] font-semibold">Big difference.</span>
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
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#ff3300] text-white text-[0.6rem] tracking-[0.14em] uppercase font-bold rounded-full shadow-[0_4px_12px_rgba(255,51,0,0.4)]">
                  {plan.badge}
                </div>
              )}

              <div className="p-7 flex flex-col flex-1">
                {/* Plan name */}
                <div className="mb-4">
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

                {/* Price reveal */}
                <PriceReveal
                  usPrice={plan.usPrice}
                  ourPrice={plan.ourPrice}
                  suffix={plan.suffix}
                />

                {/* Delivery */}
                <div className="flex items-center gap-2 mb-5 text-[0.7rem] text-[#555]">
                  <Clock size={12} className="text-[#ff3300] flex-shrink-0" />
                  <span>{plan.delivery}</span>
                </div>

                {/* Feature list */}
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-2.5">
                      <Check
                        size={13}
                        className="text-[#ff3300] mt-[3px] flex-shrink-0"
                      />
                      <span className="text-[0.8rem] text-[#888] leading-snug">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA — always at card bottom */}
                <a
                  href="#quote"
                  className={`w-full py-3 rounded-xl text-[0.7rem] tracking-[0.12em] uppercase font-bold text-center transition-all duration-200 mt-auto block ${
                    plan.isPrimary
                      ? "bg-[#ff3300] hover:bg-[#e82d00] text-white shadow-[0_4px_20px_rgba(255,51,0,0.3)]"
                      : "border border-[#2a2a2a] text-[#aaa] hover:border-[#ff3300] hover:text-white"
                  }`}
                >
                  {plan.cta}
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
