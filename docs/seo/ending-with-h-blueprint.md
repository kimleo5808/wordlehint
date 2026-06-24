# Blueprint — `/5-letter-words/ending-with-h`

> Backlinko (2026) + GEO methodology applied to wordlehint.info's proven word-bank template.
> Status: **plan only — no code written yet.** Companion: `ending-with-h-ui-spec.md`.
> Precedent: `ending-with-e/-t/-y/-r/-a/-n/-d` spokes.

---

## 0. Strategy snapshot

| | |
|---|---|
| **Primary keyword** | `5 letter words ending in h` |
| **Search intent** | Wordle player has locked a green **H in position 5** and needs candidate words (transactional/utility), plus Scrabble/WWF spillover. |
| **Secondary keywords** | `5 letter words that end in h`, `5 letter words ending with h`, `wordle words ending in h`, `5 letter words ending in h for wordle`, `5 letter words ____h` |
| **Variant** | Authority word-list page (~1500–1700 words, 8 sections). |
| **Why we can win** | Same split as prior spokes (only tryhardguides on the Wordle angle; the rest are bare lists). H has the **highest common-word ratio yet** (139 of 428 ≈ 32%) and an unusually tidy structure: ~90% of common H-enders sit in just three digraph families — `-CH`, `-TH`, `-SH`. That makes the "know the family, then the 3rd letter" strategy uniquely powerful, and no competitor frames it. |

### Real data (from `data/word-bank/5.json` + `data/wordle-daily.json`, 2026-06-24)

| Metric | Value |
|---|---|
| Valid 5-letter words ending in H | **428** |
| Common (answer-pool) words | **139** |
| Words that have been NYT Wordle answers | **16** |
| Top penultimate (4th) letters among **common** words | **C 58 · T 36 · S 27 · G 9 · P 7 · R 1 · A 1** |
| Answered H-words (lower probability today) | BATCH, CONCH, COUCH, DOUGH, LATCH, LEACH, LOATH, MOOCH, MORPH, MOUTH, MYRRH, NOTCH, OOMPH, TEETH, WEIGH, WIDTH |

> All numbers auto-fill at render (`{N}/{COMMON}/{ANSWERED}`). Do **not** hard-code them.
>
> **Defining fact:** H endings are dominated by three digraphs — `-CH` (58), `-TH` (36) and `-SH` (27) account for ~90% of common H-enders, with small `-GH` (9) and `-PH` (7) tails. Once H is locked, the word is almost certainly `_ _ _ C H`, `_ _ _ T H` or `_ _ _ S H`.

### Competitor gap table (research phase, H-specific search)

| Competitor | Words | Definitions | Past-answer layer | Penultimate nav | Best openers | Honest strategy | Prose |
|---|---|---|---|---|---|---|---|
| tryhardguides (H) | full | ✗ | ✗ | ✗ | ✗ | weak | ~200 |
| word.tips / wordhippo / bestwordlist | full | def links | ✗ | ✗ | ✗ | ✗ (Scrabble pts) | thin |
| merriam-webster / dictionary.com / wordfinder | full | ✓ links | ✗ | ✗ | ✗ | ✗ | ~0 |
| **WordleHint (us)** | **full + common-first** | **✓ inline popover** | **✓ live, dated** | **✓ by 4th letter** | **✓ EARTH etc.** | **✓ CH/TH/SH digraph map** | **~1650** |

**Our edge in one line:** the only "5 letter words ending in H" page that is complete, defined, Wordle-answer-aware, navigable by the 4th letter, and built around the three digraph families that cover almost every H-ending answer.

---

## 1. Above-the-fold

- **Meta title (≤60):** `5 Letter Words Ending in H — Wordle List & Hints` (48)
- **Meta description:** auto-built in wrapper → `All {total} five-letter words ending in H, sorted for Wordle. Common answers first, definitions, past answers flagged, and the best H-ending openers like EARTH. Updated daily.`
- **H1:** `5 Letter Words Ending With H`
- **Hero subhead:** "A complete, Wordle-ready list of five-letter words that end in H — common answer-pool words first, with the strongest H-ending openers and past Wordle answers flagged."
- **Hero tile cue:** 5 tiles `_ _ _ _ H` with the **last** tile green (`highlightLast`).
- **Stat cards (3, auto-filled):**
  1. `{total}` words ending in H (428)
  2. `{common}` common answer words (139)
  3. `{topOpener}` top-rated H-ending opener → **EARTH**
