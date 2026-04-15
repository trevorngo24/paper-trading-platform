import { useNavigate } from "react-router-dom";
 
export default function Hero() {
  const navigate = useNavigate();
 
  return (
    <section className="text-center pt-40 pb-16 fade-up">
      <p className="font-body text-[#aacddc] text-sm tracking-[0.3em] mb-4 uppercase">
        ⭐ Level Up Your Trading Skills ⭐
      </p>
      <h1 className="font-display text-3xl md:text-5xl font-black text-[#f3e3d0] leading-tight mb-4">
        TRADE<span className="text-[#aacddc]">SIM</span>
      </h1>
      <p className="mt-5 text-[#d2c4b4] font-body text-xl max-w-lg mx-auto leading-relaxed">
        Learn markets, practice strategies, and earn badges. No real money at risk.
      </p>
      <div className="mt-8 flex justify-center gap-4 flex-wrap">
        <button
          onClick={() => navigate("/learn")}
          className="font-body text-base px-8 py-3
                     bg-[#aacddc] text-[#1a2a3a] font-bold hover:brightness-110
                     transition-all duration-200 pulse-border pixel-card"
        >
          ▶ START FOR FREE
        </button>
        <button
          onClick={() => navigate("/howitworks")}
          className="font-body text-base px-8 py-3
                     border-2 border-[#81a6c6] text-[#f3e3d0]
                     hover:border-[#aacddc] hover:text-[#aacddc]
                     transition-all duration-200 pixel-card"
        >
          ? HOW IT WORKS
        </button>
      </div>
    </section>
  );
}