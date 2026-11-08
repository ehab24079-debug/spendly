
import type { ReactNode } from "react";

type PageLayoutProps = {
  children: ReactNode;
};

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <section className="p-4 sm:p-6">
      <div className="space-y-5 sm:space-y-6">
        {children}
      </div>
    </section>
  );
}
