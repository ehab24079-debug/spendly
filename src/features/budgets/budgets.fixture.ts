export const budgetsFixture = [
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
];