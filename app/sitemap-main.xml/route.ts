import { getSitemapEntries } from '@/lib/sitemap'

export const revalidate = 86400

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function formatLastModified(value: Date | string | undefined): string | null {
  if (!value) return null

  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.getTime()) ? null : date.toISOString()
}

export async function GET(): Promise<Response> {
  const entries = await getSitemapEntries()
  const urls = entries.map(entry => {
    const lastModified = formatLastModified(entry.lastModified)
    const changeFrequency = entry.changeFrequency
    const priority = typeof entry.priority === 'number' ? entry.priority : null

    return `  <url>
    <loc>${escapeXml(entry.url)}</loc>${lastModified ? `
    <lastmod>${lastModified}</lastmod>` : ''}${changeFrequency ? `
    <changefreq>${changeFrequency}</changefreq>` : ''}${priority !== null ? `
    <priority>${priority}</priority>` : ''}
  </url>`
  }).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=3600',
    },
  })
}
