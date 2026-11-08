
"use client";

import { ConfirmationDialog } from "@/components/feedback/confirmation-dialog";

type DeleteBudgetDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: string;
  onConfirm: () => void;
};

export function DeleteBudgetDialog({
  open,
  onOpenChange,
  category,
  onConfirm,
}: DeleteBudgetDialogProps) {
  return (
    <ConfirmationDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete budget?"
      description={
        category
          ? `Are you sure you want to delete the ${category} budget? This action cannot be undone.`
          : "Are you sure you want to delete this budget? This action cannot be undone."
      }
      confirmLabel="Delete budget"
      onConfirm={onConfirm}
    />
  );
}
