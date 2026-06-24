# UI Spec — `/5-letter-words/ending-with-e` + `/5-letter-words/ending-with` hub

> Companion to `ending-with-e-blueprint.md`. **Plan only — no code written.**
> **Design principle: cohesion, not novelty.** These are spokes of the live `/5-letter-words` section, so they must be visually indistinguishable in system from the 26 `starting-with-*` pages. We reuse the exact tokens, components, spacing rhythm, and motion. The *only* visual signature that differs is the **direction cue: green is on the LAST tile, not the first.**

---

## 1. Design system (inherited, do not change)

- **Palette:** Wordle tokens from `tailwind.config.ts` — `wordle-correct` (green), `wordle-present` (yellow), `wordle-absent` (gray), `cta`, plus `border/card/muted/foreground/muted-foreground`. Light + dark via existing theme.
- **Type:** `font-heading` for H1/H2/card titles; default body; `font-mono` for tiles, cluster labels, word chips, stat numerics.
- **Containers:** `mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8` (identical to LetterListPage).
- **Cards/radii:** `rounded-3xl` hero, `rounded-2xl` panels, `rounded-xl` small cards, `border border-border bg-card`.
- **Motion:** reuse `animate-fade-in-up` on hero; hover lifts `hover:-translate-y-0.5`; `<details>` chevron `group-open:rotate-180`. No new animation primitives.
- **Components reused unchanged:** `Tile`, `TileWord`, `TilePattern`, `WordGrid`, `SectionHeading`, `StatCard`, `JsonLd`, `I18nLink`, lucide icons.

---

## 2. `/5-letter-words/ending-with-e` — section-by-section

### Hero (the one intentional visual difference)
- Same hero shell: `rounded-3xl` card, dot-grid bg overlay, blurred `wordle-correct/10` glow top-right.
- **Tile row:** 5 tiles `_ _ _ _ E`. Tiles 1–4 `state="blank"`, **tile 5 `state="correct"` showing E.** This green-on-the-right is the whole page's identity — it reads instantly as "you've locked the last letter."
- Eyebrow chip: small green Tile `E` + `5-LETTER WORD LIST` (mono, tracked).
- H1: `5 Letter Words Ending With E`.
- Subhead, last-updated chip, 3 StatCards (total / common / top E-ending opener), jump-link pills, and the `bg-cta` "Stuck on today's puzzle?" CTA — all identical layout to the starting template.

### Intro
- `max-w-3xl` muted prose, auto stat sentence with bolded `{total}`/`{common}`/`{topOpener}`, then `introExtra`. One idea per paragraph (GEO).

### §2 Best E-Ending Openers
- `SectionHeading` "Best Wordle Opening Words Ending in E".
- Desktop: same 3-col table (Word `TileWord` + Best badge · Letters tested mono · Why). Mobile: stacked cards. Identical to existing openers block.

### §3 Complete List — grouped by PENULTIMATE letter
- `SectionHeading` with `count="{total} words"`.
- Explainer line + legend: yellow dot = past answer; "tap a highlighted word for its definition".
- **Cluster jump-chips:** instead of `SA, SB…` prefixes, show **suffix clusters** `…AE …BE …CE …` (label = `{4th}{E}`, e.g. `AE`, `LE`, `RE`, `SE`, `TE`). Same chip styling with `<sup>` count.
- **Cluster accordions** (`<details>`, first 3 open): summary shows the suffix (e.g. `LE`) + "{n} words · {n} common"; body renders `WordGrid` (common-first, definition popovers, past-answer dots). Component reused as-is — only the grouping source changes.

### §4 Past Answers panel
- Reuse the `wordle-present`-bordered panel + `past-answers-cal.svg`.
- Copy: "{answered} E-ending words have been official Wordle answers." Chips of recent answers; link to `/wordle-answers`.

### §5 Strategy
- `SectionHeading` "How to Solve Wordle When the Word Ends in E".
- Two-col: prose paragraphs (left) + sticky illustration aside (right).
- **Bar chart retargeted:** heading "Most common 4th letters before E"; horizontal bars labeled `_E`-pairs as `{x}E` (AE, LE, RE, SE, TE…) with `wordle-correct` fill, width ∝ count. Same markup as the starting template's "second letters" bars.

### §6 By Starting Letter (cross-section — mirror of starting page's "by ending letter")
- `SectionHeading` "5-Letter Words Ending in E by Starting Letter".
- Grid of small cards; each card = `TilePattern filled={{0: X, 4: "E"}}` (green first + last) over a flex-wrap of common `X _ _ _ E` words. Drives links to `starting-with-*`.

### §7 FAQ
- Reuse `<details>` accordion with `group-open:rotate-45` "+" — identical.

### §8 Related + Author bio
- Reuse `RELATED` card grid and the Editorial Team bio block verbatim.

---

## 3. `/5-letter-words/ending-with` hub

Clone of `/5-letter-words` hub, retargeted.

- **Hero:** same `rounded-3xl` shell. Tile row `_ _ _ _ S` (or `_ _ _ _ E`) with **last tile green** — consistent with the spoke's direction cue. H1 `5 Letter Words by Ending Letter`.
- **A–Z grid:** identical aspect-square tile-buttons. `LIVE_ENDING = ["E"]` → only **E** is the green live tile linking `/5-letter-words/ending-with-e`; A–D, F–Z are dashed "Coming soon" (same disabled styling). Subnote: "More ending-letter pages are being added one at a time."
- **Wordle Tools** card row reused unchanged.
- **Cross-link:** on the main `/5-letter-words` hub, add a sibling "Browse by Ending Letter" section/card pointing here (and ideally a matching "by starting letter" framing so both are discoverable).

---

## 4. New vs existing (engineering-facing)

| Item | Status |
|---|---|
| `Tile/TileWord/TilePattern`, `WordGrid`, `SectionHeading`, `StatCard`, `JsonLd` | **Reuse unchanged** |
| Palette, type, spacing, motion, hero shell | **Reuse unchanged** |
| `EndingListPage.tsx` | **New** — fork of `LetterListPage`: greens last tile, penultimate grouping, retargeted headings/strategy/§6. Same `LetterContent` interface. |
| Hub page | **New** — fork of `/5-letter-words/page.tsx` with `LIVE_ENDING`. |
| Direction cue (green on last tile) | **New visual signature** — the only deliberate departure. |

---

## 5. SVG illustrations

Existing: `dot-grid.svg`, `hero-s-tiles.svg`, `past-answers-cal.svg`, `solve-strategy-board.svg` (all theme-adaptive via `currentColor`).

- **Reuse:** `dot-grid.svg` (hero bg), `past-answers-cal.svg` (§4).
- **New SVG needed — 1:** `solve-strategy-board-end.svg` — a mini Wordle board with the **green tile in the LAST column** (the current `solve-strategy-board.svg` greens the first column, which would contradict the page). Same style/stroke/`currentColor`, theme-adaptive, ~260×312.
- **Optional:** the hero tile row is built from live `Tile` components, so no new hero SVG is required (unlike `hero-s-tiles.svg`, which is letter-specific and can be skipped here).

**Net new art: 1 SVG** (`solve-strategy-board-end.svg`).
