# Content Blueprint — `5 Letter Words Starting With S`

> Backlinko-style, **Wordle-first** authority landing page for wordlehint.info
> Target prose: **1,600–1,800 words** (excludes the word list itself)
> Last-updated date must be visible near top (freshness signal)

---

## Target & Intent

- **Primary keyword:** `5 letter words starting with S`
- **Secondary:** `5 letter words that start with S`, `5 letter words beginning with S`, `Wordle words starting with S`, `5 letter S words`
- **Search intent:** Mid-puzzle Wordle player who knows the first letter is **S** and needs (a) a scannable word list and (b) which ones are smart guesses. Mixed informational + tool intent.
- **URL:** `/5-letter-words/starting-with-s` (spoke under future `/5-letter-words` hub)

---

## Competitor Gap (from 10-site SERP analysis)

| Competitor | Prose | Organization | FAQ | Inline defs | Wordle-first | Schema |
|---|---|---|---|---|---|---|
| QuillBot | ~2,300 | by 2nd letter | ✅ 3Q | partial | ❌ Scrabble/teacher | ❌ |
| tryhardguides | ~800 | alpha | ❌ | ❌ | ⚠️ "Clue" only | ❌ |
| YourDictionary | ~270 | paginated | ❌ | ❌ (external) | ❌ | ❌ |
| word.tips | ~230 | by points | ❌ | 1 | ❌ Scrabble | ❌ |
| Mental Floss | ~200 | used vs unused | ❌ | ❌ | ✅ | ❌ |
| Dictionary.com | ~80 | alpha | ❌ | link-out | ❌ | ❌ |
| Merriam-Webster / WordHippo / Xfire / wordunscrambler | <200 | varies | ❌ | ❌ | ⚠️ | ❌ |
| **Our edge** | **1,600+** | **by 2nd letter + Wordle sets** | **✅ 7Q + schema** | **✅ inline** | **✅ pure** | **✅ FAQ+ItemList+Breadcrumb** |

**Unique assets only we have:**
1. **Answer-history data** (`wordle-daily.json`) → "S words that have *already been* Wordle answers" + count. No competitor with a real answer DB does this with inline defs.
2. **Curated best-opener logic** tied to our existing `/best-wordle-starting-words` page.
3. **Inline definitions** from `wordle-definitions.json` (2,769 entries) — no dead-end external links.

---

## Above-the-fold

- **Meta title (≤60):** `5 Letter Words Starting With S — Wordle Word List & Hints`  (57)
- **Meta description (≤155):** `Every 5-letter word starting with S, organized for Wordle. See the best S opening words, which S words were past answers, and definitions. Updated daily.`  (152)
- **H1:** `5 Letter Words Starting With S`
- **Subhead (value prop):** "A complete, Wordle-ready list of five-letter words that start with S — sorted for fast scanning, with the strongest opening guesses and past Wordle answers flagged."
- **Last updated:** `Last updated: {date}` chip
- **Quick-stat strip (3 quotable facts):** total S words count · how many have been Wordle answers · top-rated S opener
- **Jump-link nav:** Best openers · Full list · Past answers · By ending letter · FAQ
- **Inline CTA:** small card → `/wordle-hint-today` ("Stuck on today's puzzle? Get today's hint")

---

## Section outline (H2/H3 + word budgets + GEO directions)

### 1. (Intro / definitional block) — ~120 words
- First 200 words must contain a self-contained "What is X" answer, ≤50 words, LLM-quotable:
  > "There are **{N} five-letter words starting with S** in the Wordle dictionary. For Wordle, the strongest is **SLATE**, which tests five of the most common English letters. S is the single most frequent opening letter among past Wordle answers."
- One idea per paragraph, bold the key numbers.

### 2. Best 5-Letter Wordle Opening Words Starting With S — ~350 words
- The money section. Table: word · letters tested · why it works.
- Cover SLATE, STARE, STORE, SAINT, SLANT, SAUCE, SHINE, SOARE (hard-mode), SNORE.
- H3: "Why S openers are strong" — letter-frequency rationale (S, T, R, N, L, E are top-frequency). 1 stat w/ source.
- Link to `/best-wordle-starting-words` and `/wordle-solver`.

### 3. Complete List of 5-Letter Words Starting With S — ~250 words prose + the list
- Organized by **second letter** (SA, SC, SE, SH, SI, SK, SL, SM, SN, SO, SP, SQ, ST, SU, SW, SY) — accordion or anchored blocks.
- Inline definitions on hover/expand for common words (from `wordle-definitions.json`).
- Short lead paragraph per cluster explaining the group ("ST- words are the densest group with {n} entries…").
- Each word clickable → definition popover.

