import type { Transaction } from "./types";

export const transactionsFixture: Transaction[] = [
  {
    id: "1",
    description: "Monthly salary",
    category: {
      id: "salary",
      name: "Salary",
      type: "income",
    },
    type: "income",
    date: "2026-10-01",
    amount: 18000,
  },
  {
    id: "2",
    description: "Groceries",
    category: {
      id: "food",
      name: "Food",
      type: "expense",
    },
    type: "expense",
    date: "2026-10-03",
    amount: 850,
  },
  {
    id: "3",
    description: "Uber ride",
    category: {
      id: "transport",
      name: "Transport",
      type: "expense",
    },
    type: "expense",
    date: "2026-10-04",
    amount: 160,
  },
  {
    id: "4",
    description: "Freelance project",
    category: {
      id: "freelance",
      name: "Freelance",
      type: "income",
    },
    type: "income",
    date: "2026-10-05",
    amount: 4200,
  },
  {
    id: "5",
    description: "September groceries",
    category: {
      id: "food",
      name: "Food",
      type: "expense",
    },
    type: "expense",
    date: "2026-09-15",
    amount: 620,
  },
  {
    id: "6",
    description: "August transport",
    category: {
      id: "transport",
      name: "Transport",
      type: "expense",
    },
    type: "expense",
    date: "2026-08-20",
    amount: 120,
  },
];