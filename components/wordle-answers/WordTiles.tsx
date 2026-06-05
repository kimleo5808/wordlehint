import { cn } from "@/lib/utils";

const SIZES = {
  sm: "h-7 w-7 text-xs rounded-[3px]",
  md: "h-9 w-9 text-sm rounded-[4px]",
  lg: "h-12 w-12 text-xl rounded-[5px] sm:h-14 sm:w-14 sm:text-2xl",
} as const;

/**
 * The signature Wordle-green letter tiles, reused across the archive:
 * list rows, the week strip, and the revealed spoiler state.
 */
export function WordTiles({
  word,
  size = "sm",
  className,
}: {
  word: string;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  return (
    <span
      className={cn("inline-flex gap-1", className)}
      role="img"
      aria-label={word.toUpperCase()}
    >
      {word
        .toUpperCase()
        .split("")
        .map((ch, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={cn(
              "inline-flex items-center justify-center bg-wordle-correct font-mono font-bold uppercase leading-none text-white",
              SIZES[size]
            )}
          >
            {ch}
          </span>
        ))}
    </span>
  );
}
