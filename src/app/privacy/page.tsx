import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Mint Media House collects, uses, and protects the information you share when requesting a quote, booking a call, or browsing the site.",
  alternates: { canonical: "https://mintmediahouse.in/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0a0a0a] min-h-screen px-[5vw] pt-[140px] pb-24">
        <article className="max-w-3xl mx-auto text-[#cfcfcf]">
          <h1 className="font-bebas text-[clamp(2.6rem,6vw,4.5rem)] leading-[0.95] tracking-[0.04em] text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-xs uppercase tracking-[0.2em] text-[#888] mb-12">
            Last updated: April 16, 2026
          </p>

          <section className="space-y-6 text-[0.95rem] leading-[1.8]">
            <p>
              Mint Media House (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates{" "}
              <a href="https://mintmediahouse.in" className="text-[#ff3300] underline">
                mintmediahouse.in
              </a>{" "}
              (the &ldquo;Site&rdquo;). This policy explains what personal data we collect, how we
              use it, and the rights you have over that data.
            </p>

            <h2 className="font-bebas text-2xl tracking-[0.04em] text-white mt-10">
              1. Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Quote form data</strong>: name, email, company, service of interest,
                budget, project brief.
              </li>
              <li>
                <strong>Booking data</strong>: when you book a call via our embedded Cal.com
                widget, Cal.com receives your name, email, and chosen time.
              </li>
              <li>
                <strong>Analytics</strong>: aggregated, non-identifying usage data via Vercel
                Analytics and Vercel Speed Insights (page views, referrers, device type, Core
                Web Vitals).
              </li>
            </ul>

            <h2 className="font-bebas text-2xl tracking-[0.04em] text-white mt-10">
              2. How We Use It
            </h2>
            <p>
              We use the information you submit solely to respond to your enquiry, prepare quotes,
              deliver contracted work, and send invoices. We do not sell or rent your data. We do
              not use it for third-party advertising.
            </p>

            <h2 className="font-bebas text-2xl tracking-[0.04em] text-white mt-10">
              3. Email
            </h2>
            <p>
              Quote-form submissions are delivered to{" "}
              <a href="mailto:hello@mintmediahouse.in" className="text-[#ff3300] underline">
                hello@mintmediahouse.in
              </a>
              . We store them in our mailbox until the enquiry is resolved plus a reasonable
              retention window for accounting and tax compliance.
            </p>

            <h2 className="font-bebas text-2xl tracking-[0.04em] text-white mt-10">
              4. Third-Party Services
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Vercel — hosting, analytics, Speed Insights</li>
              <li>Cal.com — call booking widget</li>
              <li>Google Fonts — web font delivery</li>
            </ul>
            <p>
              Each of these processes data under their own privacy policies. We do not share
              additional personal information with them beyond what is strictly necessary for the
              service to function.
            </p>

            <h2 className="font-bebas text-2xl tracking-[0.04em] text-white mt-10">
              5. Cookies
            </h2>
            <p>
              The Site uses strictly-necessary cookies only. We do not run advertising pixels or
              cross-site trackers.
            </p>

            <h2 className="font-bebas text-2xl tracking-[0.04em] text-white mt-10">
              6. Your Rights
            </h2>
            <p>
              You may request access to, correction of, or deletion of any personal data we hold
              about you at any time by emailing{" "}
              <a href="mailto:hello@mintmediahouse.in" className="text-[#ff3300] underline">
                hello@mintmediahouse.in
              </a>
              . We respond within 30 days.
            </p>

            <h2 className="font-bebas text-2xl tracking-[0.04em] text-white mt-10">
              7. Contact
            </h2>
            <p>
              Mint Media House &middot; Mumbai, India &middot;{" "}
              <a href="mailto:hello@mintmediahouse.in" className="text-[#ff3300] underline">
                hello@mintmediahouse.in
              </a>
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
