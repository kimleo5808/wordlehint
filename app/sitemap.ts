import { siteConfig } from '@/config/site'
import { getPosts } from '@/lib/getBlogs'
import { GUIDE_SLUGS } from '@/data/guides'
import { getAllPuzzles } from '@/lib/wordle-daily'
import { MetadataRoute } from 'next'

const siteUrl = siteConfig.url

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' | undefined

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
  const dailyPuzzles = getAllPuzzles()
  const puzzleModifiedDates = dailyPuzzles.map(p => new Date(`${p.date}T12:00:00Z`))
  const latestPuzzleModified = puzzleModifiedDates.length > 0
    ? new Date(Math.max(...puzzleModifiedDates.map(d => d.getTime())))
    : new Date('2024-01-01T00:00:00Z')

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

  const pages = staticPages.map(page => ({
    url: `${siteUrl}${page}`,
    lastModified: siteLastModified,
    changeFrequency: (page === '' || page === '/wordle-hint-today' ? 'daily' : 'weekly') as ChangeFrequency,
    priority: priorityMap[page] ?? 0.8,
  }))

  const puzzlePages = dailyPuzzles.map(p => ({
    url: `${siteUrl}/wordle-hint/${p.date}`,
    lastModified: new Date(`${p.date}T12:00:00Z`),
    changeFrequency: 'monthly' as ChangeFrequency,
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
    changeFrequency: 'weekly' as ChangeFrequency,
    priority: 0.7,
  }

  const guidePages = GUIDE_SLUGS.map(slug => ({
    url: `${siteUrl}/guides/${slug}`,
    lastModified: siteLastModified,
    changeFrequency: 'monthly' as ChangeFrequency,
    priority: 0.6,
  }))

  const blogIndex = {
    url: `${siteUrl}/blog`,
    lastModified: latestBlogModified,
    changeFrequency: 'daily' as ChangeFrequency,
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
        changeFrequency: 'weekly' as ChangeFrequency,
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
