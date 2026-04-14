import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Work from "@/components/Work";
import CaseStudies from "@/components/CaseStudies";
import TrustSignals from "@/components/TrustSignals";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import ImprovedLeadForm from "@/components/ImprovedLeadForm";
import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <FloatingCTA />
      <Navbar />
      <main className="w-full">
        <Hero />
        <Stats />
        <Services />
        <Work />
        <CaseStudies />
        <TrustSignals />
        <Pricing />
        <Testimonials />
        <Process />
        <FAQ />
        <ImprovedLeadForm />
      </main>
      <Footer />
    </>
  );
}

