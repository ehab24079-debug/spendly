"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { PageHeader } from "@/components/layout/page-header";
import { PageLayout } from "@/components/layout/page-layout";

import { useBudgetsQuery } from "@/features/budgets/budgets.queries";
import { useTransactionsQuery } from "@/features/transactions/transactions.queries";

import { DashboardBudgetOverview } from "./dashboard-budget-overview";
import { DashboardRecentTransactions } from "./dashboard-recent-transactions";
import { DashboardSummary } from "./dashboard-summary";
import { DashboardLoadingState } from "./dashboard-loading-state";
import { DashboardEmptyState } from "./dashboard-empty-state";

type BudgetTone = "positive" | "warning" | "danger";

function getCurrentMonth() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
}

function getMonthOptions() {
  const now = new Date();

  return Array.from({ length: 12 }, (_, index) => {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - index,
      1,
    );

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");

    return {
      value: `${year}-${month}`,
      label: new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
      }).format(date),
    };
  });
}

function getBudgetTone(progress: number): BudgetTone {
  if (progress > 100) {
    return "danger";
  }

  if (progress >= 80) {
    return "warning";
  }

  return "positive";
}

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : "Failed to load dashboard data. Please try again.";
}

export function DashboardView() {
  const [selectedMonth, setSelectedMonth] =
    useState(getCurrentMonth);

  const transactionsQuery =
    useTransactionsQuery(selectedMonth);

  const budgetsQuery = useBudgetsQuery();

  const transactions = transactionsQuery.data ?? [];
  const budgets = budgetsQuery.data ?? [];

  const isLoading =
    transactionsQuery.isLoading ||
    budgetsQuery.isLoading;

  const isError =
    transactionsQuery.isError ||
    budgetsQuery.isError;

  const monthOptions = getMonthOptions();

  const income = transactions.reduce(
    (total, transaction) =>
      transaction.type === "income"
        ? total + transaction.amount
        : total,
    0,
  );

  const expenses = transactions.reduce(
    (total, transaction) =>
      transaction.type === "expense"
        ? total + transaction.amount
        : total,
    0,
  );

  const balance = income - expenses;

  const recentTransactions = [...transactions]
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime(),
    )
    .slice(0, 5)
    .map((transaction) => ({
      id: transaction.id,
      description:
        transaction.description?.trim() ||
        transaction.category.name,
      category: transaction.category.name,
      type: transaction.type,
      date: transaction.date,
      amount: transaction.amount,
    }));

  const budgetOverview = budgets.map((budget) => {
    const spent = transactions.reduce(
      (total, transaction) => {
        if (
          transaction.type !== "expense" ||
          transaction.category.id !== budget.category.id
        ) {
          return total;
        }

        return total + transaction.amount;
      },
      0,
    );

    const progress =
      budget.limit > 0
        ? Math.round((spent / budget.limit) * 100)
        : 0;

    return {
      id: budget.id,
      category: budget.category.name,
      spent,
      limit: budget.limit,
      progress,
      tone: getBudgetTone(progress),
    };
  });

  function handleRetry() {
    void Promise.all([
      transactionsQuery.refetch(),
      budgetsQuery.refetch(),
    ]);
  }

  return (
    <PageLayout>
      <PageHeader
        actions={
          <Select
            aria-label="Select month"
            value={selectedMonth}
            onChange={(event) =>
              setSelectedMonth(event.target.value)
            }
            className="w-full sm:w-44"
          >
            {monthOptions.map((month) => (
              <option
                key={month.value}
                value={month.value}
              >
                {month.label}
              </option>
            ))}
          </Select>
        }
      >
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-foreground-secondary">
          Overview of your monthly finances.
        </p>
      </PageHeader>

      {isLoading ? (
        <DashboardLoadingState />
      ) : isError ? (
        <div className="space-y-3">
          <p className="text-sm text-danger" role="alert">
            {getErrorMessage(
              transactionsQuery.error ?? budgetsQuery.error,
            )}
          </p>

          <Button
            type="button"
            variant="secondary"
            disabled={
              transactionsQuery.isFetching ||
              budgetsQuery.isFetching
            }
            onClick={handleRetry}
          >
            Retry
          </Button>
        </div>
      ) : transactions.length === 0 &&
        budgets.length === 0 ? (
        <DashboardEmptyState />
      ) : (
        <>
          <DashboardSummary
            income={income}
            expenses={expenses}
            balance={balance}
          />

          <DashboardRecentTransactions
            transactions={recentTransactions}
          />

          <DashboardBudgetOverview
            budgets={budgetOverview}
          />
        </>
      )}
    </PageLayout>
  );
}