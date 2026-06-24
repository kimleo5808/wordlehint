# Blueprint — `/5-letter-words/ending-with-d`

> Backlinko (2026) + GEO methodology applied to wordlehint.info's proven word-bank template.
> Status: **plan only — no code written yet.** Companion: `ending-with-d-ui-spec.md`.
> Precedent: `ending-with-e/-t/-y/-r/-a/-n` spokes.

---

## 0. Strategy snapshot

| | |
|---|---|
| **Primary keyword** | `5 letter words ending in d` |
| **Search intent** | Wordle player has locked a green **D in position 5** and needs candidate words (transactional/utility), plus Scrabble/WWF spillover. |
| **Secondary keywords** | `5 letter words that end in d`, `5 letter words ending with d`, `wordle words ending in d`, `5 letter words ending in d for wordle`, `5 letter words ____d` |
| **Variant** | Authority word-list page (~1500–1700 words, 8 sections). |
| **Why we can win** | Same split as prior spokes (only tryhardguides + dotesports touch the Wordle angle, both thin; the rest are bare lists). D has six families and an opener-friendly profile (TREAD/STAND/BOARD test top letters), plus a couple of distinctive traps (past-tense `-IED`, the big `-ID` adjective family) that make the strategy section genuinely useful. |

### Real data (from `data/word-bank/5.json` + `data/wordle-daily.json`, 2026-06-24)

| Metric | Value |
|---|---|
| Valid 5-letter words ending in D | **874** |
| Common (answer-pool) words | **118** |
| Words that have been NYT Wordle answers | **15** |
| Top penultimate (4th) letters among **common** words | **I 25 · E 23 · N 22 · R 14 · A 13 · L 11 · O 5 · U 4 · W 1** |
| Answered D-words (lower probability today) | AVOID, BEARD, BROOD, CREED, EMBED, FETID, LURID, PLEAD, RABID, SHRED, SPEED, SQUAD, STAND, WIELD, WOUND |

> All numbers auto-fill at render (`{N}/{COMMON}/{ANSWERED}`). Do **not** hard-code them.
>
> **Defining fact:** D endings split into six families — `-ID` (25), `-ED` (23), `-ND` (22), `-RD` (14), `-AD` (13) and `-LD` (11). The `-ID` adjective family (RABID, VALID, VIVID, RAPID, SOLID…) and the `-IED` past-tense set (CRIED, DRIED, FRIED, TRIED…) are the two traps players miss most.

### Competitor gap table (research phase, D-specific search)

| Competitor | Words | Definitions | Past-answer layer | Penultimate nav | Best openers | Honest strategy | Prose |
|---|---|---|---|---|---|---|---|
| tryhardguides (D) | full | ✗ | ✗ | ✗ | ✗ | weak | ~200 |
| dotesports (D) | partial | ✗ | ✗ | ✗ | ✗ | thin | ~300 |
| word.tips / wordhippo / unscrambled-words | full | def links | ✗ | ✗ | ✗ | ✗ (Scrabble pts) | thin |
| merriam-webster / wordfinder | full | ✓ links | ✗ | ✗ | ✗ | ✗ | ~0 |
| **WordleHint (us)** | **full + common-first** | **✓ inline popover** | **✓ live, dated** | **✓ by 4th letter** | **✓ TREAD etc.** | **✓ -ID / -IED traps** | **~1650** |

**Our edge in one line:** the only "5 letter words ending in D" page that is complete, defined, Wordle-answer-aware, navigable by the 4th letter, and honest about the `-ID` and `-IED` families that decide most D-ending puzzles.

---

## 1. Above-the-fold

- **Meta title (≤60):** `5 Letter Words Ending in D — Wordle List & Hints` (48)
- **Meta description:** auto-built in wrapper → `All {total} five-letter words ending in D, sorted for Wordle. Common answers first, definitions, past answers flagged, and the best D-ending openers like TREAD. Updated daily.`
- **H1:** `5 Letter Words Ending With D`
- **Hero subhead:** "A complete, Wordle-ready list of five-letter words that end in D — common answer-pool words first, with the strongest D-ending openers and past Wordle answers flagged."
- **Hero tile cue:** 5 tiles `_ _ _ _ D` with the **last** tile green (`highlightLast`).
- **Stat cards (3, auto-filled):**
  1. `{total}` words ending in D (874)
  2. `{common}` common answer words (118)
  3. `{topOpener}` top-rated D-ending opener → **TREAD**
