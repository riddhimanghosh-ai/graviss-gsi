import { useScenariosStore } from "@/store/useScenariosStore";

export default function ScenarioComparison() {
  const { scenarios, activeScenarioIds } = useScenariosStore();

  return (
    <div className="panel space-y-4 p-5">
      <h3 className="font-semibold text-brown">Comparison</h3>
      {activeScenarioIds.length === 0 ? (
        <p className="subtle text-sm py-4">Select scenarios to compare</p>
      ) : (
        <div className="space-y-3">
          {scenarios
            .filter((s) => activeScenarioIds.includes(s.id))
            .map((s) => (
              <div key={s.id} className="rounded border border-primary/20 bg-primary/5 p-3">
                <p className="font-semibold text-brown">{s.name}</p>
                <p className="subtle text-xs">Weather: {s.weatherMultiplier.toFixed(2)}x | Festival: {s.festivalMultiplier.toFixed(2)}x</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
