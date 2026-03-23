"use client";

import { motion } from "framer-motion";

export default function Stats() {
  const stats = [
    { num: "15", suff: "+", label: "Brands Elevated", pre: "Worldwide Clients" },
    { num: "10", suff: "M+", label: "Organic Impressions", pre: "Views Generated" },
    { num: "98", suff: "%", label: "Client Retention", pre: "Satisfaction Rate" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 border-t border-[#1e1e1e]">
      {stats.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className="p-10 px-[5vw] border-b md:border-b-0 md:border-r border-[#1e1e1e] last:border-r-0 last:border-b-0"
        >
          <div className="text-[0.65rem] tracking-[0.16em] text-muted uppercase mb-2.5 flex items-center gap-2">
            <span className="text-[#ff3300]">//</span> {s.pre}
          </div>
          <div className="font-bebas text-[4.5rem] leading-none text-white">
            {s.num}
            <span className="text-[#ff3300]">{s.suff}</span>
          </div>
          <div className="text-[0.68rem] tracking-[0.12em] uppercase text-muted mt-1">
            {s.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
