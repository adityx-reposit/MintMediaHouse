import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Work from "@/components/Work";
import LaunchVideos from "@/components/LaunchVideos";
import Growth from "@/components/Growth";
import Testimonials from "@/components/Testimonials";
import Process from "@/components/Process";
import Quote from "@/components/Quote";
import BookCall from "@/components/BookCall";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <>
      <FloatingCTA />
      <Navbar />
      <main className="w-full">
        <Hero />
        <Stats />
        <Marquee />
        <Services />
        <Work />
        <LaunchVideos />
        <Growth />
        <Testimonials />
        <Process />
        <Quote />
        <BookCall />
      </main>
      <Footer />
    </>
  );
}
