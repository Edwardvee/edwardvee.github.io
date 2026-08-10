import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StageSplit } from "@/components/layout/StageSplit";
import { useGsapContext } from "@/hooks/useGsapContext";
import type { ExperienceEntry } from "@/types/content";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceTableProps {
  entries: ExperienceEntry[];
}

const KIND_LABEL: Record<ExperienceEntry["kind"], string> = {
  role: "Role",
  internship: "Internship",
  education: "Education",
  cert: "Certification",
};

export function ExperienceTable({ entries }: ExperienceTableProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(
    sectionRef,
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches;
      if (reduced) return;

      gsap.from("[data-exp-row]", {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    },
    [entries],
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      data-section="brutal"
      className="border-t border-ink px-16 py-64 md:px-32 lg:px-48"
    >
      <StageSplit>
        <SectionLabel index="03" label="Trajectory" />
        <h2 className="mt-32 text-display-lg text-ink">Experience</h2>
        <p className="mt-16 max-w-[40ch] font-mono text-body text-ink">
          My professional journey
        </p>

        <div className="mt-48 border border-ink bg-paper">
          {entries.map((entry) => (
            <article
              key={entry.id}
              data-exp-row
              className="border-b border-ink p-16 last:border-b-0 md:p-24"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-8">
                <p className="font-mono text-body text-ink">{entry.period}</p>
                <p className="text-label text-ink">{KIND_LABEL[entry.kind]}</p>
              </div>
              <h3 className="mt-16 font-display text-[1.75rem] leading-tight text-ink">
                {entry.title}
              </h3>
              <p className="mt-8 text-label text-ink">{entry.org}</p>
              <ul className="mt-16 list-none space-y-8 p-0 font-mono text-body text-ink">
                {entry.impact.map((item) => (
                  <li key={item} className="flex gap-8">
                    <span aria-hidden="true">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </StageSplit>
    </section>
  );
}
