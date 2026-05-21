"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";

// ── Topographic path sets (one per service card) ─────────────────────────────
// Each array is a list of SVG "d" strings — organic contour lines nested like
// a topographic map. They look white at rest and glow orange on hover.
const TOPO_PATHS: string[][] = [
  // Card 0 · Launch Videos — two mountain peaks
  [
    "M30,95 C38,58 72,38 112,50 C152,62 168,90 158,118 C148,146 118,160 88,150 C58,140 24,130 30,95",
    "M16,95 C26,48 66,24 112,38 C158,52 178,86 166,120 C154,154 114,172 80,158 C46,144 8,140 16,95",
    "M4,95 C16,40 60,12 112,28 C164,44 188,84 174,122 C160,160 112,182 72,166 C32,150 -6,148 4,95",
    "M52,93 C58,68 82,56 110,62 C138,68 150,90 142,112 C134,134 112,144 88,136 C64,128 47,116 52,93",
    "M70,92 C74,74 92,64 112,70 C132,76 140,94 134,112 C128,130 110,138 92,130 C74,122 67,108 70,92",
    "M196,82 C210,52 244,44 272,60 C300,76 308,108 290,128 C272,148 242,150 220,132 C200,116 184,110 196,82",
    "M183,80 C198,42 240,32 274,52 C308,72 318,112 296,136 C274,160 236,162 208,140 C182,120 170,116 183,80",
    "M170,78 C187,32 236,20 276,44 C316,68 328,114 302,142 C276,170 232,172 200,146 C168,120 155,122 170,78",
    "M215,84 C226,62 252,56 272,68 C292,80 296,108 278,122 C260,136 236,132 222,114 C210,98 206,104 215,84",
    "M232,86 C240,70 258,66 272,74 C286,82 288,104 274,116 C260,128 242,124 234,108 C227,95 226,100 232,86",
  ],
  // Card 1 · UI Animations — complex terrain, three peaks
  [
    "M42,88 C58,56 96,46 128,62 C160,78 164,112 144,132 C124,152 88,148 62,126 C38,106 28,118 42,88",
    "M26,86 C44,46 90,34 128,54 C166,74 172,116 148,140 C124,164 78,158 44,130 C12,104 10,124 26,86",
    "M12,84 C32,38 84,24 128,46 C172,68 180,118 152,146 C124,174 68,168 28,136 C-10,104 -4,128 12,84",
    "M62,90 C72,68 96,58 122,66 C148,74 156,98 142,116 C128,134 104,136 82,122 C62,110 54,110 62,90",
    "M78,92 C84,76 102,68 122,74 C142,80 146,100 134,114 C122,128 104,130 88,118 C73,108 73,106 78,92",
    "M210,78 C222,54 250,48 272,62 C294,76 298,104 280,120 C262,136 234,132 218,112 C204,95 200,100 210,78",
    "M196,76 C210,44 246,36 274,54 C302,72 308,106 286,126 C264,146 228,142 206,118 C186,96 184,106 196,76",
    "M182,74 C198,36 242,26 274,48 C306,70 314,110 288,134 C262,158 218,152 190,124 C164,98 168,110 182,74",
    "M226,80 C235,62 256,56 274,66 C292,76 294,100 278,112 C262,124 240,120 228,104 C217,90 218,96 226,80",
  ],
  // Card 2 · Ad Creatives — single dominant mountain, flowing ridges
  [
    "M55,92 C72,62 108,52 146,66 C184,80 192,114 174,138 C156,162 118,162 88,144 C60,128 40,120 55,92",
    "M38,90 C58,52 102,40 148,58 C194,76 204,118 182,146 C160,174 110,172 72,150 C34,128 20,126 38,90",
    "M22,88 C46,44 98,30 148,52 C198,74 210,122 184,154 C158,186 102,182 58,156 C14,130 0,130 22,88",
    "M8,86 C36,36 96,20 148,46 C200,72 216,126 186,162 C156,198 96,193 44,162 C-8,132 -18,134 8,86",
    "M72,94 C84,70 112,62 142,72 C172,82 178,108 162,126 C146,144 118,144 96,130 C75,117 62,115 72,94",
    "M88,96 C96,80 118,72 142,80 C166,88 168,110 154,124 C140,138 118,136 100,124 C83,114 81,110 88,96",
    "M240,82 C252,60 276,54 296,68 C316,82 316,108 298,122 C280,136 256,130 244,112 C233,96 230,102 240,82",
    "M226,80 C240,52 270,44 296,62 C322,80 324,112 302,130 C280,148 248,142 230,120 C214,100 214,106 226,80",
    "M258,84 C266,68 282,62 296,70 C310,78 312,100 300,112 C288,124 272,120 262,106 C254,94 251,98 258,84",
  ],
];

// ── Topographic glow pattern SVG ──────────────────────────────────────────────
function TopoPattern({
  paths,
  hovered,
  cardIdx,
}: {
  paths: string[];
  hovered: boolean;
  cardIdx: number;
}) {
  const id = `topo-glow-${cardIdx}`;
  return (
    <svg
      viewBox="0 0 360 160"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <filter id={id} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g style={{ filter: hovered ? `url(#${id})` : "none", transition: "filter 0.55s ease" }}>
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            strokeWidth={hovered ? 1.2 : 0.8}
            style={{
              stroke: hovered ? "#ff6600" : "rgba(255,255,255,0.18)",
              transition: "stroke 0.55s ease, stroke-width 0.55s ease",
            }}
          />
        ))}
      </g>
    </svg>
  );
}

// ── Service card with hover-tracked topo thumbnail ────────────────────────────
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
  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="group relative h-[420px] rounded-xl overflow-hidden border border-[#1e1e1e] hover:border-[#ff3300] transition-all duration-300 cursor-pointer text-left w-full"
    >
      {/* Ambient orange gradient that brightens on hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,80,0,0.18), transparent 70%)",
          opacity: hovered ? 1 : 0,
        }}
      />

      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20`} />
      <div className="relative h-full bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] p-8 flex flex-col">
        {/* Header */}
        <div className="mb-3">
          <div className="text-[0.75rem] tracking-[0.2em] uppercase text-[#ff3300] mb-3">
            {service.num} //
          </div>
          <h3 className="font-bebas text-[1.8rem] tracking-[0.06em] text-white">
            {service.name}
          </h3>
        </div>

        {/* ── Topographic thumbnail ── */}
        <div
          className="flex-1 my-4 rounded-lg overflow-hidden relative"
          style={{
            background: "rgba(0,0,0,0.55)",
            border: `1px solid ${hovered ? "rgba(255,100,0,0.3)" : "rgba(255,255,255,0.05)"}`,
            transition: "border-color 0.55s ease",
            boxShadow: hovered
              ? "0 0 32px rgba(255,80,0,0.18), inset 0 0 32px rgba(255,80,0,0.08)"
              : "none",
          }}
        >
          <TopoPattern paths={TOPO_PATHS[idx]} hovered={hovered} cardIdx={idx} />

          {/* Subtle centre glow dot */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              background:
                "radial-gradient(ellipse 50% 40% at 50% 55%, rgba(255,80,0,0.22), transparent 70%)",
              opacity: hovered ? 1 : 0,
            }}
          />
        </div>

        {/* Footer */}
        <div>
          <p className="text-[0.88rem] text-[#888888] line-clamp-2 mb-5">{service.shortDesc}</p>
          <div className="flex items-center gap-2 text-[0.75rem] tracking-[0.1em] uppercase text-[#ff3300] group-hover:gap-3 transition-all">
            <span>Explore</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>

        {/* Bottom red line sweep */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff3300] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
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
