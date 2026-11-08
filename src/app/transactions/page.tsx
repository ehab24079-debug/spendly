
import { Suspense } from "react";

import { PageLayout } from "@/components/layout/page-layout";

import { TransactionsLoadingState } from "@/features/transactions/components/transactions-loading-state";
import { TransactionsView } from "@/features/transactions/components/transactions-view";

export default function TransactionsPage() {
  return (
    <Suspense
      fallback={
        <PageLayout>
          <TransactionsLoadingState />
        </PageLayout>
      }
    >
      <TransactionsView />
    </Suspense>
  );
}
