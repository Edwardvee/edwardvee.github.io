import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, GitBranch, Link2, Mail } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useGsapContext } from "@/hooks/useGsapContext";

gsap.registerPlugin(ScrollTrigger);

interface ContactAppFrameProps {
  email: string;
  github: string;
  linkedin: string;
  cvUrl: string;
  cta: string;
}

export function ContactAppFrame({
  email,
  github,
  linkedin,
  cvUrl,
  cta,
}: ContactAppFrameProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(
    sectionRef,
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches;
      if (reduced) return;

      gsap.from("[data-device]", {
        y: 64,
        opacity: 0,
        scale: 0.96,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    },
    [],
  );

  const actions = [
    {
      href: email,
      label: "Email",
      icon: Mail,
      external: false,
    },
    {
      href: github,
      label: "GitHub",
      icon: GitBranch,
      external: true,
    },
    {
      href: linkedin,
      label: "LinkedIn",
      icon: Link2,
      external: true,
    },
  ] as const;

  return (
    <section
      id="contact"
      ref={sectionRef}
      data-section="app"
      className="flex min-h-[100svh] flex-col items-center justify-center border-t border-ink px-16 py-80 md:px-32"
    >
      <div className="mb-48 w-full max-w-[1400px]">
        <SectionLabel index="05" label="Contact" />
      </div>

      <div
        data-device
        className="relative w-full max-w-[360px] rounded-[2rem] border-2 border-ink bg-paper p-16 shadow-none"
      >
        <div
          className="mx-auto mb-16 h-8 w-32 rounded-full bg-ink"
          aria-hidden
        />

        <div className="overflow-hidden rounded-[1.5rem] border border-ink bg-paper">
          <header className="border-b border-ink px-24 py-16">
            <p className="text-label text-ink">Inbox</p>
            <h2 className="mt-16 font-display text-[2.25rem] leading-none text-ink">
              {cta}
            </h2>
          </header>

          <div className="flex flex-col">
            {actions.map(({ href, label, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-16 border-b border-ink px-24 py-16 transition-colors hover:bg-ink hover:text-paper"
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <Icon className="size-16 stroke-[1.25]" aria-hidden />
                <span className="font-mono text-body">{label}</span>
              </a>
            ))}

            <a
              href={cvUrl}
              download
              className="flex items-center gap-16 px-24 py-16 transition-colors hover:bg-ink hover:text-paper"
            >
              <Download className="size-16 stroke-[1.25]" aria-hidden />
              <span className="font-mono text-body">Download CV (PDF)</span>
            </a>
          </div>

          <footer className="border-t border-ink px-24 py-16 text-center text-label text-ink">
            Prefer direct channels · No forms
          </footer>
        </div>
      </div>
    </section>
  );
}
