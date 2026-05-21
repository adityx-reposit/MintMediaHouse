"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Video, ArrowLeft } from "lucide-react";

// All 30-min slots across 24 h
const TIME_SLOTS: string[] = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2);
  const m = i % 2 === 0 ? "00" : "30";
  return `${String(h).padStart(2, "0")}:${m}`;
});

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function fmt12h(t: string) {
  const [h, m] = t.split(":").map(Number);
  const p = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m).padStart(2,"0")} ${p}`;
}

function toDateStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

type Step = "calendar" | "time" | "form" | "success";

export default function BookCall() {
  const today = new Date();
  today.setHours(0,0,0,0);

  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selDate,   setSelDate]   = useState<Date | null>(null);
  const [selTime,   setSelTime]   = useState<string | null>(null);
  const [step,      setStep]      = useState<Step>("calendar");
  const [form,      setForm]      = useState({ name: "", email: "", note: "" });
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [meetLink,  setMeetLink]  = useState("");

  const firstDay    = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const isAvail = (d: Date) => d >= today;

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const pickDate = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    if (!isAvail(d)) return;
    setSelDate(d);
    setSelTime(null);
    setStep("time");
  };

  const pickTime = (t: string) => { setSelTime(t); setStep("form"); };

  const goBack = () => {
    if (step === "form")      { setStep("time");     setSelTime(null); }
    else if (step === "time") { setStep("calendar"); setSelDate(null); }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selDate || !selTime) return;
    setLoading(true); setError("");
    try {
      const res  = await fetch("/api/book-call", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ date: toDateStr(selDate), time: selTime, ...form }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Booking failed");
      setMeetLink(data.meetLink);
      setStep("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-[#0a0a0a] border border-[#1e1e1e] rounded-lg px-4 py-3 text-white text-sm placeholder-[#333] focus:outline-none focus:border-[#ff3300] transition-colors";
  const labelCls =
    "block text-[0.6rem] tracking-[0.18em] uppercase text-[#555] mb-1.5";

  return (
    <section id="book" className="bg-[#0d0d0d] py-[110px] px-[5vw] border-t border-[#1e1e1e]">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-end mb-16"
        >
          <div>
            <div className="text-[0.65rem] tracking-[0.2em] uppercase text-[#666] mb-5 flex items-center gap-3">
              <span className="text-[#ff3300]">//</span> Schedule a Call
            </div>
            <h2 className="font-bebas text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[0.04em] text-white">
              BOOK A <em className="not-italic text-[#ff3300]">DISCOVERY</em> CALL
            </h2>
          </div>
          <p className="text-sm text-[#888] font-light leading-[1.8]">
            30 minutes. No sales pitch. Just a clear plan for your content strategy.
            Pick a time that works — we&apos;ll handle the rest.
          </p>
        </motion.div>

        {/* Cal.com-style card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-2xl border border-[#1e1e1e] overflow-hidden bg-[#111]"
        >
          <div className="flex flex-col md:flex-row min-h-[600px]">

            {/* ── Left panel ── */}
            <div className="md:w-[280px] flex-shrink-0 p-8 border-b md:border-b-0 md:border-r border-[#1e1e1e]">
              <div className="mb-5 w-14 h-10">
                <svg viewBox="0 0 100 68" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <rect x="4"  y="42" width="13" height="22" rx="2.5" fill="#EDEAE0"/>
                  <rect x="22" y="28" width="13" height="36" rx="2.5" fill="#EDEAE0"/>
                  <rect x="40" y="10" width="13" height="54" rx="2.5" fill="#EDEAE0"/>
                  <path d="M59 6 L100 34 L59 62 Z" fill="#3DD9B5"/>
                </svg>
              </div>
              <p className="text-[0.6rem] tracking-[0.22em] uppercase text-[#555] mb-1">Mint Media House</p>
              <h3 className="font-bebas text-xl tracking-wide text-white mb-6">Discovery Call</h3>

              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-[#777] text-sm">
                  <Clock size={13} className="text-[#ff3300] flex-shrink-0" />
                  <span>30 minutes</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#777] text-sm">
                  <Video size={13} className="text-[#ff3300] flex-shrink-0" />
                  <span>Google Meet</span>
                </div>
              </div>

              {selDate && (
                <div className="mt-7 pt-7 border-t border-[#1e1e1e]">
                  <p className="text-[0.58rem] tracking-[0.18em] uppercase text-[#444] mb-2">Selected</p>
                  <p className="text-white text-[0.82rem] font-medium leading-snug">
                    {selDate.toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                  </p>
                  {selTime && (
                    <p className="text-[#ff3300] text-[0.82rem] font-semibold mt-1">
                      {fmt12h(selTime)} <span className="text-[#444] font-normal">IST</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* ── Right panel ── */}
            <div className="flex-1 p-6 md:p-10">
              <AnimatePresence mode="wait">

                {/* ── Calendar ── */}
                {step === "calendar" && (
                  <motion.div
                    key="cal"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.22 }}
                  >
                    <h4 className="text-white font-semibold text-[0.9rem] mb-6">Select a Date</h4>

                    {/* Month nav */}
                    <div className="flex items-center justify-between mb-5">
                      <button
                        onClick={prevMonth}
                        className="p-1.5 rounded-lg hover:bg-white/5 text-[#555] hover:text-white transition-colors"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <span className="text-white text-sm font-medium">
                        {MONTHS[viewMonth]} {viewYear}
                      </span>
                      <button
                        onClick={nextMonth}
                        className="p-1.5 rounded-lg hover:bg-white/5 text-[#555] hover:text-white transition-colors"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>

                    {/* Day headers */}
                    <div className="grid grid-cols-7 mb-1">
                      {DAYS.map(d => (
                        <div key={d} className="text-center text-[0.6rem] tracking-widest uppercase text-[#3a3a3a] py-1.5">
                          {d}
                        </div>
                      ))}
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-7 gap-0.5">
                      {Array.from({ length: firstDay }).map((_, i) => <div key={`_${i}`} />)}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const d   = new Date(viewYear, viewMonth, day);
                        const avail   = isAvail(d);
                        const isToday = d.toDateString() === today.toDateString();
                        return (
                          <button
                            key={day}
                            onClick={() => pickDate(day)}
                            disabled={!avail}
                            className={[
                              "aspect-square rounded-lg text-[0.82rem] font-medium transition-all duration-150",
                              avail
                                ? "text-white hover:bg-[#ff3300] hover:text-white cursor-pointer"
                                : "text-[#2a2a2a] cursor-not-allowed",
                              isToday && avail  ? "ring-1 ring-[#ff3300] text-[#ff3300]" : "",
                              isToday && !avail ? "ring-1 ring-[#2a2a2a]" : "",
                            ].join(" ")}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>

                    <p className="mt-7 text-[0.6rem] tracking-wider text-[#333] uppercase">
                      Timezone · India Standard Time (IST)
                    </p>
                  </motion.div>
                )}

                {/* ── Time slots ── */}
                {step === "time" && (
                  <motion.div
                    key="time"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.22 }}
                  >
                    <button
                      onClick={goBack}
                      className="flex items-center gap-1.5 text-[#555] hover:text-white text-xs mb-6 transition-colors"
                    >
                      <ArrowLeft size={13} /> Back
                    </button>
                    <h4 className="text-white font-semibold text-[0.9rem] mb-1">
                      {selDate?.toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" })}
                    </h4>
                    <p className="text-[0.6rem] tracking-wider text-[#444] uppercase mb-6">
                      Pick a time · IST
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-72 overflow-y-auto pr-1 scrollbar-hide">
                      {TIME_SLOTS.map(t => (
                        <button
                          key={t}
                          onClick={() => pickTime(t)}
                          className="py-3 px-4 rounded-lg border border-[#1e1e1e] text-[#aaa] text-sm font-medium hover:border-[#ff3300] hover:text-white hover:bg-[#ff3300]/10 transition-all duration-150"
                        >
                          {fmt12h(t)}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ── Form ── */}
                {step === "form" && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.22 }}
                  >
                    <button
                      onClick={goBack}
                      className="flex items-center gap-1.5 text-[#555] hover:text-white text-xs mb-6 transition-colors"
                    >
                      <ArrowLeft size={13} /> Back
                    </button>
                    <h4 className="text-white font-semibold text-[0.9rem] mb-6">Your Details</h4>
                    <form onSubmit={submit} className="space-y-4 max-w-md">
                      <div>
                        <label className={labelCls}>Full Name *</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          placeholder="Jane Smith"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Email Address *</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          placeholder="jane@brand.com"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Note (optional)</label>
                        <textarea
                          rows={3}
                          value={form.note}
                          onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                          placeholder="Tell us a bit about your brand or what you'd like to discuss..."
                          className={`${inputCls} resize-none`}
                        />
                      </div>
                      {error && (
                        <p className="text-red-400 text-xs">{error}</p>
                      )}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-[#ff3300] hover:bg-[#e02d00] text-white rounded-lg font-semibold tracking-[0.08em] text-sm uppercase transition-colors disabled:opacity-50 shadow-[0_8px_32px_rgba(255,51,0,0.28)]"
                      >
                        {loading ? "Confirming…" : "Confirm Booking"}
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* ── Success ── */}
                {step === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center text-center py-16"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#ff3300] flex items-center justify-center mb-6 shadow-[0_0_48px_rgba(255,51,0,0.45)]">
                      <span className="text-white text-2xl font-bold">✓</span>
                    </div>
                    <h4 className="font-bebas text-2xl tracking-wide text-white mb-2">You&apos;re booked!</h4>
                    <p className="text-[#777] text-sm mb-1">
                      {selDate?.toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" })}
                      {selTime ? ` · ${fmt12h(selTime)} IST` : ""}
                    </p>
                    <p className="text-[#444] text-xs mb-8 max-w-xs">
                      A confirmation email + Google Calendar invite has been sent to your inbox.
                    </p>
                    {meetLink && (
                      <a
                        href={meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-7 py-3.5 bg-[#ff3300] hover:bg-[#e02d00] text-white text-sm rounded-lg font-semibold tracking-wide transition-colors shadow-[0_6px_24px_rgba(255,51,0,0.35)]"
                      >
                        Join Google Meet →
                      </a>
                    )}
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
