# UI Spec — `/5-letter-words/ending-with-d`

> Companion to `ending-with-d-blueprint.md`. **Plan only — no code written.**
> **Design principle: cohesion, not novelty.** Seventh `ending-with-*` spoke, reusing the `EndingListPage` system verbatim. Identity cue — **green on the LAST tile** — already baked in. Only the data differs.

---

## 1. Net new UI work: **none**

| Item | Status for the D spoke |
|---|---|
| `EndingListPage.tsx` | **Reuse unchanged** |
| `Tile/TileWord/TilePattern`, `WordGrid (highlightLast)`, `SectionHeading`, `StatCard`, `JsonLd` | **Reuse unchanged** |
| Palette / type / spacing / motion / hero shell | **Reuse unchanged** |
| `solve-strategy-board-end.svg`, `dot-grid.svg`, `past-answers-cal.svg` | **Reuse unchanged** |
| Hub markup | **Reuse unchanged** — `LIVE_ENDING` gains `"D"` |

**Net new art: 0 SVG. Net new components: 0.** Purely content (`ending-with-d.ts`) + a 3-line route wrapper + two registration edits.

---

## 2. What the page looks like (rendered, D-specific values)

Identical section flow; only the data differs:

- **Hero tiles:** `_ _ _ _ D` with tile 5 green showing **D**. H1 `5 Letter Words Ending With D`.
- **Stat cards:** `874` words · `118` common · top opener **TREAD**.
- **§2 openers table:** TREAD (best badge), STAND, BOARD, BREAD, SOUND, BLAND — `TileWord` + letters-tested + why.
- **§3 complete list:** suffix-cluster chips/accordions by penultimate letter → `…ID …ED …ND …RD …AD …LD …` (densest first). Six families, first 3 open. `WordGrid` common-first with definition popovers + past-answer dots.
- **§4 past answers panel:** `wordle-present` border + `past-answers-cal.svg`; "{answered} D-ending words have been Wordle answers" (BEARD, AVOID, SQUAD, SPEED…) → `/wordle-answers`.
- **§5 strategy:** prose + sticky `solve-strategy-board-end.svg`; bar chart "Most common 4th letters before D" → bars `ID, ED, ND, RD, AD, LD…` (I 25, E 23, N 22, R 14, A 13, L 11…). Prose carries the -IED past-tense + -ID adjective angles.
- **§6 by starting letter:** cards `TilePattern filled={{0: X, 4: "D"}}` over common `X _ _ _ D` words (B→BOARD/BREAD/BLAND, S→STAND/SOUND/SALAD, C→CHILD/CLOUD/CHORD) → links to `starting-with-*`.
- **§7 FAQ / §8 related + author bio:** reused verbatim.

---

## 3. Hub delta

Adding `"D"` to `LIVE_ENDING` flips the **D** cell live. Data only. (E, T, Y, R, A, N remain live; seven cells now green.)

---

## 4. Acceptance (visual)

- D page is pixel-consistent in system with prior ending spokes.
- Green direction cue on the **last** tile everywhere.
- Hub shows exactly seven live cells (E, T, Y, R, A, N, D); rest disabled.
- No new visual primitive introduced.
