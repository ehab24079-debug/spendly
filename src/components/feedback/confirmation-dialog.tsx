
"use client";

import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";

type ConfirmationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: ReactNode;
  confirmLabel: string;
  pendingLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void | Promise<void>;
  isPending?: boolean;
  errorMessage?: string;
};

export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  pendingLabel = "Processing...",
  cancelLabel = "Cancel",
  onConfirm,
  isPending = false,
  errorMessage,
}: ConfirmationDialogProps) {
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
      <div className="space-y-4 sm:space-y-6">
        <div className="text-xs leading-5 text-foreground-secondary sm:text-sm sm:leading-6">
          {description}
        </div>

        {errorMessage ? (
          <p
            className="text-sm text-danger"
            role="alert"
          >
            {errorMessage}
          </p>
        ) : null}

        <div className="grid grid-cols-2 gap-2 sm:flex sm:justify-end sm:gap-3">
          <Button
            type="button"
            variant="secondary"
            autoFocus
            disabled={isPending}
            onClick={() => handleOpenChange(false)}
            className="w-full sm:w-auto"
          >
            {cancelLabel}
          </Button>

          <Button
            type="button"
            variant="danger"
            disabled={isPending}
            onClick={onConfirm}
            className="w-full sm:w-auto"
          >
            {isPending ? pendingLabel : confirmLabel}
          </Button>
        </div>
      </div>
    </ResponsiveDialog>
  );
}
