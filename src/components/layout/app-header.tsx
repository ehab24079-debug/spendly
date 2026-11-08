
import { ThemeToggle } from "./theme-toggle";

type AppHeaderProps = {
  theme: "light" | "dark";
  onThemeToggle: () => void;
  isSidebarOpen: boolean;
  onSidebarToggle: () => void;
};

export function AppHeader({
  theme,
  onThemeToggle,
  isSidebarOpen,
  onSidebarToggle,
}: AppHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-surface px-4 sm:px-6">
      <button
        type="button"
        onClick={onSidebarToggle}
        aria-label={
          isSidebarOpen ? "Close navigation" : "Open navigation"
        }
        aria-expanded={isSidebarOpen}
        aria-controls="tablet-navigation"
        title="Toggle navigation"
        className="
          hidden
          size-11 shrink-0
          items-center justify-center
          rounded-lg
          border border-border
          bg-surface-subtle
          text-accent
          shadow-sm
          transition-colors
          hover:bg-background
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-focus-ring
          min-[768px]:inline-flex
          min-[1024px]:hidden
        "
      >
        <svg
          viewBox="0 0 24 24"
          className="size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M4 6h16" />
          <path d="M4 12h16" />
          <path d="M4 18h16" />
        </svg>
      </button>

      <div className="ms-auto">
        <ThemeToggle
          theme={theme}
          onToggle={onThemeToggle}
        />
      </div>
    </header>
  );
}
