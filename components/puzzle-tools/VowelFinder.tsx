"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { displayPuzzleDate } from "@/lib/bee-word-history";
import { trackToolOnce } from "./analytics";

export interface VowellessWord {
  word: string;
  guess: boolean;
  common: boolean;
  dates: string[];
}

const pools = ["All", "Common", "Past answers"] as const;
type Pool = (typeof pools)[number];

function inPool(entry: VowellessWord, pool: Pool) {
  if (pool === "Past answers") return entry.dates.length > 0;
  return pool === "Common" ? entry.common : entry.guess;
}

export default function VowelFinder({
  words,
  earliestPage,
}: {
  words: VowellessWord[];
  earliestPage: string;
}) {
  const [pool, setPool] = useState<Pool>("All");
  const [tiles, setTiles] = useState<string[]>(Array(5).fill(""));
  const [excluded, setExcluded] = useState("");
  const [noY, setNoY] = useState(false);
  const [example, setExample] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const blocked = "AEIOU" + excluded + (noY ? "Y" : "");
  const conflict = tiles.find((letter) => !!letter && blocked.includes(letter));
  const results = words.filter(
    (entry) =>
      inPool(entry, pool) &&
      ![...entry.word].some((l) => blocked.includes(l)) &&
      tiles.every((l, i) => !l || entry.word[i] === l),
  );

  function changeFilter() {
    setExample(false);
    setExpanded(false);
    trackToolOnce("vowelless_filter_used");
  }
  function reset() {
    setPool("All");
    setTiles(Array(5).fill(""));
    setExcluded("");
    setNoY(false);
    setExpanded(false);
    setExample(false);
  }
  function tryBoard() {
    setPool("Common");
    setTiles(["", "", "Y", "", ""]);
    setExcluded("R");
    setNoY(false);
    setExpanded(false);
    setExample(true);
    trackToolOnce("vowelless_example_completed");
  }
  function enterTiles(start: number, letters: string[]) {
    const next = [...tiles];
    letters.slice(0, 5 - start).forEach((letter, j) => {
      next[start + j] = letter;
    });
    if (next.some((letter, i) => letter !== tiles[i])) {
      setTiles(next);
      changeFilter();
    }
    if (letters.some(Boolean)) inputs.current[Math.min(4, start + letters.length)]?.focus();
  }
  function clearConflict() {
    if (!conflict) return;
    if ("AEIOU".includes(conflict)) setTiles(tiles.map((l) => (l === conflict ? "" : l)));
    else {
      if (conflict === "Y") setNoY(false);
      setExcluded(excluded.replaceAll(conflict, ""));
    }
    changeFilter();
  }
  return (
    <div className="pt-vowel-panel">
      <div className="pt-filter">
        <div className="pt-row">
          <h2 className="pt-panel-title">Filter your board</h2>
          <button className="pt-action" onClick={tryBoard}>
            Try a board
          </button>
        </div>
        <fieldset>
          <legend>Word list</legend>
          <div className="pt-options">
            {pools.map((label) => (
              <label key={label} className="pt-pill">
                <input
                  type="radio"
                  name="word-pool"
                  checked={pool === label}
                  onChange={() => {
                    setPool(label);
                    changeFilter();
                  }}
                />
                <span>
                  {label} {words.filter((w) => inPool(w, label)).length}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Known positions</legend>
          <div className="pt-tiles">
            {tiles.map((letter, i) => (
              <input
                key={i}
                aria-label={`Letter in position ${i + 1}`}
                placeholder="–"
                autoComplete="off"
                ref={(el) => {
                  inputs.current[i] = el;
                }}
                value={letter}
                data-filled={!!letter}
                onFocus={(e) => e.target.select()}
                onChange={(e) =>
                  enterTiles(i, [
                    e.target.value
                      .toUpperCase()
                      .replace(/[^A-Z]/g, "")
                      .slice(-1),
                  ])
                }
                onPaste={(e) => {
                  e.preventDefault();
                  const raw = e.clipboardData.getData("text").trim().toUpperCase();
                  if (!/^[A-Z_.?\s-]+$/.test(raw)) return;
                  const chars = [...raw.replace(/\s/g, "")].map((ch) => (/[A-Z]/.test(ch) ? ch : ""));
                  enterTiles(chars.length === 5 ? 0 : i, chars);
                }}
                onKeyDown={(e) => {
                  const back = e.key === "ArrowLeft" || (e.key === "Backspace" && !letter);
                  if (!back && e.key !== "ArrowRight") return;
                  e.preventDefault();
                  inputs.current[Math.max(0, Math.min(4, i + (back ? -1 : 1)))]?.focus();
                }}
              />
            ))}
          </div>
        </fieldset>
        <div className="pt-row pt-exclude">
          <label>
            Excluded letters
            <input
              aria-label="Excluded letters"
              placeholder="e.g. R"
              value={excluded}
              autoComplete="off"
              onChange={(e) => {
                const letters = [...new Set(e.target.value.toUpperCase().replace(/[^A-Z]/g, ""))].join(
                  "",
                );
                if (letters !== excluded) {
                  setExcluded(letters);
                  changeFilter();
                }
              }}
            />
          </label>
          <label className="pt-check">
            <input
              type="checkbox"
              checked={noY}
              onChange={(e) => {
                setNoY(e.target.checked);
                changeFilter();
              }}
            />
            Exclude Y
          </label>
        </div>
      </div>
      <div className="pt-results">
        <div className="pt-row">
          <h2 className="pt-panel-title" aria-live="polite" aria-atomic="true">
            {results.length} matching {results.length === 1 ? "word" : "words"}
          </h2>
          <button className="pt-action" onClick={reset}>
            Reset
          </button>
        </div>
        <p className="pt-note">
          {example
            ? "Example board · Y in position 3 · R excluded"
            : `${pool === "Common" ? "Common reference list" : pool === "All" ? "Full guess list" : "Documented past answers"} · A, E, I, O and U excluded`}
        </p>
        {conflict ? (
          <p className="pt-message">
            Position {tiles.indexOf(conflict) + 1} contains {conflict}, which is excluded.{" "}
            <button
              className="pt-action"
              onClick={clearConflict}
            >{`Clear ${conflict} ${"AEIOU".includes(conflict) ? "from positions" : "exclusion"}`}</button>
          </p>
        ) : !results.length ? (
          <p className="pt-message">
            No matches with these filters.{" "}
            {pool !== "All" ? (
              <button
                className="pt-action"
                onClick={() => {
                  setPool("All");
                  changeFilter();
                }}
              >
                Search all guesses
              </button>
            ) : (
              "Remove a letter or clear a position to try again."
            )}
          </p>
        ) : null}
        <ul className="pt-word-list">
          {results.map((entry, i) => (
            <li key={entry.word} hidden={!expanded && i >= 6}>
              <strong>{entry.word}</strong>
              {pool === "Past answers" &&
                entry.dates.map((date) =>
                  date >= earliestPage ? (
                    <Link key={date} prefetch={false} href={`/wordle-hint/${date}`}>
                      {displayPuzzleDate(date)}
                    </Link>
                  ) : (
                    <time key={date} dateTime={date}>
                      {displayPuzzleDate(date)}
                    </time>
                  ),
                )}
            </li>
          ))}
        </ul>
        {results.length > 6 && (
          <button className="pt-action" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
            {expanded ? "Show fewer words" : `Show all ${results.length} words`}
          </button>
        )}
      </div>
    </div>
  );
}