- **Last updated:** visible chip.
- **Jump links:** Best openers · Full list · Past answers · Strategy · By 4th letter · FAQ

---

## 2. Section structure (H2 tree + word budget)

Reuses the 8-section rhythm. Total prose target **~1,650 words**.

1. **Intro** (~150w) — auto stat sentence: "There are **{N}** five-letter words ending in H; **{COMMON}** are common answer-pool words. The strongest H-ending Wordle opener is **EARTH**." + `introExtra`: the headline structure — once H is locked, the word is almost certainly `-CH`, `-TH` or `-SH`, so the digraph plus the 3rd letter decide it. EARTH, NORTH and SOUTH pack top letters, but most H-enders are weak openers because the digraph eats the 4th slot. GEO-quotable.
2. **`Best Wordle Opening Words Ending in H`** (~240w + table) — Table cols: Word · Letters tested · Why it works. Mark **EARTH** as `best`.
   - **EARTH** `E·A·R·T·H` — tests four of the most frequent letters in the game (E, A, R, T) plus H, with no repeats; a genuinely strong opener that happens to end in H. *(best)*
   - **NORTH** `N·O·R·T·H` — five distinct letters bringing N and the vowel O around R, T, H.
   - **SOUTH** `S·O·U·T·H` — brings S and the vowels O and U; good for probing U early.
   - **TEACH** `T·E·A·C·H` — tests the useful C with T, E, A — a strong `-CH` opener.
   - **CLOTH** `C·L·O·T·H` — covers C, L and the vowel O with T, H — broad early coverage.
   - **BRUSH** `B·R·U·S·H` — tests B, R, U and S; a `-SH` option that probes U.
   - ⚠️ **honesty:** EARTH/NORTH/SOUTH are real openers, but most H-enders are weak first words — the `-CH`/`-SH` digraph fixes two of the last letters and limits vowel coverage. Be clear that H endings are better to *know* than to *guess*.
3. **`Complete List of 5-Letter Words Ending With H`** (~120w intro + grid) — **grouped by the 4th (penultimate) letter** → clusters `…CH …TH …SH …GH …PH …` (densest first). Common-first, inline definition popovers, past-answer dot.
4. **`H-Ending Words That Have Been Wordle Answers`** (~120w) — live, dated list from `answeredWordsEndingWith("H")` ({ANSWERED} words: BATCH, MOUTH, DOUGH, NOTCH, WEIGH…). Frame as lower-probability today.
5. **`How to Solve Wordle When the Word Ends in H`** (~300w, 3 paragraphs + bar chart) — strategy + **"Most common 4th letters before H"** bars (C 58, T 36, S 27, G 9, P 7…). Angles:
   - **It's almost always CH, TH or SH.** Once H is locked, decide which digraph fits, then solve the 3rd letter — that single choice eliminates most of the list.
   - **Sub-split the -CH family.** `-TCH` (BATCH, CATCH, PITCH, WITCH), `-NCH` (BENCH, BUNCH, LUNCH, PUNCH) and the vowel-`-ACH`/`-OACH`/`-EACH` words (BEACH, COACH, REACH) behave differently — knowing the cluster narrows fast.
   - **Mind the silent -GH and rare -PH.** DOUGH, ROUGH, TOUGH, LAUGH and WEIGH hide a silent G; GRAPH, GLYPH and NYMPH are the small `-PH` set worth remembering.
6. **`5-Letter Words Ending in H by Starting Letter`** (~100w + grid) — mirror cross-section. For top start letters, show common `X _ _ _ H` words (B→BEACH/BENCH/BRUSH, C→CATCH/COACH/CLOTH, T→TEACH/TOOTH/TRUTH). Drives links to `starting-with-*`.
7. **`Frequently Asked Questions`** (7 Q, see §3) — FAQPage schema.
8. **`Related Wordle Tools & Lists`** + **author bio**.

---

## 3. FAQ (FAQPage schema) — copy directions

Placeholders `{N}/{COMMON}/{ANSWERED}` auto-fill.

