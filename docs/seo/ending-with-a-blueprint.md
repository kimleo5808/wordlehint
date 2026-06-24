# Blueprint — `/5-letter-words/ending-with-a`

> Backlinko (2026) + GEO methodology applied to wordlehint.info's proven word-bank template.
> Status: **plan only — no code written yet.** Companion: `ending-with-a-ui-spec.md`.
> Precedent: `ending-with-e/-t/-y/-r` spokes.

---

## 0. Strategy snapshot

| | |
|---|---|
| **Primary keyword** | `5 letter words ending in a` |
| **Search intent** | Wordle player has locked a green **A in position 5** and needs candidate words (transactional/utility), plus Scrabble/WWF spillover. |
| **Secondary keywords** | `5 letter words that end in a`, `5 letter words ending with a`, `wordle words ending in a`, `5 letter words ending in a for wordle`, `5 letter words ____a` |
| **Variant** | Authority word-list page; **shorter list than prior spokes** — the prose and honest-framing carry the weight (model on how `starting-with-*` handles the thin letters). |
| **Why we can win** | This is the **first "weak ending" page**, and that is the opportunity. A is rare as a final letter in the answer pool, so the value is a *small, curated, honest* page: it tells the player the good news (the candidate set is tiny and recognisable), groups the loanword families, and is honest that A-enders make poor openers. Competitors (only tryhardguides ranks on the Wordle angle; the rest are bare lists/solvers) dump 885 obscure words with no signal. |

### Real data (from `data/word-bank/5.json` + `data/wordle-daily.json`, 2026-06-24)

| Metric | Value |
|---|---|
| Valid 5-letter words ending in A | **885** |
| Common (answer-pool) words | **64** (low — A is uncommon in answers) |
| Words that have been NYT Wordle answers | **7** |
| Top penultimate (4th) letters among **common** words | **M 11 · R 10 · T 7 · N 5 · L 5 · I 5 · G 3 · K 3** |
| Answered A-words | DRAMA, GUAVA, HYDRA, MAFIA, PARKA, SEPIA, UMBRA |

> All numbers auto-fill at render (`{N}/{COMMON}/{ANSWERED}`). Do **not** hard-code them.
>
> **Defining fact:** only **64** of 885 valid A-enders are common answer-pool words, and most are loanwords/nouns (DRAMA, PIZZA, OPERA, ARENA, ZEBRA, KOALA, PASTA, SAUNA). A is one of the **rarest final letters** in the answer pool. Honest implication: knowing the word ends in A is *great* news (small recognisable set), but A-enders are *weak openers*.

### Competitor gap table (research phase, A-specific search)

| Competitor | Words | Definitions | Past-answer layer | Penultimate nav | Honest "weak/rare" framing | Prose |
|---|---|---|---|---|---|---|
| tryhardguides (A) | full | ✗ | ✗ | ✗ | ✗ | ~200 |
| word.tips / wordhippo | full | def links | ✗ | ✗ | ✗ | ~0 |
| merriam-webster / wordfinder | full | ✓ links | ✗ | ✗ | ✗ | ~0 |
| various Wordle solvers | tool only | ✗ | ✗ | ✗ | ✗ | ~0 |
| **WordleHint (us)** | **full + common-first (64)** | **✓ inline popover** | **✓ live, dated** | **✓ by 4th letter** | **✓ rare-letter, weak-opener honesty** | **~1400** |

**Our edge in one line:** the only "5 letter words ending in A" page that tells the truth — A is rare in answers, the real candidate set is tiny and loanword-heavy, and A-enders are poor openers — instead of burying the player in 885 obscure words.

---

## 1. Above-the-fold

- **Meta title (≤60):** `5 Letter Words Ending in A — Wordle List & Hints` (48)
- **Meta description:** auto-built in wrapper → `All {total} five-letter words ending in A, sorted for Wordle. The {common} common answer words first, definitions, past answers flagged, and honest opener advice. Updated daily.` (note: lead with the *small common count* as the hook)
- **H1:** `5 Letter Words Ending With A`
- **Hero subhead:** "A complete, Wordle-ready list of five-letter words that end in A — the common answer-pool words first, with past Wordle answers flagged and honest advice on the (few) A-enders worth playing."
- **Hero tile cue:** 5 tiles `_ _ _ _ A` with the **last** tile green (`highlightLast`).
- **Stat cards (3, auto-filled):**
  1. `{total}` words ending in A (885)
  2. `{common}` common answer words (**64** — the headline; the small number is the story)
  3. `{topOpener}` best A-ending opener → **DELTA**
