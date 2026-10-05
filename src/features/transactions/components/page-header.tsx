import { Button } from "@/components/ui/button";

type PageHeaderProps = {
  onAddTransaction: () => void;
};

export function PageHeader({
  onAddTransaction,
}: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Transactions
        </h1>

        <p className="mt-1 text-sm text-foreground-secondary">
          Review and manage your monthly transactions.
        </p>
      </div>

      <Button
        type="button"
        onClick={onAddTransaction}
      >
        Add Transaction
      </Button>
    </div>
  );
}