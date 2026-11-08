
import Link from "next/link";

import { StateCard } from "@/components/ui/state-card";

export function DashboardEmptyState() {
  return (
    <StateCard
      action={
        <Link
          href="/transactions"
          className="
            inline-flex h-10 items-center justify-center
            rounded-md bg-accent px-4
            text-sm font-medium text-white
            transition-colors hover:bg-accent-hover
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-focus-ring
          "
        >
          Go to Transactions
        </Link>
      }
    >
      <h2 className="text-lg font-semibold">
        No financial activity yet
      </h2>

      <p className="mt-2 text-sm text-foreground-secondary">
        Add your first transaction to start seeing your monthly overview.
      </p>
    </StateCard>
  );
}
