
import type { ReactNode } from "react";

type PageHeaderProps = {
  children: ReactNode;
  actions?: ReactNode;
};

export function PageHeader({
  children,
  actions,
}: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="min-w-0">
        {children}
      </div>

      {actions ? (
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
          {actions}
        </div>
      ) : null}
    </header>
  );
}
