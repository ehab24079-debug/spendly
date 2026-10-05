"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

import { categoriesFixture } from "../categories.fixture";

function getCurrentMonth() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
}

export function TransactionControls() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentMonth = getCurrentMonth();
  const selectedMonth = searchParams.get("month") ?? currentMonth;
  const search = searchParams.get("search") ?? "";
  const selectedType = searchParams.get("type") ?? "all";
  const selectedCategory = searchParams.get("category") ?? "all";

  const availableCategories =
    selectedType === "all"
      ? categoriesFixture
      : categoriesFixture.filter(
          (category) => category.type === selectedType,
        );

  function updateSearchParams(name: string, value: string, defaultValue = "") {
    const params = new URLSearchParams(searchParams.toString());

    if (value === defaultValue) {
      params.delete(name);
    } else {
      params.set(name, value);
    }

    const queryString = params.toString();

    router.push(queryString ? `${pathname}?${queryString}` : pathname);
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

    const currentCategory = categoriesFixture.find(
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

    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  }

  function handleCategoryChange(category: string) {
    updateSearchParams("category", category, "all");
  }

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      <Select
        aria-label="Select month"
        value={selectedMonth}
        onChange={(event) => handleMonthChange(event.target.value)}
      >
        <option value="2026-10">October 2026</option>
        <option value="2026-09">September 2026</option>
        <option value="2026-08">August 2026</option>
      </Select>

      <Input
        type="search"
        placeholder="Search transactions..."
        aria-label="Search transactions"
        value={search}
        onChange={(event) => handleSearchChange(event.target.value)}
      />

      <Select
        aria-label="Filter by type"
        value={selectedType}
        onChange={(event) => handleTypeChange(event.target.value)}
      >
        <option value="all">All types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </Select>

      <Select
        aria-label="Filter by category"
        value={selectedCategory}
        onChange={(event) => handleCategoryChange(event.target.value)}
      >
        <option value="all">All categories</option>

        {availableCategories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
    </div>
  );
}