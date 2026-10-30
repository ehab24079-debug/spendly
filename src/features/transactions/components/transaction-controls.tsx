"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

import { useCategoriesQuery } from "../transactions.queries";

function getMonthValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
}

function getCurrentMonth() {
  return getMonthValue(new Date());
}

function formatMonth(month: string) {
  const match = /^(\d{4})-(\d{2})$/.exec(month);

  if (!match) {
    return month;
  }

  const year = Number(match[1]);
  const monthNumber = Number(match[2]);

  if (monthNumber < 1 || monthNumber > 12) {
    return month;
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, monthNumber - 1, 1));
}

function getMonthOptions(selectedMonth: string, count = 3) {
  const now = new Date();

  const options = Array.from({ length: count }, (_, index) => {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - index,
      1,
    );

    const value = getMonthValue(date);

    return {
      value,
      label: formatMonth(value),
    };
  });

  const hasSelectedMonth = options.some(
    (month) => month.value === selectedMonth,
  );

  if (
    !hasSelectedMonth &&
    /^\d{4}-(0[1-9]|1[0-2])$/.test(selectedMonth)
  ) {
    options.push({
      value: selectedMonth,
      label: formatMonth(selectedMonth),
    });
  }

  return options;
}

export function TransactionControls() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useCategoriesQuery();

  const currentMonth = getCurrentMonth();
  const selectedMonth = searchParams.get("month") ?? currentMonth;
  const monthOptions = getMonthOptions(selectedMonth);

  const search = searchParams.get("search") ?? "";
  const selectedType = searchParams.get("type") ?? "all";
  const selectedCategory = searchParams.get("category") ?? "all";

  const hasCategories = categories.length > 0;

  const isCategoriesUnavailable =
    isCategoriesError && !hasCategories;

  const isCategoriesInitialLoading =
    isCategoriesLoading && !hasCategories;

  const availableCategories =
    selectedType === "all"
      ? categories
      : categories.filter(
          (category) => category.type === selectedType,
        );

  function updateSearchParams(
    name: string,
    value: string,
    defaultValue = "",
  ) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === defaultValue) {
      params.delete(name);
    } else {
      params.set(name, value);
    }

    const queryString = params.toString();

    router.push(
      queryString ? `${pathname}?${queryString}` : pathname,
    );
  }

  function handleMonthChange(month: string) {
    updateSearchParams("month", month, currentMonth);
  }

  function handleSearchChange(searchValue: string) {
    updateSearchParams("search", searchValue);
  }

  function handleTypeChange(type: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (type === "all") {
      params.delete("type");
    } else {
      params.set("type", type);
    }

    const currentCategory = categories.find(
      (category) => category.id === selectedCategory,
    );

    const isCategoryIncompatible =
      type !== "all" &&
      currentCategory !== undefined &&
      currentCategory.type !== type;

    if (isCategoryIncompatible) {
      params.delete("category");
    }

    const queryString = params.toString();

    router.push(
      queryString ? `${pathname}?${queryString}` : pathname,
    );
  }

  function handleCategoryChange(category: string) {
    updateSearchParams("category", category, "all");
  }

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      <Select
        aria-label="Select month"
        value={selectedMonth}
        onChange={(event) =>
          handleMonthChange(event.target.value)
        }
      >
        {monthOptions.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </Select>

      <Input
        type="search"
        placeholder="Search transactions..."
        aria-label="Search transactions"
        value={search}
        onChange={(event) =>
          handleSearchChange(event.target.value)
        }
      />

      <Select
        aria-label="Filter by type"
        value={selectedType}
        onChange={(event) =>
          handleTypeChange(event.target.value)
        }
      >
        <option value="all">All types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </Select>

      <Select
        aria-label="Filter by category"
        value={selectedCategory}
        disabled={
          isCategoriesInitialLoading ||
          isCategoriesUnavailable
        }
        onChange={(event) =>
          handleCategoryChange(event.target.value)
        }
      >
        <option value="all">
          {isCategoriesInitialLoading
            ? "Loading categories..."
            : isCategoriesUnavailable
              ? "Failed to load categories"
              : "All categories"}
        </option>

        {availableCategories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
    </div>
  );
}