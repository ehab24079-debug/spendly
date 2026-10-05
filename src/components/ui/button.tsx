import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  secondary:
    "border border-border bg-surface text-foreground hover:bg-surface-subtle",
  danger: "bg-danger text-white",
};

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center
        rounded-md px-4 py-2
        text-sm font-medium
        transition-colors
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-focus-ring
        disabled:pointer-events-none
        disabled:opacity-50
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}