export type ExperienceKind = "role" | "internship" | "education" | "cert";

export type ScrollTheme = "editorial" | "brutal" | "app";

export interface Project {
  id: string;
  title: string;
  stack: string[];
  problem: string;
  liveUrl?: string;
  repoUrl?: string;
}

export interface ExperienceEntry {
  id: string;
  period: string;
  title: string;
  org: string;
  kind: ExperienceKind;
  impact: string[];
}

export interface TechDomain {
  name: string;
  items: string[];
}

export interface WebsiteLeadCopy {
  label: string;
  title: string;
  body: string;
  cta: string;
  dismiss: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  statement: string;
  status: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  cvUrl: string;
  cta: string;
  websiteLead: WebsiteLeadCopy;
}
