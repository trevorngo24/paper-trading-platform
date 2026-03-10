import { mockUser } from "../data/mockUser";

const days = ["M", "T", "W", "T", "F", "S", "S"];

export default function StreakTracker() {
  return (
    <div className="bg-[#243447]/80 border border-[#81a6c6] rounded-none p-5 w-full max-w-sm
                    pixel-card backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[#f3e3d0]">🔥</span>
        <h3 className="font-display text-xs text-[#f3e3d0] tracking-widest">
          {mockUser.streak}-DAY STREAK
        </h3>
      </div>
      <div className="flex gap-2 justify-between">
        {days.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className={`w-9 h-9 flex items-center justify-center text-base border
                             transition-all duration-200
                             ${i < mockUser.streak
                               ? "border-[#aacddc] bg-[#aacddc]/20 text-[#f3e3d0]"
                               : "border-[#81a6c6]/30 bg-[#1a2a3a]/50 text-[#81a6c6]"}`}>
              {i < mockUser.streak ? "🔥" : "○"}
            </div>
            <span className="text-xs text-[#d2c4b4] font-body">{d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}