
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BudgetsLoadingState() {
  return (
    <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="p-4 sm:p-5">
          <div className="mb-3 flex items-start justify-between gap-3 sm:mb-4 sm:gap-4">
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-3 w-32 max-w-full rounded-md" />
            </div>

            <Skeleton className="h-4 w-10 shrink-0 rounded-md" />
          </div>

          <Skeleton className="h-2 w-full rounded-full" />

          <div className="mt-4 flex justify-end gap-2 sm:mt-5">
            <Skeleton className="h-9 w-16 rounded-md sm:h-10" />
            <Skeleton className="h-9 w-20 rounded-md sm:h-10" />
          </div>
        </Card>
      ))}
    </div>
  );
}
