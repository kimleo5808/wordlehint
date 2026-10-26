#!/usr/bin/env node

/**
 * generate-date-page-images.mjs
 *
 * 1. Per-date Open Graph images for /connections-answers/[date] and
 *    /strands-answers/[date] → public/og/{connections,strands}/<date>.png.
 *    Runs before every `next build` (see package.json) and is gitignored.
 *    Only released dates (<= today, ET) from data/date-pages.json on get an
 *    image; any other PNG in those folders is deleted so a stale file can
 *    never expose a future date. Images carry no answers: puzzle number,
 *    date, colour bars (Connections) or the public letter board + theme
 *    clue (Strands).
 * 2. With --static: the "color fingerprint" explainer used on the
 *    Connections date pages → public/images/connections-answers/ (committed).
 *
 * Usage: node scripts/generate-date-page-images.mjs [--static]
 */

import sharp from "sharp";
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { toEasternDate } from "./lib/daily-updater.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const W = 1200;
const H = 630;

const GREEN = "#22a06b";
const YELLOW = "#eab308";
const BLUE = "#3b82f6";
const PURPLE = "#9333ea";
const LEVEL_COLORS = [YELLOW, GREEN, BLUE, PURPLE];
const FONT = "Arial, 'DejaVu Sans', 'Liberation Sans', sans-serif";
const MONO = "'Courier New', 'DejaVu Sans Mono', 'Liberation Mono', monospace";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const readJson = (rel) => JSON.parse(readFileSync(join(ROOT, rel), "utf-8"));

function longDate(date) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Word-wrap to <= maxChars per line, at most `max` lines. */
function wrap(text, maxChars, max = 2) {
  const lines = [];
  let cur = "";
  for (const w of String(text).split(/\s+/)) {
    if ((cur + " " + w).trim().length > maxChars && cur) {
      lines.push(cur.trim());
      cur = w;
    } else {
      cur = (cur + " " + w).trim();
    }
  }
  if (cur) lines.push(cur);
  if (lines.length > max) {
    lines.length = max;
    lines[max - 1] = lines[max - 1].replace(/\s*\S*$/, "") + "…";
  }
  return lines;
}

function tile(x, y, s, fill, letter) {
  const rect = `<rect x="${x}" y="${y}" width="${s}" height="${s}" rx="${Math.round(s * 0.12)}" fill="${fill}"/>`;
  if (!letter) return rect;
  return `${rect}<text x="${x + s / 2}" y="${y + s / 2}" font-family="${FONT}" font-weight="800" font-size="${s * 0.5}" fill="#fff" text-anchor="middle" dominant-baseline="central">${letter}</text>`;
}

