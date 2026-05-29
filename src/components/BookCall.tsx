"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Video, ArrowLeft, X } from "lucide-react";

const TIME_SLOTS: string[] = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2);
  const m = i % 2 === 0 ? "00" : "30";
  return `${String(h).padStart(2, "0")}:${m}`;
});

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS   = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function fmt12h(t: string) {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2,"0")} ${h >= 12 ? "PM" : "AM"}`;
}
function toDateStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

type Step = "calendar" | "time" | "form" | "success";

function CalendarUI({ onClose }: { onClose: () => void }) {
  const today = new Date(); today.setHours(0,0,0,0);

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
  const isAvail     = (d: Date) => d >= today;

  const prevMonth = () => viewMonth === 0 ? (setViewMonth(11), setViewYear(y=>y-1)) : setViewMonth(m=>m-1);
  const nextMonth = () => viewMonth === 11 ? (setViewMonth(0), setViewYear(y=>y+1)) : setViewMonth(m=>m+1);

  const pickDate = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    if (!isAvail(d)) return;
    setSelDate(d); setSelTime(null); setStep("time");
  };
  const goBack = () => step === "form" ? (setStep("time"), setSelTime(null)) : (setStep("calendar"), setSelDate(null));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selDate || !selTime) return;
    setLoading(true); setError("");
    try {
      const res  = await fetch("/api/book-call", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: toDateStr(selDate), time: selTime, ...form }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Booking failed");
      setMeetLink(data.meetLink);
      setStep("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally { setLoading(false); }
  };

  const inputCls = "w-full bg-[#0a0a0a] border border-[#1e1e1e] rounded-lg px-4 py-3 text-white text-sm placeholder-[#333] focus:outline-none focus:border-[#ff3300] transition-colors";
  const labelCls = "block text-[0.58rem] tracking-[0.18em] uppercase text-[#555] mb-1.5";

  return (
    <div className="flex flex-col md:flex-row">

      {/* Left info panel */}
      <div className="md:w-[200px] flex-shrink-0 border-b md:border-b-0 md:border-r border-[#1e1e1e] flex flex-col">
        {/* Mobile: compact single row */}
        <div className="flex md:hidden items-center gap-2 px-4 py-3">
          <img src="/logo/logo.png" alt="Mint Media House" className="h-5 w-auto object-contain flex-shrink-0" style={{ filter: "brightness(0) invert(1)" }} />
          <div className="flex-1 min-w-0">
            <p className="font-bebas text-[0.6rem] tracking-[0.18em] text-[#ff3300] leading-none">MINTMEDIAHOUSE</p>
            <p className="font-bebas text-sm tracking-wide text-white leading-tight">Discovery Call</p>
          </div>
          <div className="flex items-center gap-2 ml-auto flex-shrink-0">
            <span className="flex items-center gap-1 text-[#555] text-[0.6rem]"><Clock size={9} className="text-[#ff3300]"/>30m</span>
            <span className="flex items-center gap-1 text-[#555] text-[0.6rem]"><Video size={9} className="text-[#ff3300]"/>Meet</span>
          </div>
        </div>
        {/* Desktop: stacked */}
        <div className="hidden md:flex flex-col p-6">
          <img src="/logo/logo.png" alt="Mint Media House" className="mb-2 h-7 w-auto object-contain self-start" style={{ filter: "brightness(0) invert(1)" }} />
          <p className="font-bebas text-[0.7rem] tracking-[0.18em] text-[#ff3300] mb-0.5">MINTMEDIAHOUSE</p>
          <h3 className="font-bebas text-lg tracking-wide text-white mb-4">Discovery Call</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#666] text-xs"><Clock size={11} className="text-[#ff3300]"/><span>30 minutes</span></div>
            <div className="flex items-center gap-2 text-[#666] text-xs"><Video size={11} className="text-[#ff3300]"/><span>Google Meet</span></div>
          </div>
          {selDate && (
            <div className="mt-5 pt-5 border-t border-[#1e1e1e]">
              <p className="text-[0.52rem] tracking-[0.18em] uppercase text-[#444] mb-1.5">Selected</p>
              <p className="text-white text-[0.75rem] font-medium leading-snug">
                {selDate.toLocaleDateString("en-IN", { weekday:"short", month:"short", day:"numeric", year:"numeric" })}
              </p>
              {selTime && <p className="text-[#ff3300] text-[0.75rem] font-semibold mt-0.5">{fmt12h(selTime)} <span className="text-[#444] font-normal">IST</span></p>}
            </div>
          )}
        </div>
      </div>

      {/* Right content panel */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto" data-lenis-prevent>
        <AnimatePresence mode="wait">

          {step === "calendar" && (
            <motion.div key="cal" initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-16 }} transition={{ duration:0.22 }}>
              <h4 className="text-white font-semibold text-[0.85rem] mb-2 md:mb-4">Select a Date</h4>
              <div className="flex items-center justify-between mb-2 md:mb-4">
                <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-white/5 text-[#555] hover:text-white transition-colors"><ChevronLeft size={16}/></button>
                <span className="text-white text-sm font-medium">{MONTHS[viewMonth]} {viewYear}</span>
                <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-white/5 text-[#555] hover:text-white transition-colors"><ChevronRight size={16}/></button>
              </div>
              <div className="grid grid-cols-7 mb-0.5">
                {DAYS.map(d => <div key={d} className="text-center text-[0.55rem] tracking-widest uppercase text-[#3a3a3a] py-1">{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-0.5">
                {Array.from({ length: firstDay }).map((_,i) => <div key={`_${i}`}/>)}
                {Array.from({ length: daysInMonth }).map((_,i) => {
                  const day=i+1, d=new Date(viewYear,viewMonth,day), avail=isAvail(d), isToday=d.toDateString()===today.toDateString();
                  return (
                    <button key={day} onClick={() => pickDate(day)} disabled={!avail}
                      className={["h-9 w-full rounded-md text-[0.75rem] font-medium transition-all duration-150",
                        avail ? "text-white hover:bg-[#ff3300] cursor-pointer" : "text-[#2a2a2a] cursor-not-allowed",
                        isToday && avail ? "ring-1 ring-[#ff3300] text-[#ff3300]" : "",
                      ].join(" ")}>
                      {day}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 md:mt-4 text-[0.5rem] tracking-wider text-[#333] uppercase">Timezone · India Standard Time (IST)</p>
            </motion.div>
          )}

          {step === "time" && (
            <motion.div key="time" initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-16 }} transition={{ duration:0.22 }}>
              <button onClick={goBack} className="flex items-center gap-1.5 text-[#555] hover:text-white text-xs mb-3 md:mb-5 transition-colors"><ArrowLeft size={12}/> Back</button>
              <h4 className="text-white font-semibold text-[0.85rem] mb-0.5">{selDate?.toLocaleDateString("en-IN",{weekday:"long",month:"long",day:"numeric"})}</h4>
              <p className="text-[0.55rem] tracking-wider text-[#444] uppercase mb-3 md:mb-5">Pick a time · IST</p>
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-1.5 max-h-56 md:max-h-72 overflow-y-auto pr-1" data-lenis-prevent>
                {TIME_SLOTS.map(t => (
                  <button key={t} onClick={() => { setSelTime(t); setStep("form"); }}
                    className="py-2 md:py-3 px-2 md:px-4 rounded-lg border border-[#1e1e1e] text-[#aaa] text-xs md:text-sm font-medium hover:border-[#ff3300] hover:text-white hover:bg-[#ff3300]/10 transition-all duration-150">
                    {fmt12h(t)}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "form" && (
            <motion.div key="form" initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-16 }} transition={{ duration:0.22 }}>
              <button onClick={goBack} className="flex items-center gap-1.5 text-[#555] hover:text-white text-xs mb-5 transition-colors"><ArrowLeft size={12}/> Back</button>
              <h4 className="text-white font-semibold text-[0.85rem] mb-5">Your Details</h4>
              <form onSubmit={submit} className="space-y-4 max-w-md">
                <div><label className={labelCls}>Full Name *</label><input type="text" required value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Jane Smith" className={inputCls}/></div>
                <div><label className={labelCls}>Email Address *</label><input type="email" required value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="jane@brand.com" className={inputCls}/></div>
                <div><label className={labelCls}>Note (optional)</label><textarea rows={3} value={form.note} onChange={e=>setForm(f=>({...f,note:e.target.value}))} placeholder="Tell us about your brand..." className={`${inputCls} resize-none`}/></div>
                {error && <p className="text-red-400 text-xs">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full py-3.5 bg-[#ff3300] hover:bg-[#e02d00] text-white rounded-lg font-semibold tracking-[0.08em] text-sm uppercase transition-colors disabled:opacity-50 shadow-[0_8px_32px_rgba(255,51,0,0.28)]">
                  {loading ? "Confirming…" : "Confirm Booking"}
                </button>
              </form>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div key="success" initial={{ opacity:0, scale:0.94 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.4 }}
              className="flex flex-col items-center justify-center text-center py-12">
              <div className="w-14 h-14 rounded-full bg-[#ff3300] flex items-center justify-center mb-5 shadow-[0_0_48px_rgba(255,51,0,0.45)]">
                <span className="text-white text-xl font-bold">✓</span>
              </div>
              <h4 className="font-bebas text-2xl tracking-wide text-white mb-2">You&apos;re booked!</h4>
              <p className="text-[#777] text-sm mb-1">
                {selDate?.toLocaleDateString("en-IN",{weekday:"long",month:"long",day:"numeric"})}
                {selTime ? ` · ${fmt12h(selTime)} IST` : ""}
              </p>
              <p className="text-[#444] text-xs mb-7 max-w-xs">Confirmation email + Google Calendar invite sent to your inbox.</p>
              {meetLink && (
                <a href={meetLink} target="_blank" rel="noopener noreferrer"
                  className="px-7 py-3.5 bg-[#ff3300] hover:bg-[#e02d00] text-white text-sm rounded-lg font-semibold tracking-wide transition-colors shadow-[0_6px_24px_rgba(255,51,0,0.35)]">
                  Join Google Meet →
                </a>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

export default function BookCall() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Contact CTA section */}
      <section id="book" className="flex items-center justify-center py-32 px-[5vw]"
        style={{ background: "linear-gradient(to bottom, #0a0a0a, #0d0d0d)" }}>
        <div className="text-center flex flex-col items-center gap-8">
          <p className="text-[0.58rem] tracking-[0.3em] uppercase text-[#333] font-inter">Ready to work together?</p>
          <h2 className="font-bebas text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-[0.04em] text-white">
            BOOK A <span className="text-[#ff3300]">DISCOVERY</span> CALL
          </h2>
          <p className="text-[#555] text-sm max-w-md leading-relaxed">
            30 minutes. No pitch. Just a clear plan for your growth.
          </p>

          {/* Contact button */}
          <button
            onClick={() => setOpen(true)}
            className="group flex items-center gap-4 px-8 py-4 rounded-2xl border border-[#1e1e1e] hover:border-[#ff3300]/40 transition-all duration-300 hover:scale-105 active:scale-100"
            style={{ background: "rgba(14,14,14,0.9)", boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}
          >
            {/* Logo — white */}
            <img src="/logo/logo.png" alt="" aria-hidden="true"
              className="h-8 w-auto object-contain"
              style={{ filter: "brightness(0) invert(1)" }} />
            <div className="text-left">
              <p className="text-[0.58rem] tracking-[0.22em] uppercase text-[#555] font-inter mb-0.5">Mint Media House</p>
              <p className="text-white font-bebas text-lg tracking-[0.1em]">Contact Us</p>
            </div>
            <div className="ml-2 text-[#ff3300] group-hover:translate-x-1 transition-transform duration-200">→</div>
          </button>
        </div>
      </section>

      {/* Modal overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-end md:items-center justify-center md:p-4"
            style={{ background: "rgba(0,0,0,0.88)" }}
            onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full md:max-w-3xl rounded-t-2xl md:rounded-2xl border border-[#1e1e1e] overflow-hidden bg-[#111]"
              style={{ maxHeight: "92svh" }}
            >
              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-lg hover:bg-white/5 text-[#555] hover:text-white transition-colors"
              >
                <X size={16}/>
              </button>

              {/* Orange top bar */}
              <div style={{ height: 3, background: "linear-gradient(90deg,#ff3300,#ff6600)" }}/>

              <div style={{ maxHeight: "calc(92svh - 3px)", overflowY: "auto" }}>
                <CalendarUI onClose={() => setOpen(false)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
