import type {
  Category,
  Transaction,
  TransactionType,
} from "./types";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

type StrapiCategory = {
  id: number;
  documentId: string;
  name: string;
  type: TransactionType;
};

type StrapiTransaction = {
  id: number;
  documentId: string;
  amount: number | string;
  type: TransactionType;
  date: string;
  description?: string | null;
  category: StrapiCategory;
};

type StrapiPagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

type StrapiCollectionResponse<T> = {
  data: T[];
  meta: {
    pagination: StrapiPagination;
  };
};

export type TransactionInput = {
  amount: number;
  type: TransactionType;
  categoryId: string;
  date: string;
  description?: string;
};

function mapCategory(category: StrapiCategory): Category {
  return {
    id: category.documentId,
    name: category.name,
    type: category.type,
  };
}

function mapTransaction(transaction: StrapiTransaction): Transaction {
  return {
    id: transaction.documentId,
    amount: Number(transaction.amount),
    type: transaction.type,
    category: mapCategory(transaction.category),
    date: transaction.date,
    description: transaction.description ?? undefined,
  };
}

function getMonthRange(month: string) {
  const match = /^(\d{4})-(\d{2})$/.exec(month);

  if (!match) {
    throw new Error("Month must use YYYY-MM format.");
  }

  const year = Number(match[1]);
  const monthNumber = Number(match[2]);

  if (monthNumber < 1 || monthNumber > 12) {
    throw new Error("Month must be between 01 and 12.");
  }

  const nextYear = monthNumber === 12 ? year + 1 : year;
  const nextMonth = monthNumber === 12 ? 1 : monthNumber + 1;

  const start = `${year}-${String(monthNumber).padStart(2, "0")}-01`;
  const nextMonthStart =
    `${nextYear}-${String(nextMonth).padStart(2, "0")}-01`;

  return {
    start,
    nextMonthStart,
  };
}

async function getTransactionsPage(
  month: string,
  page: number,
): Promise<StrapiCollectionResponse<StrapiTransaction>> {
  const { start, nextMonthStart } = getMonthRange(month);

  const params = new URLSearchParams();

  params.set("filters[date][$gte]", start);
  params.set("filters[date][$lt]", nextMonthStart);
  params.set("populate", "category");
  params.set("pagination[page]", String(page));

  const response = await fetch(
    `${STRAPI_URL}/api/transactions?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch transactions.");
  }

  return response.json() as Promise<
    StrapiCollectionResponse<StrapiTransaction>
  >;
}

export async function getTransactionsByMonth(
  month: string,
): Promise<Transaction[]> {
  const firstPage = await getTransactionsPage(month, 1);

  const transactions = [...firstPage.data];

  for (
    let page = 2;
    page <= firstPage.meta.pagination.pageCount;
    page += 1
  ) {
    const nextPage = await getTransactionsPage(month, page);

    transactions.push(...nextPage.data);
  }

  return transactions.map(mapTransaction);
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${STRAPI_URL}/api/categories`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories.");
  }

  const result =
    (await response.json()) as StrapiCollectionResponse<StrapiCategory>;

  return result.data.map(mapCategory);
}

export async function createTransaction(
  input: TransactionInput,
): Promise<void> {
  const response = await fetch(`${STRAPI_URL}/api/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        amount: input.amount,
        type: input.type,
        category: input.categoryId,
        date: input.date,
        description: input.description || null,
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create transaction.");
  }
}

export async function updateTransaction(
  transactionId: string,
  input: TransactionInput,
): Promise<void> {
  const response = await fetch(
    `${STRAPI_URL}/api/transactions/${transactionId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          amount: input.amount,
          type: input.type,
          category: input.categoryId,
          date: input.date,
          description: input.description || null,
        },
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update transaction.");
  }
}

export async function deleteTransaction(
  transactionId: string,
): Promise<void> {
  const response = await fetch(
    `${STRAPI_URL}/api/transactions/${transactionId}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete transaction.");
  }
}