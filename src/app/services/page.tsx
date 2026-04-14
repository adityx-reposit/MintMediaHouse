"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  const services = [
    {
      id: "ui-animations",
      num: "01",
      name: "UI ANIMATIONS",
      description: "10-15 custom micro-interactions that make users stop and engage",
      color: "from-orange-600 to-orange-500",
    },
    {
      id: "launch-videos",
      num: "02",
      name: "LAUNCH VIDEOS",
      description: "Premium product launch videos designed to generate buzz and conversions",
      color: "from-orange-600 to-orange-500",
    },
    {
      id: "ad-creatives",
      num: "03",
      name: "AD CREATIVES",
      description: "Performance-optimized video ads with average 2.1%+ conversion rates",
      color: "from-orange-600 to-orange-500",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="w-full">
        {/* Hero Section */}
        <section className="bg-[#0a0a0a] py-20 px-[5vw]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto"
          >
            <div className="mb-12">
              <div className="text-[0.65rem] tracking-[0.2em] uppercase text-muted mb-5 flex items-center gap-3">
                <span className="text-[#ff3300]">//</span> Services
              </div>
              <h1 className="font-bebas text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[0.04em] text-white">
                CONTENT THAT <em className="not-italic text-[#ff3300]">CONVERTS</em>
              </h1>
              <p className="mt-6 text-sm text-[#888888] max-w-2xl">
                Three core services engineered to stop the scroll and start the conversation. Choose your service to explore real examples of our work.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Services Grid */}
        <section className="bg-[#111111] py-[80px] px-[5vw]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service, idx) => (
                <Link href={`/services/${service.id}`} key={idx}>
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group relative h-[400px] rounded-xl overflow-hidden border border-[#1e1e1e] hover:border-[#ff3300] transition-all duration-300 cursor-pointer text-left w-full"
                  >
                    {/* Background Gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />

                    {/* Content */}
                    <div className="relative h-full bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] p-8 flex flex-col justify-between">
                      {/* Top - Number Only */}
                      <div>
                        <div className="text-[0.75rem] tracking-[0.2em] uppercase text-[#ff3300] mb-3">
                          {service.num} //
                        </div>
                      </div>

                      {/* Bottom - Description & Arrow */}
                      <div>
                        <h3 className="font-bebas text-2xl tracking-[0.04em] text-white mb-3">
                          {service.name}
                        </h3>
                        <p className="text-[0.9rem] text-[#888888] line-clamp-3 mb-6">
                          {service.description}
                        </p>
                        <div className="flex items-center gap-2 text-[0.75rem] tracking-[0.1em] uppercase text-[#ff3300] group-hover:gap-3 transition-all">
                          <span>Explore</span>
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                      {/* Hover Border Effect */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff3300] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    </div>
                  </motion.button>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
