import { formatCurrency, formatDate } from "@/lib/formatters";

import type { Transaction } from "../types";

type TransactionsListProps = {
  transactions: Transaction[];
  onEditTransaction?: (transaction: Transaction) => void;
};

export function TransactionsList({
  transactions,
  onEditTransaction,
}: TransactionsListProps) {
  return (
    <div className="space-y-3 md:hidden">
      {transactions.map((transaction) => (
        <article
          key={transaction.id}
          className="rounded-lg border border-border bg-surface p-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="truncate font-medium">
                {transaction.description || "No description"}
              </h2>

              <p className="mt-1 text-sm text-foreground-secondary">
                {transaction.category.name}
              </p>
            </div>

            <p
              className={`shrink-0 font-semibold ${
                transaction.type === "income"
                  ? "text-positive"
                  : "text-danger"
              }`}
            >
              {formatCurrency(transaction.amount)}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 text-sm text-foreground-secondary">
            <div className="flex items-center gap-3">
              <span className="capitalize">{transaction.type}</span>

              {onEditTransaction ? (
                <button
                  type="button"
                  onClick={() => onEditTransaction(transaction)}
                  className="
                    rounded-md px-2 py-1
                    font-medium text-foreground-secondary
                    transition-colors
                    hover:bg-surface-subtle
                    hover:text-foreground
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-focus-ring
                  "
                >
                  Edit
                </button>
              ) : null}
            </div>

            <time dateTime={transaction.date}>
              {formatDate(transaction.date)}
            </time>
          </div>
        </article>
      ))}
    </div>
  );
}