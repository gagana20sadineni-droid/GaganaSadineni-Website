import { Section } from "@/components/Section";
import { projects } from "@/content/site";

export function Projects() {
  return (
    <Section id="projects" title="Projects & Activities">
      <ul className="grid list-none gap-4 p-0 sm:grid-cols-2">
        {projects.map((project) => (
          <li
            key={project.title}
            className="rounded-xl border border-line bg-raised p-5 transition-colors hover:border-accent/40"
          >
            <span className="label-mono mb-2 block text-accent">
              {project.kicker}
            </span>
            <h3 className="mb-2 font-serif text-[1.1rem] font-semibold text-ink">
              {project.href ? (
                <a href={project.href} className="text-ink no-underline hover:text-accent">
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h3>
            <p className="text-[0.95rem] text-ink-soft">{project.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
