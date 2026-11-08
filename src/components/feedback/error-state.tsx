import { Button } from "@/components/ui/button";
import { StateCard } from "@/components/ui/state-card";

type ErrorStateProps = {
  title: string;
  description: string;
  onRetry?: () => void;
  isRetrying?: boolean;
};

export function ErrorState({
  title,
  description,
  onRetry,
  isRetrying = false,
}: ErrorStateProps) {
  return (
    <StateCard
      action={
        onRetry ? (
          <Button
            type="button"
            variant="secondary"
            disabled={isRetrying}
            onClick={onRetry}
          >
            {isRetrying ? "Retrying..." : "Try again"}
          </Button>
        ) : undefined
      }
    >
      <h2 className="text-lg font-semibold">
        {title}
      </h2>

      <p className="mt-2 text-sm text-foreground-secondary">
        {description}
      </p>
    </StateCard>
  );
}