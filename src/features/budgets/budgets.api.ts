import type {
  Budget,
  CreateBudgetInput,
  UpdateBudgetInput,
} from "./types";

import type { TransactionType } from "../transactions/types";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

type StrapiCategory = {
  id: number;
  documentId: string;
  name: string;
  type: TransactionType;
};

type StrapiBudget = {
  id: number;
  documentId: string;
  limit: number | string;
  category: StrapiCategory;
};

type StrapiCollectionResponse<T> = {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

function mapBudget(budget: StrapiBudget): Budget {
  return {
    id: budget.documentId,
    limit: Number(budget.limit),
    category: {
      id: budget.category.documentId,
      name: budget.category.name,
      type: budget.category.type,
    },
  };
}

async function getBudgetsPage(
  page: number,
): Promise<StrapiCollectionResponse<StrapiBudget>> {
  const params = new URLSearchParams();

  params.set("populate", "category");
  params.set("pagination[page]", String(page));

  const response = await fetch(
    `${STRAPI_URL}/api/budgets?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch budgets.");
  }

  return response.json() as Promise<
    StrapiCollectionResponse<StrapiBudget>
  >;
}

export async function getBudgets(): Promise<Budget[]> {
  const firstPage = await getBudgetsPage(1);

  const budgets = [...firstPage.data];

  for (
    let page = 2;
    page <= firstPage.meta.pagination.pageCount;
    page += 1
  ) {
    const nextPage = await getBudgetsPage(page);
    budgets.push(...nextPage.data);
  }

  return budgets.map(mapBudget);
}

export async function createBudget(
  input: CreateBudgetInput,
): Promise<void> {
  const response = await fetch(`${STRAPI_URL}/api/budgets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        limit: input.limit,
        category: input.categoryId,
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create budget.");
  }
}

export async function updateBudget(
  input: UpdateBudgetInput,
): Promise<void> {
  const response = await fetch(
    `${STRAPI_URL}/api/budgets/${input.budgetId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          limit: input.limit,
        },
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update budget.");
  }
}

export async function deleteBudget(
  budgetId: string,
): Promise<void> {
  const response = await fetch(
    `${STRAPI_URL}/api/budgets/${budgetId}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete budget.");
  }
}