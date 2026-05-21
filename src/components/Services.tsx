"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";

// ── Per-service icon SVGs ─────────────────────────────────────────────────────
// Each returns an inline SVG path string. Rendered large, center-card.
const SERVICE_ICONS = [
  // 0 · Launch Videos — clapperboard
  (color: string) => (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="10" y="36" width="100" height="74" rx="6" stroke={color} strokeWidth="3.5" />
      <rect x="10" y="20" width="100" height="22" rx="4" stroke={color} strokeWidth="3.5" />
      <line x1="35" y1="20" x2="28" y2="42" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <line x1="58" y1="20" x2="51" y2="42" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <line x1="81" y1="20" x2="74" y2="42" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="60" cy="76" r="18" stroke={color} strokeWidth="3.5" />
      <polygon points="54,68 54,84 76,76" fill={color} />
    </svg>
  ),
  // 1 · UI Animations — cursor + sparkle
  (color: string) => (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M22 18 L22 82 L42 62 L56 96 L68 90 L54 56 L80 56 Z" stroke={color} strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" fill="none" />
      <circle cx="90" cy="28" r="4" fill={color} />
      <circle cx="98" cy="48" r="2.5" fill={color} />
      <circle cx="78" cy="16" r="2.5" fill={color} />
      <line x1="90" y1="16" x2="90" y2="12" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="90" y1="40" x2="90" y2="44" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="78" y1="28" x2="74" y2="28" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="102" y1="28" x2="106" y2="28" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="82" y1="20" x2="79" y2="17" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="98" y1="36" x2="101" y2="39" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="82" y1="36" x2="79" y2="39" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="98" y1="20" x2="101" y2="17" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  // 2 · Ad Creatives — megaphone / bullhorn
  (color: string) => (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M88 22 L40 46 L20 46 L20 74 L40 74 L88 98 Z" stroke={color} strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
      <line x1="40" y1="46" x2="40" y2="74" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M40 74 L40 96 L52 96 L52 74" stroke={color} strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M96 42 Q104 60 96 78" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M100 34 Q114 60 100 86" stroke={color} strokeWidth="3" strokeLinecap="round" strokeDasharray="4 3" />
    </svg>
  ),
];

// ── Service card — icon-based, orange glow on hover ──────────────────────────
function ServiceCard({
  service,
  idx,
  onClick,
}: {
  service: Service;
  idx: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const iconColor = hovered ? "#ff6600" : "rgba(255,255,255,0.25)";

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="group relative h-[400px] rounded-xl overflow-hidden cursor-pointer text-left w-full bg-[#0d0d0d]"
      style={{
        border: `1px solid ${hovered ? "rgba(255,100,0,0.45)" : "rgba(35,35,35,1)"}`,
        transition: "border-color 0.5s ease, box-shadow 0.5s ease",
        boxShadow: hovered
          ? "0 0 48px rgba(255,80,0,0.22), inset 0 0 60px rgba(255,60,0,0.06)"
          : "none",
      }}
    >
      {/* Orange radial bloom behind icon */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 52%, rgba(255,70,0,0.18), transparent 70%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full p-8 flex flex-col justify-between">
        {/* Top: number + title */}
        <div>
          <div className="text-[0.72rem] tracking-[0.22em] uppercase text-[#ff3300] mb-3">
            {service.num} //
          </div>
          <h3 className="font-bebas text-[2rem] tracking-[0.06em] text-white leading-none">
            {service.name}
          </h3>
        </div>

        {/* Center: large icon */}
        <div className="flex items-center justify-center flex-1 py-4">
          <div
            className="w-28 h-28"
            style={{
              filter: hovered
                ? "drop-shadow(0 0 18px rgba(255,100,0,0.9)) drop-shadow(0 0 36px rgba(255,60,0,0.5))"
                : "none",
              transition: "filter 0.5s ease, transform 0.5s ease",
              transform: hovered ? "scale(1.08)" : "scale(1)",
            }}
          >
            {SERVICE_ICONS[idx](iconColor)}
          </div>
        </div>

        {/* Bottom: desc + CTA */}
        <div>
          <p className="text-[0.86rem] text-[#777] line-clamp-2 mb-5 leading-relaxed">
            {service.shortDesc}
          </p>
          <div className="flex items-center gap-2 text-[0.72rem] tracking-[0.12em] uppercase text-[#ff3300] group-hover:gap-3 transition-all duration-300">
            <span>Explore</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </div>
        </div>
      </div>

      {/* Bottom sweep */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff3300] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.button>
  );
}



type ServiceVideo = {
  title: string;
  author: string;
  src: string;
  poster: string;
  tweetUrl: string;
};

type Service = {
  id: number;
  num: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  color: string;
  features: string[];
  videos: ServiceVideo[];
};

const services: Service[] = [
  {
    id: 0,
    num: "01",
    name: "LAUNCH VIDEOS",
    shortDesc: "Premium product launch videos designed to generate buzz and conversions",
    fullDesc:
      "Cinematic quality launch videos that average 60K+ views per video. Every frame is crafted to captivate your audience. 4K delivery with professional color grading, music, and sound design.",
    features: [
      "1 premium launch video",
      "4K quality delivery",
      "Average 60K+ views per video",
      "Multiple cuts included",
      "Music & sound design",
      "3 rounds of revisions",
    ],
    color: "from-orange-600 to-orange-500",
    videos: [
      {
        title: "PlayAI Network Launch",
        author: "@playAInetwork",
        src: "/videos/launch-1.mp4",
        poster: "/thumbnails/launch-1.svg",
        tweetUrl: "https://x.com/playAInetwork/status/1985679479017259182",
      },
      {
        title: "SolixDB Launch Campaign",
        author: "@solixdb",
        src: "/videos/launch-2.mp4",
        poster: "/thumbnails/launch-2.svg",
        tweetUrl: "https://x.com/solixdb/status/2011794480241000812",
      },
      {
        title: "GTE Launch Video",
        author: "@gte_xyz",
        src: "/videos/launch-3.mp4",
        poster: "/thumbnails/launch-3.svg",
        tweetUrl: "https://x.com/gte_xyz/status/1983177368605995108",
      },
    ],
  },
  {
    id: 1,
    num: "02",
    name: "UI ANIMATIONS",
    shortDesc: "10-15 custom micro-interactions that make users stop and engage",
    fullDesc:
      "Create stunning micro-interactions that reduce bounce rate by 30%+. Smooth, buttery animations that delight users at every interaction. Lottie files, CSS animations, and WebGL ready for production.",
    features: [
      "10-15 custom animations",
      "Lottie files (web & mobile)",
      "Reduces bounce rate 30%+",
      "Developer handoff docs",
      "2 rounds of revisions",
      "5-7 business days",
    ],
    color: "from-orange-600 to-orange-500",
    videos: [
      {
        title: "Buttery Scroll Interaction",
        author: "@_adityx_",
        src: "/videos/ui-1.mp4",
        poster: "/thumbnails/ui-1.jpg",
        tweetUrl: "https://x.com/_adityx_/status/2046978540743324090?s=20",
      },
      {
        title: "SaaS Dashboard Animation",
        author: "@_adityx_",
        src: "/videos/ui-2.mp4",
        poster: "/thumbnails/ui-2.jpg",
        tweetUrl: "https://x.com/_adityx_/status/2048325328943419791?s=20",
      },
      {
        title: "Product UI Motion Reel",
        author: "@_adityx_",
        src: "/videos/ui-3.mp4",
        poster: "/thumbnails/ui-3.jpg",
        tweetUrl: "https://x.com/_adityx_/status/2046783219362881975?s=20",
      },
    ],
  },
  {
    id: 2,
    num: "03",
    name: "AD CREATIVES",
    shortDesc: "Performance-optimized video ads with average 60K+ views",
    fullDesc:
      "Data-driven video ads engineered for maximum CTR and conversions. Native formats optimized for Meta, Google, and TikTok. Proven to increase campaign performance and ROI.",
    features: [
      "Performance-optimized",
      "2.1%+ conversion rates",
      "Meta, Google, TikTok native",
      "A/B test variants",
      "Full asset delivery",
      "Unlimited revisions",
    ],
    color: "from-orange-600 to-orange-500",
    videos: [
      {
        title: "Blackbox AI Ad Creative",
        author: "@_adityx_",
        src: "/videos/ad-1.mp4",
        poster: "/thumbnails/ad-1.svg",
        tweetUrl: "https://x.com/_adityx_/status/2008546933867245847",
      },
      {
        title: "Blackbox AI Campaign",
        author: "@_adityx_",
        src: "/videos/ad-2.mp4",
        poster: "/thumbnails/ad-2.svg",
        tweetUrl: "https://x.com/_adityx_/status/2000964886084596121",
      },
    ],
  },
];

/**
 * HoverVideo — shows a poster thumbnail, crossfades into a muted
 * looping video while hovered / focused / touched, then pauses and
 * rewinds on leave. Also auto-plays briefly when scrolled into view
 * inside its scroll container so the gallery feels alive.
 */
function HoverVideo({ video }: { video: ServiceVideo }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const start = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    const p = el.play();
    if (p && typeof p.then === "function") p.catch(() => {});
    setPlaying(true);
  }, []);

  const stop = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
    setPlaying(false);
  }, []);

  // Auto-play when scrolled into view within the modal's scroll container
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const wrap = el.parentElement;
    if (!wrap) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.55) start();
          else stop();
        }
      },
      { threshold: [0, 0.55, 1] }
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [start, stop]);

  return (
    <div
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
      tabIndex={0}
      className="group relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black/60 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#ff3300]/60"
    >
      {/* Poster */}
      <img
        src={video.poster}
        alt={video.title}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          playing ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Video */}
      <video
        ref={videoRef}
        src={video.src}
        muted
        loop
        playsInline
        preload="metadata"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          playing ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

      {/* Play-hint pill */}
      <div
        className={`absolute top-3 left-3 pointer-events-none transition-all duration-500 ${
          playing ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"
        }`}
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
          <Play size={10} className="text-white fill-white" />
          <span className="text-[0.55rem] tracking-[0.2em] uppercase text-white font-medium">
            Hover
          </span>
        </div>
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 inset-x-0 p-4 pointer-events-none">
        <p className="text-[0.85rem] font-medium text-white line-clamp-1">{video.title}</p>
        <p className="text-[0.7rem] text-white/70">{video.author}</p>
      </div>

      {/* Orange glow while playing */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          playing ? "opacity-100" : "opacity-0"
        }`}
        style={{ boxShadow: "inset 0 0 120px rgba(255, 51, 0, 0.28)" }}
      />
    </div>
  );
}

export default function Services() {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ESC to close
  useEffect(() => {
    if (selectedService === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedService(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedService]);

  // Prevent page scroll + stop Lenis smooth-scroll while modal is open
  useEffect(() => {
    if (selectedService === null) return;
    const prevOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    // Lenis exposes an instance on window via react-lenis
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    lenis?.stop?.();
    return () => {
      document.body.style.overflow = prevOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      lenis?.start?.();
    };
  }, [selectedService]);

  const active = selectedService !== null ? services[selectedService] : null;

  return (
    <section id="services" className="bg-[#111111] py-[110px] px-[5vw]">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.65 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-end mb-20">
          <div>
            <div className="text-[0.65rem] tracking-[0.2em] uppercase text-muted mb-5 flex items-center gap-3">
              <span className="text-[#ff3300]">//</span> What We Do
            </div>
            <h2 className="font-bebas text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[0.04em] text-white">
              CONTENT THAT <em className="not-italic text-[#ff3300]">CONVERTS</em>
            </h2>
          </div>
          <p className="text-sm text-[#888888] font-light leading-[1.8]">
            Three core services engineered to stop the scroll and start the conversation. Click any
            service to open an interactive preview.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {services.map((service, idx) => (
            <ServiceCard
              key={service.id}
              service={service}
              idx={idx}
              onClick={() => setSelectedService(idx)}
            />
          ))}
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {active !== null && mounted && (
          <motion.div
            key="services-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedService(null)}
            data-lenis-prevent
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={`${active.name} details`}
          >
            {/* Ambient glow */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(60% 50% at 50% 40%, rgba(255,51,0,0.18), transparent 70%)",
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d]/90 backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,0.6),0_0_60px_rgba(255,51,0,0.15)]"
            >
              {/* Gradient edge */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,51,0,0.12), transparent 30%, transparent 70%, rgba(255,51,0,0.08))",
                }}
              />

              {/* Close button */}
              <div className="absolute top-4 right-4 z-20">
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setSelectedService(null)}
                  aria-label="Close"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-colors"
                >
                  <X size={20} className="text-white" />
                </motion.button>
              </div>

              {/* Scrollable modal content — isolated from Lenis */}
              <div
                data-lenis-prevent
                className="relative flex-1 overflow-y-auto overscroll-contain scrollbar-hide p-6 md:p-10"
              >
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 }}
                  className="mb-8"
                >
                  <div className="text-[0.7rem] tracking-[0.2em] uppercase text-[#ff3300] mb-3">
                    {active.num} //
                  </div>
                  <h2 className="font-bebas text-[2.4rem] md:text-[3.4rem] leading-[0.95] tracking-[0.04em] text-white mb-4">
                    {active.name}
                  </h2>
                  <p className="text-sm md:text-[0.95rem] text-[#9a9a9a] max-w-2xl leading-[1.75]">
                    {active.fullDesc}
                  </p>
                </motion.div>

                {/* Video gallery — hover to play, auto-play when scrolled into view */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-10"
                >
                  <h3 className="font-bebas text-[1.3rem] tracking-[0.06em] text-white mb-5">
                    Real Examples
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {active.videos.map((video, idx) => (
                      <motion.a
                        key={idx}
                        href={video.tweetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 + idx * 0.08 }}
                        whileHover={{ y: -4 }}
                        className="block"
                      >
                        <HoverVideo video={video} />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-10"
                >
                  <h3 className="font-bebas text-[1.3rem] tracking-[0.06em] text-white mb-5">
                    What&apos;s Included
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {active.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + idx * 0.05 }}
                        className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] backdrop-blur-sm px-4 py-3"
                      >
                        <span className="text-[#ff3300] mt-0.5 flex-shrink-0">✓</span>
                        <span className="text-[0.88rem] text-[#cfcfcf]">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <a
                    href="#quote"
                    onClick={() => setSelectedService(null)}
                    className="flex-1 py-4 px-6 bg-[#ff3300] hover:bg-[#e82d00] text-white rounded-lg font-medium tracking-[0.1em] uppercase text-[0.75rem] transition-colors text-center shadow-[0_10px_40px_rgba(255,51,0,0.35)]"
                  >
                    Get {active.name} Quote
                  </a>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="px-6 py-4 border border-white/10 hover:border-[#ff3300] text-[#9a9a9a] hover:text-white rounded-lg font-medium tracking-[0.1em] uppercase text-[0.75rem] transition-colors"
                  >
                    Close
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
