"use client";

import { useState } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { Select } from "@/components/ui/select";

import {
  useCategoriesQuery,
  useTransactionsQuery,
} from "@/features/transactions/transactions.queries";

import {
  useBudgetsQuery,
  useCreateBudgetMutation,
  useDeleteBudgetMutation,
  useUpdateBudgetMutation,
} from "../budgets.queries";

import type { Budget } from "../types";

import { BudgetCard } from "./budget-card";
import {
  BudgetForm,
  type BudgetFormValues,
} from "./budget-form";
import { BudgetsEmptyState } from "./budgets-empty-state";
import { BudgetsLoadingState } from "./budgets-loading-state";
import { DeleteBudgetDialog } from "./delete-budget-dialog";

type DialogMode = "add" | "edit";

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

function getErrorMessage(
  error: unknown,
  fallback: string,
) {
  return error instanceof Error ? error.message : fallback;
}

export function BudgetsView() {
  const [selectedMonth, setSelectedMonth] =
    useState(getCurrentMonth);

  const [dialogMode, setDialogMode] =
    useState<DialogMode>("add");

  const [isFormDialogOpen, setIsFormDialogOpen] =
    useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    useState(false);

  const [selectedBudget, setSelectedBudget] =
    useState<Budget | null>(null);

  const [formError, setFormError] =
    useState<string>();

  const [deleteError, setDeleteError] =
    useState<string>();

  const budgetsQuery = useBudgetsQuery();
  const categoriesQuery = useCategoriesQuery();
  const transactionsQuery =
    useTransactionsQuery(selectedMonth);

  const createBudgetMutation =
    useCreateBudgetMutation();

  const updateBudgetMutation =
    useUpdateBudgetMutation();

  const deleteBudgetMutation =
    useDeleteBudgetMutation();

  const budgets = budgetsQuery.data ?? [];
  const transactions = transactionsQuery.data ?? [];
  const categories = categoriesQuery.data ?? [];

  const availableCategories = categories.filter(
    (category) =>
      category.type === "expense" &&
      !budgets.some(
        (budget) =>
          budget.category.id === category.id,
      ),
  );

  const formCategories = selectedBudget
    ? [selectedBudget.category]
    : availableCategories;

  const isFormPending =
    createBudgetMutation.isPending ||
    updateBudgetMutation.isPending;

  const isPageLoading =
    budgetsQuery.isLoading ||
    transactionsQuery.isLoading;

  const isPageError =
    budgetsQuery.isError ||
    transactionsQuery.isError;

  const monthOptions = getMonthOptions();

  const budgetCards = budgets.map((budget) => {
    const spent = transactions.reduce(
      (total, transaction) => {
        if (
          transaction.type !== "expense" ||
          transaction.category.id !==
            budget.category.id
        ) {
          return total;
        }

        return total + transaction.amount;
      },
      0,
    );

    const progress =
      budget.limit > 0
        ? Math.round(
            (spent / budget.limit) * 100,
          )
        : 0;

    const tone = getBudgetTone(progress);

    return {
      budget,
      spent,
      progress,
      tone,
    };
  });

  function handleAddBudget() {
    setDialogMode("add");
    setSelectedBudget(null);
    setFormError(undefined);
    setIsFormDialogOpen(true);
  }

  function handleEditBudget(budget: Budget) {
    setDialogMode("edit");
    setSelectedBudget(budget);
    setFormError(undefined);
    setIsFormDialogOpen(true);
  }

  function handleDeleteBudget(budget: Budget) {
    setSelectedBudget(budget);
    setDeleteError(undefined);
    setIsDeleteDialogOpen(true);
  }

  function handleFormOpenChange(open: boolean) {
    setIsFormDialogOpen(open);

    if (!open) {
      setSelectedBudget(null);
      setFormError(undefined);
    }
  }

  function handleDeleteDialogOpenChange(
    open: boolean,
  ) {
    setIsDeleteDialogOpen(open);

    if (!open) {
      setSelectedBudget(null);
      setDeleteError(undefined);
    }
  }

  async function handleBudgetSubmit(
    values: BudgetFormValues,
  ) {
    setFormError(undefined);

    try {
      if (
        dialogMode === "edit" &&
        selectedBudget
      ) {
        await updateBudgetMutation.mutateAsync({
          budgetId: selectedBudget.id,
          limit: values.limit,
        });
      } else {
        await createBudgetMutation.mutateAsync({
          categoryId: values.categoryId,
          limit: values.limit,
        });
      }

      handleFormOpenChange(false);
    } catch (error) {
      setFormError(
        getErrorMessage(
          error,
          "Failed to save budget. Please try again.",
        ),
      );
    }
  }

  async function handleDeleteConfirm() {
    if (!selectedBudget) {
      return;
    }

    setDeleteError(undefined);

    try {
      await deleteBudgetMutation.mutateAsync(
        selectedBudget.id,
      );

      setIsDeleteDialogOpen(false);
      setSelectedBudget(null);
    } catch (error) {
      setDeleteError(
        getErrorMessage(
          error,
          "Failed to delete budget. Please try again.",
        ),
      );
    }
  }

  function handleRetry() {
    void budgetsQuery.refetch();
    void transactionsQuery.refetch();
  }

  return (
    <PageLayout>
      <PageHeader
        actions={
          <>
            <Select
              aria-label="Select month"
              value={selectedMonth}
              onChange={(event) =>
                setSelectedMonth(
                  event.target.value,
                )
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

            <Button
              type="button"
              onClick={handleAddBudget}
              className="w-full sm:w-auto"
            >
              Add Budget
            </Button>
          </>
        }
      >
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Budgets
        </h1>

        <p className="mt-1 text-sm text-foreground-secondary">
          Set monthly limits and track your spending.
        </p>
      </PageHeader>

      {isPageLoading ? (
        <BudgetsLoadingState />
      ) : null}

      {isPageError ? (
        <div className="space-y-3">
          <p
            className="text-sm text-danger"
            role="alert"
          >
            Failed to load budgets or
            transactions.
          </p>

          <Button
            type="button"
            variant="secondary"
            disabled={
              budgetsQuery.isFetching ||
              transactionsQuery.isFetching
            }
            onClick={handleRetry}
          >
            Retry
          </Button>
        </div>
      ) : null}

      {!isPageLoading &&
      !isPageError &&
      budgets.length === 0 ? (
        <BudgetsEmptyState
          onAddBudget={handleAddBudget}
        />
      ) : null}

      {!isPageLoading &&
      !isPageError &&
      budgets.length > 0 ? (
        <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
          {budgetCards.map(
            ({
              budget,
              spent,
              progress,
              tone,
            }) => (
              <BudgetCard
                key={budget.id}
                category={budget.category.name}
                spent={spent}
                limit={budget.limit}
                progress={progress}
                tone={tone}
                onEdit={() =>
                  handleEditBudget(budget)
                }
                onDelete={() =>
                  handleDeleteBudget(budget)
                }
              />
            ),
          )}
        </div>
      ) : null}

      {isFormDialogOpen ? (
        <ResponsiveDialog
          open
          onOpenChange={
            handleFormOpenChange
          }
          title={
            dialogMode === "add"
              ? "Add Budget"
              : "Edit Budget"
          }
        >
          <BudgetForm
            key={
              selectedBudget?.id ?? "add"
            }
            categories={formCategories}
            defaultValues={
              selectedBudget
                ? {
                    categoryId:
                      selectedBudget.category.id,
                    categoryName:
                      selectedBudget.category.name,
                    limit:
                      selectedBudget.limit,
                  }
                : undefined
            }
            isEditing={
              dialogMode === "edit"
            }
            isCategoriesLoading={
              categoriesQuery.isLoading
            }
            isCategoriesError={
              categoriesQuery.isError
            }
            onRetryCategories={() => {
              void categoriesQuery.refetch();
            }}
            submitLabel={
              dialogMode === "add"
                ? "Save Budget"
                : "Update Budget"
            }
            isPending={isFormPending}
            errorMessage={formError}
            onSubmit={handleBudgetSubmit}
          />
        </ResponsiveDialog>
      ) : null}

      <DeleteBudgetDialog
        open={isDeleteDialogOpen}
        onOpenChange={
          handleDeleteDialogOpenChange
        }
        category={
          selectedBudget?.category.name
        }
        onConfirm={handleDeleteConfirm}
        isPending={
          deleteBudgetMutation.isPending
        }
        errorMessage={deleteError}
      />
    </PageLayout>
  );
}