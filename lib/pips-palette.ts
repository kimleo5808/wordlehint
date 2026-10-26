import type { PipsBoard } from "@/types/pips";

/**
 * Region colours for our Pips boards (our own palette, not NYT's). Shared by
 * the SVG board and the text answers, so "the pink 10" in the text is the
 * pink region on the board. Keep in sync with PIPS_FILLS in
 * scripts/generate-date-page-images.mjs.
 */
export const REGION_COLOURS: { fill: string; name: string }[] = [
  { fill: "#fde68a", name: "yellow" },
  { fill: "#bbf7d0", name: "green" },
  { fill: "#bfdbfe", name: "blue" },
  { fill: "#fbcfe8", name: "pink" },
  { fill: "#ddd6fe", name: "violet" },
  { fill: "#fed7aa", name: "orange" },
  { fill: "#a5f3fc", name: "cyan" },
  { fill: "#e9d5ff", name: "lilac" },
];

export const EMPTY_COLOUR = { fill: "#e5e7eb", name: "grey" };

/** Colour of each region, in board.regions order. Empty regions are grey;
 *  the others cycle through the palette in region order. */
export function regionColours(board: PipsBoard): { fill: string; name: string }[] {
  let n = 0;
  return board.regions.map((r) =>
    r.type === "empty" ? EMPTY_COLOUR : REGION_COLOURS[n++ % REGION_COLOURS.length]
  );
}
