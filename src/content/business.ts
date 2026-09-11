import type { L10n } from '@/lib/i18n';

export type BusinessArea = {
  id: string;
  no: string;
  title: L10n;
  summary: L10n;
  image?: string;
  href?: string;
};

export const businessAreas: BusinessArea[] = [
  {
    id: 'product',
    no: '01',
    title: { ja: '商品企画・製造販売', en: 'Product Planning & Manufacturing' },
    summary: {
      ja: '市場ニーズに合わせた商品の企画から製造・販売までを一貫して対応。高品質で信頼されるものづくりを通じて、お客様のビジネスに新たな価値を提供します。',
      en: 'From concept to manufacture to sale, handled end to end and shaped by what the market actually needs. Dependable, high-quality production that adds value to our partners’ businesses.',
    },
    // The live site shows this card without a photograph.
    href: '/business',
  },
  {
    id: 'hotel',
    no: '02',
    title: { ja: 'ホテル事業', en: 'Hotels' },
    summary: {
      ja: '宿泊から食事、地域体験まで一貫して提供するホテル運営を展開。国内外のお客様に快適で記憶に残る滞在を届け、地域の魅力発信にも貢献しています。',
      en: 'Hotels run as a whole experience — the room, the table and the region around it. Comfortable, memorable stays for guests from Japan and abroad, and a platform for the places we operate in.',
    },
    image: '/images/nagoya/castle-01.webp',
    href: '/hotels',
  },
  {
    id: 'dining',
    no: '03',
    title: { ja: '飲食店事業', en: 'Dining' },
    summary: {
      ja: '食を通じて日本文化を体感できる場所の創出に取り組んでいます。浅草に店舗を構える「芸者亭」では、伝統芸能の芸者による舞踊や三味線の演奏とともに、食事を楽しんでいただける空間を提供しています。',
      en: 'We build places where Japanese culture can be experienced through food. At Geisha-tei in Asakusa, guests dine to the dance and shamisen of working geisha.',
    },
    image: '/images/business/dining.webp',
    href: '/dining',
  },
  {
    id: 'trade',
    no: '04',
    title: { ja: '輸入出', en: 'Import & Export' },
    summary: {
      ja: 'アジアを中心としたグローバルなネットワークを活かし、商品の輸出入をサポート。信頼とスピードを大切に、安全かつ円滑な物流を実現します。',
      en: 'A network centred on Asia supporting the movement of goods in both directions. Trust and speed, with logistics that stay safe and stay moving.',
    },
    image: '/images/business/trade.webp',
  },
  {
    id: 'overseas',
    no: '05',
    title: { ja: '海外進出支援', en: 'Overseas Expansion Support' },
    summary: {
      ja: '日本企業の海外展開や、海外企業の日本進出をトータルで支援。市場調査から販路開拓、現地パートナー紹介まで、一気通貫でサポートします。',
      en: 'End-to-end support for Japanese companies going abroad and for overseas companies entering Japan — market research, route to market, and introductions to partners on the ground.',
    },
    image: '/images/business/overseas.webp',
  },
  {
    id: 'tourism',
    no: '06',
    title: { ja: 'バス手配代行', en: 'Coach Charter' },
    summary: {
      ja: '団体旅行やイベントにおけるバス手配業務を代行し、スムーズな移動手段の確保をサポート。訪日外国人を含む多様なニーズに対応しています。',
      en: 'We arrange coach transport for group travel and events, keeping movement simple — including for inbound visitors with particular requirements.',
    },
    image: '/images/business/bus.webp',
  },
];

export const hisano = {
  brand: 'HISANO',
  href: 'https://hisano-jp.com/',
  title: { ja: '商品開発', en: 'Product Development' } satisfies L10n,
  body: {
    ja: 'HISANOは、安全で便利な健康食品を各種ECショップで提供しています。私たちは、日本国内どこでも送料無料でお届けし、お客様に負担なく商品を手に入れていただけるよう努めています。\n\nお客様の声に真摯に耳を傾け、商品の品質や配送、カスタマーサポートなど、全ての面でお客様に満足いただけるよう努めています。\n\nHISANOの商品は、アムスライフサイエンス本社工場で誇りを持って製造されています。この工場はGMP（Good Manufacturing Practices）認定を獲得しており、製品の品質と安全性を確保するための厳格な基準に準拠しています。',
    en: 'HISANO supplies safe, easy-to-use health foods through a range of online stores, with free shipping anywhere in Japan so that cost never gets in the way.\n\nWe listen closely to our customers and hold ourselves to their judgement on product quality, delivery and support alike.\n\nHISANO products are manufactured at the AMS Life Science head plant, a GMP-certified facility working to strict standards for product quality and safety.',
  } satisfies L10n,
  images: [
    '/images/business/oem-01.webp',
    '/images/business/oem-02.webp',
    '/images/business/oem-03.webp',
    '/images/business/oem-04.webp',
    '/images/business/oem-05.webp',
  ],
};

export const supplierCall = {
  title: { ja: '新規の仕入先を探しています', en: 'We are looking for new suppliers' } satisfies L10n,
  body: {
    ja: '私たちVNT株式会社は健康食品や健康器具の販売ブランド「HISANO」やインバウンドに特化した実店舗のドラッグストア「イケガミストア」をはじめとする事業で販売する商品の拡大を行っています。\n\n私たちにとって、またお客様にとって、新しい価値を提供できるサプライヤーの方のご連絡をお待ちしております。当社が持つ販売網を通じて国内外のお客様にその価値をお伝えさせて頂きます。',
    en: 'VNT is expanding the range we carry across our businesses — from HISANO, our health food and equipment brand, to Ikegami Store, our inbound-focused drugstore.\n\nIf you can bring new value to us and to our customers, we would like to hear from you. Our distribution network will carry that value to customers in Japan and beyond.',
  } satisfies L10n,
};

export const ikegami = {
  name: { ja: 'イケガミストア', en: 'Ikegami Store' } satisfies L10n,
  lede: {
    ja: '「イケガミストア」は、浅草に位置する便利なドラッグストアです。医薬品や健康食品、化粧品を取り揃えており、外国からのお客様にも利用しやすいように「Tax free」のサービスを提供しています。親切なスタッフがお客様のニーズに合った商品を提案し、快適なショッピング体験をお届けします。',
    en: 'Ikegami Store is a well-stocked drugstore in Asakusa carrying medicines, health foods and cosmetics, with tax-free service for visitors from overseas. Our staff will help you find what actually suits you.',
  } satisfies L10n,
  image: '/images/ikegami/store-01.webp',
  branches: [
    {
      name: { ja: 'イケガミストア 浅草店', en: 'Ikegami Store — Asakusa' } satisfies L10n,
      address: {
        ja: '〒111-0025 東京都台東区東浅草1-21-11 高記ビル1階',
        en: '1F Koki Building, 1-21-11 Higashi Asakusa, Taito-ku, Tokyo 111-0025',
      } satisfies L10n,
      tel: '03-6458-1036',
      hours: { ja: '10:00 – 21:00', en: '10:00 – 21:00' } satisfies L10n,
    },
    {
      name: { ja: 'イケガミストア 富士吉田店', en: 'Ikegami Store — Fujiyoshida' } satisfies L10n,
      address: {
        ja: '〒403-0004 山梨県富士吉田市下吉田4-1-27 NSIビル',
        en: 'NSI Building, 4-1-27 Shimoyoshida, Fujiyoshida, Yamanashi 403-0004',
      } satisfies L10n,
      hours: { ja: '準備中', en: 'Opening soon' } satisfies L10n,
    },
  ],
};
