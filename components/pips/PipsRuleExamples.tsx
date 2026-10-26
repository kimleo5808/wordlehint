import type { PipsBoard } from "@/types/pips";
import PipsBoardSvg from "./PipsBoardSvg";

/** Small hand-made boards, one per region type, each shown solved. */
const EXAMPLES: { name: string; caption: string; board: PipsBoard }[] = [
  {
    name: "Number",
    caption: "The top region is marked 7, so its two squares add up to 7: a 3 and a 4.",
    board: {
      id: 0, constructors: "",
      dominoes: [[3, 4], [2, 5]],
      regions: [
        { indices: [[0, 0], [0, 1]], type: "sum", target: 7 },
        { indices: [[1, 0], [1, 1]], type: "empty" },
      ],
      solution: [[[0, 0], [0, 1]], [[1, 0], [1, 1]]],
    },
  },
  {
    name: "Equal",
    caption: "Both squares of the left region show 2 — from two different dominoes.",
    board: {
      id: 0, constructors: "",
      dominoes: [[2, 5], [2, 0]],
      regions: [
        { indices: [[0, 0], [1, 0]], type: "equals" },
        { indices: [[0, 1], [1, 1]], type: "empty" },
      ],
      solution: [[[0, 0], [0, 1]], [[1, 0], [1, 1]]],
    },
  },
  {
    name: "Not equal",
    caption: "1, 4 and 6: every square in the top region is a different number.",
    board: {
      id: 0, constructors: "",
      dominoes: [[1, 3], [4, 4], [6, 0]],
      regions: [
        { indices: [[0, 0], [0, 1], [0, 2]], type: "unequal" },
        { indices: [[1, 0], [1, 1], [1, 2]], type: "empty" },
      ],
      solution: [[[0, 0], [1, 0]], [[0, 1], [1, 1]], [[0, 2], [1, 2]]],
    },
  },
  {
    name: "Less than",
    caption: "1 + 2 = 3, which is less than 4. The whole region counts, not each square.",
    board: {
      id: 0, constructors: "",
      dominoes: [[1, 2], [5, 6]],
      regions: [
        { indices: [[0, 0], [0, 1]], type: "less", target: 4 },
        { indices: [[1, 0], [1, 1]], type: "empty" },
      ],
      solution: [[[0, 0], [0, 1]], [[1, 0], [1, 1]]],
    },
  },
  {
    name: "Greater than",
    caption: "5 + 6 = 11, more than 9 — again the region's total.",
    board: {
      id: 0, constructors: "",
      dominoes: [[5, 6], [0, 1]],
      regions: [
        { indices: [[0, 0], [0, 1]], type: "greater", target: 9 },
        { indices: [[1, 0], [1, 1]], type: "empty" },
      ],
      solution: [[[0, 0], [0, 1]], [[1, 0], [1, 1]]],
    },
  },
  {
    name: "Empty",
    caption: "The grey region has no condition, so even a 6–6 fits — but it still has to be covered.",
    board: {
      id: 0, constructors: "",
      dominoes: [[6, 6], [1, 2]],
      regions: [
        { indices: [[0, 0], [0, 1]], type: "empty" },
        { indices: [[1, 0], [1, 1]], type: "sum", target: 3 },
      ],
      solution: [[[0, 0], [0, 1]], [[1, 0], [1, 1]]],
    },
  },
];

export default function PipsRuleExamples() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {EXAMPLES.map((e) => (
        <figure key={e.name} className="rounded-2xl border border-border bg-card p-4">
          <div className="mx-auto max-w-[200px]">
            <PipsBoardSvg
              board={e.board}
              placed={e.board.dominoes.map((_, i) => i)}
              label={`${e.name} region example, solved`}
              numerals
            />
          </div>
          <figcaption className="mt-3">
            <span className="block font-heading text-sm font-bold text-foreground">{e.name}</span>
            <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{e.caption}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
