export function EmptyState() {
  return (
    <div className="text-center py-32">
      <div
        className="w-24 h-24 mx-auto mb-8 rounded-2xl flex items-center justify-center text-6xl animate-fade-in"
        style={{
          background: "linear-gradient(135deg, #f3f4f6, #e5e7eb)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
        }}
      >
        🔍
      </div>
      <p className="text-xl font-bold text-slate-900 mb-3">No agents found</p>
      <p className="text-base text-slate-500 font-500 max-w-xs mx-auto">
        Try adjusting your search or filter criteria
      </p>
    </div>
  );
}
