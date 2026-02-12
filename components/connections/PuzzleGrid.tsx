"use client";

import type { ConnectionsGroup, ConnectionsPuzzle } from "@/types/connections";
import { useState } from "react";

const GROUP_STYLES: Record<
  number,
  { bg: string; text: string; headerBg: string }
> = {
  0: {
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    text: "text-yellow-900 dark:text-yellow-200",
    headerBg: "bg-yellow-400 dark:bg-yellow-600",
  },
  1: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    text: "text-emerald-900 dark:text-emerald-200",
    headerBg: "bg-emerald-500 dark:bg-emerald-600",
  },
  2: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-900 dark:text-blue-200",
    headerBg: "bg-blue-400 dark:bg-blue-600",
  },
  3: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-900 dark:text-purple-200",
    headerBg: "bg-purple-500 dark:bg-purple-600",
  },
};

interface PuzzleGridProps {
  puzzle: ConnectionsPuzzle;
  showAnswers?: boolean;
}

export function PuzzleGrid({ puzzle, showAnswers = false }: PuzzleGridProps) {
  const [revealedGroups, setRevealedGroups] = useState<Set<number>>(new Set());

  const allRevealed = showAnswers || revealedGroups.size === 4;

  // Scramble all words if not revealed
  const allWords = puzzle.answers.flatMap((g) => g.members);
  const shuffledWords = !allRevealed
    ? [...allWords].sort(() => 0.5 - Math.random())
    : allWords;

  const toggleGroup = (level: number) => {
    setRevealedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(level)) {
        next.delete(level);
      } else {
        next.add(level);
      }
      return next;
    });
  };

  if (allRevealed) {
    return (
      <div className="space-y-2">
        {puzzle.answers
          .sort((a, b) => a.level - b.level)
          .map((group) => (
            <RevealedGroup key={group.level} group={group} />
          ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Revealed groups at top */}
      {puzzle.answers
        .filter((g) => revealedGroups.has(g.level))
        .sort((a, b) => a.level - b.level)
        .map((group) => (
          <RevealedGroup key={group.level} group={group} />
        ))}

      {/* Scrambled grid */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
        {shuffledWords
          .filter((word) => {
            const group = puzzle.answers.find((g) => g.members.includes(word));
            return group && !revealedGroups.has(group.level);
          })
          .map((word) => (
            <div
              key={word}
              className="flex items-center justify-center rounded-lg bg-zinc-100 px-1 py-3 sm:py-4 text-center font-mono text-[0.65rem] sm:text-xs font-bold uppercase tracking-wide text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 select-none"
            >
              {word}
            </div>
          ))}
      </div>
    </div>
  );
}

function RevealedGroup({ group }: { group: ConnectionsGroup }) {
  const style = GROUP_STYLES[group.level] || GROUP_STYLES[0];
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-lg ${style.bg} py-3 sm:py-4 px-3`}
    >
      <span
        className={`text-xs sm:text-sm font-bold uppercase tracking-wide ${style.text}`}
      >
        {group.group}
      </span>
      <span
        className={`mt-1 text-[0.65rem] sm:text-xs font-mono font-medium ${style.text} opacity-80`}
      >
        {group.members.join(", ")}
      </span>
    </div>
  );
}

export function PuzzleGridStatic({ puzzle }: { puzzle: ConnectionsPuzzle }) {
  return (
    <div className="space-y-2">
      {puzzle.answers
        .sort((a, b) => a.level - b.level)
        .map((group) => (
          <RevealedGroup key={group.level} group={group} />
        ))}
    </div>
  );
}
