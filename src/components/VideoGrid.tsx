"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type VideoItem = {
  src: string;
  category: string;
  title: string;
  testimonial: { quote: string; author: string; role: string } | null;
  aspect: string;
};

const PAIRS: Array<{ ratio: string; left: VideoItem; right: VideoItem }> = [
  {
    ratio: "60fr 40fr",
    left:  { src: "/videos/ui-1.mp4",       category: "UI ANIMATION",  title: "Interface as Identity",    aspect: "3/4",  testimonial: { quote: "The motion work made our product feel 10x more premium.", author: "Haroon Choudery", role: "Founder, Blackbox AI" } },
    right: { src: "/videos/launch-1.mp4",   category: "LAUNCH VIDEO",  title: "From Zero to Viral",       aspect: "4/5",  testimonial: null },
  },
  {
    ratio: "38fr 62fr",
    left:  { src: "/videos/ui-2.mp4",       category: "UI ANIMATION",  title: "Pixel-Perfect Motion",     aspect: "4/5",  testimonial: null },
    right: { src: "/videos/launch-2.mp4",   category: "LAUNCH VIDEO",  title: "Revenue-Driving Reels",    aspect: "3/4",  testimonial: { quote: "Our demo video brought 3 enterprise deals in one week.", author: "Hasan Toor", role: "Creator & Founder" } },
  },
  {
    ratio: "55fr 45fr",
    left:  { src: "/videos/new video.mp4",  category: "UI ANIMATION",  title: "Motion that Sells",        aspect: "9/10", testimonial: null },
    right: { src: "/videos/video2.mp4",     category: "UI ANIMATION",  title: "Scroll-Stopping Design",   aspect: "3/4",  testimonial: { quote: "ROAS tripled after switching to Mint's creatives.", author: "Siddharth K.", role: "Growth Lead, PlayAI" } },
  },
  {
    ratio: "43fr 57fr",
    left:  { src: "/videos/video5.mp4",     category: "UI ANIMATION",  title: "Interaction Design",       aspect: "4/5",  testimonial: null },
    right: { src: "/videos/launch-3.mp4",   category: "LAUNCH VIDEO",  title: "Brand in Motion",          aspect: "3/4",  testimonial: null },
  },
];

const SOLO: VideoItem = {
  src: "/videos/video 4.mp4",
  category: "UI ANIMATION",
  title: "Scale with Story",
  aspect: "21/8",
  testimonial: null,
};

function VideoCard({
  item,
  index,
  onPlay,
}: {
  item: VideoItem;
  index: number;
  onPlay: (src: string) => void;
}) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    const vid = videoRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          vid?.play().catch(() => {});
        } else {
          if (vid) { vid.pause(); vid.currentTime = 0; }
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={() => onPlay(item.src)}
      className="group relative overflow-hidden rounded-xl md:rounded-2xl transition-all duration-700 cursor-pointer"
      style={{
        aspectRatio: item.aspect,
        background: "#0d0d0d",
        boxShadow: "0 16px 60px rgba(0,0,0,0.5)",
        transform: visible ? "scale(1)" : "scale(0.94)",
        opacity: visible ? 1 : 0.45,
        willChange: "transform, opacity",
      }}
    >
      <video
        ref={videoRef}
        src={item.src}
        muted loop playsInline preload="none"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.88 }}
      />

      <div className="absolute inset-0" style={{
        background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.06) 55%, transparent 100%)",
      }} />

      {/* Play button on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(255,51,0,0.9)",
            boxShadow: "0 0 32px rgba(255,51,0,0.5)",
          }}
        >
          <svg width="18" height="20" viewBox="0 0 18 20" fill="white">
            <path d="M2 1.5L16 10L2 18.5V1.5Z" />
          </svg>
        </div>
      </div>

      {/* Category */}
      <div className="absolute top-4 left-4">
        <span className="text-[0.5rem] tracking-[0.24em] uppercase font-inter px-2.5 py-1 rounded-full"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,51,0,0.2)", color: "#ff3300" }}>
          {item.category}
        </span>
      </div>

      {/* Index */}
      <div className="absolute top-4 right-4">
        <span className="text-[0.52rem] tracking-[0.18em] text-[#2a2a2a] font-inter">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
        <h3 className="font-bebas text-white leading-none mb-1"
          style={{ fontSize: "clamp(1.2rem, 2.4vw, 2.6rem)", letterSpacing: "0.04em" }}>
          {item.title}
        </h3>
        {item.testimonial && (
          <div className="mt-2 pt-2 border-t border-white/10 hidden sm:block">
            <p className="text-[0.63rem] text-[#bbb] font-inter leading-relaxed italic mb-1.5">
              &ldquo;{item.testimonial.quote}&rdquo;
            </p>
            <div className="flex items-center gap-2">
              <div className="w-[3px] h-3 rounded-full bg-[#ff3300] flex-shrink-0" />
              <span className="text-[0.56rem] text-[#666] font-inter">
                {item.testimonial.author} · {item.testimonial.role}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-[2px]"
        style={{ background: "linear-gradient(to bottom, transparent, #ff3300 50%, transparent)" }} />
    </div>
  );
}

function VideoPlayer({ src, onClose }: { src: string; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    videoRef.current?.play().catch(() => {});
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.95)" }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 1L13 13M13 1L1 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <motion.div
        initial={{ scale: 0.92 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.92 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-[90vw] max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={src}
          controls
          playsInline
          className="w-full rounded-xl"
          style={{
            maxHeight: "85vh",
            background: "#000",
            boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function VideoGrid() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <>
      <section className="px-[5vw] pt-8 pb-16 md:pb-24">
        <div className="flex items-end justify-between mb-10 md:mb-12">
          <p className="text-[0.54rem] tracking-[0.3em] uppercase text-[#2a2a2a] font-inter">Selected Work</p>
          <p className="text-[0.54rem] tracking-[0.2em] uppercase text-[#1e1e1e] font-inter">09 Projects</p>
        </div>

        <div className="flex flex-col gap-4 md:gap-5">
          {PAIRS.map((row, ri) => (
            <div
              key={ri}
              className="grid gap-4 md:gap-5"
              style={{ gridTemplateColumns: isMobile ? "1fr" : row.ratio }}
            >
              <VideoCard item={row.left}  index={ri * 2}     onPlay={setActiveVideo} />
              <VideoCard item={row.right} index={ri * 2 + 1} onPlay={setActiveVideo} />
            </div>
          ))}
          <VideoCard item={SOLO} index={8} onPlay={setActiveVideo} />
        </div>
      </section>

      <AnimatePresence>
        {activeVideo && (
          <VideoPlayer src={activeVideo} onClose={() => setActiveVideo(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
