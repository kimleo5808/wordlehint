"use client";

import { useState } from "react";

export default function ChallengeCopy({
  text,
  label,
  sourceVisible = false,
}: {
  text: string;
  label: string;
  sourceVisible?: boolean;
}) {
  const [state, setState] = useState<"idle" | "copied" | "manual">("idle");
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("manual");
    }
  }
  return (
    <div className="cw-copy">
      <button type="button" className="cw-btn" onClick={() => void copy()}>
        {label}
      </button>
      <span role="status">
        {state === "copied"
          ? "Copied."
          : state === "manual"
            ? "Select the text and copy it manually."
            : ""}
      </span>
      {(sourceVisible || state === "manual") && (
        <textarea
          readOnly
          rows={sourceVisible ? 2 : 5}
          aria-label={sourceVisible ? "Challenge link" : "Shareable result"}
          value={text}
          onFocus={(event) => event.currentTarget.select()}
        />
      )}
    </div>
  );
}
