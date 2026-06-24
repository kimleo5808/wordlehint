# Blueprint — `/5-letter-words/ending-with-n`

> Backlinko (2026) + GEO methodology applied to wordlehint.info's proven word-bank template.
> Status: **plan only — no code written yet.** Companion: `ending-with-n-ui-spec.md`.
> Precedent: `ending-with-e/-t/-y/-r/-a` spokes.

---

## 0. Strategy snapshot

| | |
|---|---|
| **Primary keyword** | `5 letter words ending in n` |
| **Search intent** | Wordle player has locked a green **N in position 5** and needs candidate words (transactional/utility), plus Scrabble/WWF spillover. |
| **Secondary keywords** | `5 letter words that end in n`, `5 letter words ending with n`, `wordle words ending in n`, `5 letter words ending in n for wordle`, `5 letter words ____n` |
| **Variant** | Authority word-list page (~1500–1700 words, 8 sections). |
| **Why we can win** | Same split as prior spokes; only tryhardguides ranks on the Wordle angle, the rest are bare lists/solvers. N is a **strong ending for openers** (LEARN/TRAIN/STAIN test the most frequent letters) and has six well-balanced families, so both the opener section and the family navigation are rich and honest. |

### Real data (from `data/word-bank/5.json` + `data/wordle-daily.json`, 2026-06-24)

| Metric | Value |
|---|---|
| Valid 5-letter words ending in N | **618** |
| Common (answer-pool) words | **130** |
| Words that have been NYT Wordle answers | **19** |
| Top penultimate (4th) letters among **common** words | **E 34 · O 26 · I 22 · A 15 · W 14 · R 13 · G 4 · U 2** |
| Answered N-words (lower probability today) | ALIGN, BARON, BEGUN, COVEN, EATEN, ELFIN, HAVEN, LADEN, LIKEN, LINEN, NYLON, PECAN, SATIN, SIREN, SWORN, TOKEN, VEGAN, WAXEN, WOMEN |

> All numbers auto-fill at render (`{N}/{COMMON}/{ANSWERED}`). Do **not** hard-code them.
>
> **Defining fact:** N endings split into **six balanced families** — `-EN` (34), `-ON` (26), `-IN` (22), `-AN` (15), `-WN` (14) and `-RN` (13). No single one dominates, so the 4th letter is the decisive clue.

### Competitor gap table (research phase, N-specific search)

| Competitor | Words | Definitions | Past-answer layer | Penultimate nav | Best openers | Honest strategy | Prose |
|---|---|---|---|---|---|---|---|
| tryhardguides (N) | full | ✗ | ✗ | ✗ | ✗ | weak | ~200 |
| word.tips / fiveletterwords.io | full | ✗ | ✗ | ✗ | ✗ | ✗ | thin |
| wordfinder / merriam-webster | full | ✓ links | ✗ | ✗ | ✗ | ✗ | ~0 |
| scrabblewordfinder / solvers | full/tool | def links | ✗ | ✗ | ✗ | ✗ (Scrabble pts) | thin |
| **WordleHint (us)** | **full + common-first** | **✓ inline popover** | **✓ live, dated** | **✓ by 4th letter** | **✓ LEARN etc.** | **✓ six-family map** | **~1650** |

**Our edge in one line:** the only "5 letter words ending in N" page that is complete, defined, Wordle-answer-aware, navigable by the 4th letter, and built around the six families that actually split the answer set.

---

## 1. Above-the-fold

- **Meta title (≤60):** `5 Letter Words Ending in N — Wordle List & Hints` (48)
- **Meta description:** auto-built in wrapper → `All {total} five-letter words ending in N, sorted for Wordle. Common answers first, definitions, past answers flagged, and the best N-ending openers like LEARN. Updated daily.`
- **H1:** `5 Letter Words Ending With N`
- **Hero subhead:** "A complete, Wordle-ready list of five-letter words that end in N — common answer-pool words first, with the strongest N-ending openers and past Wordle answers flagged."
- **Hero tile cue:** 5 tiles `_ _ _ _ N` with the **last** tile green (`highlightLast`).
- **Stat cards (3, auto-filled):**
  1. `{total}` words ending in N (618)
  2. `{common}` common answer words (130)
  3. `{topOpener}` top-rated N-ending opener → **LEARN**
