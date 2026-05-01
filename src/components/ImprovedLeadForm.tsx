"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SERVICES = [
  {
    id: "launch-video",
    label: "Launch Video",
    icon: "▶",
    desc: "Cinematic product launch films",
  },
  {
    id: "ui-animation",
    label: "UI Animation",
    icon: "✦",
    desc: "Micro-interactions & motion design",
  },
  {
    id: "ad-creative",
    label: "Ad Creative",
    icon: "◈",
    desc: "High-converting social video ads",
  },
];

const BUDGETS = [
  { id: "starter", label: "$300–$800", sub: "Starter" },
  { id: "growth", label: "$800–$2K", sub: "Growth" },
  { id: "pro", label: "$2K–$5K", sub: "Pro" },
  { id: "enterprise", label: "$5K+", sub: "Enterprise" },
];

export default function ImprovedLeadForm() {
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", note: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service) return;
    setLoading(true);
    setError("");

    // Validate form
    if (!formData.name || !formData.email) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    const selectedService = SERVICES.find((s) => s.id === service)?.label ?? service;
    const selectedBudget = BUDGETS.find((b) => b.id === budget)?.label ?? "Not specified";

    const message = `Service: ${selectedService}\nBudget: ${selectedBudget}${formData.note ? `\n\nNote: ${formData.note}` : ""}`;

    try {
      const res = await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Error: ${res.status}`);
      }

      setSubmitted(true);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Something went wrong. Please try again or contact us directly.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="quote" className="bg-[#111111] py-[110px] px-[5vw]">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.65 }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-[0.62rem] tracking-[0.22em] uppercase text-[#666] mb-4 flex items-center justify-center gap-2">
            <span className="text-[#ff3300]">//</span> Get Your Custom Quote
          </div>
          <h2 className="font-bebas text-[clamp(2.8rem,6vw,5rem)] leading-[0.93] tracking-[0.04em] text-white">
            Tell Us About<br />
            <em className="not-italic text-[#ff3300]">Your Project</em>
          </h2>
          <p className="text-[0.88rem] text-[#666] mt-4 leading-relaxed">
            We'll respond with a custom quote within 24 hours. No commitment needed.
          </p>
        </div>

        <AnimatePresence mode="wait">

          {/* ── SUCCESS STATE ── */}
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4 }}
              className="text-center py-20 bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl relative overflow-hidden"
            >
              {/* Pulsing rings */}
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0.6 }}
                  animate={{ scale: 3.5, opacity: 0 }}
                  transition={{ duration: 1.8, delay: i * 0.3, repeat: Infinity, ease: "easeOut" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-[#ff3300]"
                />
              ))}

              {/* Checkmark circle */}
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                className="relative z-10 w-20 h-20 rounded-full bg-[#ff3300] flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(255,51,0,0.4)]"
              >
                <motion.svg
                  viewBox="0 0 24 24"
                  className="w-10 h-10"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <motion.path
                    d="M5 13l4 4L19 7"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  />
                </motion.svg>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative z-10"
              >
                <h3 className="font-bebas text-[2rem] tracking-[0.06em] text-white mb-2">
                  REQUEST RECEIVED!
                </h3>
                <p className="text-[0.88rem] text-[#888] leading-relaxed">
                  We'll review your project and send a custom quote<br />to your inbox within 24 hours.
                </p>
                <div className="mt-8 flex items-center justify-center gap-6 text-[0.7rem] tracking-[0.12em] uppercase text-[#666]">
                  <span className="flex items-center gap-2"><span className="text-[#ff3300]">✓</span> Email confirmed</span>
                  <span className="flex items-center gap-2"><span className="text-[#ff3300]">✓</span> 24hr response</span>
                </div>
              </motion.div>
            </motion.div>

          ) : (

            /* ── FORM ── */
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-2xl p-8 space-y-8"
            >

              {/* STEP 1 — Service selection */}
              <div>
                <p className="text-[0.62rem] tracking-[0.2em] uppercase text-[#888] mb-4">
                  01 &nbsp;/&nbsp; What do you need?
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {SERVICES.map((s) => (
                    <motion.button
                      key={s.id}
                      type="button"
                      onClick={() => setService(s.id)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative flex flex-col items-center text-center gap-2 py-5 px-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                        service === s.id
                          ? "border-[#ff3300] bg-[#ff3300]/8 shadow-[0_0_20px_rgba(255,51,0,0.15)]"
                          : "border-[#2e2e2e] bg-[#222] hover:border-[#444]"
                      }`}
                    >
                      {service === s.id && (
                        <motion.div
                          layoutId="service-selected"
                          className="absolute inset-0 rounded-xl border border-[#ff3300] bg-[#ff3300]/5"
                          transition={{ type: "spring", stiffness: 300, damping: 28 }}
                        />
                      )}
                      <span className={`relative z-10 text-xl ${service === s.id ? "text-[#ff3300]" : "text-[#666]"}`}>
                        {s.icon}
                      </span>
                      <span className={`relative z-10 font-bebas text-[1rem] tracking-[0.06em] ${service === s.id ? "text-white" : "text-[#bbb]"}`}>
                        {s.label}
                      </span>
                      <span className={`relative z-10 text-[0.65rem] leading-tight ${service === s.id ? "text-[#ccc]" : "text-[#888]"}`}>
                        {s.desc}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* STEP 2 — Budget */}
              <div>
                <p className="text-[0.62rem] tracking-[0.2em] uppercase text-[#888] mb-4">
                  02 &nbsp;/&nbsp; What's your budget?
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {BUDGETS.map((b) => (
                    <motion.button
                      key={b.id}
                      type="button"
                      onClick={() => setBudget(b.id)}
                      whileTap={{ scale: 0.96 }}
                      className={`flex flex-col items-center gap-0.5 py-3 rounded-lg border text-center transition-all duration-200 ${
                        budget === b.id
                          ? "border-[#ff3300] bg-[#ff3300]/8 text-white"
                          : "border-[#2e2e2e] bg-[#222] text-[#aaa] hover:border-[#444] hover:text-[#ddd]"
                      }`}
                    >
                      <span className="text-[0.82rem] font-semibold">{b.label}</span>
                      <span className={`text-[0.6rem] tracking-[0.1em] uppercase ${budget === b.id ? "text-[#ff3300]" : "text-[#777]"}`}>
                        {b.sub}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* STEP 3 — Contact info */}
              <div>
                <p className="text-[0.62rem] tracking-[0.2em] uppercase text-[#888] mb-4">
                  03 &nbsp;/&nbsp; Your details
                </p>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label htmlFor="name" className="block text-[0.68rem] tracking-[0.1em] uppercase text-[#888] mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Alex Johnson"
                      className="w-full px-4 py-3 bg-[#252525] border border-[#2e2e2e] rounded-lg text-white text-[0.88rem] placeholder-[#555] focus:outline-none focus:border-[#ff3300] focus:ring-1 focus:ring-[#ff3300]/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[0.68rem] tracking-[0.1em] uppercase text-[#888] mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 bg-[#252525] border border-[#2e2e2e] rounded-lg text-white text-[0.88rem] placeholder-[#555] focus:outline-none focus:border-[#ff3300] focus:ring-1 focus:ring-[#ff3300]/40 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="note" className="block text-[0.68rem] tracking-[0.1em] uppercase text-[#888] mb-1.5">
                    Anything else? <span className="normal-case text-[#333]">(optional)</span>
                  </label>
                  <textarea
                    id="note"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    placeholder="Deadline, platform, reference links..."
                    rows={3}
                    className="w-full px-4 py-3 bg-[#252525] border border-[#2e2e2e] rounded-lg text-white text-[0.88rem] placeholder-[#555] focus:outline-none focus:border-[#ff3300] focus:ring-1 focus:ring-[#ff3300]/40 transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-400 text-[0.8rem] text-center -mt-2"
                  >
                    {error} — <button type="button" className="underline" onClick={() => setError("")}>try again</button>
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading || !service}
                whileHover={!loading && service ? { scale: 1.01 } : {}}
                whileTap={!loading && service ? { scale: 0.99 } : {}}
                className={`w-full py-4 rounded-xl text-[0.72rem] tracking-[0.16em] uppercase font-bold flex items-center justify-center gap-3 transition-all duration-300 ${
                  !service
                    ? "bg-[#252525] text-[#666] cursor-not-allowed border border-[#2e2e2e]"
                    : loading
                    ? "bg-[#ff3300]/70 text-white cursor-not-allowed"
                    : "bg-[#ff3300] hover:bg-[#e82d00] text-white shadow-[0_4px_24px_rgba(255,51,0,0.3)] hover:shadow-[0_4px_32px_rgba(255,51,0,0.45)]"
                }`}
              >
                {loading ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block"
                    />
                    Sending your request...
                  </>
                ) : (
                  <>
                    Get My Custom Quote
                    <motion.span
                      animate={service ? { x: [0, 4, 0] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      →
                    </motion.span>
                  </>
                )}
              </motion.button>

              {/* Trust line */}
              <div className="pt-2 border-t border-[#2e2e2e] flex items-center justify-center gap-5 text-[0.65rem] tracking-[0.1em] uppercase text-[#777]">
                <span><span className="text-[#ff3300]">✓</span> 24hr reply</span>
                <span><span className="text-[#ff3300]">✓</span> Zero pressure</span>
                <span><span className="text-[#ff3300]">✓</span> Custom pricing</span>
              </div>

            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
