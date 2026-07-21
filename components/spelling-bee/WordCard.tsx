import { Crown } from "lucide-react";
import type { ScoredWord } from "@/types/spelling-bee";

export default function WordCard({ word }: { word: ScoredWord }) {
  return (
    <li
      className={`relative rounded-lg border px-3 py-2 font-mono text-sm ${
        word.isPangram
          ? "border-wordle-present/70 bg-wordle-present/15 font-bold text-foreground"
          : "border-border bg-card text-foreground"
      }`}
    >
      {word.isPangram && (
        <Crown
          className="absolute -top-2 -right-2 h-4 w-4 text-wordle-present"
          aria-label="Pangram"
        />
      )}
      {word.word.toUpperCase()}
      <span className="absolute bottom-1 right-2 text-[10px] font-semibold tabular-nums text-muted-foreground">
        {word.points}
      </span>
    </li>
  );
}
