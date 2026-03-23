"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function LaunchVideos() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Catch and ignore the play interruption error caused by React Strict Mode
      videoRef.current.play().catch(() => {});
    }
  }, []);
  return (
    <section id="launch" className="bg-[#111111] py-[110px] px-[5vw]">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.65 }}
      >
        <div className="text-[0.65rem] tracking-[0.2em] uppercase text-muted mb-5 flex items-center gap-3">
          <span className="text-[#ff3300]">//</span> Launch Videos
        </div>
        <h2 className="font-bebas text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[0.04em] text-white">
          VIDEOS THAT<br />
          <em className="not-italic text-[#ff3300]">LAUNCH</em> IDEAS
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center mt-14">
        {/* Video Box */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="aspect-[16/10] bg-[#161616] border border-[#1e1e1e] relative overflow-hidden flex items-center justify-center transform-gpu group cursor-pointer"
        >
          {/* Invisible overlay link that captures clicks */}
          <a 
            href="https://x.com/playAInetwork/status/1985679479017259182?s=20" 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute inset-0 z-20 block cursor-none"
          >
            <span className="sr-only">View Tweet</span>
          </a>

          {/* Native HTML Video Element */}
          <video 
            ref={videoRef}
            src="/video preview.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] z-0"
          />

          {/* Scanline pattern mask overlay for texture */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none mix-blend-overlay z-10"></div>
          
          {/* Animated EQ Bars */}
          <div className="absolute bottom-10 right-8 flex items-end gap-1 h-9 z-10 pointer-events-none">
            {[22, 14, 32, 18, 38, 12, 28, 20, 36, 16, 26, 10].map((h, i) => (
              <motion.div
                key={i}
                animate={{ height: ["4px", `${h}px`, "4px"], opacity: [0.3, 0.9, 0.3] }}
                transition={{
                  duration: 0.5 + Math.random() * 0.9,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.07,
                }}
                className="w-[3px] rounded-sm bg-[#ff3300] opacity-70"
              />
            ))}
          </div>

          <div className="absolute bottom-5 left-5 text-[0.62rem] tracking-[0.16em] uppercase text-white font-medium flex items-center gap-2 z-10 pointer-events-none bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
            <span className="text-[#ff3300]">▶</span> PREVIEW VIDEO
          </div>
        </motion.div>

        {/* Features list */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="flex flex-col"
        >
          {[
            { n: "01", t: "CINEMATIC QUALITY", d: "4K production with professional colour grading, motion graphics, and original sound design baked in from day one." },
            { n: "02", t: "FAST TURNAROUND", d: "First cut in 5 business days. Revisions are fast and unlimited on our monthly retainer plan." },
            { n: "03", t: "CONVERSION-OPTIMISED", d: "Scripts written by strategists, not just editors — every scene has a measurable objective and goal." },
            { n: "04", t: "REPURPOSING BUNDLE", d: "One hero video becomes 10+ social cuts, audiograms, and email assets — maximum ROI per shoot." },
          ].map((f, i) => (
            <div
              key={i}
              className="flex items-start gap-5 py-6 border-b border-[#1e1e1e] transition-all duration-300 hover:pl-2 first:border-t"
            >
              <div className="font-bebas text-[0.85rem] text-[#ff3300] tracking-[0.1em] shrink-0 pt-[2px] min-w-6">
                {f.n}
              </div>
              <div>
                <h4 className="font-bebas text-[1.1rem] tracking-[0.08em] text-white mb-1">{f.t}</h4>
                <p className="text-[0.82rem] text-[#888888] font-light leading-[1.7]">{f.d}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
