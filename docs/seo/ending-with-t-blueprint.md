# Blueprint — `/5-letter-words/ending-with-t`

> Backlinko (2026) + GEO methodology applied to wordlehint.info's proven word-bank template.
> Status: **plan only — no code written yet.** Companion: `ending-with-t-ui-spec.md`.
> Precedent: `ending-with-e-blueprint.md` (first ending spoke, shipped commit `6549c8b`).

---

## 0. Strategy snapshot

| | |
|---|---|
| **Primary keyword** | `5 letter words ending in t` |
| **Search intent** | Wordle player has locked a green **T in position 5** and needs candidate words (transactional/utility), plus Scrabble/WWF spillover. |
| **Secondary keywords** | `5 letter words that end in t`, `5 letter words ending with t`, `wordle words ending in t`, `5 letter words ending in t for wordle`, `5 letter words ____t` |
| **Variant** | Authority word-list page (matches existing `starting-with-*` + `ending-with-e`: ~1500–1800 words, 8 sections) |
| **Why we can win** | Same split as the E landscape: competitors are either "big dumb lists" (word.tips, wordhippo, dictionary.com, bestwordlist) or "thin Wordle posts" (tryhardguides, mentalfloss, dotesports). **Nobody combines definitions + Wordle answer-layering + penultimate-letter navigation + honest opener strategy.** Our data layer already has all four. |

### Real data (from `data/word-bank/5.json` + `data/wordle-daily.json`, 2026-06-24)

| Metric | Value |
|---|---|
| Valid 5-letter words ending in T | **795** |
| Common (answer-pool) words | **253** |
| Words that have been NYT Wordle answers | **25** |
| Top penultimate (4th) letters among **common** words | **N 37 · S 36 · E 29 · I 23 · R 21 · U 19 · L 17 · A 16 · O 13 · H 11 · P 10 · F 10 · C 9** |
| Answered T-words (lower probability today) | ABBOT, AFOOT, ALLOT, BEFIT, BLAST, BLEAT, BLUNT, COMET, CUBIT, DIVOT, EIGHT, FRUIT, GLINT, HOIST, INLET, QUILT, REMIT, ROOST, SHORT, STRUT, STUNT, THEFT, TWEET, VISIT, WAIST |

> All numbers are auto-filled at render from the data layer (`{N}/{COMMON}/{ANSWERED}`). Do **not** hard-code them in prose — the answer count grows daily as the cron appends puzzles.

### Competitor gap table (research phase, T-specific fetches)

| Competitor | Words | Definitions | Past-answer layer | Penultimate nav | Best openers | Honest strategy | Prose |
|---|---|---|---|---|---|---|---|
| tryhardguides (T) | full (~500) | ✗ | ✗ | ✗ | ✗ | weak | ~200 |
| mentalfloss (T) | partial (~280) | ✗ | ✓ (crude 2-list) | ✗ | ✗ | ✗ | ~150–200 |
| word.tips (T) | full | ✗ | ✗ | ✗ | ✗ | ✗ (Scrabble pts) | thin |
| wordhippo / bestwordlist | full | def links | ✗ | ✗ | ✗ | ✗ | ~0 |
| dotesports (T) | partial | ✗ | ✗ | ✗ | ✗ | thin | ~300 |
| merriam-webster / dictionary.com | full | ✓ links | ✗ | ✗ | ✗ | ✗ | ~0 |
| **WordleHint (us)** | **full + common-first** | **✓ inline popover** | **✓ live, dated** | **✓ by 4th letter** | **✓ LEAST etc.** | **✓ data-honest** | **~1700** |

**Our edge in one line:** the only "5 letter words ending in T" page that is simultaneously complete, defined, Wordle-answer-aware, navigable by the 4th letter, and honest about which T-enders are genuinely strong openers.

---

## 1. Above-the-fold

- **Meta title (≤60):** `5 Letter Words Ending in T — Wordle List & Hints` (48)
- **Meta description (≤155):** `Every 5-letter word ending in T, sorted for Wordle. Common answers first, definitions, past answers flagged, plus the best T-ending openers. Updated daily.` (152)
- **H1:** `5 Letter Words Ending With T`
- **Hero subhead:** "A complete, Wordle-ready list of five-letter words that end in T — common answer-pool words first, with the strongest T-ending openers and past Wordle answers flagged."
- **Hero tile cue:** 5 tiles `_ _ _ _ T` with the **last** tile green (`highlightLast`), rest blank. (Reuses the `EndingListPage` hero.)
- **Stat cards (3, auto-filled):**
  1. `{total}` words ending in T (795)
  2. `{common}` common answer words (253)
  3. `{topOpener}` top-rated T-ending opener → **LEAST**
- **Last updated:** visible chip (GEO freshness).
- **Jump links:** Best openers · Full list · Past answers · Strategy · By 4th letter · FAQ

