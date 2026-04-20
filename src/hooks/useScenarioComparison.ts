import { useScenariosStore, type Scenario } from "@/store/useScenariosStore";
import { useDemandForecast } from "@/hooks/useDemandForecast";
import type { ForecastResult } from "@/types";

export interface DeltaInfo {
  scenarioId: string;
  scenarioName: string;
  periodIndex: number;
  pointDelta: number;
  percentageDelta: number;
  boundsExpansion: number;
}

export interface ScenarioComparisonResult {
  baseline: ForecastResult | null;
  scenarios: Array<{ scenario: Scenario; forecast: ForecastResult }>;
  deltas: DeltaInfo[];
  totalDemandBaseline: number;
  totalDemandByScenario: Record<string, number>;
}

export const useScenarioComparison = (): ScenarioComparisonResult => {
  const { scenarios, activeScenarioIds } = useScenariosStore();
  const baselineForecast = useDemandForecast();

  return {
    baseline: baselineForecast,
    scenarios: [],
    deltas: [],
    totalDemandBaseline: baselineForecast.periods.reduce((sum, p) => sum + p.pointForecast, 0),
    totalDemandByScenario: {},
  };
};
