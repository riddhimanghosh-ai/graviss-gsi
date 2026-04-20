import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Scenario {
  id: string;
  name: string;
  description: string;
  weatherMultiplier: number;
  festivalMultiplier: number;
  eventMultiplier: number;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}

interface ScenariosState {
  scenarios: Scenario[];
  baselineId: string | null;
  activeScenarioIds: string[];
  createScenario: (scenario: Omit<Scenario, "id" | "createdAt" | "updatedAt">) => void;
  deleteScenario: (id: string) => void;
  updateScenario: (id: string, updates: Partial<Scenario>) => void;
  setActiveScenarios: (ids: string[]) => void;
  setBaseline: (id: string | null) => void;
  clearAll: () => void;
}

export const useScenariosStore = create<ScenariosState>()(
  persist(
    (set) => ({
      scenarios: [],
      baselineId: null,
      activeScenarioIds: [],

      createScenario: (scenario) =>
        set((state) => {
          const newScenario: Scenario = {
            ...scenario,
            id: `scenario-${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          const scenarios =
            state.scenarios.length >= 10
              ? [...state.scenarios.slice(-9), newScenario]
              : [...state.scenarios, newScenario];

          return { scenarios };
        }),

      deleteScenario: (id) =>
        set((state) => ({
          scenarios: state.scenarios.filter((s) => s.id !== id),
          activeScenarioIds: state.activeScenarioIds.filter((sid) => sid !== id),
          baselineId: state.baselineId === id ? null : state.baselineId,
        })),

      updateScenario: (id, updates) =>
        set((state) => ({
          scenarios: state.scenarios.map((s) =>
            s.id === id ? { ...s, ...updates, updatedAt: new Date() } : s
          ),
        })),

      setActiveScenarios: (ids) =>
        set(() => ({
          activeScenarioIds: ids.slice(0, 5),
        })),

      setBaseline: (id) => set(() => ({ baselineId: id })),

      clearAll: () =>
        set(() => ({
          scenarios: [],
          baselineId: null,
          activeScenarioIds: [],
        })),
    }),
    {
      name: "gsi-scenarios-storage",
      skipHydration: false,
    }
  )
);
