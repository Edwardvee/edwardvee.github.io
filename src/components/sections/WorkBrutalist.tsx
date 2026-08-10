import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GitBranch } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Tag } from "@/components/ui/Tag";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Rule } from "@/components/ui/Rule";
import { StageSplit } from "@/components/layout/StageSplit";
import { useGsapContext } from "@/hooks/useGsapContext";
import type { Project } from "@/types/content";

gsap.registerPlugin(ScrollTrigger);

interface WorkBrutalistProps {
  projects: Project[];
}

export function WorkBrutalist({ projects }: WorkBrutalistProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(
    sectionRef,
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches;
      if (reduced) return;

      gsap.from("[data-work-row]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    },
    [projects],
  );

  return (
    <section
      id="work"
      ref={sectionRef}
      data-section="brutal"
      className="border-t border-ink px-16 py-64 md:px-32 lg:px-48"
    >
      <StageSplit>
        <SectionLabel index="02" label="Selected Work" />
        <h2 className="mt-32 text-display-lg text-ink">Projects</h2>
        <p className="mt-16 max-w-[40ch] font-mono text-body text-ink">
          Featured Repos
        </p>

        <div className="mt-48 border border-ink bg-paper">
          {projects.map((project, index) => (
            <article
              key={project.id}
              data-work-row
              className="border-b border-ink p-16 last:border-b-0 md:p-24"
            >
              <div className="flex items-baseline justify-between gap-16">
                <span className="text-label text-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-wrap items-center gap-16">
                  {project.liveUrl ? (
                    <ExternalLink href={project.liveUrl}>Live</ExternalLink>
                  ) : null}
                  {project.repoUrl ? (
                    <ExternalLink href={project.repoUrl}>
                      <span className="inline-flex items-center gap-8">
                        <GitBranch
                          className="size-16 stroke-[1.25]"
                          aria-hidden
                        />
                        Repo
                      </span>
                    </ExternalLink>
                  ) : null}
                </div>
              </div>

              <h3 className="mt-16 font-display text-[2rem] leading-none text-ink md:text-[2.35rem]">
                {project.title}
              </h3>

              <div className="mt-16 flex flex-wrap gap-8">
                {project.stack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>

              <p className="mt-16 text-label text-ink">Problem</p>
              <p className="mt-8 font-mono text-body text-ink">
                {project.problem}
              </p>
            </article>
          ))}
        </div>

        <Rule className="mt-48" />
      </StageSplit>
    </section>
  );
}
