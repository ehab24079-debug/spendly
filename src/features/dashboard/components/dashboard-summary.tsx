import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";

type DashboardSummaryProps = {
  income: number;
  expenses: number;
  balance: number;
};

export function DashboardSummary({
  income,
  expenses,
  balance,
}: DashboardSummaryProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
      <Card className="p-4 sm:p-5">
        <p className="text-xs font-medium text-foreground-secondary sm:text-sm">
          Income
        </p>

        <p className="mt-1 text-xl font-semibold text-positive sm:mt-2 sm:text-2xl">
          {formatCurrency(income)}
        </p>
      </Card>

      <Card className="p-4 sm:p-5">
        <p className="text-xs font-medium text-foreground-secondary sm:text-sm">
          Expenses
        </p>

        <p className="mt-1 text-xl font-semibold text-danger sm:mt-2 sm:text-2xl">
          {formatCurrency(expenses)}
        </p>
      </Card>

      <Card className="p-4 sm:col-span-2 sm:p-5 xl:col-span-1">
        <p className="text-xs font-medium text-foreground-secondary sm:text-sm">
          Balance
        </p>

        <p className="mt-1 text-xl font-semibold sm:mt-2 sm:text-2xl">
          {formatCurrency(balance)}
        </p>
      </Card>
    </div>
  );
}