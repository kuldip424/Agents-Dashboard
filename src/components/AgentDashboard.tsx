import type { FormState } from "@/types";
import { useAgents } from "@/hooks/useAgents";
import { useModal } from "@/hooks/useModal";
import { Header } from "@/components/Header";
import { StatsBar } from "@/components/StatsBar";
import { FilterBar } from "@/components/FilterBar";
import { AgentCard } from "@/components/AgentCard";
import { AgentModal } from "@/components/AgentModal";
import { EmptyState } from "@/components/EmptyState";
import { ActivityLog } from "@/components/ActivityLog";

export default function AgentDashboard() {
  const {
    filtered, stats, loading, activities,
    search, setSearch,
    filterRole, setFilterRole,
    addAgent, updateAgent, deleteAgent,
  } = useAgents();

  const { isOpen, editAgent, openCreate, openEdit, close } = useModal();

  const handleSave = (form: FormState) => {
    if (editAgent) {
      updateAgent(editAgent.id, form);
    } else {
      addAgent(form);
    }
    close();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100 text-slate-900 antialiased transition-colors duration-300">
      <Header onAddAgent={openCreate} />

      <main className="max-w-[1400px] mx-auto px-6 sm:px-8 py-8">
        <StatsBar stats={stats} />

        <div className="flex flex-col xl:flex-row gap-8 items-start">
          {/* Left Column: Agents Feed */}
          <div className="flex-1 w-full min-w-0">
            <FilterBar
              search={search}
              onSearchChange={setSearch}
              filterRole={filterRole}
              onFilterChange={setFilterRole}
            />

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4 animate-pulse">
                <div className="w-12 h-12 border-4 border-[#0a474c]/20 border-t-[#0a474c] rounded-full animate-spin" />
                <p className="text-slate-400 font-medium tracking-tight">Synchronizing agents...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="animate-fade-in">
                <EmptyState />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {filtered.map((agent) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    onEdit={openEdit}
                    onDelete={deleteAgent}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Activity Log */}
          <aside className="w-full xl:w-80 flex-shrink-0 xl:sticky xl:top-24">
            <ActivityLog activities={activities} />
          </aside>
        </div>
      </main>

      <AgentModal
        isOpen={isOpen}
        onClose={close}
        editAgent={editAgent}
        onSave={handleSave}
      />
    </div>
  );
}
