
"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { PageHeader } from "@/components/layout/page-header";
import { PageLayout } from "@/components/layout/page-layout";

import { budgetsFixture } from "../budgets.fixture";

import { BudgetCard } from "./budget-card";
import { BudgetFormDialog } from "./budget-form-dialog";
import { DeleteBudgetDialog } from "./delete-budget-dialog";

type DialogMode = "add" | "edit";

type SelectedBudget = {
  category: string;
  limit: number;
} | null;

export function BudgetsView() {
  const [dialogMode, setDialogMode] = useState<DialogMode>("add");
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [selectedBudget, setSelectedBudget] =
    useState<SelectedBudget>(null);

  function handleAddBudget() {
    setDialogMode("add");
    setSelectedBudget(null);
    setIsFormDialogOpen(true);
  }

  function handleEditBudget(category: string, limit: number) {
    setDialogMode("edit");
    setSelectedBudget({
      category,
      limit,
    });
    setIsFormDialogOpen(true);
  }

  function handleDeleteBudget(category: string, limit: number) {
    setSelectedBudget({
      category,
      limit,
    });
    setIsDeleteDialogOpen(true);
  }

  return (
    <PageLayout>
      <PageHeader
        actions={
          <>
            <Select
              aria-label="Select month"
              defaultValue="october-2026"
              className="w-full sm:w-44"
            >
              <option value="october-2026">October 2026</option>
              <option value="september-2026">September 2026</option>
              <option value="august-2026">August 2026</option>
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

      <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
        {budgetsFixture.map((budget) => (
          <BudgetCard
            key={budget.id}
            category={budget.category}
            spent={budget.spent}
            limit={budget.limit}
            progress={budget.progress}
            tone={budget.tone}
            onEdit={() =>
              handleEditBudget(budget.id, budget.limit)
            }
            onDelete={() =>
              handleDeleteBudget(budget.category, budget.limit)
            }
          />
        ))}
      </div>

      {isFormDialogOpen && (
        <BudgetFormDialog
          open={isFormDialogOpen}
          onOpenChange={setIsFormDialogOpen}
          title={dialogMode === "add" ? "Add Budget" : "Edit Budget"}
          defaultValues={
            dialogMode === "edit" && selectedBudget
              ? selectedBudget
              : undefined
          }
          submitLabel={
            dialogMode === "add" ? "Save Budget" : "Update Budget"
          }
        />
      )}

      <DeleteBudgetDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        category={selectedBudget?.category}
        onConfirm={() => setIsDeleteDialogOpen(false)}
      />
    </PageLayout>
  );
}
