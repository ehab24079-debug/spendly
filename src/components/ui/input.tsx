import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`
        h-10 w-full rounded-md
        border border-border bg-surface
        px-3 text-sm text-foreground
        outline-none transition-colors
        placeholder:text-foreground-secondary
        focus-visible:ring-2
        focus-visible:ring-focus-ring
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
      {...props}
    />
  );
}