type ProgressTone = "accent" | "positive" | "warning" | "danger";

type ProgressProps = {
  value: number;
  tone?: ProgressTone;
};

const toneClasses: Record<ProgressTone, string> = {
  accent: "bg-accent",
  positive: "bg-positive",
  warning: "bg-warning",
  danger: "bg-danger",
};

export function Progress({
  value,
  tone = "accent",
}: ProgressProps) {
  return (
    <div
      className="h-2 w-full overflow-hidden rounded-full bg-surface-subtle"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
    >
      <div
        className={`h-full rounded-full ${toneClasses[tone]}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}