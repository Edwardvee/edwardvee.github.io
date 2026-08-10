import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ScrollTheme } from "@/types/content";

gsap.registerPlugin(ScrollTrigger);

const SECTION_THEMES: { id: string; theme: ScrollTheme }[] = [
  { id: "hero", theme: "editorial" },
  { id: "work", theme: "brutal" },
  { id: "experience", theme: "brutal" },
  { id: "tech", theme: "brutal" },
  { id: "contact", theme: "app" },
];

export function useScrollTheme() {
  useEffect(() => {
    const triggers = SECTION_THEMES.map(({ id, theme }) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => document.documentElement.setAttribute("data-theme", theme),
        onEnterBack: () =>
          document.documentElement.setAttribute("data-theme", theme),
      }),
    );

    document.documentElement.setAttribute("data-theme", "editorial");

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);
}
