"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";

const CLIPS = [
  { start: 2,  end: 14, label: "Brand Films" },
  { start: 16, end: 28, label: "Social Content" },
  { start: 30, end: 42, label: "Product Launches" },
  { start: 45, end: 57, label: "Corporate Stories" },
];

export default function LaunchVideos() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(sectionRef, { margin: "-15%" });

  const [activeClip, setActiveClip] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [clipProgress, setClipProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isInView) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isInView]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = CLIPS[activeClip].start;
    if (isInView) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [activeClip, isInView]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const tick = () => {
      const clip = CLIPS[activeClip];
      const elapsed = video.currentTime - clip.start;
      const duration = clip.end - clip.start;
      setClipProgress(Math.min(elapsed / duration, 1));
      if (video.currentTime >= clip.end) {
        setActiveClip((prev) => (prev + 1) % CLIPS.length);
      }
    };
    video.addEventListener("timeupdate", tick);
    return () => video.removeEventListener("timeupdate", tick);
  }, [activeClip]);

  const goToClip = useCallback((i: number) => {
    setActiveClip(i);
    setClipProgress(0);
  }, []);

  return (
    <section
      id="launch"
      ref={sectionRef}
      className="bg-[#0d0d0d] py-[110px] px-[5vw] overflow-hidden"
    >
      <style>{`
        @keyframes eq-bounce {
          0%, 100% { transform: scaleY(0.15); opacity: 0.4; }
          50%       { transform: scaleY(1);    opacity: 1;   }
        }
        .eq-bar { transform-origin: bottom; animation: eq-bounce var(--dur) ease-in-out infinite; }
        .eq-bar.paused { animation: none; transform: scaleY(0.1); opacity: 0.2; }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <div className="text-[0.62rem] tracking-[0.22em] uppercase text-[#666] mb-4 flex items-center gap-3">
          <span className="text-[#ff3300]">//</span> Launch Videos
        </div>
        <h2 className="font-bebas text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.93] tracking-[0.04em] text-white">
          VIDEOS THAT<br />
          <em className="not-italic text-[#ff3300]">LAUNCH</em> IDEAS
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">

        {/* VIDEO PLAYER */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          {/* Glow — CSS animation, no framer loop */}
          {isPlaying && (
            <div className="absolute -inset-[2px] rounded-[2px] bg-[#ff3300] blur-[22px] z-0 pointer-events-none animate-pulse opacity-25" />
          )}

          <div className="relative aspect-video bg-black border border-[#1e1e1e] overflow-hidden z-10">
            <video
              ref={videoRef}
              src="/video-preview.mp4"
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:100%_3px] pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 to-transparent z-10 pointer-events-none" />

            {/* NOW PLAYING */}
            <div className="absolute top-4 left-5 z-20 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                {isPlaying && (
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#ff3300] opacity-70 animate-ping" />
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying ? "bg-[#ff3300]" : "bg-[#444]"}`} />
              </span>
              <span className="text-[0.6rem] tracking-[0.22em] uppercase text-white/70 font-medium">
                {isPlaying ? "Now Playing" : "Paused"}
              </span>
            </div>

            {/* EQ bars — pure CSS, no per-bar framer instances */}
            <div className="absolute top-3 right-5 flex items-end gap-[3px] h-8 z-20 pointer-events-none">
              {[0.57,0.43,0.70,0.52,0.80,0.38,0.65,0.48,0.75,0.42].map((frac, i) => (
                <div
                  key={i}
                  className={`eq-bar w-[2.5px] rounded-sm bg-[#ff3300]${isPlaying ? "" : " paused"}`}
                  style={{
                    height: `${Math.round(frac * 32)}px`,
                    "--dur": `${0.45 + (i % 5) * 0.12}s`,
                    animationDelay: `${i * 0.055}s`,
                  } as React.CSSProperties}
                />
              ))}
            </div>

            {/* BOTTOM: label + progress */}
            <div className="absolute bottom-0 left-0 right-0 z-20 px-5 pb-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeClip}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="text-[0.62rem] tracking-[0.18em] uppercase text-white/60 mb-2"
                >
                  {CLIPS[activeClip].label}
                </motion.div>
              </AnimatePresence>

              <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#ff3300] rounded-full origin-left transition-none"
                  style={{ width: `${clipProgress * 100}%` }}
                />
              </div>

              <div className="flex items-center gap-2 mt-3">
                {CLIPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToClip(i)}
                    className={`h-[3px] rounded-full transition-all duration-300 ${
                      i === activeClip ? "w-6 bg-[#ff3300]" : "w-3 bg-white/25 hover:bg-white/50"
                    }`}
                    aria-label={`Go to clip ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Thumbnail row — lightweight divs instead of video elements */}
          <div className="grid grid-cols-4 gap-2 mt-3">
            {CLIPS.map((clip, i) => (
              <button
                key={i}
                onClick={() => goToClip(i)}
                className={`relative aspect-video bg-[#161616] border overflow-hidden transition-all duration-300 ${
                  i === activeClip
                    ? "border-[#ff3300] shadow-[0_0_12px_rgba(255,51,0,0.35)]"
                    : "border-[#222] hover:border-[#444]"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-bebas text-[1.1rem] tracking-widest text-white/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className={`absolute bottom-1 left-1.5 text-[0.5rem] tracking-[0.15em] uppercase ${i === activeClip ? "text-[#ff3300]" : "text-white/40"}`}>
                  {clip.label.split(" ")[0]}
                </div>
                {i === activeClip && (
                  <div className="absolute inset-0 ring-1 ring-inset ring-[#ff3300]/60" />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* FEATURES LIST */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="flex flex-col justify-center"
        >
          {[
            { n: "01", t: "CINEMATIC QUALITY", d: "4K production with professional colour grading, motion graphics, and original sound design baked in from day one." },
            { n: "02", t: "FAST TURNAROUND", d: "First cut in 5 business days. Revisions are fast and unlimited on our monthly retainer plan." },
            { n: "03", t: "CONVERSION-OPTIMISED", d: "Scripts written by strategists, not just editors — every scene has a measurable objective and goal." },
            { n: "04", t: "REPURPOSING BUNDLE", d: "One hero video becomes 10+ social cuts, audiograms, and email assets — maximum ROI per shoot." },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.09 }}
              className="flex items-start gap-5 py-6 border-b border-[#1e1e1e] hover:pl-2 transition-all duration-300 first:border-t"
            >
              <div className="font-bebas text-[0.85rem] text-[#ff3300] tracking-[0.1em] shrink-0 pt-[2px] min-w-6">{f.n}</div>
              <div>
                <h4 className="font-bebas text-[1.1rem] tracking-[0.08em] text-white mb-1">{f.t}</h4>
                <p className="text-[0.82rem] text-[#888] font-light leading-[1.7]">{f.d}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
