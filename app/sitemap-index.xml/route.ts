import { siteConfig } from '@/config/site'
import { getLatestSitemapLastModified, getSitemapEntries } from '@/lib/sitemap'

export const revalidate = 86400

function formatDate(date: Date): string {
  return date.toISOString()
}

export async function GET(): Promise<Response> {
  const entries = await getSitemapEntries()
  const lastModified = getLatestSitemapLastModified(entries)

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteConfig.url}/sitemap-main.xml</loc>
    <lastmod>${formatDate(lastModified)}</lastmod>
  </sitemap>
</sitemapindex>
`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=3600',
    },
  })
}
