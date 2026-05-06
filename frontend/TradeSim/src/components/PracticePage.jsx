import { useState, useEffect } from "react";
import PixelSky from "./PixelSky";
import Navbar from "./Navbar";
import Footer from "./Footer";

const FINNHUB_KEY = "d7t8u1hr01qugn09q5tgd7t8u1hr01qugn09q5u0";
const API_BASE = "http://localhost:8000";

function authHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
}

export default function PracticePage() {
  const [query, setQuery] = useState("");
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [tradeQty, setTradeQty] = useState(1);
  const [tradeMsg, setTradeMsg] = useState("");
  const [tradeLoading, setTradeLoading] = useState(false);

  const [holdings, setHoldings] = useState([]);
  const [trades, setTrades] = useState([]);
  const [portfolio, setPortfolio] = useState(null);

  const [activeTab, setActiveTab] = useState("search");

  useEffect(() => {
    fetchPortfolio();
    fetchHoldings();
    fetchTrades();
  }, []);

  async function fetchPortfolio() {
    try {
      const res = await fetch(API_BASE + "/portfolio", { headers: authHeaders() });
      if (res.ok) setPortfolio(await res.json());
    } catch {}
  }

  async function fetchHoldings() {
    try {
      const res = await fetch(API_BASE + "/holdings", { headers: authHeaders() });
      if (res.ok) setHoldings(await res.json());
    } catch {}
  }

  async function fetchTrades() {
    try {
      const res = await fetch(API_BASE + "/trades", { headers: authHeaders() });
      if (res.ok) setTrades(await res.json());
    } catch {}
  }

  async function searchStock(e) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setStockData(null);
    setTradeMsg("");

    const ticker = query.trim().toUpperCase();
    try {
      const [quoteRes, profileRes] = await Promise.all([
        fetch("https://finnhub.io/api/v1/quote?symbol=" + ticker + "&token=" + FINNHUB_KEY),
        fetch("https://finnhub.io/api/v1/stock/profile2?symbol=" + ticker + "&token=" + FINNHUB_KEY),
      ]);
      const quote = await quoteRes.json();
      const profile = await profileRes.json();

      if (!quote.c || quote.c === 0) {
        setError("Ticker not found. Try AAPL, TSLA, MSFT...");
        return;
      }

      setStockData({
        ticker,
        name: profile.name || ticker,
        price: quote.c,
        prevClose: quote.pc,
        change: (quote.c - quote.pc).toFixed(2),
        changePct: (((quote.c - quote.pc) / quote.pc) * 100).toFixed(2),
        exchange: profile.exchange || "",
      });
    } catch {
      setError("Failed to fetch. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleBuy() {
    if (!stockData || tradeQty < 1) return;
    setTradeLoading(true);
    setTradeMsg("");
    try {
      const res = await fetch(API_BASE + "/trade/buy", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ symbol: stockData.ticker, quantity: Number(tradeQty) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setTradeMsg("✕ " + (data.detail || "Buy failed"));
      } else {
        setTradeMsg("✓ Bought " + tradeQty + " share(s) of " + stockData.ticker);
        fetchPortfolio();
        fetchHoldings();
        fetchTrades();
      }
    } catch {
      setTradeMsg("✕ Request failed");
    } finally {
      setTradeLoading(false);
    }
  }

  async function handleSell() {
    if (!stockData || tradeQty < 1) return;
    setTradeLoading(true);
    setTradeMsg("");
    try {
      const res = await fetch(API_BASE + "/trade/sell", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ symbol: stockData.ticker, quantity: Number(tradeQty) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setTradeMsg("✕ " + (data.detail || "Sell failed"));
      } else {
        setTradeMsg("✓ Sold " + tradeQty + " share(s) of " + stockData.ticker);
        fetchPortfolio();
        fetchHoldings();
        fetchTrades();
      }
    } catch {
      setTradeMsg("✕ Request failed");
    } finally {
      setTradeLoading(false);
    }
  }

  const isPositive = stockData && parseFloat(stockData.change) >= 0;

  return (
    <div className="min-h-screen relative">
      <PixelSky />
      <Navbar />
      <main className="relative z-10 max-w-5xl mx-auto px-4 pt-36 pb-20">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-display text-[#81a6c6] tracking-widest mb-2" style={{ fontSize: "9px" }}>
            ◆ PRACTICE MODE ◆
          </p>
          <h1 className="font-display text-3xl text-[#f3e3d0] mb-2">PRACTICE</h1>
          {portfolio && (
            <p className="font-body text-[#d2c4b4] text-sm">
              Cash Balance:{" "}
              <span className="font-display text-[#f3e3d0] tracking-widest">
                ${portfolio.cash_balance.toFixed(2)}
              </span>
            </p>
          )}
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-6 mb-10">
          {["search", "holdings", "trades"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{ fontSize: "9px" }}
              className={
                "font-display tracking-widest pb-1 transition-colors " +
                (activeTab === tab
                  ? "text-[#f3e3d0] border-b border-[#f3e3d0]"
                  : "text-[#81a6c6] hover:text-[#f3e3d0]")
              }
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Search Tab */}
        {activeTab === "search" && (
          <div className="max-w-sm mx-auto">
            <form onSubmit={searchStock} className="flex items-center gap-2 mb-8">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. AAPL"
                style={{ fontSize: "12px" }}
                className="flex-1 bg-transparent border border-[#81a6c6] text-[#f3e3d0] font-display tracking-widest px-4 py-2 outline-none placeholder-[#d2c4b4] focus:border-[#f3e3d0] transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                style={{ fontSize: "10px" }}
                className="border border-[#81a6c6] text-[#81a6c6] font-display tracking-widest px-4 py-2 hover:bg-[#81a6c6] hover:text-[#0a0a0a] transition-colors disabled:opacity-40"
              >
                {loading ? "..." : "SEARCH"}
              </button>
            </form>

            {error && (
              <p className="font-body text-red-400 text-xs mb-6 text-center">{error}</p>
            )}

            {stockData && (
              <div className="border border-[#81a6c6] px-6 py-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-display text-[#f3e3d0] tracking-widest" style={{ fontSize: "20px" }}>
                      {stockData.ticker}
                    </p>
                    <p className="font-body text-[#d2c4b4] text-xs mt-0.5">{stockData.name}</p>
                  </div>
                  <span className="font-display text-[#81a6c6] tracking-widest" style={{ fontSize: "8px" }}>
                    {stockData.exchange}
                  </span>
                </div>

                <p className="font-display text-[#f3e3d0] mb-1" style={{ fontSize: "32px" }}>
                  ${stockData.price.toFixed(2)}
                </p>

                <p
                  className="font-display tracking-widest mb-4"
                  style={{ fontSize: "11px", color: isPositive ? "#4ade80" : "#f87171" }}
                >
                  {isPositive ? "▲" : "▼"} {stockData.change} ({stockData.changePct}%)
                </p>

                <div className="flex justify-between mb-6">
                  <span className="font-body text-[#d2c4b4] text-xs" style={{ opacity: 0.6 }}>PREV CLOSE</span>
                  <span className="font-display text-[#f3e3d0] text-xs tracking-widest">
                    ${stockData.prevClose.toFixed(2)}
                  </span>
                </div>

                <div className="border-t border-[#81a6c6] mb-6" style={{ opacity: 0.2 }} />

                {/* Trade Controls */}
                <div className="flex items-center gap-2 mb-4">
                  <label className="font-display text-[#81a6c6] tracking-widest" style={{ fontSize: "9px" }}>
                    QTY
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={tradeQty}
                    onChange={(e) => setTradeQty(e.target.value)}
                    style={{ fontSize: "12px" }}
                    className="w-20 bg-transparent border border-[#81a6c6] text-[#f3e3d0] font-display tracking-widest px-3 py-1 outline-none text-center"
                  />
                  <span className="font-body text-[#d2c4b4] text-xs" style={{ opacity: 0.6 }}>
                    ≈ ${(stockData.price * tradeQty).toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleBuy}
                    disabled={tradeLoading}
                    style={{ fontSize: "10px" }}
                    className="flex-1 border border-green-400 text-green-400 font-display tracking-widest py-2 hover:bg-green-400 hover:text-[#0a0a0a] transition-colors disabled:opacity-40"
                  >
                    BUY
                  </button>
                  <button
                    onClick={handleSell}
                    disabled={tradeLoading}
                    style={{ fontSize: "10px" }}
                    className="flex-1 border border-red-400 text-red-400 font-display tracking-widest py-2 hover:bg-red-400 hover:text-[#0a0a0a] transition-colors disabled:opacity-40"
                  >
                    SELL
                  </button>
                </div>

                {tradeMsg && (
                  <p
                    className="font-body text-xs mt-3 text-center"
                    style={{ color: tradeMsg.startsWith("✓") ? "#4ade80" : "#f87171" }}
                  >
                    {tradeMsg}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Holdings Tab */}
        {activeTab === "holdings" && (
          <div className="max-w-sm mx-auto">
            <p className="font-display text-[#81a6c6] tracking-widest mb-6 text-center" style={{ fontSize: "9px" }}>
              ◆ YOUR HOLDINGS ◆
            </p>
            {holdings.length === 0 ? (
              <p className="font-body text-[#d2c4b4] text-xs text-center" style={{ opacity: 0.5 }}>
                No holdings yet. Buy some stocks!
              </p>
            ) : (
              <div className="border border-[#81a6c6] divide-y" style={{ borderColor: "rgba(129,166,198,0.3)" }}>
                {holdings.map((h) => (
                  <div key={h.symbol} className="flex justify-between items-center px-5 py-3">
                    <span className="font-display text-[#f3e3d0] tracking-widest" style={{ fontSize: "13px" }}>
                      {h.symbol}
                    </span>
                    <span className="font-body text-[#d2c4b4] text-xs">
                      {h.quantity} share{h.quantity !== 1 ? "s" : ""}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Trades Tab */}
        {activeTab === "trades" && (
          <div className="max-w-lg mx-auto">
            <p className="font-display text-[#81a6c6] tracking-widest mb-6 text-center" style={{ fontSize: "9px" }}>
              ◆ TRADE HISTORY ◆
            </p>
            {trades.length === 0 ? (
              <p className="font-body text-[#d2c4b4] text-xs text-center" style={{ opacity: 0.5 }}>
                No trades yet.
              </p>
            ) : (
              <div className="border border-[#81a6c6] divide-y" style={{ borderColor: "rgba(129,166,198,0.3)" }}>
                <div className="flex px-5 py-2" style={{ opacity: 0.4 }}>
                  {["SYMBOL", "TYPE", "QTY", "PRICE"].map((h) => (
                    <span key={h} className="font-display text-[#81a6c6] tracking-widest flex-1" style={{ fontSize: "8px" }}>
                      {h}
                    </span>
                  ))}
                </div>
                {[...trades].reverse().map((t, i) => (
                  <div key={i} className="flex items-center px-5 py-3">
                    <span className="font-display text-[#f3e3d0] tracking-widest flex-1" style={{ fontSize: "12px" }}>
                      {t.symbol}
                    </span>
                    <span
                      className="font-display tracking-widest flex-1"
                      style={{ fontSize: "9px", color: t.trade_type === "buy" ? "#4ade80" : "#f87171" }}
                    >
                      {t.trade_type.toUpperCase()}
                    </span>
                    <span className="font-body text-[#d2c4b4] text-xs flex-1">{t.quantity}</span>
                    <span className="font-body text-[#d2c4b4] text-xs flex-1">${t.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}