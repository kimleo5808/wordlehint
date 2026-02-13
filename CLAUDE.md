# WordleHint Migration Plan

> **Project:** StrandsHint → WordleHint
> **Domain:** wordlehint.info
> **Brand:** WordleHint
> **Core Keyword:** Wordle Hint
> **Goal:** Remove all Strands content, rebrand to pure Wordle Hint site

---

## Current State

- **Source project:** StrandsHint (strandshint.app)
- **Stack:** Next.js 16 + TypeScript + TailwindCSS + shadcn/ui + next-intl
- **Deploy:** Cloudflare Workers (OpenNextJS)
- **Current content:** NYT Strands hints (primary) + Wordle variants 4-11 letters (secondary)

## Target State

- **Brand:** WordleHint
- **Domain:** wordlehint.info
- **Content:** Pure Wordle Hint — daily hints, playable games (4-11 letters), guides, blog
- **No Strands content at all**

---

## TODO List

### Phase 1: Delete Strands Content

- [ ] **1.1** Delete `app/[locale]/strands-hint/` directory (archive page + `[date]/page.tsx`)
- [ ] **1.2** Delete `app/[locale]/strands-hint-today/` directory
- [ ] **1.3** Delete `app/[locale]/strands-hint-faq/` directory
- [ ] **1.4** Delete `app/[locale]/how-to-play-strands/` directory
- [ ] **1.5** Delete `components/strands/` entire directory (CountdownTimer, StrandsAnswerReveal, StrandsClickToReveal, StrandsGrid, StrandsHintCard, StrandsMonthSection, StrandsPuzzleCard)
- [ ] **1.6** Delete `data/strands/puzzles.json` (22K lines)
- [ ] **1.7** Delete `data/strands/` directory
- [ ] **1.8** Delete `lib/strands-data.ts`
- [ ] **1.9** Delete `types/strands.ts`
- [ ] **1.10** Delete `scripts/update-strands.mjs`
- [ ] **1.11** Delete all 3 blog posts in `blogs/en/` (all Strands-themed)
- [ ] **1.12** Delete `scripts/screenshot-covers.mjs` and `scripts/screenshot-og.mjs` (Strands OG generators)
- [ ] **1.13** Delete `public/images/` Strands-related images (covers, previews, OG generators)
- [ ] **1.14** Review and remove any Strands imports/references left in remaining files (search for "strands", "Strands", "STRANDS")

### Phase 2: Site Configuration & Branding

- [ ] **2.1** Update `config/site.ts`:
  - name: "WordleHint"
  - tagLine: "Daily Wordle hints, answers, and word game strategies"
  - description: Wordle-focused
  - url: "https://wordlehint.info"
  - authors/creator: WordleHint
- [ ] **2.2** Update `.env.example`:
  - NEXT_PUBLIC_SITE_URL=https://wordlehint.info
  - Clear old GA/analytics IDs
- [ ] **2.3** Update `tailwind.config.ts`:
  - Remove `strands` custom color group (theme, spangram, hint, grid, selected)
  - Keep or adjust general theme colors
- [ ] **2.4** Update `package.json`:
  - name: "wordlehint"
  - description: Wordle Hint related
- [ ] **2.5** Create new `public/logo.png`, `public/logo.svg`, `public/favicon.ico` for WordleHint brand
- [ ] **2.6** Create new `public/og.png` (Wordle Hint Open Graph image)

### Phase 3: Navigation & Layout

- [ ] **3.1** Update `i18n/messages/en.json` — Header.links:
  - Remove: Strands Hint, Today's Hints, How to Play (strands), FAQ (strands)
  - Add: "Wordle Hint" (/), "5 Letter Wordle" (/5-letters), "How to Play" (/how-to-play-wordle), "Guides" (/guides)
- [ ] **3.2** Update `i18n/messages/en.json` — Footer.Links:
  - Group 1 "Puzzles": links to /5-letters, /6-letters, /7-letters, etc.
  - Group 2 "Resources": How to Play, FAQ, Guides, Blog
  - Group 3 "Word Games": 4-letter through 11-letter links
