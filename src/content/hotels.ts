import type { L10n } from '@/lib/i18n';

export type Hotel = {
  slug: 'fuji' | 'nagoya' | 'toji';
  name: string;
  nameJa: string;
  stars: number;
  rating?: { score: string; asOf: string };
  location: L10n;
  hero: string;
  heroPoster?: string;
  youtubeId?: string;
  tagline: L10n;
  kicker: L10n;
  lede: L10n;
  about: { title: L10n; body: L10n };
  features: { title: L10n; body: L10n; image: string }[];
  gallery: { src: string; caption: L10n }[];
  rooms?: { name: L10n; image: string }[];
  info: {
    address: L10n;
    tel?: string;
    fax?: string;
    rooms?: L10n;
  };
  mapEmbed: string;
  booking?: { label: L10n; href: string }[];
};

export const hotels: Hotel[] = [
  {
    slug: 'fuji',
    name: 'FUJI PREMIUM HOTEL',
    nameJa: '富士プレミアムホテル',
    stars: 4,
    rating: { score: '4.8', asOf: '2025.05.12' },
    location: { ja: '山梨県 富士吉田市', en: 'Fujiyoshida, Yamanashi' },
    hero: '/images/fuji/fuji-03.webp',
    youtubeId: 'ftSHii6YhUs',
    tagline: {
      ja: '富士山を望む、忘れられない旅路の宿',
      en: 'An unforgettable hotel, an unforgettable journey.',
    },
    kicker: {
      ja: '富士山と共に泊まる、贅沢なひととき',
      en: 'A luxury of time, spent alongside Mt. Fuji',
    },
    lede: {
      ja: '富士山を眺めながら過ごす時間は、心を豊かに。',
      en: 'Hours spent in view of Mt. Fuji leave the mind a little richer.',
    },
    about: {
      title: { ja: '富士山と共に泊まる、贅沢なひととき', en: 'Staying with Mt. Fuji' },
      body: {
        ja: '富士山とは、日本の自然の象徴。四季折々の姿を見せる雄大な山の景色は、日常と非日常、静寂と賑わい、癒しと冒険をつなぐ場所です。\n\nそんな特別なロケーションで、眺め、触れ、心に刻むことで、かけがえのない体験を。Fuji Premium Hotelは、その思いを大切にしながら、富士山とともに過ごす贅沢な瞬間を提供するホテルです。',
        en: 'Mt. Fuji is the symbol of Japan’s natural world. Changing its face with every season, the mountain is a place where the everyday meets the extraordinary, quiet meets vitality, and rest meets adventure.\n\nIn a location like this, to look, to touch and to remember is to gather something irreplaceable. Fuji Premium Hotel exists to offer exactly those moments, spent in the company of the mountain.',
      },
    },
    features: [
      {
        title: { ja: '富士山を一望できる特別なロケーション', en: 'A location with the mountain in full view' },
        body: {
          ja: 'Fuji Premium Hotelは、山梨県富士吉田市の河口湖と山中湖の間に位置し、日本最高峰・富士山を目の前に望む特別な場所にあります。全50室の客室からは、四季折々の表情を見せる富士山の雄大な景色を楽しむことができ、滞在そのものが特別な思い出となります。',
          en: 'Set in Fujiyoshida between Lake Kawaguchi and Lake Yamanaka, the hotel faces Japan’s highest peak directly. All 50 guest rooms look out on the mountain as it changes through the seasons, so the stay itself becomes the memory.',
        },
        image: '/images/fuji/fuji-01.webp',
      },
      {
        title: { ja: '心と体を解きほぐす天然麦飯石の大浴場', en: 'A bakuhanseki stone bath that unwinds body and mind' },
        body: {
          ja: '天然の麦飯石を使用した人工温泉「性石温泉大浴場」で、体の芯から温まるリラクゼーションをお楽しみください。大浴場は、宿泊者だけが利用できる特別な癒しの空間です。旅の疲れを優しく癒し、次の日への活力を養うひとときをお過ごしいただけます。',
          en: 'Warm through to the core in our mineral bath, drawn over natural bakuhanseki stone. Reserved for house guests alone, the large bath quietly undoes the day’s travel and readies you for the next.',
        },
        image: '/images/fuji/onsen-01.webp',
      },
    ],
    gallery: [
      { src: '/images/fuji/fuji-02.webp', caption: { ja: '富士山ビューの客室', en: 'Guest room with Mt. Fuji view' } },
      { src: '/images/fuji/fuji-01.webp', caption: { ja: '窓辺からの眺め', en: 'The view from the window' } },
      { src: '/images/fuji/info-top.webp', caption: { ja: 'ホテル外観', en: 'Hotel exterior' } },
      { src: '/images/fuji/onsen-01.webp', caption: { ja: '性石温泉大浴場', en: 'Large mineral bath' } },
    ],
    info: {
      address: {
        ja: '〒403-0032 山梨県富士吉田市上吉田東5丁目10−12',
        en: '5-10-12 Kamiyoshida-higashi, Fujiyoshida, Yamanashi 403-0032',
      },
      tel: '0555-22-6808',
      fax: '0555-22-6809',
      rooms: { ja: '全50室', en: '50 rooms' },
    },
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d203.10042931021547!2d138.8037714636366!3d35.46452597566521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f150!3m3!1m2!1s0x60196700586a392f%3A0x87df7aa3b32a3426!2sFuji%20Premium%20Hotel!5e0!3m2!1sja!2sjp!4v1745992273646!5m2!1sja!2sjp',
    booking: [
      { label: { ja: 'Agodaで空室を見る', en: 'Check availability on Agoda' }, href: 'https://www.agoda.com/ja-jp/fuji-premium-hotel/hotel/fujikawaguchiko-jp.html?cid=1922886' },
      { label: { ja: 'Expediaで空室を見る', en: 'Check availability on Expedia' }, href: 'https://expe.app.link/CgQTljpNESb' },
    ],
  },
  {
    slug: 'nagoya',
    name: 'NAGOYA PREMIUM HOTEL',
    nameJa: '名古屋プレミアムホテル',
    stars: 3,
    location: { ja: '愛知県 稲沢市・国府宮', en: 'Konomiya, Inazawa, Aichi' },
    hero: '/images/nagoya/nagoya-05.webp',
    tagline: {
      ja: '心踊る、名古屋の旅のよりどころ。',
      en: 'An unforgettable hotel, an unforgettable journey.',
    },
    kicker: {
      ja: '名古屋と共に泊まる、贅沢なひととき',
      en: 'A base for the city, and everything around it',
    },
    lede: {
      ja: '名古屋の街を歩く時間は、新しい出会いを豊かに。',
      en: 'Time spent walking Nagoya turns into something you keep.',
    },
    about: {
      title: { ja: '名古屋の歴史と文化に寄り添う特別なロケーション', en: 'Close to Nagoya’s history and culture' },
      body: {
        ja: '名古屋とは、歴史と未来が交差する都市。伝統と革新、美食と文化が織りなす風景は、旅と日常、静けさと賑わい、発見と癒しをつなぐ場所です。\n\nNagoya Premium Hotelは、愛知県稲沢市・国府宮に位置し、名古屋の中心地からのアクセスも良好な、落ち着いた環境に佇んでいます。全33室の客室は、静かな時間を大切にした設計で、ビジネスや観光の拠点としてご利用いただく方々に、心やすらぐ滞在をご提供します。',
        en: 'Nagoya is a city where history and the future cross. Tradition and invention, food and culture weave a landscape that connects travel with the everyday, quiet with energy, discovery with rest.\n\nNagoya Premium Hotel sits in Konomiya, Inazawa — a calm setting with easy access to the city centre. All 33 rooms are designed around quiet hours, offering a restful base for business and sightseeing alike.',
      },
    },
    features: [
      {
        title: { ja: '名古屋観光の拠点にぴったりの穏やかなロケーション', en: 'A calm base for exploring Nagoya' },
        body: {
          ja: '名古屋市内や主要観光地へのアクセスも良好な落ち着いた環境にあります。歴史ある国府宮神社や熱田神宮、徳川美術館などの名所にも程近く、都市の賑わいと落ち着きの両方を感じられます。',
          en: 'Well connected to central Nagoya and the main sights, yet set apart from the noise. Konomiya Shrine, Atsuta Shrine and the Tokugawa Art Museum are all within easy reach — the city’s energy and its quieter side, both close at hand.',
        },
        image: '/images/nagoya/castle-01.webp',
      },
      {
        title: { ja: '静けさと快適さを重視した客室設計', en: 'Rooms designed around quiet and comfort' },
        body: {
          ja: '客室はすべて、静けさと快適さを重視した設計。窓の外には稲沢の街並みが広がり、旅の合間にほっとひと息つける、穏やかな時間をお届けします。',
          en: 'Every room is designed for quiet and comfort. Outside the window, the streets of Inazawa — and inside, an easy pause between the days of a trip.',
        },
        image: '/images/nagoya/nagoya-03.webp',
      },
    ],
    rooms: [
      { name: { ja: 'ダブルルーム', en: 'Double Room' }, image: '/images/nagoya/room-01.webp' },
      { name: { ja: 'ツインルーム', en: 'Twin Room' }, image: '/images/nagoya/room-02.webp' },
      { name: { ja: 'トリプルルーム', en: 'Triple Room' }, image: '/images/nagoya/room-03.webp' },
    ],
    gallery: [
      { src: '/images/nagoya/nagoya-01.webp', caption: { ja: '客室', en: 'Guest room' } },
      { src: '/images/nagoya/nagoya-02.webp', caption: { ja: 'ツインルーム', en: 'Twin room' } },
      { src: '/images/nagoya/nagoya-03.webp', caption: { ja: 'パウダールーム', en: 'Powder room' } },
      { src: '/images/nagoya/nagoya-04.webp', caption: { ja: '館内', en: 'Interior' } },
    ],
    info: {
      address: {
        ja: '〒492-8137 愛知県稲沢市国府宮3丁目1-12',
        en: '3-1-12 Konomiya, Inazawa, Aichi 492-8137',
      },
      tel: '05-8724-6608',
      rooms: { ja: '全33室', en: '33 rooms' },
    },
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3258.1304950549825!2d136.8013639856531!3d35.253009183075534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f80!3m3!1m2!1s0x6003a10071510af9%3A0x792b64789ebb35db!2sNagoya%20Premium%20Hotel!5e0!3m2!1sja!2sjp!4v1745992741157!5m2!1sja!2sjp',
    booking: [
      { label: { ja: 'Expediaで空室を見る', en: 'Check availability on Expedia' }, href: 'https://expe.app.link/CgQTljpNESb' },
    ],
  },
  {
    slug: 'toji',
    name: 'PREMIUM TOJI',
    nameJa: 'プレミアム東寺',
    stars: 3,
    rating: { score: '4.5', asOf: '2025.05.12' },
    location: { ja: '京都府 京都市南区', en: 'Minami-ku, Kyoto' },
    hero: '/images/toji/toji-01.webp',
    tagline: {
      ja: '歴史と文化が息づく東寺の目の前、古都京都の贅沢な滞在を',
      en: 'More than a trip. A journey into Japan.',
    },
    kicker: {
      ja: '世界遺産・東寺の目の前で、京都の時間に泊まる。',
      en: 'Sleep on Kyoto time, directly opposite a World Heritage site.',
    },
    lede: {
      ja: '究極の京都プレミアム体験',
      en: 'The definitive Kyoto stay.',
    },
    about: {
      title: { ja: '世界遺産・東寺の目の前', en: 'Directly opposite Toji Temple' },
      body: {
        ja: '1200年以上の歴史を刻む、平安京唯一の遺構——東寺。日本初の密教寺院として知られるこの世界遺産の"すぐ前"に佇む PREMIUM TOJI は、古都の静けさと現代的な快適さを両立させたホテルです。\n\n南側の客室からは、東寺の象徴的な五重塔を望む眺望。朝の光、夕暮れ、夜の静寂——時間とともに表情を変える東寺を、客室でゆったりとお楽しみください。',
        en: 'Toji has stood for more than twelve hundred years — the only remaining structure of the old capital of Heian-kyo, and Japan’s first temple of esoteric Buddhism. PREMIUM TOJI stands directly across from this World Heritage site, holding the quiet of the old city alongside modern comfort.\n\nSouth-facing rooms look onto Toji’s five-storey pagoda. Morning light, dusk, the stillness of night — watch the temple change through the day, from your own room.',
      },
    },
    features: [
      {
        title: { ja: '京都の風情を感じられる、静けさを大切にしたホテル', en: 'A small hotel built around quiet' },
        body: {
          ja: 'PREMIUM TOJIは、客室数をあえて15室に限定したスモールホテルです。多くの宿泊者を迎えることよりも、ひとりひとりが落ち着いて過ごせる空間であることを大切にしています。\n\n賑わいを楽しむ京都ではなく、静かに京都と向き合うための滞在。PREMIUM TOJIは、そんな過ごし方を望む方に寄り添うホテルです。',
          en: 'We deliberately kept PREMIUM TOJI to fifteen rooms. Space for each guest to settle matters more to us than the number of guests we can take.\n\nThis is not the Kyoto of crowds — it is a stay for meeting the city quietly, and it is built for people who want exactly that.',
        },
        image: '/images/toji/toji-06.webp',
      },
      {
        title: { ja: '観光にも、移動にも便利な立地', en: 'Easy for sightseeing, easy for moving on' },
        body: {
          ja: '京都駅からほど近く、観光にも移動にも使いやすい立地にあります。目の前には世界遺産 東寺があり、朝夕の静かな時間に気軽に立ち寄れる距離感も魅力です。\n\n清水寺や金閣寺、京都水族館など、主要な観光地へも無理なく移動できます。チェックイン前後の移動や、早朝・深夜の移動にも負担が少なく、京都での滞在時間を落ち着いて使える拠点です。',
          en: 'Close to Kyoto Station, and easy in both directions. Toji itself is right outside — near enough to visit in the quiet of early morning or evening.\n\nKiyomizu-dera, Kinkaku-ji and the Kyoto Aquarium are all comfortably reachable, and early or late transfers are no trouble. A base that lets you spend your Kyoto hours unhurried.',
        },
        image: '/images/toji/toji-07.webp',
      },
    ],
    gallery: [
      { src: '/images/toji/toji-04.webp', caption: { ja: '五重塔を望む客室', en: 'Room with pagoda view' } },
      { src: '/images/toji/toji-03.webp', caption: { ja: '東寺 五重塔', en: 'Toji five-storey pagoda' } },
      { src: '/images/toji/toji-08.webp', caption: { ja: '客室', en: 'Guest room' } },
      { src: '/images/toji/toji-05.webp', caption: { ja: 'ホテル外観', en: 'Hotel exterior' } },
    ],
    info: {
      address: {
        ja: '〒601-8437 京都市南区西九条比永城町119番地',
        en: '119 Hieigijo-cho, Nishikujo, Minami-ku, Kyoto 601-8437',
      },
      rooms: { ja: '全15室', en: '15 rooms' },
    },
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7415.9128867342815!2d135.75165824302456!3d34.975565926303965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6001078d95fad2ab%3A0x4b50daa93cb2371a!2sPREMIUM%20TOJI!5e0!3m2!1sja!2sjp!4v1768878801561!5m2!1sja!2sjp',
    booking: [
      { label: { ja: 'Expediaで空室を見る', en: 'Check availability on Expedia' }, href: 'https://expe.app.link/CgQTljpNESb' },
    ],
  },
];

export function getHotel(slug: string) {
  return hotels.find((h) => h.slug === slug);
}
