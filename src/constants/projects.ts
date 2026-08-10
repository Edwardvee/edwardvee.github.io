import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    id: "instant-coffee",
    title: "Instant Coffee",
    stack: ["Vite", "React", "TypeScript", "Supabase", "Docker", "WebSockets"],
    problem:
      "Multi-role restaurant ops: auth, live orders, and admin CRUD without a fragile REST-only sync model.",
    repoUrl: "https://github.com/Edwardvee/instant-coffee/tree/feat/client-menu",
  },
  {
    id: "fit-coach",
    title: "FitCoach",
    stack: ["Vite", "React", "TypeScript", "Supabase", "WebSockets"],
    problem:
      "Multi-role restaurant ops: auth, live orders, and admin CRUD without a fragile REST-only sync model.",
    repoUrl: "https://github.com/OGBiggieCheese/yourFitCoach",
  },
  {
    id: "network-sniffer",
    title: "Network Sniffer",
    stack: ["Python", "Sockets", "Textual"],
    problem:
      "Decode raw IP/TCP, UDP, and ICMP streams at the packet layer for internship-grade network inspection.",
    repoUrl: "https://github.com/Edwardvee/CodeAlpha_NetworkSniffer",
  },
  {
    id: "cattus-manga",
    title: "Cattus Manga",
    stack: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    problem:
      "Full-stack manga platform with memberships, moderation, CRUD, and customizable profiles from a school brief.",
    repoUrl: "https://github.com/Edwardvee/cattusmanga_plus",
  },
];
