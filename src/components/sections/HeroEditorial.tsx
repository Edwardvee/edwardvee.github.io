import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StatusPill } from "@/components/ui/StatusPill";
import { StageSplit } from "@/components/layout/StageSplit";
import { useGsapContext } from "@/hooks/useGsapContext";

gsap.registerPlugin(ScrollTrigger);

interface HeroEditorialProps {
  role: string;
  statement: string;
  status: string;
  location: string;
  name?: string;
}

export function HeroEditorial({
  role,
  statement,
  status,
  location,
  name,
}: HeroEditorialProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(
    sectionRef,
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches;
      if (reduced) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from("[data-hero-label]", { y: 24, opacity: 0, duration: 0.8 })
        .from("[data-hero-title]", { y: 80, opacity: 0, duration: 1.1 }, "-=0.4")
        .from(
          "[data-hero-statement]",
          { y: 32, opacity: 0, duration: 0.9 },
          "-=0.6",
        )
        .from(
          "[data-hero-status]",
          { y: 20, opacity: 0, duration: 0.7 },
          "-=0.5",
        );
    },
    [],
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      data-section="editorial"
      className="relative min-h-[100svh] px-16 pb-64 pt-32 md:px-32 lg:px-48"
    >
      <StageSplit>
        <div>
          <div data-hero-label>
            <SectionLabel index="01" label="Hero" />
          </div>

          {name ? (
            <p className="mt-32 text-label text-ink">{name}</p>
          ) : null}

          <h1
            data-hero-title
            className="mt-24 max-w-[12ch] text-display-xl text-ink"
          >
            {role}
          </h1>

          <p
            data-hero-statement
            className="mt-48 max-w-[34ch] text-justify font-mono text-body leading-relaxed text-ink md:mt-64"
          >
            {statement}
          </p>

          <div data-hero-status className="mt-64">
            <StatusPill status={status} location={location} />
          </div>
        </div>
      </StageSplit>
    </section>
  );
}
