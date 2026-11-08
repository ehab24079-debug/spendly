
import { Button } from "@/components/ui/button";
import { StateCard } from "@/components/ui/state-card";

type BudgetsErrorStateProps = {
  onRetry?: () => void;
};

export function BudgetsErrorState({
  onRetry,
}: BudgetsErrorStateProps) {
  return (
    <StateCard
      action={
        onRetry ? (
          <Button
            type="button"
            variant="secondary"
            onClick={onRetry}
          >
            Try again
          </Button>
        ) : undefined
      }
    >
      <h2 className="text-lg font-semibold">
        Unable to load budgets
      </h2>

      <p className="mt-2 text-sm text-foreground-secondary">
        Something went wrong while loading your budgets. Please try again.
      </p>
    </StateCard>
  );
}
