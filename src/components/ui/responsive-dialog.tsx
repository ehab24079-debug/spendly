"use client";

import {
  type MouseEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
} from "react";

type ResponsiveDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
};

export function ResponsiveDialog({
  open,
  onOpenChange,
  title,
  children,
}: ResponsiveDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      onOpenChange(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClick={handleBackdropClick}
      onCancel={() => onOpenChange(false)}
      onClose={() => {
        if (open) {
          onOpenChange(false);
        }
      }}
      className="
        fixed
        inset-x-4
        bottom-4
        top-auto
        m-0
        w-auto
        max-h-[85dvh]
        overflow-hidden
        rounded-2xl
        border border-border
        bg-surface
        p-0
        text-foreground
        shadow-xl
        backdrop:bg-black/40
        sm:inset-0
        sm:m-auto
        sm:w-full
        sm:max-h-[90vh]
        sm:max-w-lg
        sm:rounded-xl
      "
    >
      <div className="flex max-h-[85dvh] flex-col sm:max-h-[90vh]">
        <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 sm:px-6">
          <h2 id={titleId} className="text-lg font-semibold">
            {title}
          </h2>

          <button
            type="button"
            aria-label="Close dialog"
            onClick={() => onOpenChange(false)}
            className="
              flex size-9 items-center justify-center
              rounded-md
              text-xl leading-none
              text-foreground-secondary
              transition-colors
              hover:bg-background
              hover:text-foreground
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-focus-ring
            "
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto p-4 sm:p-6">
          {children}
        </div>
      </div>
    </dialog>
  );
}