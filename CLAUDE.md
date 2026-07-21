# WordleHint

> **Domain:** wordlehint.info
> **Brand:** WordleHint
> **Core keyword:** Wordle Hint
> A daily word-game hint site. Wordle is the core (daily hints/answers + unlimited 4–11 letter modes), expanded with daily **Connections** and **Strands** hint/answer pages. All three share the same NYT-fetch → JSON → read-layer pipeline shape.

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
| `pnpm seed:connections` / `pnpm update:connections` | Seed / append today's NYT Connections puzzle (`data/connections-daily.json`) |
| `pnpm seed:strands` / `pnpm update:strands` | Seed / append today's NYT Strands puzzle (`data/strands-daily.json`) |
| `pnpm seed:spelling-bee` / `pnpm update:spelling-bee` | Seed/backfill (`--from`/`--to`) / append today's NYT Spelling Bee (`data/spelling-bee-daily.json`) |
| `pnpm og:images` | Generate OG share images (`scripts/generate-og-images.mjs`) |

---

## Routes (`app/[locale]/`)

| Group | Routes |
|-------|--------|
| Home | `/` |
| Wordle daily hints | `/wordle-hint-today`, `/wordle-hint` (archive), `/wordle-hint/[date]`, `/todays-wordle-answer`, `/yesterdays-wordle-answer`, `/wordle-answers` |
| Wordle tools | `/wordle-solver`, `/wordle-unlimited`, `/best-wordle-starting-words` |
| Letter games | `/4-letters` … `/11-letters` (one route per word length, 4–11) |
| 5-letter word lists | `/5-letter-words` (starting-letter hub), `/5-letter-words/starting-with-[a–z]` (26 spokes), `/5-letter-words/ending-with` + `/ending-with-[a–z]` (26), `/5-letter-words/with` (contained-letter hub) + `/with-[a–z]` (26) — see the word-bank section below |
| 4/6/7-letter word lists | `/{4,6,7}-letter-words` (hubs, hand-written copy in `data/word-bank/hub-{4,6,7}.ts`) + dynamic `[spoke]` route (`starting-with-[a–z]`, SSG, `dynamicParams=false`) + `/4-letter-words/without-vowels`. Templated spokes: per-length templates (`starting-templates.ts`) + per-letter hooks (`letter-hooks.ts`) + live stats (`lib/n-letter-template.ts`). Data = ENABLE + frequency common tier (`data/word-bank/{4,6,7}.json`, built by `build-word-bank.mjs 4 6 7`). Run `node scripts/check-duplicate-content.mjs` after build to verify template pages stay differentiated |
| Connections | `/connections-hint-today`, `/connections-answers`, `/connections-unlimited` (playable game, 120-puzzle build-time pool from the archive, newest 14 days excluded) |
| Strands | `/strands-hint-today`, `/strands-answers`, `/strands-unlimited` (playable trace board; word paths derived at build by `lib/strands-solver.ts`, newest 14 days excluded) |
| Spelling Bee | `/spelling-bee-answers` (today's words/pangram/Genius score, spoiler curtains), `/spelling-bee-answers/[date]` (archive, SSG from all past puzzles, `dynamicParams = false`), `/spelling-bee-hints-today` (progressive hints: grid → two-letter list → staged pangram → per-word clues from `lib/spelling-bee-hints.ts` + `data/spelling-bee-definitions.json`), `/spelling-bee-unlimited` (playable hive game, 120-puzzle anonymised archive pool, newest 14 days excluded; pure scoring in `lib/spelling-bee-scoring.ts` so the client bundle skips the data JSON) |
| Content | `/how-to-play-wordle`, `/wordle-hint-faq`, `/guides`, `/guides/[slug]`, `/blog`, `/blog/[slug]` |
| Legal / misc | `/about`, `/contact`, `/privacy-policy`, `/terms-of-service`, `/share`, `/unsubscribe` |
| API | `/api/newsletter` |
| Sitemaps | `app/sitemap-index.xml`, `app/sitemap-main.xml` |

Redirects (legacy short URLs, old Strands paths, dropped `/es` locale) live in `next.config.mjs` → `redirects()`.

---

## Daily data pipelines (Wordle / Connections / Strands / Spelling Bee)

This is the core of the site — understand it before touching anything date-related. All four games share the same shape: **NYT JSON endpoint → idempotent updater script → `data/*-daily.json` → cached read layer**. All date logic uses **America/New_York** to match NYT's rollover (`getTodayDateString()` in `lib/wordle-daily.ts` is the shared source of truth — the other games import it).

| Game | Data file | NYT endpoint (`<…>/<YYYY-MM-DD>.json`) | Updater | Read layer |
|------|-----------|-----------------------------------------|---------|------------|
| Wordle | `data/wordle-daily.json` — `{ lastUpdated, puzzles: [{ date, id, answer, editor }] }` | `…/svc/wordle/v2` | `scripts/update-wordle.mjs` | `lib/wordle-daily.ts` |
| Connections | `data/connections-daily.json` — puzzles with 4 colour `groups` (`level` 0–3, `name`, `words`) | `…/svc/connections/v2` | `scripts/update-connections.mjs` | `lib/connections-daily.ts` |
| Strands | `data/strands-daily.json` — puzzles with `clue`, `spangram`, `themeWords`, `board` | `…/svc/strands/v2` | `scripts/update-strands.mjs` | `lib/strands-daily.ts` |
| Spelling Bee | `data/spelling-bee-daily.json` — puzzles with `centerLetter`, `outerLetters`, `pangrams`, `answers` (pangrams merged in — the v1 endpoint's `answers` excludes them) | `…/svc/spelling-bee/v1` (no v2) | `scripts/update-spelling-bee.mjs` (+ `seed-spelling-bee.mjs` backfill) | `lib/spelling-bee-daily.ts` — also computes scoring (`getSpellingBeeScoring()`: word points, total, Genius = 70% of max, rank ladder, bingo) |

- **Read APIs:** Wordle — `getTodayPuzzle()`, `getYesterdayPuzzle()`, `getRecentPuzzles(n)`, `getPuzzleByDate()`, `getPuzzlesByMonth()`, `getAvailableMonths()`, `getPuzzleCount()`. Connections/Strands mirror this — `getToday*()`, `getRecent*(n)`, `get*ByDate()`, `getArchive*()` (today excluded for spoilers), `get*Stats()`, plus hint helpers (`firstLetterHint`, `spangramClue`, `themeWordClue`).
- **Automation:** `.github/workflows/deploy-cloudflare.yml` runs on every push and on a **cron (`30 3 * * *` + `30 8 * * *` UTC)**. It runs `update:wordle`, then `update:connections`, `update:strands`, and `update:spelling-bee` (all `continue-on-error: true`, so a non-Wordle fetch failure won't block deploy — Wordle is the hard dependency), then `scripts/generate-definitions.mjs`. On `schedule` runs it commits the updated JSON files back to `main`, then deploys. Daily freshness depends on this workflow succeeding.
- **Wordle hint generation:** `lib/wordle-hints.ts` → `generateHints(puzzle)` returns 5 progressive `HintLevel`s (composition → vowels → first letter → last letter → pattern). **Note:** hardcoded for 5-letter words (uses `word[4]`), since the NYT daily is always 5 letters.

> If "Today's Wordle Hint" shows the "hints are being prepared" fallback, `getTodayPuzzle()` returned undefined → the daily JSON is missing today's entry → check the GitHub Actions cron / `update:wordle` run. Same logic for Connections/Strands "today" pages.

---

## `/5-letter-words` word-list subsite (SEO hub-and-spoke)

A static SEO cluster of five-letter word lists — separate from the daily pipeline (no NYT fetch). **Hub-and-spoke** shape: three hub pages (`/5-letter-words` by starting letter, `/5-letter-words/ending-with` by ending letter, `/5-letter-words/with` by contained letter) linking out to per-letter spoke pages. The **contains** set (`/with-[a–z]`) targets the "yellow letter" intent — words containing a letter in *any* position — with a per-letter position-distribution map; all 26 are live (`components/word-bank/ContainsListPage.tsx` + `PositionMap.tsx`, yellow `wordle-present` theme).

- **Data source:** `data/word-bank/5.json` — built by `scripts/build-word-bank.mjs` from the public Wordle valid-guess list (~14.8k words), each tagged `common` when it's in the official answer pool. **Not** auto-updated by the daily cron; rebuild manually if the word list changes.
- **Read layer:** `lib/word-bank.ts` — all React `cache()`d. `startingWith` / `endingWithDecorated` (join definitions + flag past daily answers), `groupBySecondLetter` / `groupByFourthLetter`, `letterStats` / `endingLetterStats`. Answer-pool words are surfaced first.
- **Per-letter copy:** `data/word-bank/{starting,ending}-with-<letter>.ts` — one hand-written `content: LetterContent` object each (hero, openers, strategy, FAQ). `{N}/{COMMON}/{ANSWERED}` placeholders are filled at render.
- **UI:** `components/word-bank/` — `LetterListPage` (starting spokes), `EndingListPage` (ending spokes); the two hub `page.tsx` render inline. Spoke `page.tsx` files are thin: metadata + pass `content`. All SSG.
- **Coverage:** all 26 starting + all 26 ending + all 26 contains letters have a page (79 spokes + 3 hubs). The three rarest *endings* — **J / Q / V** — have only 3–5 obscure words each and **0 answer-pool words**, so those pages are honest "this ending can't be the daily answer" reference lists; the *contains* pages all have common words (even J/Q/X/Z), so none are thin.

> **Adding/removing an ending- or contains-letter spoke touches 4 places that must stay in sync:** (1) the route dir (`ending-with-<l>/page.tsx` or `with-<l>/page.tsx`), (2) the `data/word-bank/` content file (`ending-with-<l>.ts` or `with-<l>.ts`), (3) the sitemap array (`wordListEndingLetters` / `wordListContainsLetters` in `lib/sitemap.ts`), (4) the hub's live list (`LIVE_ENDING` / `LIVE_WITH`). Run **`node scripts/check-word-bank-sync.mjs`** to verify all three directions (starting/ending/contains) agree — it exits non-zero on any mismatch and warns about thin (0-common) pages. Starting spokes only need places 1–3 (sitemap generates a–z automatically).

---

## Key files

| Purpose | Path |
|---------|------|
| Site config (name, URL, meta defaults) | `config/site.ts` |
| Homepage | `app/[locale]/page.tsx` → `components/home/index.tsx` |
| Layout | `app/[locale]/layout.tsx` |
| Header / Footer | `components/header/`, `components/footer/` |
| Wordle game UI | `components/wordle/` |
| Unlimited mode UI | `components/wordle-unlimited/`, `components/connections-unlimited/` (playable board: `ConnectionsGame` + `gameReducer`), `components/strands-unlimited/` (trace board: `StrandsGame` + `gameReducer` + `lib/strands-solver.ts`) |
| Connections / Strands UI | `components/connections/`, `components/strands/` |
| Other page UI | `components/wordle-answers/`, `components/best-starting-words/` |
| Wordle daily read API | `lib/wordle-daily.ts` |
| Connections / Strands read API | `lib/connections-daily.ts`, `lib/strands-daily.ts` |
| Hint generator (Wordle) | `lib/wordle-hints.ts` |
| Word definitions | `lib/wordle-definitions.ts` + `data/wordle-definitions.json` |
| Difficulty logic | `lib/wordle-difficulty.ts` |
| Letter-game data | `data/letter-games.ts`, `data/letter-games-content.ts`, `data/wordle-words.ts` |
| Word-bank read layer (`/5-letter-words`) | `lib/word-bank.ts` + `data/word-bank/5.json` |
| Word-bank page copy | `data/word-bank/{starting,ending}-with-*.ts` |
| Word-bank UI | `components/word-bank/` (`LetterListPage`, `EndingListPage`) |
| Word-bank build / sync check | `scripts/build-word-bank.mjs`, `scripts/check-word-bank-sync.mjs` |
| Unlimited-mode data | `data/wordle-unlimited/*` (comparison, content, faq, length-table, modes, related-games), `data/connections-unlimited/*` + `data/strands-unlimited/*` (content, faq, comparison, related-games) |
| Connections / Strands page copy | `data/connections/content.ts`, `data/strands/content.ts` |
| Other page copy | `data/wordle-answers/*`, `data/best-starting-words/content.ts`, `data/wordle-solver/content.ts` |
| Game type defs | `types/wordle-daily.ts`, `types/connections.ts`, `types/strands.ts` |
| Guides data (~5 entries) | `data/guides.ts` |
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
- **Brand stays Wordle-first:** WordleHint is the brand and Wordle is the hero. Connections and Strands are complementary daily-puzzle hint pages, not co-equal brands — keep them as supporting content, not a rename of the site.
