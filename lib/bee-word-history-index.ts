import { cache } from "react";
import { getArchiveSpellingBee } from "@/lib/spelling-bee-daily";
import type { BeeWordIndex } from "./bee-word-history";

export const getBeeWordIndex = cache((): BeeWordIndex => {
  const appearances: BeeWordIndex["appearances"] = Object.create(null);
  const hives: BeeWordIndex["hives"] = [];
  const seen = new Set<string>();
  // The archive is newest first and excludes both the active and prefetched hive.
  for (const puzzle of getArchiveSpellingBee()) {
    if (seen.has(puzzle.date)) continue;
    seen.add(puzzle.date);
    const id = hives.length;
    hives.push({
      date: puzzle.date,
      center: puzzle.centerLetter.toUpperCase(),
      letters: [puzzle.centerLetter, ...puzzle.outerLetters].join("").toUpperCase(),
      pangrams: puzzle.pangrams.map((word) => word.toUpperCase()),
    });
    for (const word of new Set(puzzle.answers.map((w) => w.toUpperCase()))) {
      (appearances[word] ??= []).push(id);
    }
  }
  return { hives, appearances };
});
