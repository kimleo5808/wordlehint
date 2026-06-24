# Blueprint — `/5-letter-words/ending-with-r`

> Backlinko (2026) + GEO methodology applied to wordlehint.info's proven word-bank template.
> Status: **plan only — no code written yet.** Companion: `ending-with-r-ui-spec.md`.
> Precedent: `ending-with-e` (1st), `-t` (2nd), `-y` (3rd) spokes.

---

## 0. Strategy snapshot

| | |
|---|---|
| **Primary keyword** | `5 letter words ending in r` |
| **Search intent** | Wordle player has locked a green **R in position 5** and needs candidate words (transactional/utility), plus Scrabble/WWF spillover. |
| **Secondary keywords** | `5 letter words that end in r`, `5 letter words ending with r`, `wordle words ending in r`, `5 letter words ending in r for wordle`, `5 letter words ____r` |
| **Variant** | Authority word-list page (matches `starting-with-*` + `ending-with-e/-t/-y`: ~1500–1800 words, 8 sections) |
| **Why we can win** | Same split as prior spokes, but the Wordle-angle competition is **even thinner** for R — only tryhardguides ranks; the rest (word.tips, wordhippo, dictionary.com, bestwordlist, merriam-webster, chirpypages) are bare lists with no Wordle layering, no definitions inline, no penultimate nav, no honest strategy. R is also one of the **best ending letters for openers** (the `_ _ _ E R` family pairs R with E + top consonants), so the opener section is unusually strong and honest. |

### Real data (from `data/word-bank/5.json` + `data/wordle-daily.json`, 2026-06-24)

| Metric | Value |
|---|---|
| Valid 5-letter words ending in R | **737** |
| Common (answer-pool) words | **212** |
| Words that have been NYT Wordle answers | **18** |
| Top penultimate (4th) letters among **common** words | **E 141 · O 34 · A 20 · U 9 · I 7 · Y 1** |
| Answered R-words (lower probability today) | ABHOR, BUYER, CIGAR, DECOR, DEFER, LATER, LEVER, MAKER, MISER, MOVER, QUEER, RACER, RISER, SITAR, SOBER, TUBER, WAVER, WISER |

> All numbers auto-fill at render (`{N}/{COMMON}/{ANSWERED}`). Do **not** hard-code them in prose — the answer count grows daily.
>
> **Defining fact:** `_ _ _ E R` accounts for **141 of 212** common R-enders (~66%). R is overwhelmingly the agent-noun / comparative ending (MAKER, RIVER, AFTER, OTHER, ORDER, UNDER, NEWER, OLDER). This shapes both the strategy section and the navigation.

### Competitor gap table (research phase, R-specific search)

| Competitor | Words | Definitions | Past-answer layer | Penultimate nav | Best openers | Honest strategy | Prose |
|---|---|---|---|---|---|---|---|
| tryhardguides (R) | full | ✗ | ✗ | ✗ | ✗ | weak | ~200 |
| word.tips (R) | full | ✗ | ✗ | ✗ | ✗ | ✗ (Scrabble pts) | thin |
| wordhippo / bestwordlist / chirpypages | full | def links | ✗ | ✗ | ✗ | ✗ | ~0 |
| dictionary.com / merriam-webster | full | ✓ links | ✗ | ✗ | ✗ | ✗ | ~0 |
| wordfinder / scrabblewordfinder | full | def links | ✗ | ✗ | ✗ | ✗ (Scrabble pts) | thin |
| **WordleHint (us)** | **full + common-first** | **✓ inline popover** | **✓ live, dated** | **✓ by 4th letter** | **✓ LATER etc.** | **✓ -ER dominance insight** | **~1700** |

**Our edge in one line:** the only "5 letter words ending in R" page that is simultaneously complete, defined, Wordle-answer-aware, navigable by the 4th letter, and built around the insight that R endings are almost always `_ _ _ E R`.

---

## 1. Above-the-fold

- **Meta title (≤60):** `5 Letter Words Ending in R — Wordle List & Hints` (48)
- **Meta description:** auto-built in wrapper → `All {total} five-letter words ending in R, sorted for Wordle. Common answers first, definitions, past answers flagged, and the best R-ending openers like LATER. Updated daily.`
- **H1:** `5 Letter Words Ending With R`
- **Hero subhead:** "A complete, Wordle-ready list of five-letter words that end in R — common answer-pool words first, with the strongest R-ending openers and past Wordle answers flagged."
- **Hero tile cue:** 5 tiles `_ _ _ _ R` with the **last** tile green (`highlightLast`).
- **Stat cards (3, auto-filled):**
  1. `{total}` words ending in R (737)
  2. `{common}` common answer words (212)
  3. `{topOpener}` top-rated R-ending opener → **LATER**
- **Last updated:** visible chip.
- **Jump links:** Best openers · Full list · Past answers · Strategy · By 4th letter · FAQ

---

