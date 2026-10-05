"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

import { categoriesFixture } from "../categories.fixture";
import {
  transactionFormSchema,
  type TransactionFormValues,
} from "../transaction-form.schema";

type TransactionFormProps = {
  defaultValues?: Partial<TransactionFormValues>;
  submitLabel: string;
  onSubmit: (
    values: TransactionFormValues,
  ) => void | Promise<void>;
};

export function TransactionForm({
  defaultValues,
  submitLabel,
  onSubmit,
}: TransactionFormProps) {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
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

  const availableCategories = selectedType
    ? categoriesFixture.filter(
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

    const selectedCategory = categoriesFixture.find(
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

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="space-y-1.5">
        <label htmlFor="transaction-type" className="text-sm font-medium">
          Type
        </label>

        <Select
          id="transaction-type"
          {...typeField}
          onChange={handleTypeChange}
        >
          <option value="">Select type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </Select>

        {errors.type?.message ? (
          <p className="text-sm text-red-600" role="alert">
            {errors.type.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="transaction-amount" className="text-sm font-medium">
          Amount
        </label>

        <Input
          id="transaction-amount"
          type="number"
          step="any"
          {...register("amount", {
            valueAsNumber: true,
          })}
        />

        {errors.amount?.message ? (
          <p className="text-sm text-red-600" role="alert">
            {errors.amount.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="transaction-category"
          className="text-sm font-medium"
        >
          Category
        </label>

        <Select
          id="transaction-category"
          disabled={!selectedType}
          {...register("categoryId")}
        >
          <option value="">Select category</option>

          {availableCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>

        {errors.categoryId?.message ? (
          <p className="text-sm text-red-600" role="alert">
            {errors.categoryId.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="transaction-date" className="text-sm font-medium">
          Date
        </label>

        <Input
          id="transaction-date"
          type="date"
          {...register("date")}
        />

        {errors.date?.message ? (
          <p className="text-sm text-red-600" role="alert">
            {errors.date.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="transaction-description"
          className="text-sm font-medium"
        >
          Description
        </label>

        <Input
          id="transaction-description"
          type="text"
          placeholder="Optional description"
          {...register("description")}
        />

        {errors.description?.message ? (
          <p className="text-sm text-red-600" role="alert">
            {errors.description.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {submitLabel}
      </Button>
    </form>
  );
}