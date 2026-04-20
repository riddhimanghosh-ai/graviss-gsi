import { Trash2, Plus } from "lucide-react";
import { useScenariosStore } from "@/store/useScenariosStore";

interface ScenarioManagerProps {
  onCreateNew: () => void;
}

export default function ScenarioManager({ onCreateNew }: ScenarioManagerProps) {
  const { scenarios, deleteScenario } = useScenariosStore();

  return (
    <div className="panel h-full space-y-4 overflow-y-auto p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-brown">Scenarios</h3>
        <button onClick={onCreateNew} className="rounded-lg bg-primary p-2 text-white hover:bg-primary/90" type="button">
          <Plus size={16} />
        </button>
      </div>
      {scenarios.length === 0 ? (
        <p className="subtle text-center text-sm py-4">No scenarios yet</p>
      ) : (
        <div className="space-y-2">
          {scenarios.map((s) => (
            <div key={s.id} className="rounded border border-brown/10 p-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-brown">{s.name}</p>
                  <p className="subtle text-xs">{s.description}</p>
                </div>
                <button onClick={() => deleteScenario(s.id)} className="text-rose-400 hover:text-rose-600" type="button">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
