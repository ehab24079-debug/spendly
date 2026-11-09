import { Card } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/formatters";

type RecentTransaction = {
  id: string;
  description: string;
  category: string;
  type: "income" | "expense";
  date: string;
  amount: number;
};

type DashboardRecentTransactionsProps = {
  transactions: RecentTransaction[];
};

export function DashboardRecentTransactions({
  transactions,
}: DashboardRecentTransactionsProps) {
  return (
    <Card className="p-4 sm:p-5">
      <div className="mb-3 sm:mb-4">
        <h2 className="text-base font-semibold sm:text-lg">
          Recent Transactions
        </h2>

        <p className="mt-1 text-xs text-foreground-secondary sm:text-sm">
          Your latest activity this month.
        </p>
      </div>

      {transactions.length === 0 ? (
        <p className="py-6 text-center text-sm text-foreground-secondary">
          No transactions for this month yet.
        </p>
      ) : (
        <div className="divide-y divide-border">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0 sm:gap-4 sm:py-4"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium sm:text-base">
                  {transaction.description}
                </p>

                <p className="mt-1 text-xs text-foreground-secondary sm:text-sm">
                  {transaction.category} ·{" "}
                  {formatDate(transaction.date)}
                </p>
              </div>

              <p
                className={`shrink-0 whitespace-nowrap text-sm font-semibold sm:text-base ${
                  transaction.type === "income"
                    ? "text-positive"
                    : "text-danger"
                }`}
              >
                {formatCurrency(transaction.amount)}
              </p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}