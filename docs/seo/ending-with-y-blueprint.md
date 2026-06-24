# Blueprint — `/5-letter-words/ending-with-y`

> Backlinko (2026) + GEO methodology applied to wordlehint.info's proven word-bank template.
> Status: **plan only — no code written yet.** Companion: `ending-with-y-ui-spec.md`.
> Precedent: `ending-with-e-blueprint.md` (1st spoke), `ending-with-t-blueprint.md` (2nd spoke).

---

## 0. Strategy snapshot

| | |
|---|---|
| **Primary keyword** | `5 letter words ending in y` |
| **Search intent** | Wordle player has locked a green **Y in position 5** and needs candidate words (transactional/utility), plus Scrabble/WWF spillover. |
| **Secondary keywords** | `5 letter words that end in y`, `5 letter words ending with y`, `wordle words ending in y`, `5 letter words ending in y for wordle`, `5 letter words ____y` |
| **Variant** | Authority word-list page (matches `starting-with-*` + `ending-with-e/-t`: ~1500–1800 words, 8 sections) |
| **Why we can win** | Identical landscape to the E/T spokes: competitors are either "big dumb lists" (word.tips, wordhippo, dictionary.com, bestwordlist, englishan) or "thin Wordle posts" (tryhardguides, mentalfloss, techwiser). **Nobody combines definitions + Wordle answer-layering + penultimate-letter navigation + honest opener strategy.** Our data layer already has all four. Y is the single richest ending we will build — most words, densest rhyming families, and a unique double-letter strategy angle. |

### Real data (from `data/word-bank/5.json` + `data/wordle-daily.json`, 2026-06-24)

| Metric | Value |
|---|---|
| Valid 5-letter words ending in Y | **1,527** (the largest ending bucket) |
| Common (answer-pool) words | **364** |
| Words that have been NYT Wordle answers | **40** |
| Top penultimate (4th) letters among **common** words | **L 56 · T 46 · D 38 · R 33 · K 31 · N 23 · S 19 · P 16 · E 13 · A 13 · M 13 · G 12** |
| Answered Y-words (lower probability today) | ALLEY, ALLOY, AMPLY, ANNOY, BUNNY, CATTY, CURRY, DALLY, DIZZY, DODGY, DOWDY, DUSKY, DUSTY, ENTRY, ENVOY, FIERY, FILLY, FIZZY, FLAKY, GOOEY, GRAVY, GUNKY, HARDY, HASTY, HOLLY, IVORY, LOBBY, MUGGY, NEWLY, NOBLY, PUFFY, RELAY, RUGBY, SANDY, SPINY, SULLY, TABBY, TEDDY, TESTY, TOADY |

> All numbers auto-fill at render (`{N}/{COMMON}/{ANSWERED}`). Do **not** hard-code them in prose — the answer count grows daily.

### Competitor gap table (research phase, Y-specific search)

| Competitor | Words | Definitions | Past-answer layer | Penultimate nav | Best openers | Honest strategy | Prose |
|---|---|---|---|---|---|---|---|
| tryhardguides (Y) | full | ✗ | ✗ | ✗ | ✗ | weak | ~200 |
| mentalfloss (Y) | partial | ✗ | ✓ (crude 2-list) | ✗ | ✗ | ✗ | ~150–200 |
| word.tips (Y) | full | ✗ | ✗ | ✗ | ✗ | ✗ (Scrabble pts) | thin |
| wordhippo / bestwordlist / englishan | full | def links | ✗ | ✗ | ✗ | ✗ | ~0 |
| techwiser (Y) | partial | ✗ | ✗ | ✗ | ✗ | thin | ~300 |
| wordfinder / dictionary.com | full | ✓ links | ✗ | ✗ | ✗ | ✗ | ~0 |
| **WordleHint (us)** | **full + common-first** | **✓ inline popover** | **✓ live, dated** | **✓ by 4th letter** | **✓ EARLY etc.** | **✓ double-letter trap + families** | **~1700** |