---

## 2. Section structure (H2 tree + word budget)

Reuses the 8-section word-bank rhythm. Total prose target **~1,700 words**.

1. **Intro** (~150w) — auto stat sentence: "There are **{N}** five-letter words ending in T; **{COMMON}** are common answer-pool words. The strongest T-ending Wordle opener is **LEAST**." + `introExtra`: T is one of the most common final letters in real Wordle answers, and — crucially — several elite openers are anagrams that end in T (**LEAST = SLATE/STALE/STEAL**, **REACT = TRACE/CRATE**). GEO-quotable headline fact.
2. **`Best Wordle Opening Words Ending in T`** (~250w + table) — the differentiator. Table cols: Word · Letters tested · Why it works. Mark **LEAST** as `best`.
   - **LEAST** `L·E·A·S·T` — tests five of the most frequent letters in the game; an anagram of SLATE/STALE, so it is essentially the best opener in the game that happens to end in T. *(best)*
   - **ROAST** `R·O·A·S·T` — five distinct high-value letters, swaps O/R in for players who want O coverage.
   - **REACT** `R·E·A·C·T` — anagram of TRACE/CRATE; tests the useful C while keeping R, E, A.
   - **SAINT** `S·A·I·N·T` — brings the vowel I and frequent N; great when you want to map I early.
   - **PAINT** `P·A·I·N·T` — same I/N probe with P instead of S.
   - **COAST** `C·O·A·S·T` — O + C coverage; strong alternative once L/R are ruled out.
   - ⚠️ honesty: these are genuinely strong because S/T/A/R/E/L/N are all top-frequency letters and the SLATE anagram family ends in T. Say that plainly; do **not** pad with obscure T-enders.
3. **`Complete List of 5-Letter Words Ending With T`** (~120w intro + grid) — **grouped by the 4th (penultimate) letter** → clusters rendered `…NT`, `…ST`, `…ET`, `…IT`, `…RT`, `…UT`, `…LT`, … Common-first, inline definition popovers, past-answer dot. The penultimate grouping is the navigation no competitor has.
4. **`T-Ending Words That Have Been Wordle Answers`** (~120w) — live, dated list from `answeredWordsEndingWith("T")` ({ANSWERED} words: SHORT, FRUIT, BLAST, EIGHT, COMET…). Frame as lower-probability today (NYT rarely repeats). Beats mentalfloss's static hand-list because ours updates with the cron.
5. **`How to Solve Wordle When the Word Ends in T`** (~300w, 3 paragraphs + bar chart) — strategy paragraphs + **"Most common 4th letters before T"** horizontal bars (from `stats.topPenultimateLetters`: N, S, E, I, R, U, L…). Teach the dense families in order:
   - `_ _ _ N T` (densest): GIANT, PLANT, COUNT, PRINT, FRONT, POINT, SPENT, BLUNT, CHANT
   - `_ _ _ S T`: BEAST, BOOST, FROST, GHOST, TWIST, WRIST, TRUST, FIRST, ROAST
   - `_ _ _ E T`: ASSET, ONSET, SWEET, GREET, SHEET, COMET, QUIET, VALET
   - `_ _ _ I T`: ADMIT, AUDIT, HABIT, LIMIT, MERIT, ORBIT, VISIT, SPLIT
   - `_ _ _ R T`: ALERT, CHART, COURT, HEART, SHORT, SMART, START, SPORT
   - `_ _ _ U T`: ABOUT, SCOUT, SHOUT, STOUT, TROUT, DEBUT, DONUT, GROUT
6. **`5-Letter Words Ending in T by Starting Letter`** (~100w + grid) — mirror of the E page's by-starting-letter cross-section. For top start letters, show common words matching `X _ _ _ T` (e.g. S→START/SHIRT/SCOUT, B→BEAST/BLAST/BUILT, C→COUNT/COURT/CHART). Drives internal links to `starting-with-*`.
7. **`Frequently Asked Questions`** (7 Q, see §3) — FAQPage schema.
8. **`Related Wordle Tools & Lists`** + **author bio** (reuse `RELATED` + Editorial Team block).

---

## 3. FAQ (FAQPage schema) — copy directions

Placeholders `{N}/{COMMON}/{ANSWERED}` auto-fill at render.

