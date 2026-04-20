import { useState } from "react";
import ScenarioManager from "@/components/dashboard/ScenarioManager";
import ScenarioBuilder from "@/components/dashboard/ScenarioBuilder";
import ScenarioComparison from "@/components/dashboard/ScenarioComparison";

export default function ScenarioPage() {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="text-sm text-brown/60">
        <span>Dashboard</span>
        <span className="mx-2">›</span>
        <span className="font-semibold text-brown">Scenario Planning</span>
      </div>

      {/* Main Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Scenario Manager */}
        <div className="lg:col-span-1">
          <ScenarioManager onCreateNew={() => setIsBuilderOpen(true)} />
        </div>

        {/* Right: Scenario Comparison */}
        <div className="lg:col-span-2">
          <ScenarioComparison />
        </div>
      </div>

      {/* Scenario Builder Modal */}
      <ScenarioBuilder isOpen={isBuilderOpen} onClose={() => setIsBuilderOpen(false)} />
    </div>
  );
}