- [ ] **3.3** Update `components/header/Header.tsx` — change logo text/brand name from StrandsHint to WordleHint
- [ ] **3.4** Update `components/WebsiteLogo.tsx` — brand name
- [ ] **3.5** Update `components/footer/Footer.tsx` — any hardcoded Strands references
- [ ] **3.6** Update `app/[locale]/layout.tsx` — metadata, fonts if desired

### Phase 4: Homepage Rewrite

- [ ] **4.1** Rewrite `components/home/index.tsx` — new homepage focused on Wordle Hint:
  - Hero section: "Wordle Hint Today" as H1, Wordle Hint as core messaging
  - Quick links to popular word lengths (5-letter featured prominently)
  - Featured guides section
  - SEO content about Wordle hints and strategies
  - No Strands references
- [ ] **4.2** Update `app/[locale]/page.tsx` — metadata for homepage:
  - title: "Wordle Hint - Daily Wordle Hints, Answers & Word Game Tips"
  - description: focused on Wordle Hint keywords
  - keywords: wordle hint, wordle hint today, wordle clue, wordle answer today, 5 letter words, etc.

### Phase 5: New Pages (Wordle-specific)

- [ ] **5.1** Create `app/[locale]/how-to-play-wordle/page.tsx` — How to Play Wordle guide
  - Rules, color feedback explanation, strategy tips
  - Links to each word length variant
  - Schema.org HowTo markup
- [ ] **5.2** Create `app/[locale]/wordle-hint-faq/page.tsx` — Wordle FAQ
  - Common questions about Wordle hints
  - Strategy Q&A
  - Schema.org FAQPage markup
- [ ] **5.3** (Optional) Create `app/[locale]/wordle-hint-today/page.tsx` — Today's Wordle Hint
  - Daily hint without giving away the answer
  - Progressive clue system
  - This would need a data source or manual daily update mechanism

### Phase 6: Content Rewrite

- [ ] **6.1** Rewrite `data/guides.ts` — all 20+ guides must be Wordle-themed:
  - "Wordle Beginner's Guide"
  - "Best Wordle Starting Words"
  - "Advanced Wordle Strategy"
  - "Wordle Hard Mode Tips"
  - "Common Wordle Letter Patterns"
  - "Wordle Vocabulary Builder"
  - etc. (replace all Strands guides)
- [ ] **6.2** Update `data/letter-games.ts` — remove Strands references in benefits text:
  - Line 29: "Great warm-up before tackling NYT Strands" → remove Strands mention
  - Line 49: "Sharpens pattern recognition skills useful for NYT Strands" → generic
  - Line 87: "Trains suffix/prefix recognition useful for Strands and crosswords" → remove Strands
  - Line 123: "Compound word recognition transfers to Strands Spangrams" → remove
  - Scan all 8 entries for any "Strands" text
- [ ] **6.3** Update `data/letter-games-content.ts` — remove any Strands references in SEO content
- [ ] **6.4** Write 3-5 new blog posts in `blogs/en/`:
  - "Best Wordle Starting Words for 2026"
  - "How to Solve Wordle in 3 Guesses or Less"
  - "Wordle Hard Mode Strategy Guide"
  - "5 Letter Words: Complete Strategy Guide"
  - "Wordle Hint Tips: How to Use Clues Effectively"
- [ ] **6.5** Update `content/about/en.mdx` — rewrite for WordleHint brand
- [ ] **6.6** Update `content/privacy-policy/en.mdx` — replace StrandsHint → WordleHint, strandshint.app → wordlehint.info
- [ ] **6.7** Update `content/terms-of-service/en.mdx` — same brand replacement

### Phase 7: SEO & Technical

- [ ] **7.1** Update `app/sitemap.ts`:
  - Remove Strands static pages (strands-hint-today, strands-hint, strands-hint-faq, how-to-play-strands)
  - Remove puzzle pages generation (getAllPuzzles import and puzzlePages)
  - Add new pages: /how-to-play-wordle, /wordle-hint-faq
  - Boost letter game pages priority from 0.5 to 0.8 (they are now primary content)
  - 5-letters page should have priority 0.95
