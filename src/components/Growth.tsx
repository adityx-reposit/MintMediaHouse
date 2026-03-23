"use client";

import { motion } from "framer-motion";

export default function Growth() {
  const cards = [
    {
      num: "01",
      icon: "🧭",
      title: "BRAND STORY FILMS",
      text: "Deep-dive documentaries and founder story videos that humanise your brand and build an unshakeable community of loyal followers who believe in your mission and your vision for the future.",
      pill: "Storytelling",
      pillAc: true,
      tall: true,
    },
    {
      num: "02",
      icon: "📈",
      title: "AUTHORITY REELS",
      text: "Short-form content series positioning you as the go-to expert in your niche, growing your following every single week consistently.",
      pill: "Short-Form",
      pillAc: false,
      tall: false,
    },
    {
      num: "03",
      icon: "🎓",
      title: "COURSE TRAILERS",
      text: "High-converting course and coaching program trailers that sell the transformation before the checkout page.",
      pill: "Education",
      pillAc: false,
      tall: false,
    },
  ];

  return (
    <section id="growth" className="bg-[#0a0a0a] py-[110px] px-[5vw]">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.65 }}
      >
        <div className="text-[0.65rem] tracking-[0.2em] uppercase text-muted mb-5 flex items-center gap-3">
          <span className="text-[#ff3300]">//</span> Personal Growth
        </div>
        <h2 className="font-bebas text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[0.04em] text-white">
          BUILD YOUR<br />
          <em className="not-italic text-[#ff3300]">AUTHORITY</em>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.65, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#1e1e1e] mt-14"
      >
        {cards.map((c, i) => (
          <div
            key={i}
            className={`bg-[#111111] p-12 relative overflow-hidden cursor-none transition-colors duration-300 hover:bg-[#131313] ${
              c.tall ? "md:row-span-2 flex flex-col justify-end min-h-[520px]" : ""
            }`}
          >
            <div
              className={`absolute font-bebas leading-none text-white/[0.025] tracking-[-0.02em] pointer-events-none ${
                c.tall
                  ? "text-[14rem] bottom-[-1rem] right-[-1rem]"
                  : "text-[9rem] top-0 right-0"
              }`}
            >
              {c.num}
            </div>
            
            <div className="relative z-10">
              <div className="text-[2.2rem] mb-6">{c.icon}</div>
              <h3 className="font-bebas text-[2rem] tracking-[0.06em] text-white mb-3">
                {c.title}
              </h3>
              <p className="text-[0.88rem] text-[#888888] leading-[1.8] font-light">
                {c.text}
              </p>
              <div
                className={`inline-block mt-6 px-3.5 py-1 border rounded-full text-[0.62rem] tracking-[0.14em] uppercase ${
                  c.pillAc
                    ? "border-[#ff3300] text-[#ff3300]"
                    : "border-[#2a2a2a] text-muted"
                }`}
              >
                {c.pill}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
