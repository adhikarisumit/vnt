import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { hotels } from '@/content/hotels';
import { venues } from '@/content/dining';
import { locales } from '@/lib/i18n';

const staticPaths = [
  '',
  '/company',
  '/business',
  '/hotels',
  '/dining',
  '/retail',
  '/reservation',
  '/contact',
  '/news',
  '/recruit',
  '/privacy',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticPaths,
    ...hotels.map((h) => `/hotels/${h.slug}`),
    ...venues.map((v) => `/dining/${v.slug}`),
  ];

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${site.url}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === '' ? ('weekly' as const) : ('monthly' as const),
      priority: path === '' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`])),
      },
    })),
  );
}
