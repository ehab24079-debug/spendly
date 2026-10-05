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
  onSubmit,
}: TransactionFormDialogProps) {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
    >
      <TransactionForm
        defaultValues={defaultValues}
        submitLabel={submitLabel}
        onSubmit={onSubmit}
      />
    </ResponsiveDialog>
  );
}