- [ ] **7.2** Update `app/robots.ts` — update domain reference if hardcoded
- [ ] **7.3** Update `lib/metadata.ts` — default meta should reference WordleHint, wordle hint keywords
- [ ] **7.4** Update `lib/jsonld.tsx` — Schema.org structured data:
  - WebSite name: WordleHint
  - URL: https://wordlehint.info
  - Add Game schema for Wordle game pages
  - Add HowTo schema for how-to-play page
  - Add FAQPage schema for FAQ page
- [ ] **7.5** Update `next.config.mjs` — redirects:
  - Remove all Strands-related redirects (/nyt-strands-hint → /strands-hint, etc.)
  - Remove Spanish locale redirects (not needed for new site)
  - Add redirect: /strands-hint → / (catch any old links)
  - Add redirect: /how-to-play-strands → /how-to-play-wordle
- [ ] **7.6** Update `public/ads.txt` if AdSense publisher ID changes
- [ ] **7.7** Update `public/_headers` if domain-specific headers exist

### Phase 8: Cleanup & Verification

- [ ] **8.1** Global search for "strands" (case-insensitive) across entire codebase — fix any remaining references
- [ ] **8.2** Global search for "strandshint" — fix any remaining references
- [ ] **8.3** Global search for "strandshint.app" — replace with wordlehint.info
- [ ] **8.4** Run `npm run build` — verify no build errors
- [ ] **8.5** Run `npm run dev` — verify all pages load correctly
- [ ] **8.6** Test all routes:
  - / (homepage)
  - /5-letters (and all 4-11 letter pages)
  - /how-to-play-wordle
  - /wordle-hint-faq
  - /guides and /guides/[slug]
  - /blog
  - /about, /contact, /privacy-policy, /terms-of-service
- [ ] **8.7** Verify sitemap.xml output
- [ ] **8.8** Verify robots.txt output
- [ ] **8.9** Verify Open Graph meta tags on key pages
- [ ] **8.10** Check all internal links — no broken links to deleted Strands pages

### Phase 9: Optional Enhancements

- [ ] **9.1** (Optional) Daily Wordle Hint system — data source for today's Wordle answer/hints
- [ ] **9.2** (Optional) Wordle solver/helper tool
- [ ] **9.3** (Optional) Word frequency database for strategy recommendations
- [ ] **9.4** (Optional) Share results feature (Wordle-style colored grid sharing)

---

## Key Files Reference

| Purpose | File Path |
|---------|-----------|
| Site config | `config/site.ts` |
| Homepage | `app/[locale]/page.tsx` + `components/home/index.tsx` |
| Layout | `app/[locale]/layout.tsx` |
| Navigation | `i18n/messages/en.json` (Header/Footer sections) |
| Header | `components/header/Header.tsx`, `HeaderLinks.tsx` |
| Footer | `components/footer/Footer.tsx` |
| Wordle game | `components/wordle/WordleGame.tsx` |
| Wordle data | `data/letter-games.ts`, `data/letter-games-content.ts`, `data/wordle-words.ts` |
| Guides data | `data/guides.ts` |
| SEO metadata | `lib/metadata.ts` |
| Schema.org | `lib/jsonld.tsx` |
| Sitemap | `app/sitemap.ts` |
| Robots | `app/robots.ts` |
| Redirects | `next.config.mjs` |
| Translations | `i18n/messages/en.json` |
| Blog posts | `blogs/en/*.mdx` |
| About | `content/about/en.mdx` |
| Privacy | `content/privacy-policy/en.mdx` |
| Terms | `content/terms-of-service/en.mdx` |
| Tailwind | `tailwind.config.ts` |
| Env vars | `.env.example` |

## SEO Keywords Strategy

### Primary Keywords
- wordle hint
- wordle hint today
- wordle clue today
- wordle answer today

### Secondary Keywords
- 5 letter words
- wordle help
- wordle tips
- wordle strategy
- best wordle starting words
- wordle solver

### Long-tail Keywords
- wordle hint today [date]
- 5 letter wordle hint
- how to play wordle
- wordle hard mode tips
- wordle starting word strategy
- 4/5/6/7/8/9/10/11 letter wordle

## Brand Guidelines

- **Name:** WordleHint (one word, capital W and H)
- **Domain:** wordlehint.info
- **Tone:** Helpful, game-focused, casual-expert
- **Colors:** TBD (game-themed, green/yellow/gray Wordle palette recommended)
- **No Strands references anywhere**
