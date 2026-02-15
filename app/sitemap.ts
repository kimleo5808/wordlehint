import { siteConfig } from '@/config/site'
import { getPosts } from '@/lib/getBlogs'
import { GUIDE_SLUGS } from '@/data/guides'
import { getAllPuzzles } from '@/lib/wordle-daily'
import { MetadataRoute } from 'next'
import fs from 'fs/promises'
import matter from 'gray-matter'
import path from 'path'

const siteUrl = siteConfig.url
export const revalidate = 86400

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' | undefined
type LastModifiedKind = 'site' | 'puzzle' | 'blog' | 'legal' | 'about' | 'contact'

const FALLBACK_LAST_MODIFIED = new Date('2024-01-01T00:00:00Z')
const STATIC_CONTENT_LAST_MODIFIED = new Date('2026-02-13T00:00:00Z')
const DEFAULT_DAILY_PUZZLE_LOOKBACK_DAYS = 365
const DEFAULT_DAILY_PUZZLE_MAX_URLS = 5000

const staticPageRules: Record<string, { changeFrequency: ChangeFrequency; lastModifiedKind: LastModifiedKind }> = {
  '': { changeFrequency: 'daily', lastModifiedKind: 'puzzle' },
  '/wordle-hint-today': { changeFrequency: 'daily', lastModifiedKind: 'puzzle' },
  '/wordle-hint': { changeFrequency: 'daily', lastModifiedKind: 'puzzle' },
  '/how-to-play-wordle': { changeFrequency: 'monthly', lastModifiedKind: 'site' },
  '/wordle-hint-faq': { changeFrequency: 'monthly', lastModifiedKind: 'site' },
  '/wordle-solver': { changeFrequency: 'monthly', lastModifiedKind: 'site' },
  '/about': { changeFrequency: 'yearly', lastModifiedKind: 'about' },
  '/contact': { changeFrequency: 'yearly', lastModifiedKind: 'contact' },
  '/privacy-policy': { changeFrequency: 'yearly', lastModifiedKind: 'legal' },
  '/terms-of-service': { changeFrequency: 'yearly', lastModifiedKind: 'legal' },
}

function resolveStaticLastModified(kind: LastModifiedKind, dates: {
  site: Date
  puzzle: Date
  blog: Date
  legal: Date
  about: Date
  contact: Date
}): Date {
  switch (kind) {
    case 'puzzle':
      return dates.puzzle
    case 'blog':
      return dates.blog
    case 'legal':
      return dates.legal
    case 'about':
      return dates.about
    case 'contact':
      return dates.contact
    case 'site':
    default:
      return dates.site
  }
}

