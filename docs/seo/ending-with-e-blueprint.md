# Blueprint — `/5-letter-words/ending-with-e` + `/5-letter-words/ending-with` hub

> Backlinko (2026) + GEO methodology applied to wordlehint.info's proven word-bank template.
> Status: **plan only — no code written yet.** Companion: `ending-with-e-ui-spec.md`.

---

## 0. Strategy snapshot

| | |
|---|---|
| **Primary keyword** | `5 letter words ending in e` |
| **Search intent** | Wordle player has locked a green **E in position 5** and needs candidate words (transactional/utility), plus Scrabble/WWF spillover. |
| **Secondary keywords** | `5 letter words that end in e`, `5 letter words ending with e`, `wordle words ending in e`, `5 letter words ending in e for wordle` |
| **Hub keyword** | `5 letter words ending in …` / `5 letter words by ending letter` |
| **Variant** | Authority word-list page (matches existing `starting-with-*` pages: ~1500–1800 words, 8 sections) |
| **Why we can win** | Competitors are split into "big dumb lists" (word.tips, dictionary.com, wordhippo) and "thin Wordle posts" (tryhardguides, mentalfloss). **Nobody combines definitions + Wordle answer-layering + penultimate-letter navigation + honest strategy.** We already have all four in our data layer. |

### Competitor gap table (from research phase)

| Competitor | Words | Definitions | Past-answer layer | Penultimate nav | Honest strategy | Prose |
|---|---|---|---|---|---|---|
| word.tips | full | ✗ | ✗ | ✗ | ✗ (Scrabble points) | ~800 |
| tryhardguides | full | ✗ | ✗ | ✗ | weak | ~400 |
| mentalfloss | partial | ✗ | ✓ (crude 2-list) | ✗ | ✗ | ~1100 |
| dictionary.com | full | links only | ✗ | ✗ | ✗ | ~0 |
| wordfinder.yourdictionary | paginated | def links | ✗ | ✗ | ✗ | thin |
| curiousjr | 50 only | ✓ | ✗ | ✗ | ✗ (no Wordle) | ~1800 |
| **WordleHint (us)** | **full + common-first** | **✓ inline popover** | **✓ live, dated** | **✓ by 4th letter** | **✓ data-honest** | **~1700** |

**Our edge in one line:** the only "5 letter words ending in E" page that is simultaneously complete, defined, Wordle-answer-aware, and navigable by the letter you're most likely to already know (the 4th).

---

## 1. Above-the-fold

- **Meta title (≤60):** `5 Letter Words Ending in E — Wordle List & Hints` (49)
- **Meta description (≤155):** `Every 5-letter word ending in E, sorted for Wordle. Common answers first, definitions, past answers flagged, and the best E-ending openers. Updated daily.` (153)
- **H1:** `5 Letter Words Ending With E`
- **Hero subhead (copy direction):** "A complete, Wordle-ready list of five-letter words that end in E — common answer-pool words first, with the strongest E-ending openers and past Wordle answers flagged."
- **Hero tile cue:** 5 tiles `_ _ _ _ E` with the **last** tile green (`state="correct"`), rest blank. (Mirror of starting-page hero, which greens the first tile.)
- **Stat cards (3, auto-filled from lib):**
  1. `{total}` words ending in E
  2. `{common}` common answer words
  3. `{topOpener}` top-rated E-ending opener (e.g. **SLATE** / **CRANE**)
- **Last updated:** visible chip (GEO freshness signal).
- **Jump links:** Best openers · Full list · Past answers · Strategy · By 4th letter · FAQ

---

## 2. Section structure (H2 tree + word budget)

Reuses the 8-section word-bank rhythm. Total prose target **~1,700 words**.

