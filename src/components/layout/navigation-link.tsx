"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavigationLinkProps = {
  href: string;
  label: string;
  className?: string;
  onNavigate?: () => void;
};

export function NavigationLink({
  href,
  label,
  className = "",
  onNavigate,
}: NavigationLinkProps) {
  const pathname = usePathname();

  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={`
        rounded-md text-sm font-medium transition-colors
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-focus-ring
        ${
          isActive
            ? "bg-surface-subtle text-accent"
            : "text-foreground-secondary hover:bg-surface-subtle hover:text-foreground"
        }
        ${className}
      `}
    >
      {label}
    </Link>
  );
}