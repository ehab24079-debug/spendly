export type TransactionType = "income" | "expense";

export type Category = {
  id: string;
  name: string;
};

export type Transaction = {
  id: string;
  description?: string;
  category: Category;
  type: TransactionType;
  date: string;
  amount: number;
};