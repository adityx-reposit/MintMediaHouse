"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Services() {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Load Twitter embed script
  useEffect(() => {
    if (selectedService !== null && mounted) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charSet = "utf-8";
      document.body.appendChild(script);
    }
  }, [selectedService, mounted]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedService !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedService]);

  const services = [
    {
      id: 0,
      num: "01",
      name: "LAUNCH VIDEOS",
      shortDesc: "Premium product launch videos designed to generate buzz and conversions",
      fullDesc:
        "Cinematic quality launch videos that average 60K+ views per video. Every frame is crafted to captivate your audience. 4K delivery with professional color grading, music, and sound design.",
      features: [
        "1 premium launch video",
        "4K quality delivery",
        "Average 60K+ views per video",
        "Multiple cuts included",
        "Music & sound design",
        "3 rounds of revisions",
      ],
      color: "from-orange-600 to-orange-500",
      videos: [
        { title: "PlayAI Network Launch", tweetId: "1985679479017259182", author: "@playAInetwork", views: "87.4K", likes: "3.6K", retweets: "1.2K", replies: "567", thumbnail: "launch-1" },
        { title: "SolixDB Launch Campaign", tweetId: "2011794480241000812", author: "@solixdb", views: "62.1K", likes: "2.8K", retweets: "945", replies: "423", thumbnail: "launch-2" },
        { title: "GTE Launch Video", tweetId: "1983177368605995108", author: "@gte_xyz", views: "95.3K", likes: "4.2K", retweets: "1.5K", replies: "689", thumbnail: "launch-3" },
      ],
    },
    {
      id: 1,
      num: "02",
      name: "UI ANIMATIONS",
      shortDesc: "10-15 custom micro-interactions that make users stop and engage",
      fullDesc:
        "Create stunning micro-interactions that reduce bounce rate by 30%+. Smooth, buttery animations that delight users at every interaction. Lottie files, CSS animations, and WebGL ready for production.",
      features: [
        "10-15 custom animations",
        "Lottie files (web & mobile)",
        "Reduces bounce rate 30%+",
        "Developer handoff docs",
        "2 rounds of revisions",
        "5-7 business days",
      ],
      color: "from-orange-600 to-orange-500",
      videos: [
        { title: "Smooth Loading Animation", tweetId: "1985679479017259182", author: "@playAInetwork", views: "24.5K", likes: "1.2K", retweets: "342", replies: "189", thumbnail: "ui-1" },
        { title: "Button Micro-Interaction", tweetId: "2011794480241000812", author: "@solixdb", views: "18.9K", likes: "892", retweets: "245", replies: "156", thumbnail: "ui-2" },
        { title: "Page Transition Effect", tweetId: "1983177368605995108", author: "@gte_xyz", views: "31.2K", likes: "1.8K", retweets: "567", replies: "312", thumbnail: "ui-3" },
      ],
    },
    {
      id: 2,
      num: "03",
      name: "AD CREATIVES",
      shortDesc: "Performance-optimized video ads with average 60K+ views",
      fullDesc:
        "Data-driven video ads engineered for maximum CTR and conversions. Native formats optimized for Meta, Google, and TikTok. Proven to increase campaign performance and ROI.",
      features: [
        "Performance-optimized",
        "2.1%+ conversion rates",
        "Meta, Google, TikTok native",
        "A/B test variants",
        "Full asset delivery",
        "Unlimited revisions",
      ],
      color: "from-orange-600 to-orange-500",
      videos: [
        { title: "Blackbox AI Ad Creative", tweetId: "2008546933867245847", author: "@_adityx_", views: "156.8K", likes: "5.7K", retweets: "2.1K", replies: "893", thumbnail: "ad-1" },
        { title: "Blackbox AI Campaign", tweetId: "2000964886084596121", author: "@_adityx_", views: "203.5K", likes: "7.2K", retweets: "2.8K", replies: "1.2K", thumbnail: "ad-2" },
      ],
    },
  ];

  return (
    <section id="services" className="bg-[#111111] py-[110px] px-[5vw]">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.65 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-end mb-20">
          <div>
            <div className="text-[0.65rem] tracking-[0.2em] uppercase text-muted mb-5 flex items-center gap-3">
              <span className="text-[#ff3300]">//</span> What We Do
            </div>
            <h2 className="font-bebas text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[0.04em] text-white">
              CONTENT THAT <em className="not-italic text-[#ff3300]">CONVERTS</em>
            </h2>
          </div>
          <p className="text-sm text-[#888888] font-light leading-[1.8]">
            Three core services engineered to stop the scroll and start the conversation. Click to explore each service and see real examples of our work.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {services.map((service, idx) => (
            <motion.button
              key={idx}
              onClick={() => setSelectedService(idx)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative h-[400px] rounded-xl overflow-hidden border border-[#1e1e1e] hover:border-[#ff3300] transition-all duration-300 cursor-pointer text-left w-full"
            >
              {/* Background Gradient with 20% opacity */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20`}
              />

              {/* Content */}
              <div className="relative h-full bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] p-8 flex flex-col justify-between">
                {/* Top - Number & Title */}
                <div>
                  <div className="text-[0.75rem] tracking-[0.2em] uppercase text-[#ff3300] mb-3">
                    {service.num} //
                  </div>
                  <h3 className="font-bebas text-[1.8rem] tracking-[0.06em] text-white mb-4">
                    {service.name}
                  </h3>
                </div>

                {/* Bottom - Description & Arrow */}
                <div>
                  <p className="text-[0.9rem] text-[#888888] line-clamp-3 mb-6">
                    {service.shortDesc}
                  </p>
                  <div className="flex items-center gap-2 text-[0.75rem] tracking-[0.1em] uppercase text-[#ff3300] group-hover:gap-3 transition-all">
                    <span>Explore</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff3300] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedService !== null && mounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-[#1e1e1e] rounded-2xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden"
            >
              {/* Close Button */}
              <div className="sticky top-0 right-0 px-6 pt-6 pb-0 flex justify-end bg-gradient-to-b from-[#1a1a1a] to-transparent z-10">
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedService(null)}
                  className="p-2 hover:bg-[#1e1e1e] rounded-lg transition-colors"
                >
                  <X size={24} className="text-[#ff3300]" />
                </motion.button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto scrollbar-hide px-8 pb-8">
                {/* Service Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-10 pt-4"
                >
                  <div className="text-[0.75rem] tracking-[0.2em] uppercase text-[#ff3300] mb-3">
                    {services[selectedService].num} //
                  </div>
                  <h2 className="font-bebas text-[2.5rem] md:text-[3.5rem] tracking-[0.06em] text-white mb-4">
                    {services[selectedService].name}
                  </h2>
                  <p className="text-sm text-[#888888] max-w-2xl">
                    {services[selectedService].fullDesc}
                  </p>
                </motion.div>

                {/* Embedded Tweets Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-10"
                >
                  <h3 className="font-bebas text-[1.3rem] tracking-[0.06em] text-white mb-6">
                    Real Examples
                  </h3>

                  {/* Horizontal Scrollable Container */}
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {services[selectedService].videos.map((video, idx) => (
                      <motion.a
                        key={idx}
                        href={`https://twitter.com/${video.author.replace("@", "")}/status/${video.tweetId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + idx * 0.1 }}
                        whileHover={{ scale: 1.02, y: -4 }}
                        className="group flex-shrink-0 w-[320px] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#1e1e1e] hover:border-[#ff3300] rounded-xl overflow-hidden transition-all flex flex-col"
                      >
                        {/* Thumbnail Image */}
                        <div className="w-full h-[160px] bg-gradient-to-br from-[#ff3300] to-orange-600 flex items-center justify-center overflow-hidden">
                          <img
                            src={`/thumbnails/${video.thumbnail}.svg`}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col p-4">
                          {/* Title */}
                          <p className="text-[0.85rem] text-[#888888] group-hover:text-white transition-colors line-clamp-2 flex-1 mb-4">
                            {video.title}
                          </p>

                          {/* Stats Row - Only Views & Likes */}
                          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#1e1e1e]">
                            <div className="text-center">
                              <p className="text-[0.65rem] text-[#888888] mb-1">Views</p>
                              <p className="text-[0.85rem] font-bold text-white">{video.views}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-[0.65rem] text-[#888888] mb-1">Likes</p>
                              <p className="text-[0.85rem] font-bold text-[#ff3300]">{video.likes}</p>
                            </div>
                          </div>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                {/* Features Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-10"
                >
                  <h3 className="font-bebas text-[1.3rem] tracking-[0.06em] text-white mb-6">
                    What's Included
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {services[selectedService].features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + idx * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <span className="text-[#ff3300] mt-1 flex-shrink-0">✓</span>
                        <span className="text-[0.9rem] text-[#888888]">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-4 sticky bottom-0 bg-gradient-to-t from-[#0a0a0a] to-transparent pt-6"
                >
                  <a
                    href="#quote"
                    onClick={() => setSelectedService(null)}
                    className="flex-1 py-4 px-6 bg-[#ff3300] hover:bg-[#e82d00] text-white rounded-lg font-medium tracking-[0.1em] uppercase text-[0.75rem] transition-colors text-center"
                  >
                    Get {services[selectedService].name} Quote
                  </a>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="px-6 py-4 border border-[#1e1e1e] hover:border-[#ff3300] text-[#888888] hover:text-white rounded-lg font-medium tracking-[0.1em] uppercase text-[0.75rem] transition-colors"
                  >
                    Close
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
