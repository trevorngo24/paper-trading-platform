import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PixelSky from "./PixelSky";
 
// ── Chapter data — replace content with your real lessons later ───────────────
const CHAPTERS = [
  {
    id: 1,
    title: "What Is Paper Trading?",
    content: `Paper trading means practicing buying and selling stocks without using real money. 
    
Instead of risking your savings, you use a simulated account with fake funds. Every trade, every gain, every loss — all real market data, zero real risk.
 
Think of it like a flight simulator for investors. Pilots don't learn to fly by jumping straight into a real plane. You shouldn't learn to invest by gambling your paycheck.
 
Paper trading lets you:
• Test strategies before committing real money
• Learn how markets behave without emotional pressure
• Build confidence and experience over time
• Make mistakes cheaply — and learn from them`,
  },
  {
    id: 2,
    title: "How the Stock Market Works",
    content: `The stock market is a marketplace where buyers and sellers trade ownership in companies.
 
When a company wants to raise money, it sells "shares" of itself to the public. Each share represents a tiny slice of ownership. If the company grows and becomes more valuable, your slice is worth more.
 
Key players:
• Companies — list their shares publicly to raise capital
• Investors — buy shares hoping the company grows
• Stock exchanges — like the NYSE or NASDAQ, where trades happen
• Brokers — the middlemen who execute your buy/sell orders
 
Prices move constantly based on supply and demand. More buyers than sellers = price goes up. More sellers than buyers = price goes down.`,
  },
  {
    id: 3,
    title: "Reading a Stock Quote",
    content: `Every stock has a "ticker" — a short symbol like AAPL for Apple or TSLA for Tesla.
 
When you look up a stock you'll see:
 
Price — the current cost of one share
Change — how much the price moved today (in $ and %)
Volume — how many shares were traded today
Market Cap — total value of the company (price × total shares)
52-Week High/Low — the highest and lowest price in the past year
P/E Ratio — price divided by earnings per share; tells you if a stock is cheap or expensive relative to profits
 
Don't be overwhelmed. Start with price and % change. As you practice, the other numbers will start to make sense naturally.`,
  },
  {
    id: 4,
    title: "Buying and Selling: Order Types",
    content: `When you place a trade, you choose HOW you want to buy or sell. This is called an order type.
 
Market Order
Buy or sell immediately at the current price. Fast, but you get whatever price is available right now. Best for popular stocks where the price is stable.
 
Limit Order
You set the exact price you're willing to pay (or accept when selling). The trade only happens if the market reaches your price. More control, but no guarantee it'll execute.
 
Stop-Loss Order
Automatically sells your stock if the price drops to a level you set. Protects you from catastrophic losses. For example: you buy at $50 and set a stop-loss at $40 — if it drops to $40, it sells automatically.
 
For beginners: start with market orders to keep things simple.`,
  },
  {
    id: 5,
    title: "Your First Paper Trade",
    content: `Let's walk through placing your first simulated trade step by step.
 
1. Pick a company you know
   Start with brands you use every day — Apple, Nike, Netflix. Familiarity helps.
 
2. Look up the stock
   Search the ticker symbol. Note the current price and recent trend.
 
3. Decide how many shares to buy
   With your simulated balance, choose an amount you're comfortable with. 
   Example: If stock is $100/share and you want to spend $500, buy 5 shares.
 
4. Place a market order
   Select "Buy" → enter shares → choose "Market Order" → confirm.
 
5. Watch and learn
   Check in daily. Notice what makes the price go up or down. Read news about the company.
 
6. Sell when you're ready
   Practice selling too — that's when you lock in gains (or cut losses).
 
The goal isn't to make fake money. The goal is to learn the mechanics.`,
  },
  {
    id: 6,
    title: "Understanding Risk",
    content: `Every investment carries risk. Understanding it is what separates good investors from gamblers.
 
What is risk?
Risk is the possibility that your investment loses value. Higher potential return almost always means higher risk.
 
Types of risk:
• Market risk — the whole market drops (2008, 2020)
• Company risk — one company fails (Enron, Blockbuster)  
• Liquidity risk — you can't sell when you want to
• Emotional risk — you panic and make bad decisions
 
The golden rule: never invest money you can't afford to lose.
 
How to manage risk:
• Diversify — don't put all your money in one stock
• Research before buying
• Set stop-loss orders
• Think long term — markets recover
 
Paper trading is the perfect low-risk environment to practice managing risk before real money is on the line.`,
  },
  {
    id: 7,
    title: "Diversification",
    content: `"Don't put all your eggs in one basket." This is the single most important rule in investing.
 
Diversification means spreading your money across different investments so that if one fails, you don't lose everything.
 
Ways to diversify:
• Across companies — own Apple AND Microsoft AND Tesla, not just one
• Across sectors — tech, healthcare, energy, consumer goods
• Across asset types — stocks, bonds, real estate
• Across geography — US companies AND international
 
A simple example:
If you put $1,000 in one stock and it crashes 80%, you lose $800.
If you split $1,000 across 10 stocks and one crashes 80%, you lose $80.
 
Index funds are the easiest way to diversify instantly. They hold hundreds of stocks in one purchase.`,
  },
  {
    id: 8,
    title: "Building Your Strategy",
    content: `Before you trade, you need a plan. Trading without a strategy is just gambling.
 
Questions to answer before every trade:
• Why am I buying this? (What's my thesis?)
• What price would make me sell for profit?
• What price would make me cut my losses?
• How long do I plan to hold this?
 
Common beginner strategies:
 
Buy and Hold
Buy quality companies and hold them for years. Warren Buffett's approach. Simple and historically effective.
 
Dollar-Cost Averaging
Invest a fixed amount every month regardless of price. Removes emotion and smooths out your average cost.
 
Momentum Trading
Buy stocks that are trending upward. Sell before they reverse. Requires more attention and skill.
 
Start with buy and hold while paper trading. Once you understand the basics, explore other strategies.`,
  },
];
 
