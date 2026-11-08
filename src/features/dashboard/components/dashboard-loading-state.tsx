
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardLoadingState() {
  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="p-4 sm:p-5">
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="mt-3 h-7 w-32 rounded-md" />
          </Card>
        ))}
      </div>

      <Card className="p-4 sm:p-5">
        <Skeleton className="h-5 w-40 rounded-md" />
        <Skeleton className="mt-2 h-4 w-56 rounded-md" />

        <div className="mt-5 space-y-4 sm:mt-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4"
            >
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-32 max-w-full rounded-md" />
                <Skeleton className="h-3 w-40 max-w-full rounded-md" />
              </div>

              <Skeleton className="h-4 w-20 shrink-0 rounded-md" />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 sm:p-5">
        <Skeleton className="h-5 w-36 rounded-md" />
        <Skeleton className="mt-2 h-4 w-64 max-w-full rounded-md" />

        <div className="mt-5 space-y-5 sm:mt-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index}>
              <div className="mb-2 flex justify-between gap-4">
                <Skeleton className="h-4 w-24 rounded-md" />
                <Skeleton className="h-4 w-32 rounded-md" />
              </div>

              <Skeleton className="h-2 w-full rounded-full" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
