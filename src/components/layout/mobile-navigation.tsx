import { NavigationLink } from "./navigation-link";
import { navigationItems } from "./navigation-items";

export function MobileNavigation() {
  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface md:hidden"
    >
      <ul className="grid grid-cols-3">
        {navigationItems.map((item) => (
          <li key={item.href}>
            <NavigationLink
              href={item.href}
              label={item.label}
              className="flex min-h-16 items-center justify-center px-3"
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}