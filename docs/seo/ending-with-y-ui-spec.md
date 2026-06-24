# UI Spec — `/5-letter-words/ending-with-y`

> Companion to `ending-with-y-blueprint.md`. **Plan only — no code written.**
> **Design principle: cohesion, not novelty.** Third `ending-with-*` spoke. The full visual system was built for `ending-with-e` and reused verbatim by `-t`. Y reuses the same `EndingListPage` component, tokens, and shared SVG. The page's only identity cue — **green on the LAST tile** — is already baked into `EndingListPage`.

---

## 1. Net new UI work: **none**

| Item | Status for the Y spoke |
|---|---|
| `EndingListPage.tsx` | **Reuse unchanged** — greens last tile, groups by penultimate, §6 "by starting letter". |
| `Tile/TileWord/TilePattern`, `WordGrid (highlightLast)`, `SectionHeading`, `StatCard`, `JsonLd` | **Reuse unchanged** |
| Palette / type / spacing / motion / hero shell | **Reuse unchanged** |
| `solve-strategy-board-end.svg` (green tile in last column) | **Reuse unchanged** |
| `dot-grid.svg`, `past-answers-cal.svg` | **Reuse unchanged** |
| Hub markup | **Reuse unchanged** — only the `LIVE_ENDING` array gains `"Y"` |

**Net new art: 0 SVG. Net new components: 0.** Purely content (`ending-with-y.ts`) + a 3-line route wrapper + two registration edits.

---

## 2. What the page looks like (rendered, Y-specific values)

Identical section flow to `ending-with-e/-t`; only the data the shared component receives differs:

- **Hero tiles:** `_ _ _ _ Y` with tile 5 green showing **Y**. Eyebrow chip green Tile `Y` + `5-LETTER WORD LIST`. H1 `5 Letter Words Ending With Y`.
- **Stat cards:** `1,527` words · `364` common · top opener **EARLY** (auto-filled from the data layer).
- **§2 openers table:** EARLY (best badge), STRAY, ENTRY, STORY, DECAY, DAIRY — `TileWord` + letters-tested mono + why.
- **§3 complete list:** suffix-cluster chips/accordions labeled by penultimate letter → `…LY …TY …DY …RY …KY …NY …` (densest first: LY, TY, DY, RY, KY, NY). This is the highest-value grouping of any ending page — it turns 364 common words into recognisable rhyme groups. `WordGrid` common-first with definition popovers + past-answer dots. (First 3 accordions open by default; with this many clusters, the rest collapsed keeps the page scannable.)
- **§4 past answers panel:** `wordle-present` border + `past-answers-cal.svg`; "{answered} Y-ending words have been Wordle answers" with chips (ENTRY, GRAVY, IVORY, HASTY…) → `/wordle-answers`.
- **§5 strategy:** prose + sticky `solve-strategy-board-end.svg`; bar chart "Most common 4th letters before Y" → bars labeled `LY, TY, DY, RY, KY, NY…`, `wordle-correct` fill, width ∝ count (L 56, T 46, D 38, R 33, K 31, N 23…). Prose carries the **double-letter trap** angle (BELLY, PUPPY, FIZZY, MUDDY).
- **§6 by starting letter:** cards `TilePattern filled={{0: X, 4: "Y"}}` (green first + last) over common `X _ _ _ Y` words (S→STORY/STUDY/SUNNY, D→DAIRY/DANDY/DECAY, P→PARTY/PENNY/PROXY) → links to `starting-with-*`.
- **§7 FAQ / §8 related + author bio:** reused verbatim.

---

## 3. Hub delta

`/5-letter-words/ending-with` renders the A–Z grid from `LIVE_ENDING`. Adding `"Y"` flips the **Y** cell from dashed "Coming soon" to a green live tile linking `/5-letter-words/ending-with-y`. Data only — no markup change. (E and T remain live; three cells now green, rest disabled.)

---

## 4. Acceptance (visual)

- Y page is pixel-consistent in system with `ending-with-e/-t` and the 26 `starting-with-*` pages — same containers, radii, motion, dark-mode.
- Green direction cue is on the **last** tile everywhere (hero, §6 patterns, strategy board).
- Hub shows exactly three live cells (E, T, Y); all others dashed/disabled.
- No new visual primitive is introduced. The list is longer than prior endings, but the existing accordion grouping absorbs it without layout changes.
