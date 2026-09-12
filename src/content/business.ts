import type { L10n } from '@/lib/i18n';

/** Japanese copy is verbatim from the live site; English is our translation. */

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
      en: 'From planning to manufacture and sale, handled end to end and shaped by market needs. Through high-quality, trusted products, we bring new value to our customers’ businesses.',
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
      en: 'We run hotels that provide everything from the stay to meals and local experiences — comfortable, memorable stays for guests from Japan and abroad, and a way to share the appeal of each region.',
    },
    image: '/images/nagoya/castle-01.webp',
    href: '/hotels',
  },
  {
    id: 'dining',
    no: '03',
    title: { ja: '飲食店事業', en: 'Restaurants' },
    summary: {
      ja: '食を通じて日本文化を体感できる場所の創出に取り組んでいます。浅草に店舗を構える「芸者亭」では、伝統芸能の芸者による舞踊や三味線の演奏とともに、食事を楽しんでいただける空間を提供しています。',
      en: 'We create places where Japanese culture can be experienced through food. At Geisha-tei in Asakusa, guests enjoy a meal alongside dance and shamisen performed by geisha.',
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
      en: 'Using a global network centred on Asia, we support the import and export of goods — valuing trust and speed, for safe and smooth logistics.',
    },
    image: '/images/business/trade.webp',
  },
  {
    id: 'overseas',
    no: '05',
    title: { ja: '海外進出支援', en: 'Overseas Expansion Support' },
    summary: {
      ja: '日本企業の海外展開や、海外企業の日本進出をトータルで支援。市場調査から販路開拓、現地パートナー紹介まで、一気通貫でサポートします。',
      en: 'Complete support for Japanese companies going abroad and overseas companies entering Japan — from market research to sales channels and introductions to local partners.',
    },
    image: '/images/business/overseas.webp',
  },
  {
    id: 'tourism',
    no: '06',
    title: { ja: 'バス手配代行', en: 'Coach Arrangement' },
    summary: {
      ja: '団体旅行やイベントにおけるバス手配業務を代行し、スムーズな移動手段の確保をサポート。訪日外国人を含む多様なニーズに対応しています。',
      en: 'We arrange coaches for group travel and events on your behalf, making sure transport runs smoothly — for a wide range of needs, including visitors to Japan.',
    },
    image: '/images/business/bus.webp',
  },
];

export const hisano = {
  brand: 'HISANO',
  href: 'https://hisano-jp.com/',
  title: { ja: '商品開発', en: 'Product Development' } satisfies L10n,
  body: {
    ja: 'HISANOは、安全で便利な健康食品を各種ECショップで提供しています。私たちは、日本国内どこでも送料無料でお届けし、お客様に負担なく商品を手に入れていただけるよう努めています。\n\nお客様の声に真摯に耳を傾け、商品の品質や配送、カスタマーサポートなど、全ての面でお客様に満足いただけるよう努めています。ご不明な点やご質問があれば、お気軽にお問い合わせください。\n\nまた、HISANOの商品は、アムスライフサイエンス本社工場で誇りを持って製造されています。この工場はGMP（Good Manufacturing Practices）認定を獲得しており、製品の品質と安全性を確保するための厳格な基準に準拠しています。私たちは、お客様に高品質で信頼性のある商品を提供するために、最高の品質基準を維持し続けています。',
    en: 'HISANO offers safe, convenient health foods through a range of online shops, delivered free anywhere in Japan so customers can get them without burden.\n\nWe listen sincerely to our customers and work to satisfy them in every respect — product quality, delivery and customer support. If you have any questions, please feel free to contact us.\n\nHISANO products are proudly made at the AMS Life Science head plant. The plant is GMP (Good Manufacturing Practices) certified and complies with strict standards to ensure product quality and safety. We continue to maintain the highest quality standards to provide our customers with high-quality, reliable products.',
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
    ja: '私たちVNT会社は健康食品や健康器具の販売ブランド「HISANO」やインバウンドに特化した実店舗のドラッグストア「イケガミストア」をはじめとする事業で販売する商品の拡大を行っています。\n\n私たちにとって、またお客様にとって、新しい価値を提供できるサプライヤーの方のご連絡をお待ちしております。当社が持つ販売網を通じて国内外のお客様にその価値をお伝えさせて頂きます。',
    en: 'VNT is expanding the range of products sold across our businesses — from HISANO, our health food and health equipment brand, to Ikegami Store, our inbound-focused drugstore.\n\nWe look forward to hearing from suppliers who can offer new value to us and to our customers. Through our sales network, we will carry that value to customers in Japan and abroad.',
  } satisfies L10n,
};

export type Branch = { name: L10n; address: L10n; tel?: string; hours?: L10n };

export const ikegami = {
  name: { ja: 'イケガミストア', en: 'Ikegami Store' } satisfies L10n,
  lede: {
    ja: '「イケガミストア」は、浅草に位置する便利なドラッグストアです。医薬品や健康食品、化粧品を取り揃えており、外国からのお客様にも利用しやすいように「Tax free」のサービスを提供しています。親切なスタッフがお客様のニーズに合った商品を提案し、快適なショッピング体験をお届けします。',
    en: 'Ikegami Store is a convenient drugstore in Asakusa, stocking medicines, health foods and cosmetics, with a “Tax free” service for visitors from abroad. Our friendly staff suggest products that suit your needs, for a comfortable shopping experience.',
  } satisfies L10n,
  image: '/images/ikegami/store-01.webp',
  branches: [
    {
      name: { ja: 'イケガミストア浅草店', en: 'Ikegami Store Asakusa' },
      address: {
        ja: '〒111-0025東京都台東区東浅草1-21-11高記ビル1階',
        en: '1F Koki Building, 1-21-11 Higashi Asakusa, Taito-ku, Tokyo 111-0025',
      },
      tel: '03-6458-1036',
      hours: { ja: '10：00～21：00', en: '10:00–21:00' },
    },
    {
      // As printed on the live site; the planned date has since passed.
      name: { ja: 'イケガミストア富士吉田店（2024年末開店予定）', en: 'Ikegami Store Fujiyoshida (opening planned for late 2024)' },
      address: {
        ja: '〒403-0004山梨県富士吉田市下吉田4－１－２７NSIビル',
        en: 'NSI Building, 4-1-27 Shimoyoshida, Fujiyoshida, Yamanashi 403-0004',
      },
    },
  ] as Branch[],
};
