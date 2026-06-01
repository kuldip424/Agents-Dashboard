import type { FilterRole } from "@/types";
import { IconSearch } from "@/components/icons";

interface FilterBarProps {
  search:          string;
  onSearchChange:  (v: string) => void;
  filterRole:      FilterRole;
  onFilterChange:  (r: FilterRole) => void;
}

const FILTER_OPTIONS: FilterRole[] = ["All", "Agent", "Manager"];

export function FilterBar({
  search,
  onSearchChange,
  filterRole,
  onFilterChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
      {/* Search */}
      <div className="relative flex-1 min-w-0">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <IconSearch size={18} />
        </span>
        <input
          type="text"
          placeholder="Search agents by name or email…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 border border-slate-200 focus:border-slate-400 focus:ring-4 focus:ring-slate-500/10 font-500 shadow-xs"
        />
      </div>

      {/* Segmented filter */}
      <div className="inline-flex rounded-xl p-1.5 gap-1 flex-shrink-0 bg-slate-100 border border-slate-200">
        {FILTER_OPTIONS.map((r) => {
          const active = filterRole === r;
          return (
            <button
              key={r}
              onClick={() => onFilterChange(r)}
              className={`px-5 py-2.5 rounded-lg text-sm font-600 transition-all duration-300 ${
                active
                  ? "bg-white text-slate-900 shadow-md border border-slate-200"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {r}
            </button>
          );
        })}
      </div>
    </div>
  );
}
