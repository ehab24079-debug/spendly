import { Card } from "@/components/ui/card";

export function DashboardLoadingState() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="animate-pulse p-5">
            <div className="h-4 w-20 rounded bg-surface-subtle" />
            <div className="mt-3 h-7 w-32 rounded bg-surface-subtle" />
          </Card>
        ))}
      </div>

      <Card className="animate-pulse p-5">
        <div className="h-5 w-40 rounded bg-surface-subtle" />
        <div className="mt-2 h-4 w-56 rounded bg-surface-subtle" />

        <div className="mt-6 space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-surface-subtle" />
                <div className="h-3 w-40 rounded bg-surface-subtle" />
              </div>

              <div className="h-4 w-20 rounded bg-surface-subtle" />
            </div>
          ))}
        </div>
      </Card>

      <Card className="animate-pulse p-5">
        <div className="h-5 w-36 rounded bg-surface-subtle" />
        <div className="mt-2 h-4 w-64 rounded bg-surface-subtle" />

        <div className="mt-6 space-y-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index}>
              <div className="mb-2 flex justify-between gap-4">
                <div className="h-4 w-24 rounded bg-surface-subtle" />
                <div className="h-4 w-32 rounded bg-surface-subtle" />
              </div>

              <div className="h-2 w-full rounded-full bg-surface-subtle" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}