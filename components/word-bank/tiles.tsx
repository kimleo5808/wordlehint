import { cn } from "@/lib/utils";

export type TileState = "correct" | "present" | "absent" | "blank";

const STATE_CLASS: Record<TileState, string> = {
  correct: "bg-wordle-correct text-white border-transparent",
  present: "bg-wordle-present text-white border-transparent",
  absent: "bg-wordle-absent text-white border-transparent",
  blank: "bg-muted text-foreground border-border",
};

const SIZE_CLASS = {
  xs: "h-6 w-6 text-[11px] rounded",
  sm: "h-8 w-8 text-sm rounded-md",
  md: "h-10 w-10 text-lg rounded-md",
  lg: "h-12 w-12 text-2xl rounded-lg",
} as const;

export type TileSize = keyof typeof SIZE_CLASS;

/** A single Wordle tile. Decorative wrapper around a real character. */
export function Tile({
  letter,
  state = "blank",
  size = "sm",
  className,
}: {
  letter?: string;
  state?: TileState;
  size?: TileSize;
  className?: string;
}) {
  return (
    <span
      aria-hidden={!letter}
      className={cn(
        "inline-flex items-center justify-center border-2 font-mono font-bold uppercase leading-none",
        SIZE_CLASS[size],
        STATE_CLASS[state],
        className
      )}
    >
      {letter ?? ""}
    </span>
  );
}

/**
 * A row of tiles spelling a word. By default the first tile is "correct"
 * (green) to echo the page's locked first letter; pass `plain` to render all
 * tiles neutral. The word text stays selectable for accessibility + SEO.
 */
export function TileWord({
  word,
  size = "sm",
  highlightFirst = true,
  highlightLast = false,
  plain = false,
  className,
}: {
  word: string;
  size?: TileSize;
  highlightFirst?: boolean;
  /** Green the last tile instead of the first (for ending-letter pages). */
  highlightLast?: boolean;
  plain?: boolean;
  className?: string;
}) {
  const gap = size === "xs" ? "gap-0.5" : "gap-1";
  const letters = word.split("");
  return (
    <span className={cn("inline-flex", gap, className)}>
      {letters.map((ch, i) => {
        const highlighted = plain
          ? false
          : highlightLast
            ? i === letters.length - 1
            : highlightFirst && i === 0;
        return (
          <Tile
            key={i}
            letter={ch}
            size={size}
            state={highlighted ? "correct" : "blank"}
          />
        );
      })}
    </span>
  );
}

/**
 * A 5-cell pattern like S _ _ _ E where only some positions are filled.
 * `filled` maps position index -> letter; empty positions render blank tiles.
 */
export function TilePattern({
  filled,
  size = "sm",
}: {
  filled: Record<number, string>;
  size?: TileSize;
}) {
  return (
    <span className="inline-flex gap-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <Tile
          key={i}
          letter={filled[i]}
          size={size}
          state={filled[i] ? "correct" : "blank"}
        />
      ))}
    </span>
  );
}