const STORAGE_KEY = "tradesim_learn_progress";
 
function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved || { currentChapter: 0, completed: [] };
  } catch {
    return { currentChapter: 0, completed: [] };
  }
}
 
function saveProgress(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
 
export default function LearnPage() {
  const navigate   = useNavigate();
  const [progress, setProgress] = useState(loadProgress);
  const [view, setView]         = useState("chapters"); // "chapters" | "reading"
 
  const { currentChapter, completed } = progress;
  const chapter = CHAPTERS[currentChapter];
  const isCompleted = (id) => completed.includes(id);
  const allDone = completed.length === CHAPTERS.length;
 
  const goToChapter = (index) => {
    setProgress(p => {
      const updated = { ...p, currentChapter: index };
      saveProgress(updated);
      return updated;
    });
    setView("reading");
  };
 
  const markComplete = () => {
    setProgress(p => {
      const alreadyDone = p.completed.includes(chapter.id);
      const updated = {
        ...p,
        completed: alreadyDone ? p.completed : [...p.completed, chapter.id],
        currentChapter: Math.min(p.currentChapter + 1, CHAPTERS.length - 1),
      };
      saveProgress(updated);
      return updated;
    });
    // If there's a next chapter, stay in reading view and advance
    if (currentChapter < CHAPTERS.length - 1) {
      setView("reading");
    } else {
      setView("chapters");
    }
  };
 
  const progressPct = Math.round((completed.length / CHAPTERS.length) * 100);
 
  return (
    <div className="min-h-screen relative">
      <PixelSky />
      <Navbar />
 
      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-28 pb-20">
 
        {view === "chapters" ? (
          <>
            {/* ── Header ── */}
            <div className="mb-8">
              <p className="font-display text-[#81a6c6] tracking-widest mb-2" style={{ fontSize: "9px" }}>
                ◆ TRADESIM ACADEMY ◆
              </p>
              <h1 className="font-display text-2xl text-[#f3e3d0] mb-3">
                LEARN TO TRADE
              </h1>
              <p className="font-body text-[#d2c4b4] text-base">
                Work through each chapter at your own pace. Your progress is saved automatically.
              </p>
            </div>
 
            {/* ── Overall progress bar ── */}
            <div className="mb-8 bg-[#243447]/80 border border-[#81a6c6] p-4 pixel-card">
              <div className="flex justify-between items-center mb-2">
                <span className="font-display text-[#f3e3d0]" style={{ fontSize: "9px" }}>
                  YOUR PROGRESS
                </span>
                <span className="font-display text-[#aacddc]" style={{ fontSize: "9px" }}>
                  {completed.length} / {CHAPTERS.length} CHAPTERS
                </span>
              </div>
              <div className="w-full h-3 bg-[#1a2a3a] border border-[#81a6c6] overflow-hidden">
                <div
                  className="h-full transition-all duration-700"
                  style={{
                    width: `${progressPct}%`,
                    background: "linear-gradient(90deg, #81a6c6, #aacddc)",
                  }}
                />
              </div>
              {allDone && (
                <p className="font-display text-[#aacddc] mt-2 text-center" style={{ fontSize: "9px" }}>
                  ✦ ALL CHAPTERS COMPLETE ✦
                </p>
              )}
            </div>
 
            {/* ── Chapter list ── */}
            <div className="flex flex-col gap-3">
              {CHAPTERS.map((ch, idx) => {
                const done    = isCompleted(ch.id);
                const current = idx === currentChapter && !allDone;
                return (
                  <button
                    key={ch.id}
                    onClick={() => goToChapter(idx)}
                    className="text-left p-4 border transition-all duration-200 pixel-card
                               hover:border-[#aacddc] hover:bg-[#aacddc]/5"
                    style={{
                      background: done ? "#243447cc" : "#1a2a3acc",
                      border: current
                        ? "1px solid #aacddc"
                        : done
                        ? "1px solid #81a6c6"
                        : "1px solid #81a6c640",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Chapter number / checkmark */}
                        <div
                          className="w-8 h-8 flex items-center justify-center font-display flex-shrink-0"
                          style={{
                            fontSize: "9px",
                            background: done ? "#aacddc20" : "#1a2a3a",
                            border: `1px solid ${done ? "#aacddc" : "#81a6c640"}`,
                            color: done ? "#aacddc" : "#81a6c6",
                          }}
                        >
                          {done ? "✓" : idx + 1}
                        </div>
                        <div>
                          <p
                            className="font-display"
                            style={{
                              fontSize: "9px",
                              color: done ? "#aacddc" : current ? "#f3e3d0" : "#d2c4b4",
                            }}
                          >
                            CHAPTER {ch.id}
                          </p>
                          <p
                            className="font-body text-sm mt-0.5"
                            style={{ color: done ? "#aacddc" : "#f3e3d0" }}
                          >
                            {ch.title}
                          </p>
                        </div>
                      </div>
                      {current && (
                        <span
                          className="font-display text-[#aacddc] flex-shrink-0"
                          style={{ fontSize: "8px" }}
                        >
                          CONTINUE →
                        </span>
                      )}
                      {!done && !current && (
                        <span
                          className="font-display text-[#81a6c6] flex-shrink-0"
                          style={{ fontSize: "8px" }}
                        >
                          START →
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            {/* ── Reading view ── */}
            <button
              onClick={() => setView("chapters")}
              className="font-display text-[#81a6c6] hover:text-[#aacddc] transition-colors mb-6 flex items-center gap-2"
              style={{ fontSize: "9px" }}
            >
              ← BACK TO CHAPTERS
            </button>
 
            {/* Chapter header */}
            <div className="mb-6">
              <p className="font-display text-[#81a6c6] mb-1" style={{ fontSize: "9px" }}>
                CHAPTER {chapter.id} OF {CHAPTERS.length}
              </p>
              <h2 className="font-display text-xl text-[#f3e3d0]">{chapter.title}</h2>
            </div>
 
            {/* Chapter progress dots */}
            <div className="flex gap-2 mb-8">
              {CHAPTERS.map((_, i) => (
                <div
                  key={i}
                  className="h-1 flex-1"
                  style={{
                    background: isCompleted(CHAPTERS[i].id)
                      ? "#aacddc"
                      : i === currentChapter
                      ? "#81a6c6"
                      : "#81a6c620",
                  }}
                />
              ))}
            </div>
 
            {/* Content */}
            <div
              className="bg-[#243447]/80 border border-[#81a6c6] p-6 mb-6 pixel-card"
            >
              <p
                className="font-body text-[#d2c4b4] leading-relaxed"
                style={{ fontSize: "15px", whiteSpace: "pre-line" }}
              >
                {chapter.content}
              </p>
            </div>
 
            {/* Nav buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  if (currentChapter > 0) {
                    setProgress(p => {
                      const updated = { ...p, currentChapter: p.currentChapter - 1 };
                      saveProgress(updated);
                      return updated;
                    });
                  } else {
                    setView("chapters");
                  }
                }}
                className="font-display px-5 py-2 border border-[#81a6c6] text-[#d2c4b4]
                           hover:border-[#aacddc] hover:text-[#aacddc] transition-all"
                style={{ fontSize: "9px" }}
              >
                ← PREVIOUS
              </button>
 
              <span className="font-display text-[#81a6c6]" style={{ fontSize: "8px" }}>
                {currentChapter + 1} / {CHAPTERS.length}
              </span>
 
              <button
                onClick={markComplete}
                className="font-display px-5 py-2 text-[#1a2a3a] hover:brightness-110
                           transition-all pixel-card"
                style={{
                  fontSize: "9px",
                  background: "linear-gradient(90deg, #81a6c6, #aacddc)",
                }}
              >
                {isCompleted(chapter.id)
                  ? currentChapter < CHAPTERS.length - 1
                    ? "NEXT →"
                    : "FINISH"
                  : currentChapter < CHAPTERS.length - 1
                  ? "COMPLETE & NEXT →"
                  : "COMPLETE ✓"}
              </button>
            </div>
          </>
        )}
      </main>
 
      <Footer />
    </div>
  );
}