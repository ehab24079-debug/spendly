"use client";

import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";

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
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete budget?"
    >
      <div className="space-y-4 sm:space-y-6">
        <p className="text-xs leading-5 text-foreground-secondary sm:text-sm sm:leading-6">
          {category
            ? `Are you sure you want to delete the ${category} budget? This action cannot be undone.`
            : "Are you sure you want to delete this budget? This action cannot be undone."}
        </p>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:justify-end sm:gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="danger"
            onClick={onConfirm}
            className="w-full sm:w-auto"
          >
            Delete budget
          </Button>
        </div>
      </div>
    </ResponsiveDialog>
  );
}