- **Last updated:** visible chip.
- **Jump links:** Best openers · Full list · Past answers · Strategy · By 4th letter · FAQ

---

## 2. Section structure (H2 tree + word budget)

Reuses the 8-section rhythm. Total prose target **~1,650 words**.

1. **Intro** (~150w) — auto stat sentence: "There are **{N}** five-letter words ending in N; **{COMMON}** are common answer-pool words. The strongest N-ending Wordle opener is **LEARN**." + `introExtra`: N endings divide into six fairly even families (`-EN`, `-ON`, `-IN`, `-AN`, `-WN`, `-RN`), so the 4th letter is the decisive clue once N is locked. N is also opener-friendly — LEARN and TRAIN test five of the most frequent letters. GEO-quotable.
2. **`Best Wordle Opening Words Ending in N`** (~250w + table) — genuinely strong here. Table cols: Word · Letters tested · Why it works. Mark **LEARN** as `best`.
   - **LEARN** `L·E·A·R·N` — tests five of the most frequent letters in the game (L, E, A, R, N) with no repeats; the strongest N-ending opener, on par with the best in the game. *(best)*
   - **TRAIN** `T·R·A·I·N` — five distinct letters including the vowel I; excellent coverage of T, R, A, N.
   - **OCEAN** `O·C·E·A·N` — vowel-rich (O, E, A) plus C and N; great for mapping vowels.
   - **STAIN** `S·T·A·I·N` — brings S and the vowel I together with T, A, N.
   - **CLEAN** `C·L·E·A·N` — tests C and L around E, A, N — strong, no repeats.
   - **BARON** `B·A·R·O·N` — distinct letters covering the vowel O; a change-up when you want O instead of E/I.
   - ⚠️ **honesty:** like R and unlike Y/A, N-ending openers are legitimately strong because the common N-enders pair N with E, A, R, I and other top letters. Say so. Avoid repeated-letter N-enders (QUEEN, GREEN, SHEEN) as openers.
3. **`Complete List of 5-Letter Words Ending With N`** (~120w intro + grid) — **grouped by the 4th (penultimate) letter** → clusters `…EN …ON …IN …AN …WN …RN …` (densest first). Common-first, inline definition popovers, past-answer dot. The penultimate grouping is the navigation no competitor has — and with six balanced families it is the cleanest way to scan.
4. **`N-Ending Words That Have Been Wordle Answers`** (~120w) — live, dated list from `answeredWordsEndingWith("N")` ({ANSWERED} words: TOKEN, BARON, SATIN, VEGAN, NYLON…). Frame as lower-probability today.
5. **`How to Solve Wordle When the Word Ends in N`** (~300w, 3 paragraphs + bar chart) — strategy + **"Most common 4th letters before N"** bars (E 34, O 26, I 22, A 15, W 14, R 13…). Angles:
   - **Identify the family.** `-EN` (EATEN, GIVEN, TAKEN, QUEEN, OFTEN), `-ON` (BACON, BARON, LEMON, NYLON, WAGON), `-IN` (ADMIN, BASIN, CABIN, ROBIN, SATIN), `-AN` (HUMAN, ORGAN, URBAN, VEGAN, WOMAN) — these four cover most common N-enders.
   - **Don't forget -WN and -RN.** Weather/shape words end in `-WN` (BROWN, CROWN, DROWN, FROWN, GROWN, KNOWN), and a tight `-RN` set (ACORN, CHURN, LEARN, SCORN, STERN, THORN) is easy to miss.
   - **Watch silent -GN and doubled vowels.** ALIGN, DEIGN, FEIGN and REIGN hide a silent G before N, and QUEEN, GREEN, PREEN, SHEEN double the E — both easy to overlook.
6. **`5-Letter Words Ending in N by Starting Letter`** (~100w + grid) — mirror cross-section. For top start letters, show common `X _ _ _ N` words (S→SATIN/SCORN/SPAWN, B→BACON/BARON/BRAIN, C→CABIN/CLEAN/CROWN). Drives links to `starting-with-*`.
7. **`Frequently Asked Questions`** (7 Q, see §3) — FAQPage schema.
8. **`Related Wordle Tools & Lists`** + **author bio**.

---

## 3. FAQ (FAQPage schema) — copy directions

