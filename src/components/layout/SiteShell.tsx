import type { ReactNode } from "react";
import { CanvasStage } from "@/components/layout/CanvasStage";
import { useScrollTheme } from "@/hooks/useScrollTheme";

interface SiteShellProps {
  children: ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  useScrollTheme();

  return (
    <>
      <CanvasStage />
      <div className="relative z-10 pointer-events-auto bg-transparent text-ink">
        {children}
      </div>
    </>
  );
}
