import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Join the Waitlist — Self Growth Channel",
  description:
    "Create a premium self-growth personal brand with high-performing content strategies across social platforms. Join the Mint Media House waitlist.",
  alternates: {
    canonical: "https://mintmediahouse.in/waitlist",
  },
  robots: { index: true, follow: true },
};

export default function WaitlistPage() {
  return (
    <>
      <Navbar />
      <main className="w-full pt-[80px]">
        <WaitlistForm />
      </main>
      <Footer />
    </>
  );
}
