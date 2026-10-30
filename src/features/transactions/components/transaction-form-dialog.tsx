"use client";

import { ResponsiveDialog } from "@/components/ui/responsive-dialog";

import type { TransactionFormValues } from "../transaction-form.schema";

import { TransactionForm } from "./transaction-form";

type TransactionFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  defaultValues?: Partial<TransactionFormValues>;
  submitLabel: string;
  pendingSubmitLabel?: string;
  submitError?: string;
  isPending: boolean;
  onSubmit: (
    values: TransactionFormValues,
  ) => void | Promise<void>;
};

export function TransactionFormDialog({
  open,
  onOpenChange,
  title,
  defaultValues,
  submitLabel,
  pendingSubmitLabel,
  submitError,
  isPending,
  onSubmit,
}: TransactionFormDialogProps) {
  function handleOpenChange(nextOpen: boolean) {
    if (isPending && !nextOpen) {
      return;
    }

    onOpenChange(nextOpen);
  }

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={handleOpenChange}
      title={title}
    >
      <TransactionForm
        defaultValues={defaultValues}
        submitLabel={submitLabel}
        pendingSubmitLabel={pendingSubmitLabel}
        submitError={submitError}
        isPending={isPending}
        onSubmit={onSubmit}
      />
    </ResponsiveDialog>
  );
}