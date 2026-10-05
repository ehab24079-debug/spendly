import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export function TransactionControls() {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      <Select aria-label="Select month" defaultValue="october-2026">
        <option value="october-2026">October 2026</option>
        <option value="september-2026">September 2026</option>
        <option value="august-2026">August 2026</option>
      </Select>

      <Input
        type="search"
        placeholder="Search transactions..."
        aria-label="Search transactions"
      />

      <Select aria-label="Filter by type" defaultValue="all">
        <option value="all">All types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </Select>

      <Select aria-label="Filter by category" defaultValue="all">
        <option value="all">All categories</option>
        <option value="salary">Salary</option>
        <option value="freelance">Freelance</option>
        <option value="other-income">Other Income</option>
        <option value="food">Food</option>
        <option value="transport">Transport</option>
        <option value="bills">Bills</option>
        <option value="shopping">Shopping</option>
        <option value="entertainment">Entertainment</option>
        <option value="other-expense">Other Expense</option>
      </Select>
    </div>
  );
}