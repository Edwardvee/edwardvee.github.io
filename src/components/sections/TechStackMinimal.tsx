import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StageSplit } from "@/components/layout/StageSplit";
import { useGsapContext } from "@/hooks/useGsapContext";
import type { TechDomain } from "@/types/content";

gsap.registerPlugin(ScrollTrigger);

interface TechStackMinimalProps {
  domains: TechDomain[];
}

export function TechStackMinimal({ domains }: TechStackMinimalProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(
    sectionRef,
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches;
      if (reduced) return;

      gsap.from("[data-tech-col]", {
        y: 32,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    },
    [domains],
  );

  return (
    <section
      id="tech"
      ref={sectionRef}
      data-section="brutal"
      className="border-t border-ink px-16 py-64 md:px-32 lg:px-48"
    >
      <StageSplit>
        <SectionLabel index="04" label="Capabilities" />
        <h2 className="mt-32 text-display-lg text-ink">Tech Stack</h2>

        <div className="mt-48 grid grid-cols-1 border border-ink bg-paper sm:grid-cols-2">
          {domains.map((domain) => (
            <div
              key={domain.name}
              data-tech-col
              className="border-b border-ink p-24 last:border-b-0 sm:border-r sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
            >
              <h3 className="text-label text-ink">{domain.name}</h3>
              <ul className="mt-24 list-none space-y-8 p-0 font-mono text-body text-ink">
                {domain.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </StageSplit>
    </section>
  );
}