## 2. Section structure (H2 tree + word budget)

Reuses the 8-section word-bank rhythm. Total prose target **~1,700 words**.

1. **Intro** (~150w) — auto stat sentence: "There are **{N}** five-letter words ending in R; **{COMMON}** are common answer-pool words. The strongest R-ending Wordle opener is **LATER**." + `introExtra`: the headline insight — about two-thirds of common R-enders end in `-ER` (the agent-noun / comparative family), so once R is locked, the puzzle usually comes down to the 3rd letter. Several top openers are R-enders too (LATER and CATER are anagrams of ALERT and TRACE). GEO-quotable.
2. **`Best Wordle Opening Words Ending in R`** (~250w + table) — a genuine strength here. Table cols: Word · Letters tested · Why it works. Mark **LATER** as `best`.
   - **LATER** `L·A·T·E·R` — tests five of the most frequent letters in the game (L, A, T, E, R); an anagram of ALERT and ALTER, so it is essentially the best opener in the game that ends in R. *(best)*
   - **CATER** `C·A·T·E·R` — anagram of TRACE, CRATE and REACT; probes the useful C while keeping A, T, E, R.
   - **SOLAR** `S·O·L·A·R` — five distinct high-value letters that bring S and O coverage around L, A, R.
   - **SUPER** `S·U·P·E·R` — adds S, U and P; a strong alternative when you want to test U early.
   - **TIGER** `T·I·G·E·R` — brings the vowel I and G together with T, E, R; good for mapping I.
   - **OTHER** `O·T·H·E·R` — tests O and H alongside T, E, R — useful coverage with no repeats.
   - ⚠️ **honesty:** unlike Y, R-ending openers are legitimately strong because the `-ER` family pairs R with E and high-value consonants, and LATER/CATER are anagrams of the game's best openers. Say so — this is a real strength, not a stretch. Still avoid repeated-letter R-enders (ERROR, OTTER) as openers.
3. **`Complete List of 5-Letter Words Ending With R`** (~120w intro + grid) — **grouped by the 4th (penultimate) letter** → clusters `…ER …OR …AR …UR …IR …YR` (densest first; `…ER` dominates). Common-first, inline definition popovers, past-answer dot. The penultimate grouping is the navigation no competitor has — and here it cleanly separates the giant `-ER` group from the smaller `-OR`/`-AR` families.
4. **`R-Ending Words That Have Been Wordle Answers`** (~120w) — live, dated list from `answeredWordsEndingWith("R")` ({ANSWERED} words: LATER, MAKER, CIGAR, SOBER, WISER…). Frame as lower-probability today (NYT rarely repeats). Note LATER appears both as a top opener and a past answer — fine, an opener that already solved a puzzle just won't be today's answer.
5. **`How to Solve Wordle When the Word Ends in R`** (~320w, 3 paragraphs + bar chart) — strategy paragraphs + **"Most common 4th letters before R"** horizontal bars (from `stats.topPenultimateLetters`: E 141, O 34, A 20, U 9…). Key angles:
   - **Assume -ER first.** With ~two-thirds of common R-enders ending in `-ER`, your real job is the 3rd letter: MAKER vs MOVER vs MISER, RIVER vs RIDER vs RULER. Lock that and the word usually falls.
   - **Then the -OR and -AR families.** Agent/quality nouns end in `-OR` (ACTOR, HONOR, MAJOR, MOTOR, RAZOR, VAPOR); many adjectives end in `-AR` (SOLAR, LUNAR, POLAR, SUGAR, RADAR). The rarer `-UR` (FEMUR, INCUR, OCCUR) and `-IR` (CHAIR, CHOIR, STAIR, THEIR) round it out.
   - **Watch repeated letters:** ERROR, OTTER, UDDER, UPPER, UTTER and INNER double a letter — easy to overlook once an R is locked at the end.
6. **`5-Letter Words Ending in R by Starting Letter`** (~100w + grid) — mirror of prior spokes' cross-section. For top start letters, show common `X _ _ _ R` words (S→SOBER/SUPER/SOLAR, C→CATER/CIDER/COVER, M→MAKER/MINOR/MOTOR). Drives internal links to `starting-with-*`.
7. **`Frequently Asked Questions`** (7 Q, see §3) — FAQPage schema.
8. **`Related Wordle Tools & Lists`** + **author bio** (reuse `RELATED` + Editorial Team block).

---

## 3. FAQ (FAQPage schema) — copy directions

Placeholders `{N}/{COMMON}/{ANSWERED}` auto-fill at render.

