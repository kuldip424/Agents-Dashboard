import { 
  IconUsersGroup, 
  IconActivity, 
  IconUser, 
  IconSearch, 
  IconLock 
} from "@/components/icons";

export function Sidebar() {
  const menuItems = [
    { icon: <IconUsersGroup size={18} />, label: "Agents", active: true },
    { icon: <IconActivity size={18} />, label: "Analytics", active: false },
    { icon: <IconUser size={18} />, label: "Team", active: false },
    { icon: <IconSearch size={18} />, label: "Flows", active: false },
    { icon: <IconLock size={18} />, label: "Settings", active: false },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#022c2e] text-white flex flex-col z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#f5c518] flex items-center justify-center">
          <IconUsersGroup size={18} color="#022c2e" />
        </div>
        <span className="font-extrabold text-xl tracking-tighter">Retner</span>
      </div>

      <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
        {menuItems.map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-not-allowed transition-all duration-200 ${
              item.active 
                ? "bg-white/10 text-white font-bold" 
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <div className={item.active ? "text-[#f5c518]" : ""}>{item.icon}</div>
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </nav>

      <div className="p-6 border-t border-white/5">
        <div className="flex items-center gap-3 px-4 py-3 text-slate-400 text-xs">
          <span>v1.2.0 Pro</span>
        </div>
      </div>
    </aside>
  );
}
