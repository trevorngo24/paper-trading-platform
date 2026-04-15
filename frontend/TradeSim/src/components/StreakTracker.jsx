import { mockUser } from "../data/mockUser";
import fireImg from "../assets/fire.png";
 
const days = ["M", "T", "W", "T", "F", "S", "S"];
 
export default function StreakTracker() {
  return (
    <div className="bg-[#243447]/80 border border-[#81a6c6] rounded-none p-5 w-full max-w-sm
                    pixel-card backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <img src={fireImg} alt="streak fire" className="w-6 h-6" style={{ imageRendering: "pixelated" }} />
        <h3 className="font-display text-xs text-[#f3e3d0] tracking-widest">
          {mockUser.streak}-DAY STREAK
        </h3>
      </div>
      <div className="flex gap-2 justify-between">
        {days.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className={`w-9 h-9 flex items-center justify-center border transition-all duration-200
                             ${i < mockUser.streak
                               ? "border-[#aacddc] bg-[#aacddc]/20"
                               : "border-[#81a6c6]/30 bg-[#1a2a3a]/50"}`}>
              {i < mockUser.streak
                ? <img src={fireImg} alt="fire" className="w-7 h-7" style={{ imageRendering: "pixelated" }} />
                : <span className="text-[#81a6c6] text-sm">○</span>}
            </div>
            <span className="text-xs text-[#d2c4b4] font-body">{d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}