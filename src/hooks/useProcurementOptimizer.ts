import { useMemo } from "react";
import { rmIngredients } from "@/constants/rmIngredients";
import { getSupplierForIngredient } from "@/constants/suppliers";
import { subDays, addDays } from "date-fns";
import type { ProcurementDecision } from "@/types/procurement";

export const useProcurementOptimizer = (): ProcurementDecision[] => {
  const decisions = useMemo(() => {
    const today = new Date();
    return rmIngredients
      .map((ing) => {
        const supplier = getSupplierForIngredient(ing.id);
        if (!supplier) return null;

        const recommendedQty = Math.max(ing.forecastedDemandLiters * 1.3, supplier.minOrderQty);
        const unitCost = supplier.costPerKg;
        const totalCostInr = recommendedQty * unitCost;
        const avgDailyDemand = ing.forecastedDemandLiters / 30;
        const daysUntilStockout = ing.currentStockKg > 0 ? ing.currentStockKg / avgDailyDemand : 0;
        const stockoutRisk = Math.max(0, Math.min(100, daysUntilStockout <= supplier.leadDays ? 75 : 10));

        return {
          ingredientId: ing.id,
          ingredientName: ing.name,
          currentStock: ing.currentStockKg,
          forecastedDemand: ing.forecastedDemandLiters * 12,
          safetyStock: ing.forecastedDemandLiters * 2,
          eoq: recommendedQty,
          moq: supplier.minOrderQty,
          recommendedQty,
          supplier,
          unitCost,
          totalCostInr,
          orderDate: subDays(today, supplier.leadDays),
          deliveryDate: addDays(today, supplier.leadDays),
          stockoutRisk,
          rationale: `Recommended qty: ${recommendedQty}kg. Supplier: ${supplier.name}. Lead time: ${supplier.leadDays}d.`,
        } as ProcurementDecision;
      })
      .filter((d) => d !== null) as ProcurementDecision[];
  }, []);

  return decisions;
};
