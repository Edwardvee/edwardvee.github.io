import { useEffect, useId, useRef, useState } from "react";
import { useLenisControls } from "@/context/LenisContext";
import { useSceneGate } from "@/context/SceneGateContext";
import type { WebsiteLeadCopy } from "@/types/content";

const PARAM = "need-website";

function isNeedWebsiteParamPresent(): boolean {
  const params = new URLSearchParams(window.location.search);
  if (!params.has(PARAM)) return false;
  const value = params.get(PARAM);
  if (value === null || value === "") return true;
  const normalized = value.toLowerCase();
  return normalized !== "0" && normalized !== "false" && normalized !== "no";
}

function stripNeedWebsiteParam(): void {
  const url = new URL(window.location.href);
  if (!url.searchParams.has(PARAM)) return;
  url.searchParams.delete(PARAM);
  const next = `${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState(null, "", next);
}

interface WebsiteLeadModalProps {
  copy: WebsiteLeadCopy;
}

export function WebsiteLeadModal({ copy }: WebsiteLeadModalProps) {
  const titleId = useId();
  const bodyId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const { introDone } = useSceneGate();
  const { lenisRef, stop, start } = useLenisControls();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!introDone) return;
    if (!isNeedWebsiteParamPresent()) return;
    setOpen(true);
  }, [introDone]);

  useEffect(() => {
    if (!open) return;

    stop();
    const previousFocus = document.activeElement as HTMLElement | null;
    ctaRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        stripNeedWebsiteParam();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      start();
      previousFocus?.focus?.();
    };
  }, [open, start, stop]);

  function dismiss() {
    setOpen(false);
    stripNeedWebsiteParam();
  }

  function goToContact() {
    dismiss();
    // Let Lenis restart after dismiss cleanup, then scroll.
    requestAnimationFrame(() => {
      lenisRef.current?.start();
      lenisRef.current?.scrollTo("#contact", { offset: 0 });
    });
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-paper/90 px-16"
      onClick={(event) => {
        if (event.target === event.currentTarget) dismiss();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={bodyId}
        className="w-full max-w-md border-2 border-ink bg-paper p-32 text-ink"
      >
        <p className="text-label uppercase tracking-[0.14em] text-ink">
          {copy.label}
        </p>
        <h2
          id={titleId}
          className="mt-16 font-display text-[clamp(2rem,6vw,3rem)] leading-[0.95] text-ink"
        >
          {copy.title}
        </h2>
        <p id={bodyId} className="mt-24 font-mono text-body text-ink">
          {copy.body}
        </p>

        <div className="mt-40 flex flex-col gap-16 sm:flex-row sm:items-center">
          <button
            ref={ctaRef}
            type="button"
            onClick={goToContact}
            className="border border-ink px-24 py-16 font-mono text-body transition-colors hover:bg-ink hover:text-paper"
          >
            {copy.cta}
          </button>
          <button
            type="button"
            onClick={dismiss}
            className="px-8 py-16 font-mono text-label uppercase tracking-[0.14em] text-ink underline-offset-4 hover:underline"
          >
            {copy.dismiss}
          </button>
        </div>
      </div>
    </div>
  );
}
