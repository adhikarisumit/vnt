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
 * Announcements. Kept as data so the list can move to a CMS later without
 * touching the page — add entries newest-first.
 */
export const news: NewsItem[] = [
  {
    slug: 'premium-toji-open',
    date: '2025-04-01',
    category: { ja: 'ホテル', en: 'Hotels' },
    title: {
      ja: '世界遺産・東寺の目の前に「PREMIUM TOJI」が開業しました',
      en: 'PREMIUM TOJI has opened directly opposite Toji Temple',
    },
    body: {
      ja: '客室数を15室に限定したスモールホテルとして、京都・東寺の目の前に開業いたしました。南側の客室からは五重塔を望むことができます。',
      en: 'A fifteen-room hotel has opened directly across from Toji in Kyoto. South-facing rooms look onto the five-storey pagoda.',
    },
    image: '/images/toji/toji-04.webp',
  },
  {
    slug: 'ikegami-fujiyoshida',
    date: '2024-12-01',
    category: { ja: '物販', en: 'Retail' },
    title: {
      ja: 'イケガミストア 富士吉田店の開店を準備しています',
      en: 'Ikegami Store Fujiyoshida is in preparation',
    },
    body: {
      ja: '山梨県富士吉田市下吉田に、免税対応のドラッグストア2号店の開店準備を進めております。',
      en: 'We are preparing to open our second tax-free drugstore, in Shimoyoshida, Fujiyoshida, Yamanashi.',
    },
    image: '/images/ikegami/store-01.webp',
  },
];
