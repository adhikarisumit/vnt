import type { L10n } from '@/lib/i18n';

export type Venue = {
  slug: 'geisyatei' | 'warakutei-yakiniku' | 'warakutei-yakitori';
  name: L10n;
  romaji: string;
  area: L10n;
  category: L10n;
  hero: string;
  youtubeId?: string;
  tagline: L10n;
  lede: L10n;
  about: { title: L10n; body: L10n }[];
  gallery: { src: string; caption: L10n }[];
  schedule?: { times: string[]; note: L10n };
  info: {
    address: L10n;
    tel?: string;
    hours?: L10n;
  };
  mapEmbed: string;
  groupNote: L10n;
};

export const venues: Venue[] = [
  {
    slug: 'geisyatei',
    name: { ja: '芸者亭', en: 'Geisha-tei' },
    romaji: 'GEISHA-TEI',
    area: { ja: '東京・浅草', en: 'Asakusa, Tokyo' },
    category: { ja: '芸者ショー / 和食', en: 'Geisha show & Japanese dining' },
    hero: '/images/geisya/geisya-01.webp',
    youtubeId: 'fkGobIZt_i4',
    tagline: {
      ja: '浅草の路地から数歩、芸者の舞と和の食卓へ。',
      en: 'Geisha shows and Japanese dining, just steps from Asakusa’s streets.',
    },
    lede: {
      ja: '食事を楽しみながら、芸者たちが舞踊や三味線などの華麗な芸を披露し、お座敷を華やかに盛り上げます。',
      en: 'Enjoy a meal while geisha bring the room alive with dance and shamisen.',
    },
    about: [
      {
        title: { ja: 'About Geisha-tei', en: 'About Geisha-tei' },
        body: {
          ja: '「芸者亭」は、浅草に位置する、日本の伝統芸能である芸者文化を楽しめるレストランです。当店では、お客様が食事を楽しみながら、芸者たちが舞踊や三味線などの華麗な芸を披露し、お座敷を華やかに盛り上げます。',
          en: 'Geisha-tei sits in the heart of Asakusa, Tokyo, where the traditional arts of the geisha are still performed. Guests dine while geisha fill the room with dance and shamisen — an evening that stays with you.',
        },
      },
      {
        title: { ja: 'What is Geisha ?', en: 'What is a Geisha?' },
        body: {
          ja: '芸者とは、日本の伝統芸能を専門とする芸能者であり、舞踊、三味線、唄、茶道などを通じてお客様をもてなします。長年にわたる厳しい修業を経て、一流の技と洗練された所作を身につけ、宴席では優雅な舞や音楽、会話で場を和ませます。芸者は単なるパフォーマーではなく、日本の美意識や礼節を体現する存在として、国内外から高く評価されています。',
          en: 'A geisha is a performer trained in Japan’s classical arts — dance, shamisen, song and tea ceremony. Years of disciplined study produce both technical mastery and refined bearing; at a banquet, that becomes graceful movement, music and easy conversation. Geisha are less entertainers than cultural custodians, embodying Japanese aesthetics and etiquette.',
        },
      },
    ],
    gallery: [
      { src: '/images/geisya/geisya-02.webp', caption: { ja: '芸者による舞踊', en: 'Geisha dance' } },
      { src: '/images/geisya/geisya-05.webp', caption: { ja: 'お座敷', en: 'The tatami room' } },
      { src: '/images/geisya/geisya-04.webp', caption: { ja: '店内', en: 'Interior' } },
      { src: '/images/geisya/geisya-03.webp', caption: { ja: 'お食事', en: 'Dining' } },
    ],
    schedule: {
      times: ['10:00', '11:00', '12:00', '14:00', '15:00', '18:00', '19:00'],
      note: {
        ja: '※完全ご予約制／予約受付時間 10:00–18:00・年中無休',
        en: 'By appointment only. Reservations taken 10:00–18:00, open year-round.',
      },
    },
    info: {
      address: {
        ja: '〒111-0025 東京都台東区東浅草1-21-11 高記ビル2階',
        en: '2F Koki Building, 1-21-11 Higashi Asakusa, Taito-ku, Tokyo 111-0025',
      },
      tel: '080-4097-9552',
    },
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.1533134252495!2d139.79887827589857!3d35.72244782770858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188f32711cc72b%3A0xff2dcad3a2418158!2sGeishatei!5e0!3m2!1sja!2sjp!4v1747022964895!5m2!1sja!2sjp',
    groupNote: {
      ja: '観光ツアーや社員旅行、ご接待、ご宴席など、さまざまなシーンでのご利用に対応しております。ご希望に応じて、日本舞踊などの伝統芸能パフォーマンスを手配することも可能です。また、店内のステージは、団体様の催しや演出など、自由にご活用いただけます（要事前相談）。',
      en: 'We host tour groups, company trips, client entertainment and private banquets. Traditional performances such as classical dance can be arranged on request, and the stage is available for your own programme (please discuss in advance).',
    },
  },
  {
    slug: 'warakutei-yakiniku',
    name: { ja: '和楽亭 極上和牛', en: 'Warakutei — Wagyu Yakiniku' },
    romaji: 'WARAKUTEI YAKINIKU',
    area: { ja: '東京・有明', en: 'Ariake, Tokyo' },
    category: { ja: '和牛焼肉', en: 'Wagyu yakiniku' },
    hero: '/images/warakutei/yakiniku-04.webp',
    tagline: {
      ja: '炭火焼きで和牛を愉しむ',
      en: 'Wagyu, over charcoal.',
    },
    lede: {
      ja: '東京・有明（国際展示場から徒歩7分）に構える、和牛焼肉専門店。',
      en: 'A wagyu yakiniku house in Ariake, Tokyo — seven minutes on foot from Tokyo Big Sight.',
    },
    about: [
      {
        title: { ja: '肉へのこだわり', en: 'On the meat' },
        body: {
          ja: '当店では、厳選した和牛の魅力をより多くの方に味わっていただけるよう、品質にこだわりつつもお求めやすい価格でご提供しております。\n\n部位ごとの旨みを最大限に引き出すため、一枚一枚のカットや仕込みにも細やかな工夫を重ね、鮮度と香りを感じられる和牛焼肉をお楽しみいただけます。',
          en: 'We hold to a high standard of wagyu while keeping it within reach, so that more people can taste what it actually offers.\n\nEvery cut is prepared to draw out what that particular part does best — the result arrives at the grill still carrying its freshness and aroma.',
        },
      },
      {
        title: { ja: 'Concept', en: 'Concept' },
        body: {
          ja: '「うまいものが食べたい」と思った瞬間の一皿が、明日の自分を少し前へ進めてくれる。私たちはそう信じています。\n\n選ぶ、捌く、焼き上げる——そのすべてに心を込め、一口で "あ、うまい" と感じる時間をお届けします。今日の一皿が、あなたの力になりますように。',
          en: 'We believe the plate you reach for when you want something genuinely good moves you a little further into tomorrow.\n\nChoosing, butchering, grilling — we put ourselves into each step, so that the first bite lands as simply, unmistakably good. May today’s plate give you something to carry.',
        },
      },
    ],
    gallery: [
      { src: '/images/warakutei/yakiniku-08.webp', caption: { ja: '厳選和牛', en: 'Selected wagyu' } },
      { src: '/images/warakutei/yakiniku-01.webp', caption: { ja: 'カウンター席', en: 'Counter seating' } },
      { src: '/images/warakutei/yakiniku-05.webp', caption: { ja: '個室', en: 'Private room' } },
      { src: '/images/warakutei/yakiniku-06.webp', caption: { ja: 'テーブル席', en: 'Table seating' } },
      { src: '/images/warakutei/yakiniku-10.webp', caption: { ja: '石焼ビビンバ', en: 'Stone-bowl bibimbap' } },
      { src: '/images/warakutei/yakiniku-07.webp', caption: { ja: '店内', en: 'Interior' } },
    ],
    info: {
      address: {
        ja: '〒135-0063 東京都江東区有明3丁目5−7 3F',
        en: '3F, 3-5-7 Ariake, Koto-ku, Tokyo 135-0063',
      },
      tel: '080-4097-9552',
    },
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4045.0749363228365!2d139.7859992765223!3d35.63226687260294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601889ef32e86155%3A0x6b5d7a2f1661cd03!2zVE9D5pyJ5piO!5e1!3m2!1sja!2sjp!4v1764558404863!5m2!1sja!2sjp',
    groupNote: {
      ja: 'お一人様から少人数まで気軽に利用でき、ゆったりとした席で厳選和牛の旨みをじっくり楽しめるのが魅力です。団体の場合も、ご予算や用途に合わせて、焼肉コースや飲み放題など各種プランを柔軟にご提案いたします。',
      en: 'Comfortable for one guest or a small party, with room to take your time over the meat. For larger groups we build the plan around your budget and occasion — set courses, free-flow drinks and more.',
    },
  },
  {
    slug: 'warakutei-yakitori',
    name: { ja: '和楽亭 焼き鳥居酒屋', en: 'Warakutei — Yakitori Izakaya' },
    romaji: 'WARAKUTEI YAKITORI',
    area: { ja: '東京・有明', en: 'Ariake, Tokyo' },
    category: { ja: '焼き鳥・居酒屋', en: 'Yakitori izakaya' },
    hero: '/images/warakutei/yakitori-01.webp',
    tagline: {
      ja: '美味しい焼き鳥と美味しいお酒',
      en: 'Good skewers. Good drinks.',
    },
    lede: {
      ja: '広めの席で気軽な宴会に。焼き鳥と酒がすすむ、有明の居酒屋です。',
      en: 'Roomy seating for an easy party — an Ariake izakaya where the skewers and the drinks keep coming.',
    },
    about: [
      {
        title: { ja: '焼き鳥居酒屋', en: 'The izakaya' },
        body: {
          ja: '東京・有明（国際展示場から徒歩7分）に、焼き鳥居酒屋と和牛焼肉店の2店舗を展開しています。\n\n焼き鳥では広めの席で気軽な宴会に、焼肉では厳選和牛をゆったり楽しめる空間をご用意。お一人様から少人数のご利用はもちろん、団体の場合もご予算や用途に合わせて、焼肉コースや飲み放題など各種プランを柔軟にご提案いたします。',
          en: 'We run two rooms in Ariake, seven minutes from Tokyo Big Sight — a yakitori izakaya and a wagyu yakiniku house.\n\nThe izakaya has the space for a relaxed party; the yakiniku room is for taking your time over selected wagyu. Come as one, come as a few, or come as a group — we will shape the course and drink plan around you.',
        },
      },
      {
        title: { ja: '鮮度が生む旨さ', en: 'Freshness first' },
        body: {
          ja: '焼き鳥店では、鮮度が生む旨さを追求した"鳥"。選ぶ、捌く、焼き上げる——そのすべてに心を込め、一口で "あ、うまい" と感じる時間をお届けします。',
          en: 'At the izakaya it is all about the bird, and about how much of its flavour freshness can carry. Choosing, butchering, grilling — each step done properly, so the first bite says it for us.',
        },
      },
    ],
    gallery: [
      { src: '/images/warakutei/yakitori-02.webp', caption: { ja: '焼き鳥', en: 'Yakitori' } },
      { src: '/images/warakutei/yakitori-03.webp', caption: { ja: '店内', en: 'Interior' } },
      { src: '/images/warakutei/yakitori-04.webp', caption: { ja: '大人数席', en: 'Seating for larger parties' } },
      { src: '/images/warakutei/yakiniku-09.webp', caption: { ja: '串盛り', en: 'Skewer selection' } },
    ],
    info: {
      address: {
        ja: '〒135-0063 東京都江東区有明3丁目5−7 3F',
        en: '3F, 3-5-7 Ariake, Koto-ku, Tokyo 135-0063',
      },
      tel: '080-4097-9552',
    },
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4045.0749363228365!2d139.7859992765223!3d35.63226687260294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601889ef32e86155%3A0x6b5d7a2f1661cd03!2zVE9D5pyJ5piO!5e1!3m2!1sja!2sjp!4v1764558404863!5m2!1sja!2sjp',
    groupNote: {
      ja: '団体予約大歓迎です。ご予算や用途に合わせて、コースや飲み放題など各種プランを柔軟にご提案いたします。',
      en: 'Groups are very welcome. We will put together a course and drink plan to match your budget and the occasion.',
    },
  },
];

export function getVenue(slug: string) {
  return venues.find((v) => v.slug === slug);
}
