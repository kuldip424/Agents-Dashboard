import type { Activity } from "@/types";

interface ActivityLogProps {
  activities: Activity[];
}

export function ActivityLog({ activities }: ActivityLogProps) {
  const getTimeAgo = (timestamp: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(timestamp).getTime()) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  const getActionColor = (action: Activity["action"]) => {
    switch (action) {
      case "Added": return "bg-emerald-500";
      case "Updated": return "bg-amber-500";
      case "Deleted": return "bg-rose-500";
      default: return "bg-slate-400";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-extrabold text-slate-800 tracking-tight uppercase">Recent Activity</h3>
          <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-widest">System Events</p>
        </div>
        <div className="px-2 py-1 rounded bg-[#0A474C]/10 text-[10px] font-extrabold text-[#0A474C] uppercase tracking-tighter">Live</div>
      </div>

      <div className="flex flex-col gap-5">
        {activities.length === 0 ? (
          <p className="text-xs text-slate-400 font-medium italic text-center py-4">No recent activity found</p>
        ) : (
          activities.map((item) => (
            <div key={item.id} className="group relative pl-6 transition-all duration-200">
              {/* Timeline Line */}
              <div className="absolute left-[3px] top-2 bottom-[-20px] w-0.5 bg-slate-100 group-last:hidden" />

              {/* Timeline Dot */}
              <div className={`absolute left-0 top-1.5 w-2 h-2 rounded-full border-2 border-white ring-4 ring-transparent group-hover:ring-slate-50 transition-all ${getActionColor(item.action)}`} />

              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-xs font-bold text-slate-800 tracking-tight leading-none">
                    {item.agentName}
                  </p>
                  <span className="text-[10px] font-bold text-slate-400">
                    {getTimeAgo(item.timestamp)}
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 leading-tight">
                  <span className={`font-extrabold text-[9px] uppercase mr-1.5 ${item.action === "Added" ? "text-emerald-600" : item.action === "Updated" ? "text-amber-600" : "text-rose-600"}`}>
                    {item.action}
                  </span>
                  {item.details}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <button className="w-full mt-6 py-2.5 rounded-md border border-slate-100 text-[11px] font-bold text-slate-400 hover:bg-[#0A474C]/5 hover:text-[#0A474C] transition-all duration-200 uppercase tracking-widest px-4">
        View Full History
      </button>
    </div>
  );
}
