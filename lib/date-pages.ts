import { cache } from "react";
import dateConfig from "@/data/date-pages.json";
import { getAllConnections } from "@/lib/connections-daily";
import {
  getSpellingBeeByDate,
  getSpellingBeeTodayDateString,
} from "@/lib/spelling-bee-daily";
import { getAllStrands } from "@/lib/strands-daily";
import { getPuzzleByDate } from "@/lib/wordle-daily";
import type { ConnectionsPuzzle } from "@/types/connections";
import type { StrandsPuzzle } from "@/types/strands";

/**
 * Per-date pages for Connections and Strands (/connections-answers/[date],
 * /strands-answers/[date]). They only exist from the start dates in
 * data/date-pages.json onward — history before that stays on the archive
 * hubs. Everything reads through the released-only accessors, so a
 * prefetched (tomorrow's) puzzle never gets a page early.
 */

export const CONNECTIONS_DATE_PAGES_START: string = dateConfig.connections;
export const STRANDS_DATE_PAGES_START: string = dateConfig.strands;

/** Connections puzzles that have a date page, oldest first. */
export const getConnectionsDatePages = cache((): ConnectionsPuzzle[] =>
  getAllConnections().filter((p) => p.date >= CONNECTIONS_DATE_PAGES_START)
);

/** Strands puzzles that have a date page, oldest first. */
export const getStrandsDatePages = cache((): StrandsPuzzle[] =>
  getAllStrands().filter((p) => p.date >= STRANDS_DATE_PAGES_START)
);

export function hasConnectionsDatePage(date: string): boolean {
  return getConnectionsDatePages().some((p) => p.date === date);
}

export function hasStrandsDatePage(date: string): boolean {
  return getStrandsDatePages().some((p) => p.date === date);
}

export interface DateLink {
  date: string;
  id: number;
  href: string;
}

export interface DatePageNeighbors {
  prev: DateLink | null;
  next: DateLink | null;
  /** The most recent date pages (newest first), current one included. */
  recent: DateLink[];
}

function neighbors<T extends { date: string; id: number }>(
  pages: T[],
  date: string,
  base: string
): DatePageNeighbors {
  const link = (p: T): DateLink => ({
    date: p.date,
    id: p.id,
    href: `${base}/${p.date}`,
  });
  const i = pages.findIndex((p) => p.date === date);
  return {
    prev: i > 0 ? link(pages[i - 1]) : null,
    next: i >= 0 && i < pages.length - 1 ? link(pages[i + 1]) : null,
    recent: pages.slice(-7).reverse().map(link),
  };
}

export function getConnectionsNeighbors(date: string): DatePageNeighbors {
  return neighbors(getConnectionsDatePages(), date, "/connections-answers");
}

export function getStrandsNeighbors(date: string): DatePageNeighbors {
  return neighbors(getStrandsDatePages(), date, "/strands-answers");
}

/** The 7 newest Connections date pages, newest first (for the hub). */
export function getLatestConnectionsDateLinks(): DateLink[] {
  const pages = getConnectionsDatePages();
  return neighbors(pages, pages.at(-1)?.date ?? "", "/connections-answers")
    .recent;
}

/** The 7 newest Strands date pages, newest first (for the hub). */
export function getLatestStrandsDateLinks(): DateLink[] {
  const pages = getStrandsDatePages();
  return neighbors(pages, pages.at(-1)?.date ?? "", "/strands-answers").recent;
}

export interface AlsoOnLink {
  game: string;
  label: string;
  href: string;
}

/** The other daily games for the same date, linked to their best page. */
export function getAlsoOnDate(date: string): AlsoOnLink[] {
  const links: AlsoOnLink[] = [];

  const wordle = getPuzzleByDate(date);
  if (wordle) {
    links.push({
      game: "wordle",
      label: `Wordle #${wordle.id}`,
      href: `/wordle-hint/${date}`,
    });
  }

  const connections = getConnectionsDatePages().find((p) => p.date === date);
  if (connections) {
    links.push({
      game: "connections",
      label: `Connections #${connections.id}`,
      href: `/connections-answers/${date}`,
    });
  }

  const strands = getStrandsDatePages().find((p) => p.date === date);
  if (strands) {
    links.push({
      game: "strands",
      label: `Strands #${strands.id}`,
      href: `/strands-answers/${date}`,
    });
  }

  // Spelling Bee rolls over at 3 AM ET; its archive pages exclude "today".
  const beeToday = getSpellingBeeTodayDateString();
  if (getSpellingBeeByDate(date)) {
    links.push({
      game: "spelling-bee",
      label: "Spelling Bee",
      href:
        date < beeToday
          ? `/spelling-bee-answers/${date}`
          : "/spelling-bee-answers",
    });
  }

  return links;
}

/** "Monday, October 26, 2026" */
export function formatLongDate(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** "Oct 26, 2026" */
export function formatShortDate(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
