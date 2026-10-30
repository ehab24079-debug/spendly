"use client";

import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";

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
      title="Delete transaction?"
    >
      <div className="space-y-6">
        <p className="text-sm text-foreground-secondary">
          This action cannot be undone. This transaction will be
          permanently deleted.
        </p>

        {errorMessage ? (
          <p className="text-sm text-danger" role="alert">
            {errorMessage}
          </p>
        ) : null}

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            autoFocus
            disabled={isPending}
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="danger"
            disabled={isPending}
            onClick={onConfirm}
          >
            {isPending ? "Deleting..." : "Delete transaction"}
          </Button>
        </div>
      </div>
    </ResponsiveDialog>
  );
}