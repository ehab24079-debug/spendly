import { formatCurrency, formatDate } from "@/lib/formatters";

import type { Transaction } from "../types";

type TransactionsTableProps = {
  transactions: Transaction[];
  onEditTransaction?: (transaction: Transaction) => void;
  onDeleteTransaction?: (transaction: Transaction) => void;
};

export function TransactionsTable({
  transactions,
  onEditTransaction,
  onDeleteTransaction,
}: TransactionsTableProps) {
  const hasActions = onEditTransaction || onDeleteTransaction;

  return (
    <div className="hidden overflow-hidden rounded-lg border border-border bg-surface md:block">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface-subtle text-foreground-secondary">
          <tr>
            <th className="px-4 py-3 font-medium">Description</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 text-right font-medium">
              Amount
            </th>
            <th className="px-4 py-3 text-right font-medium">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border">
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-4 py-3 font-medium">
                {transaction.description || "—"}
              </td>

              <td className="px-4 py-3 text-foreground-secondary">
                {transaction.category.name}
              </td>

              <td className="px-4 py-3 capitalize">
                {transaction.type}
              </td>

              <td className="px-4 py-3 text-foreground-secondary">
                {formatDate(transaction.date)}
              </td>

              <td className="px-4 py-3 text-right font-medium">
                {formatCurrency(transaction.amount)}
              </td>

              <td className="px-4 py-3">
                {hasActions ? (
                  <div className="flex justify-end gap-1">
                    {onEditTransaction ? (
                      <button
                        type="button"
                        onClick={() =>
                          onEditTransaction(transaction)
                        }
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

                    {onDeleteTransaction ? (
                      <button
                        type="button"
                        onClick={() =>
                          onDeleteTransaction(transaction)
                        }
                        className="
                          rounded-md px-2 py-1
                          font-medium text-danger
                          transition-colors
                          hover:bg-surface-subtle
                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-focus-ring
                        "
                      >
                        Delete
                      </button>
                    ) : null}
                  </div>
                ) : (
                  <div className="text-right text-foreground-secondary">
                    —
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}