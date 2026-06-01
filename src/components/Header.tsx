import { IconUsersGroup, IconPlus } from "@/components/icons";

interface HeaderProps {
  onAddAgent: () => void;
}

export function Header({ onAddAgent }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-30 px-6 sm:px-8 h-20 flex items-center justify-between backdrop-blur-sm"
      style={{
        background: "rgba(255, 255, 255, 0.85)",
        borderBottom: "1px solid rgba(229, 231, 235, 0.6)",
      }}
    >
      {/* Logo + Title */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700">
          <IconUsersGroup size={20} color="#ffffff" />
        </div>
        <div>
          <span className="font-black text-xl tracking-tight-2 text-slate-900">
            Agents
          </span>
          <span className="hidden sm:inline text-xs text-slate-400 ml-2 font-500 tracking-wide">
            DASHBOARD
          </span>
        </div>
      </div>

      {/* Subtitle */}
      <span className="text-sm text-slate-500 hidden md:block font-500">
        Your team for assistant management
      </span>

      <button
        onClick={onAddAgent}
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 text-white text-sm font-600 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20 active:scale-[0.97] shadow-md hover:from-slate-800 hover:to-slate-700"
      >
        <IconPlus size={16} />
        Add Agent
      </button>
    </header>
  );
}