1. **How many 5-letter words end in H?** → "There are {N} five-letter words ending in H in the Wordle dictionary; {COMMON} are common answer-pool words — a high share, because the -CH/-TH/-SH families are large."
2. **What is the best Wordle word ending in H?** → EARTH rationale (E, A, R, T plus H). NORTH and SOUTH are close behind; note most H-enders make weaker openers.
3. **Which 5-letter words ending in H have been Wordle answers?** → "{ANSWERED} have already been solutions, including MOUTH, DOUGH, NOTCH and WEIGH…" + link to `/wordle-answers`.
4. **What 5-letter words end in -CH, -TH or -SH?** → name the families (BEACH, CATCH; EARTH, TRUTH; BRUSH, FRESH) — captures the `_ _ _ X H` long-tail in one answer.
5. **Are 5-letter words ending in H good Wordle starters?** → EARTH, NORTH and SOUTH are, but most are not — the digraph fixes the last two letters and limits coverage, so H endings are better to know than to open with.
6. **What are 5-letter words ending in H with lots of vowels?** → AWASH, BEACH, COACH, ROACH, YOUTH and SOUTH each carry two vowels while ending in H.
7. **Where can I get today's Wordle hint?** → link `/wordle-hint-today`.

GEO note: every answer is a self-contained 30–80w Q→A block; at least 3 carry a specific number.

---

## 4. Schema JSON-LD (reuse existing helpers — no new helpers)

- `breadcrumbSchema([Home, 5 Letter Words, Ending With H])`
- `faqPageSchema(faq)`
- `itemListSchema("Best 5-letter Wordle words ending in H", openers[].word)`

Identical to prior spokes.

---

## 5. Internal links (anchor → target → location)

| Anchor | Target | Section |
|---|---|---|
| "5-Letter Words Hub" | `/5-letter-words` | breadcrumb + related |
| "ending-with hub" | `/5-letter-words/ending-with` | breadcrumb |
| "5 letter words starting with B/C/T…" | `/5-letter-words/starting-with-*` | §6 grid |
| "5 letter words ending in E / T / Y / R / A / N / D" | sibling `ending-with-*` | §2 / related |
| "Wordle Solver" | `/wordle-solver` | related |
| "best opening words" | `/best-wordle-starting-words` | §2 openers intro |
| "today's Wordle hint" | `/wordle-hint-today` | hero CTA + FAQ7 |
| "past Wordle answers" | `/wordle-answers` | §4 |

---

## 6. Hub registration (no new hub — already live)

`/5-letter-words/ending-with` has `LIVE_ENDING = ["E", "T", "Y", "R", "A", "N", "D"]`. This spoke needs:

- Add `"H"` to `LIVE_ENDING`.
- Add `"h"` to `wordListEndingLetters` in `lib/sitemap.ts`.

---

## 7. GEO signals checklist

- [x] ≥3 stats with attribution
- [x] "What is X" quotable block in first 200 words (CH/TH/SH digraph fact)
- [x] FAQ in direct Q→A form
- [x] Author bio with credentials
- [x] FAQPage + ItemList + Breadcrumb schema
- [x] Visible last-updated date
- [x] SSR/static

---

## 8. Engineering delta (for build phase — NOT yet written)

Same as prior spokes: **content + 2 registrations + 1 wrapper**, no new components/lib/SVG.

**New content** `data/word-bank/ending-with-h.ts` — `content: LetterContent` (letter "H", topOpener "EARTH", heroSubhead, introExtra, openersIntro, openers[6], strategyParagraphs[3 — incl. CH/TH/SH digraph + silent-GH], faq[7]). Model on `ending-with-n.ts`.

**New route** `app/[locale]/5-letter-words/ending-with-h/page.tsx` — 3-line wrapper.

**Registrations:** `LIVE_ENDING` add `"H"`; `wordListEndingLetters` add `"h"`.

**Definitions:** 1 of 139 common H-enders lacks a definition (TOUCH). Page handles null gracefully; optional single backfill in a networked env.

**Build verification:** `pnpm build`, confirm correct {N}/{COMMON}/{ANSWERED}, penultimate groups (CH dominant), hub H cell links. Then `git pull --rebase origin main` before commit/push.
