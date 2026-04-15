import { mockUser } from "../data/mockUser";
import avatar from "../assets/avatar.png";
 
export default function AvatarCard() {
  const { username, level, xp, xpToNext, rank } = mockUser;
  const pct = Math.round((xp / xpToNext) * 100);
 
  return (
    <div className="bg-[#243447]/80 border border-[#81a6c6] rounded-none p-6 w-72
                    hover:border-[#aacddc] transition-all duration-300 pixel-card backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 mb-5">
        <div className="w-24 h-24 rounded-none bg-transparent flex items-center justify-center float">
          <img
            src={avatar}
            alt="TraderJasmine avatar"
            className="w-full h-full object-contain"
            style={{ imageRendering: "pixelated" }}
          />
        </div>
        <div className="text-center">
          <p className="font-display text-[#f3e3d0] font-bold tracking-wide text-xs">{username}</p>
          <p className="text-[#aacddc] text-sm font-semibold font-body mt-1">{rank}</p>
        </div>
      </div>
      <div className="flex justify-between text-xs text-[#d2c4b4] font-body mb-1">
        <span>LEVEL {level}</span>
        <span>{xp} / {xpToNext} XP</span>
      </div>
      <div className="w-full h-3 bg-[#1a2a3a] border border-[#81a6c6] overflow-hidden">
        <div
          className="h-full transition-all duration-700"
          style={{ width: `${pct}%`, background: "linear-gradient(90deg, #81a6c6, #aacddc)" }}
        />
      </div>
      <p className="text-right text-xs text-[#aacddc] mt-1 font-body">{pct}% to next level</p>
    </div>
  );
}