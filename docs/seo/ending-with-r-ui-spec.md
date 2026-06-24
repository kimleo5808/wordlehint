# UI Spec — `/5-letter-words/ending-with-r`

> Companion to `ending-with-r-blueprint.md`. **Plan only — no code written.**
> **Design principle: cohesion, not novelty.** Fourth `ending-with-*` spoke. The visual system was built for `ending-with-e` and reused verbatim by `-t` and `-y`. R reuses the same `EndingListPage` component, tokens, and shared SVG. The identity cue — **green on the LAST tile** — is already baked in.

---

## 1. Net new UI work: **none**

| Item | Status for the R spoke |
|---|---|
| `EndingListPage.tsx` | **Reuse unchanged** — greens last tile, groups by penultimate, §6 "by starting letter". |
| `Tile/TileWord/TilePattern`, `WordGrid (highlightLast)`, `SectionHeading`, `StatCard`, `JsonLd` | **Reuse unchanged** |
| Palette / type / spacing / motion / hero shell | **Reuse unchanged** |
| `solve-strategy-board-end.svg`, `dot-grid.svg`, `past-answers-cal.svg` | **Reuse unchanged** |
| Hub markup | **Reuse unchanged** — only the `LIVE_ENDING` array gains `"R"` |

**Net new art: 0 SVG. Net new components: 0.** Purely content (`ending-with-r.ts`) + a 3-line route wrapper + two registration edits.

---

## 2. What the page looks like (rendered, R-specific values)

Identical section flow to prior spokes; only the data differs:

- **Hero tiles:** `_ _ _ _ R` with tile 5 green showing **R**. Eyebrow chip green Tile `R` + `5-LETTER WORD LIST`. H1 `5 Letter Words Ending With R`.
- **Stat cards:** `737` words · `212` common · top opener **LATER**.
- **§2 openers table:** LATER (best badge), CATER, SOLAR, SUPER, TIGER, OTHER — `TileWord` + letters-tested mono + why.
- **§3 complete list:** suffix-cluster chips/accordions by penultimate letter → `…ER …OR …AR …UR …IR …YR` (densest first). The `…ER` accordion is by far the largest (141 common); it opens first and dominates the list — which visually reinforces the page's core insight. `WordGrid` common-first with definition popovers + past-answer dots.
- **§4 past answers panel:** `wordle-present` border + `past-answers-cal.svg`; "{answered} R-ending words have been Wordle answers" with chips (MAKER, CIGAR, SOBER, WISER…) → `/wordle-answers`.
- **§5 strategy:** prose + sticky `solve-strategy-board-end.svg`; bar chart "Most common 4th letters before R" → bars labeled `ER, OR, AR, UR, IR…`, `wordle-correct` fill, width ∝ count (E 141, O 34, A 20, U 9, I 7…). The ER bar dwarfs the rest — an honest visual of the -ER dominance. Prose carries the **assume-ER-first** angle.
- **§6 by starting letter:** cards `TilePattern filled={{0: X, 4: "R"}}` (green first + last) over common `X _ _ _ R` words (S→SOBER/SUPER/SOLAR, C→CATER/CIDER/COVER, M→MAKER/MINOR/MOTOR) → links to `starting-with-*`.
- **§7 FAQ / §8 related + author bio:** reused verbatim.

---

## 3. Hub delta

Adding `"R"` to `LIVE_ENDING` flips the **R** cell from dashed "Coming soon" to a green live tile linking `/5-letter-words/ending-with-r`. Data only. (E, T, Y remain live; four cells now green, rest disabled.)

---

## 4. Acceptance (visual)

- R page is pixel-consistent in system with prior ending spokes and the 26 `starting-with-*` pages.
- Green direction cue is on the **last** tile everywhere (hero, §6 patterns, strategy board).
- The ER cluster/bar is visibly dominant — the layout absorbs the lopsided distribution without changes.
- Hub shows exactly four live cells (E, T, Y, R); all others dashed/disabled.
- No new visual primitive is introduced.
