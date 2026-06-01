import { useState } from "react";
import type { Agent } from "@/types";

export function useModal() {
  const [isOpen, setIsOpen]       = useState<boolean>(false);
  const [editAgent, setEditAgent] = useState<Agent | null>(null);

  const openCreate = (): void => {
    setEditAgent(null);
    setIsOpen(true);
  };

  const openEdit = (agent: Agent): void => {
    setEditAgent(agent);
    setIsOpen(true);
  };

  const close = (): void => {
    setIsOpen(false);
    setEditAgent(null);
  };

  return { isOpen, editAgent, openCreate, openEdit, close };
}
