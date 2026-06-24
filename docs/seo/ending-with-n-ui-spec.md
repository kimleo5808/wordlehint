# UI Spec — `/5-letter-words/ending-with-n`

> Companion to `ending-with-n-blueprint.md`. **Plan only — no code written.**
> **Design principle: cohesion, not novelty.** Sixth `ending-with-*` spoke, reusing the `EndingListPage` system verbatim. Identity cue — **green on the LAST tile** — already baked in. Only the data differs.

---

## 1. Net new UI work: **none**

| Item | Status for the N spoke |
|---|---|
| `EndingListPage.tsx` | **Reuse unchanged** |
| `Tile/TileWord/TilePattern`, `WordGrid (highlightLast)`, `SectionHeading`, `StatCard`, `JsonLd` | **Reuse unchanged** |
| Palette / type / spacing / motion / hero shell | **Reuse unchanged** |
| `solve-strategy-board-end.svg`, `dot-grid.svg`, `past-answers-cal.svg` | **Reuse unchanged** |
| Hub markup | **Reuse unchanged** — `LIVE_ENDING` gains `"N"` |

**Net new art: 0 SVG. Net new components: 0.** Purely content (`ending-with-n.ts`) + a 3-line route wrapper + two registration edits.

---

## 2. What the page looks like (rendered, N-specific values)

Identical section flow; only the data differs:

- **Hero tiles:** `_ _ _ _ N` with tile 5 green showing **N**. H1 `5 Letter Words Ending With N`.
- **Stat cards:** `618` words · `130` common · top opener **LEARN**.
- **§2 openers table:** LEARN (best badge), TRAIN, OCEAN, STAIN, CLEAN, BARON — `TileWord` + letters-tested + why.
- **§3 complete list:** suffix-cluster chips/accordions by penultimate letter → `…EN …ON …IN …AN …WN …RN …` (densest first). Six balanced families render as six evenly-sized accordions — the cleanest, most legible distribution of any ending so far. First 3 open. `WordGrid` common-first with definition popovers + past-answer dots.
- **§4 past answers panel:** `wordle-present` border + `past-answers-cal.svg`; "{answered} N-ending words have been Wordle answers" (TOKEN, BARON, SATIN, VEGAN…) → `/wordle-answers`.
- **§5 strategy:** prose + sticky `solve-strategy-board-end.svg`; bar chart "Most common 4th letters before N" → bars `EN, ON, IN, AN, WN, RN…` (E 34, O 26, I 22, A 15, W 14, R 13…) — a smooth descending staircase, no single dominant bar. Prose carries the family-identification + silent-GN angles.
- **§6 by starting letter:** cards `TilePattern filled={{0: X, 4: "N"}}` over common `X _ _ _ N` words (S→SATIN/SCORN/SPAWN, B→BACON/BARON/BRAIN, C→CABIN/CLEAN/CROWN) → links to `starting-with-*`.
- **§7 FAQ / §8 related + author bio:** reused verbatim.

---

## 3. Hub delta

Adding `"N"` to `LIVE_ENDING` flips the **N** cell live. Data only. (E, T, Y, R, A remain live; six cells now green.)

---

## 4. Acceptance (visual)

- N page is pixel-consistent in system with prior ending spokes.
- Green direction cue on the **last** tile everywhere.
- The six balanced family accordions/bars render evenly — no layout strain.
- Hub shows exactly six live cells (E, T, Y, R, A, N); rest disabled.
- No new visual primitive introduced.