function parsePositiveInt(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? '', 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

async function getContentLastUpdated(contentDirName: string, fallback: Date): Promise<Date> {
  const contentPath = path.join(process.cwd(), 'content', contentDirName, 'en.mdx')
  try {
    const mdx = await fs.readFile(contentPath, 'utf-8')
    const frontmatter = matter(mdx).data as { lastUpdated?: string | Date }
    if (!frontmatter.lastUpdated) return fallback

    const date = frontmatter.lastUpdated instanceof Date
      ? frontmatter.lastUpdated
      : new Date(frontmatter.lastUpdated)

    return Number.isNaN(date.getTime()) ? fallback : date
  } catch {
    return fallback
  }
}

function getRecentDailyPuzzles(
  puzzles: Array<{ date: string }>,
  limitDays: number,
  maxUrls: number
) {
  const cutoffDate = new Date()
  cutoffDate.setUTCDate(cutoffDate.getUTCDate() - limitDays)

  return puzzles
    .filter(puzzle => {
      const puzzleDate = new Date(`${puzzle.date}T00:00:00Z`)
      return !Number.isNaN(puzzleDate.getTime()) && puzzleDate >= cutoffDate
    })
    .slice(-maxUrls)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dailyPuzzleLookbackDays = parsePositiveInt(
    process.env.SITEMAP_PUZZLE_LOOKBACK_DAYS,
    DEFAULT_DAILY_PUZZLE_LOOKBACK_DAYS
  )
  const dailyPuzzleMaxUrls = parsePositiveInt(
    process.env.SITEMAP_PUZZLE_MAX_URLS,
    DEFAULT_DAILY_PUZZLE_MAX_URLS
  )

  const staticPages = [
    '',
    '/wordle-hint-today',
    '/wordle-hint',
    '/how-to-play-wordle',
    '/wordle-hint-faq',
    '/wordle-solver',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
  ]

  const priorityMap: Record<string, number> = {
    '': 1.0,
    '/wordle-hint-today': 0.95,
    '/wordle-hint': 0.8,
    '/how-to-play-wordle': 0.9,
    '/wordle-solver': 0.9,
  }

  // Daily puzzle hint pages
  const allPuzzles = getAllPuzzles()
  const dailyPuzzles = getRecentDailyPuzzles(allPuzzles, dailyPuzzleLookbackDays, dailyPuzzleMaxUrls)
  const puzzleModifiedDates = allPuzzles
    .map(p => new Date(`${p.date}T12:00:00Z`))
    .filter(date => !Number.isNaN(date.getTime()))
  const latestPuzzleModified = puzzleModifiedDates.length > 0
    ? new Date(Math.max(...puzzleModifiedDates.map(d => d.getTime())))
    : FALLBACK_LAST_MODIFIED

  // Blog pages
  const { posts } = await getPosts('en')
  const blogModifiedDates = posts
    .map(post => (post.date ? new Date(post.date) : null))
    .filter((date): date is Date => Boolean(date && !Number.isNaN(date.getTime())))
  const latestBlogModified = blogModifiedDates.length > 0
    ? new Date(Math.max(...blogModifiedDates.map(d => d.getTime())))
    : latestPuzzleModified
  const siteLastModified = new Date(
    Math.max(latestPuzzleModified.getTime(), latestBlogModified.getTime())
  )
  const [aboutLastModified, privacyLastModified, termsLastModified] = await Promise.all([
    getContentLastUpdated('about', STATIC_CONTENT_LAST_MODIFIED),
    getContentLastUpdated('privacy-policy', STATIC_CONTENT_LAST_MODIFIED),
    getContentLastUpdated('terms-of-service', STATIC_CONTENT_LAST_MODIFIED),
  ])

  const pages = staticPages.map(page => {
    const rule = staticPageRules[page] ?? { changeFrequency: 'monthly' as ChangeFrequency, lastModifiedKind: 'site' as LastModifiedKind }
    return {
      url: `${siteUrl}${page}`,
      lastModified: resolveStaticLastModified(rule.lastModifiedKind, {
        site: siteLastModified,
        puzzle: latestPuzzleModified,
        blog: latestBlogModified,
        legal: new Date(Math.max(privacyLastModified.getTime(), termsLastModified.getTime())),
        about: aboutLastModified,
        contact: aboutLastModified,
      }),
      changeFrequency: rule.changeFrequency,
      priority: priorityMap[page] ?? 0.8,
    }
  })

  const puzzlePages = dailyPuzzles.map(p => ({
    url: `${siteUrl}/wordle-hint/${p.date}`,
    lastModified: new Date(`${p.date}T12:00:00Z`),
    changeFrequency: 'yearly' as ChangeFrequency,
    priority: 0.6,
  }))

  // Letter game pages (4-11 letters)
  const letterGamePages = [4, 5, 6, 7, 8, 9, 10, 11].map(n => ({
    url: `${siteUrl}/${n}-letters`,
    lastModified: latestPuzzleModified,
    changeFrequency: 'weekly' as ChangeFrequency,
    priority: n === 5 ? 0.9 : 0.7,
  }))

  // Guides pages
  const guidesIndex = {
    url: `${siteUrl}/guides`,
    lastModified: siteLastModified,
    changeFrequency: 'monthly' as ChangeFrequency,
    priority: 0.7,
  }

  const guidePages = GUIDE_SLUGS.map(slug => ({
    url: `${siteUrl}/guides/${slug}`,
    lastModified: siteLastModified,
    changeFrequency: 'yearly' as ChangeFrequency,
    priority: 0.6,
  }))

  const blogIndex = {
    url: `${siteUrl}/blog`,
    lastModified: latestBlogModified,
    changeFrequency: 'weekly' as ChangeFrequency,
    priority: 0.7,
  }

  const postPages = posts
    .filter(post => Boolean(post.slug))
    .map(post => {
      const normalizedSlug = post.slug.startsWith('/') ? post.slug : `/${post.slug}`
      const postPath = normalizedSlug.startsWith('/blog/')
        ? normalizedSlug
        : `/blog${normalizedSlug}`

      return {
        url: `${siteUrl}${postPath}`,
        lastModified: post.date ? new Date(post.date) : latestBlogModified,
        changeFrequency: 'monthly' as ChangeFrequency,
        priority: 0.6,
      }
    })

  return [
    ...pages,
    ...puzzlePages,
    ...letterGamePages,
    guidesIndex,
    ...guidePages,
    blogIndex,
    ...postPages,
  ]
}
