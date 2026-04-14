"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How much does a launch video cost?",
      answer:
        "Launch videos start at ₹75,000. The final price depends on complexity, length, and number of revisions. We provide custom quotes within 24 hours based on your specific project needs.",
    },
    {
      question: "How long does the video production process take?",
      answer:
        "Most projects take 5-8 business days from concept to final delivery. Rush delivery (3-5 days) is available on select projects. Timeline depends on scope, revisions needed, and current project queue.",
    },
    {
      question: "Do you offer revisions?",
      answer:
        "Yes! All packages include revisions. UI animations get 2 rounds, launch videos get 3 rounds, and retainer packages include unlimited revisions until you're 100% satisfied.",
    },
    {
      question:
        "Can you guarantee my video will go viral or get specific results?",
      answer:
        "We can't guarantee virality (no one can), but we create videos designed for high engagement based on proven SaaS marketing principles. Our clients have generated 10M+ organic views combined. Results depend on promotion strategy, audience size, and positioning.",
    },
    {
      question: "What's your process like?",
      answer:
        "Discovery call → Strategy & Concept Design → Storyboard Review → Production → Editing & Animation → Your Feedback Rounds → Final Delivery. You stay involved at each stage with dedicated support.",
    },
    {
      question: "Do you work with international clients?",
      answer:
        "Absolutely! We work with clients worldwide. Time difference is no problem—we have flexible communication and typically respond within 24 hours. All work is delivered digitally.",
    },
    {
      question: "What software/formats do you deliver in?",
      answer:
        "We deliver in all formats: MP4, MOV, WebM, animated GIFs, Lottie files for web/mobile, and more. You get source files, full project files, and developer-ready assets. Custom formats available on request.",
    },
    {
      question: "What if I'm not happy with the final video?",
      answer:
        "Every package includes revision rounds. If you're still not satisfied after revisions, we offer a 50% refund guarantee on UI animation projects. Your success is our priority.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="faq" className="bg-[#0a0a0a] py-[100px] px-[5vw]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="max-w-3xl mx-auto"
      >
        <motion.div
          variants={itemVariants}
          className="text-center mb-16"
        >
          <div className="text-[0.65rem] tracking-[0.2em] uppercase text-muted mb-4 flex items-center justify-center gap-2">
            <span className="text-[#ff3300]">//</span> FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="font-bebas text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[0.04em] text-white">
            Questions?<br />
            <em className="not-italic text-[#ff3300]">We've Got</em> Answers
          </h2>
        </motion.div>

        <motion.div variants={containerVariants} className="space-y-3">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="border border-[#1e1e1e] rounded-lg bg-[#111111] overflow-hidden hover:border-[#333333] transition-colors"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === idx ? null : idx)
                }
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#1a1a1a] transition-colors"
              >
                <span className="text-[0.95rem] font-medium text-white pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown
                    size={20}
                    className="text-[#ff3300]"
                  />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-[#1e1e1e] px-6 py-4"
                  >
                    <p className="text-[0.9rem] text-[#888888] leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-12 text-center bg-[#1a1a1a] border border-[#1e1e1e] rounded-lg p-8"
        >
          <p className="text-[0.95rem] text-[#888888] mb-4">
            Still have questions?
          </p>
          <a
            href="https://cal.com/mintmediahouse"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-[#ff3300] hover:bg-[#e82d00] text-white rounded-full text-[0.7rem] tracking-[0.14em] uppercase font-medium transition-colors"
          >
            📅 Book a Free Strategy Call
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
