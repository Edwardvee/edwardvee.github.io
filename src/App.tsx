import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { SiteShell } from "@/components/layout/SiteShell";
import { HeroEditorial } from "@/components/sections/HeroEditorial";
import { WorkBrutalist } from "@/components/sections/WorkBrutalist";
import { ExperienceTable } from "@/components/sections/ExperienceTable";
import { TechStackMinimal } from "@/components/sections/TechStackMinimal";
import { ContactAppFrame } from "@/components/sections/ContactAppFrame";
import { site } from "@/constants/site";
import { projects } from "@/constants/projects";
import { experience } from "@/constants/experience";
import { techDomains } from "@/constants/tech";

export default function App() {
  return (
    <SmoothScrollProvider>
      <SiteShell>
        <main>
          <HeroEditorial
            name={site.name}
            role={site.role}
            statement={site.statement}
            status={site.status}
            location={site.location}
          />
          <WorkBrutalist projects={projects} />
          <ExperienceTable entries={experience} />
          <TechStackMinimal domains={techDomains} />
          <ContactAppFrame
            email={site.email}
            github={site.github}
            linkedin={site.linkedin}
            cvUrl={site.cvUrl}
            cta={site.cta}
          />
        </main>
      </SiteShell>
    </SmoothScrollProvider>
  );
}
