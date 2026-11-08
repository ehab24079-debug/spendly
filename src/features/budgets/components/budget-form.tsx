import { Button } from "@/components/ui/button";
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
      <div>
        <label
          htmlFor="budget-category"
          className="mb-1.5 block text-xs font-medium sm:mb-2 sm:text-sm"
        >
          Category
        </label>

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
      </div>

      <div>
        <label
          htmlFor="budget-limit"
          className="mb-1.5 block text-xs font-medium sm:mb-2 sm:text-sm"
        >
          Monthly limit
        </label>

        <Input
          id="budget-limit"
          type="number"
          min="0"
          step="0.01"
          placeholder="Enter budget amount"
          defaultValue={defaultValues?.limit}
        />
      </div>

      <Button type="button" className="w-full">
        {submitLabel}
      </Button>
    </div>
  );
}