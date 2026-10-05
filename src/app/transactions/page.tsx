import { Suspense } from "react";

import { TransactionsView } from "@/features/transactions/components/transactions-view";

export default function TransactionsPage() {
  return (
    <Suspense fallback={null}>
      <TransactionsView />
    </Suspense>
  );
}