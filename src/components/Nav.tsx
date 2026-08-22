import { nav, site } from "@/content/site";

export function Nav() {
  return (
    <nav className="sticky top-0 z-10 border-b border-line bg-bg/90 backdrop-blur-[10px]">
      <div className="mx-auto flex max-w-[860px] flex-wrap items-baseline justify-between gap-4 px-7 py-4">
        <a
          href="#top"
          className="font-serif text-[1.05rem] font-semibold tracking-[0.01em] text-ink no-underline"
        >
          {site.name}
        </a>
        <ul className="flex list-none gap-[22px] p-0">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="font-mono text-[0.78rem] uppercase tracking-[0.08em] text-ink-soft no-underline transition-colors hover:text-accent"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
