"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { AppHeader } from "./app-header";
import { MobileNavigation } from "./mobile-navigation";
import { Sidebar } from "./sidebar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function handleThemeToggle() {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light",
    );
  }

  function handleSidebarToggle() {
    setIsSidebarOpen((current) => !current);
  }

  function handleSidebarClose() {
    setIsSidebarOpen(false);
  }

  useEffect(() => {
    if (!isSidebarOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsSidebarOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isSidebarOpen]);

  return (
    <div
      data-theme={theme}
      className="min-h-screen bg-background text-foreground md:flex"
    >
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleSidebarClose}
      />

      <div className="min-w-0 flex-1">
        <AppHeader
          theme={theme}
          onThemeToggle={handleThemeToggle}
          isSidebarOpen={isSidebarOpen}
          onSidebarToggle={handleSidebarToggle}
        />

        <main className="pb-16 md:pb-0">
          {children}
        </main>
      </div>

      <MobileNavigation />
    </div>
  );
}