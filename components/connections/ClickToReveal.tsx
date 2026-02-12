"use client";

import type { ConnectionsPuzzle } from "@/types/connections";
import { Eye } from "lucide-react";
import { useState } from "react";

const GROUP_BG = [
  "bg-yellow-400 text-yellow-900",
  "bg-emerald-500 text-white",
  "bg-blue-400 text-white",
  "bg-purple-500 text-white",
];

interface ClickToRevealProps {
  puzzle: ConnectionsPuzzle;
}

export function ClickToReveal({ puzzle }: ClickToRevealProps) {
  const [revealed, setRevealed] = useState(false);

  if (!revealed) {
    return (
      <button
        onClick={() => setRevealed(true)}
        className="group flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-blue-500/25"
      >
        <Eye className="h-4 w-4" />
        Click to reveal the answer
      </button>
    );
  }

  const sorted = [...puzzle.answers].sort((a, b) => a.level - b.level);

  return (
    <div className="space-y-2">
      {sorted.map((group) => (
        <div
          key={group.level}
          className={`rounded-lg px-4 py-3 text-center ${GROUP_BG[group.level] || GROUP_BG[0]}`}
        >
          <p className="text-xs font-bold uppercase tracking-wider opacity-80">
            {group.group}
          </p>
          <p className="mt-1 text-sm font-bold">
            {group.members.join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
}
