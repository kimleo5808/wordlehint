import { getBeeWordIndex } from "@/lib/bee-word-history-index";

export const dynamic = "force-static";

export function GET() {
  return Response.json(getBeeWordIndex(), {
    headers: { "X-Robots-Tag": "noindex", "Cache-Control": "public, max-age=0, must-revalidate" },
  });
}
