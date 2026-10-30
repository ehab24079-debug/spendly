"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
  useTransactionsQuery,
  useUpdateTransactionMutation,
} from "../transactions.queries";
import type { TransactionFormValues } from "../transaction-form.schema";
import type { Transaction } from "../types";

import { DeleteTransactionDialog } from "./delete-transaction-dialog";
import { PageHeader } from "./page-header";
import { TransactionControls } from "./transaction-controls";
import { TransactionFormDialog } from "./transaction-form-dialog";
import { TransactionsList } from "./transactions-list";
import { TransactionsTable } from "./transactions-table";

function getCurrentMonth() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
}

export function TransactionsView() {
  const searchParams = useSearchParams();

  const [isTransactionFormOpen, setIsTransactionFormOpen] =
    useState(false);

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const [transactionToDelete, setTransactionToDelete] =
    useState<Transaction | null>(null);

  const selectedMonth = searchParams.get("month") ?? getCurrentMonth();
  const search = searchParams.get("search")?.trim().toLowerCase() ?? "";
  const selectedType = searchParams.get("type") ?? "all";
  const selectedCategory = searchParams.get("category") ?? "all";

  const {
    data: transactions = [],
    isLoading,
    isLoadingError,
    isRefetchError,
    isFetching,
    refetch,
  } = useTransactionsQuery(selectedMonth);

  const createTransactionMutation =
    useCreateTransactionMutation();

  const updateTransactionMutation =
    useUpdateTransactionMutation();

  const deleteTransactionMutation =
    useDeleteTransactionMutation();

  const visibleTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description?.toLowerCase().includes(search) ||
      transaction.category.name.toLowerCase().includes(search);

    const matchesType =
      selectedType === "all" || transaction.type === selectedType;

    const matchesCategory =
      selectedCategory === "all" ||
      transaction.category.id === selectedCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  const isEmptyMonth = transactions.length === 0;

  const hasNoMatchingTransactions =
    transactions.length > 0 && visibleTransactions.length === 0;

  const isTransactionMutationPending = selectedTransaction
    ? updateTransactionMutation.isPending
    : createTransactionMutation.isPending;

  const transactionSubmitError = selectedTransaction
    ? updateTransactionMutation.isError
      ? "Failed to update transaction. Please try again."
      : undefined
    : createTransactionMutation.isError
      ? "Failed to add transaction. Please try again."
      : undefined;

  function handleAddTransaction() {
    createTransactionMutation.reset();
    updateTransactionMutation.reset();

    setSelectedTransaction(null);
    setIsTransactionFormOpen(true);
  }

  function handleEditTransaction(transaction: Transaction) {
    createTransactionMutation.reset();
    updateTransactionMutation.reset();

    setSelectedTransaction(transaction);
    setIsTransactionFormOpen(true);
  }

  function handleDeleteTransaction(transaction: Transaction) {
    deleteTransactionMutation.reset();
    setTransactionToDelete(transaction);
  }

  function handleFormOpenChange(open: boolean) {
    setIsTransactionFormOpen(open);

    if (!open) {
      setSelectedTransaction(null);
      createTransactionMutation.reset();
      updateTransactionMutation.reset();
    }
  }

  function handleDeleteDialogOpenChange(open: boolean) {
    if (!open) {
      setTransactionToDelete(null);
      deleteTransactionMutation.reset();
    }
  }

  async function handleTransactionSubmit(
    values: TransactionFormValues,
  ) {
    try {
      if (selectedTransaction) {
        await updateTransactionMutation.mutateAsync({
          transactionId: selectedTransaction.id,
          input: values,
        });
      } else {
        await createTransactionMutation.mutateAsync(values);
      }

      handleFormOpenChange(false);
    } catch {
      return;
    }
  }

  async function handleDeleteConfirm() {
    if (!transactionToDelete) {
      return;
    }

    try {
      await deleteTransactionMutation.mutateAsync(
        transactionToDelete.id,
      );

      handleDeleteDialogOpenChange(false);
    } catch {
      return;
    }
  }

  const transactionFormDefaultValues = selectedTransaction
    ? {
        type: selectedTransaction.type,
        amount: selectedTransaction.amount,
        categoryId: selectedTransaction.category.id,
        date: selectedTransaction.date,
        description: selectedTransaction.description ?? "",
      }
    : undefined;

  return (
    <section className="p-6">
      <div className="space-y-6">
        <PageHeader onAddTransaction={handleAddTransaction} />

        <TransactionControls />

        {isLoading ? (
          <p className="text-sm text-foreground-secondary">
            Loading transactions...
          </p>
        ) : null}

        {isLoadingError ? (
          <div className="space-y-3">
            <p className="text-sm text-danger">
              Failed to load transactions.
            </p>

            <Button
              type="button"
              variant="secondary"
              disabled={isFetching}
              onClick={() => void refetch()}
            >
              {isFetching ? "Retrying..." : "Retry"}
            </Button>
          </div>
        ) : null}

        {!isLoadingError && isRefetchError ? (
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm text-danger">
              Failed to refresh transactions. Showing the last loaded data.
            </p>

            <Button
              type="button"
              variant="secondary"
              disabled={isFetching}
              onClick={() => void refetch()}
            >
              {isFetching ? "Retrying..." : "Retry"}
            </Button>
          </div>
        ) : null}

        {!isLoading && !isLoadingError && isEmptyMonth ? (
          <p className="text-sm text-foreground-secondary">
            No transactions for this month.
          </p>
        ) : null}

        {!isLoading &&
        !isLoadingError &&
        hasNoMatchingTransactions ? (
          <p className="text-sm text-foreground-secondary">
            No transactions match your search or filters.
          </p>
        ) : null}

        {!isLoading &&
        !isLoadingError &&
        !isEmptyMonth &&
        !hasNoMatchingTransactions ? (
          <>
            <TransactionsTable
              transactions={visibleTransactions}
              onEditTransaction={handleEditTransaction}
              onDeleteTransaction={handleDeleteTransaction}
            />

            <TransactionsList
              transactions={visibleTransactions}
              onEditTransaction={handleEditTransaction}
              onDeleteTransaction={handleDeleteTransaction}
            />
          </>
        ) : null}

        {isTransactionFormOpen ? (
          <TransactionFormDialog
            key={selectedTransaction?.id ?? "add"}
            open
            onOpenChange={handleFormOpenChange}
            title={
              selectedTransaction
                ? "Edit Transaction"
                : "Add Transaction"
            }
            defaultValues={transactionFormDefaultValues}
            submitLabel={
              selectedTransaction
                ? "Save Changes"
                : "Add Transaction"
            }
            pendingSubmitLabel={
              selectedTransaction
                ? "Saving..."
                : "Adding..."
            }
            submitError={transactionSubmitError}
            isPending={isTransactionMutationPending}
            onSubmit={handleTransactionSubmit}
          />
        ) : null}

        {transactionToDelete ? (
          <DeleteTransactionDialog
            open
            onOpenChange={handleDeleteDialogOpenChange}
            onConfirm={handleDeleteConfirm}
            isPending={deleteTransactionMutation.isPending}
            errorMessage={
              deleteTransactionMutation.isError
                ? "Failed to delete transaction. Please try again."
                : undefined
            }
          />
        ) : null}
      </div>
    </section>
  );
}