### 4. S Words That Have Been Wordle Answers — ~250 words  ★ unique asset
- Pull from `wordle-daily.json`: count + most recent examples + full expandable list.
- Quotable stat: "**{X} of the {N} S-words** have appeared as official Wordle answers since {firstDate}."
- Strategic note: NYT rarely repeats answers, so flag these as "lower-probability for today."
- Link to `/wordle-answers` archive.

### 5. How to Solve Wordle When the Word Starts With S — ~300 words
- Positional strategy: confirm vowel position 2, watch for SH/SC/SL/ST blends, double letters (S as #1 + later S).
- H3: "Common second letters after S" (mini data table: T, A, O, P, E, H, L lead).
- H3: "Avoid wasting guesses" — eliminate vs confirm logic.
- Link to `/how-to-play-wordle`.

### 6. 5-Letter S Words by Ending Letter — ~200 words + mini-tables
- Compact tables: S___E, S___T, S___Y, S___N, S___R (highest-demand patterns; these are their own long-tail queries).
- Internal links to future ending-with spokes.

### 7. Frequently Asked Questions — ~250 words (FAQPage schema)
See FAQ block below.

### 8. Related Wordle Tools & Lists — card list, minimal prose
- Cards: Wordle Solver · Best Starting Words · Wordle Unlimited · Today's Hint · 5-Letter Words hub · Words ending in S.

### Author bio (E-E-A-T) — ~60 words
- Byline w/ credentials ("WordleHint editorial team — we've tracked every NYT Wordle answer since 2025"), link to `/about`. Person/Org schema.

---

## FAQ (FAQPage schema — 7 Q, each 30–80 words, direct Q→A)

1. **How many 5-letter words start with S?**  → "{N} in the Wordle word list; ~1,500+ in the full English dictionary."
2. **What is the best Wordle starting word beginning with S?**  → SLATE / STARE rationale.
3. **Which 5-letter S words have been Wordle answers?**  → count + 3 recent examples + link to archive.
4. **What are good 5-letter S words with lots of vowels?**  → SAUCE, SUAVE, SOLAR, SIREN…
5. **What 5-letter words start with S and end with E?**  → STONE, SLATE, SHINE… (captures sub-query).
6. **Are there 5-letter S words with no other vowels besides one?**  → consonant-heavy examples for hard mode.
7. **Where can I get today's Wordle hint?**  → link `/wordle-hint-today`.

---

## Schema JSON-LD (3 stubs to implement)

1. **BreadcrumbList** — Home → 5 Letter Words → Starting With S
2. **FAQPage** — populated from the 7 Q above
3. **ItemList** — the word list (or the "best openers" subset) as ordered ListItems

(Reuse `lib/jsonld.tsx` + `lib/metadata.ts`. No invented Org IDs.)

---

## Internal links (anchor → target → section)

| Anchor text | Target | Section |
|---|---|---|
| best Wordle starting words | `/best-wordle-starting-words` | §2 |
| Wordle Solver | `/wordle-solver` | §2, §6 |
| today's Wordle hint | `/wordle-hint-today` | ATF CTA, FAQ7 |
| past Wordle answers archive | `/wordle-answers` | §4 |
| how to play Wordle | `/how-to-play-wordle` | §5 |
| 5-letter words hub | `/5-letter-words` (new hub) | breadcrumb, §8 |
| play unlimited Wordle | `/wordle-unlimited` | §8 |
| 5-letter words ending in S | `/5-letter-words/ending-with-s` (future) | §6 |

---

## GEO checklist

- [x] ≥3 stats with citations (total count, % that were answers, letter-frequency stat)
- [x] "What is X" ≤50-word block in first 200 words
- [x] Q&A FAQ matching conversational queries
- [x] Bold key facts, tables, no wall-of-text
- [x] Author bio + credentials + `/about` link
- [x] Last-updated date visible
- [x] FAQPage + ItemList + BreadcrumbList schema
- [x] SSG (Next.js) → content in view-source (AI-crawlable)

---

## Deviation note

Skill's AUTHORITY template defaults to 3,500+ words. For a *word-list* intent, 1,600–1,800 words of prose + the list is the UX-correct length; padding to 3,500 would bury the list and raise bounce. Honoring the user-specified 1,500+ floor.
