
import { Button } from "@/components/ui/button";
import { StateCard } from "@/components/ui/state-card";

type BudgetsEmptyStateProps = {
  onAddBudget: () => void;
};

export function BudgetsEmptyState({
  onAddBudget,
}: BudgetsEmptyStateProps) {
  return (
    <StateCard
      action={
        <Button
          type="button"
          onClick={onAddBudget}
        >
          Add Budget
        </Button>
      }
    >
      <h2 className="text-lg font-semibold">
        No budgets yet
      </h2>

      <p className="mt-2 text-sm text-foreground-secondary">
        Create your first monthly budget to start tracking your spending limits.
      </p>
    </StateCard>
  );
}