- **Last updated:** visible chip.
- **Jump links:** Best openers · Full list · Past answers · Strategy · By 4th letter · FAQ

---

## 2. Section structure (H2 tree + word budget)

Reuses the 8-section rhythm. Total prose target **~1,650 words**.

1. **Intro** (~150w) — auto stat sentence: "There are **{N}** five-letter words ending in D; **{COMMON}** are common answer-pool words. The strongest D-ending Wordle opener is **TREAD**." + `introExtra`: D endings split into six families; the two that trip players up are the big `-ID` adjective group and the `-IED` past-tense set. TREAD, STAND and BOARD test top letters, so a D-ender can open well. GEO-quotable.
2. **`Best Wordle Opening Words Ending in D`** (~250w + table) — Table cols: Word · Letters tested · Why it works. Mark **TREAD** as `best`.
   - **TREAD** `T·R·E·A·D` — tests four of the most frequent letters in the game (T, R, E, A) plus D, with no repeats; the strongest D-ending opener. *(best)*
   - **STAND** `S·T·A·N·D` — five distinct letters bringing the high-value S and N around T, A, D.
   - **BOARD** `B·O·A·R·D` — distinct letters covering the vowels O and A plus B and R.
   - **BREAD** `B·R·E·A·D` — tests the frequent R, E and A with B and D — strong, no repeats.
   - **SOUND** `S·O·U·N·D` — brings S and the vowels O and U; good for probing U early.
   - **BLAND** `B·L·A·N·D` — tests the useful L and N around B, A, D.
   - ⚠️ **honesty:** D-ending openers are solid — TREAD/STAND/BOARD pair D with E, A, R, S, N — but avoid the `-ED` past-tense words (CRIED, AIMED) as openers; they burn a guess on the predictable E-D ending. Say so.
3. **`Complete List of 5-Letter Words Ending With D`** (~120w intro + grid) — **grouped by the 4th (penultimate) letter** → clusters `…ID …ED …ND …RD …AD …LD …` (densest first). Common-first, inline definition popovers, past-answer dot.
4. **`D-Ending Words That Have Been Wordle Answers`** (~120w) — live, dated list from `answeredWordsEndingWith("D")` ({ANSWERED} words: BEARD, AVOID, SQUAD, SPEED, STAND…). Frame as lower-probability today.
5. **`How to Solve Wordle When the Word Ends in D`** (~300w, 3 paragraphs + bar chart) — strategy + **"Most common 4th letters before D"** bars (I 25, E 23, N 22, R 14, A 13, L 11…). Angles:
   - **Check the -IED past tense first.** A surprising share of D-enders are `_ _ I E D` past-tense verbs — CRIED, DRIED, FRIED, PRIED, SPIED, TRIED. If you have an E in slot 4, test this shape early.
   - **Then the -ID adjectives.** The largest family is `-ID`: RABID, RAPID, VALID, VIVID, SOLID, LUCID, TIMID, HUMID, FLUID. Many share the `_ _ I _ D` skeleton, so the 2nd/3rd letters decide it.
   - **Work the -ND, -RD, -AD, -LD shapes.** `-ND` (BLAND, BOUND, GRAND, ROUND, STAND), `-RD` (AWARD, BOARD, GUARD, HEARD, WORLD), `-AD` (AHEAD, BREAD, SALAD, SQUAD), `-LD` (BUILD, CHILD, FIELD, WORLD, YIELD). Mind COULD/WOULD/SHOULD-style modal forms too.
6. **`5-Letter Words Ending in D by Starting Letter`** (~100w + grid) — mirror cross-section. For top start letters, show common `X _ _ _ D` words (B→BOARD/BREAD/BLAND, S→STAND/SOUND/SALAD, C→CHILD/CLOUD/CHORD). Drives links to `starting-with-*`.
7. **`Frequently Asked Questions`** (7 Q, see §3) — FAQPage schema.
8. **`Related Wordle Tools & Lists`** + **author bio**.

