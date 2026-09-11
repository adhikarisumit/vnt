import type { L10n } from '@/lib/i18n';

export const site = {
  name: 'VNT GROUP',
  legalName: { ja: 'VNT株式会社', en: 'VNT Co., Ltd.' } satisfies L10n,
  url: 'https://vntgroup.co.jp',
  tagline: {
    ja: '越えて、つなげて、世界へ',
    en: 'Beyond. Connected. To the World.',
  } satisfies L10n,
  description: {
    ja: 'VNT株式会社は、ホテル・飲食・健康食品をはじめとする輸出入事業など、多角的に展開する総合商社です。多様な事業を通じて、人々の暮らしに健やかな未来を届けることを目指しています。',
    en: 'VNT Co., Ltd. is a diversified trading company spanning hotels, dining, health foods and import/export. Through every business we work to deliver a healthier future to people’s daily lives.',
  } satisfies L10n,
  address: {
    postal: '〒231-0058',
    ja: '神奈川県横浜市中区弥生町2-15-1 ストークタワー大通り公園III',
    en: 'Stork Tower Odori Koen III, 2-15-1 Yayoicho, Naka-ku, Yokohama, Kanagawa',
  },
  tel: '0120-202-684',
  telGroup: '080-4097-9552',
  fax: '+81-45-341-3456',
  email: 'info@vntgroup.co.jp',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6501.145455687335!2d139.629868!3d35.440613!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60185dfe98960019%3A0x59202d0fd4a3126f!2z44K544OI44O844Kv44K_44Ov44O85aSn6YCa44KK5YWs5ZyS77yT!5e0!3m2!1sen!2sjp!4v1748839726463!5m2!1sen!2sjp',
} as const;

export type NavItem = {
  href: string;
  label: L10n;
  /** Short English word shown alongside the label in the overlay menu. */
  index: string;
  children?: { href: string; label: L10n }[];
};

export const navigation: NavItem[] = [
  {
    href: '/company',
    index: '01',
    label: { ja: '会社概要', en: 'Company' },
  },
  {
    href: '/business',
    index: '02',
    label: { ja: '事業内容', en: 'Business' },
  },
  {
    href: '/hotels',
    index: '03',
    label: { ja: 'ホテル', en: 'Hotels' },
    children: [
      { href: '/hotels/fuji', label: { ja: 'Fuji Premium Hotel', en: 'Fuji Premium Hotel' } },
      { href: '/hotels/nagoya', label: { ja: 'Nagoya Premium Hotel', en: 'Nagoya Premium Hotel' } },
      { href: '/hotels/toji', label: { ja: 'Premium Toji', en: 'Premium Toji' } },
    ],
  },
  {
    href: '/dining',
    index: '04',
    label: { ja: '飲食・物販', en: 'Dining & Retail' },
    children: [
      { href: '/dining/geisyatei', label: { ja: '芸者亭', en: 'Geisha-tei' } },
      { href: '/dining/warakutei-yakiniku', label: { ja: '和楽亭 極上和牛', en: 'Warakutei Yakiniku' } },
      { href: '/dining/warakutei-yakitori', label: { ja: '和楽亭 焼き鳥居酒屋', en: 'Warakutei Yakitori' } },
      { href: '/retail', label: { ja: 'イケガミストア', en: 'Ikegami Store' } },
    ],
  },
  {
    href: '/reservation',
    index: '05',
    label: { ja: '団体予約', en: 'Reservations' },
  },
  {
    href: '/contact',
    index: '06',
    label: { ja: 'お問い合わせ', en: 'Contact' },
  },
];

export type FooterLink = { href: string; label: L10n };

/**
 * Footer contents, item for item as on the live site. Headings stay in
 * English in both locales, as the original has them.
 */
export const footerNav: {
  group: { title: string; links: FooterLink[] };
  hotels: { title: string; links: FooterLink[] };
  food: { title: string; links: FooterLink[] };
  corporate: FooterLink[];
} = {
  group: {
    title: 'VNT GROUP',
    links: [
      { href: '/business#product', label: { ja: '商品企画・製造販売', en: 'Product Planning & Manufacturing' } },
      { href: '/hotels', label: { ja: 'ホテル事業', en: 'Hotels' } },
      { href: '/dining', label: { ja: '飲食店事業', en: 'Dining' } },
      { href: '/business#trade', label: { ja: '輸入出', en: 'Import & Export' } },
      { href: '/business#overseas', label: { ja: '海外進出支援', en: 'Overseas Expansion Support' } },
      { href: '/business#tourism', label: { ja: '観光支援', en: 'Tourism Support' } },
    ],
  },
  hotels: {
    title: 'PREMIUM HOTEL',
    links: [
      { href: '/hotels/fuji', label: { ja: 'Fuji Premium Hotel', en: 'Fuji Premium Hotel' } },
      { href: '/hotels/nagoya', label: { ja: 'Nagoya Premium Hotel', en: 'Nagoya Premium Hotel' } },
      { href: '/hotels/toji', label: { ja: 'Premium Toji', en: 'Premium Toji' } },
    ],
  },
  food: {
    title: 'FOOD & SHOP',
    links: [
      { href: '/dining/geisyatei', label: { ja: '芸者亭', en: 'Geisha-tei' } },
      // One entry for both Warakutei rooms, as on the original; the hub lists both.
      { href: '/dining', label: { ja: '和楽亭（焼肉、焼鳥）', en: 'Warakutei (Yakiniku, Yakitori)' } },
      { href: '/retail', label: { ja: 'イケガミストア', en: 'Ikegami Store' } },
    ],
  },
  corporate: [
    { href: '/contact', label: { ja: 'お問い合せ', en: 'Contact' } },
    { href: '/recruit', label: { ja: '採用情報', en: 'Careers' } },
    { href: '/company', label: { ja: '会社概要', en: 'Company' } },
  ],
};
