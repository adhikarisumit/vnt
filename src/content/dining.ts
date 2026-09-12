import type { L10n } from '@/lib/i18n';

/**
 * Japanese copy is verbatim from the live site. Geisha-tei's English
 * paragraphs are the site's own English; other English is our translation.
 */

export type VenueBlock = {
  eyebrow?: string;
  title?: L10n;
  body: L10n;
  /** The live page prints the English under the Japanese; do the same on ja. */
  bilingual?: boolean;
};

export type Venue = {
  slug: 'geisyatei' | 'warakutei-yakiniku' | 'warakutei-yakitori';
  name: L10n;
  romaji: string;
  area: L10n;
  hero: string;
  youtubeId?: string;
  tagline: L10n;
  /** Block on the dining hub page. */
  hub: { title?: L10n; body: L10n; image: string };
  about: VenueBlock[];
  gallery: string[];
  schedule?: { title: L10n; times: string[]; note: L10n; tel: L10n };
  info: {
    address: L10n;
    /** Printed under the Japanese address on the ja page, as the live site does. */
    addressEnOnJa?: boolean;
    tel?: string;
    telLabel?: L10n;
  };
  mapEmbed: string;
  /** 「団体予約 大歓迎です」 block. Omitted where the live page has none. */
  group?: { note?: L10n };
};

const ARIAKE_ADDRESS: L10n = {
  ja: '〒135-0063 東京都江東区有明３丁目５−７ 3F',
  en: '3F, 3-5-7 Ariake, Koto-ku, Tokyo 135-0063',
};

const ARIAKE_MAP =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4045.0749363228365!2d139.7859992765223!3d35.63226687260294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601889ef32e86155%3A0x6b5d7a2f1661cd03!2zVE9D5pyJ5piO!5e1!3m2!1sja!2sjp!4v1764558404863!5m2!1sja!2sjp';

const GROUP_DESK: L10n = { ja: '団体受付', en: 'Group desk' };

