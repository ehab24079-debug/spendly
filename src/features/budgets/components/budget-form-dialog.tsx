"use client";

import { ResponsiveDialog } from "@/components/ui/responsive-dialog";

import { BudgetForm } from "./budget-form";

type BudgetFormValues = {
  category: string;
  limit: number;
};

type BudgetFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  defaultValues?: BudgetFormValues;
  submitLabel?: string;
};

export function BudgetFormDialog({
  open,
  onOpenChange,
  title,
  defaultValues,
  submitLabel,
}: BudgetFormDialogProps) {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
    >
      <BudgetForm
        defaultValues={defaultValues}
        submitLabel={submitLabel}
      />
    </ResponsiveDialog>
  );
}