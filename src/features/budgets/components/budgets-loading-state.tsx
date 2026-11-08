import { Card } from "@/components/ui/card";

export function BudgetsLoadingState() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="animate-pulse p-5">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="h-4 w-24 rounded bg-surface-subtle" />
              <div className="h-3 w-32 rounded bg-surface-subtle" />
            </div>

            <div className="h-4 w-10 rounded bg-surface-subtle" />
          </div>

          <div className="h-2 w-full rounded-full bg-surface-subtle" />

          <div className="mt-5 flex justify-end gap-2">
            <div className="h-10 w-16 rounded-md bg-surface-subtle" />
            <div className="h-10 w-20 rounded-md bg-surface-subtle" />
          </div>
        </Card>
      ))}
    </div>
  );
}