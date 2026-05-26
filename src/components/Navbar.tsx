"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-8 py-4 w-[95%] max-w-[1200px] rounded-full border transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a0a]/70 border-white/8 backdrop-blur-xl"
          : "bg-transparent border-transparent"
      }`}
    >
      <a
        className="font-bebas text-lg md:text-2xl tracking-[0.12em] text-white no-underline cursor-none"
        href="/"
        aria-label="Mint Media House"
      >
        MINT<span className="text-[#ff3300]">MEDIA</span>HOUSE
      </a>

      <div className="hidden md:flex items-center gap-8 text-[0.65rem] tracking-[0.2em] uppercase text-[#555]">
        {[
          { label: "Work", href: "#work" },
          { label: "Book a Call", href: "#book" },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="transition-colors duration-200 hover:text-[#ff3300] no-underline"
          >
            {item.label}
          </a>
        ))}
      </div>

      <a
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[0.65rem] tracking-[0.16em] uppercase font-medium transition-all duration-300 cursor-none hover:scale-105"
        href="#book"
        style={{
          background: "linear-gradient(135deg, #ff3300, #ff6600)",
          boxShadow: "0 0 20px rgba(255,51,0,0.25)",
        }}
      >
        Book a Call
      </a>
    </nav>
  );
}
