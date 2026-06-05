/** Official NYT Connections difficulty colours (hex, used via inline style
 *  so Tailwind's JIT purge never drops dynamic classes). */
export const CONN_COLORS = {
  yellow: { bg: "#eab308", soft: "rgba(234,179,8,0.14)", text: "#1a1505" },
  green: { bg: "#22a06b", soft: "rgba(34,160,107,0.14)", text: "#052015" },
  blue: { bg: "#3b82f6", soft: "rgba(59,130,246,0.14)", text: "#04132e" },
  purple: { bg: "#9333ea", soft: "rgba(147,51,234,0.14)", text: "#1f052e" },
} as const;

export type ConnColor = keyof typeof CONN_COLORS;
