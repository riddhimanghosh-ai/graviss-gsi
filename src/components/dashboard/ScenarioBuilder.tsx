import { useState } from "react";
import { X } from "lucide-react";
import { useScenariosStore } from "@/store/useScenariosStore";

interface ScenarioBuilderProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ScenarioBuilder({ isOpen, onClose }: ScenarioBuilderProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [weatherMultiplier, setWeatherMultiplier] = useState(1);
  const [festivalMultiplier, setFestivalMultiplier] = useState(1);
  const [eventMultiplier, setEventMultiplier] = useState(1);
  const { createScenario } = useScenariosStore();

  const handleSave = () => {
    if (!name.trim()) return;
    createScenario({
      name: name.trim(),
      description: description.trim(),
      weatherMultiplier,
      festivalMultiplier,
      eventMultiplier,
    });
    setName("");
    setDescription("");
    setWeatherMultiplier(1);
    setFestivalMultiplier(1);
    setEventMultiplier(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="panel w-full max-w-md space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-brown">Create Scenario</h3>
          <button onClick={onClose} className="text-brown/60 hover:text-brown" type="button">
            <X size={20} />
          </button>
        </div>
        <div>
          <label className="label block text-sm">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Heatwave"
            className="mt-1 w-full rounded border border-brown/10 bg-white px-3 py-2 text-brown"
          />
        </div>
        <div className="space-y-3 rounded-lg bg-brown/5 p-3">
          <label className="label block text-sm">Multipliers</label>
          <div>
            <div className="flex justify-between text-xs"><span>Weather</span><span>{weatherMultiplier.toFixed(2)}x</span></div>
            <input type="range" min="0.7" max="1.6" step="0.01" value={weatherMultiplier} onChange={(e) => setWeatherMultiplier(parseFloat(e.target.value))} className="mt-1 w-full" />
          </div>
          <div>
            <div className="flex justify-between text-xs"><span>Festival</span><span>{festivalMultiplier.toFixed(2)}x</span></div>
            <input type="range" min="0.7" max="1.6" step="0.01" value={festivalMultiplier} onChange={(e) => setFestivalMultiplier(parseFloat(e.target.value))} className="mt-1 w-full" />
          </div>
        </div>
        <div className="flex gap-2 pt-4">
          <button onClick={onClose} className="flex-1 rounded-lg border border-brown/10 px-4 py-2 text-sm font-semibold text-brown hover:bg-brown/5" type="button">
            Cancel
          </button>
          <button onClick={handleSave} disabled={!name.trim()} className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-50" type="button">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
