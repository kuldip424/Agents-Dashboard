import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
      {children}
    </p>
  );
}
