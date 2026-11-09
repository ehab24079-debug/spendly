"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createBudget,
  deleteBudget,
  getBudgets,
  updateBudget,
} from "./budgets.api";

import type {
  CreateBudgetInput,
  UpdateBudgetInput,
} from "./types";

export const budgetKeys = {
  all: ["budgets"] as const,
};

export function useBudgetsQuery() {
  return useQuery({
    queryKey: budgetKeys.all,
    queryFn: getBudgets,
  });
}

export function useCreateBudgetMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateBudgetInput) =>
      createBudget(input),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: budgetKeys.all,
      }),
  });
}

export function useUpdateBudgetMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateBudgetInput) =>
      updateBudget(input),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: budgetKeys.all,
      }),
  });
}

export function useDeleteBudgetMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (budgetId: string) =>
      deleteBudget(budgetId),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: budgetKeys.all,
      }),
  });
}