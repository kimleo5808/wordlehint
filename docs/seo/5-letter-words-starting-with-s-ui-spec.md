# UI Design Spec — `5 Letter Words Starting With S`

> Stack: Next.js 16 / React 19 / Tailwind 3 / shadcn-radix / next-themes
> Reuses site tokens: `font-heading` (Outfit), `font-body` (Plus Jakarta Sans), `font-mono` (JetBrains Mono), `wordle-correct/present/absent/key`, `cta`, `card`, `muted`, `border`.

## Aesthetic direction — "Quiet Puzzle Grid"

Refined editorial, not maximalist. The **Wordle tile** is the single signature motif, used with restraint: mono-uppercase letters sit in 2px-bordered rounded squares that "flip-reveal" on load (`animate-fade-in-up` staggered). Warm neutral canvas, one green accent (`wordle-correct`) carrying the eye. Generous whitespace, a 2px hairline grid texture in the hero only. Dark mode = slate canvas, tiles glow slightly. The page should read like a well-set puzzle column, not a tool dump.

Container: `mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8` (slightly wider than the 4xl game pages to fit the word grid).

---

## Section-by-section component specs

### 0. Hero (above the fold)
- Wrapper: `relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-10 sm:px-10`.
- Background: inline **SVG #1 (`hero-s-tiles.svg`)** absolutely positioned top-right at low opacity (`opacity-[0.08] dark:opacity-[0.12]`), plus a faint dotted-grid (**SVG #4**) as `bg-[url()]`.
- Eyebrow: tile-chip — a single green `S` tile (28px, mono, `bg-wordle-correct text-white`) + label "5-LETTER WORD LIST" in `font-mono text-xs tracking-widest text-muted-foreground`.
- **H1**: `font-heading text-4xl sm:text-5xl font-bold tracking-tight`. Render "S" as a small inline green tile glyph next to the text for brand punch.
- Subhead: `mt-3 max-w-2xl text-lg text-muted-foreground`.
- Last-updated chip: `inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs` + tiny clock lucide icon.
- **Quick-stat strip**: 3-col grid (`grid grid-cols-3 gap-3 sm:gap-4`), each a `rounded-xl border bg-background p-4`: big number `font-heading text-2xl sm:text-3xl font-bold text-wordle-correct`, label below in `text-xs text-muted-foreground`. Stats: total S words · # that were answers · top opener.
- **Jump-nav**: horizontal scroll row of pill links `rounded-full border px-3 py-1.5 text-sm hover:border-wordle-correct hover:text-wordle-correct transition`.
- **CTA card** ("Stuck on today's puzzle?"): right-aligned `rounded-2xl bg-cta text-cta-foreground p-5`, button → `/wordle-hint-today`.
- Load animation: hero children stagger via `style={{animationDelay}}` on `animate-fade-in-up`.

### 1. Best Wordle Opening Words (the money table)
- Heading row with a `▍` green rule (`before:` 4px bar) — reusable `<SectionHeading>`.
- **Desktop**: shadcn `Table`. Columns: Word (mono tiles, each letter a mini 22px tile) · Letters Tested · Why It Works. Zebra rows `even:bg-muted/40`, row `hover:bg-wordle-correct/5`.
- **Mobile**: collapses to stacked cards (`md:hidden`), each card = tile-row + bullet reasons.
- Top pick (SLATE) gets a `Best` badge (`bg-wordle-correct text-white text-[10px] rounded px-1.5`).

### 2. Complete list grouped by second letter
- Intro paragraph + a **cluster nav**: 16 anchor chips (SA, SC, SE … SY), each `font-mono` pill; count superscript per cluster.
- Each cluster = shadcn `Accordion` item (default first 3 open). Header: `font-mono text-lg` cluster label + count badge.
- Word grid inside: `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2`. Each word = button rendering **5 mini tiles** (mono, `bg-muted border`), green first tile. Click → shadcn `Popover` with the inline definition (from `wordle-definitions.json`); words lacking a def render non-interactive (`cursor-default opacity-90`, no popover).
- Words that were past answers get a tiny `wordle-present` dot in the corner.

