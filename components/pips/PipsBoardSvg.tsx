import { EMPTY_COLOUR, regionColours } from "@/lib/pips-palette";
import type { PipsBoard, PipsCell, PipsRegion } from "@/types/pips";

const CELL = 60;
const PAD = 10;
const EMPTY_FILL = EMPTY_COLOUR.fill;
const INK = "#1f2937";
const HIGHLIGHT = "#f59e0b";

// Pip positions inside one domino half, on a 3×3 grid (0–2).
const PIP_LAYOUT: Record<number, [number, number][]> = {
  0: [],
  1: [[1, 1]],
  2: [[0, 0], [2, 2]],
  3: [[0, 0], [1, 1], [2, 2]],
  4: [[0, 0], [0, 2], [2, 0], [2, 2]],
  5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
  6: [[0, 0], [1, 0], [2, 0], [0, 2], [1, 2], [2, 2]],
};

const k = ([r, c]: PipsCell) => `${r},${c}`;

function label(r: PipsRegion): string | null {
  switch (r.type) {
    case "sum": return String(r.target);
    case "equals": return "=";
    case "unequal": return "≠";
    case "less": return `<${r.target}`;
    case "greater": return `>${r.target}`;
    default: return null;
  }
}

/**
 * A Pips board drawn as SVG: coloured regions with their rule badge, thick
 * borders between regions, and any placed dominoes with their pips.
 */
export default function PipsBoardSvg({
  board,
  placed,
  highlight = [],
  label: ariaLabel,
  numerals = false,
}: {
  board: PipsBoard;
  /** Domino indices to draw. */
  placed: number[];
  highlight?: PipsCell[];
  label: string;
  /** Teaching mode: write each half's number (bottom-right) instead of dots
   *  and keep the rule badges on top, so the condition stays readable. */
  numerals?: boolean;
}) {
  const cells = board.solution.flat();
  const rows = Math.max(...cells.map((c) => c[0])) + 1;
  const cols = Math.max(...cells.map((c) => c[1])) + 1;
  const W = cols * CELL + PAD * 2;
  const H = rows * CELL + PAD * 2;
  const x = (c: number) => PAD + c * CELL;
  const y = (r: number) => PAD + r * CELL;

  const regionIndex = new Map<string, number>();
  board.regions.forEach((reg, i) => reg.indices.forEach((c) => regionIndex.set(k(c), i)));
  const regionFill = regionColours(board).map((c) => c.fill);

  const highlightSet = new Set(highlight.map(k));
  const placedSet = new Set(placed);

  // Thick border on every cell edge that faces another region or the outside.
  const borders: string[] = [];
  for (const cell of cells) {
    const [r, c] = cell;
    const me = regionIndex.get(k(cell));
    const sides: [PipsCell, string][] = [
      [[r - 1, c], `M${x(c)} ${y(r)}h${CELL}`],
      [[r + 1, c], `M${x(c)} ${y(r + 1)}h${CELL}`],
      [[r, c - 1], `M${x(c)} ${y(r)}v${CELL}`],
      [[r, c + 1], `M${x(c + 1)} ${y(r)}v${CELL}`],
    ];
    for (const [n, d] of sides) if (regionIndex.get(k(n)) !== me) borders.push(d);
  }

  // Rule badges, on each region's first square in reading order.
  const badges = board.regions.map((reg, i) => {
    const text = label(reg);
    if (!text) return null;
    const [r, c] = [...reg.indices].sort((a, b) => a[0] - b[0] || a[1] - b[1])[0];
    const bw = 14 + text.length * 11;
    return (
      <g key={`badge-${i}`}>
        <rect x={x(c) + 3} y={y(r) + 3} width={bw} height={24} rx={7} fill="#ffffff" stroke={INK} strokeWidth={1.5} />
        <text
          x={x(c) + 3 + bw / 2}
          y={y(r) + 15.5}
          textAnchor="middle"
          dominantBaseline="central"
          fill={INK}
          style={{ font: "700 16px var(--font-mono-code), ui-monospace, monospace" }}
        >
          {text}
        </text>
      </g>
    );
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={ariaLabel}>
      <style>{`
        @keyframes pips-drop { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
        .pips-domino { transform-box: fill-box; transform-origin: center; animation: pips-drop 280ms ease-out both; }
        @media (prefers-reduced-motion: reduce) { .pips-domino { animation: none; } }
      `}</style>

      {/* squares */}
      {cells.map((cell) => {
        const i = regionIndex.get(k(cell));
        return (
          <rect
            key={k(cell)}
            x={x(cell[1]) + 1}
            y={y(cell[0]) + 1}
            width={CELL - 2}
            height={CELL - 2}
            rx={6}
            fill={i === undefined ? EMPTY_FILL : regionFill[i]}
          />
        );
      })}
      <path d={borders.join("")} stroke={INK} strokeWidth={3} strokeLinecap="round" fill="none" opacity={0.75} />

      {!numerals && badges}

      {/* placed dominoes */}
      {board.solution.map(([a, b], i) => {
        if (!placedSet.has(i)) return null;
        const left = Math.min(a[1], b[1]);
        const top = Math.min(a[0], b[0]);
        const horizontal = a[0] === b[0];
        const w = (horizontal ? 2 : 1) * CELL - 10;
        const h = (horizontal ? 1 : 2) * CELL - 10;
        const halves: [PipsCell, number][] = [[a, board.dominoes[i][0]], [b, board.dominoes[i][1]]];
        return (
          <g key={`domino-${i}`} className="pips-domino">
            <rect x={x(left) + 5} y={y(top) + 5} width={w} height={h} rx={10} fill="#ffffff" stroke={INK} strokeWidth={2.5} />
            {horizontal ? (
              <line x1={x(left) + CELL} y1={y(top) + 12} x2={x(left) + CELL} y2={y(top) + CELL - 12} stroke={INK} strokeWidth={1.5} opacity={0.5} />
            ) : (
              <line x1={x(left) + 12} y1={y(top) + CELL} x2={x(left) + CELL - 12} y2={y(top) + CELL} stroke={INK} strokeWidth={1.5} opacity={0.5} />
            )}
            {numerals
              ? halves.map(([[r, c], n]) => (
                  <text
                    key={`${r}-${c}`}
                    x={x(c) + 40}
                    y={y(r) + 40}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={INK}
                    style={{ font: "700 22px var(--font-mono-code), ui-monospace, monospace" }}
                  >
                    {n}
                  </text>
                ))
              : halves.flatMap(([[r, c], n]) =>
                  PIP_LAYOUT[n].map(([pr, pc], j) => (
                    <circle key={`${r}-${c}-${j}`} cx={x(c) + 18 + pc * 12} cy={y(r) + 18 + pr * 12} r={4.5} fill={INK} />
                  ))
                )}
          </g>
        );
      })}

      {numerals && badges}

      {/* hint highlight */}
      {cells
        .filter((c) => highlightSet.has(k(c)))
        .map((c) => (
          <rect
            key={`hl-${k(c)}`}
            x={x(c[1]) + 3}
            y={y(c[0]) + 3}
            width={CELL - 6}
            height={CELL - 6}
            rx={8}
            fill="none"
            stroke={HIGHLIGHT}
            strokeWidth={5}
          />
        ))}
    </svg>
  );
}
