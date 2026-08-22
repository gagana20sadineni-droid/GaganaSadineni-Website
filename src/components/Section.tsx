import { Container } from "@/components/Container";

export function Section({
  id,
  title,
  aside,
  children,
  last = false,
}: {
  id: string;
  title: string;
  aside?: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section id={id} className={`py-15 ${last ? "" : "border-b border-line"}`}>
      <Container>
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-5">
          <h2 className="font-serif text-[1.7rem] font-semibold tracking-[-0.005em]">
            {title}
          </h2>
          {aside ? (
            <span className="font-mono text-[0.78rem] text-ink-faint">
              {aside}
            </span>
          ) : null}
        </div>
        {children}
      </Container>
    </section>
  );
}