Placeholders `{N}/{COMMON}/{ANSWERED}` auto-fill.

1. **How many 5-letter words end in N?** → "There are {N} five-letter words ending in N in the Wordle dictionary; {COMMON} are common answer-pool words…"
2. **What is the best Wordle word ending in N?** → LEARN rationale (five most frequent letters, no repeats). TRAIN and CLEAN are close behind.
3. **Which 5-letter words ending in N have been Wordle answers?** → "{ANSWERED} have already been solutions, including TOKEN, BARON, SATIN and VEGAN…" + link to `/wordle-answers`.
4. **What 5-letter words end in -EN, -ON or -IN?** → name the families (EATEN, GIVEN; BACON, LEMON; ADMIN, ROBIN) — captures the `_ _ _ X N` long-tail in one answer.
5. **Are 5-letter words ending in N good Wordle starters?** → yes — common N-enders pair N with E, A, R and I, so LEARN, TRAIN and CLEAN are strong openers. Avoid repeated-letter ones like QUEEN, and test fresh letters on guess two.
6. **What are 5-letter words ending in N with lots of vowels?** → OCEAN, AVIAN, ONION, UNION, AGAIN, ALIEN and BRAIN each carry two or more vowels while ending in N.
7. **Where can I get today's Wordle hint?** → link `/wordle-hint-today`.

GEO note: every answer is a self-contained 30–80w Q→A block; at least 3 carry a specific number.

---

## 4. Schema JSON-LD (reuse existing helpers — no new helpers)

- `breadcrumbSchema([Home, 5 Letter Words, Ending With N])`
- `faqPageSchema(faq)`
- `itemListSchema("Best 5-letter Wordle words ending in N", openers[].word)`

Identical to prior spokes.

---

## 5. Internal links (anchor → target → location)

| Anchor | Target | Section |
|---|---|---|
| "5-Letter Words Hub" | `/5-letter-words` | breadcrumb + related |
| "ending-with hub" | `/5-letter-words/ending-with` | breadcrumb |
| "5 letter words starting with S/B/C…" | `/5-letter-words/starting-with-*` | §6 grid |
| "5 letter words ending in E / T / Y / R / A" | `/5-letter-words/ending-with-e`, `-t`, `-y`, `-r`, `-a` | §2 / related (sibling spokes) |
| "Wordle Solver" | `/wordle-solver` | related |
| "best opening words" | `/best-wordle-starting-words` | §2 openers intro |
| "today's Wordle hint" | `/wordle-hint-today` | hero CTA + FAQ7 |
| "past Wordle answers" | `/wordle-answers` | §4 |

---

## 6. Hub registration (no new hub — already live)

`/5-letter-words/ending-with` has `LIVE_ENDING = ["E", "T", "Y", "R", "A"]`. This spoke needs:

- Add `"N"` to `LIVE_ENDING`.
- Add `"n"` to `wordListEndingLetters` in `lib/sitemap.ts`.

---

## 7. GEO signals checklist

- [x] ≥3 stats with attribution
- [x] "What is X" quotable block in first 200 words (six-family fact)
- [x] FAQ in direct Q→A form
- [x] Author bio with credentials
- [x] FAQPage + ItemList + Breadcrumb schema
- [x] Visible last-updated date
- [x] SSR/static

---

## 8. Engineering delta (for build phase — NOT yet written)

Same as prior spokes: **content + 2 registrations + 1 wrapper**, no new components/lib/SVG.

**New content** `data/word-bank/ending-with-n.ts` — `content: LetterContent` (letter "N", topOpener "LEARN", heroSubhead, introExtra, openersIntro, openers[6], strategyParagraphs[3 — incl. six-family + silent-GN], faq[7]). Model on `ending-with-r.ts`.

**New route** `app/[locale]/5-letter-words/ending-with-n/page.tsx` — 3-line wrapper.

**Registrations:** `LIVE_ENDING` add `"N"`; `wordListEndingLetters` add `"n"`.

**Definitions:** all 130 common N-enders already have definitions (0 missing) — no backfill needed.

**Build verification:** `pnpm build`, confirm correct {N}/{COMMON}/{ANSWERED}, the penultimate groups, hub N cell links. Then `git pull --rebase origin main` before commit/push.