**Our edge in one line:** the only "5 letter words ending in Y" page that is simultaneously complete, defined, Wordle-answer-aware, navigable by the 4th letter, and honest about the rhyming-family and double-letter traps that make Y endings deceptively hard.

---

## 1. Above-the-fold

- **Meta title (≤60):** `5 Letter Words Ending in Y — Wordle List & Hints` (48)
- **Meta description:** auto-built in wrapper → `All {total} five-letter words ending in Y, sorted for Wordle. Common answers first, definitions, past answers flagged, and the best Y-ending openers like EARLY. Updated daily.` (matches E/T wrapper pattern)
- **H1:** `5 Letter Words Ending With Y`
- **Hero subhead:** "A complete, Wordle-ready list of five-letter words that end in Y — common answer-pool words first, with the strongest Y-ending openers and past Wordle answers flagged."
- **Hero tile cue:** 5 tiles `_ _ _ _ Y` with the **last** tile green (`highlightLast`).
- **Stat cards (3, auto-filled):**
  1. `{total}` words ending in Y (1,527)
  2. `{common}` common answer words (364)
  3. `{topOpener}` top-rated Y-ending opener → **EARLY**
- **Last updated:** visible chip (GEO freshness).
- **Jump links:** Best openers · Full list · Past answers · Strategy · By 4th letter · FAQ

---

## 2. Section structure (H2 tree + word budget)

Reuses the 8-section word-bank rhythm. Total prose target **~1,700 words**.

1. **Intro** (~150w) — auto stat sentence: "There are **{N}** five-letter words ending in Y; **{COMMON}** are common answer-pool words. The strongest Y-ending Wordle opener is **EARLY**." + `introExtra`: Y is one of the most common final letters in real Wordle answers (it ends a huge family of adjectives — `-LY`, `-TY`, `-DY`), but it is rare anywhere else, which makes Y-ending words a position you want to *know* rather than *guess*. GEO-quotable headline fact.
2. **`Best Wordle Opening Words Ending in Y`** (~250w + table) — Table cols: Word · Letters tested · Why it works. Mark **EARLY** as `best`.
   - **EARLY** `E·A·R·L·Y` — tests four of the most frequent letters in the game (E, A, R, L) plus Y; an anagram of RELAY and LAYER, so it doubles as a genuinely strong opener that ends in Y. *(best)*
   - **STRAY** `S·T·R·A·Y` — five distinct letters bringing the high-value S, T and R around A.
   - **ENTRY** `E·N·T·R·Y` — E, N, T and R are all top-frequency consonants/vowels; great coverage with no repeats.
   - **STORY** `S·T·O·R·Y` — swaps O in for players who want to probe that vowel alongside S, T, R.
   - **DECAY** `D·E·C·A·Y` — tests the useful C and two vowels (E, A); a solid change-up.
   - **DAIRY** `D·A·I·R·Y` — brings the vowel I together with A and R; efficient for mapping vowels.
   - ⚠️ **honesty:** Y-ending openers are second-tier compared with SLATE-class E-enders, because Y is rare outside the last slot and most Y-enders fall into rhyming families with repeated letters. Say so plainly — only the distinct-letter picks above (EARLY, STRAY, ENTRY) are worth opening with; don't pad with `-LLY`/`-PPY` rhymers.
