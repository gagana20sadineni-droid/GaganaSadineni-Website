import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-[860px] flex-col justify-center px-7">
      <p className="mb-4 font-mono text-[0.78rem] uppercase tracking-[0.12em] text-accent">
        404
      </p>
      <h1 className="mb-4 font-serif text-4xl font-semibold">Page not found</h1>
      <p className="mb-8 text-ink-soft">
        That page doesn&apos;t exist — it may have moved or never been written yet.
      </p>
      <Link
        href="/"
        className="label-mono w-fit rounded-lg border border-line bg-raised px-5 py-2.5 text-ink-soft no-underline hover:text-accent"
      >
        Back to home
      </Link>
    </main>
  );
}
