import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/formatters";

type BudgetCardProps = {
  category: string;
  spent: number;
  limit: number;
  progress: number;
  tone: "positive" | "warning" | "danger";
  onEdit: () => void;
  onDelete: () => void;
};

export function BudgetCard({
  category,
  spent,
  limit,
  progress,
  tone,
  onEdit,
  onDelete,
}: BudgetCardProps) {
  return (
    <Card className="p-4 sm:p-5">
      <div className="mb-3 flex items-start justify-between gap-3 sm:mb-4 sm:gap-4">
        <div className="min-w-0">
          <h2 className="break-words text-sm font-semibold sm:text-base">
            {category}
          </h2>

          <p className="mt-1 break-words text-xs text-foreground-secondary sm:text-sm">
            {formatCurrency(spent)} of {formatCurrency(limit)}
          </p>
        </div>

        <span className="shrink-0 pt-0.5 text-xs font-medium text-foreground-secondary sm:text-sm">
          {progress}%
        </span>
      </div>

      <Progress value={progress} tone={tone} />

      <div className="mt-4 flex justify-end gap-2 sm:mt-5">
        <Button
          type="button"
          variant="secondary"
          onClick={onEdit}
          className="h-9 px-3 text-xs sm:h-10 sm:px-4 sm:text-sm"
        >
          Edit
        </Button>

        <Button
          type="button"
          variant="danger"
          onClick={onDelete}
          className="h-9 px-3 text-xs sm:h-10 sm:px-4 sm:text-sm"
        >
          Delete
        </Button>
      </div>
    </Card>
  );
}