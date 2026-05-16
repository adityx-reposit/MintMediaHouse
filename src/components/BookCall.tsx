"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Video } from "lucide-react";

const TIME_SLOTS = [
  { id: "10:00", label: "10:00 AM" },
  { id: "11:00", label: "11:00 AM" },
  { id: "14:00", label: "2:00 PM" },
  { id: "15:00", label: "3:00 PM" },
  { id: "16:00", label: "4:00 PM" },
];

function getTomorrowStr(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function formatDateDisplay(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

export default function BookCall() {
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", note: "" });
  const [submitted, setSubmitted] = useState(false);
  const [meetLink, setMeetLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !timeSlot || !formData.name || !formData.email) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, timeSlot, ...formData }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");
      setMeetLink(data.meetLink || "");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isFormComplete = date && timeSlot && formData.name && formData.email;

  return (
    <>
      {/* ── BOOK SECTION ── */}
      <section id="book" className="bg-[#0a0a0a] py-[110px] px-[5vw]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.65 }}
          className="text-center mb-14"
        >
          <div className="text-[0.65rem] tracking-[0.2em] uppercase text-muted mb-5 flex items-center justify-center gap-2">
            <span className="text-[#ff3300]">//</span> Book a Call
          </div>
          <h2 className="font-bebas text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[0.04em] text-white">
            FREE <em className="not-italic text-[#ff3300]">DISCOVERY</em>
            <br />
            SESSION
          </h2>
          <p className="text-[0.9rem] text-[#888888] mt-4 max-w-[520px] mx-auto leading-relaxed font-light">
            Pick a time that works — 30 minutes, zero pressure. We'll map out exactly how Mint Media House can grow your brand. Instant Google Meet confirmation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="max-w-[640px] mx-auto"
        >
          <AnimatePresence mode="wait">
            {/* ── SUCCESS STATE ── */}
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4 }}
                className="text-center py-16 bg-[#111111] border border-[#1e1e1e] rounded-2xl relative overflow-hidden"
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
                  <Video size={32} className="text-white" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative z-10 px-8"
                >
                  <h3 className="font-bebas text-[2rem] tracking-[0.06em] text-white mb-2">
                    CALL CONFIRMED!
                  </h3>
                  <p className="text-[0.88rem] text-[#888] leading-relaxed mb-6">
                    {formatDateDisplay(date)} at{" "}
                    {TIME_SLOTS.find((s) => s.id === timeSlot)?.label} IST
                    <br />
                    Check your inbox for the calendar invite.
                  </p>

                  {meetLink && (
                    <motion.a
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      href={meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-7 py-3 bg-[#ff3300] hover:bg-[#e82d00] text-white rounded-full text-[0.7rem] tracking-[0.14em] uppercase font-bold transition-colors shadow-[0_4px_20px_rgba(255,51,0,0.35)] cursor-none"
                    >
                      <Video size={14} />
                      Join Google Meet
                    </motion.a>
                  )}

                  <div className="mt-6 flex items-center justify-center gap-6 text-[0.65rem] tracking-[0.12em] uppercase text-[#555]">
                    <span className="flex items-center gap-1.5"><span className="text-[#ff3300]">✓</span> Calendar invite sent</span>
                    <span className="flex items-center gap-1.5"><span className="text-[#ff3300]">✓</span> Meet link ready</span>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              /* ── BOOKING FORM ── */
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-2xl p-8 space-y-8"
              >
                {/* STEP 1 — Date */}
                <div>
                  <p className="text-[0.62rem] tracking-[0.2em] uppercase text-[#888] mb-4 flex items-center gap-2">
                    <Calendar size={11} className="text-[#ff3300]" />
                    01 &nbsp;/&nbsp; Pick a date
                  </p>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={getTomorrowStr()}
                    required
                    className="w-full px-4 py-3 bg-[#252525] border border-[#2e2e2e] rounded-lg text-white text-[0.88rem] focus:outline-none focus:border-[#ff3300] focus:ring-1 focus:ring-[#ff3300]/40 transition-colors [color-scheme:dark]"
                  />
                  {date && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-[0.7rem] text-[#ff3300] tracking-[0.06em]"
                    >
                      {formatDateDisplay(date)}
                    </motion.p>
                  )}
                  <p className="mt-2 text-[0.62rem] text-[#555] tracking-[0.08em]">
                    Mon – Fri · All times in IST (Asia/Kolkata)
                  </p>
                </div>

                {/* STEP 2 — Time slot */}
                <div>
                  <p className="text-[0.62rem] tracking-[0.2em] uppercase text-[#888] mb-4 flex items-center gap-2">
                    <Clock size={11} className="text-[#ff3300]" />
                    02 &nbsp;/&nbsp; Choose a time slot
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <motion.button
                        key={slot.id}
                        type="button"
                        onClick={() => setTimeSlot(slot.id)}
                        whileTap={{ scale: 0.96 }}
                        className={`flex flex-col items-center gap-0.5 py-3 px-1 rounded-lg border text-center transition-all duration-200 ${
                          timeSlot === slot.id
                            ? "border-[#ff3300] bg-[#ff3300]/8 text-white shadow-[0_0_16px_rgba(255,51,0,0.15)]"
                            : "border-[#2e2e2e] bg-[#222] text-[#aaa] hover:border-[#444] hover:text-[#ddd]"
                        }`}
                      >
                        <span className="text-[0.78rem] font-semibold">{slot.label}</span>
                        <span className={`text-[0.55rem] tracking-[0.08em] uppercase ${timeSlot === slot.id ? "text-[#ff3300]" : "text-[#555]"}`}>
                          IST
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* STEP 3 — Contact */}
                <div>
                  <p className="text-[0.62rem] tracking-[0.2em] uppercase text-[#888] mb-4">
                    03 &nbsp;/&nbsp; Your details
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label htmlFor="bc-name" className="block text-[0.68rem] tracking-[0.1em] uppercase text-[#888] mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="bc-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Alex Johnson"
                        className="w-full px-4 py-3 bg-[#252525] border border-[#2e2e2e] rounded-lg text-white text-[0.88rem] placeholder-[#555] focus:outline-none focus:border-[#ff3300] focus:ring-1 focus:ring-[#ff3300]/40 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="bc-email" className="block text-[0.68rem] tracking-[0.1em] uppercase text-[#888] mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        id="bc-email"
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
                    <label htmlFor="bc-note" className="block text-[0.68rem] tracking-[0.1em] uppercase text-[#888] mb-1.5">
                      Anything to share? <span className="normal-case text-[#333]">(optional)</span>
                    </label>
                    <textarea
                      id="bc-note"
                      name="note"
                      value={formData.note}
                      onChange={handleChange}
                      placeholder="Your product, goals, current challenges..."
                      rows={2}
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
                      {error} —{" "}
                      <button type="button" className="underline" onClick={() => setError("")}>
                        try again
                      </button>
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading || !isFormComplete}
                  whileHover={!loading && isFormComplete ? { scale: 1.01 } : {}}
                  whileTap={!loading && isFormComplete ? { scale: 0.99 } : {}}
                  className={`w-full py-4 rounded-xl text-[0.72rem] tracking-[0.16em] uppercase font-bold flex items-center justify-center gap-3 transition-all duration-300 ${
                    !isFormComplete
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
                      Booking your call...
                    </>
                  ) : (
                    <>
                      <Video size={14} />
                      Book Discovery Call
                      <motion.span
                        animate={isFormComplete ? { x: [0, 4, 0] } : {}}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        →
                      </motion.span>
                    </>
                  )}
                </motion.button>

                {/* Trust line */}
                <div className="pt-2 border-t border-[#2e2e2e] flex items-center justify-center gap-5 text-[0.65rem] tracking-[0.1em] uppercase text-[#777]">
                  <span><span className="text-[#ff3300]">✓</span> Free 30-min call</span>
                  <span><span className="text-[#ff3300]">✓</span> Google Meet link</span>
                  <span><span className="text-[#ff3300]">✓</span> Zero commitment</span>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ── CTA SECTION ── */}
      <section id="cta" className="bg-[#111111] text-center py-[130px] px-[5vw]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.65 }}
        >
          <motion.div
            className="text-[2.5rem] mb-8 inline-block"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            ⊕
          </motion.div>
          <div className="font-bebas text-[clamp(3.5rem,9vw,10rem)] leading-[0.9] tracking-[0.03em] text-white">
            READY TO
            <br />
            COLLABORATE?
          </div>
          <p className="text-[0.95rem] text-[#888888] my-6 mx-auto max-w-[420px] font-light">
            Have a project in mind? Let's create something extraordinary together.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <a
              className="px-8 py-3.5 border border-white rounded-full text-white text-[0.7rem] tracking-[0.14em] uppercase font-medium transition-colors duration-200 hover:bg-white hover:text-black cursor-none"
              href="#quote"
            >
              GET A QUOTE
            </a>
            <a
              className="px-8 py-3.5 border border-[#ff3300] bg-[#ff3300] rounded-full text-white text-[0.7rem] tracking-[0.14em] uppercase font-medium transition-colors duration-200 hover:bg-[#e82d00] cursor-none"
              href="#book"
            >
              BOOK A CALL
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
