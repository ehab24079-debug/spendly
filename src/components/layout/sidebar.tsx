
import Link from "next/link";

import { NavigationLink } from "./navigation-link";
import { navigationItems } from "./navigation-items";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

type SidebarContentProps = {
  onClose?: () => void;
};

function SidebarContent({ onClose }: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col px-4 py-6">
      <div className="mb-8 flex items-center justify-between gap-2 px-3">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight"
        >
          Spendly
        </Link>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            title="Close navigation"
            autoFocus
            className="
              flex size-11 shrink-0
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
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>

      <nav aria-label="Main navigation">
        <ul className="space-y-1">
          {navigationItems.map((item) => (
            <li key={item.href}>
              <NavigationLink
                href={item.href}
                label={item.label}
                onNavigate={onClose}
                className="block px-3 py-2"
              />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="
          hidden min-h-screen w-64 shrink-0
          border-e border-border bg-surface
          min-[1024px]:block
        "
      >
        <SidebarContent />
      </aside>

      {/* Tablet Sidebar */}
      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={onClose}
            className="
              fixed inset-0 z-40
              hidden bg-black/40
              min-[768px]:block
              min-[1024px]:hidden
            "
          />

          <aside
            id="tablet-navigation"
            aria-label="Tablet navigation"
            className="
              fixed inset-y-0 start-0 z-50
              hidden h-dvh w-64
              border-e border-border
              bg-surface shadow-xl
              min-[768px]:block
              min-[1024px]:hidden
            "
          >
            <SidebarContent onClose={onClose} />
          </aside>
        </>
      )}
    </>
  );
}
