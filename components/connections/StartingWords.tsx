/** The puzzle's 16 words in alphabetical order — the same words players
 *  see on the board, without the grouping, so it isn't a spoiler. */
export default function StartingWords({ words }: { words: string[] }) {
  const sorted = [...words].sort((a, b) => a.localeCompare(b));
  return (
    <div
      className="grid gap-1.5"
      style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}
    >
      {sorted.map((w) => (
        <span
          key={w}
          className="flex min-h-[2.75rem] items-center justify-center rounded-lg border border-border bg-card px-1 text-center font-mono text-[11px] font-bold uppercase leading-tight text-foreground sm:text-xs"
        >
          {w}
        </span>
      ))}
    </div>
  );
}
