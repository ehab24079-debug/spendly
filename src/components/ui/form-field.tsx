
import type { ReactNode } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  children: ReactNode;
  error?: string;
  className?: string;
  labelClassName?: string;
};

export function FormField({
  id,
  label,
  children,
  error,
  className = "",
  labelClassName = "",
}: FormFieldProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label
        htmlFor={id}
        className={`block text-sm font-medium ${labelClassName}`}
      >
        {label}
      </label>

      {children}

      {error ? (
        <p
          id={`${id}-error`}
          className="text-sm text-danger"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
