import { z } from "zod";

import { categoriesFixture } from "./categories.fixture";

function getTodayDate() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export const transactionFormSchema = z
  .object({
    amount: z
      .number({
        error: "Amount is required.",
      })
      .positive("Amount must be greater than 0."),

    type: z.enum(["income", "expense"], {
      error: "Type is required.",
    }),

    categoryId: z.string().min(1, "Category is required."),

    date: z
      .string()
      .min(1, "Date is required.")
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must use YYYY-MM-DD format."),

    description: z.string().trim().optional(),
  })
  .superRefine((values, context) => {
    const category = categoriesFixture.find(
      (item) => item.id === values.categoryId,
    );

    if (!category) {
      context.addIssue({
        code: "custom",
        path: ["categoryId"],
        message: "Select a valid category.",
      });

      return;
    }

    if (category.type !== values.type) {
      context.addIssue({
        code: "custom",
        path: ["categoryId"],
        message: "Category must match the transaction type.",
      });
    }

    if (values.date > getTodayDate()) {
      context.addIssue({
        code: "custom",
        path: ["date"],
        message: "Transaction date cannot be in the future.",
      });
    }
  });

export type TransactionFormValues = z.infer<typeof transactionFormSchema>;