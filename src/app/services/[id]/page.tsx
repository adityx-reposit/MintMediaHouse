"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ServiceVideo {
  title: string;
  url: string;
  thumbnail?: string;
}

interface ServiceDetail {
  id: string;
  num: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  color: string;
  videos: ServiceVideo[];
  features: string[];
}

const servicesData: Record<string, ServiceDetail> = {
  "ui-animations": {
    id: "ui-animations",
    num: "01",
    name: "UI ANIMATIONS",
    shortDesc: "10-15 custom micro-interactions that make users stop and engage",
    fullDesc:
      "Create stunning micro-interactions that reduce bounce rate by 30%+. Smooth, buttery animations that delight users at every interaction. Lottie files, CSS animations, and WebGL ready for production. Our animations aren't just beautiful—they're strategically designed to reduce friction and increase conversions at every user touchpoint.",
    color: "from-orange-600 to-orange-500",
    features: [
      "10-15 custom animations",
      "Lottie files (web & mobile)",
      "Reduces bounce rate 30%+",
      "Developer handoff docs",
      "2 rounds of revisions",
      "5-7 business days",
    ],
    videos: [
      { title: "Smooth Loading Animation", url: "" },
      { title: "Button Micro-Interaction", url: "" },
      { title: "Page Transition Effect", url: "" },
    ],
  },
  "launch-videos": {
    id: "launch-videos",
    num: "02",
    name: "LAUNCH VIDEOS",
    shortDesc: "Premium product launch videos designed to generate buzz and conversions",
    fullDesc:
      "Cinematic quality launch videos that average 60K+ views per video. Every frame is crafted to captivate your audience. 4K delivery with professional color grading, music, and sound design. We've produced launch videos for startups that generated thousands of views and sign-ups within the first week.",
    color: "from-orange-600 to-orange-500",
    features: [
      "1 premium launch video",
      "4K quality delivery",
      "Average 60K+ views per video",
      "Multiple cuts included",
      "Music & sound design",
      "3 rounds of revisions",
    ],
    videos: [
      {
        title: "PlayAI Network Launch",
        url: "https://x.com/playAInetwork/status/1985679479017259182",
      },
      {
        title: "SolixDB Launch Campaign",
        url: "https://x.com/solixdb/status/2011794480241000812",
      },
      {
        title: "GTE Launch Video",
        url: "https://x.com/gte_xyz/status/1983177368605995108",
      },
    ],
  },
  "ad-creatives": {
    id: "ad-creatives",
    num: "03",
    name: "AD CREATIVES",
    shortDesc: "Performance-optimized video ads with average 2.1%+ conversion rates",
    fullDesc:
      "Data-driven video ads engineered for maximum CTR and conversions. Native formats optimized for Meta, Google, and TikTok. Proven to increase campaign performance and ROI. Our ad creatives are scientifically crafted with A/B testing and real performance data to ensure every frame drives results.",
    color: "from-orange-600 to-orange-500",
    features: [
      "Performance-optimized",
      "2.1%+ conversion rates",
      "Meta, Google, TikTok native",
      "A/B test variants",
      "Full asset delivery",
      "Unlimited revisions",
    ],
    videos: [
      {
        title: "Blackbox AI Ad Creative",
        url: "https://x.com/_adityx_/status/2008546933867245847",
      },
      {
        title: "Blackbox AI Campaign",
        url: "https://x.com/_adityx_/status/2000964886084596121",
      },
    ],
  },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ServiceDetailPage({ params }: PageProps) {
  const [service, setService] = useState<ServiceDetail | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      const serviceId = resolvedParams.id;
      if (servicesData[serviceId]) {
        setService(servicesData[serviceId]);
      }
    });
  }, [params]);

  if (!service) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-[#888888]"
          >
            Loading service...
          </motion.p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="w-full bg-[#0a0a0a]">
        {/* Back Button */}
        <section className="bg-[#0a0a0a] px-[5vw] pt-6 pb-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[0.75rem] tracking-[0.1em] uppercase text-[#ff3300] hover:gap-3 transition-all"
            >
              <ArrowLeft size={14} className="hover:-translate-x-1 transition-transform" />
              <span>Back to Services</span>
            </Link>
          </motion.div>
        </section>

        {/* Hero Section */}
        <section className="bg-[#111111] py-20 px-[5vw] relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <div className="text-[0.75rem] tracking-[0.2em] uppercase text-[#ff3300] mb-3">
                  {service.num} //
                </div>
                <h1 className="font-bebas text-[clamp(3rem,7vw,6rem)] leading-[0.95] tracking-[0.04em] text-white">
                  {service.name}
                </h1>
              </div>
              <p className="text-sm text-[#888888] max-w-3xl leading-relaxed">
                {service.shortDesc}
              </p>
            </motion.div>
          </div>

          {/* Floating decorative elements */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className={`absolute top-20 right-20 w-32 h-32 rounded-full bg-gradient-to-br ${service.color} opacity-5 blur-3xl`}
          />
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
            className={`absolute bottom-20 left-20 w-40 h-40 rounded-full bg-gradient-to-br ${service.color} opacity-5 blur-3xl`}
          />
        </section>

        {/* Main Content */}
        <section className="bg-[#0a0a0a] py-[80px] px-[5vw]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left Column - Description & Features */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-1"
              >
                <div className="sticky top-24">
                  <h2 className="font-bebas text-[1.5rem] tracking-[0.04em] text-white mb-6">
                    What's Included
                  </h2>

                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + idx * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <span className="text-[#ff3300] mt-1 flex-shrink-0 text-lg">✓</span>
                        <span className="text-[0.9rem] text-[#888888]">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.a
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    href="#quote"
                    className="w-full py-4 px-6 bg-[#ff3300] hover:bg-[#e82d00] text-white rounded-lg font-medium tracking-[0.1em] uppercase text-[0.75rem] transition-colors text-center block"
                  >
                    Get {service.name} Quote
                  </motion.a>
                </div>
              </motion.div>

              {/* Right Column - Description & Videos */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-2"
              >
                {/* Full Description */}
                <div className="mb-12">
                  <h3 className="font-bebas text-[1.3rem] tracking-[0.04em] text-white mb-4">
                    Why Choose {service.name}?
                  </h3>
                  <p className="text-[0.95rem] text-[#888888] leading-[1.8]">
                    {service.fullDesc}
                  </p>
                </div>

                {/* Video Gallery - Auto-Playing Videos */}
                <div className="mb-12">
                  <h3 className="font-bebas text-[1.3rem] tracking-[0.04em] text-white mb-8">
                    Real Examples & Case Studies
                  </h3>

                  {/* Video Grid Container */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {service.videos.map((video, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="group"
                      >
                        <div className="relative rounded-lg overflow-hidden border border-[#1e1e1e] bg-[#0a0a0a] aspect-video mb-4 hover:border-[#ff3300] transition-colors duration-300">
                          <video
                            src={video.url}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-[0.9rem] text-white font-medium group-hover:text-[#ff3300] transition-colors">
                          {video.title}
                        </h4>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#111111] py-20 px-[5vw]" id="quote">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="font-bebas text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] tracking-[0.04em] text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-[0.95rem] text-[#888888] mb-8 leading-relaxed">
              Get a custom quote for {service.name} within 24 hours. No contracts, no surprises—just transparent pricing and amazing results.
            </p>
            <a
              href="#quote-form"
              className="inline-block py-4 px-12 bg-[#ff3300] hover:bg-[#e82d00] text-white rounded-lg font-medium tracking-[0.1em] uppercase text-[0.75rem] transition-colors"
            >
              Get Custom Quote
            </a>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
