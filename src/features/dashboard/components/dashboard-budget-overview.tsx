
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/formatters";

type BudgetItem = {
  id: string;
  category: string;
  spent: number;
  limit: number;
  progress: number;
  tone: "positive" | "warning" | "danger";
};

type DashboardBudgetOverviewProps = {
  budgets: BudgetItem[];
};

export function DashboardBudgetOverview({
  budgets,
}: DashboardBudgetOverviewProps) {
  return (
    <Card className="p-4 sm:p-5">
      <div className="mb-4 sm:mb-5">
        <h2 className="text-base font-semibold sm:text-lg">
          Budget Overview
        </h2>

        <p className="mt-1 text-xs text-foreground-secondary sm:text-sm">
          Track your spending against monthly limits.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-5">
        {budgets.map((budget) => (
          <div key={budget.id}>
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="min-w-0 truncate text-sm font-medium sm:text-base">
                {budget.category}
              </span>

              <span className="shrink-0 whitespace-nowrap text-xs text-foreground-secondary sm:text-sm">
                {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
              </span>
            </div>

            <Progress value={budget.progress} tone={budget.tone} />
          </div>
        ))}
      </div>
    </Card>
  );
}
