"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const CLIENTS = [
  { src: "/blackbox-logo.png", alt: "Blackbox AI", ix: "-34vw", iy: "-18vh", dx: "-46vw", dy: "-28vh" },
  { src: "/playai.png",        alt: "PlayAI",       ix:  "32vw", iy:  "-8vh", dx:  "44vw", dy:  "4vh"  },
  { src: "/base-logo.png",     alt: "Base L2",      ix:  "-5vw", iy:  "26vh", dx: "-14vw", dy:  "36vh" },
];

const LOGO_W = "clamp(160px, 28vw, 360px)";

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const rawScale    = useTransform(scrollYProgress, [0, 0.9], [1, 5]);
  const scale       = useSpring(rawScale, { stiffness: 55, damping: 18 });
  const logoOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const logoY       = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  // Dark → white in first ~3 scroll frames
  const darkLogoOp  = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const whiteLogoOp = useTransform(scrollYProgress, [0, 0.06], [0, 1]);

  // Orange burst tied to white logo
  const glowOp      = useTransform(scrollYProgress, [0, 0.08, 0.48], [0, 1, 0]);

  // Tagline — gone in first 2-3 scroll frames
  const tagOp       = useTransform(scrollYProgress, [0, 0.04], [1, 0]);

  // Client logos
  const clientOp    = useTransform(scrollYProgress, [0, 0.12, 0.44, 0.62], [0, 1, 1, 0]);
  const xs = CLIENTS.map((c) => useTransform(scrollYProgress, [0, 0.65], [c.ix, c.dx]));
  const ys = CLIENTS.map((c) => useTransform(scrollYProgress, [0, 0.65], [c.iy, c.dy]));

  return (
    <section ref={containerRef} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

        {/* Static ambient bg */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 65% 50% at 50% 50%, rgba(255,60,0,0.06) 0%, transparent 70%)",
        }} />

        {/* Orange burst — synced with logo turning white */}
        <motion.div
          style={{ opacity: glowOp }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse 50% 42% at 50% 48%, rgba(255,80,0,0.3) 0%, rgba(255,51,0,0.08) 45%, transparent 70%)",
          }} />
        </motion.div>

        {/* Client logos — 1.5× bigger, hidden on mobile */}
        {CLIENTS.map((c, i) => (
          <motion.div
            key={c.alt}
            className="hidden md:block"
            style={{
              opacity: clientOp,
              x: xs[i],
              y: ys[i],
              position: "absolute",
              top: "50%",
              left: "50%",
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            <div
              className="rounded-2xl flex items-center justify-center px-10 py-7"
              style={{
                background: "rgba(14,14,14,0.92)",
                border: "1px solid rgba(255,255,255,0.09)",
                backdropFilter: "blur(14px)",
                boxShadow: "0 10px 50px rgba(0,0,0,0.65)",
              }}
            >
              <img
                src={c.src} alt={c.alt}
                loading="eager"
                style={{ height: "84px", width: "auto", objectFit: "contain", filter: "brightness(1.1) contrast(1.05)" }}
              />
            </div>
          </motion.div>
        ))}

        {/* Logo lockup */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ scale, opacity: logoOpacity, y: logoY }}
          className="relative z-10 flex flex-col items-center select-none"
        >
          {/* Logo layer wrapper — fixed size so both layers overlap */}
          <div
            className="relative flex items-center justify-center"
            style={{ width: LOGO_W, aspectRatio: "100 / 50" }}
          >
            {/* Dark logo — initial state, fades out on first scroll */}
            <motion.img
              src="/logo/logo.png"
              alt="Mint Media House"
              style={{
                width: "100%", height: "auto", objectFit: "contain",
                position: "absolute", inset: 0,
                opacity: darkLogoOp,
                filter: "brightness(0.88)",
              }}
            />

            {/* White + orange-glow logo — fades in on first scroll */}
            <motion.div
              style={{ opacity: whiteLogoOp, position: "absolute", inset: 0 }}
            >
              {/* Halo behind white logo */}
              <div style={{
                position: "absolute",
                inset: "-50%",
                background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,70,0,0.28) 0%, transparent 65%)",
                filter: "blur(30px)",
                pointerEvents: "none",
              }} />
              <img
                src="/logo/logo.png"
                alt=""
                aria-hidden="true"
                style={{
                  width: "100%", height: "auto", objectFit: "contain",
                  position: "relative", zIndex: 1,
                  filter: "brightness(0) invert(1) drop-shadow(0 0 28px rgba(255,100,0,0.9)) drop-shadow(0 0 10px rgba(255,200,80,0.65))",
                }}
              />
            </motion.div>
          </div>

          {/* Tagline — disappears in first 2-3 scroll frames */}
          <motion.p
            style={{ opacity: tagOp }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="mt-7 text-[0.66rem] tracking-[0.26em] uppercase text-[#3a3a3a] font-inter text-center"
          >
            UI Animation · Launch Videos · Motion Design
          </motion.p>
        </motion.div>

        {/* Hero copy — bottom-left, visible when logo is black, fades on first scroll */}
        <motion.div
          style={{ opacity: tagOp }}
          className="absolute bottom-[10vh] left-[5vw] pointer-events-none hidden sm:block"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
          <h1
            className="font-bebas leading-[0.88] text-white"
            style={{ fontSize: "clamp(2rem, 4.5vw, 4.8rem)", letterSpacing: "0.03em" }}
          >
            VIDEOS<br />
            THAT<br />
            <span style={{ color: "#ff3300" }}>CONVERT.</span>
          </h1>
          <p
            className="mt-3 font-inter text-[#555] leading-relaxed"
            style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.78rem)", maxWidth: "min(300px, 24vw)" }}
          >
            Mint Media House creates custom UI animations, launch videos &amp; personal brand content for SaaS founders. We&apos;ve helped 15+ startups generate millions of organic views and scale their revenue.
          </p>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: tagOp }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[0.5rem] tracking-[0.35em] uppercase text-[#2a2a2a]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-gradient-to-b from-[#ff3300] to-transparent"
          />
        </motion.div>

      </div>
    </section>
  );
}
