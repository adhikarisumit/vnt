import type { L10n } from '@/lib/i18n';

export type NewsItem = {
  slug: string;
  date: string; // ISO
  category: L10n;
  title: L10n;
  body: L10n;
  image?: string;
};

/**
 * Announcements. The live site's news list is empty, so this ships empty and
 * the page shows its empty state. Add real entries newest-first once the
 * client supplies them — kept as data so the list can move to a CMS later.
 */
export const news: NewsItem[] = [];
