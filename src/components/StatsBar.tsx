import { IconUsersGroup, IconActivity, IconUser, IconUserX } from "@/components/icons";

interface Stat {
  label: string;
  value: number;
  gradient: string;
  icon: React.ReactNode;
}

interface StatsBarProps {
  stats: {
    total: number;
    active: number;
    managers: number;
    inactive: number;
  };
}

export function StatsBar({ stats }: StatsBarProps) {
  const items: Stat[] = [
    {
      label: "Total Agents",
      value: stats.total,
      gradient: "linear-gradient(135deg, #1f2937, #374151)",
      icon: <IconUsersGroup size={20} color="#1f2937" />,
      bgColor: "bg-slate-50",
    },
    {
      label: "Active",
      value: stats.active,
      gradient: "linear-gradient(135deg, #059669, #10b981)",
      icon: <IconActivity size={20} className="text-emerald-600" />,
      bgColor: "bg-emerald-50",
    },
    {
      label: "Managers",
      value: stats.managers,
      gradient: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
      icon: <IconUser size={20} className="text-violet-600" />,
      bgColor: "bg-violet-50",
    },
    {
      label: "Inactive",
      value: stats.inactive,
      gradient: "linear-gradient(135deg, #6b7280, #9ca3af)",
      icon: <IconUserX size={20} className="text-slate-500" />,
      bgColor: "bg-slate-100",
    },
  ];

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {items.map((s, idx) => (
          <div
            key={s.label}
            className="group relative bg-white rounded-2xl border border-slate-200 p-6 transition-all duration-300 hover:shadow-lg cursor-default overflow-hidden shadow-xs"
            style={{
              animation: `slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
              animationDelay: `${idx * 50}ms`,
            }}
          >
            {/* Gradient background on hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
              style={{ background: s.gradient }}
            />
            
            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-start gap-4 flex-1">
                <div 
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${s.bgColor} group-hover:scale-110 transition-transform duration-300`}
                >
                  {s.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-600 text-slate-500 uppercase tracking-wide leading-none">
                    {s.label}
                  </p>
                  <p
                    className={`text-4xl font-black tracking-tight mt-2 ${
                      s.label === "Total Agents" ? "text-slate-900" :
                      s.label === "Active" ? "text-emerald-600" :
                      s.label === "Managers" ? "text-violet-600" :
                      "text-slate-600"
                    }`}
                  >
                    {s.value}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
  );
}