- **Last updated:** visible chip.
- **Jump links:** Best openers · Full list · Past answers · Strategy · By 4th letter · FAQ

---

## 2. Section structure (H2 tree + word budget)

Reuses the 8-section rhythm. Total prose target **~1,400 words** (shorter list → lean more on framing/strategy prose).

1. **Intro** (~160w) — auto stat sentence: "There are **{N}** five-letter words ending in A, but only **{COMMON}** are common answer-pool words — A is one of the rarest final letters in Wordle answers." + `introExtra`: the good news / bad news. Good: a green A in the last slot narrows the field to a tiny, recognisable set of mostly loanwords (DRAMA, PIZZA, OPERA, ARENA). Bad: A-enders are weak openers — putting the most common vowel in a fixed slot wastes it. GEO-quotable headline fact (the 64-of-885 rarity).
2. **`Best Wordle Opening Words Ending in A`** (~230w + table) — **honest framing up front.** Lead sentence: most A-enders are poor openers; these are the few distinct-letter exceptions, and you should generally only play them once the final A is already green. Table cols: Word · Letters tested · Why it works. Mark **DELTA** as `best`.
   - **DELTA** `D·E·L·T·A` — five distinct letters including the frequent E, L, T and A; the strongest A-ending opener, on par with mid-tier openers. *(best)*
   - **OPERA** `O·P·E·R·A` — vowel-rich (O, E, A) plus P and R; good for mapping vowels.
   - **EXTRA** `E·X·T·R·A` — tests E, T, R and A; the X is low-value but the rest is strong.
   - **ULTRA** `U·L·T·R·A` — brings the vowel U together with L, T, R.
   - **COBRA** `C·O·B·R·A` — distinct letters covering O and A plus C, B, R.
   - **ZEBRA** `Z·E·B·R·A` — distinct; tests E and A, though Z is rare.
   - ⚠️ **honesty (most important on this page):** do NOT oversell. State plainly that A-ending words are generally weaker openers than SLATE-class words, and that DELTA/OPERA are useful mainly as second guesses once A is locked. This honesty is the page's differentiator.
3. **`Complete List of 5-Letter Words Ending With A`** (~140w intro + grid) — **grouped by the 4th (penultimate) letter** → clusters `…MA …RA …TA …NA …LA …IA …` (densest first). With only 64 common words, the common-first grid is short and scannable — present it as a feature ("the whole realistic candidate set on one screen"). Inline definition popovers (esp. useful for loanwords like JUNTA, KAPPA, TERRA), past-answer dot.
4. **`A-Ending Words That Have Been Wordle Answers`** (~110w) — live, dated list from `answeredWordsEndingWith("A")` ({ANSWERED} words: DRAMA, GUAVA, HYDRA, MAFIA, PARKA, SEPIA, UMBRA). Note how few there are — reinforces the rarity. Frame as lower-probability today.
5. **`How to Solve Wordle When the Word Ends in A`** (~320w, 3 paragraphs + bar chart) — strategy + **"Most common 4th letters before A"** bars (M 11, R 10, T 7, N 5, L 5, I 5…). Angles:
   - **It's a short hunt.** A green A at the end leaves ~64 realistic words — scan the loanword families rather than brute-forcing letters.
   - **Work the -MA / -RA / -TA families.** `-MA` (AROMA, DRAMA, KARMA, MAGMA, SIGMA, COMMA), `-RA` (COBRA, EXTRA, OPERA, ULTRA, ZEBRA, TIARA), `-TA` (DELTA, PASTA, QUOTA, VISTA, JUNTA), then `-NA` (ARENA, CHINA, FAUNA, HYENA), `-LA` (KOALA, VILLA, VIOLA), `-IA` (MAFIA, MEDIA, SEPIA, TIBIA).
   - **Mind doubled letters and loanwords.** COMMA, MAMMA, GAMMA, KAPPA, PIZZA, MECCA double a letter; many A-enders are borrowed words you might not expect (JUNTA, RUMBA, VODKA, POLKA, NINJA).
6. **`5-Letter Words Ending in A by Starting Letter`** (~90w + grid) — mirror cross-section. For top start letters, show common `X _ _ _ A` words (C→CHINA/COBRA/COCOA, P→PASTA/PIZZA/PLAZA, V→VILLA/VISTA/VODKA). Drives links to `starting-with-*`.
7. **`Frequently Asked Questions`** (7 Q, see §3) — FAQPage schema.
8. **`Related Wordle Tools & Lists`** + **author bio**.