/** Same wordmark and frame as scripts/generate-og-images.mjs. */
function frame(accent, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0f172a"/>
        <stop offset="1" stop-color="#1e293b"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect x="0" y="0" width="12" height="${H}" fill="${accent}"/>
    ${tile(64, 56, 40, GREEN, "W")}
    ${tile(110, 56, 40, YELLOW, "H")}
    <text x="166" y="76" font-family="${FONT}" font-weight="800" font-size="30" fill="#fff" dominant-baseline="middle">WordleHint</text>
    <text x="64" y="${H - 56}" font-family="${FONT}" font-weight="700" font-size="26" fill="#64748b">wordlehint.info</text>
    ${body}
  </svg>`;
}

function heading(kicker, number, date) {
  return `
    <text x="64" y="186" font-family="${FONT}" font-weight="700" font-size="26" letter-spacing="4" fill="#94a3b8">${esc(kicker)}</text>
    <text x="64" y="300" font-family="${FONT}" font-weight="800" font-size="120" fill="#fff">#${number}</text>
    <text x="64" y="362" font-family="${FONT}" font-weight="600" font-size="38" fill="#e2e8f0">${esc(longDate(date))}</text>`;
}

function connectionsCard(p) {
  // Solved-board silhouette: one colour per row, no words.
  const s = 68;
  const gap = 10;
  const size = s * 4 + gap * 3;
  const x0 = W - 72 - size;
  const y0 = (H - size) / 2 + 10;
  let grid = "";
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      grid += tile(x0 + c * (s + gap), y0 + r * (s + gap), s, LEVEL_COLORS[r]);
    }
  }
  return frame(
    PURPLE,
    `${heading("NYT CONNECTIONS", p.id, p.date)}
    <text x="64" y="420" font-family="${FONT}" font-weight="500" font-size="30" fill="#94a3b8">Hints, answers &amp; word history</text>
    ${grid}`
  );
}

function strandsCard(p) {
  // The public 6×8 letter board (shown in-game, not a spoiler).
  const s = 40;
  const gap = 6;
  const bw = s * 6 + gap * 5;
  const bh = s * 8 + gap * 7;
  const x0 = W - 72 - bw;
  const y0 = (H - bh) / 2 + 10;
  let board = "";
  p.board.forEach((row, r) => {
    row.split("").forEach((ch, c) => {
      const x = x0 + c * (s + gap);
      const y = y0 + r * (s + gap);
      board += `<rect x="${x}" y="${y}" width="${s}" height="${s}" rx="20" fill="#334155"/>
        <text x="${x + s / 2}" y="${y + s / 2}" font-family="${MONO}" font-weight="700" font-size="21" fill="#e2e8f0" text-anchor="middle" dominant-baseline="central">${esc(ch.toUpperCase())}</text>`;
    });
  });
  const clue = wrap(`“${p.clue}”`, 30)
    .map(
      (ln, i) =>
        `<text x="64" y="${424 + i * 40}" font-family="${FONT}" font-weight="600" font-size="32" fill="${YELLOW}">${esc(ln)}</text>`
    )
    .join("");
  return frame(BLUE, `${heading("NYT STRANDS", p.id, p.date)}${clue}${board}`);
}

const PIPS_FILLS = ["#fde68a", "#bbf7d0", "#bfdbfe", "#fbcfe8", "#ddd6fe", "#fed7aa", "#a5f3fc", "#e9d5ff"];

function pipsCard(p) {
  // The Hard board's regions without any dominoes — the empty puzzle, as
  // players see it before solving, so no spoiler.
  const b = p.hard;
  const cells = b.solution.flat();
  const rows = Math.max(...cells.map((c) => c[0])) + 1;
  const cols = Math.max(...cells.map((c) => c[1])) + 1;
  const s = Math.min(46, Math.floor(380 / Math.max(rows, cols)));
  const x0 = W - 72 - cols * s;
  const y0 = (H - rows * s) / 2 + 10;
  let colour = 0;
  let board = "";
  for (const r of b.regions) {
    const fill = r.type === "empty" ? "#475569" : PIPS_FILLS[colour++ % PIPS_FILLS.length];
    for (const [row, col] of r.indices) {
      board += `<rect x="${x0 + col * s + 2}" y="${y0 + row * s + 2}" width="${s - 4}" height="${s - 4}" rx="6" fill="${fill}"/>`;
    }
  }
  return frame(
    "#f97316",
    `${heading("NYT PIPS", p.id, p.date)}
    <text x="64" y="420" font-family="${FONT}" font-weight="500" font-size="30" fill="#94a3b8">Easy, Medium &amp; Hard solutions</text>
    ${board}`
  );
}

async function renderDatePages(game, file, startKey, card) {
  const start = readJson("data/date-pages.json")[startKey];
  const today = toEasternDate();
  const puzzles = readJson(`data/${file}`).puzzles.filter(
    (p) => p.date >= start && p.date <= today
  );
  const dir = join(ROOT, "public", "og", game);
  mkdirSync(dir, { recursive: true });

  const keep = new Set(puzzles.map((p) => `${p.date}.png`));
  for (const name of readdirSync(dir)) {
    if (!keep.has(name)) unlinkSync(join(dir, name));
  }
  for (const p of puzzles) {
    await sharp(Buffer.from(card(p))).png().toFile(join(dir, `${p.date}.png`));
  }
  console.log(`✅ og/${game}/: ${puzzles.length} images (${start} → ${today})`);
}

/* ---------------- static explainer (--static) ---------------- */

const CREAM = "#F5F1E8";
const INK = "#1A1814";
const MID = "#3A3631";
const SUBTLE = "#6B6660";

function fingerprintExplainer() {
  const today = toEasternDate();
  const all = readJson("data/connections-daily.json").puzzles.filter(
    (p) => p.date <= today
  );
  const counts = new Map();
  for (const p of all)
    for (const g of p.groups)
      for (const w of g.words) {
        const c = counts.get(w) ?? [0, 0, 0, 0];
        c[g.level]++;
        counts.set(w, c);
      }
  const top = [...counts.entries()]
    .map(([w, c]) => [w, c, c.reduce((a, b) => a + b, 0)])
    .sort((a, b) => b[2] - a[2])
    .slice(0, 2);

  const EH = 640;
  const barX = 330;
  const barW = 600;
  const NAMES = ["yellow", "green", "blue", "purple"];
  // One takeaway per example row, both computed from the data.
  const noteFor = (idx, c, total) => {
    const used = c.filter(Boolean).length;
    const top = c.indexOf(Math.max(...c));
    if (idx === 0) {
      return used === 4
        ? "Seen in all four colors: the more colors, the better the trap"
        : `Seen in ${used} of the four colors so far`;
    }
    return `The longest segment is its usual group: ${NAMES[top]} (${c[top]} of ${total})`;
  };
  const row = (y, idx, word, c, total) => {
    const note = noteFor(idx, c, total);
    let x = barX;
    let segs = "";
    let labels = "";
    ["Y", "G", "B", "P"].forEach((l, i) => {
      if (!c[i]) return;
      const w = (c[i] / total) * barW;
      segs += `<rect x="${x}" y="${y}" width="${w}" height="34" fill="${LEVEL_COLORS[i]}"/>`;
      labels += `<text x="${x + w / 2}" y="${y + 58}" font-family="${MONO}" font-weight="700" font-size="19" fill="${MID}" text-anchor="middle">${l} ${c[i]}</text>`;
      x += w;
    });
    return `
      <text x="80" y="${y + 25}" font-family="${MONO}" font-weight="700" font-size="34" fill="${INK}">${esc(word)}</text>
      <rect x="${barX}" y="${y}" width="${barW}" height="34" rx="17" fill="#E4DDCC"/>
      <clipPath id="clip-${idx}"><rect x="${barX}" y="${y}" width="${barW}" height="34" rx="17"/></clipPath>
      <g clip-path="url(#clip-${idx})">${segs}</g>
      ${labels}
      <text x="${barX + barW + 24}" y="${y + 25}" font-family="${MONO}" font-weight="700" font-size="24" fill="${INK}">${total}×</text>
      <text x="80" y="${y + 92}" font-family="${FONT}" font-size="19" fill="${SUBTLE}">${esc(note)}</text>`;
  };
  const lastDate = all[all.length - 1].date;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${EH}" viewBox="0 0 ${W} ${EH}">
    <rect width="${W}" height="${EH}" fill="${CREAM}"/>
    <rect x="40" y="40" width="${W - 80}" height="${EH - 80}" fill="none" stroke="${MID}" stroke-width="1.5" stroke-dasharray="6 6"/>
    <text x="80" y="118" font-family="${FONT}" font-weight="800" font-size="46" fill="${INK}">Reading a color fingerprint</text>
    <text x="80" y="160" font-family="${FONT}" font-size="22" fill="${MID}">Each bar splits a word's earlier Connections appearances by group color.</text>
    ${row(196, 0, top[0][0], top[0][1], top[0][2])}
    ${row(316, 1, top[1][0], top[1][1], top[1][2])}
    <text x="80" y="461" font-family="${MONO}" font-weight="700" font-size="34" fill="${INK}">NEW WORD</text>
    <rect x="${barX}" y="436" width="${barW}" height="34" rx="17" fill="none" stroke="${SUBTLE}" stroke-width="2" stroke-dasharray="8 6"/>
    <text x="80" y="506" font-family="${FONT}" font-size="19" fill="${SUBTLE}">Dashed bar: the word's first appearance in Connections</text>
    <text x="80" y="${EH - 66}" font-family="${FONT}" font-size="18" fill="${SUBTLE}">Data: ${all.length.toLocaleString("en-US")} NYT Connections puzzles, June 2023 to ${esc(longDate(lastDate).replace(/^\w+, /, ""))} · wordlehint.info</text>
  </svg>`;
}

async function main() {
  await renderDatePages("connections", "connections-daily.json", "connections", connectionsCard);
  await renderDatePages("strands", "strands-daily.json", "strands", strandsCard);
  await renderDatePages("pips", "pips-daily.json", "pips", pipsCard);

  if (process.argv.includes("--static")) {
    const dir = join(ROOT, "public", "images", "connections-answers");
    mkdirSync(dir, { recursive: true });
    const out = join(dir, "color-fingerprint.png");
    await sharp(Buffer.from(fingerprintExplainer())).png().toFile(out);
    console.log(`✅ ${existsSync(out) ? "images/connections-answers/color-fingerprint.png" : "?"}`);
  }
}

main().catch((err) => {
  console.error("❌ Date-page image generation failed:", err.message);
  process.exit(1);
});
