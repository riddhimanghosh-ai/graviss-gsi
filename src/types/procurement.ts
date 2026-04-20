import type { Supplier } from "@/constants/suppliers";

export interface ProcurementDecision {
  ingredientId: string;
  ingredientName: string;
  currentStock: number;
  forecastedDemand: number;
  safetyStock: number;
  eoq: number;
  moq: number;
  recommendedQty: number;
  supplier: Supplier;
  unitCost: number;
  totalCostInr: number;
  bulkDiscountApplied?: { tier: number; discountPct: number };
  orderDate: Date;
  deliveryDate: Date;
  stockoutRisk: number;
  consolidationOpportunity?: string;
  rationale: string;
}

export interface ConsolidationPlan {
  supplierId: string;
  supplierName: string;
  ingredients: Array<{ ingredientId: string; ingredientName: string; qty: number; cost: number }>;
  totalCost: number;
  freightSavings: number;
  deliveryDate: Date;
  leadTimeDays: number;
}

export interface DiscountEvaluation {
  baseQty: number;
  discountedQty: number;
  discountTier: number;
  savingsInr: number;
  additionalHoldingCostInr: number;
  netBenefitInr: number;
  recommendation: "accept" | "reject";
}

export interface ProcurementRecommendation {
  ingredientId: string;
  ingredientName: string;
  recommendedQty: number;
  recommendedSupplier: string;
  estimatedCostInr: number;
  eoq: number;
  moq: number;
  orderDate: Date;
  deliveryDate: Date;
  rationale: string;
  savingsVsBaseline: number;
  riskScore: number;
}