3. **`Complete List of 5-Letter Words Ending With Y`** (~120w intro + grid) — **grouped by the 4th (penultimate) letter** → clusters `…LY …TY …DY …RY …KY …NY …` (densest first). Common-first, inline definition popovers, past-answer dot. The penultimate grouping is the navigation no competitor has — and it matters most here, where the 4th letter splits a huge list into recognisable rhyme groups.
4. **`Y-Ending Words That Have Been Wordle Answers`** (~120w) — live, dated list from `answeredWordsEndingWith("Y")` ({ANSWERED} words: ENTRY, GRAVY, IVORY, HASTY, FLAKY…). Frame as lower-probability today (NYT rarely repeats). Beats mentalfloss's static hand-list because ours updates with the cron.
5. **`How to Solve Wordle When the Word Ends in Y`** (~320w, 3 paragraphs + bar chart) — strategy paragraphs + **"Most common 4th letters before Y"** horizontal bars (from `stats.topPenultimateLetters`: L, T, D, R, K, N…). Two unique angles:
   - **The double-letter trap:** Y endings hide more repeated letters than any other — BELLY, JOLLY, PUPPY, FIZZY, MUDDY, FUNNY, SORRY, HOBBY. If common single-letter guesses fizzle, test for a doubled consonant before the family vowel.
   - **The rhyming families:** work the dense shapes in order — `_ _ _ L Y` (APPLY, REPLY, BADLY, EARLY, MANLY), `_ _ _ T Y` (PARTY, NASTY, TASTY, EMPTY, FIFTY), `_ _ _ D Y` (CANDY, HANDY, READY, STUDY, ROWDY), `_ _ _ R Y` (ANGRY, BERRY, STORY, WORRY, GLORY), `_ _ _ K Y` (LUCKY, ROCKY, RISKY, PESKY, MURKY), `_ _ _ N Y` (FUNNY, SUNNY, PENNY, IRONY, HONEY).
6. **`5-Letter Words Ending in Y by Starting Letter`** (~100w + grid) — mirror of the E/T cross-section. For top start letters, show common `X _ _ _ Y` words (S→STORY/STUDY/SUNNY, D→DAIRY/DANDY/DECAY, P→PARTY/PENNY/PROXY). Drives internal links to `starting-with-*`.
7. **`Frequently Asked Questions`** (7 Q, see §3) — FAQPage schema.
8. **`Related Wordle Tools & Lists`** + **author bio** (reuse `RELATED` + Editorial Team block).

---

## 3. FAQ (FAQPage schema) — copy directions

Placeholders `{N}/{COMMON}/{ANSWERED}` auto-fill at render.

1. **How many 5-letter words end in Y?** → "There are {N} five-letter words ending in Y in the Wordle dictionary; {COMMON} are common answer-pool words…" (note this is the largest ending bucket).
2. **What is the best Wordle word ending in Y?** → EARLY rationale; anagram of RELAY/LAYER, tests four of the most frequent letters (E, A, R, L) plus Y. STRAY and ENTRY are close behind.
3. **Which 5-letter words ending in Y have been Wordle answers?** → "{ANSWERED} have already been solutions, including ENTRY, GRAVY, IVORY and HASTY…" + link to `/wordle-answers`. Frame as lower-probability today.
4. **What 5-letter words end in -LY, -TY or -DY?** → name the dense penultimate families (BADLY, APPLY; PARTY, NASTY; CANDY, READY) — captures `_ _ _ X Y` long-tail in one answer.
5. **Are 5-letter words ending in Y good Wordle starters?** → honest: decent if you pick a distinct-letter one (EARLY, ENTRY, STRAY), but most Y-enders are rhyming families with repeats, so they make weaker openers than SLATE-class words. Test fresh letters on guess two.
6. **What are 5-letter words ending in Y with lots of vowels?** → ARRAY, ALLOY, ANNOY, ASSAY, DECAY, DAIRY, ESSAY and ENJOY each pack two or more vowels while ending in Y — useful for mapping the vowel skeleton.
7. **Where can I get today's Wordle hint?** → link `/wordle-hint-today`.

GEO note: every answer is a self-contained 30–80w Q→A block; at least 3 carry a specific number.

---

## 4. Schema JSON-LD (reuse existing helpers — no new helpers)

- `breadcrumbSchema([Home, 5 Letter Words, Ending With Y])`
- `faqPageSchema(faq)` — from §3
- `itemListSchema("Best 5-letter Wordle words ending in Y", openers[].word)`

