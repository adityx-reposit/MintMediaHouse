import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — The Team Behind Mint Media House",
  description:
    "Mint Media House is a Mumbai-based creative studio building UI animations, launch videos and ad creatives for SaaS founders. Learn about our process, values and team.",
  alternates: { canonical: "https://mintmediahouse.in/about" },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0a0a0a] min-h-screen px-[5vw] pt-[140px] pb-24">
        <article className="max-w-3xl mx-auto text-[#cfcfcf]">
          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#ff3300] mb-5">
            // About
          </p>
          <h1 className="font-bebas text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.95] tracking-[0.04em] text-white mb-8">
            A CREATIVE STUDIO <em className="not-italic text-[#ff3300]">BUILT FOR SAAS FOUNDERS</em>
          </h1>

          <section className="space-y-6 text-[0.98rem] leading-[1.85]">
            <p>
              Mint Media House is an independent creative studio based in Mumbai, India. We
              produce UI animations, launch videos, and performance-driven ad creatives for
              SaaS founders who need motion work that converts, not just looks good.
            </p>
            <p>
              Since 2023 we have shipped content for 15+ startups and helped generate over 10
              million organic impressions across X, LinkedIn and YouTube. Our work lives at the
              intersection of product storytelling and motion design — every frame is built
              around a conversion goal, not an aesthetic brief.
            </p>

            <h2 className="font-bebas text-2xl tracking-[0.04em] text-white mt-10">
              What We Believe
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Motion is a conversion tool, not a decoration.</li>
              <li>Founders deserve studio-grade work without the agency overhead.</li>
              <li>Every project ships with measurable outcomes, not vanity metrics.</li>
              <li>Transparency on price, timeline, and scope — from the first reply.</li>
            </ul>

            <h2 className="font-bebas text-2xl tracking-[0.04em] text-white mt-10">
              How We Work
            </h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Discovery call</strong> — understand the product, the launch goal,
                and the channel mix.
              </li>
              <li>
                <strong>Concept & script</strong> — one tight creative direction, not five
                generic options.
              </li>
              <li>
                <strong>Production</strong> — motion, sound and colour built in-house.
              </li>
              <li>
                <strong>Delivery & iteration</strong> — multi-format exports, 2–3 rounds of
                revisions, developer handoff docs.
              </li>
            </ol>

            <h2 className="font-bebas text-2xl tracking-[0.04em] text-white mt-10">
              Based in Mumbai, Working Globally
            </h2>
            <p>
              We work with founders across India, the US, UK and EU on both fixed-price and
              retainer engagements. All collaboration happens async-first over Notion, Figma
              and Loom.
            </p>
            <p>
              Ready to talk?{" "}
              <a href="/#quote" className="text-[#ff3300] underline">
                Request a custom quote
              </a>{" "}
              or{" "}
              <a href="/#book" className="text-[#ff3300] underline">
                book a discovery call
              </a>
              .
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
