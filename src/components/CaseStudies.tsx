"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

export default function CaseStudies() {
  const cases = [
    {
      client: "Blackbox AI",
      industry: "AI SaaS",
      title: "Product Launch Campaign",
      challenge:
        "New AI platform launch needed immediate market validation and user acquisition",
      solution:
        "Created 5 product demo videos + launch video with focused messaging for founder audience",
      results: [
        { metric: "2.4M", label: "Views Generated" },
        { metric: "+340%", label: "Signups Increase" },
        { metric: "4.2%", label: "CTR" },
      ],
      testimonial: "The videos absolutely moved the needle on signups. Worth every rupee.",
      author: "Founder, Blackbox AI",
    },
    {
      client: "Play AI",
      industry: "Voice AI",
      title: "Personal Brand Series",
      challenge:
        "Founder needed to establish authority in crowded AI space with limited visibility",
      solution:
        "Produced 12-video monthly series showcasing founder expertise + behind-the-scenes content",
      results: [
        { metric: "45K", label: "LinkedIn Impressions/Month" },
        { metric: "14%", label: "Engagement Rate" },
        { metric: "50K", label: "Followers Added" },
      ],
      testimonial:
        "This changed my personal brand positioning completely. Now industry leaders reach out to me.",
      author: "Founder, Play AI",
    },
    {
      client: "Base (Crypto)",
      industry: "Blockchain",
      title: "Educational Content Hub",
      challenge:
        "Complex product needed simple, engaging explanations for different audience segments",
      solution:
        "Created library of 20+ explainer videos breaking down features for beginners to developers",
      results: [
        { metric: "3.8M", label: "Total Views" },
        { metric: "2.1%", label: "Conversion Rate" },
        { metric: "40%", label: "Reduced Support Tickets" },
      ],
      testimonial:
        "Reduced our support burden significantly. Customers understand the product way better now.",
      author: "Product Lead, Base",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="bg-[#0a0a0a] py-[110px] px-[5vw]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        <motion.div
          variants={itemVariants}
          className="text-center mb-16"
        >
          <div className="text-[0.65rem] tracking-[0.2em] uppercase text-muted mb-4 flex items-center justify-center gap-2">
            <span className="text-[#ff3300]">//</span> REAL RESULTS
          </div>
          <h2 className="font-bebas text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[0.04em] text-white">
            Client Success<br />
            <em className="not-italic text-[#ff3300]">Stories</em>
          </h2>
          <p className="text-[0.95rem] text-[#888888] mt-4 max-w-2xl mx-auto">
            Here's what happened when founders chose Mint Media for their video strategy.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-6"
        >
          {cases.map((caseStudy, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group bg-[#111111] border border-[#1e1e1e] rounded-lg overflow-hidden hover:border-[#ff3300] transition-all hover:shadow-xl hover:shadow-[#ff3300]/10"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#1a1a1a] to-[#111111] p-6 border-b border-[#1e1e1e]">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {caseStudy.client}
                    </h3>
                    <p className="text-[0.75rem] text-[#666666] uppercase tracking-[0.1em]">
                      {caseStudy.industry}
                    </p>
                  </div>
                  <div className="text-2xl text-[#ff3300]">
                    <TrendingUp size={24} />
                  </div>
                </div>
                <h4 className="text-[0.95rem] font-medium text-[#ff3300]">
                  {caseStudy.title}
                </h4>
              </div>

              {/* Challenge */}
              <div className="p-6 border-b border-[#1e1e1e]">
                <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[#666666] mb-2">
                  Challenge
                </p>
                <p className="text-[0.85rem] text-[#888888] leading-relaxed">
                  {caseStudy.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="p-6 border-b border-[#1e1e1e]">
                <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[#666666] mb-2">
                  Solution
                </p>
                <p className="text-[0.85rem] text-[#888888] leading-relaxed">
                  {caseStudy.solution}
                </p>
              </div>

              {/* Results */}
              <div className="p-6 border-b border-[#1e1e1e]">
                <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[#666666] mb-4">
                  Results
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {caseStudy.results.map((result, ridx) => (
                    <div key={ridx} className="text-center">
                      <div className="text-[1.3rem] font-bold text-[#ff3300]">
                        {result.metric}
                      </div>
                      <p className="text-[0.65rem] text-[#666666] mt-1">
                        {result.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <div className="p-6 bg-[#0a0a0a]">
                <p className="text-[0.85rem] text-[#888888] italic leading-relaxed mb-3">
                  "{caseStudy.testimonial}"
                </p>
                <p className="text-[0.75rem] font-medium text-white">
                  {caseStudy.author}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-center mt-12"
        >
          <a
            href="#quote"
            className="inline-block px-8 py-3 bg-[#ff3300] hover:bg-[#e82d00] text-white rounded-full text-[0.7rem] tracking-[0.14em] uppercase font-medium transition-colors"
          >
            Get Similar Results for Your Company
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
