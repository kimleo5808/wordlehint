#!/usr/bin/env node

/**
 * generate-og-images.mjs
 *
 * Renders branded 1200×630 Open Graph share images (one per key page) from
 * SVG via sharp, into public/og/*.png. Re-run after changing copy/design.
 *
 * Usage: node scripts/generate-og-images.mjs
 */

import sharp from "sharp";
import { mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "og");
mkdirSync(OUT_DIR, { recursive: true });

const W = 1200;
const H = 630;

// Palette
const GREEN = "#22a06b";
const YELLOW = "#eab308";
const BLUE = "#3b82f6";
const PURPLE = "#9333ea";
const GRAY = "#3a3a3c";
const FONT = "Arial, 'DejaVu Sans', 'Liberation Sans', sans-serif";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Word-wrap a title to <= maxChars per line, max 2 lines. */
function wrap(title, maxChars = 20) {
  const words = title.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > maxChars && cur) {
      lines.push(cur.trim());
      cur = w;
    } else {
      cur = (cur + " " + w).trim();
    }
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 2);
}

function tile(x, y, s, fill, letter) {
  const r = Math.round(s * 0.12);
  const rect = `<rect x="${x}" y="${y}" width="${s}" height="${s}" rx="${r}" fill="${fill}"/>`;
  if (!letter) return rect;
  return `${rect}<text x="${x + s / 2}" y="${y + s / 2}" font-family="${FONT}" font-weight="800" font-size="${s * 0.5}" fill="#fff" text-anchor="middle" dominant-baseline="central">${letter}</text>`;
}

/** The WordleHint wordmark (top-left): small W/H tile + name. */
function logo() {
  return `
    <g>
      ${tile(64, 56, 40, GREEN, "W")}
      ${tile(110, 56, 40, YELLOW, "H")}
      <text x="166" y="76" font-family="${FONT}" font-weight="800" font-size="30" fill="#fff" dominant-baseline="middle">WordleHint</text>
    </g>`;
}

/** Trio motif (blog cover): one emblem per game, in a row bottom-right. */
function trioMotif() {
  const y = H - 64 - 96;
  // Wordle: two stacked tiles
  let s = tile(W - 64 - 96, y, 96, GREEN, "W");
  // Connections: 2×2 grid
  const cs = 44;
  const cg = 8;
  const cx = W - 64 - 96 - 40 - cs * 2 - cg;
  const cy = y;
  const cols = [YELLOW, GREEN, BLUE, PURPLE];
  cols.forEach((col, i) => {
    const x = cx + (i % 2) * (cs + cg);
    const yy = cy + Math.floor(i / 2) * (cs + cg);
    s += `<rect x="${x}" y="${yy}" width="${cs}" height="${cs}" rx="8" fill="${col}"/>`;
  });
  // Strands: yellow pill + blue pill
  const sx = cx - 40 - 150;
  s += `<rect x="${sx}" y="${y + 14}" width="150" height="32" rx="8" fill="${YELLOW}"/>`;
  s += `<rect x="${sx + 20}" y="${y + 54}" width="110" height="28" rx="8" fill="${BLUE}"/>`;
  return s;
}

/** 3-colour left bar for the blog cover. */
function trioBar() {
  const seg = H / 3;
  return [GREEN, PURPLE, YELLOW]
    .map((c, i) => `<rect x="0" y="${i * seg}" width="12" height="${seg}" fill="${c}"/>`)
    .join("");
}