### 3. "S words that were past Wordle answers" — highlight block ★
- Distinct treatment to signal the unique data: `rounded-2xl border-2 border-wordle-present/40 bg-wordle-present/5 p-6`.
- Left: **SVG #2 (`past-answers-cal.svg`)** small calendar-tile illustration (~96px). Right: quotable stat in `font-heading text-2xl`, expandable list of answer words (each a tile-row, `wordle-absent` muted to read "retired"), link to `/wordle-answers`.

### 4. How to solve when it starts with S
- Two-column on `lg`: left = prose (one-idea paragraphs, bold facts); right = **SVG #3 (`solve-strategy-board.svg`)** mini Wordle board (sticky on scroll, `lg:sticky lg:top-24`).
- H3 "Common second letters after S" → small **horizontal bar chart** can be the same SVG #3 companion or a CSS bar list: rows of `S?` with a `bg-wordle-correct h-2 rounded` bar scaled to frequency + % label in mono. (CSS bars preferred over an image here for crispness.)

### 5. By ending letter (mini tables)
- `grid sm:grid-cols-2 lg:grid-cols-3 gap-4`. Each card: header `S _ _ _ E` rendered as a 5-tile pattern (first+last filled green/gray, middle blank), then 6–8 example words as comma-mono list. Cards link to future `/5-letter-words/ending-with-*`.

### 6. FAQ
- shadcn `Accordion`, `type="single" collapsible`. Trigger `font-heading text-base`. Plus/minus icon rotates. Mirrors FAQPage schema 1:1.

### 7. Related tools — card grid
- `grid sm:grid-cols-2 lg:grid-cols-3 gap-4`. Each card `group rounded-xl border p-5 hover:border-wordle-correct hover:-translate-y-0.5 transition`. Lucide icon in a tinted square, title, one-line desc, arrow that slides on hover. Links per blueprint §8.

### 8. Author bio
- `flex items-center gap-4 rounded-xl bg-muted p-5`. Avatar = green `W` tile. Name + credential line + `/about` link. Person/Org schema.

---

## Reusable primitives to build
| Component | Purpose |
|---|---|
| `<Tile letter state size>` | the atomic Wordle tile (states: correct/present/absent/blank); mono, rounded-md, 2px border |
| `<TileWord word highlight>` | a row of 5 `<Tile>`; used in tables, lists, patterns |
| `<SectionHeading>` | green `▍` rule + `font-heading` title + optional count badge |
| `<StatCard>` | the quick-stat number/label box |
| `<WordButton>` | tile-word that opens a definition `Popover` |

## Motion
- Page load: hero staggers (`fade-in-up`, 60ms steps). Tiles within a word can stagger 40ms for a subtle "flip-in".
- Respect `prefers-reduced-motion` — gate animations behind a `motion-safe:` variant.
- No scroll-jacking; only entrance + hover.

## Accessibility
- Tiles are decorative wrappers; real text stays selectable inside (don't replace letters with images).
- Color is never the only signal — past-answer dot + a visible label; color-blind users covered by existing `wordle-cb` palette if toggled.
- All interactive tiles are real `<button>`/`<a>` with `aria-label`.

---

## SVG illustrations to generate (4)

| # | File | Purpose | viewBox | Notes |
|---|---|---|---|---|
| 1 | `hero-s-tiles.svg` | Decorative hero motif — a 5-tile row "S · · · ·" with the S tile green, faint | `0 0 520 140` | Uses `currentColor` + green; low opacity in use |
| 2 | `past-answers-cal.svg` | Icon for the past-answers block — calendar page made of a tile | `0 0 96 96` | green/yellow accents |
| 3 | `solve-strategy-board.svg` | Instructional mini Wordle board — green S in col 1, grays elsewhere, showing opener logic | `0 0 300 360` | 5×3 grid, labeled |
| 4 | `dot-grid.svg` | Tileable hairline dot-grid texture for hero bg | `0 0 24 24` | near-transparent, theme-adaptive via stroke currentColor |

All SVGs use `currentColor` for neutral strokes so they inherit `text-foreground`/`text-muted-foreground` and adapt to dark mode; the green/yellow accents are hardcoded to the Wordle palette hexes (#6aaa64 / #c9b458).
