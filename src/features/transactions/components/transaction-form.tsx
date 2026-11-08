
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

import {
  createTransactionFormSchema,
  type TransactionFormValues,
} from "../transaction-form.schema";
import { useCategoriesQuery } from "../transactions.queries";

type TransactionFormProps = {
  defaultValues?: Partial<TransactionFormValues>;
  submitLabel: string;
  pendingSubmitLabel?: string;
  submitError?: string;
  isPending?: boolean;
  onSubmit: (
    values: TransactionFormValues,
  ) => void | Promise<void>;
};

export function TransactionForm({
  defaultValues,
  submitLabel,
  pendingSubmitLabel = submitLabel,
  submitError,
  isPending = false,
  onSubmit,
}: TransactionFormProps) {
  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useCategoriesQuery();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(
      createTransactionFormSchema(categories),
    ),
    defaultValues: {
      categoryId: "",
      date: "",
      description: "",
      ...defaultValues,
    },
  });

  const selectedType = useWatch({
    control,
    name: "type",
  });

  const hasCategories = categories.length > 0;

  const isCategoriesUnavailable =
    isCategoriesError && !hasCategories;

  const isCategoriesInitialLoading =
    isCategoriesLoading && !hasCategories;

  const availableCategories = selectedType
    ? categories.filter(
        (category) => category.type === selectedType,
      )
    : [];

  const typeField = register("type");

  function handleTypeChange(
    event: React.ChangeEvent<HTMLSelectElement>,
  ) {
    typeField.onChange(event);

    const nextType = event.target.value;
    const selectedCategoryId = getValues("categoryId");

    const selectedCategory = categories.find(
      (category) => category.id === selectedCategoryId,
    );

    if (
      selectedCategory &&
      selectedCategory.type !== nextType
    ) {
      setValue("categoryId", "", {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }

  const isSubmitPending = isSubmitting || isPending;

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <FormField
        id="transaction-type"
        label="Type"
        error={errors.type?.message}
      >
        <Select
          id="transaction-type"
          aria-describedby={
            errors.type?.message
              ? "transaction-type-error"
              : undefined
          }
          {...typeField}
          onChange={handleTypeChange}
        >
          <option value="">Select type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </Select>
      </FormField>

      <FormField
        id="transaction-amount"
        label="Amount"
        error={errors.amount?.message}
      >
        <Input
          id="transaction-amount"
          type="number"
          step="any"
          aria-describedby={
            errors.amount?.message
              ? "transaction-amount-error"
              : undefined
          }
          {...register("amount", {
            valueAsNumber: true,
          })}
        />
      </FormField>

      <FormField
        id="transaction-category"
        label="Category"
        error={errors.categoryId?.message}
      >
        <Select
          id="transaction-category"
          aria-describedby={
            errors.categoryId?.message
              ? "transaction-category-error"
              : undefined
          }
          disabled={
            !selectedType ||
            isCategoriesInitialLoading ||
            isCategoriesUnavailable
          }
          {...register("categoryId")}
        >
          <option value="">
            {isCategoriesInitialLoading
              ? "Loading categories..."
              : isCategoriesUnavailable
                ? "Failed to load categories"
                : "Select category"}
          </option>

          {availableCategories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField
        id="transaction-date"
        label="Date"
        error={errors.date?.message}
      >
        <Input
          id="transaction-date"
          type="date"
          aria-describedby={
            errors.date?.message
              ? "transaction-date-error"
              : undefined
          }
          {...register("date")}
        />
      </FormField>

      <FormField
        id="transaction-description"
        label="Description"
        error={errors.description?.message}
      >
        <Input
          id="transaction-description"
          type="text"
          placeholder="Optional description"
          aria-describedby={
            errors.description?.message
              ? "transaction-description-error"
              : undefined
          }
          {...register("description")}
        />
      </FormField>

      {submitError ? (
        <p className="text-sm text-danger" role="alert">
          {submitError}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={
          isSubmitPending ||
          isCategoriesInitialLoading ||
          isCategoriesUnavailable
        }
      >
        {isSubmitPending
          ? pendingSubmitLabel
          : submitLabel}
      </Button>
    </form>
  );
}
