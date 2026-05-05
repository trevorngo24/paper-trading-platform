import Navbar from "./Navbar";
import Footer from "./Footer";
import PixelSky from "./PixelSky";
 
const sections = [
  {
    id: 1,
    emoji: "🌱",
    heading: "Why Invest?",
    body: `Most people work hard for their money — but few make their money work hard for them.
 
Investing is how you break that cycle. When you invest, you put your money into assets that grow over time — stocks, bonds, index funds — so that your wealth compounds even while you sleep.
 
The average savings account pays less than 1% interest per year. Inflation runs at roughly 3%. That means doing nothing is quietly costing you. Every year you wait, your purchasing power shrinks.
 
The stock market, by contrast, has returned an average of ~10% per year over the past century. Invested consistently over decades, even modest amounts can grow into life-changing wealth.
 
Investing isn't just for the rich. It's how ordinary people become financially free.`,
  },

  {
    id: 2,
    emoji: "🎮",
    heading: "What Is TradeSim?",
    body: `TradeSim is a gamified paper trading platform built to make investing education accessible, engaging, and risk-free.
 
Paper trading means simulating real trades with fake money — so you can learn exactly how markets work without the fear of losing your savings. You get the full experience: buying stocks, watching prices move, managing a portfolio, reacting to market events — all consequence-free.
 
We pair that with structured learning modules that walk you through investing fundamentals from the ground up. No finance degree required. No jargon-heavy textbooks. Just clear, practical knowledge delivered in a format that respects your time.
 
As you learn and trade, you earn XP, unlock badges, and level up your trader rank — because we believe the learning process itself should be rewarding.
 
Our goal is simple: by the time you're ready to invest real money, you've already done it hundreds of times in simulation. The first real trade shouldn't feel scary. It should feel familiar.
 
TradeSim lowers the barrier to entry. We believe everyone deserves access to the financial literacy that changes lives.`,
  },
];
 
const team = [
  {
    name: "Jasmine Vu",
    role: "Frontend Developer & Co-Founder",
    emoji: "🐰",
    bio: `Hi, I'm Jasmine — the UI/UX developer behind TradeSim. Growing up, my dad instilled in me the importance of investing early: max your Roth IRA, save consistently, understand the market. Those lessons shaped habits I carry to this day. As a woman in finance and tech, I noticed how often other women felt too intimidated to even start learning about investing. TradeSim was built to change that — making concepts simple, learning fun, and the barrier to entry much, much lower."`,
  },
  {
    name: "Trevor Ngo",
    role: "Backend Developer & Co-Founder",
    emoji: "🦊",
    bio: `Hi, I’m Trevor — the backend developer behind TradeSim. Growing up, I saw how confusing investing could be for people around me, and how easy it was to make costly mistakes without the right knowledge. That stuck with me. As I got deeper into tech, I became interested in building systems that could simplify complex problems and make them more accessible to everyone. TradeSim was built as a response to that — creating a safe space where people can learn, experiment, and build confidence in investing before putting real money on the line.'`,
  },
];
 
export default function HowItWorksPage() {
  return (
    <div className="min-h-screen relative">
      <PixelSky />
      <Navbar />
 
      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-28 pb-20">
 
        {/* ── Hero ── */}
        <div className="mb-14 text-center">
          <p className="font-display text-[#81a6c6] tracking-widest mb-3" style={{ fontSize: "9px" }}>
            ◆ HOW IT WORKS ◆
          </p>
          <h1 className="font-display text-2xl text-[#f3e3d0] mb-4">
            INVESTING, EXPLAINED.
          </h1>
          <p className="font-body text-[#d2c4b4] text-base max-w-xl mx-auto">
            Everything you need to understand why investing matters, what the risks are, and how TradeSim helps you navigate it all.
          </p>
        </div>
 
        {/* ── Content sections ── */}
        <div className="flex flex-col gap-8 mb-20">
          {sections.map((s) => (
            <div
              key={s.id}
              className="bg-[#243447]/80 border border-[#81a6c6] p-6 pixel-card"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{s.emoji}</span>
                <h2 className="font-display text-[#f3e3d0]" style={{ fontSize: "11px" }}>
                  {s.heading}
                </h2>
              </div>
              <p
                className="font-body text-[#d2c4b4] leading-relaxed"
                style={{ fontSize: "14px", whiteSpace: "pre-line" }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>
 
        {/* ── About the team ── */}
        <div className="mb-8 text-center">
          <p className="font-display text-[#81a6c6] tracking-widest mb-2" style={{ fontSize: "9px" }}>
            ◆ ABOUT THE TEAM ◆
          </p>
          <h2 className="font-display text-xl text-[#f3e3d0] mb-3">WHO BUILT THIS</h2>
          <p className="font-body text-[#d2c4b4] text-sm">
            TradeSim was created by two CSUF students who wanted to make investing less intimidating.
          </p>
        </div>
 
        <div className="flex flex-col gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-[#243447]/80 border border-[#81a6c6] p-6 pixel-card"
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-14 h-14 flex items-center justify-center text-3xl border border-[#81a6c6] flex-shrink-0"
                  style={{ background: "#1a2a3a" }}
                >
                  {member.emoji}
                </div>
                <div>
                  <p className="font-display text-[#f3e3d0]" style={{ fontSize: "10px" }}>
                    {member.name}
                  </p>
                  <p className="font-body text-[#aacddc] text-sm mt-0.5">{member.role}</p>
                </div>
              </div>
              <p
                className="font-body text-[#d2c4b4] leading-relaxed"
                style={{ fontSize: "14px", whiteSpace: "pre-line" }}
              >
                {member.bio}
              </p>
            </div>
          ))}
        </div>
 
      </main>
 
      <Footer />
    </div>
  );
}
 