import { Section } from "@/components/Section";
import { about, interests } from "@/content/site";

export function About() {
  return (
    <Section id="about" title="About">
      <div className="grid gap-11 md:grid-cols-[1.4fr_1fr]">
        <div>
          {about.map((paragraph) => (
            <p key={paragraph} className="mb-4 text-ink-soft last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
        <ul className="flex list-none flex-col gap-3.5 p-0">
          {interests.map((interest) => (
            <li
              key={interest.label}
              className="rounded-[10px] border border-line bg-raised px-[18px] py-4"
            >
              <span className="label-mono mb-1.5 block text-accent">
                {interest.label}
              </span>
              <span className="font-serif text-[1.08rem] font-medium text-ink">
                {interest.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