1. **How many 5-letter words end in T?** → "There are {N} five-letter words ending in T in the Wordle dictionary; {COMMON} are common answer-pool words…"
2. **What is the best Wordle word ending in T?** → LEAST rationale; it is an anagram of SLATE/STALE, tests five of the most frequent letters, so it doubles as a top-tier opener that ends in T.
3. **Which 5-letter words ending in T have been Wordle answers?** → "{ANSWERED} have already been solutions, including SHORT, FRUIT, EIGHT and BLAST…" + link to `/wordle-answers`. Frame as lower-probability today.
4. **What 5-letter words end in -NT, -ST or -ET?** → name the dense penultimate families (GIANT, PLANT, COUNT; BEAST, FROST, TWIST; ASSET, SWEET, COMET) — captures `_ _ _ X T` long-tail in one answer.
5. **Are 5-letter words ending in T good Wordle starters?** → yes, honest why (the SLATE anagram family + high-frequency consonants), with the caveat to still test fresh letters on guess two.
6. **What 5-letter words end in T with lots of vowels?** → ABOUT, AUDIT, ADOPT, IDIOT, INPUT, OUGHT, QUIET — efficient vowel-mapping options that still end in T.
7. **Where can I get today's Wordle hint?** → link `/wordle-hint-today`.

GEO note: every answer is a self-contained 30–80w Q→A block; at least 3 carry a specific number.

---

## 4. Schema JSON-LD (reuse existing helpers — no new helpers)

- `breadcrumbSchema([Home, 5 Letter Words, Ending With T])`
- `faqPageSchema(faq)` — from §3
- `itemListSchema("Best 5-letter Wordle words ending in T", openers[].word)`

Identical to `ending-with-e`.

---

## 5. Internal links (anchor → target → location)

| Anchor | Target | Section |
|---|---|---|
| "5-Letter Words Hub" | `/5-letter-words` | breadcrumb + related |
| "ending-with hub" | `/5-letter-words/ending-with` | breadcrumb |
| "5 letter words starting with S/B/C…" | `/5-letter-words/starting-with-*` | §6 by-starting-letter grid |
| "5 letter words ending in E" | `/5-letter-words/ending-with-e` | §2 openers / related (sibling spoke) |
| "Wordle Solver" | `/wordle-solver` | related |
| "best opening words" | `/best-wordle-starting-words` | §2 openers intro |
| "today's Wordle hint" | `/wordle-hint-today` | hero CTA + FAQ7 |
| "past Wordle answers" | `/wordle-answers` | §4 |

---

## 6. Hub registration (no new hub — already live)

The `/5-letter-words/ending-with` hub already exists with `LIVE_ENDING = ["E"]`. This spoke only needs:

- Add `"T"` to `LIVE_ENDING` (hub turns the T cell from "Coming soon" → live link).
- Add `"t"` to `wordListEndingLetters` in `lib/sitemap.ts`.

No hub markup or new hub component work.

---

## 7. GEO signals checklist

- [x] ≥3 stats with attribution (counts from our own archive/data layer — "WordleHint answer archive")
- [x] "What is X" quotable block in first 200 words (auto stat sentence + SLATE-anagram fact)
- [x] FAQ in direct Q→A form
- [x] Author bio with credentials (Editorial Team block, links to /about)
- [x] FAQPage + ItemList + Breadcrumb schema
- [x] Visible last-updated date
- [x] SSR/static (content in view-source ✓)

---

## 8. Engineering delta (for build phase — NOT yet written)

Thanks to the E spoke, the ending-with machinery already exists. This spoke is **content + 2 registrations + 1 wrapper**, no new components or lib functions.

**Reuse unchanged:** `EndingListPage.tsx`, all helpers in `lib/word-bank.ts` (`endingWithDecorated`, `groupByFourthLetter`, `endingLetterStats`, `answeredWordsEndingWith`, `commonEndingWith`), `Tile/WordGrid (highlightLast)/SectionHeading/StatCard/JsonLd`, `constructMetadata`, the shared `solve-strategy-board-end.svg`.

**New content** `data/word-bank/ending-with-t.ts` — exports `content: LetterContent` (letter "T", path, lastUpdated, topOpener "LEAST", heroSubhead, introExtra, openersIntro, openers[6], strategyParagraphs[3], faq[7]) per §2–3. Model on `ending-with-e.ts`.

**New route** `app/[locale]/5-letter-words/ending-with-t/page.tsx` — 3-line wrapper: import `content`, import `EndingListPage`, export `metadata` (T keywords/title/desc) + default page. Copy the `ending-with-e` wrapper and swap import + metadata.

**Registrations:**
- `app/[locale]/5-letter-words/ending-with/page.tsx` → `LIVE_ENDING` add `"T"`.
- `lib/sitemap.ts` → `wordListEndingLetters` add `"t"`.

**Definitions:** common T-enders are high-frequency everyday words; defs are per-word (not per-position) and mostly already in `wordle-definitions.json`. Verify coverage at build; if gaps, run `scripts/backfill-word-defs.mjs`.

**Build verification:** `pnpm build`, confirm `/5-letter-words/ending-with-t` renders with correct {N}/{COMMON}/{ANSWERED}, the penultimate groups, and the hub T cell now links. Then `git pull --rebase origin main` before commit/push (daily cron commits puzzle JSON to main).
