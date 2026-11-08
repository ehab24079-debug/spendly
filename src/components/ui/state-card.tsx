
import type { ReactNode } from "react";

import { Card } from "./card";

type StateCardProps = {
  children: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function StateCard({
  children,
  action,
  className = "",
}: StateCardProps) {
  return (
    <Card
      className={`
        flex flex-col items-center justify-center
        px-6 py-10 text-center sm:py-12
        ${className}
      `}
    >
      <div className="max-w-sm">
        {children}
      </div>

      {action ? (
        <div className="mt-5">
          {action}
        </div>
      ) : null}
    </Card>
  );
}
