import { Container } from "@/components/Container";
import { site, socials } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <span className="font-serif text-[1.05rem] font-semibold text-ink">
            {site.name}
          </span>
          {socials.length > 0 ? (
            <ul className="flex list-none gap-[22px] p-0">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-mono text-[0.78rem] uppercase tracking-[0.08em] text-ink-soft no-underline hover:text-accent"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <p className="mt-5 font-mono text-[0.76rem] text-ink-faint">
          &copy; {new Date().getFullYear()} {site.name} &middot; Last updated{" "}
          {site.lastUpdated}
        </p>
      </Container>
    </footer>
  );
}
