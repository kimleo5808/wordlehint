# UI Spec — `/5-letter-words/ending-with-t`

> Companion to `ending-with-t-blueprint.md`. **Plan only — no code written.**
> **Design principle: cohesion, not novelty.** This is the second `ending-with-*` spoke. The full visual system was already built and shipped for `ending-with-e` (see `ending-with-e-ui-spec.md`). T reuses it **verbatim** — same `EndingListPage` component, same tokens, same SVG. The page's only identity cue, the **green on the LAST tile**, is already baked into `EndingListPage`.

---

## 1. Net new UI work: **none**

| Item | Status for the T spoke |
|---|---|
| `EndingListPage.tsx` | **Reuse unchanged** — already greens last tile, groups by penultimate, retargets §6 to "by starting letter". |
| `Tile/TileWord/TilePattern`, `WordGrid (highlightLast)`, `SectionHeading`, `StatCard`, `JsonLd` | **Reuse unchanged** |
| Palette / type / spacing / motion / hero shell | **Reuse unchanged** |
| `solve-strategy-board-end.svg` (green tile in last column) | **Reuse unchanged** — built for E, shared by all ending pages |
| `dot-grid.svg`, `past-answers-cal.svg` | **Reuse unchanged** |
| Hub markup | **Reuse unchanged** — only the `LIVE_ENDING` data array gains `"T"` |

**Net new art: 0 SVG. Net new components: 0.** The T spoke is purely content (`ending-with-t.ts`) + a 3-line route wrapper + two registration edits. All rendering is the proven E layout with T data.

---

## 2. What the page looks like (rendered, T-specific values)

Identical section flow to `ending-with-e`; the only differences are the data the shared component receives:

- **Hero tiles:** `_ _ _ _ T` with tile 5 green showing **T**. Eyebrow chip green Tile `T` + `5-LETTER WORD LIST`. H1 `5 Letter Words Ending With T`.
- **Stat cards:** `795` words · `253` common · top opener **LEAST** (auto-filled; counts come from the data layer, not hard-coded).
- **§2 openers table:** LEAST (best badge), ROAST, REACT, SAINT, PAINT, COAST — `TileWord` + letters-tested mono + why.
- **§3 complete list:** suffix-cluster chips/accordions labeled by penultimate letter → `…NT …ST …ET …IT …RT …UT …LT …` (densest first: NT, ST, ET, IT, RT, UT). `WordGrid` common-first with definition popovers + past-answer dots.
- **§4 past answers panel:** `wordle-present` border + `past-answers-cal.svg`; "{answered} T-ending words have been Wordle answers" with chips (SHORT, FRUIT, EIGHT, BLAST…) → `/wordle-answers`.
- **§5 strategy:** prose + sticky `solve-strategy-board-end.svg`; bar chart "Most common 4th letters before T" → bars labeled `NT, ST, ET, IT, RT, UT, LT…`, `wordle-correct` fill, width ∝ count (N 37, S 36, E 29, I 23, R 21, U 19, L 17…).
- **§6 by starting letter:** cards `TilePattern filled={{0: X, 4: "T"}}` (green first + last) over common `X _ _ _ T` words (S→START/SHIRT/SCOUT, B→BEAST/BLAST/BUILT, C→COUNT/COURT/CHART…) → links to `starting-with-*`.
- **§7 FAQ / §8 related + author bio:** reused verbatim.

---

## 3. Hub delta

`/5-letter-words/ending-with` already renders the A–Z grid from `LIVE_ENDING`. Adding `"T"` flips the **T** cell from dashed "Coming soon" to a green live tile linking `/5-letter-words/ending-with-t`. No markup change — data only. (E remains live; both T and E are now green; the rest stay disabled.)

---

## 4. Acceptance (visual)

- T page is pixel-consistent in system with `ending-with-e` and the 26 `starting-with-*` pages — same containers, radii, motion, dark-mode.
- Green direction cue is on the **last** tile everywhere (hero, §6 patterns, strategy board).
- Hub shows exactly two live cells (E, T); all others dashed/disabled.
- No new visual primitive is introduced.
