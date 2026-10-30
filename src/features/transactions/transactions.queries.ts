"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createTransaction,
  deleteTransaction,
  getCategories,
  getTransactionsByMonth,
  updateTransaction,
  type TransactionInput,
} from "./transactions.api";

type UpdateTransactionVariables = {
  transactionId: string;
  input: TransactionInput;
};

export function useTransactionsQuery(month: string) {
  return useQuery({
    queryKey: ["transactions", { month }],
    queryFn: () => getTransactionsByMonth(month),
  });
}

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}

export function useCreateTransactionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: TransactionInput) =>
      createTransaction(input),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      }),
  });
}

export function useUpdateTransactionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      transactionId,
      input,
    }: UpdateTransactionVariables) =>
      updateTransaction(transactionId, input),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      }),
  });
}

export function useDeleteTransactionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (transactionId: string) =>
      deleteTransaction(transactionId),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      }),
  });
}