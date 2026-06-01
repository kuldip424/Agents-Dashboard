import type { Role } from "@/types";

interface BadgeProps {
  role: Role;
}

export function Badge({ role }: BadgeProps) {
  const isManager = role === "Manager";
  return (
    <span
      className={`inline-flex items-center px-3.5 py-2 rounded-lg text-xs font-bold tracking-wide uppercase transition-colors duration-200 ${
        isManager 
          ? "bg-violet-100 text-violet-700" 
          : "bg-blue-100 text-blue-700"
      }`}
    >
      {role}
    </span>
  );
}