1. **Intro** (~150w) — auto stat sentence: "There are **{total}** five-letter words ending in E…, **{common}** are common answer-pool words. The strongest E-ending Wordle opener is **{topOpener}**." + `introExtra`: one idea/paragraph, GEO-quotable. State the headline fact: *E is the single most common final letter among Wordle answers* (cite: our own answer archive — count from `getAllPuzzles()`).
2. **`Best Wordle Opening Words Ending in E`** (~250w + table) — this is a differentiator: many elite openers end in E (SLATE, CRANE, TRACE, STARE, RAISE→no, SLICE, ADIEU→no). Table cols: Word · Letters tested · Why it works. Mark one `best`. ⚠️ honesty: openers ending in E are legitimately strong because E is the most frequent letter — say so plainly, don't oversell obscure words.
3. **`Complete List of 5-Letter Words Ending With E`** (~120w intro + the grid) — **grouped by the 4th (penultimate) letter** → clusters `_ _ _ A E`, `_ _ _ B E`, … rendered as `…AE`, `…BE`. Common-first, definition popovers, past-answer dot. This penultimate grouping is the navigation no competitor has.
4. **`E-Ending Words That Have Been Wordle Answers`** (~120w) — live, dated list from `answeredWordsEndingWith("E")`. Frames them as lower-probability today (NYT rarely repeats). Beats mentalfloss's static hand-list.
5. **`How to Solve Wordle When the Word Ends in E`** (~300w, 3 paragraphs + bar chart) — strategy paragraphs + **"Most common 4th letters before E"** horizontal bars (from stats.topPenultimateLetters). Teach the `_ _ _ A E` / `_ _ _ L E` / `_ _ _ R E` / `_ _ _ S E` / `_ _ _ T E` families.
6. **`5-Letter Words Ending in E by Starting Letter`** (~100w + grid) — mirror of the starting-page's "by ending letter" cross-section. For each start letter A–Z (or top ones), show common words that fit `X _ _ _ E`. Drives internal links to `starting-with-*`.
7. **`Frequently Asked Questions`** (6–8 Q, see §3) — FAQPage schema.
8. **`Related Wordle Tools & Lists`** + **author bio** (reuse `RELATED` + Editorial Team block).

---

## 3. FAQ (FAQPage schema) — copy directions

Placeholders `{N}/{COMMON}/{ANSWERED}` auto-fill at render.

1. **How many 5-letter words end in E?** → "There are {N} five-letter words ending in E in the Wordle dictionary; {COMMON} are common answer-pool words…"
2. **What is the best Wordle word ending in E?** → SLATE/CRANE rationale; E is the most frequent answer letter, so an E-ender doubles as a strong opener.
3. **Which 5-letter words ending in E have been Wordle answers?** → "{ANSWERED} have already been solutions…" + link to `/wordle-answers`.
4. **What 5-letter words end in -SE / -LE / -TE?** → name the dense penultimate families (POSE, RINSE; APPLE, TABLE; ELITE, QUOTE) — captures `_ _ _ X E` long-tail in one answer.
5. **Are words ending in E good Wordle starters?** → yes, honest why (vowel + frequency), with the caveat to still test fresh consonants.
6. **What are 5-letter words ending in E with lots of vowels?** → ADOBE, ABODE, ALOObE? → ABODE, ADOBE, OZONE, AZURE, ARGUE, AMAZE.
7. **Where can I get today's Wordle hint?** → link `/wordle-hint-today`.

GEO note: every answer is a self-contained 30–80w Q→A block. At least 3 carry a specific number.

---

## 4. Schema JSON-LD (reuse existing helpers in `lib/jsonld`)

- `breadcrumbSchema([Home, 5 Letter Words, Ending With E])`
- `faqPageSchema(faq)` — from §3
- `itemListSchema("Best 5-letter Wordle words ending in E", openers[].word)`

No new schema helpers needed — identical to `LetterListPage`.

---

## 5. Internal links (anchor → target → location)

