import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import KPICard from "@/components/common/KPICard";
import IngredientMatrixTable from "@/components/rmInventory/IngredientMatrixTable";
import RMDepletionWaterfall from "@/components/charts/RMDepletionWaterfall";
import PurchaseOrderModal from "@/components/rmInventory/PurchaseOrderModal";
import { rmIngredients } from "@/constants/rmIngredients";
import { useProcurementOptimizer } from "@/hooks/useProcurementOptimizer";
import type { PurchaseOrderLineItem } from "@/types/rmInventory";

export default function RMInventoryPage() {
  const [selectedId, setSelectedId] = useState("milk-fat");
  const [isPOOpen, setIsPOOpen] = useState(false);

  const selectedIngredient = rmIngredients.find((i) => i.id === selectedId) ?? rmIngredients[0];
  const procurementDecisions = useProcurementOptimizer();

  // Convert ProcurementDecision to PurchaseOrderLineItem for modal compatibility
  const poLineItems: PurchaseOrderLineItem[] = procurementDecisions.map((dec: any) => ({
    ingredientId: dec.ingredientId,
    ingredientName: dec.ingredientName,
    quantityKg: dec.recommendedQty,
    unitCostInr: dec.unitCost,
    totalCostInr: dec.totalCostInr,
    suggestedSupplier: dec.supplier.name,
    deliveryLeadDays: dec.supplier.leadDays,
    urgency: dec.stockoutRisk > 50 ? "critical" : "planned",
  }));

  const totalRMValueInr = rmIngredients.reduce((sum, ing) => sum + ing.currentStockKg * ing.costPerKg, 0);
  const expiryRiskInr = rmIngredients.reduce((sum, ing) => sum + ing.expiringSoonKg * ing.costPerKg, 0);
  const shortfallCount = rmIngredients.filter((ing) => ing.currentStockKg < ing.forecastedDemandLiters * 0.8).length;  return (
    <div className="space-y-6">
      {/* KPI row */}
      <section className="grid gap-4 md:grid-cols-3">
        <KPICard
          label="Total RM Inventory Value"
          value={`₹${(totalRMValueInr / 100000).toFixed(1)}L`}
          detail="Across 6 raw material categories"
        />
        <KPICard
          label="Expiry Risk Value"
          value={`₹${(expiryRiskInr / 100000).toFixed(1)}L`}
          detail="Stock expiring within 30 days"
        />
        <KPICard
          label="Coverage Shortfalls"
          value={shortfallCount.toString()}
          detail="Ingredients below 80% of forecasted demand"
        />
      </section>

      {/* Ingredient matrix */}
      <IngredientMatrixTable
        ingredients={rmIngredients}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />

      {/* Depletion chart */}
      <RMDepletionWaterfall ingredient={selectedIngredient} />

      {/* Execute PO */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setIsPOOpen(true)}
          className="flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 font-semibold text-white shadow-md transition hover:bg-primary/80"
        >
          <ShoppingCart size={18} />
          Execute AI-Recommended Purchase Order
        </button>
      </div>

      <PurchaseOrderModal isOpen={isPOOpen} onClose={() => setIsPOOpen(false)} lineItems={poLineItems} />
    </div>
  );
}
