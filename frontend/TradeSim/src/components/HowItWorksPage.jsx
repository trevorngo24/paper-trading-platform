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
    emoji: "⚠️",
    heading: "The Dangers & Risks",
    body: `Investing is powerful — and that means it can go wrong.
 
Markets go down. Companies fail. Economic crises wipe out portfolios overnight. In 2008, the S&P 500 dropped 57%. In March 2020, it fell 34% in a matter of weeks. Anyone who panicked and sold locked in catastrophic losses.
 
The biggest dangers for new investors:
 
• Emotional trading — buying high out of excitement, selling low out of fear
• Over-concentration — putting everything into one stock or sector
• No plan — trading without a strategy is just gambling
• Ignoring fees — small percentages compound into massive losses over time
• Investing money you need soon — markets can stay down for years
 
Risk is real. But risk is also manageable. Education, patience, and diversification are your best defenses. The investors who lose the most are usually the ones who understood the least before they started.
 
That's exactly why TradeSim exists.`,
  },
  {
    id: 3,
    emoji: "📈",
    heading: "Scalability & Long-Term Thinking",
    body: `The most powerful force in investing isn't picking the right stock — it's time.
 
Compound interest means your returns generate their own returns. $1,000 invested at 10% annually becomes $2,594 in 10 years. In 30 years, it's $17,449. In 40 years, $45,259. You didn't add a single extra dollar.
 
This is why starting early matters more than starting big. A 22-year-old investing $200/month will almost always out-earn a 35-year-old investing $500/month — even though they contribute far less in total.
 
Scalability works the other way too. As your income grows, you scale your contributions. As your knowledge grows, you refine your strategy. As your portfolio grows, it generates returns that dwarf what you put in.
 
The barrier isn't money. It's knowledge and confidence. Most people never start because they don't know where to begin — and the financial industry hasn't made it easy to learn.
 
We built TradeSim to change that.`,
  },
  {
    id: 4,
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
    bio: `Trevor powers the engine behind TradeSim — building the APIs, authentication systems, and data infrastructure that make the platform run.
 
His background is in systems and logic, but his interest in this project runs deeper than code. He watched people around him make costly financial mistakes that better education could have prevented.
 
TradeSim is his answer to that problem: give people a safe environment to experiment, fail, learn, and grow — before real money is ever on the line.
 
"The best time to make your mistakes is when they don't cost you anything."`,
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
 