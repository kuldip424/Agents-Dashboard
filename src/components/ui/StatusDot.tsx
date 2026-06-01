import type { Status } from "@/types";

interface StatusDotProps {
  status: Status;
}

export function StatusDot({ status }: StatusDotProps) {
  const active = status === "Active";
  return (
    <span
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-600 tracking-wide border transition-all duration-200 ${
        active 
          ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
          : "bg-slate-50 text-slate-600 border-slate-150"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-emerald-500 shadow-sm" : "bg-slate-400"}`} />
      {status}
    </span>
  );
}
