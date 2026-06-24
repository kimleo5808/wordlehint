# UI Spec — `/5-letter-words/ending-with-h`

> Companion to `ending-with-h-blueprint.md`. **Plan only — no code written.**
> **Design principle: cohesion, not novelty.** Eighth `ending-with-*` spoke, reusing the `EndingListPage` system verbatim. Identity cue — **green on the LAST tile** — already baked in. Only the data differs.

---

## 1. Net new UI work: **none**

| Item | Status for the H spoke |
|---|---|
| `EndingListPage.tsx` | **Reuse unchanged** |
| `Tile/TileWord/TilePattern`, `WordGrid (highlightLast)`, `SectionHeading`, `StatCard`, `JsonLd` | **Reuse unchanged** |
| Palette / type / spacing / motion / hero shell | **Reuse unchanged** |
| `solve-strategy-board-end.svg`, `dot-grid.svg`, `past-answers-cal.svg` | **Reuse unchanged** |
| Hub markup | **Reuse unchanged** — `LIVE_ENDING` gains `"H"` |

**Net new art: 0 SVG. Net new components: 0.** Purely content (`ending-with-h.ts`) + a 3-line route wrapper + two registration edits.

---

## 2. What the page looks like (rendered, H-specific values)

Identical section flow; only the data differs:

- **Hero tiles:** `_ _ _ _ H` with tile 5 green showing **H**. H1 `5 Letter Words Ending With H`.
- **Stat cards:** `428` words · `139` common · top opener **EARTH**.
- **§2 openers table:** EARTH (best badge), NORTH, SOUTH, TEACH, CLOTH, BRUSH — `TileWord` + letters-tested + why.
- **§3 complete list:** suffix-cluster chips/accordions by penultimate letter → `…CH …TH …SH …GH …PH …` (densest first). The `…CH` accordion dominates (58 common) and opens first; `…GH`/`…PH` are short tails. `WordGrid` common-first with definition popovers + past-answer dots.
- **§4 past answers panel:** `wordle-present` border + `past-answers-cal.svg`; "{answered} H-ending words have been Wordle answers" (MOUTH, DOUGH, NOTCH, WEIGH…) → `/wordle-answers`.
- **§5 strategy:** prose + sticky `solve-strategy-board-end.svg`; bar chart "Most common 4th letters before H" → bars `CH, TH, SH, GH, PH…` (C 58, T 36, S 27, G 9, P 7…) — three tall bars then a sharp drop, a clean visual of the digraph dominance. Prose carries the CH/TH/SH + silent-GH angles.
- **§6 by starting letter:** cards `TilePattern filled={{0: X, 4: "H"}}` over common `X _ _ _ H` words (B→BEACH/BENCH/BRUSH, C→CATCH/COACH/CLOTH, T→TEACH/TOOTH/TRUTH) → links to `starting-with-*`.
- **§7 FAQ / §8 related + author bio:** reused verbatim.

---

## 3. Hub delta

Adding `"H"` to `LIVE_ENDING` flips the **H** cell live. Data only. (E, T, Y, R, A, N, D remain live; eight cells now green.)

---

## 4. Acceptance (visual)

- H page is pixel-consistent in system with prior ending spokes.
- Green direction cue on the **last** tile everywhere.
- The CH-dominant cluster/bar renders cleanly alongside the short GH/PH tails.
- Hub shows exactly eight live cells (E, T, Y, R, A, N, D, H); rest disabled.
- No new visual primitive introduced.
