import type { ReactNode } from "react";

import { MobileNavigation } from "./mobile-navigation";
import { Sidebar } from "./sidebar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background md:flex">
      <Sidebar />

      <main className="min-w-0 flex-1 pb-16 md:pb-0">{children}</main>

      <MobileNavigation />
    </div>
  );
}