1. **How many 5-letter words end in R?** → "There are {N} five-letter words ending in R in the Wordle dictionary; {COMMON} are common answer-pool words…"
2. **What is the best Wordle word ending in R?** → LATER rationale; anagram of ALERT/ALTER, tests five of the most frequent letters. CATER and SOLAR are close behind.
3. **Which 5-letter words ending in R have been Wordle answers?** → "{ANSWERED} have already been solutions, including MAKER, CIGAR, SOBER and WISER…" + link to `/wordle-answers`. Frame as lower-probability today.
4. **What 5-letter words end in -ER, -OR or -AR?** → name the families and note `-ER` is by far the largest (MAKER, RIVER, OTHER; ACTOR, HONOR, MOTOR; SOLAR, LUNAR, SUGAR) — captures the `_ _ _ X R` long-tail in one answer.
5. **Are 5-letter words ending in R good Wordle starters?** → yes, genuinely — the `-ER` family pairs R with E and top consonants, and LATER/CATER are anagrams of the best openers. Just avoid repeated-letter R-enders and test fresh letters on guess two.
6. **What are 5-letter words ending in R with lots of vowels?** → ABHOR, EAGER, EATER, OUTER, MAYOR, MINOR and AUGUR each carry two or more vowels while ending in R — useful for mapping the vowel skeleton.
7. **Where can I get today's Wordle hint?** → link `/wordle-hint-today`.

GEO note: every answer is a self-contained 30–80w Q→A block; at least 3 carry a specific number.

---

## 4. Schema JSON-LD (reuse existing helpers — no new helpers)

- `breadcrumbSchema([Home, 5 Letter Words, Ending With R])`
- `faqPageSchema(faq)` — from §3
- `itemListSchema("Best 5-letter Wordle words ending in R", openers[].word)`

Identical to prior spokes.

---

## 5. Internal links (anchor → target → location)

| Anchor | Target | Section |
|---|---|---|
| "5-Letter Words Hub" | `/5-letter-words` | breadcrumb + related |
| "ending-with hub" | `/5-letter-words/ending-with` | breadcrumb |
| "5 letter words starting with S/C/M…" | `/5-letter-words/starting-with-*` | §6 by-starting-letter grid |
| "5 letter words ending in E / T / Y" | `/5-letter-words/ending-with-e`, `-t`, `-y` | §2 / related (sibling spokes) |
| "Wordle Solver" | `/wordle-solver` | related |
| "best opening words" | `/best-wordle-starting-words` | §2 openers intro |
| "today's Wordle hint" | `/wordle-hint-today` | hero CTA + FAQ7 |
| "past Wordle answers" | `/wordle-answers` | §4 |

---

## 6. Hub registration (no new hub — already live)

`/5-letter-words/ending-with` already exists with `LIVE_ENDING = ["E", "T", "Y"]`. This spoke only needs:

- Add `"R"` to `LIVE_ENDING`.
- Add `"r"` to `wordListEndingLetters` in `lib/sitemap.ts`.

No hub markup or new hub component work.

---

## 7. GEO signals checklist

- [x] ≥3 stats with attribution (counts from our own data layer)
- [x] "What is X" quotable block in first 200 words (auto stat sentence + -ER dominance fact)
- [x] FAQ in direct Q→A form
- [x] Author bio with credentials (Editorial Team block, links to /about)
- [x] FAQPage + ItemList + Breadcrumb schema
- [x] Visible last-updated date
- [x] SSR/static (content in view-source ✓)

---

## 8. Engineering delta (for build phase — NOT yet written)

The ending-with machinery already exists. This spoke is **content + 2 registrations + 1 wrapper**, no new components or lib functions.

**Reuse unchanged:** `EndingListPage.tsx`, all helpers in `lib/word-bank.ts`, `Tile/WordGrid (highlightLast)/SectionHeading/StatCard/JsonLd`, `constructMetadata`, the shared `solve-strategy-board-end.svg`.

**New content** `data/word-bank/ending-with-r.ts` — exports `content: LetterContent` (letter "R", path, lastUpdated, topOpener "LATER", heroSubhead, introExtra, openersIntro, openers[6], strategyParagraphs[3 — incl. -ER-first insight], faq[7]). Model on `ending-with-t.ts`.

**New route** `app/[locale]/5-letter-words/ending-with-r/page.tsx` — 3-line wrapper, copy `ending-with-t` and swap import + metadata.

**Registrations:**
- `app/[locale]/5-letter-words/ending-with/page.tsx` → `LIVE_ENDING` add `"R"`.
- `lib/sitemap.ts` → `wordListEndingLetters` add `"r"`.

**Definitions:** 10 of 212 common R-enders lack definitions (AIDER, CORER, FEWER, FILER, GAZER, PARER, PLIER, SOWER, THEIR, WOOER). Page handles null gloss gracefully. THEIR and FEWER are the notable ones — run `scripts/backfill-word-defs.mjs` in a networked env (dictionaryapi.dev is blocked in the local sandbox).

**Build verification:** `pnpm build`, confirm `/5-letter-words/ending-with-r` renders with correct {N}/{COMMON}/{ANSWERED}, the penultimate groups (ER dominant), and the hub R cell now links. Then `git pull --rebase origin main` before commit/push.
