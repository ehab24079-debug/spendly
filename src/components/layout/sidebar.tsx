import Link from "next/link";

import { NavigationLink } from "./navigation-link";
import { navigationItems } from "./navigation-items";

export function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-border bg-surface md:block">
      <div className="flex h-full flex-col px-4 py-6">
        <Link
          href="/"
          className="mb-8 px-3 text-xl font-semibold tracking-tight"
        >
          Spendly
        </Link>

        <nav aria-label="Main navigation">
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <NavigationLink
                  href={item.href}
                  label={item.label}
                  className="block px-3 py-2"
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}