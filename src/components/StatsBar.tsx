import { IconUsersGroup, IconActivity, IconUser, IconUserX } from "@/components/icons";

interface Stat {
  label: string;
  value: number;
  gradient: string;
  icon: React.ReactNode;
  bgColor: string;
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
      icon: <IconUsersGroup size={22} color="#1f2937" />,
      bgColor: "bg-slate-50",
    },
    {
      label: "Active",
      value: stats.active,
      gradient: "linear-gradient(135deg, #059669, #10b981)",
      icon: <IconActivity size={22} className="text-emerald-600" />,
      bgColor: "bg-emerald-50",
    },
    {
      label: "Managers",
      value: stats.managers,
      gradient: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
      icon: <IconUser size={22} className="text-violet-600" />,
      bgColor: "bg-violet-50",
    },
    {
      label: "Inactive",
      value: stats.inactive,
      gradient: "linear-gradient(135deg, #6b7280, #9ca3af)",
      icon: <IconUserX size={22} className="text-slate-500" />,
      bgColor: "bg-slate-100",
    },
  ];

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {items.map((s, idx) => (
          <div
            key={s.label}
            className="card"
            style={{
              animation: `slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
              animationDelay: `${idx * 50}ms`,
            }}
          >
            <div className="p-6">
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-start gap-4 flex-1">
                  <div 
                    className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${s.bgColor}`}
                  >
                    {s.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-700 text-slate-600 uppercase tracking-wider leading-none">
                      {s.label}
                    </p>
                    <p
                      className={`text-4xl font-black tracking-tight mt-3 ${
                        s.label === "Total Agents" ? "text-slate-950" :
                        s.label === "Active" ? "text-emerald-600" :
                        s.label === "Managers" ? "text-violet-600" :
                        "text-slate-700"
                      }`}
                    >
                      {s.value}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
  );
}
