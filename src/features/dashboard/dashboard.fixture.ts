export const dashboardFixture = {
  income: 22200,
  expenses: 8450,
  balance: 13750,

  recentTransactions: [
    {
      id: "1",
      description: "Monthly salary",
      category: "Salary",
      type: "income" as const,
      date: "2026-10-01",
      amount: 18000,
    },
    {
      id: "2",
      description: "Groceries",
      category: "Food",
      type: "expense" as const,
      date: "2026-10-03",
      amount: 850,
    },
    {
      id: "3",
      description: "Uber ride",
      category: "Transport",
      type: "expense" as const,
      date: "2026-10-04",
      amount: 160,
    },
  ],

  budgets: [
    {
      id: "food",
      category: "Food",
      spent: 2100,
      limit: 3000,
      progress: 70,
      tone: "positive" as const,
    },
    {
      id: "transport",
      category: "Transport",
      spent: 1700,
      limit: 2000,
      progress: 85,
      tone: "warning" as const,
    },
    {
      id: "shopping",
      category: "Shopping",
      spent: 2700,
      limit: 3000,
      progress: 90,
      tone: "danger" as const,
    },
  ],
};