"use client";

import { WORD_LISTS } from "@/data/wordle-words";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link as I18nLink } from "@/i18n/routing";

type CellColor = "empty" | "correct" | "present" | "absent";

type Cell = {
  letter: string;
  color: CellColor;
};

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const WORD_LENGTHS = [4, 5, 6, 7, 8, 9, 10, 11];

function nextColor(color: CellColor): CellColor {
  switch (color) {
    case "empty":
      return "correct";
    case "correct":
      return "present";
    case "present":
      return "absent";
    case "absent":
      return "empty";
  }
}

function cellColorClass(color: CellColor, hasLetter: boolean): string {
  switch (color) {
    case "correct":
      return "border-green-500 bg-green-500 text-white";
    case "present":
      return "border-yellow-500 bg-yellow-500 text-white";
    case "absent":
      return "border-slate-600 bg-slate-600 text-white";
    default:
      return hasLetter
        ? "border-slate-400 bg-transparent text-foreground dark:border-slate-500"
        : "border-slate-300 bg-transparent dark:border-slate-700";
  }
}

export default function WordleSolver() {
  const [wordLength, setWordLength] = useState(5);
  const [cells, setCells] = useState<Cell[]>(() =>
    Array.from({ length: 5 }, () => ({ letter: "", color: "empty" as CellColor }))
  );
  const [absentLetters, setAbsentLetters] = useState<Set<string>>(new Set());
  const [focusedCell, setFocusedCell] = useState(0);
  const [showAll, setShowAll] = useState(false);

  // Reset when word length changes
  useEffect(() => {
    setCells(
      Array.from({ length: wordLength }, () => ({
        letter: "",
        color: "empty" as CellColor,
      }))
    );
    setAbsentLetters(new Set());
    setFocusedCell(0);
    setShowAll(false);
  }, [wordLength]);

  // Filter words based on constraints
  const results = useMemo(() => {
    const words = WORD_LISTS[wordLength] || [];

    // Collect constraints from cells
    const greens: { pos: number; letter: string }[] = [];
    const yellows: { pos: number; letter: string }[] = [];
    const cellAbsent: Set<string> = new Set();

    // Track letters that are green or yellow to avoid false absent filtering
    const knownLetters = new Set<string>();

    for (let i = 0; i < cells.length; i++) {
      const { letter, color } = cells[i];
      if (!letter) continue;
      if (color === "correct") {
        greens.push({ pos: i, letter });
        knownLetters.add(letter);
      } else if (color === "present") {
        yellows.push({ pos: i, letter });
        knownLetters.add(letter);
      } else if (color === "absent") {
        cellAbsent.add(letter);
      }
    }

    // Combine absent letters from keyboard and gray cells
    const allAbsent = new Set([...absentLetters, ...cellAbsent]);
    // Remove letters that are also known (green/yellow) — handles duplicate letter scenarios
    for (const l of knownLetters) {
      allAbsent.delete(l);
    }

    // No constraints set — don't show anything
    if (greens.length === 0 && yellows.length === 0 && allAbsent.size === 0) {
      return [];
    }

    return words.filter((word) => {
      // Check green constraints
      for (const g of greens) {
        if (word[g.pos] !== g.letter) return false;
      }
      // Check yellow constraints
      for (const y of yellows) {
        if (!word.includes(y.letter)) return false;
        if (word[y.pos] === y.letter) return false;
      }
      // Check absent constraints
      for (const a of allAbsent) {
        if (word.includes(a)) return false;
      }
      return true;
    });
  }, [cells, absentLetters, wordLength]);

  const toggleAbsent = useCallback((letter: string) => {
    setAbsentLetters((prev) => {
      const next = new Set(prev);
      if (next.has(letter)) {
        next.delete(letter);
      } else {
        next.add(letter);
      }
      return next;
    });
  }, []);

  const handleCellClick = useCallback(
    (index: number) => {
      if (cells[index].letter) {
        // Cycle color
        setCells((prev) => {
          const next = [...prev];
          next[index] = { ...next[index], color: nextColor(next[index].color) };
          return next;
        });
      } else {
        setFocusedCell(index);
      }
    },
    [cells]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();

      if (key === "BACKSPACE") {
        e.preventDefault();
        setCells((prev) => {
          const next = [...prev];
          // Clear current cell or go back
          if (next[focusedCell].letter) {
            next[focusedCell] = { letter: "", color: "empty" };
          } else if (focusedCell > 0) {
            next[focusedCell - 1] = { letter: "", color: "empty" };
            setFocusedCell(focusedCell - 1);
          }
          return next;
        });
        return;
      }

      if (key === "TAB") {
        // Let tab work normally for a11y
        return;
      }

      if (/^[A-Z]$/.test(key)) {
        e.preventDefault();
        setCells((prev) => {
          const next = [...prev];
          next[focusedCell] = { letter: key, color: next[focusedCell].color === "empty" ? "empty" : next[focusedCell].color };
          return next;
        });
        if (focusedCell < wordLength - 1) {
          setFocusedCell(focusedCell + 1);
        }
      }
    },
    [focusedCell, wordLength]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const clearAll = () => {
    setCells(
      Array.from({ length: wordLength }, () => ({
        letter: "",
        color: "empty" as CellColor,
      }))
    );
    setAbsentLetters(new Set());
    setFocusedCell(0);
    setShowAll(false);
  };

  // Letters used in green/yellow cells (for keyboard display)
  const usedInCells = useMemo(() => {
    const green = new Set<string>();
    const yellow = new Set<string>();
    for (const c of cells) {
      if (!c.letter) continue;
      if (c.color === "correct") green.add(c.letter);
      else if (c.color === "present") yellow.add(c.letter);
    }
    return { green, yellow };
  }, [cells]);

  const displayedResults = showAll ? results : results.slice(0, 100);

  const cellSize =
    wordLength <= 5
      ? "w-14 h-14 text-2xl sm:w-16 sm:h-16"
      : wordLength <= 7
        ? "w-11 h-11 text-xl sm:w-14 sm:h-14"
        : wordLength <= 9
          ? "w-9 h-9 text-lg sm:w-12 sm:h-12"
          : "w-8 h-8 text-base sm:w-10 sm:h-10";

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Word Length Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-sm font-medium text-muted-foreground mr-1">
          Letters:
        </span>
        {WORD_LENGTHS.map((n) => (
          <button
            key={n}
            onClick={() => setWordLength(n)}
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold transition-colors ${
              n === wordLength
                ? "bg-blue-600 text-white shadow-md"
                : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Instructions */}
      <p className="max-w-md text-center text-sm text-muted-foreground">
        Type letters into the cells, then click a cell to cycle its color:
        <span className="mx-1 inline-block h-3 w-3 rounded-sm bg-green-500 align-middle" /> correct,
        <span className="mx-1 inline-block h-3 w-3 rounded-sm bg-yellow-500 align-middle" /> wrong spot,
        <span className="mx-1 inline-block h-3 w-3 rounded-sm bg-slate-600 align-middle" /> not in word.
        Use the keyboard below to mark absent letters.
      </p>

      {/* Input Grid */}
      <div className="flex gap-1.5">
        {cells.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleCellClick(i)}
            className={`${cellSize} flex items-center justify-center rounded-md border-2 font-heading font-bold uppercase transition-all duration-200 cursor-pointer ${cellColorClass(cell.color, !!cell.letter)} ${
              i === focusedCell && !cell.letter
                ? "ring-2 ring-blue-500 ring-offset-1 dark:ring-offset-black"
                : ""
            }`}
            aria-label={`Position ${i + 1}${cell.letter ? `, letter ${cell.letter}, ${cell.color}` : ", empty"}`}
          >
            {cell.letter}
          </button>
        ))}
      </div>

      {/* Absent Letters Keyboard */}
      <div className="flex flex-col gap-1.5">
        <p className="text-center text-xs font-medium text-muted-foreground">
          Click letters to mark as absent (gray)
        </p>
        {KEYBOARD_ROWS.map((row, ri) => (
          <div key={ri} className="flex justify-center gap-1">
            {row.map((key) => {
              const isAbsent = absentLetters.has(key);
              const isGreen = usedInCells.green.has(key);
              const isYellow = usedInCells.yellow.has(key);

              return (
                <button
                  key={key}
                  onClick={() => toggleAbsent(key)}
                  className={`flex h-10 w-8 items-center justify-center rounded-md text-sm font-semibold transition-colors sm:w-10 ${
                    isGreen
                      ? "bg-green-500 text-white"
                      : isYellow
                        ? "bg-yellow-500 text-white"
                        : isAbsent
                          ? "bg-slate-600 text-slate-400"
                          : "bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                  }`}
                  aria-label={`${key}${isAbsent ? ", absent" : isGreen ? ", correct" : isYellow ? ", present" : ""}`}
                >
                  {key}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Clear button */}
      <button
        onClick={clearAll}
        className="rounded-lg border border-blue-500/30 px-5 py-2 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
      >
        Clear All
      </button>

      {/* Results */}
      <div className="w-full max-w-2xl">
        {results.length > 0 ? (
          <>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold text-foreground">
                Matching Words
              </h3>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                {results.length} {results.length === 1 ? "word" : "words"}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
              {displayedResults.map((word) => (
                <div
                  key={word}
                  className="rounded-lg border border-blue-100 bg-card px-3 py-2 text-center text-sm font-mono font-semibold tracking-wider text-foreground dark:border-blue-900/40"
                >
                  {word}
                </div>
              ))}
            </div>
            {results.length > 100 && !showAll && (
              <button
                onClick={() => setShowAll(true)}
                className="mt-4 w-full rounded-lg border border-blue-200 py-2 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20"
              >
                Show all {results.length} words
              </button>
            )}
          </>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-muted-foreground dark:border-slate-700">
            {cells.some((c) => c.letter) || absentLetters.size > 0 ? (
              <p className="font-medium">No matching words found. Try adjusting your constraints.</p>
            ) : (
              <p className="font-medium">
                Enter your Wordle results above to find matching words.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="mt-4 w-full max-w-2xl border-t border-blue-100 pt-6 dark:border-blue-900/40">
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          Or play a game:
        </p>
        <div className="flex flex-wrap gap-2">
          {WORD_LENGTHS.map((n) => (
            <I18nLink
              key={n}
              href={`/${n}-letters`}
              prefetch={false}
              className="rounded-lg border border-blue-100 bg-card px-4 py-2 text-sm font-semibold text-blue-600 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-blue-900/40 dark:text-blue-400 dark:hover:border-blue-700/60"
            >
              {n}-Letter Wordle
            </I18nLink>
          ))}
        </div>
      </div>
    </div>
  );
}
