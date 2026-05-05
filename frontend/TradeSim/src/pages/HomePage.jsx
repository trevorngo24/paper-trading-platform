import Navbar        from "../components/Navbar";
import Hero          from "../components/Hero";
import AvatarCard    from "../components/AvatarCard";
import BadgeGrid     from "../components/BadgeGrid";
import StreakTracker  from "../components/StreakTracker";
import Footer        from "../components/Footer";
import PixelSky      from "../components/PixelSky";
 
export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      <PixelSky />
      <Navbar />
      <main className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <Hero />
        <section className="flex flex-col md:flex-row gap-6 justify-center items-start mt-4">
          <AvatarCard />
          <div className="flex flex-col gap-4 flex-1">
            <BadgeGrid />
            <StreakTracker />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}