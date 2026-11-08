
import { Skeleton } from "@/components/ui/skeleton";

export function TransactionsLoadingState() {
  return (
    <div
      role="status"
      aria-label="Loading transactions"
    >
      {/* Desktop table skeleton */}
      <div className="hidden overflow-hidden rounded-lg border border-border bg-surface md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-subtle">
            <tr>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <th key={item} className="px-4 py-3">
                  <Skeleton className="h-4 w-20 rounded-md" />
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-32 rounded-md" />
                </td>

                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-24 rounded-md" />
                </td>

                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-16 rounded-md" />
                </td>

                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-24 rounded-md" />
                </td>

                <td className="px-4 py-4">
                  <Skeleton className="ml-auto h-4 w-20 rounded-md" />
                </td>

                <td className="px-4 py-4">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-12 rounded-md" />
                    <Skeleton className="h-8 w-14 rounded-md" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile list skeleton */}
      <div className="space-y-3 md:hidden">
        {Array.from({ length: 3 }).map((_, index) => (
          <article
            key={index}
            className="rounded-lg border border-border bg-surface p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-36 max-w-full rounded-md" />
                <Skeleton className="h-3 w-24 rounded-md" />
              </div>

              <Skeleton className="h-5 w-20 shrink-0 rounded-md" />
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-12 rounded-md" />
                <Skeleton className="h-7 w-12 rounded-md" />
                <Skeleton className="h-7 w-14 rounded-md" />
              </div>

              <Skeleton className="h-4 w-20 rounded-md" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
