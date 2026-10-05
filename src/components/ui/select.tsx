import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className = "", children, ...props }: SelectProps) {
  return (
    <select
      className={`
        h-10 w-full rounded-md
        border border-border bg-surface
        px-3 text-sm text-foreground
        outline-none transition-colors
        focus-visible:ring-2
        focus-visible:ring-focus-ring
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
      {...props}
    >
      {children}
    </select>
  );
}