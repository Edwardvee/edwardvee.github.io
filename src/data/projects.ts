// 🎮 PROJECTS DATA - RETRO PORTFOLIO
// ================================
// 
// Instructions for updating:
// 1. Replace placeholder data with your real project information
// 2. Add your project images to the /public/projects/ folder
// 3. Update URLs with your actual demo and repository links
// 4. Modify technologies array with your tech stack
// 5. Change status to reflect current project state

import {
  instantThumbnail,
  networkThumbnail,
  gameThumbnail,
  portfolioThumbnail,
  cattusThumbnail
} from '../assets';

export interface Project {
  id: string;                    // Unique identifier (lowercase, no spaces)
  title: string;                 // Project display name
  icon: string;                  // Emoji icon for the desktop
  description: string;           // Short description (1-2 lines)
  technologies: string[];        // Array of technologies used
  status: "completed" | "in-progress" | "coming-soon";
  image: string;                 // Path to project screenshot (relative to /public/)
  demoUrl?: string;             // Optional: Live demo URL
  githubUrl?: string;           // Optional: GitHub repository URL
  details: string;              // Detailed description for the project window
}

// 📁 PROJECT GALLERY DATA
// Replace this data with your actual projects
export const projects: Project[] = [
  {
    id: "instant-coffee",
    title: "Instant Coffee",
    icon: "☕",
    description: "A modern web application to manage restaurants.",
    technologies: ["Vite", "React", "Typescript", "SCSS", "Supabase", "Docker", "Websockets"],
    status: "in-progress",
    image: instantThumbnail,
    githubUrl: "https://github.com/Edwardvee/instant-coffee/tree/feat/client-menu",
    details: `User authentication with Supabase Auth
    Customer panel for placing orders and managing accounts
    Administrator panel for managing orders, users, and products
    API v1 ready for future implementations
    Responsive and modern design
    TypeScript for greater type safety`
  },


  {
    id: "network-sniffer",
    title: "Python Network Sniffer",
    icon: "🛜",
    description: "A network sniffer made for my 2025 internship at CodeAlpha",
    technologies: ["Python", "sockets", "textual"],
    status: "in-progress",
    image: networkThumbnail,
    githubUrl: "https://github.com/Edwardvee/CodeAlpha_NetworkSniffer",
    details: "A simple network sniffer that operates at the network layer, it decodes the raw bytes of the stream packets and decodes it in ascii format. It currently decodes IP/TCP, IP/ICMP and IP/UDP"
  },
  {
    id: "lua-game",
    title: "RogueLite Lua game",
    icon: "🎮",
    description: "My lastest attempt of game development",
    technologies: ["lua", "Love2D"],
    status: "in-progress",
    image: gameThumbnail,
    githubUrl: "https://github.com/Edwardvee/CodeAlpha_NetworkSniffer",
    details: "In this project in coordinating a young team which skills will be completly forged here, we currently don't even have a proper name, but in not so much we will make it a reality."
  },
  {
    id: "retro-portfolio",
    title: "Retro Portfolio",
    icon: "🌐",
    description: "A site made from scratch, made to resemble old 00's sites and its shenanigans",
    technologies: ["React", "TypeScript", "SCSS", "Vite"],
    status: "completed",
    image: portfolioThumbnail,
    githubUrl: "https://github.com/Edwardvee/portfolio", // 🔗 Replace with your repo
    details: "This portfolio website was made to showcase my work through the years, I followed old design principles and aesthetics. I hope this helps prevail my efforts of creating and designing software, and also as something to look back every once in a while."
  },
  {
    id: "cattus-manga",
    title: "Cattus Manga",
    icon: "🌐",
    description: "A comic/manga site made in 2022 for a school project",
    technologies: ["PHP", "JS", "CSS", "Bootstrap", "MySQL"],
    status: "completed",
    image: cattusThumbnail,
    githubUrl: "https://github.com/Edwardvee/cattusmanga_plus",
    details: "My 2022 school project. A manga website that would include a membership system. It includes some basic SQL and PHP CRUD, user moderation/management/administration tab, pointshop, customizable profiles, comment section, upload your own mangas tab, dark/light mode, cookies, and a great frontend made with js and bootstrap. This was a project I made to run locally and had no intention in making it larger or scale it, so keep in mind that it may not be optimized correctly for a larger userbase.."
  },


  // 🆕 ADD MORE PROJECTS HERE
  // Copy the template below and fill with your project data:
  /*
  {
    id: "your-project-id",
    title: "Your Project Name",
    icon: "🚀",
    description: "Brief description of your project",
    technologies: ["Tech1", "Tech2", "Tech3"],
    status: "completed", // or "in-progress" or "coming-soon"
    image: "/projects/your-project.png",
    demoUrl: "https://your-demo-url.com",          // Optional
    githubUrl: "https://github.com/you/project",   // Optional
    details: "Detailed description that will appear in the project window. Explain what the project does, how it works, what technologies you used, and what makes it special or interesting."
  },
  */
];

// 🎨 PROJECT CATEGORIES (Optional - for future filtering)
export const projectCategories = {
  web: "🌐 Web Development",
  mobile: "📱 Mobile Apps",
  games: "🎮 Game Development",
  tools: "🛠️ Developer Tools",
  art: "🎨 Creative Projects",
  ai: "🤖 AI/Machine Learning"
};

// 📊 TECHNOLOGY COLORS (Optional - for styling tech badges)
export const techColors: Record<string, string> = {
  "React": "#61DAFB",
  "TypeScript": "#3178C6",
  "JavaScript": "#F7DF1E",
  "SCSS": "#CC6699",
  "CSS": "#1572B6",
  "HTML": "#E34F26",
  "Node.js": "#339933",
  "Python": "#3776AB",
  "C++": "#00599C",
  "Java": "#ED8B00",
  "Vite": "#646CFF",
  "Next.js": "#000000",
  "Vue": "#4FC08D",
  "Angular": "#DD0031",
  "Svelte": "#FF3E00"
};

// 🏷️ STATUS LABELS
export const statusLabels = {
  completed: "✅ COMPLETED",
  "in-progress": "🚧 IN PROGRESS",
  "coming-soon": "🔜 COMING SOON"
};

export default projects;