import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  showIcon?: boolean;
  download?: boolean | string;
}

export function ExternalLink({
  href,
  children,
  className = "",
  showIcon = true,
  download,
}: ExternalLinkProps) {
  const isMail = href.startsWith("mailto:");

  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-8 border-b border-ink pb-4 hover:bg-ink hover:text-paper ${className}`}
      {...(isMail || download
        ? {}
        : { target: "_blank", rel: "noopener noreferrer" })}
      {...(download ? { download: download === true ? true : download } : {})}
    >
      <span>{children}</span>
      {showIcon ? (
        <ArrowUpRight
          className="size-16 shrink-0 stroke-[1.25]"
          aria-hidden="true"
        />
      ) : null}
    </a>
  );
}
