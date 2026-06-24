# UI Spec — `/5-letter-words/ending-with-a`

> Companion to `ending-with-a-blueprint.md`. **Plan only — no code written.**
> **Design principle: cohesion, not novelty.** Fifth `ending-with-*` spoke, reusing the `EndingListPage` system verbatim. The identity cue — **green on the LAST tile** — is already baked in. The only thing different about A is the *data*: a much shorter common list and an honest "weak opener" tone in the copy (content-level, not UI-level).

---

## 1. Net new UI work: **none**

| Item | Status for the A spoke |
|---|---|
| `EndingListPage.tsx` | **Reuse unchanged** |
| `Tile/TileWord/TilePattern`, `WordGrid (highlightLast)`, `SectionHeading`, `StatCard`, `JsonLd` | **Reuse unchanged** |
| Palette / type / spacing / motion / hero shell | **Reuse unchanged** |
| `solve-strategy-board-end.svg`, `dot-grid.svg`, `past-answers-cal.svg` | **Reuse unchanged** |
| Hub markup | **Reuse unchanged** — `LIVE_ENDING` gains `"A"` |

**Net new art: 0 SVG. Net new components: 0.** Purely content (`ending-with-a.ts`) + a 3-line route wrapper + two registration edits.

---

## 2. What the page looks like (rendered, A-specific values)

Identical section flow; only the data differs — and the data is the story (small list):

- **Hero tiles:** `_ _ _ _ A` with tile 5 green showing **A**. H1 `5 Letter Words Ending With A`.
- **Stat cards:** `885` words · **`64` common** (the small number is the hook) · top opener **DELTA**.
- **§2 openers table:** DELTA (best badge), OPERA, EXTRA, ULTRA, COBRA, ZEBRA — `TileWord` + letters-tested + why. Intro copy explicitly frames A-enders as weak openers (honesty).
- **§3 complete list:** suffix-cluster chips/accordions by penultimate letter → `…MA …RA …TA …NA …LA …IA …`. With only 64 common words, the common-first grid is short — a feature, not a bug ("the whole realistic candidate set on one screen"). All accordions can sit open; definition popovers especially useful for loanwords (JUNTA, KAPPA, TERRA). Past-answer dots.
- **§4 past answers panel:** `wordle-present` border + `past-answers-cal.svg`; "Only {answered} A-ending words have been Wordle answers" (DRAMA, GUAVA, PARKA, UMBRA…) → `/wordle-answers`. The small count reinforces rarity.
- **§5 strategy:** prose + sticky `solve-strategy-board-end.svg`; bar chart "Most common 4th letters before A" → bars `MA, RA, TA, NA, LA, IA…` (M 11, R 10, T 7, N 5, L 5, I 5…), fairly even — no single dominant family (contrast with R's lopsided ER). Prose carries the short-hunt + loanword-families + weak-opener angles.
- **§6 by starting letter:** cards `TilePattern filled={{0: X, 4: "A"}}` over common `X _ _ _ A` words (C→CHINA/COBRA/COCOA, P→PASTA/PIZZA/PLAZA, V→VILLA/VISTA/VODKA) → links to `starting-with-*`.
- **§7 FAQ / §8 related + author bio:** reused verbatim; FAQ leads with the rarity stat.

---

## 3. Hub delta

Adding `"A"` to `LIVE_ENDING` flips the **A** cell live. Data only. (E, T, Y, R remain live; five cells now green.)

---

## 4. Acceptance (visual)

- A page is pixel-consistent in system with prior ending spokes.
- Green direction cue on the **last** tile everywhere.
- The short common list renders cleanly — the layout handles a small grid without looking empty (the prose-heavy strategy/FAQ sections balance the page).
- Hub shows exactly five live cells (E, T, Y, R, A); rest disabled.
- No new visual primitive introduced.