Identical to `ending-with-e/-t`.

---

## 5. Internal links (anchor → target → location)

| Anchor | Target | Section |
|---|---|---|
| "5-Letter Words Hub" | `/5-letter-words` | breadcrumb + related |
| "ending-with hub" | `/5-letter-words/ending-with` | breadcrumb |
| "5 letter words starting with S/D/P…" | `/5-letter-words/starting-with-*` | §6 by-starting-letter grid |
| "5 letter words ending in E / T" | `/5-letter-words/ending-with-e`, `-t` | §2 / related (sibling spokes) |
| "Wordle Solver" | `/wordle-solver` | related |
| "best opening words" | `/best-wordle-starting-words` | §2 openers intro |
| "today's Wordle hint" | `/wordle-hint-today` | hero CTA + FAQ7 |
| "past Wordle answers" | `/wordle-answers` | §4 |

---

## 6. Hub registration (no new hub — already live)

`/5-letter-words/ending-with` already exists with `LIVE_ENDING = ["E", "T"]`. This spoke only needs:

- Add `"Y"` to `LIVE_ENDING` (hub turns the Y cell live).
- Add `"y"` to `wordListEndingLetters` in `lib/sitemap.ts`.

No hub markup or new hub component work.

---

## 7. GEO signals checklist

- [x] ≥3 stats with attribution (counts from our own data layer — "WordleHint answer archive")
- [x] "What is X" quotable block in first 200 words (auto stat sentence + EARLY/RELAY fact)
- [x] FAQ in direct Q→A form
- [x] Author bio with credentials (Editorial Team block, links to /about)
- [x] FAQPage + ItemList + Breadcrumb schema
- [x] Visible last-updated date
- [x] SSR/static (content in view-source ✓)

---

## 8. Engineering delta (for build phase — NOT yet written)

The ending-with machinery already exists. This spoke is **content + 2 registrations + 1 wrapper**, no new components or lib functions.

**Reuse unchanged:** `EndingListPage.tsx`, all helpers in `lib/word-bank.ts` (`endingWithDecorated`, `groupByFourthLetter`, `endingLetterStats`, `answeredWordsEndingWith`, `commonEndingWith`), `Tile/WordGrid (highlightLast)/SectionHeading/StatCard/JsonLd`, `constructMetadata`, the shared `solve-strategy-board-end.svg`.

**New content** `data/word-bank/ending-with-y.ts` — exports `content: LetterContent` (letter "Y", path, lastUpdated, topOpener "EARLY", heroSubhead, introExtra, openersIntro, openers[6], strategyParagraphs[3 — incl. double-letter trap], faq[7]). Model on `ending-with-t.ts`.

**New route** `app/[locale]/5-letter-words/ending-with-y/page.tsx` — 3-line wrapper: import `content`, import `EndingListPage`, export `metadata` (Y keywords/title/desc) + default page. Copy the `ending-with-t` wrapper and swap import + metadata.

**Registrations:**
- `app/[locale]/5-letter-words/ending-with/page.tsx` → `LIVE_ENDING` add `"Y"`.
- `lib/sitemap.ts` → `wordListEndingLetters` add `"y"`.

**Definitions:** 7 of 364 common Y-enders currently lack definitions (BONEY, EVERY, GAYLY, ICILY, MINTY, WARTY, ZESTY). Page handles null gloss gracefully (no popover). Run `scripts/backfill-word-defs.mjs` in a networked env to fill (EVERY/ZESTY/MINTY are the notable ones; dictionaryapi.dev is blocked in the local sandbox).

**Build verification:** `pnpm build`, confirm `/5-letter-words/ending-with-y` renders with correct {N}/{COMMON}/{ANSWERED}, the penultimate groups, and the hub Y cell now links. Then `git pull --rebase origin main` before commit/push (daily cron commits puzzle JSON to main).
