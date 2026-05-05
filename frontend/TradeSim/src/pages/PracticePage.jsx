import PixelSky from "../components/PixelSky";
import Navbar   from "../components/Navbar";
import Footer   from "../components/Footer";
 
export default function PracticePage() {
  return (
    <div className="min-h-screen relative">
      <PixelSky />
      <Navbar />
      <main className="relative z-10 max-w-5xl mx-auto px-4 pt-36 pb-20 text-center">
        <p className="font-display text-[#81a6c6] tracking-widest mb-4" style={{ fontSize: "9px" }}>
          ◆ COMING SOON ◆
        </p>
        <h1 className="font-display text-3xl text-[#f3e3d0] mb-4">PRACTICE</h1>
        <p className="font-body text-[#d2c4b4] text-base max-w-md mx-auto">
          Paper trading simulator coming soon. Complete Learn modules to unlock!
        </p>
      </main>
      <Footer />
    </div>
  );
}