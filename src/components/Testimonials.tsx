"use client";

import { motion } from "framer-motion";

export default function Testimonials() {
  const testis = [
    { i: 'AK', name: 'Arjun Kapoor', role: 'Founder, Flowdesk SaaS', text: '"MintMediaHouse completely transformed how our product is perceived. The UI animations increased our demo-to-close rate by 40% in just two months."' },
    { i: 'PS', name: 'Priya Shah', role: 'CEO, Luminary Wellness', text: '"Our product launch video hit 2M views organically. The Mint team understood our vision immediately and delivered beyond what we even imagined."' },
    { i: 'RN', name: 'Rohan Naik', role: 'Business Coach & Speaker', text: '"I went from 500 to 50K followers in 3 months with their personal branding series. Genuinely game-changing for my entire coaching business."' },
    { i: 'MV', name: 'Meera Verma', role: 'CMO, HealthStack App', text: '"The ad creatives Mint built cut our CPL in half. They\'re not just a video agency — they\'re performance marketers who truly understand creative."' },
  ];

  return (
    <section id="testimonials" className="bg-[#111111] py-[110px] px-[5vw]">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.65 }}
        className="text-center mb-4"
      >
        <div className="text-[0.65rem] tracking-[0.2em] uppercase text-muted mb-5 flex items-center justify-center gap-2">
          <span className="text-[#ff3300]">//</span> Testimonials
        </div>
        <h2 className="font-bebas text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[0.04em] text-white">
          TRUSTED BY <em className="not-italic text-[#ff3300]">CLIENTS</em>
        </h2>
        <p className="text-[#888888] text-[0.85rem] mt-3 font-light">
          Your satisfaction is our reputation — see what clients say
        </p>

        <div className="flex justify-center my-10 mb-14">
          <div className="relative w-[180px] h-[180px] flex items-center justify-center">
            <motion.svg
              viewBox="0 0 180 180"
              width="180"
              height="180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute"
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            >
              <path id="tp" d="M 90 90 m -68 0 a 68 68 0 1 1 136 0 a 68 68 0 1 1 -136 0" fill="none" />
              <text fontFamily="Inter,sans-serif" fontSize="10.5" fill="#ff3300" letterSpacing="9">
                <textPath href="#tp">TESTIMONIAL · TRUSTED BY CLIENTS · </textPath>
              </text>
            </motion.svg>
            <div className="text-5xl text-[#ff3300] font-sans leading-none relative z-10 pt-4">
              "
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.65, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#1e1e1e]"
      >
        {testis.map((t, i) => (
          <div
            key={i}
            className="bg-[#111111] p-9 md:p-11 cursor-none transition-colors duration-300 hover:bg-[#161616] relative overflow-hidden"
          >
            <div className="absolute top-6 right-8 text-[5rem] text-[#ff3300]/[0.08] font-bebas leading-none pointer-events-none">
              "
            </div>
            <p className="text-[0.92rem] text-[#cccccc] leading-[1.8] italic font-light mb-6 relative z-10">
              {t.text}
            </p>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-[#161616] border border-[#2a2a2a] flex items-center justify-center text-[0.72rem] font-semibold text-white shrink-0">
                {t.i}
              </div>
              <div>
                <h5 className="font-semibold text-[0.85rem] text-white">{t.name}</h5>
                <p className="text-[0.72rem] text-muted">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
