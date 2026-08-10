import type { TechDomain } from "@/types/content";

export const techDomains: TechDomain[] = [
  {
    name: "Frontend & JS Mechanics",
    items: [
      "React",
      "TypeScript (Strict / Generics)",
      "Zod (Schema Validation)",
      "JS Engine Mechanics (Event Loop, Closures)",
      "Tailwind CSS",
      "DOM & Performance Optimization",
    ],
  },
  {
    name: "Backend & Systems Architecture",
    items: [
      "Node.js",
      "Supabase & Row Level Security",
      "PostgreSQL & Schema Design",
      "RESTful APIs & WebSockets",
      "Data Boundaries & Auth Controls",
    ],
  },
  {
    name: "Low-Level & Security Depth",
    items: [
      "C / C++",
      "x86-64 Assembly",
      "Virtual Memory & Execution Models",
      "Burp Suite & Web AppSec (OWASP)",
      "Reverse Engineering",
      "POSIX & Syscalls",
    ],
  },
  {
    name: "Infrastructure & Tooling",
    items: [
      "Linux Server Admin (Debian)",
      "Docker",
      "Git & CI/CD Actions",
      "Bash Automation",
      "SSH & Environment Isolation",
    ],
  },
];