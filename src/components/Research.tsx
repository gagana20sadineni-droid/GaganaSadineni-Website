import { Section } from "@/components/Section";
import { papers, papersNote } from "@/content/site";

export function Research() {
  const published = papers.filter((p) => p.href).length;

  return (
    <Section
      id="research"
      title="Research Papers"
      aside={`${published} published`}
    >
      <ol className="list-none p-0">
        {papers.map((paper) => (
          <li
            key={paper.title}
            className="grid gap-x-5 gap-y-2 border-b border-line py-7 first:pt-0 last:border-b-0 sm:grid-cols-[84px_1fr]"
          >
            <div className="font-mono text-[0.82rem] text-ink-faint">
              {paper.year}
            </div>
            <div>
              <h3 className="mb-2 font-serif text-[1.15rem] font-semibold leading-snug text-ink">
                {paper.title}
              </h3>
              <p className="mb-3.5 text-[0.98rem] text-ink-soft">
                {paper.abstract}
              </p>
              {paper.tags.length > 0 ? (
                <div className="mb-3.5 flex flex-wrap gap-2">
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="label-mono rounded-full border border-line bg-steel-soft px-2.5 py-1 text-steel"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
              {paper.href ? (
                <a
                  href={paper.href}
                  className="font-mono text-[0.8rem] text-steel underline decoration-steel/40 underline-offset-[3px] hover:decoration-steel"
                >
                  View paper &rarr;
                </a>
              ) : null}
            </div>
          </li>
        ))}
        <li className="grid gap-x-5 gap-y-2 pt-7 sm:grid-cols-[84px_1fr]">
          <div className="font-mono text-[0.82rem] text-ink-faint">&mdash;</div>
          <p className="text-[0.95rem] italic text-ink-faint">{papersNote}</p>
        </li>
      </ol>
    </Section>
  );
}
