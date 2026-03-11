import starImg from "../assets/star.png";
import trophyImg from "../assets/trophy.png";
import bookImg from "../assets/book.png";

export default function BadgeGrid() {
  const updatedBadges = [
    { id: 1, icon: "star",   label: "Achievements Earned", earned: true  },
    { id: 2, icon: "trophy", label: "Bronze Rank",         earned: true  },
    { id: 3, icon: "book",   label: "6 Badges Earned",     earned: true  },
    { id: 4, icon: "🔥",     label: "7-Day Streak",        earned: false },
  ];

  return (
    <div className="bg-[#243447]/80 border border-[#81a6c6] rounded-none p-5 w-full max-w-sm
                    pixel-card backdrop-blur-sm">
      <h3 className="font-display text-xs text-[#f3e3d0] tracking-widest mb-4">🏅 ACHIEVEMENTS</h3>
      <div className="grid grid-cols-2 gap-3">
        {updatedBadges.map((b) => (
          <div key={b.id}
               className={`flex flex-col items-center gap-1 p-3 border text-center
                           transition-all duration-200
                           ${b.earned
                             ? "border-[#aacddc] bg-[#aacddc]/10"
                             : "border-[#81a6c6]/30 bg-[#1a2a3a]/50 opacity-40 grayscale"}`}>
            {b.icon === "star"
              ? <img
                  src={starImg}
                  alt="star"
                  className="w-8 h-8"
                  style={{ imageRendering: "pixelated" }}
                />
              : b.icon === "trophy"
              ? <img
                  src={trophyImg}
                  alt="trophy"
                  className="w-8 h-8"
                  style={{ imageRendering: "pixelated" }}
                />
              : b.icon === "book"
              ? <img
                  src={bookImg}
                  alt="book"
                  className="w-8 h-8"
                  style={{ imageRendering: "pixelated" }}
                />
              : <span className="text-2xl">{b.icon}</span>
            }
            <span className="text-xs font-body text-[#d2c4b4] leading-tight">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}