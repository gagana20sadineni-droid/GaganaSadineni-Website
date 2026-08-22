import { Container } from "@/components/Container";
import { site } from "@/content/site";

export function Hero() {
  return (
    <header id="top" className="border-b border-line pb-14 pt-19">
      <Container>
        <div className="flex flex-col items-start gap-[22px] sm:flex-row sm:gap-9">
          <div
            aria-hidden="true"
            className="flex size-21 shrink-0 items-center justify-center rounded-full border border-line bg-linear-155 from-raised to-accent-soft font-serif text-[1.7rem] font-semibold tracking-[0.01em] text-accent-ink sm:size-27 sm:text-[2.2rem]"
          >
            {site.initials}
          </div>
          <div>
            <p className="mb-[18px] font-mono text-[0.78rem] uppercase tracking-[0.12em] text-accent">
              {site.eyebrow}
            </p>
            <h1 className="mb-5 text-balance font-serif text-[clamp(2.4rem,5.5vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.01em]">
              {site.name}
            </h1>
            <p className="mb-7 max-w-[560px] text-[1.18rem] text-ink-soft">
              {site.lede}
            </p>
            <div className="flex flex-wrap gap-x-3.5 gap-y-2.5 font-mono text-[0.82rem] text-ink-faint">
              {site.meta.map((item, i) => (
                <span key={item} className="inline-flex items-center gap-2">
                  {item}
                  {i < site.meta.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="ml-2.5 inline-block size-[3px] rounded-full bg-line"
                    />
                  ) : null}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
