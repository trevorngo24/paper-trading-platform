import { useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import AvatarCard from "./AvatarCard";
import BadgeGrid from "./BadgeGrid";
import StreakTracker from "./StreakTracker";
import Footer from "./Footer";
import PixelSky from "./PixelSky";

export default function HomePage() {
  const [isLoggedIn] = useState(() => !!localStorage.getItem("token"));

  return (
    <div className="min-h-screen relative">
      <PixelSky />
      <Navbar />
      <main className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <Hero />
        {isLoggedIn && (
          <section className="flex flex-col md:flex-row gap-6 justify-center items-start mt-4">
            <AvatarCard />
            <div className="flex flex-col gap-4 flex-1">
              <BadgeGrid />
              <StreakTracker />
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}