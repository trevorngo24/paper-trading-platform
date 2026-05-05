import PixelSky from "../components/PixelSky";
import Navbar   from "../components/Navbar";
import Footer   from "../components/Footer";
 
export default function PricingPage() {
  return (
    <div className="min-h-screen relative">
      <PixelSky />
      <Navbar />
      <main className="relative z-10 max-w-5xl mx-auto px-4 pt-36 pb-20 text-center">
        <p className="font-display text-[#81a6c6] tracking-widest mb-4" style={{ fontSize: "9px" }}>
          ◆ PRICING ◆
        </p>
        <h1 className="font-display text-3xl text-[#f3e3d0] mb-4">ALWAYS FREE</h1>
        <p className="font-body text-[#d2c4b4] text-base max-w-md mx-auto">
          TradeSim is a free course project. All features are available at no cost.
        </p>
        <div
          className="mt-10 inline-block px-10 py-6 pixel-card"
          style={{ border: "1px solid #aacddc", background: "#aacddc15" }}
        >
          <p className="font-display text-[#aacddc] text-2xl">$0</p>
          <p className="font-body text-[#d2c4b4] mt-2">Forever free.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}