export const venues: Venue[] = [
  {
    slug: 'geisyatei',
    name: { ja: '芸者亭', en: 'Geisha-tei' },
    romaji: 'GEISHA-TEI',
    area: { ja: '東京・浅草', en: 'Asakusa, Tokyo' },
    hero: '/images/geisya/geisya-01.webp',
    youtubeId: 'fkGobIZt_i4',
    tagline: {
      ja: 'Geisha shows and Japanese dining, just steps from Asakusa’s streets.',
      en: 'Geisha shows and Japanese dining, just steps from Asakusa’s streets.',
    },
    hub: {
      body: {
        ja: '「芸者亭」は、浅草に位置する、日本の伝統芸能である芸者文化を楽しめるレストランです。',
        en: 'Geisha-tei is a restaurant in Asakusa where you can enjoy geisha culture, one of Japan’s traditional performing arts.',
      },
      image: '/images/geisya/geisya-01.webp',
    },
    about: [
      {
        title: { ja: 'About Geisha-tei', en: 'About Geisha-tei' },
        bilingual: true,
        body: {
          ja: '「芸者亭」は、浅草に位置する、日本の伝統芸能である芸者文化を楽しめるレストランです。当店では、お客様が食事を楽しみながら、芸者たちが舞踊や三味線などの華麗な芸を披露し、お座敷を華やかに盛り上げます。',
          en: 'Experience the enchantment of traditional Japanese culture at Geisha-tei, nestled in the heart of Asakusa, Tokyo. Delight in delicious meals while being mesmerized by captivating geisha performances, including dance and shamisen music, creating an unforgettable experience.',
        },
      },
      {
        title: { ja: 'What is Geisha ?', en: 'What is Geisha ?' },
        bilingual: true,
        body: {
          ja: '芸者とは、日本の伝統芸能を専門とする芸能者であり、舞踊、三味線、唄、茶道などを通じてお客様をもてなします。長年にわたる厳しい修業を経て、一流の技と洗練された所作を身につけ、宴席では優雅な舞や音楽、会話で場を和ませます。芸者は単なるパフォーマーではなく、日本の美意識や礼節を体現する存在として、国内外から高く評価されています。',
          en: 'A geisha is a traditional Japanese performer who specializes in classical arts such as dance, shamisen music, singing, and tea ceremony. Through years of disciplined training, they master refined skills and graceful manners to entertain guests at banquets and private events. More than just entertainers, geisha are seen as cultural ambassadors who embody the aesthetics and etiquette of Japan.',
        },
      },
    ],
    gallery: ['/images/geisya/geisya-02.webp', '/images/geisya/geisya-05.webp', '/images/geisya/geisya-04.webp', '/images/geisya/geisya-03.webp'],
    schedule: {
      title: { ja: '開催時間のスケジュール', en: 'Time Schedule' },
      times: ['10:00 ~', '11:00 ~', '12:00 ~', '14:00 ~', '15:00 ~', '18:00 ~', '19:00 ~'],
      note: {
        ja: '※完全ご予約制\n(by appointment only)\n予約受付時間10:00-18:00年中無休',
        en: 'By appointment only.\nReservations accepted 10:00–18:00, open every day of the year.',
      },
      tel: { ja: 'ご予約番号　080-4097-9552', en: 'Reservations: 080-4097-9552' },
    },
    info: {
      address: {
        ja: '〒111-0025\n東京都台東区東浅草1-21-11高記ビル2階',
        en: '〒111-0025\n2F Koki Building, 1-21-11 Higashi Asakusa, Taito-ku, Tokyo',
      },
      addressEnOnJa: true,
      tel: '080-4097-9552',
      telLabel: { ja: 'ご予約番号', en: 'Reservations' },
    },
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.1533134252495!2d139.79887827589857!3d35.72244782770858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188f32711cc72b%3A0xff2dcad3a2418158!2sGeishatei!5e0!3m2!1sja!2sjp!4v1747022964895!5m2!1sja!2sjp',
  },
  {
    slug: 'warakutei-yakiniku',
    name: { ja: '極上和牛', en: 'Premium Wagyu' },
    romaji: 'WARAKUTEI',
    area: { ja: '東京・有明', en: 'Ariake, Tokyo' },
    hero: '/images/warakutei/yakiniku-03.webp',
    tagline: { ja: '炭火焼きで和牛を愉しむ', en: 'Wagyu, enjoyed over charcoal' },
    hub: {
      title: { ja: '炭火焼きで和牛を愉しむ', en: 'Wagyu, enjoyed over charcoal' },
      body: {
        ja: '東京・有明（国際展示場から徒歩7分）に構える、和牛焼肉専門店。\n\n当店では、厳選した和牛の魅力をより多くの方に味わっていただけるよう、品質にこだわりつつもお求めやすい価格でご提供しております。\n\n部位ごとの旨みを最大限に引き出すため、一枚一枚のカットや仕込みにも細やかな工夫を重ね、鮮度と香りを感じられる和牛焼肉をお楽しみいただけます。\n\n店内はゆったりとお食事いただける落ち着いた空間をご用意しており、お一人様から少人数でのご利用はもちろん、団体のお客様にも対応可能です。',
        en: 'A wagyu yakiniku restaurant in Ariake, Tokyo — seven minutes on foot from Tokyo Big Sight.\n\nSo that more people can enjoy carefully selected wagyu, we keep to high quality at approachable prices.\n\nEvery cut and every preparation is worked on to bring out the best of each part, so you can taste wagyu yakiniku full of freshness and aroma.\n\nThe restaurant is a calm, spacious place to eat — for one guest, a small party, or a group.',
      },
      image: '/images/warakutei/yakiniku-03.webp',
    },
    about: [
      {
        body: {
          ja: '東京・有明（国際展示場から徒歩7分）に構える、和牛焼肉専門店。\n当店では、厳選した和牛の魅力をより多くの方に味わっていただけるよう、品質にこだわりつつもお求めやすい価格でご提供しております。\n\n部位ごとの旨みを最大限に引き出すため、一枚一枚のカットや仕込みにも細やかな工夫を重ね、鮮度と香りを感じられる和牛焼肉をお楽しみいただけます。\n店内はゆったりとお食事いただける落ち着いた空間をご用意しており、お一人様から少人数でのご利用はもちろん、団体のお客様にも対応可能です。',
          en: 'A wagyu yakiniku restaurant in Ariake, Tokyo — seven minutes on foot from Tokyo Big Sight.\nSo that more people can enjoy carefully selected wagyu, we keep to high quality at approachable prices.\n\nEvery cut and every preparation is worked on to bring out the best of each part, so you can taste wagyu yakiniku full of freshness and aroma.\nThe restaurant is a calm, spacious place to eat — for one guest, a small party, or a group.',
        },
      },
      {
        eyebrow: 'Concept',
        title: { ja: '肉へのこだわり', en: 'Our commitment to meat' },
        body: {
          ja: '「うまいものが食べたい」と思った瞬間の一皿が、\n明日の自分を少し前へ進めてくれる。私たちはそう信じています。\n\n焼き鳥店では、鮮度が生む旨さを追求した“鳥”。\n焼肉店では、深い香りととろける甘みを持つ“和牛”。\n\n選ぶ、捌く、焼き上げる——そのすべてに心を込め、\n一口で “あ、うまい” と感じる時間をお届けします。\n\n今日の一皿が、あなたの力になりますように。',
          en: 'The plate you reach for the moment you think “I want something good”\nmoves you a little further into tomorrow. We believe that.\n\nAt the yakitori restaurant, “chicken” that pursues the flavour freshness brings.\nAt the yakiniku restaurant, “wagyu” with deep aroma and melting sweetness.\n\nChoosing, butchering, grilling — we put our heart into every step,\nfor that moment when one bite makes you say “ah, that’s good.”\n\nMay today’s plate give you strength.',
        },
      },
    ],
    gallery: [
      '/images/warakutei/yakiniku-04.webp',
      '/images/warakutei/yakiniku-01.webp',
      '/images/warakutei/yakiniku-02.webp',
      '/images/warakutei/yakiniku-05.webp',
      '/images/warakutei/yakiniku-06.webp',
      '/images/warakutei/yakiniku-07.webp',
      '/images/warakutei/yakiniku-08.webp',
      '/images/warakutei/yakiniku-09.webp',
      '/images/warakutei/yakiniku-10.webp',
    ],
    info: { address: ARIAKE_ADDRESS, tel: '080-4097-9552', telLabel: GROUP_DESK },
    mapEmbed: ARIAKE_MAP,
    group: {
      note: {
        ja: '東京・有明、国際展示場から徒歩7分の和牛焼肉店。 お一人様から少人数まで気軽に利用でき、ゆったりとした席で厳選和牛の旨みをじっくり楽しめるのが魅力です。団体の場合も、ご予算や用途に合わせて、焼肉コースや飲み放題など各種プランを柔軟にご提案いたします。',
        en: 'A wagyu yakiniku restaurant in Ariake, seven minutes from Tokyo Big Sight. Easy to visit alone or in a small party, with roomy seats to take your time over selected wagyu. For groups, we flexibly suggest plans such as yakiniku courses and all-you-can-drink to suit your budget and purpose.',
      },
    },
  },
  {
    slug: 'warakutei-yakitori',
    name: { ja: '焼き鳥居酒屋', en: 'Yakitori Izakaya' },
    romaji: 'WARAKUTEI',
    area: { ja: '東京・有明', en: 'Ariake, Tokyo' },
    hero: '/images/warakutei/yakitori-01.webp',
    tagline: { ja: '美味しい焼き鳥と美味しいお酒', en: 'Great yakitori, great drinks' },
    hub: {
      title: { ja: '美味しい焼き鳥と美味しいお酒', en: 'Great yakitori, great drinks' },
      body: {
        ja: '東京・有明（国際展示場から徒歩7分）に、焼き鳥居酒屋と和牛焼肉店の2店舗を展開しています。\n\n焼き鳥では広めの席で気軽な宴会に、焼肉では厳選和牛をゆったり楽しめる空間をご用意。お一人様から少人数のご利用はもちろん、団体の場合もご予算や用途に合わせて、焼肉コースや飲み放題など各種プランを柔軟にご提案いたします。',
        en: 'In Ariake, Tokyo — seven minutes on foot from Tokyo Big Sight — we run two restaurants: a yakitori izakaya and a wagyu yakiniku restaurant.\n\nThe yakitori restaurant has roomy seating for a relaxed party; the yakiniku restaurant is a place to enjoy selected wagyu at leisure. For one guest or a small party, and for groups too — we flexibly suggest plans such as yakiniku courses and all-you-can-drink to suit your budget and purpose.',
      },
      image: '/images/warakutei/yakitori-02.webp',
    },
    about: [
      {
        body: {
          ja: '東京・有明（国際展示場から徒歩7分）に、焼き鳥居酒屋と和牛焼肉店の2店舗を展開しています。\n焼き鳥では広めの席で気軽な宴会に、焼肉では厳選和牛をゆったり楽しめる空間をご用意。お一人様から少人数のご利用はもちろん、団体の場合もご予算や用途に合わせて、焼肉コースや飲み放題など各種プランを柔軟にご提案いたします。',
          en: 'In Ariake, Tokyo — seven minutes on foot from Tokyo Big Sight — we run two restaurants: a yakitori izakaya and a wagyu yakiniku restaurant.\nThe yakitori restaurant has roomy seating for a relaxed party; the yakiniku restaurant is a place to enjoy selected wagyu at leisure. For one guest or a small party, and for groups too — we flexibly suggest plans such as yakiniku courses and all-you-can-drink to suit your budget and purpose.',
        },
      },
    ],
    gallery: ['/images/warakutei/yakitori-01.webp', '/images/warakutei/yakitori-03.webp', '/images/warakutei/yakitori-04.webp', '/images/warakutei/yakitori-02.webp'],
    info: { address: ARIAKE_ADDRESS, tel: '080-4097-9552', telLabel: GROUP_DESK },
    mapEmbed: ARIAKE_MAP,
    // The live page's text under this heading describes the wagyu yakiniku
    // restaurant (copied from that page), so only the heading is kept.
    group: {},
  },
];

export function getVenue(slug: string) {
  return venues.find((v) => v.slug === slug);
}
