
import { Select } from "@/components/ui/select";
import { PageHeader } from "@/components/layout/page-header";
import { PageLayout } from "@/components/layout/page-layout";

import { dashboardFixture } from "../dashboard.fixture";

import { DashboardBudgetOverview } from "./dashboard-budget-overview";
import { DashboardRecentTransactions } from "./dashboard-recent-transactions";
import { DashboardSummary } from "./dashboard-summary";

export function DashboardView() {
  return (
    <PageLayout>
      <PageHeader
        actions={
          <Select
            aria-label="Select month"
            defaultValue="october-2026"
            className="w-full sm:w-44"
          >
            <option value="october-2026">October 2026</option>
            <option value="september-2026">September 2026</option>
            <option value="august-2026">August 2026</option>
          </Select>
        }
      >
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-foreground-secondary">
          Overview of your monthly finances.
        </p>
      </PageHeader>

      <DashboardSummary
        income={dashboardFixture.income}
        expenses={dashboardFixture.expenses}
        balance={dashboardFixture.balance}
      />

      <DashboardRecentTransactions
        transactions={dashboardFixture.recentTransactions}
      />

      <DashboardBudgetOverview
        budgets={dashboardFixture.budgets}
      />
    </PageLayout>
  );
}