---

## 3. FAQ (FAQPage schema) — copy directions

Placeholders `{N}/{COMMON}/{ANSWERED}` auto-fill.

1. **How many 5-letter words end in A?** → "There are {N} valid five-letter words ending in A, but only {COMMON} are common answer-pool words — A is one of the rarest final letters in Wordle answers."
2. **What is the best Wordle word ending in A?** → DELTA rationale (five distinct frequent letters), with the honest caveat that A-enders are generally weak openers and best played once A is locked.
3. **Which 5-letter words ending in A have been Wordle answers?** → "Only {ANSWERED} so far, including DRAMA, GUAVA, PARKA and UMBRA…" + link to `/wordle-answers`. The small number reinforces rarity.
4. **What 5-letter words end in -MA, -RA or -TA?** → name the loanword families (AROMA, DRAMA; COBRA, EXTRA; DELTA, PASTA).
5. **Are 5-letter words ending in A good Wordle starters?** → honest no, mostly — A in a fixed final slot wastes the most common vowel, and few A-enders use frequent letters. DELTA and OPERA are the usable exceptions.
6. **What are 5-letter words ending in A with lots of vowels?** → APNEA, AORTA, COCOA, GUAVA, MEDIA, OPERA, VIOLA, AROMA each carry multiple vowels while ending in A.
7. **Where can I get today's Wordle hint?** → link `/wordle-hint-today`.

GEO note: every answer is a self-contained 30–80w Q→A block; at least 3 carry a specific number; the rarity stat is the standout quotable.

---

## 4. Schema JSON-LD (reuse existing helpers — no new helpers)

- `breadcrumbSchema([Home, 5 Letter Words, Ending With A])`
- `faqPageSchema(faq)`
- `itemListSchema("Best 5-letter Wordle words ending in A", openers[].word)`

Identical to prior spokes.

---

## 5. Internal links (anchor → target → location)

| Anchor | Target | Section |
|---|---|---|
| "5-Letter Words Hub" | `/5-letter-words` | breadcrumb + related |
| "ending-with hub" | `/5-letter-words/ending-with` | breadcrumb |
| "5 letter words starting with C/P/V…" | `/5-letter-words/starting-with-*` | §6 grid |
| "5 letter words ending in E / T / Y / R" | `/5-letter-words/ending-with-e`, `-t`, `-y`, `-r` | §2 / related (sibling spokes) |
| "Wordle Solver" | `/wordle-solver` | related |
| "best opening words" | `/best-wordle-starting-words` | §2 openers intro |
| "today's Wordle hint" | `/wordle-hint-today` | hero CTA + FAQ7 |
| "past Wordle answers" | `/wordle-answers` | §4 |

---

## 6. Hub registration (no new hub — already live)

`/5-letter-words/ending-with` has `LIVE_ENDING = ["E", "T", "Y", "R"]`. This spoke needs:

- Add `"A"` to `LIVE_ENDING`.
- Add `"a"` to `wordListEndingLetters` in `lib/sitemap.ts`.

---

## 7. GEO signals checklist

- [x] ≥3 stats with attribution (the 64-of-885 rarity is the standout)
- [x] "What is X" quotable block in first 200 words
- [x] FAQ in direct Q→A form
- [x] Author bio with credentials
- [x] FAQPage + ItemList + Breadcrumb schema
- [x] Visible last-updated date
- [x] SSR/static

---

## 8. Engineering delta (for build phase — NOT yet written)

Same as prior spokes: **content + 2 registrations + 1 wrapper**, no new components/lib/SVG.

**New content** `data/word-bank/ending-with-a.ts` — `content: LetterContent` (letter "A", topOpener "DELTA", heroSubhead, introExtra, openersIntro, openers[6], strategyParagraphs[3 — incl. rarity + loanword + honest-opener], faq[7]). Model on `ending-with-r.ts`. **Tone note:** this is the honesty page — the opener intro and FAQ5 must clearly say A-enders are weak openers.

**New route** `app/[locale]/5-letter-words/ending-with-a/page.tsx` — 3-line wrapper.

**Registrations:** `LIVE_ENDING` add `"A"`; `wordListEndingLetters` add `"a"`.

**Definitions:** only 1 of 64 common A-enders lacks a definition (MECCA). Page handles null gracefully. Optional single backfill in a networked env.

**Build verification:** `pnpm build`, confirm correct {N}/{COMMON}/{ANSWERED} (esp. the low 64), penultimate groups, hub A cell links. Then `git pull --rebase origin main` before commit/push.
