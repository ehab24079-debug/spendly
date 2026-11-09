"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { Category } from "@/features/transactions/types";

const budgetFormSchema = z.object({
  categoryId: z.string().min(1, "Category is required."),
  limit: z
    .number({ error: "Monthly limit is required." })
    .positive("Monthly limit must be greater than 0."),
});

export type BudgetFormValues = z.infer<
  typeof budgetFormSchema
>;

type BudgetFormProps = {
  categories: Category[];
  defaultValues?: Partial<BudgetFormValues> & {
    categoryName?: string;
  };
  isEditing: boolean;
  isCategoriesLoading: boolean;
  isCategoriesError: boolean;
  onRetryCategories: () => void;
  submitLabel: string;
  isPending: boolean;
  errorMessage?: string;
  onSubmit: (
    values: BudgetFormValues,
  ) => void | Promise<void>;
};

export function BudgetForm({
  categories,
  defaultValues,
  isEditing,
  isCategoriesLoading,
  isCategoriesError,
  onRetryCategories,
  submitLabel,
  isPending,
  errorMessage,
  onSubmit,
}: BudgetFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetFormSchema),
    defaultValues: {
      categoryId: defaultValues?.categoryId ?? "",
      limit: defaultValues?.limit,
    },
  });

  const isBusy = isPending || isSubmitting;

  const isCategoryUnavailable =
    !isEditing &&
    (isCategoriesLoading ||
      isCategoriesError ||
      categories.length === 0);

  return (
    <form
      className="space-y-4 sm:space-y-5"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <FormField
        id="budget-category"
        label="Category"
        labelClassName="text-xs font-medium sm:text-sm"
        className="sm:space-y-2"
        error={errors.categoryId?.message}
      >
        <Select
          id="budget-category"
          disabled={isEditing || isCategoryUnavailable}
          {...register("categoryId")}
        >
          <option value="">
            {isCategoriesLoading && !isEditing
              ? "Loading categories..."
              : isCategoriesError && !isEditing
                ? "Failed to load categories"
                : categories.length === 0 && !isEditing
                  ? "No available categories"
                  : "Select category"}
          </option>

          {isEditing && defaultValues?.categoryId ? (
            <option value={defaultValues.categoryId}>
              {defaultValues.categoryName}
            </option>
          ) : (
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
          )}
        </Select>
      </FormField>

      {isCategoriesError && !isEditing ? (
        <div className="space-y-2">
          <p className="text-sm text-danger" role="alert">
            Failed to load expense categories.
          </p>

          <Button
            type="button"
            variant="secondary"
            disabled={isBusy}
            onClick={onRetryCategories}
          >
            Retry categories
          </Button>
        </div>
      ) : null}

      <FormField
        id="budget-limit"
        label="Monthly limit"
        labelClassName="text-xs font-medium sm:text-sm"
        className="sm:space-y-2"
        error={errors.limit?.message}
      >
        <Input
          id="budget-limit"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Enter budget amount"
          {...register("limit", {
            valueAsNumber: true,
          })}
        />
      </FormField>

      {errorMessage ? (
        <p className="text-sm text-danger" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={isBusy || isCategoryUnavailable}
        className="w-full"
      >
        {isBusy ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}