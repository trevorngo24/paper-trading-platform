import { mockUser } from "../data/mockUser";

export default function BadgeGrid() {
  return (
    <div className="bg-[#243447]/80 border border-[#81a6c6] rounded-none p-5 w-full max-w-sm
                    pixel-card backdrop-blur-sm">
      <h3 className="font-display text-xs text-[#f3e3d0] tracking-widest mb-4">🏅 ACHIEVEMENTS</h3>
      <div className="grid grid-cols-3 gap-3">
        {mockUser.badges.map((b) => (
          <div key={b.id}
               className={`flex flex-col items-center gap-1 p-3 border text-center
                           transition-all duration-200
                           ${b.earned
                             ? "border-[#aacddc] bg-[#aacddc]/10"
                             : "border-[#81a6c6]/30 bg-[#1a2a3a]/50 opacity-40 grayscale"}`}>
            <span className="text-2xl">{b.icon}</span>
            <span className="text-xs font-body text-[#d2c4b4] leading-tight">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}