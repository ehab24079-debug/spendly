import { transactionsFixture } from "../transactions.fixture";

import { PageHeader } from "./page-header";
import { TransactionControls } from "./transaction-controls";
import { TransactionsList } from "./transactions-list";
import { TransactionsTable } from "./transactions-table";

export function TransactionsView() {
  return (
    <section className="p-6">
      <div className="space-y-6">
        <PageHeader />
        <TransactionControls />

        <TransactionsTable transactions={transactionsFixture} />
        <TransactionsList transactions={transactionsFixture} />
      </div>
    </section>
  );
}