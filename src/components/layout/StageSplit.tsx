import type { ReactNode } from "react";

interface StageSplitProps {
  children: ReactNode;
  className?: string;
  /** Extra classes for the content column */
  contentClassName?: string;
}

/**
 * Wide-screen split: ~5/8 content, ~3/8 statue rail.
 * Below `lg`, content is full width.
 */
export function StageSplit({
  children,
  className = "",
  contentClassName = "",
}: StageSplitProps) {
  return (
    <div
      className={`mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-8 lg:items-start lg:gap-32 ${className}`}
    >
      <div className={`min-w-0 lg:col-span-5 ${contentClassName}`}>
        {children}
      </div>
      <div
        className="pointer-events-none relative hidden min-h-[70svh] lg:col-span-3 lg:block"
        aria-hidden="true"
        data-statue-rail
      />
    </div>
  );
}