---

## 3. FAQ (FAQPage schema) — copy directions

Placeholders `{N}/{COMMON}/{ANSWERED}` auto-fill.

1. **How many 5-letter words end in D?** → "There are {N} five-letter words ending in D in the Wordle dictionary; {COMMON} are common answer-pool words…"
2. **What is the best Wordle word ending in D?** → TREAD rationale (T, R, E, A plus D, no repeats). STAND and BOARD are close behind.
3. **Which 5-letter words ending in D have been Wordle answers?** → "{ANSWERED} have already been solutions, including BEARD, AVOID, SQUAD and SPEED…" + link to `/wordle-answers`.
4. **What 5-letter words end in -ID, -ED or -ND?** → name the families (RABID, VALID; CRIED, SPEED; BOUND, STAND) — captures the `_ _ _ X D` long-tail.
5. **Are 5-letter words ending in D good Wordle starters?** → yes for distinct-letter ones (TREAD, STAND, BOARD), no for `-ED` past-tense words that waste a guess on the predictable ending.
6. **What are 5-letter words ending in D with lots of vowels?** → ALOUD, AVOID, CLOUD, OVOID, AHEAD and TRIAD each carry two or more vowels while ending in D.
7. **Where can I get today's Wordle hint?** → link `/wordle-hint-today`.

GEO note: every answer is a self-contained 30–80w Q→A block; at least 3 carry a specific number.

---

## 4. Schema JSON-LD (reuse existing helpers — no new helpers)

- `breadcrumbSchema([Home, 5 Letter Words, Ending With D])`
- `faqPageSchema(faq)`
- `itemListSchema("Best 5-letter Wordle words ending in D", openers[].word)`

Identical to prior spokes.

---

## 5. Internal links (anchor → target → location)

| Anchor | Target | Section |
|---|---|---|
| "5-Letter Words Hub" | `/5-letter-words` | breadcrumb + related |
| "ending-with hub" | `/5-letter-words/ending-with` | breadcrumb |
| "5 letter words starting with B/S/C…" | `/5-letter-words/starting-with-*` | §6 grid |
| "5 letter words ending in E / T / Y / R / A / N" | sibling `ending-with-*` | §2 / related |
| "Wordle Solver" | `/wordle-solver` | related |
| "best opening words" | `/best-wordle-starting-words` | §2 openers intro |
| "today's Wordle hint" | `/wordle-hint-today` | hero CTA + FAQ7 |
| "past Wordle answers" | `/wordle-answers` | §4 |

---

## 6. Hub registration (no new hub — already live)

`/5-letter-words/ending-with` has `LIVE_ENDING = ["E", "T", "Y", "R", "A", "N"]`. This spoke needs:

- Add `"D"` to `LIVE_ENDING`.
- Add `"d"` to `wordListEndingLetters` in `lib/sitemap.ts`.

---

## 7. GEO signals checklist

- [x] ≥3 stats with attribution
- [x] "What is X" quotable block in first 200 words (six-family + -ID/-IED traps)
- [x] FAQ in direct Q→A form
- [x] Author bio with credentials
- [x] FAQPage + ItemList + Breadcrumb schema
- [x] Visible last-updated date
- [x] SSR/static

---

## 8. Engineering delta (for build phase — NOT yet written)

Same as prior spokes: **content + 2 registrations + 1 wrapper**, no new components/lib/SVG.

**New content** `data/word-bank/ending-with-d.ts` — `content: LetterContent` (letter "D", topOpener "TREAD", heroSubhead, introExtra, openersIntro, openers[6], strategyParagraphs[3 — incl. -IED + -ID families], faq[7]). Model on `ending-with-n.ts`.

**New route** `app/[locale]/5-letter-words/ending-with-d/page.tsx` — 3-line wrapper.

**Registrations:** `LIVE_ENDING` add `"D"`; `wordListEndingLetters` add `"d"`.

**Definitions:** all 118 common D-enders already have definitions (0 missing) — no backfill needed.

**Build verification:** `pnpm build`, confirm correct {N}/{COMMON}/{ANSWERED}, penultimate groups, hub D cell links. Then `git pull --rebase origin main` before commit/push.
