"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Quote() {
  const [btnText, setBtnText] = useState("SEND QUOTE REQUEST →");
  const [isSent, setIsSent] = useState(false);

  const handleQuote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSent(true);
    setBtnText("✓ SENT — WE'LL REPLY WITHIN 24H");
    
    setTimeout(() => {
      setBtnText("SEND QUOTE REQUEST →");
      setIsSent(false);
      (e.target as HTMLFormElement).reset();
    }, 4500);
  };

  return (
    <section id="quote" className="bg-[#111111] py-[110px] px-[5vw]">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.65 }}
        className="text-center max-w-[600px] mx-auto"
      >
        <div className="text-[0.65rem] tracking-[0.2em] uppercase text-muted mb-5 flex items-center justify-center gap-2">
          <span className="text-[#ff3300]">//</span> Get a Quote
        </div>
        <h2 className="font-bebas text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[0.04em] text-white">
          LET'S BUILD<br />
          SOMETHING <em className="not-italic text-[#ff3300]">GREAT</em>
        </h2>
        <p className="text-[#888888] text-[0.88rem] mt-4 font-light">
          Tell us about your project — we'll reply within 24 hours with a custom proposal.
        </p>
      </motion.div>

      <div className="max-w-[820px] mx-auto mt-12">
        <motion.form
          onSubmit={handleQuote}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#1e1e1e]"
        >
          <div className="flex flex-col gap-2 py-6 px-8 bg-[#111111]">
            <label className="text-[0.62rem] tracking-[0.16em] uppercase text-muted">Your Name</label>
            <input type="text" placeholder="Alex Johnson" required className="bg-transparent border-b border-[#2a2a2a] py-2.5 text-white font-inter text-[0.9rem] font-light outline-none transition-colors duration-200 focus:border-white placeholder:text-[#555] cursor-none" />
          </div>
          <div className="flex flex-col gap-2 py-6 px-8 bg-[#111111]">
            <label className="text-[0.62rem] tracking-[0.16em] uppercase text-muted">Email Address</label>
            <input type="email" placeholder="alex@company.com" required className="bg-transparent border-b border-[#2a2a2a] py-2.5 text-white font-inter text-[0.9rem] font-light outline-none transition-colors duration-200 focus:border-white placeholder:text-[#555] cursor-none" />
          </div>
          <div className="flex flex-col gap-2 py-6 px-8 bg-[#111111]">
            <label className="text-[0.62rem] tracking-[0.16em] uppercase text-muted">Company / Brand</label>
            <input type="text" placeholder="Your Brand" className="bg-transparent border-b border-[#2a2a2a] py-2.5 text-white font-inter text-[0.9rem] font-light outline-none transition-colors duration-200 focus:border-white placeholder:text-[#555] cursor-none" />
          </div>
          <div className="flex flex-col gap-2 py-6 px-8 bg-[#111111]">
            <label className="text-[0.62rem] tracking-[0.16em] uppercase text-muted">Service Needed</label>
            <select className="bg-transparent border-b border-[#2a2a2a] py-2.5 text-white font-inter text-[0.9rem] font-light outline-none transition-colors duration-200 focus:border-white cursor-none [&>option]:bg-[#111111]">
              <option>UI Animations</option>
              <option>Launch Video</option>
              <option>Personal Growth Content</option>
              <option>Social Media Package</option>
              <option>Ad Creatives</option>
              <option>Full Retainer</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 py-6 px-8 bg-[#111111]">
            <label className="text-[0.62rem] tracking-[0.16em] uppercase text-muted">Budget Range</label>
            <select className="bg-transparent border-b border-[#2a2a2a] py-2.5 text-white font-inter text-[0.9rem] font-light outline-none transition-colors duration-200 focus:border-white cursor-none [&>option]:bg-[#111111]">
              <option>₹25,000 – ₹50,000</option>
              <option>₹50,000 – ₹1,00,000</option>
              <option>₹1,00,000 – ₹2,50,000</option>
              <option>₹2,50,000+</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 py-6 px-8 bg-[#111111]">
            <label className="text-[0.62rem] tracking-[0.16em] uppercase text-muted">Timeline</label>
            <select className="bg-transparent border-b border-[#2a2a2a] py-2.5 text-white font-inter text-[0.9rem] font-light outline-none transition-colors duration-200 focus:border-white cursor-none [&>option]:bg-[#111111]">
              <option>ASAP (rush)</option>
              <option>1–2 weeks</option>
              <option>1 month</option>
              <option>Ongoing retainer</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 py-6 px-8 bg-[#111111] md:col-span-2">
            <label className="text-[0.62rem] tracking-[0.16em] uppercase text-muted">Tell Us About Your Project</label>
            <textarea placeholder="Describe your goals, audience, and what success looks like…" className="bg-transparent border-b border-[#2a2a2a] py-2.5 text-white font-inter text-[0.9rem] font-light outline-none transition-colors duration-200 focus:border-white placeholder:text-[#555] cursor-none resize-y min-h-[100px]"></textarea>
          </div>
          <div className="md:col-span-2 py-8 px-8 bg-[#111111] border-t border-[#1e1e1e] flex justify-center">
            <button
              type="submit"
              disabled={isSent}
              className={`px-[52px] py-4 rounded-full font-inter text-[0.72rem] tracking-[0.16em] uppercase font-medium cursor-none transition-all duration-200 hover:scale-[1.03] ${
                isSent
                  ? 'bg-[#222] border border-[#333] text-white'
                  : 'bg-[#ff3300] border border-[#ff3300] text-white hover:bg-[#e82d00]'
              }`}
            >
              {btnText}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