| Anchor | Target | Section |
|---|---|---|
| "5-Letter Words Hub" | `/5-letter-words` | breadcrumb + related |
| "ending-with hub" | `/5-letter-words/ending-with` | breadcrumb |
| "5 letter words starting with A/S/T…" | `/5-letter-words/starting-with-*` | §6 by-starting-letter grid |
| "Wordle Solver" | `/wordle-solver` | related |
| "best opening words" | `/best-wordle-starting-words` | §2 openers intro |
| "today's Wordle hint" | `/wordle-hint-today` | hero CTA + FAQ7 |
| "past Wordle answers" | `/wordle-answers` | §4 |

---

## 6. Hub page `/5-letter-words/ending-with`

Clone of `/5-letter-words` hub, retargeted to endings.

- **Meta title:** `5 Letter Words by Ending Letter — Wordle Lists`
- **H1:** `5 Letter Words by Ending Letter`
- **Hero tile cue:** `_ _ _ _ S` with **last** tile green.
- **A–Z grid** linking `ending-with-{letter}`; `LIVE_ENDING` initially `["E"]`, rest "Coming soon" (dashed). Same live/disabled pattern as starting hub.
- Intro copy: "Already know the last letter of today's Wordle? Jump to the full list for that ending — common answers first, past answers flagged."
- Reuse "Wordle Tools" card row.
- **Cross-wire:** add a link from the main `/5-letter-words` hub → this ending hub (the existing RELATED card already promises "starting, ending and contained" — this makes it true).

---

## 7. GEO signals checklist

- [x] ≥3 stats with attribution (counts from our own archive/data layer — cite "WordleHint answer archive")
- [x] "What is X" quotable block in first 200 words (the auto stat sentence)
- [x] FAQ in direct Q→A form
- [x] Author bio with credentials (Editorial Team block, links to /about)
- [x] FAQPage + ItemList + Breadcrumb schema
- [x] Visible last-updated date
- [x] SSR/static (Next.js static export — content in view-source ✓)

---

## 8. Engineering delta (for build phase — NOT yet written)

The current word-bank layer is **start-letter only**. ending-with needs a parallel slice. Reuse `Tile`, `WordGrid`, `primitives`, `jsonld`, `constructMetadata`, `StatCard` unchanged.

**`lib/word-bank.ts` — add:**
- `endingWithDecorated(letter): BankWord[]` (current `endingWith` returns bare `string[]`; keep or extend).
- `groupByFourthLetter(letter): SuffixGroup[]` — group ending-letter words by index-3 letter; cluster label `…{4th}{end}`; common-first sort (mirror `groupBySecondLetter`).
- `endingLetterStats(letter): LetterStats` — total/common/answered + `topPenultimateLetters` (mirror `letterStats`).
- `answeredWordsEndingWith(letter): string[]` — filter `getAllPuzzles()` by `answer[4]`.
- `commonStartingWith(startLetter, endLetter, limit)` OR reuse `commonEndingWith` iterated over start letters for §6.

**New component `components/word-bank/EndingListPage.tsx`** — fork of `LetterListPage` with: H1/breadcrumb/strategy text retargeted to "ending"; hero greens last tile; grouping = penultimate; §6 = "by starting letter". Reuse the same `LetterContent` interface (fields are generic; `topOpener` = best E-ending opener).

**New content `data/word-bank/ending-with-e.ts`** — exports `content: LetterContent` (openers, FAQ, strategy, intro) per §2–3.

**New routes:** `app/[locale]/5-letter-words/ending-with/page.tsx` (hub) + `app/[locale]/5-letter-words/ending-with-e/page.tsx` (3-line wrapper).

**Registrations:** `lib/sitemap.ts` add `wordListEndingLetters = ["e"]`; main hub link to ending hub; ending hub `LIVE_ENDING`.

**Definitions:** E-ending common words already covered by existing `wordle-definitions.json` backfill (defs are per-word, not per-position) — likely no new backfill needed; verify coverage during build.
