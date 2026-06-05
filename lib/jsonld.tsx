import { BASE_URL } from "@/config/site";

/* ------------------------------------------------------------------ */
/*  Generic JSON-LD script tag                                         */
/* ------------------------------------------------------------------ */

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  WebSite schema (use once in layout)                                */
/* ------------------------------------------------------------------ */

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WordleHint",
    url: BASE_URL,
    description:
      "Daily Wordle hints, unlimited free Wordle games from 4 to 11 letters, strategy guides, and best starting words.",
    inLanguage: "en",
  };
}

/* ------------------------------------------------------------------ */
/*  FAQPage schema                                                     */
/* ------------------------------------------------------------------ */

export function faqPageSchema(
  items: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/* ------------------------------------------------------------------ */
/*  HowTo schema                                                       */
/* ------------------------------------------------------------------ */

export function howToSchema(
  name: string,
  description: string,
  steps: { name: string; text: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/* ------------------------------------------------------------------ */
/*  BreadcrumbList schema                                              */
/* ------------------------------------------------------------------ */

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/* ------------------------------------------------------------------ */
/*  VideoGame schema (for /wordle-unlimited)                           */
/*  None of the 10 competitor sites we benchmarked ship this — it      */
/*  is a low-cost differentiation play for richer SERP eligibility.    */
/* ------------------------------------------------------------------ */

export function videoGameSchema({
  name,
  description,
  url,
  image,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name,
    description,
    url,
    image: image || `${BASE_URL}/og.png`,
    applicationCategory: "Game",
    genre: ["Word Game", "Puzzle"],
    playMode: "SinglePlayer",
    gamePlatform: ["Web Browser"],
    operatingSystem: "Any",
    inLanguage: "en",
    isAccessibleForFree: true,
    author: {
      "@type": "Organization",
      name: "WordleHint",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "WordleHint",
      url: BASE_URL,
    },
  };
}

/* ------------------------------------------------------------------ */
/*  SoftwareApplication schema (for tool pages)                        */
/* ------------------------------------------------------------------ */

export function softwareApplicationSchema({
  name,
  description,
  url,
  applicationCategory = "GameApplication",
}: {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    applicationCategory,
    operatingSystem: "Web",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: "WordleHint",
      url: BASE_URL,
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Dataset schema (for the answer archive — aids AI/LLM citation)     */
/* ------------------------------------------------------------------ */

export function datasetSchema({
  name,
  description,
  url,
  dateModified,
  measurementCount,
}: {
  name: string;
  description: string;
  url: string;
  dateModified?: string;
  measurementCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name,
    description,
    url,
    ...(dateModified ? { dateModified } : {}),
    ...(measurementCount
      ? { variableMeasured: `${measurementCount} Wordle answers` }
      : {}),
    isAccessibleForFree: true,
    license: "https://wordlehint.info/terms-of-service",
    creator: {
      "@type": "Organization",
      name: "WordleHint",
      url: BASE_URL,
    },
  };
}

/* ------------------------------------------------------------------ */
/*  ItemList schema (for ranked lists — aids rich results + AI)        */
/* ------------------------------------------------------------------ */

export function itemListSchema(
  name: string,
  items: string[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item,
    })),
  };
}

/* ------------------------------------------------------------------ */
/*  Article schema (for blog posts)                                    */
/* ------------------------------------------------------------------ */

export function articleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  image,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    image: image || `${BASE_URL}/og.png`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: "WordleHint",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "WordleHint",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
  };
}
