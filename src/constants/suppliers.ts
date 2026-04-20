export interface Supplier {
  id: string;
  name: string;
  ingredientId: string;
  leadDays: number;
  minOrderQty: number;
  costPerKg: number;
  bulkDiscounts?: Array<{ qtyThreshold: number; discountPct: number }>;
  paymentTerms: "cod" | "30days" | "60days";
  reliabilityScore: number;
}

export const suppliers: Supplier[] = [
  {
    id: "parag-milk-foods",
    name: "Parag Milk Foods",
    ingredientId: "milk-fat",
    leadDays: 5,
    minOrderQty: 500,
    costPerKg: 580,
    bulkDiscounts: [
      { qtyThreshold: 1000, discountPct: 3 },
      { qtyThreshold: 2000, discountPct: 5 }
    ],
    paymentTerms: "30days",
    reliabilityScore: 95
  },
  {
    id: "gau-coop-milk",
    name: "Gujarat Co-op Milk",
    ingredientId: "smp",
    leadDays: 7,
    minOrderQty: 400,
    costPerKg: 210,
    bulkDiscounts: [
      { qtyThreshold: 800, discountPct: 2 }
    ],
    paymentTerms: "30days",
    reliabilityScore: 92
  },
  {
    id: "amul-dairy",
    name: "Amul Dairy",
    ingredientId: "fresh-cream",
    leadDays: 2,
    minOrderQty: 200,
    costPerKg: 180,
    bulkDiscounts: [
      { qtyThreshold: 500, discountPct: 2 }
    ],
    paymentTerms: "cod",
    reliabilityScore: 98
  },
  {
    id: "shree-renuka",
    name: "Shree Renuka Sugars",
    ingredientId: "sugar",
    leadDays: 10,
    minOrderQty: 1000,
    costPerKg: 42,
    bulkDiscounts: [
      { qtyThreshold: 2000, discountPct: 4 }
    ],
    paymentTerms: "60days",
    reliabilityScore: 88
  },
  {
    id: "kerry-india",
    name: "Kerry Ingredients India",
    ingredientId: "stabilizer",
    leadDays: 14,
    minOrderQty: 300,
    costPerKg: 320,
    bulkDiscounts: [
      { qtyThreshold: 600, discountPct: 3 }
    ],
    paymentTerms: "30days",
    reliabilityScore: 91
  },
  {
    id: "givaudan",
    name: "Givaudan India",
    ingredientId: "flavor-compounds",
    leadDays: 21,
    minOrderQty: 150,
    costPerKg: 1200,
    bulkDiscounts: [
      { qtyThreshold: 300, discountPct: 2 }
    ],
    paymentTerms: "30days",
    reliabilityScore: 94
  }
];

export const getSupplierForIngredient = (ingredientId: string): Supplier | undefined => {
  return suppliers.find((s) => s.ingredientId === ingredientId);
};
