"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHANNELS = [
  { id: "instagram", label: "Instagram", icon: "📷" },
  { id: "x", label: "X", icon: "𝕏" },
  { id: "linkedin", label: "LinkedIn", icon: "💼" },
  { id: "all", label: "All", icon: "✦" },
];

const REACH = [
  { id: "above-100k", label: ">100k", sub: "Above 100k" },
  { id: "below-100k", label: "<100k", sub: "Below 100k" },
];

const FREQUENCY = [
  { id: "1-per-week", label: "1 / week", sub: "Steady" },
  { id: "3-per-week", label: "3 / week", sub: "Active" },
  { id: "5-per-week", label: "5 / week", sub: "Aggressive" },
];

export default function WaitlistForm() {
  const [channel, setChannel] = useState("");
  const [reach, setReach] = useState("");
  const [frequency, setFrequency] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!channel || !reach || !frequency) return;

    if (!formData.name || !formData.email) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/send-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel: CHANNELS.find((c) => c.id === channel)?.label ?? channel,
          reach: REACH.find((r) => r.id === reach)?.label ?? reach,
          frequency: FREQUENCY.find((f) => f.id === frequency)?.label ?? frequency,
          name: formData.name,
          email: formData.email,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isComplete = channel && reach && frequency && formData.name && formData.email;

  return (
    <section className="bg-[#111111] py-[110px] px-[5vw]">
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
            <span className="text-[#ff3300]">//</span> Self Growth Channel
          </div>
          <h1 className="font-bebas text-[clamp(2.8rem,6vw,5rem)] leading-[0.93] tracking-[0.04em] text-white">
            Join The
            <br />
            <em className="not-italic text-[#ff3300]">Waitlist</em>
          </h1>
          <p className="text-[0.88rem] text-[#666] mt-4 leading-relaxed max-w-md mx-auto">
            Create a premium self-growth personal brand with high-performing content strategies across social platforms.
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
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0.6 }}
                  animate={{ scale: 3.5, opacity: 0 }}
                  transition={{ duration: 1.8, delay: i * 0.3, repeat: Infinity, ease: "easeOut" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-[#ff3300]"
                />
              ))}

              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                className="relative z-10 w-20 h-20 rounded-full bg-[#ff3300] flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(255,51,0,0.4)]"
              >
                <motion.svg
                  viewBox="0 0 24 24"
                  className="w-10 h-10"
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
                  YOU&apos;RE ON THE LIST!
                </h3>
                <p className="text-[0.88rem] text-[#888] leading-relaxed">
                  We'll reach out as soon as spots open.
                  <br />
                  Check your inbox for confirmation.
                </p>
                <div className="mt-8 flex items-center justify-center gap-6 text-[0.7rem] tracking-[0.12em] uppercase text-[#666]">
                  <span className="flex items-center gap-2"><span className="text-[#ff3300]">✓</span> Email confirmed</span>
                  <span className="flex items-center gap-2"><span className="text-[#ff3300]">✓</span> Spot reserved</span>
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

              {/* STEP 1 — Channel */}
              <div>
                <p className="text-[0.62rem] tracking-[0.2em] uppercase text-[#888] mb-4">
                  01 &nbsp;/&nbsp; Which platform?
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {CHANNELS.map((c) => (
                    <motion.button
                      key={c.id}
                      type="button"
                      onClick={() => setChannel(c.id)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative flex flex-col items-center text-center gap-2 py-5 px-2 rounded-xl border transition-all duration-200 cursor-pointer ${
                        channel === c.id
                          ? "border-[#ff3300] bg-[#ff3300]/8 shadow-[0_0_20px_rgba(255,51,0,0.15)]"
                          : "border-[#2e2e2e] bg-[#222] hover:border-[#444]"
                      }`}
                    >
                      {channel === c.id && (
                        <motion.div
                          layoutId="channel-selected"
                          className="absolute inset-0 rounded-xl border border-[#ff3300] bg-[#ff3300]/5"
                          transition={{ type: "spring", stiffness: 300, damping: 28 }}
                        />
                      )}
                      <span className={`relative z-10 text-lg ${channel === c.id ? "text-[#ff3300]" : "text-[#666]"}`}>
                        {c.icon}
                      </span>
                      <span className={`relative z-10 font-bebas text-[0.95rem] tracking-[0.06em] ${channel === c.id ? "text-white" : "text-[#bbb]"}`}>
                        {c.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* STEP 2 — Minimum Reach */}
              <div>
                <p className="text-[0.62rem] tracking-[0.2em] uppercase text-[#888] mb-4">
                  02 &nbsp;/&nbsp; Minimum reach goal?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {REACH.map((r) => (
                    <motion.button
                      key={r.id}
                      type="button"
                      onClick={() => setReach(r.id)}
                      whileTap={{ scale: 0.97 }}
                      className={`flex flex-col items-center gap-1 py-4 rounded-xl border text-center transition-all duration-200 ${
                        reach === r.id
                          ? "border-[#ff3300] bg-[#ff3300]/8 text-white shadow-[0_0_20px_rgba(255,51,0,0.15)]"
                          : "border-[#2e2e2e] bg-[#222] text-[#aaa] hover:border-[#444] hover:text-[#ddd]"
                      }`}
                    >
                      <span className="font-bebas text-[1.4rem] tracking-[0.04em]">{r.label}</span>
                      <span className={`text-[0.6rem] tracking-[0.12em] uppercase ${reach === r.id ? "text-[#ff3300]" : "text-[#777]"}`}>
                        {r.sub}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* STEP 3 — Frequency */}
              <div>
                <p className="text-[0.62rem] tracking-[0.2em] uppercase text-[#888] mb-4">
                  03 &nbsp;/&nbsp; Content frequency?
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {FREQUENCY.map((f) => (
                    <motion.button
                      key={f.id}
                      type="button"
                      onClick={() => setFrequency(f.id)}
                      whileTap={{ scale: 0.97 }}
                      className={`flex flex-col items-center gap-1 py-4 rounded-xl border text-center transition-all duration-200 ${
                        frequency === f.id
                          ? "border-[#ff3300] bg-[#ff3300]/8 text-white shadow-[0_0_20px_rgba(255,51,0,0.15)]"
                          : "border-[#2e2e2e] bg-[#222] text-[#aaa] hover:border-[#444] hover:text-[#ddd]"
                      }`}
                    >
                      <span className="font-bebas text-[1.1rem] tracking-[0.04em]">{f.label}</span>
                      <span className={`text-[0.6rem] tracking-[0.12em] uppercase ${frequency === f.id ? "text-[#ff3300]" : "text-[#777]"}`}>
                        {f.sub}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* STEP 4 — Contact */}
              <div>
                <p className="text-[0.62rem] tracking-[0.2em] uppercase text-[#888] mb-4">
                  04 &nbsp;/&nbsp; Your details
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="wl-name" className="block text-[0.68rem] tracking-[0.1em] uppercase text-[#888] mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="wl-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Alex Johnson"
                      className="w-full px-4 py-3 bg-[#252525] border border-[#2e2e2e] rounded-lg text-white text-[0.88rem] placeholder-[#555] focus:outline-none focus:border-[#ff3300] focus:ring-1 focus:ring-[#ff3300]/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="wl-email" className="block text-[0.68rem] tracking-[0.1em] uppercase text-[#888] mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      id="wl-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 bg-[#252525] border border-[#2e2e2e] rounded-lg text-white text-[0.88rem] placeholder-[#555] focus:outline-none focus:border-[#ff3300] focus:ring-1 focus:ring-[#ff3300]/40 transition-colors"
                    />
                  </div>
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
                disabled={loading || !isComplete}
                whileHover={!loading && isComplete ? { scale: 1.01 } : {}}
                whileTap={!loading && isComplete ? { scale: 0.99 } : {}}
                className={`w-full py-4 rounded-xl text-[0.72rem] tracking-[0.16em] uppercase font-bold flex items-center justify-center gap-3 transition-all duration-300 ${
                  !isComplete
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
                    Joining the waitlist...
                  </>
                ) : (
                  <>
                    Join Waitlist
                    <motion.span
                      animate={isComplete ? { x: [0, 4, 0] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      →
                    </motion.span>
                  </>
                )}
              </motion.button>

              {/* Trust line */}
              <div className="pt-2 border-t border-[#2e2e2e] flex items-center justify-center gap-5 text-[0.65rem] tracking-[0.1em] uppercase text-[#777]">
                <span><span className="text-[#ff3300]">✓</span> No spam</span>
                <span><span className="text-[#ff3300]">✓</span> Early access</span>
                <span><span className="text-[#ff3300]">✓</span> Limited spots</span>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
