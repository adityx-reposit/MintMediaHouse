"use client";

import { motion } from "framer-motion";

export default function ClientLogos() {
  const clients = [
    { name: "Blackbox AI", logo: "🔷" },
    { name: "Play AI", logo: "▶️" },
    { name: "Base", logo: "⚙️" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="bg-[#0a0a0a] py-16 px-[5vw] border-b border-[#1e1e1e]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        <motion.p
          variants={itemVariants}
          className="text-center text-[0.75rem] tracking-[0.2em] uppercase text-[#666666] mb-8"
        >
          TRUSTED BY LEADING SAAS COMPANIES
        </motion.p>

        <motion.div
          variants={containerVariants}
          className="flex flex-wrap items-center justify-center gap-12 md:gap-16"
        >
          {clients.map((client, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex items-center gap-3 px-6 py-3 rounded-lg bg-[#111111] border border-[#1e1e1e] hover:border-[#333333] transition-colors"
            >
              <span className="text-2xl">{client.logo}</span>
              <span className="text-[0.9rem] text-white font-medium">
                {client.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Metrics */}
        <motion.div
          variants={containerVariants}
          className="mt-12 grid grid-cols-3 gap-6 text-center max-w-2xl mx-auto"
        >
          <motion.div variants={itemVariants}>
            <div className="text-3xl font-bold text-white">10M+</div>
            <p className="text-[0.8rem] text-[#666666] mt-2">Organic Views</p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <div className="text-3xl font-bold text-white">15+</div>
            <p className="text-[0.8rem] text-[#666666] mt-2">Happy Clients</p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <div className="text-3xl font-bold text-white">100%</div>
            <p className="text-[0.8rem] text-[#666666] mt-2">Satisfaction</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
