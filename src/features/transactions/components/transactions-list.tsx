import { formatCurrency, formatDate } from "@/lib/formatters";

import type { Transaction } from "../types";

type TransactionsListProps = {
  transactions: Transaction[];
};

export function TransactionsList({
  transactions,
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
            <span className="capitalize">{transaction.type}</span>
            <time dateTime={transaction.date}>
              {formatDate(transaction.date)}
            </time>
          </div>
        </article>
      ))}
    </div>
  );
}