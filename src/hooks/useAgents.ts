import { useState, useEffect } from "react";
import type { Agent, FormState, FilterRole, Activity } from "@/types";

const API_URL = "http://localhost:3001/agents";
const LOG_URL = "http://localhost:3001/activities";

export function useAgents() {
  const [agents, setAgents]         = useState<Agent[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState<string>("");
  const [filterRole, setFilterRole] = useState<FilterRole>("All");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [agRes, lcRes] = await Promise.all([
        fetch(API_URL),
        fetch(`${LOG_URL}?_sort=timestamp&_order=desc&_limit=10`)
      ]);
      const agentsData = await agRes.json();
      const logsData   = await lcRes.json();
      setAgents(agentsData);
      setActivities(logsData);
    } catch (e) {
      console.error("Error fetching data:", e);
    } finally {
      setLoading(false);
    }
  };

  const logActivity = async (action: Activity["action"], name: string, details: string) => {
    const activity: Omit<Activity, "id"> = {
      action,
      agentName: name,
      timestamp: new Date().toISOString(),
      details,
    };
    try {
      await fetch(LOG_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activity),
      });
      // Refresh logs
      const res = await fetch(`${LOG_URL}?_sort=timestamp&_order=desc&_limit=10`);
      const data = await res.json();
      setActivities(data);
    } catch (e) {
      console.warn("Failed to log activity:", e);
    }
  };

  const addAgent = async (form: FormState) => {
    const newAgent = {
      name:     form.name,
      username: form.username,
      email:    form.email,
      phone:    `${form.country} ${form.phone}`,
      role:     form.role,
      status:   form.active ? "Active" : "Inactive",
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAgent),
      });
      if (res.ok) {
        fetchData();
        logActivity("Added", newAgent.name, `Added as ${newAgent.role}`);
      }
    } catch (e) {
      console.error("Error adding agent:", e);
    }
  };

  const updateAgent = async (id: number, form: FormState) => {
    const updated = {
      name:     form.name,
      username: form.username,
      email:    form.email,
      phone:    `${form.country} ${form.phone}`,
      role:     form.role,
      status:   form.active ? "Active" : "Inactive",
    };

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        fetchData();
        logActivity("Updated", updated.name, `Updated profile details`);
      }
    } catch (e) {
      console.error("Error updating agent:", e);
    }
  };

  const deleteAgent = async (id: number) => {
    const agentToDelete = agents.find(a => a.id === id);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchData();
        if (agentToDelete) {
          logActivity("Deleted", agentToDelete.name, "Removed from systems");
        }
      }
    } catch (e) {
      console.error("Error deleting agent:", e);
    }
  };

  const filtered = agents.filter(
    (a) =>
      (filterRole === "All" || a.role === filterRole) &&
      (a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.username.toLowerCase().includes(search.toLowerCase()))
  );

  const stats = {
    total:    agents.length,
    active:   agents.filter((a) => a.status  === "Active").length,
    managers: agents.filter((a) => a.role    === "Manager").length,
    inactive: agents.filter((a) => a.status  === "Inactive").length,
  };

  return {
    agents, filtered, stats, loading, activities,
    search, setSearch,
    filterRole, setFilterRole,
    addAgent, updateAgent, deleteAgent,
  };
}
