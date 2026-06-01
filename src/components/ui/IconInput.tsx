import type { ReactNode } from "react";

interface IconInputProps {
  icon: ReactNode;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  error?: string;
  rightSlot?: ReactNode;
}

export function IconInput({
  icon,
  placeholder,
  value,
  onChange,
  type = "text",
  error,
  rightSlot,
}: IconInputProps) {
  return (
    <div className="w-full">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full pl-9 ${rightSlot ? "pr-9" : "pr-3"} py-2.5 rounded-xl text-sm bg-gray-50 text-gray-900 border transition-colors outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 ${
            error ? "border-red-300" : "border-gray-200"
          }`}
        />
        {rightSlot && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
            {rightSlot}
          </span>
        )}
      </div>
      {error && (
        <p className="mt-1 pl-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
