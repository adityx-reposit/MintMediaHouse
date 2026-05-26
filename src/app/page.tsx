import Navbar from "@/components/Navbar";
import CinematicHero from "@/components/CinematicHero";
import Stats from "@/components/Stats";
import VideoGrid from "@/components/VideoGrid";
import BookCall from "@/components/BookCall";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="work" className="w-full">
        <CinematicHero />
        <Stats />
        <VideoGrid />
        <BookCall />
      </main>
    </>
  );
}