/** Per-game motif drawn bottom-right. */
function motif(kind) {
  if (kind === "trio") return trioMotif();
  if (kind === "connections") {
    // 2×2 difficulty colour grid
    const c = [YELLOW, GREEN, BLUE, PURPLE];
    let s = "";
    const size = 92;
    const gap = 16;
    const x0 = W - 64 - size * 2 - gap;
    const y0 = H - 64 - size * 2 - gap;
    c.forEach((col, i) => {
      const x = x0 + (i % 2) * (size + gap);
      const y = y0 + Math.floor(i / 2) * (size + gap);
      s += `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="14" fill="${col}"/>`;
    });
    return s;
  }
  if (kind === "strands") {
    // a yellow spangram chip + blue theme chips
    const y = H - 116;
    return `
      <rect x="${W - 64 - 360}" y="${y}" width="360" height="44" rx="10" fill="${YELLOW}"/>
      <text x="${W - 64 - 180}" y="${y + 22}" font-family="${FONT}" font-weight="800" font-size="22" fill="#1a1505" text-anchor="middle" dominant-baseline="central">SPANGRAM</text>
      <rect x="${W - 64 - 250}" y="${y + 56}" width="118" height="40" rx="10" fill="${BLUE}"/>
      <rect x="${W - 64 - 124}" y="${y + 56}" width="124" height="40" rx="10" fill="${BLUE}"/>`;
  }
  // wordle: a row of tiles
  const letters = kind === "solver" ? ["S", "O", "L", "V", "E"] : ["S", "L", "A", "T", "E"];
  const colors = [GREEN, GREEN, YELLOW, GRAY, GREEN];
  const size = 88;
  const gap = 12;
  const total = size * 5 + gap * 4;
  const x0 = W - 64 - total;
  const y0 = H - 64 - size;
  let s = "";
  letters.forEach((l, i) => {
    s += tile(x0 + i * (size + gap), y0, size, colors[i], l);
  });
  return s;
}

function card({ title, subtitle, kind, accent }) {
  const lines = wrap(title, 20);
  const titleSvg = lines
    .map(
      (ln, i) =>
        `<text x="64" y="${250 + i * 86}" font-family="${FONT}" font-weight="800" font-size="76" fill="#fff">${esc(ln)}</text>`
    )
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0f172a"/>
        <stop offset="1" stop-color="#1e293b"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    ${kind === "trio" ? trioBar() : `<rect x="0" y="0" width="12" height="${H}" fill="${accent}"/>`}
    ${logo()}
    ${titleSvg}
    <text x="64" y="${250 + lines.length * 86 + 6}" font-family="${FONT}" font-weight="500" font-size="32" fill="#94a3b8">${esc(subtitle)}</text>
    <text x="64" y="${H - 56}" font-family="${FONT}" font-weight="700" font-size="26" fill="#64748b">wordlehint.info</text>
    ${motif(kind)}
  </svg>`;
}

const PAGES = [
  { file: "wordle-answers", title: "Past Wordle Answers", subtitle: "Every answer with definitions · updated daily", kind: "wordle", accent: GREEN },
  { file: "todays-wordle-answer", title: "Today's Wordle Answer", subtitle: "Spoiler-safe reveal with its definition", kind: "wordle", accent: GREEN },
  { file: "yesterdays-wordle-answer", title: "Yesterday's Wordle Answer", subtitle: "The full solution, meaning, and hints", kind: "wordle", accent: GREEN },
  { file: "best-wordle-starting-words", title: "Best Wordle Starting Words", subtitle: "Ranked by real answer data", kind: "wordle", accent: GREEN },
  { file: "wordle-solver", title: "Wordle Solver & Word Finder", subtitle: "Find every matching word · real answers flagged", kind: "solver", accent: GREEN },
  { file: "connections-hint-today", title: "Connections Hint Today", subtitle: "Spoiler-safe hints, revealed step by step", kind: "connections", accent: PURPLE },
  { file: "connections-answers", title: "NYT Connections Archive", subtitle: "Every past answer, searchable", kind: "connections", accent: PURPLE },
  { file: "strands-hint-today", title: "Strands Hint Today", subtitle: "Spangram and theme-word hints", kind: "strands", accent: YELLOW },
  { file: "strands-answers", title: "NYT Strands Archive", subtitle: "Past answers and spangrams", kind: "strands", accent: YELLOW },
  // Blog cover (all three games) — also emit an .svg source.
  { file: "blog-best-daily-word-game-hint-sites", title: "Best Daily Word Game Hint Sites", subtitle: "Wordle · Connections · Strands", kind: "trio", accent: GREEN, svg: true },
];

async function main() {
  for (const p of PAGES) {
    const svg = card(p);
    await sharp(Buffer.from(svg)).png().toFile(join(OUT_DIR, `${p.file}.png`));
    if (p.svg) writeFileSync(join(OUT_DIR, `${p.file}.svg`), svg, "utf-8");
    console.log(`✅ og/${p.file}.png${p.svg ? " (+ .svg)" : ""}`);
  }
  console.log(`Done — ${PAGES.length} OG images in public/og/`);
}

main().catch((err) => {
  console.error("❌ OG generation failed:", err.message);
  process.exit(1);
});
