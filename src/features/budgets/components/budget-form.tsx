
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

type BudgetFormValues = {
  category: string;
  limit: number;
};

type BudgetFormProps = {
  defaultValues?: BudgetFormValues;
  submitLabel?: string;
};

export function BudgetForm({
  defaultValues,
  submitLabel = "Save Budget",
}: BudgetFormProps) {
  return (
    <div className="space-y-4 sm:space-y-5">
      <FormField
        id="budget-category"
        label="Category"
        labelClassName="text-xs font-medium sm:text-sm"
        className="sm:space-y-2"
      >
        <Select
          id="budget-category"
          defaultValue={defaultValues?.category ?? ""}
        >
          <option value="" disabled>
            Select category
          </option>
          <option value="food">Food</option>
          <option value="transport">Transport</option>
          <option value="bills">Bills</option>
          <option value="shopping">Shopping</option>
          <option value="entertainment">Entertainment</option>
          <option value="other-expense">Other Expense</option>
        </Select>
      </FormField>

      <FormField
        id="budget-limit"
        label="Monthly limit"
        labelClassName="text-xs font-medium sm:text-sm"
        className="sm:space-y-2"
      >
        <Input
          id="budget-limit"
          type="number"
          min="0"
          step="0.01"
          placeholder="Enter budget amount"
          defaultValue={defaultValues?.limit}
        />
      </FormField>

      <Button type="button" className="w-full">
        {submitLabel}
      </Button>
    </div>
  );
}
