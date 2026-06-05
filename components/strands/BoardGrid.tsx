/** The 6×8 Strands letter board (8 rows of 6). Shown openly — the board is
 *  given to players in-game, so it isn't a spoiler. */
export default function BoardGrid({ board }: { board: string[] }) {
  if (!board.length) return null;
  return (
    // Inline grid-template-columns: this project's Tailwind build doesn't emit
    // grid-cols-6 reliably, so set the 6-column track explicitly.
    <div
      className="mx-auto grid w-fit gap-1.5"
      style={{ gridTemplateColumns: "repeat(6, max-content)" }}
    >
      {board.flatMap((row, r) =>
        row.split("").map((ch, c) => (
          <span
            key={`${r}-${c}`}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card font-mono text-sm font-bold uppercase text-foreground sm:h-10 sm:w-10"
          >
            {ch}
          </span>
        ))
      )}
    </div>
  );
}
