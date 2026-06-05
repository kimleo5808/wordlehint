# WordleHint

> **Domain:** wordlehint.info
> **Brand:** WordleHint
> **Core keyword:** Wordle Hint
> A daily Wordle hint + unlimited word-game site. (Originally migrated from a Strands site — that migration is complete; no Strands content remains in source.)

---

## Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** TailwindCSS 3 + shadcn/ui (Radix primitives) + `tailwindcss-animate`
- **i18n:** next-intl — currently **English only** (`LOCALES = ['en']`, `localePrefix: 'as-needed'`, so URLs have no `/en` prefix in practice)
- **Content:** MDX via `next-mdx-remote-client` + `gray-matter` (blog posts, legal pages)
- **State:** zustand (game state), `js-cookie`
- **Deploy:** Cloudflare Workers via OpenNext (`@opennextjs/cloudflare`), `wrangler`
- **Package manager:** pnpm 10.12.4, Node 20.x
- **Analytics:** Vercel Analytics + optional GA / AdSense / Baidu / Plausible (env-driven)

## Scripts

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Local dev server |
| `pnpm build` | Next.js production build |
| `pnpm deploy` | OpenNext build + deploy to Cloudflare |
| `pnpm preview` | OpenNext local preview |
| `pnpm seed:wordle` | Seed `data/wordle-daily.json` from scratch |
| `pnpm update:wordle` | Fetch today's NYT Wordle answer and append to the daily JSON |

---

## Routes (`app/[locale]/`)

| Group | Routes |
|-------|--------|
| Home | `/` |
| Daily hints | `/wordle-hint-today`, `/wordle-hint` (archive), `/wordle-hint/[date]` |
| Tools | `/wordle-solver`, `/wordle-unlimited` |
| Letter games | `/4-letters` … `/11-letters` (one route per word length, 4–11) |
| Content | `/how-to-play-wordle`, `/wordle-hint-faq`, `/guides`, `/guides/[slug]`, `/blog`, `/blog/[slug]` |
| Legal / misc | `/about`, `/contact`, `/privacy-policy`, `/terms-of-service`, `/share`, `/unsubscribe` |
| API | `/api/newsletter` |
| Sitemaps | `app/sitemap-index.xml`, `app/sitemap-main.xml` |

Redirects (legacy short URLs, old Strands paths, dropped `/es` locale) live in `next.config.mjs` → `redirects()`.

---

## Daily Wordle data pipeline

This is the core of the site — understand it before touching anything date-related.

1. **Data file:** `data/wordle-daily.json` — `{ lastUpdated, puzzles: [{ date, id, answer, editor }] }`, sorted by date.
2. **Updater:** `scripts/update-wordle.mjs` fetches `https://www.nytimes.com/svc/wordle/v2/<YYYY-MM-DD>.json` for **today in US Eastern time** and appends it if missing (idempotent).
3. **Automation:** `.github/workflows/deploy-cloudflare.yml` runs `pnpm run update:wordle` on every deploy and on a **cron (`30 3 * * *` + `30 8 * * *` UTC)**, commits the updated JSON back to `main`, then deploys. So daily data freshness depends on this workflow succeeding.
4. **Read API:** `lib/wordle-daily.ts` — `getTodayPuzzle()`, `getYesterdayPuzzle()`, `getRecentPuzzles(n)`, `getPuzzleByDate()`, `getPuzzlesByMonth()`, `getAvailableMonths()`, `getPuzzleCount()`. All date logic uses **America/New_York** to match NYT's rollover.
5. **Hint generation:** `lib/wordle-hints.ts` → `generateHints(puzzle)` returns 5 progressive `HintLevel`s (composition → vowels → first letter → last letter → pattern). **Note:** hardcoded for 5-letter words (uses `word[4]`), since the NYT daily is always 5 letters.

> If "Today's Wordle Hint" shows the "hints are being prepared" fallback, `getTodayPuzzle()` returned undefined → the daily JSON is missing today's entry → check the GitHub Actions cron / `update:wordle` run.

---

## Key files

| Purpose | Path |
|---------|------|
| Site config (name, URL, meta defaults) | `config/site.ts` |
| Homepage | `app/[locale]/page.tsx` → `components/home/index.tsx` |
| Layout | `app/[locale]/layout.tsx` |
| Header / Footer | `components/header/`, `components/footer/` |
| Wordle game UI | `components/wordle/` |
| Unlimited mode UI | `components/wordle-unlimited/` |
| Daily data read API | `lib/wordle-daily.ts` |
| Hint generator | `lib/wordle-hints.ts` |
| Word definitions | `lib/wordle-definitions.ts` + `data/wordle-definitions.json` |
| Difficulty logic | `lib/wordle-difficulty.ts` |
| Letter-game data | `data/letter-games.ts`, `data/letter-games-content.ts`, `data/wordle-words.ts` |
| Unlimited-mode data | `data/wordle-unlimited/*` (comparison, content, faq, length-table, modes, related-games) |
| Guides data (~20 entries) | `data/guides.ts` |
| Blog posts (MDX) | `blogs/en/*.mdx` |
| Legal / about content (MDX) | `content/{about,privacy-policy,terms-of-service}/en.mdx` |
| SEO metadata helpers | `lib/metadata.ts` |
| Schema.org JSON-LD | `lib/jsonld.tsx` |
| Sitemap helper | `lib/sitemap.ts` |
| Email / newsletter | `lib/email.ts`, `lib/resend/` |
| Translations | `i18n/messages/en.json` |
| Routing / locales | `i18n/routing.ts` |
| Redirects | `next.config.mjs` |
| Tailwind theme | `tailwind.config.ts` (custom `wordle-correct/present/absent`, `cta` colors) |
| Brand image generator | `scripts/generate-brand-images.mjs` |
| Definition generator | `scripts/generate-definitions.mjs` |

---

## SEO keyword strategy

- **Primary:** wordle hint, wordle hint today, wordle clue today, wordle answer today
- **Secondary:** 5 letter words, wordle help/tips/strategy, best wordle starting words, wordle solver, wordle unlimited
- **Long-tail:** wordle hint today [date], N-letter wordle (4–11), how to play wordle, wordle hard mode tips

## Brand guidelines

- **Name:** WordleHint (one word, capital W and H)
- **Domain:** wordlehint.info
- **Tone:** helpful, game-focused, casual-expert
- **Colors:** Wordle palette — green (correct) / yellow (present) / gray (absent); see `tailwind.config.ts`
- No Strands references anywhere.
