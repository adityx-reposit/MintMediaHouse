"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-8 py-4 w-[95%] max-w-[1200px] rounded-full border transition-all duration-400 ${
        scrolled
          ? "bg-[#0a0a0a]/60 border-white/10 backdrop-blur-lg"
          : "bg-transparent border-transparent"
      }`}
    >
      <a
        className="font-bebas text-2xl tracking-[0.12em] text-white no-underline border-none cursor-none"
        href="/"
        aria-label="Mint Media House | MintMedia Website Home"
        title="Mint Media House"
      >
        MINT<span className="text-[#ff3300]">MEDIA</span>HOUSE
      </a>
      
      <div className="hidden md:flex items-center gap-8 text-[0.7rem] tracking-[0.15em] uppercase">
        {[
          { label: "Services", href: "#services" },
          { label: "Portfolio", href: "#work" },
          { label: "Packages", href: "#pricing" },
          { label: "FAQ", href: "#faq" },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-muted no-underline transition-colors duration-200 hover:text-[#ff3300]"
          >
            {item.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <a
          className="inline-block px-5 py-2.5 bg-[#ff3300] hover:bg-[#e82d00] rounded-full text-white text-[0.7rem] tracking-[0.14em] uppercase font-medium transition-colors duration-200"
          href="#quote"
        >
          Get Quote
        </a>
      </div>
    </nav>
  );
}
