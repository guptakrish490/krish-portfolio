export type PortfolioProject = {
  id: string;
  name: string;
  rank: string;
  type: "featured" | "other";
  sub: string;
  tech: string[];
  text: string;
  detail: string[];
  benchmark?: string;
  repo: string;
  demo?: string;
};

export const projects: PortfolioProject[] = [
  {
    id: "01",
    name: "FlowForge",
    rank: "FEATURED PROJECT",
    type: "featured",
    sub: "Fault-tolerant async job processing system",
    tech: ["TypeScript", "Node.js", "Fastify", "PostgreSQL"],
    text: "A database-backed worker system built to explore concurrency, reliable job ownership, retries, recovery and measurable throughput.",
    detail: [
      "Claims queued jobs atomically with PostgreSQL transactions and row-level locks.",
      "Uses worker ownership and leases to recover jobs left stale by failed workers.",
      "Ownership-aware status updates prevent one worker from overwriting another’s result.",
      "Records lifecycle timestamps and worker metadata to inspect queue wait and processing latency.",
    ],
    benchmark: "5,000 jobs / ~12.04s / ~415 jobs per second",
    repo: "https://github.com/guptakrish490/FlowForge",
  },
  {
    id: "02",
    name: "CogniLab",
    rank: "TEAM PROJECT",
    type: "other",
    sub: "Psychology research and browser experiment platform",
    tech: ["React", "Node.js", "MongoDB", "Browser APIs"],
    text: "Built and deployed with a team during BIT N BUILD ’26. Researchers can create experiments and share public participation links.",
    detail: [
      "Participants can join through a public link without creating an account.",
      "Device, browser and network calibration produces a reliability score before participation.",
      "Experiment results are associated with an anonymous participant code.",
      "Designed for researchers to create experiments and trials and share them with participants.",
    ],
    repo: "https://github.com/guptakrish490/CogniLab",
    demo: "https://cognilab-sage.vercel.app",
  },
  {
    id: "03",
    name: "DevTrack Pro",
    rank: "FULL-STACK PROJECT",
    type: "other",
    sub: "Full-stack developer productivity platform",
    tech: ["React", "Express", "MongoDB", "JWT", "Zod"],
    text: "A MERN productivity app for organizing goals, projects and tasks, with activity tracking and dashboard analytics.",
    detail: [
      "Includes authenticated goal, project and task workflows with search, filtering and pagination.",
      "Uses refresh-token sessions, HTTP-only cookies, protected routes, validation and rate limiting.",
      "Tracks activity and streaks, and presents progress through dashboard analytics.",
      "Deployed with a Vercel frontend, Render backend and MongoDB Atlas database.",
    ],
    repo: "https://github.com/guptakrish490/DevTrack-Pro",
    demo: "https://devtrackpro.vercel.app",
  },
  {
    id: "04",
    name: "StudyShelf",
    rank: "WEB PROJECT",
    type: "other",
    sub: "A lightweight organizer for study resources",
    tech: ["JavaScript", "HTML", "CSS", "Local storage"],
    text: "A browser-based study shelf for organizing subject resources such as notes, assignments and previous-year questions.",
    detail: [
      "Create subjects and custom resource categories.",
      "Save resource titles and links, then edit or delete entries.",
      "Search resources and persist the collection in local storage.",
    ],
    repo: "https://github.com/guptakrish490/studyshelf",
    demo: "https://lnkd.in/d6bkT6ZC",
  },
];
