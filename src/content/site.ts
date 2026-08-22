/**
 * Everything on the site is edited from this one file.
 * Add a paper or a project by adding an object to the arrays below.
 */

export type Paper = {
  year: string;
  title: string;
  abstract: string;
  tags: string[];
  /** Link to the PDF or write-up. Leave undefined to hide the link. */
  href?: string;
};

export type Project = {
  kicker: string;
  title: string;
  description: string;
  href?: string;
};

export type Interest = {
  label: string;
  value: string;
};

export const site = {
  name: "Gagana Sadineni",
  initials: "GS",
  eyebrow: "Student Researcher & Artist",
  lede: "10th grade student in Pflugerville, Texas, building a portfolio of research, writing, and creative work.",
  description:
    "Profile and research of Gagana Sadineni, 10th grade student in Pflugerville, Texas.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gaganasadineni.com",
  meta: ["Grade 10 · Age 15", "Pflugerville, TX", "Drawing & Viola"],
  lastUpdated: "August 2026",
} as const;

export const nav = [
  { href: "#about", label: "About" },
  { href: "#research", label: "Research" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const;

export const about: string[] = [
  "I'm a 10th grader in Pflugerville, Texas, interested in research and independent projects. This site is where I'll keep an updated record of my papers, projects, and activities as they grow — think of it as a working notebook more than a finished portfolio.",
  "Outside of schoolwork, I play viola and spend a lot of time drawing. Both feel connected to how I approach research: paying close attention, revising, and building something carefully over time.",
];

export const interests: Interest[] = [
  { label: "Instrument", value: "Viola" },
  { label: "Creative practice", value: "Drawing" },
  { label: "Grade level", value: "10th · Age 15" },
];

export const papers: Paper[] = [
  {
    year: "2026",
    title: "Add your first paper title here",
    abstract:
      "Replace this with a one- to two-sentence abstract summarizing what the paper investigates, your method, and your main finding.",
    tags: ["Subject area", "Method"],
  },
];

/** Shown under the paper list while the list is still short. */
export const papersNote =
  "More papers will be listed here as they're finished. Each entry can include the year, title, a short abstract, subject tags, and a link to the full PDF or write-up.";

export const projects: Project[] = [
  {
    kicker: "Project",
    title: "Add a project title",
    description:
      "Describe a science fair project, coding project, or independent study — what it was, what you built or found, and any results or awards.",
  },
  {
    kicker: "Activity",
    title: "Viola",
    description:
      "Note ensembles, orchestras, competitions, or years of study — whatever gives context to your practice.",
  },
  {
    kicker: "Activity",
    title: "Drawing",
    description:
      "Mention a portfolio, exhibition, class, or ongoing series if relevant, or link out to a gallery of your work.",
  },
  {
    kicker: "Club / Team",
    title: "Add a club or competition",
    description:
      "Science olympiad, robotics, debate, student government — list your role and what the group does.",
  },
];

/**
 * Footer links. The contact form is the primary way to reach Gagana, so no raw
 * email address is published here. Add profiles as they exist.
 */
export const socials: { label: string; href: string }[] = [
  { label: "GitHub", href: "https://github.com/gagana20sadineni-droid" },
];
