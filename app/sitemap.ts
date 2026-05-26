import { getSitemapEntries } from '@/lib/sitemap'
import { MetadataRoute } from 'next'

export const revalidate = 86400

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return getSitemapEntries()
}
