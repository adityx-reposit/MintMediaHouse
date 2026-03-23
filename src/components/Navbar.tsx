"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // Clock
    const tick = () => {
      const n = new Date();
      setTime(
        n.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        })
      );
    };
    tick();
    const interval = setInterval(tick, 10000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
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
        href="#"
      >
        MINT<span className="text-[#ff3300]">MEDIA</span>HOUSE
      </a>
      
      <div className="hidden md:flex items-center gap-10 text-[0.7rem] tracking-[0.15em] uppercase">
        {["Services", "Work", "Videos", "Growth", "Book"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-muted no-underline transition-colors duration-200 hover:text-white"
          >
            {item}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex flex-col items-end text-[0.65rem] tracking-[0.1em] text-muted leading-tight">
          <span>MUMBAI, IN</span>
          <span>{time || "12:00 PM"}</span>
        </div>
        <a
          className="inline-block px-6 py-2.5 border border-white rounded-full text-white text-[0.7rem] tracking-[0.14em] uppercase font-medium transition-colors duration-200 hover:bg-white hover:text-black"
          href="#quote"
        >
          GET QUOTE
        </a>
      </div>
    </nav>
  );
}
