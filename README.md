# gaganasadineni.com

Personal site of **Gagana Sadineni** — research papers, projects, and a contact form.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**,
**Zod 4** for validation, and **Resend** for delivering contact-form email.
Deployed on **Vercel**.

---

## Quick start

You need **Node.js 20.9 or newer** (Node 22 LTS recommended). It is not currently
installed on this machine — get it from <https://nodejs.org> or via Homebrew:

```bash
brew install node
```

Then:

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>.

---

## Editing the site

**Almost everything you'll want to change lives in one file: [`src/content/site.ts`](src/content/site.ts).**

| What you want to change | Where |
| --- | --- |
| Name, tagline, location, "last updated" | `site` object |
| About paragraphs | `about` array |
| The three cards beside About | `interests` array |
| Research papers | `papers` array |
| Projects & activities | `projects` array |
| Footer links (GitHub, etc.) | `socials` array |

### Adding a research paper

Add an object to the `papers` array:

```ts
{
  year: "2026",
  title: "Effects of Soil pH on Radish Germination Rates",
  abstract: "A controlled study across five pH levels measuring germination speed and seedling mass.",
  tags: ["Biology", "Controlled experiment"],
  href: "/papers/soil-ph.pdf", // optional — omit to hide the link
}
```

To link a PDF, drop the file in `public/papers/` and point `href` at
`/papers/your-file.pdf`. The "N published" counter next to the heading counts
entries that have an `href`.

Colors, fonts, and spacing tokens live in [`src/app/globals.css`](src/app/globals.css)
under `@theme`.

---

## Contact form setup

The form posts to a React Server Action ([`src/lib/actions.ts`](src/lib/actions.ts))
that validates with Zod and sends through Resend. Your email address is **never
rendered into the page**, so scrapers can't harvest it.

Protections: a hidden honeypot field, server-side validation, and a best-effort
rate limit of 5 messages per hour per IP.

### 1. Create a Resend account

Sign up at <https://resend.com> (the free tier covers 3,000 emails/month) and
create an API key under **API Keys**.

### 2. Verify your sending domain

Under **Domains**, add `gaganasadineni.com` and add the DNS records Resend gives
you at your domain registrar. Until that's verified you can send from
`onboarding@resend.dev` for testing.

### 3. Set environment variables

Locally, in `.env.local`; on Vercel, under **Settings → Environment Variables**
(add them to Production, Preview, and Development):

| Variable | Example | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | `re_...` | From step 1. **Never commit this.** |
| `CONTACT_TO_EMAIL` | `me@gaganasadineni.com` | Where messages arrive |
| `CONTACT_FROM_EMAIL` | `Gagana Sadineni Website <contact@gaganasadineni.com>` | Must be on a verified domain |
| `NEXT_PUBLIC_SITE_URL` | `https://gaganasadineni.com` | Used for metadata, sitemap, and OG images |

If `RESEND_API_KEY` or `CONTACT_TO_EMAIL` is missing, the form shows a friendly
error and logs the reason to the server console — it never crashes the page.

---

## Deploying to Vercel

1. Push this repo to <https://github.com/gagana20sadineni-droid/GaganaSadineni-Website>.
2. At <https://vercel.com/new>, import that repository. Vercel detects Next.js
   automatically — no build settings to change.
3. Add the environment variables from the table above **before** the first deploy.
4. Under **Settings → Domains**, add `gaganasadineni.com` and follow the DNS
   instructions.

Every push to `main` deploys to production; every pull request gets its own
preview URL.

---

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx           root layout, fonts, site metadata
│   ├── page.tsx             the single page, composed of section components
│   ├── globals.css          Tailwind v4 theme tokens + base styles
│   ├── not-found.tsx        404 page
│   ├── icon.tsx             generated favicon
│   ├── opengraph-image.tsx  generated social share image
│   ├── sitemap.ts           /sitemap.xml
│   └── robots.ts            /robots.txt
├── components/              Nav, Hero, About, Research, Projects, Contact, Footer
├── content/site.ts          ← all editable content
└── lib/
    ├── actions.ts           contact-form server action
    ├── schema.ts            Zod validation schema and form state types
    └── rate-limit.ts        in-memory submission throttle
```
