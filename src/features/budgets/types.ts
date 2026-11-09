import type { Category } from "@/features/transactions/types";

export type Budget = {
  id: string;
  limit: number;
  category: Category;
};

export type CreateBudgetInput = {
  limit: number;
  categoryId: string;
};

export type UpdateBudgetInput = {
  budgetId: string;
  limit: number;
};