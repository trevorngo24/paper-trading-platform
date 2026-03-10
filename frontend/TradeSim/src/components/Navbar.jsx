import logo from "../assets/tradesim.png";

const links = ["Learn", "Practice", "Quiz", "Pricing"];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4
                    bg-[#1a2a3a]/80 backdrop-blur-md border-b border-[#81a6c6]">
      <div className="flex items-center gap-2">
        <img src={logo} alt="TradeSim Logo" className="w-9 h-9 rounded-full" />
        <span className="font-display text-sm font-bold tracking-widest text-[#f3e3d0]">
          TRADE<span className="text-[#aacddc]">SIM</span>
        </span>
      </div>
      <ul className="flex items-center gap-1">
        {links.map((link) => (
          <li key={link}>
            <button className="font-body font-semibold tracking-wider px-5 py-2 text-sm
                               border border-transparent text-[#d2c4b4]
                               hover:text-[#f3e3d0] hover:border-[#81a6c6] hover:bg-[#81a6c6]/10
                               transition-all duration-200">
              {link.toUpperCase()}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}