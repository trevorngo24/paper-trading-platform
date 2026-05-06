import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import PixelSky from "./PixelSky";
import AvatarCard from "./AvatarCard";
import BadgeGrid from "./BadgeGrid";
import StreakTracker from "./StreakTracker";
import Footer from "./Footer";

const API_BASE = "http://localhost:8000";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [portfolio, setPortfolio] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [trades, setTrades] = useState([]);

  useEffect(() => {

  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;

  }

  fetch(API_BASE + "/me", {

    headers: { Authorization: "Bearer " + token },
  })
    .then((res) => {

      if (!res.ok) {

        localStorage.removeItem("token");

        localStorage.removeItem("username");

        navigate("/login");

        return null;

      }

      return res.json();

    })

    .then((data) => {

      if (data) setUser(data);
    });
  fetch(API_BASE + "/portfolio", {
    headers: { Authorization: "Bearer " + token },

  })
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      if (data) setPortfolio(data);

    });

  fetch(API_BASE + "/holdings", {
    headers: { Authorization: "Bearer " + token },
  })
    .then((res) => (res.ok ? res.json() : []))
    .then((data) => setHoldings(data));
  fetch(API_BASE + "/trades", {
    headers: { Authorization: "Bearer " + token },
  })
    .then((res) => (res.ok ? res.json() : []))
    .then((data) => setTrades(data));
}, []);
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  }

  if (!user) return (
    <div className="min-h-screen relative">
      <PixelSky />
      <Navbar />
      <p className="relative z-10 text-center text-[#d2c4b4] pt-40 font-display tracking-widest" style={{ fontSize: "10px" }}>
        LOADING...
      </p>
    </div>
  );

  return (
    <div className="min-h-screen relative">
      <PixelSky />
      <Navbar />
      <main className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <div className="text-center pt-36 mb-10">
          <p className="font-display text-[#81a6c6] tracking-widest mb-2" style={{ fontSize: "9px" }}>
            ◆ WELCOME BACK ◆
          </p>
          <h1 className="font-display text-3xl text-[#f3e3d0]">
            {user.username.toUpperCase()}
          </h1>
          <button
            onClick={handleLogout}
            style={{ fontSize: "9px" }}
            className="font-display text-[#81a6c6] tracking-widest mt-4 hover:text-red-400 transition-colors"
          >
            LOGOUT →
          </button>
        </div>

        <section className="flex flex-col md:flex-row gap-6 justify-center items-start mt-4">
          <AvatarCard />
          <div className="flex flex-col gap-4 flex-1">
            <BadgeGrid />
            <StreakTracker />
          </div>
        </section>
        <div className="mt-10 grid md:grid-cols-3 gap-6">

  <div className="bg-[#243447]/80 border border-[#81a6c6] p-6 pixel-card">

    <p className="font-display text-[#81a6c6] mb-2" style={{ fontSize: "9px" }}>

      CASH BALANCE

    </p>

    <h2 className="font-display text-2xl text-[#f3e3d0]">

      ${portfolio?.cash_balance?.toFixed(2) || "0.00"}

    </h2>

  </div>

  <div className="bg-[#243447]/80 border border-[#81a6c6] p-6 pixel-card">

    <p className="font-display text-[#81a6c6] mb-2" style={{ fontSize: "9px" }}>

      HOLDINGS

    </p>

    {holdings.length === 0 ? (

      <p className="text-[#d2c4b4]">No holdings yet</p>

    ) : (

      holdings.map((holding, index) => (

        <div key={index} className="flex justify-between text-[#f3e3d0] mb-2">

          <span>{holding.symbol}</span>

          <span>{holding.quantity} shares</span>

        </div>

      ))

    )}

  </div>

  <div className="bg-[#243447]/80 border border-[#81a6c6] p-6 pixel-card">

    <p className="font-display text-[#81a6c6] mb-2" style={{ fontSize: "9px" }}>

      RECENT TRADES

    </p>

    {trades.length === 0 ? (

      <p className="text-[#d2c4b4]">No trades yet</p>

    ) : (

      trades.slice(0, 5).map((trade, index) => (

        <div key={index} className="mb-2 text-[#f3e3d0]">

          {trade.trade_type.toUpperCase()} {trade.quantity} {trade.symbol}

        </div>

      ))

    )}

  </div>

</div>
      </main>
      <Footer />
    </div>
  );
}