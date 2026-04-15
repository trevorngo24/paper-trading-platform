import Navbar from "./Navbar";
import Footer from "./Footer";
import PixelSky from "./PixelSky";
 
export default function PricingPage() {
  return (
    <div className="min-h-screen relative">
      <PixelSky />
      <Navbar />
      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-36 pb-20 text-center">
 
        <p className="font-display text-[#81a6c6] tracking-widest mb-3" style={{ fontSize: "9px" }}>
          ◆ PRICING ◆
        </p>
        <h1 className="font-display text-2xl text-[#f3e3d0] mb-4">SIMPLE PRICING</h1>
        <p className="font-body text-[#d2c4b4] text-base mb-12 max-w-md mx-auto">
          One plan. Everything included. No hidden fees.
        </p>
 
        <div className="bg-[#243447]/80 border border-[#81a6c6] p-10 pixel-card w-full max-w-sm mx-auto mb-12">
          <p className="font-display text-[#aacddc] mb-2" style={{ fontSize: "9px" }}>MONTHLY PLAN</p>
          <p className="font-display text-[#f3e3d0] mb-1" style={{ fontSize: "40px" }}>"$15"</p>
          <p className="font-body text-[#d2c4b4] text-sm mb-6">per month — not a real charge</p>
 
          <div className="flex flex-col gap-3 text-left mb-8">
            {["Access to all Learn modules","Unlimited paper trades","Full quiz and challenge access","Badge and streak tracking","Portfolio analytics"].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <span className="text-[#aacddc]">✓</span>
                <span className="font-body text-[#d2c4b4] text-sm">{feature}</span>
              </div>
            ))}
          </div>
 
          <button
            className="w-full font-display py-3 text-[#1a2a3a] hover:brightness-110 transition-all pixel-card"
            style={{ fontSize: "9px", background: "linear-gradient(90deg, #81a6c6, #aacddc)" }}
          >
            GET STARTED (IT'S FREE)
          </button>
        </div>
 
        <div className="bg-[#243447]/80 border border-[#81a6c6] p-6 pixel-card">
          <p className="font-display text-[#f3e3d0] mb-2" style={{ fontSize: "9px" }}>◆ CONTACT US ◆</p>
          <p className="font-body text-[#d2c4b4] text-sm mb-5">
            Questions, feedback, or just want to say hi? Reach out to either of us anytime.
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-center gap-3">
              <span className="font-body text-[#81a6c6] text-sm">Jasmine Vu</span>
              <a
                href="mailto:jasminevu88@gmail.com"
                className="font-display text-[#aacddc] hover:text-[#f3e3d0] transition-colors underline"
                style={{ fontSize: "10px" }}
              >
                jasminevu88@gmail.com
              </a>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="font-body text-[#81a6c6] text-sm">Trevor Ngo</span>
              <a
                href="mailto:Trevorngo14@gmail.com"
                className="font-display text-[#aacddc] hover:text-[#f3e3d0] transition-colors underline"
                style={{ fontSize: "10px" }}
              >
                Trevorngo14@gmail.com
              </a>
            </div>
          </div>
        </div>
 
      </main>
      <Footer />
    </div>
  );
}