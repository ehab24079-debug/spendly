
"use client";

import { ConfirmationDialog } from "@/components/feedback/confirmation-dialog";

type DeleteTransactionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void | Promise<void>;
  isPending: boolean;
  errorMessage?: string;
};

export function DeleteTransactionDialog({
  open,
  onOpenChange,
  onConfirm,
  isPending,
  errorMessage,
}: DeleteTransactionDialogProps) {
  return (
    <ConfirmationDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete transaction?"
      description="This action cannot be undone. This transaction will be permanently deleted."
      confirmLabel="Delete transaction"
      pendingLabel="Deleting..."
      onConfirm={onConfirm}
      isPending={isPending}
      errorMessage={errorMessage}
    />
  );
}
