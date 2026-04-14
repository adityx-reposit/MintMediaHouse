"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ImprovedLeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send quote request");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error submitting form:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="quote" className="bg-[#111111] py-[100px] px-[5vw]">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.65 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-12">
          <div className="text-[0.65rem] tracking-[0.2em] uppercase text-muted mb-4 flex items-center justify-center gap-2">
            <span className="text-[#ff3300]">//</span> GET YOUR CUSTOM QUOTE
          </div>
          <h2 className="font-bebas text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[0.04em] text-white">
            Tell Us About<br />
            <em className="not-italic text-[#ff3300]">Your Project</em>
          </h2>
          <p className="text-[0.95rem] text-[#888888] mt-4">
            We'll respond with a custom quote within 24 hours. No commitment needed.
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-[#1a1a1a] border border-[#1e1e1e] rounded-lg"
          >
            <div className="text-5xl mb-4">✓</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Quote Request Received!
            </h3>
            <p className="text-[#888888]">
              We'll review your project and get back to you within 24 hours.
            </p>
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-[#1a1a1a] border border-red-900 rounded-lg"
          >
            <div className="text-5xl mb-4">⚠</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-red-500 mb-6">
              {error}
            </p>
            <button
              onClick={() => {
                setError("");
              }}
              className="px-6 py-2 bg-[#ff3300] hover:bg-[#e82d00] text-white rounded-lg text-[0.7rem] tracking-[0.14em] uppercase font-bold transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-5 bg-[#0a0a0a] border border-[#1e1e1e] p-8 rounded-lg"
          >
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-[0.75rem] tracking-[0.1em] uppercase text-[#666666] mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full px-4 py-3 bg-[#111111] border border-[#1e1e1e] rounded-lg text-white placeholder-[#444444] focus:outline-none focus:border-[#ff3300] focus:ring-1 focus:ring-[#ff3300] transition-colors"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-[0.75rem] tracking-[0.1em] uppercase text-[#666666] mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-[#111111] border border-[#1e1e1e] rounded-lg text-white placeholder-[#444444] focus:outline-none focus:border-[#ff3300] focus:ring-1 focus:ring-[#ff3300] transition-colors"
              />
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-[0.75rem] tracking-[0.1em] uppercase text-[#666666] mb-2"
              >
                Tell us about your project
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="What kind of video do you need? UI animations, launch video, personal brand content, etc."
                rows={5}
                className="w-full px-4 py-3 bg-[#111111] border border-[#1e1e1e] rounded-lg text-white placeholder-[#444444] focus:outline-none focus:border-[#ff3300] focus:ring-1 focus:ring-[#ff3300] transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-[#ff3300] hover:bg-[#e82d00] disabled:bg-[#666666] disabled:cursor-not-allowed text-white rounded-lg text-[0.7rem] tracking-[0.14em] uppercase font-bold transition-colors flex items-center justify-center gap-2 group"
            >
              <span>
                {loading ? "Sending..." : "Get My Custom Quote"}
              </span>
              {!loading && (
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              )}
            </button>

            {/* Trust Signal */}
            <div className="pt-4 border-t border-[#1e1e1e] text-center">
              <p className="text-[0.75rem] text-[#666666]">
                ✓ 24-hour response guarantee • ✓ Zero pressure • ✓ Custom pricing
              </p>
            </div>
          </form>
        )}
      </motion.div>
    </section>
  );
}
