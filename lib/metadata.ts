import { siteConfig } from '@/config/site'
import { DEFAULT_LOCALE, LOCALE_NAMES, Locale } from '@/i18n/routing'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

type MetadataProps = {
  page?: string
  title?: string
  description?: string
  images?: string[]
  keywords?: string[]
  noIndex?: boolean
  locale: Locale
  path?: string
  canonicalUrl?: string
}

export async function constructMetadata({
  page = 'Home',
  title,
  description,
  images = [],
  keywords = [],
  noIndex = false,
  locale,
  path,
  canonicalUrl,
}: MetadataProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Home' })

  const pageTitle = title || t(`title`)
  const pageDescription = description || t(`description`)
  const brandName = siteConfig.name
  const twitterHandle = siteConfig.creator?.startsWith('@') ? siteConfig.creator : undefined

  const finalTitle = page === 'Home'
    ? pageTitle
    : `${pageTitle} | ${brandName}`

  const imageUrls = images.length > 0
    ? images.map(img => ({
      url: img.startsWith('http') ? img : `${siteConfig.url}/${img}`,
      alt: pageTitle,
    }))
    : [{
      url: `${siteConfig.url}/og.png`,
      alt: pageTitle,
    }]

  const localizedPath = `${locale === DEFAULT_LOCALE ? '' : `/${locale}`}${path || ''}`
  const pageURL = `${siteConfig.url}${localizedPath}`

  const alternateLanguages = Object.keys(LOCALE_NAMES).reduce((acc, lang) => {
    const path = canonicalUrl
      ? `${lang === DEFAULT_LOCALE ? '' : `/${lang}`}${canonicalUrl === '/' ? '' : canonicalUrl}`
      : `${lang === DEFAULT_LOCALE ? '' : `/${lang}`}`
    acc[lang] = `${siteConfig.url}${path}`

    return acc
  }, {} as Record<string, string>)

  return {
    title: finalTitle,
    description: pageDescription,
    keywords: keywords.length > 0 ? keywords : [
      'wordle hint', 'wordle hints', 'wordle hint today',
      'wordle clue today', 'wordle answer today',
      'best wordle starting words', 'wordle strategy',
      '5 letter words', 'wordle help', 'wordle tips',
    ],
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl ? `${siteConfig.url}${locale === DEFAULT_LOCALE ? '' : `/${locale}`}${canonicalUrl === '/' ? '' : canonicalUrl}` : undefined,
      languages: alternateLanguages,
    },
    openGraph: {
      type: 'website',
      title: finalTitle,
      description: pageDescription,
      url: pageURL,
      siteName: siteConfig.name,
      locale: locale,
      images: imageUrls,
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: pageDescription,
      site: twitterHandle,
      images: imageUrls,
      creator: twitterHandle,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
  }
}
