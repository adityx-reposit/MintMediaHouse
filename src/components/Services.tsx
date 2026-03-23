"use client";

import { motion } from "framer-motion";

export default function Services() {
  const services = [
    { num: "01", name: "UI ANIMATIONS", desc: "Buttery micro-interactions and motion design that make your product feel alive. Lottie, CSS & WebGL delivered." },
    { num: "02", name: "LAUNCH VIDEOS", desc: "Cinematic product launches, explainer reels, and app demos built to convert from the very first frame." },
    { num: "03", name: "PERSONAL GROWTH", desc: "Founder brand films, authority reels, and course trailers that turn your expertise into an audience." },
    { num: "04", name: "SOCIAL CONTENT", desc: "Vertical-native short-form videos optimised for Instagram, TikTok, and LinkedIn that generate real reach." },
    { num: "05", name: "AD CREATIVES", desc: "Performance-first video ads tested for maximum CTR on Meta, YouTube, and Google Ads." },
    { num: "06", name: "PODCAST BRANDING", desc: "Animated intros, audiograms, and episode graphics giving your show a premium, recognisable identity." },
  ];

  return (
    <section id="services" className="bg-[#111111] py-[110px] px-[5vw]">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.65 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-end mb-16"
      >
        <div>
          <div className="text-[0.65rem] tracking-[0.2em] uppercase text-muted mb-5 flex items-center gap-3">
            <span className="text-[#ff3300]">//</span> What We Do
          </div>
          <h2 className="font-bebas text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[0.04em] text-white">
            CONTENT<br />THAT <em className="not-italic text-[#ff3300]">CONVERTS</em>
          </h2>
        </div>
        <p className="text-sm text-[#888888] font-light leading-[1.8]">
          From micro-interactions to cinematic launches — every frame we produce is engineered to stop the scroll and start the conversation.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.65, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 border border-[#1e1e1e]"
      >
        {services.map((svc, i) => (
          <div
            key={i}
            className="group relative px-8 py-10 border-b md:border-r border-[#1e1e1e] overflow-hidden transition-colors duration-300 hover:bg-[#141414] cursor-none [border-right-width:1px] [&:nth-child(3n)]:border-r-0 [&:nth-child(n+4)]:border-b-0"
          >
            {/* Hover internal border line effect */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff3300] scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />
            
            <div className="font-bebas text-[0.85rem] tracking-[0.12em] text-[#ff3300] mb-5">
              {svc.num} //
            </div>
            <div className="font-bebas text-[1.6rem] tracking-[0.06em] text-white mb-3">
              {svc.name}
            </div>
            <div className="text-[0.82rem] text-[#888888] leading-[1.75] font-light">
              {svc.desc}
            </div>

          </div>
        ))}
      </motion.div>
    </section>
  );
}
