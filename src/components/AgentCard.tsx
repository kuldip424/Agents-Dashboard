import type { Agent } from "@/types";
import { AVATAR_COLORS } from "@/data/constants";
import { Badge } from "@/components/ui/Badge";
import { StatusDot } from "@/components/ui/StatusDot";
import { IconEdit, IconTrash, IconMail, IconArrowRight } from "@/components/icons";

interface AgentCardProps {
  agent: Agent;
  onEdit: (agent: Agent) => void;
  onDelete: (id: number) => void;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function avatarColor(id: number) {
  return AVATAR_COLORS[id % AVATAR_COLORS.length];
}



export function AgentCard({ agent, onEdit, onDelete }: AgentCardProps) {
  const color = avatarColor(agent.id);

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-150 p-6 flex flex-col gap-5 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-default">
      {/* Animated border gradient on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, rgba(15,23,42,0.08), transparent)`,
        }}
      />

      {/* Top Section: Avatar + Name + Email */}
      <div className="flex items-start justify-between gap-4 relative z-10">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Avatar with enhanced styling */}
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-base flex-shrink-0 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110"
            style={{
              background: color.bg,
              color: color.text,
            }}
          >
            {getInitials(agent.name)}
          </div>

          {/* Name & Email with better typography */}
          <div className="min-w-0 flex-1 pt-0.5">
            <h3 className="font-600 text-base text-slate-900 leading-snug truncate group-hover:text-slate-950 transition-colors">
              {agent.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500 font-500">
              <IconMail size={13} className="text-slate-350 flex-shrink-0" />
              <span className="truncate group-hover:text-slate-600 transition-colors">{agent.email}</span>
            </div>
          </div>
        </div>

        {/* Action Icons with better spacing */}
        <div className="flex gap-1.5 flex-shrink-0 pl-2">
          <button
            onClick={() => onEdit(agent)}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-200 group-hover:scale-110 active:scale-95"
            title="Edit agent"
          >
            <IconEdit size={18} />
          </button>
          <button
            onClick={() => onDelete(agent.id)}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group-hover:scale-110 active:scale-95"
            title="Delete agent"
          >
            <IconTrash size={18} />
          </button>
        </div>
      </div>

      {/* Elegant divider */}
      <div className="h-px bg-gradient-to-r from-slate-200 via-slate-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Bottom Section: Badge and Status */}
      <div className="flex items-center justify-between gap-4 relative z-10">
        <Badge role={agent.role} />
        <StatusDot status={agent.status} />
      </div>

      {/* Hover indicator arrow */}
      <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0.5 group-hover:translate-x-0">
        <IconArrowRight size={16} className="text-slate-300" />
      </div>
    </div>
  );
}
