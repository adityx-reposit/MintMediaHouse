"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, DollarSign, RefreshCw } from "lucide-react";

export default function TrustSignals() {
  const signals = [
    {
      icon: ShieldCheck,
      title: "100% Satisfaction",
      description: "50% refund on UI animations if unsatisfied after revisions",
    },
    {
      icon: Clock,
      title: "24-Hour Guarantee",
      description: "We respond to all quote requests within 24 business hours",
    },
    {
      icon: DollarSign,
      title: "Fair Pricing",
      description: "No hidden fees, no surprise costs. Tailored quotes for every project",
    },
    {
      icon: RefreshCw,
      title: "Unlimited Revisions",
      description: "Retainer packages include unlimited revisions until perfect",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="bg-[#111111] py-[80px] px-[5vw] border-y border-[#1e1e1e]">
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
          <h3 className="font-bebas text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] tracking-[0.04em] text-white">
            Built On <em className="not-italic text-[#ff3300]">Trust</em>
          </h3>
          <p className="text-[0.9rem] text-[#888888] mt-4 max-w-2xl mx-auto">
            We stand behind our work with guarantees that protect your investment
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {signals.map((signal, idx) => {
            const Icon = signal.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-lg p-6 hover:border-[#ff3300] transition-colors group"
              >
                <div className="text-[#ff3300] mb-4 group-hover:scale-110 transition-transform">
                  <Icon size={32} />
                </div>
                <h4 className="text-[0.95rem] font-bold text-white mb-2">
                  {signal.title}
                </h4>
                <p className="text-[0.85rem] text-[#888888] leading-relaxed">
                  {signal.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Trust Elements */}
        <motion.div
          variants={containerVariants}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          <motion.div
            variants={itemVariants}
            className="text-center p-6 bg-[#0a0a0a] border border-[#1e1e1e] rounded-lg"
          >
            <div className="text-3xl font-bold text-[#ff3300] mb-2">15+</div>
            <p className="text-[0.85rem] text-[#888888]">
              Happy clients across Asia & US
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="text-center p-6 bg-[#0a0a0a] border border-[#1e1e1e] rounded-lg"
          >
            <div className="text-3xl font-bold text-[#ff3300] mb-2">
              10M+
            </div>
            <p className="text-[0.85rem] text-[#888888]">
              Organic views generated (verified)
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="text-center p-6 bg-[#0a0a0a] border border-[#1e1e1e] rounded-lg"
          >
            <div className="text-3xl font-bold text-[#ff3300] mb-2">
              100%
            </div>
            <p className="text-[0.85rem] text-[#888888]">
              Project on-time delivery rate
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
