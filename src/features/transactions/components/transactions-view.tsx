"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { transactionsFixture } from "../transactions.fixture";
import type { TransactionFormValues } from "../transaction-form.schema";
import type { Transaction } from "../types";

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

  const selectedMonth = searchParams.get("month") ?? getCurrentMonth();
  const search = searchParams.get("search")?.trim().toLowerCase() ?? "";
  const selectedType = searchParams.get("type") ?? "all";
  const selectedCategory = searchParams.get("category") ?? "all";

  const visibleTransactions = transactionsFixture.filter((transaction) => {
    const matchesMonth = transaction.date.startsWith(selectedMonth);

    const matchesSearch =
      transaction.description?.toLowerCase().includes(search) ||
      transaction.category.name.toLowerCase().includes(search);

    const matchesType =
      selectedType === "all" || transaction.type === selectedType;

    const matchesCategory =
      selectedCategory === "all" ||
      transaction.category.id === selectedCategory;

    return matchesMonth && matchesSearch && matchesType && matchesCategory;
  });

  function handleAddTransaction() {
    setSelectedTransaction(null);
    setIsTransactionFormOpen(true);
  }

  function handleEditTransaction(transaction: Transaction) {
    setSelectedTransaction(transaction);
    setIsTransactionFormOpen(true);
  }

  function handleFormOpenChange(open: boolean) {
    setIsTransactionFormOpen(open);

    if (!open) {
      setSelectedTransaction(null);
    }
  }

  function handleTransactionSubmit(values: TransactionFormValues) {
    void values;
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

        <TransactionsTable
          transactions={visibleTransactions}
          onEditTransaction={handleEditTransaction}
        />

        <TransactionsList
          transactions={visibleTransactions}
          onEditTransaction={handleEditTransaction}
        />

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
            onSubmit={handleTransactionSubmit}
          />
        ) : null}
      </div>
    </section>
  );
}