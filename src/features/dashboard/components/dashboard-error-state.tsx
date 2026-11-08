
import { Button } from "@/components/ui/button";
import { StateCard } from "@/components/ui/state-card";

type DashboardErrorStateProps = {
  onRetry?: () => void;
};

export function DashboardErrorState({
  onRetry,
}: DashboardErrorStateProps) {
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
        Unable to load dashboard
      </h2>

      <p className="mt-2 text-sm text-foreground-secondary">
        Something went wrong while loading your financial overview.
      </p>
    </StateCard>
  );
}
