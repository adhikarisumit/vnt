import type { L10n } from '@/lib/i18n';

/**
 * Japanese copy on this page is taken verbatim from the live site (line breaks
 * included). English is our own translation. Where the live site repeats a
 * block or carries another hotel's text by mistake, that is noted inline.
 */

type Block = { title: L10n; body: L10n; image: string };

export type Hotel = {
  slug: 'fuji' | 'nagoya' | 'toji';
  /** Name on cards, the hub page, footer and menu. */
  name: string;
  /** Title on the hotel's own page, where the live site uses a longer form. */
  pageTitle?: string;
  nameJa: string;
  stars: number;
  rating?: { score: string; asOf: string };
  location: L10n;
  /** Photo on the hotel's own page. */
  hero: string;
  /** Photo on the home-page card. */
  cardImage: string;
  youtubeId?: string;
  tagline: L10n;
  /** English line printed under the tagline on every hotel page. */
  heroEn: string;
  /** Block on the PREMIUM HOTEL hub page. */
  hub: { title: L10n; body: L10n; image: string; divider?: string };
  about: { title: L10n; lede: L10n; body: L10n };
  /** Image + text blocks that follow the about copy. */
  highlights: Block[];
  movieText?: L10n;
  special: { intro: L10n; blocks: Block[] };
  rooms?: { lead: L10n; items: { name: L10n; image: string }[]; closing: L10n };
  gallery: string[];
  info: { address: L10n; tel?: string; fax?: string; rooms?: L10n };
  mapEmbed: string;
  booking?: { label: string; href: string }[];
};

const HERO_EN = 'an unforgettable Hotel,\nan unforgettable journey';

// The live site links every hotel's RESERVE button to this same Expedia URL.
const EXPEDIA = 'https://expe.app.link/CgQTljpNESb';

const BATH: Block = {
  title: { ja: '心と体を解きほぐす\n天然麦飯石の大浴場', en: 'A bakuhanseki stone bath\nthat unwinds body and mind' },
  body: {
    ja: '天然の麦飯石を使用した人工温泉「性石温泉大浴場」で、体の芯から温まるリラクゼーションをお楽しみください。\n\n大浴場は、宿泊者だけが利用できる特別な癒しの空間です。旅の疲れを優しく癒し、次の日への活力を養うひとときをお過ごしいただけます。',
    en: 'Warm through to the core in the “Shoseki Onsen” large bath, an artificial hot spring drawn over natural bakuhanseki stone.\n\nThe large bath is reserved for staying guests — a quiet place to ease the day’s travel and gather energy for tomorrow.',
  },
  image: '/images/fuji/onsen-01.webp',
};

export const hotels: Hotel[] = [
  {
    slug: 'fuji',
    name: 'FUJI PREMIUM HOTEL',
    nameJa: '富士プレミアムホテル',
    stars: 4,
    rating: { score: '4.8', asOf: '25.5.12' },
    location: { ja: '山梨県 富士吉田市', en: 'Fujiyoshida, Yamanashi' },
    hero: '/images/fuji/fuji-03.webp',
    cardImage: '/images/fuji/fuji-03.webp',
    youtubeId: 'ftSHii6YhUs',
    tagline: {
      ja: '富士山を望む、忘れられない旅路の宿',
      en: 'An inn facing Mt. Fuji, for a journey you will not forget',
    },
    heroEn: HERO_EN,
    hub: {
      title: { ja: '富士山を望む、忘れられない旅路の宿', en: 'An inn facing Mt. Fuji, for a journey you will not forget' },
      body: {
        ja: '富士山を眺めながら過ごす時間は、心を豊かに。\n\n富士山とは、日本の自然の象徴。\n四季折々の姿を見せる雄大な山の景色は、\n日常と非日常、静寂と賑わい、癒しと冒険をつなぐ場所です。\n\nそんな特別なロケーションで、\n眺め、触れ、心に刻むことで、\nかけがえのない体験を。\n\nFuji Premium Hotelは、\nその思いを大切にしながら、\n富士山とともに過ごす贅沢な瞬間を提供するホテルです。',
        en: 'Time spent looking out at Mt. Fuji enriches the heart.\n\nMt. Fuji is the symbol of Japan’s nature. Changing with every season, the mountain connects the everyday and the extraordinary, stillness and bustle, rest and adventure.\n\nIn a place this special — to look, to touch, to keep it in your heart — is an experience like no other.\n\nFuji Premium Hotel holds to that thought, offering luxurious moments spent together with Mt. Fuji.',
      },
      image: '/images/fuji/fuji-01.webp',
      divider: HERO_EN,
    },
    about: {
      title: { ja: '富士山と共に泊まる、贅沢なひととき', en: 'A luxurious stay, together with Mt. Fuji' },
      lede: { ja: '富士山を眺めながら過ごす時間は、心を豊かに。', en: 'Time spent looking out at Mt. Fuji enriches the heart.' },
      body: {
        ja: '富士山とは、日本の自然の象徴。\n四季折々の姿を見せる雄大な山の景色は、\n日常と非日常、静寂と賑わい、癒しと冒険をつなぐ場所です。\n\nそんな特別なロケーションで、\n眺め、触れ、心に刻むことで、\nかけがえのない体験を。\n\nFuji Premium Hotelは、\nその思いを大切にしながら、\n富士山とともに過ごす贅沢な瞬間を提供するホテルです。',
        en: 'Mt. Fuji is the symbol of Japan’s nature.\nChanging with every season, the mountain\nconnects the everyday and the extraordinary, stillness and bustle, rest and adventure.\n\nIn a place this special —\nto look, to touch, to keep it in your heart —\nis an experience like no other.\n\nFuji Premium Hotel\nholds to that thought,\noffering luxurious moments spent together with Mt. Fuji.',
      },
    },
    highlights: [
      {
        title: { ja: '富士山を一望できる\n特別なロケーション', en: 'A special location\nwith Mt. Fuji in full view' },
        body: {
          // The live site's third sentence reads 「ぜひ、お気静寂と自然に…軽にお立ち寄りください。」,
          // two sentences spliced together; restored here to the evident wording.
          ja: 'Fuji Premium Hotelは、山梨県富士吉田市の河口湖と山中湖の間に位置し、日本最高峰・富士山を目の前に望む特別な場所にあります。\n\n全50室の客室からは、四季折々の表情を見せる富士山の雄大な景色を楽しむことができ、滞在そのものが特別な思い出となります。\n\nぜひ、静寂と自然に包まれた環境で、非日常のひとときをお過ごしください。お気軽にお立ち寄りください。',
          en: 'Fuji Premium Hotel stands in Fujiyoshida, Yamanashi, between Lake Kawaguchi and Lake Yamanaka, directly facing Japan’s highest peak.\n\nFrom all 50 guest rooms you can take in Mt. Fuji as it changes through the seasons, so the stay itself becomes a special memory.\n\nSpend a moment away from the everyday, surrounded by quiet and nature. Please feel free to drop in.',
        },
        image: '/images/fuji/fuji-01.webp',
      },
    ],
    movieText: {
      ja: '富士山の麓に広がる富士吉田市に位置する当ホテルは、圧巻の富士山ビューと心安らぐ滞在空間を提供する特別な場所です。館内の随所から四季折々の富士山の表情を眺めることができ、朝焼けに染まる荘厳な姿や、夕暮れに佇む幻想的なシルエットなど、訪れるたびに異なる風景をお楽しみいただけます。',
      en: 'Set in Fujiyoshida at the foot of Mt. Fuji, the hotel offers breathtaking views of the mountain and a calm place to stay. From all around the building you can watch Mt. Fuji change with the seasons — majestic in the glow of dawn, a dreamlike silhouette at dusk — a different view every time you visit.',
    },
    special: {
      intro: {
        ja: '館内には、ゆったりくつろげる温泉をご用意。客室は、富士山を一望できるように設計され、窓を開けると目の前に広がる雄大な景色が、日常を忘れさせてくれる特別なひとときを演出します。',
        en: 'The hotel has a hot-spring bath to relax in. Rooms are designed to take in the whole of Mt. Fuji — open the window and the view in front of you lets the everyday fall away.',
      },
      // The live site repeats the location block here; it is shown once, above.
      blocks: [BATH],
    },
    gallery: ['/images/fuji/fuji-02.webp', '/images/fuji/fuji-01.webp', '/images/fuji/info-top.webp', '/images/fuji/onsen-01.webp'],
    info: {
      address: {
        ja: '〒403-0032 山梨県富士吉田市上吉田東５丁目１０−１２',
        en: '5-10-12 Kamiyoshida-higashi, Fujiyoshida, Yamanashi 403-0032',
      },
      tel: '0555-22-6808',
      fax: '0555-22-6809',
      rooms: { ja: '全50室', en: '50 rooms' },
    },
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d203.10042931021547!2d138.8037714636366!3d35.46452597566521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f150!3m3!1m2!1s0x60196700586a392f%3A0x87df7aa3b32a3426!2sFuji%20Premium%20Hotel!5e0!3m2!1sja!2sjp!4v1745992273646!5m2!1sja!2sjp',
    booking: [
      { label: 'Expedia', href: EXPEDIA },
      { label: 'Google', href: 'https://maps.app.goo.gl/9dFUmefu89cxFRYUA' },
      { label: 'Agoda', href: 'https://www.agoda.com/ja-jp/fuji-premium-hotel/hotel/fujikawaguchiko-jp.html?cid=1922886' },
    ],
  },
  {
    slug: 'nagoya',
    name: 'NAGOYA PREMIUM HOTEL',
    nameJa: '名古屋プレミアムホテル',
    stars: 3,
    location: { ja: '愛知県 稲沢市・国府宮', en: 'Konomiya, Inazawa, Aichi' },
    hero: '/images/nagoya/nagoya-05.webp',
    cardImage: '/images/nagoya/nagoya-05.webp',
    tagline: {
      ja: '心踊る、名古屋の旅のよりどころ。',
      en: 'A heart-lifting home base for your Nagoya trip.',
    },
    heroEn: HERO_EN,
    hub: {
      title: { ja: '文化とグルメを味わう名古屋の拠点', en: 'A Nagoya base for culture and food' },
      body: {
        ja: '当ホテルは、名古屋市内に位置する、\n旅の拠点として便利なホテルです。\n\n滞在中は、名古屋名物の味噌カツやひつまぶしなどの\nグルメを楽しんだり、\n熱田神宮や徳川美術館などの歴史あるスポットを訪れたりと、\nこの街ならではの魅力に触れることができます。\n\n観光にもビジネスにも最適な立地で、心地よい名古屋滞在をお手伝いします。',
        en: 'A convenient base for travelling Nagoya.\n\nDuring your stay, enjoy local specialities such as miso katsu and hitsumabushi, or visit historic places like Atsuta Shrine and the Tokugawa Art Museum — the charms only this city has.\n\nWell placed for sightseeing and business alike, we help make your Nagoya stay a comfortable one.',
      },
      image: '/images/nagoya/nagoya-05.webp',
    },
    about: {
      title: { ja: '名古屋と共に泊まる、贅沢なひととき', en: 'A luxurious stay, together with Nagoya' },
      lede: { ja: '名古屋の街を歩く時間は、新しい出会いを豊かに。', en: 'Time spent walking Nagoya enriches every new encounter.' },
      body: {
        ja: '名古屋とは、歴史と未来が交差する都市。\n伝統と革新、美食と文化が織りなす風景は、\n旅と日常、静けさと賑わい、発見と癒しをつなぐ場所です。\n\nそんな魅力あふれるロケーションで、\n感じ、味わい、心に残すことで、\nあなただけの特別な体験を。\n\nNagoya Premium Hotelは、\nその思いを大切にしながら、\n名古屋とともに過ごす、かけがえのないひとときを。',
        en: 'Nagoya is a city where history and the future cross.\nTradition and innovation, food and culture weave a landscape\nthat connects travel and daily life, calm and bustle, discovery and rest.\n\nIn a place this full of charm —\nto feel it, taste it, keep it —\nis an experience that is yours alone.\n\nNagoya Premium Hotel\nholds to that thought,\noffering irreplaceable time spent together with Nagoya.',
      },
    },
    highlights: [
      {
        title: { ja: '名古屋の歴史と文化に寄り添う\n特別なロケーション', en: 'A special location\nclose to Nagoya’s history and culture' },
        body: {
          ja: 'Nagoya Premium Hotelは、愛知県稲沢市・国府宮に位置し、\n名古屋の中心地からのアクセスも良好な、落ち着いた環境に佇んでいます。\n\n全33室の客室は、静かな時間を大切にした設計で、\nビジネスや観光の拠点としてご利用いただく方々に、\n心やすらぐ滞在をご提供します。\n\n歴史ある国府宮神社や名古屋の名所にも程近く、\n都市の賑わいと落ち着きの両方を感じられるこの場所で、\nあなただけの特別な時間をお過ごしください。',
          en: 'Nagoya Premium Hotel stands in Konomiya, Inazawa, Aichi — a calm setting with good access to central Nagoya.\n\nAll 33 rooms are designed around quiet time, giving a restful stay to guests using the hotel as a base for business or sightseeing.\n\nClose to the historic Konomiya Shrine and Nagoya’s sights, it is a place to feel both the city’s energy and its calm — spend a special time of your own here.',
        },
        image: '/images/nagoya/nagoya-01.webp',
      },
    ],
    // The live Nagoya page shows the Fuji hotel film and Fuji's description
    // under THE HOTEL MOVIE — a copy-paste slip, so no film section here.
    special: {
      intro: {
        ja: '客室はすべて、静けさと快適さを重視した設計。窓の外には稲沢の街並みが広がり、旅の合間にほっとひと息つける、穏やかな時間をお届けします。',
        en: 'Every room is designed for quiet and comfort. Outside the window, the streets of Inazawa — a calm place to catch your breath between the days of a trip.',
      },
      blocks: [
        {
          title: { ja: '名古屋観光の拠点にぴったりの\n穏やかなロケーション', en: 'A calm location,\nideal for exploring Nagoya' },
          body: {
            ja: 'Nagoya Premium Hotelは、愛知県稲沢市・国府宮に位置し、\n名古屋市内や主要観光地へのアクセスも良好な落ち着いた環境にあります。\n\n全33室の客室は、心地よい静けさと機能性を兼ね備え、\n観光やビジネスの合間にリラックスできる空間をご提供します。\n\nどうぞ、日常から少し離れた穏やかな時間をお過ごしください。\n気軽に、そして心ゆくまで、名古屋の滞在をお楽しみいただけます。',
            en: 'In Konomiya, Inazawa, Aichi, the hotel sits in a calm setting with good access to central Nagoya and the main sights.\n\nAll 33 rooms combine comfortable quiet with practicality — a place to relax between sightseeing and business.\n\nSpend some peaceful time a little away from the everyday, and enjoy your stay in Nagoya at your own pace.',
          },
          image: '/images/nagoya/nagoya-02.webp',
        },
        BATH,
      ],
    },
    rooms: {
      lead: {
        ja: '客室は、一人旅のお客様からご家族・団体でのご利用まで、さまざまなスタイルに寄り添えるよう設計されています。静けさと快適さを大切にしながら、どなたにも旅の合間に心安らぐひとときをお過ごしいただけます。',
        en: 'Rooms are designed for every style of stay, from solo travellers to families and groups — quiet and comfortable, so everyone can rest between the days of a trip.',
      },
      items: [
        { name: { ja: 'ダブルルーム', en: 'Double Room' }, image: '/images/nagoya/room-01.webp' },
        { name: { ja: 'ツインルーム', en: 'Twin Room' }, image: '/images/nagoya/room-02.webp' },
        { name: { ja: 'トリプルルーム', en: 'Triple Room' }, image: '/images/nagoya/room-03.webp' },
      ],
      closing: {
        ja: '名古屋観光の拠点として便利な立地に、心地よい客室と穏やかな街並み。一人旅からご家族・グループまで、それぞれの旅に寄り添う滞在をご提供します。',
        en: 'Comfortable rooms and quiet streets, in a convenient base for Nagoya. From solo trips to families and groups, a stay that fits every journey.',
      },
    },
    gallery: ['/images/nagoya/nagoya-01.webp', '/images/nagoya/nagoya-02.webp', '/images/nagoya/nagoya-03.webp', '/images/nagoya/nagoya-04.webp'],
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
    booking: [{ label: 'Expedia', href: EXPEDIA }],
  },
  {
    slug: 'toji',
    name: 'PREMIUM TOJI',
    pageTitle: 'PREMIUM TOJI HOTEL',
    nameJa: 'プレミアム東寺',
    stars: 3,
    rating: { score: '4.5', asOf: '25.5.12' },
    location: { ja: '京都府 京都市南区', en: 'Minami-ku, Kyoto' },
    hero: '/images/toji/toji-02.webp',
    cardImage: '/images/toji/toji-01.webp',
    tagline: {
      ja: '歴史と文化が息づく東寺の目の前、\n古都京都の贅沢な滞在を',
      en: 'Right before Toji, alive with history and culture —\na luxurious stay in the old capital',
    },
    heroEn: HERO_EN,
    hub: {
      title: { ja: '究極の京都プレミアム体験', en: 'The ultimate Kyoto premium experience' },
      body: {
        ja: '当ホテルは、京都の歴史が交わる\n世界遺産「東寺」の目の前のホテルです。\nカーテンを開ければ、朝日とともに世界遺産が飛び込んできます。\nご滞在中、京都ならではの美しい瞬間を\n心ゆくまでお楽しみください。',
        en: 'The hotel stands directly in front of Toji, the World Heritage temple where Kyoto’s history meets.\nOpen the curtains and the World Heritage site comes in with the morning sun.\nDuring your stay, enjoy to the full the beautiful moments only Kyoto can offer.',
      },
      image: '/images/toji/toji-08.webp',
      divider: 'More Than a Trip.\nA Journey into Japan.',
    },
    about: {
      title: { ja: '世界遺産・東寺の目の前', en: 'Directly in front of World Heritage Toji' },
      lede: { ja: '世界遺産・東寺の目の前で、京都の時間に泊まる。', en: 'Stay on Kyoto time, right in front of World Heritage Toji.' },
      body: {
        ja: '1200年以上の歴史を刻む、平安京唯一の遺構――東寺。\n\n日本初の密教寺院として知られるこの世界遺産の“すぐ前”に佇む PREMIUM TOJI は、古都の静けさと現代的な快適さを両立させたホテルです。\n\n観光の拠点でありながら、日常から一歩離れた、穏やかな滞在をお届けします。',
        en: 'Toji has stood for over 1,200 years — the only surviving remnant of the Heian capital.\n\nStanding “right in front” of this World Heritage site, known as Japan’s first temple of esoteric Buddhism, PREMIUM TOJI brings together the quiet of the old capital and modern comfort.\n\nA base for sightseeing that is also a calm stay, one step away from the everyday.',
      },
    },
    highlights: [
      {
        title: { ja: '東寺を望む、贅沢な客室', en: 'Luxurious rooms overlooking Toji' },
        body: {
          ja: '南側の客室からは、東寺の象徴的な五重塔を望む眺望。\n\n朝の光、夕暮れ、夜の静寂――時間とともに表情を変える東寺を、客室でゆったりとお楽しみください。',
          en: 'South-facing rooms look out on Toji’s iconic five-storey pagoda.\n\nMorning light, dusk, the silence of night — enjoy Toji as it changes through the day, at ease in your room.',
        },
        image: '/images/toji/toji-04.webp',
      },
    ],
    special: {
      intro: {
        ja: '館内には、静かに過ごせるラウンジスペースをご用意。一部客室からは世界遺産 東寺 を望むことができ、窓の向こうに広がる歴史ある景色が、京都での時間をより深く、穏やかなものにしてくれます。',
        en: 'The hotel has a quiet lounge space. Some rooms look out on World Heritage Toji, and the historic view beyond the window makes your time in Kyoto deeper and calmer.',
      },
      blocks: [
        {
          title: { ja: '京都の風情を感じられる,\n静けさを大切にしたホテルです。', en: 'A hotel that treasures quiet,\nwith the feel of Kyoto' },
          body: {
            ja: 'PREMIUM TOJIは、客室数をあえて15室に限定したスモールホテルです。\n\n多くの宿泊者を迎えることよりも、ひとりひとりが落ち着いて過ごせる空間であることを大切にしています。\n\n賑わいを楽しむ京都ではなく、\n静かに京都と向き合うための滞在。\nPREMIUM TOJIは、そんな過ごし方を望む方に寄り添うホテルです。',
            en: 'PREMIUM TOJI is a small hotel, deliberately limited to 15 rooms.\n\nRather than welcoming many guests, we value a space where each guest can settle in.\n\nNot the Kyoto of crowds,\nbut a stay for meeting Kyoto quietly.\nPREMIUM TOJI is a hotel for people who want to spend their time that way.',
          },
          image: '/images/toji/toji-06.webp',
        },
        {
          title: { ja: '観光にも、\n移動にも便利な立地', en: 'Convenient for sightseeing\nand for getting around' },
          body: {
            ja: 'PREMIUM TOJIは、京都駅 からほど近く、観光にも移動にも使いやすい立地にあります。\n\n目の前には世界遺産 東寺 があり、朝夕の静かな時間に気軽に立ち寄れる距離感も魅力です。\n\n京都駅を起点に、市内各所へのアクセスもスムーズ。\n清水寺 や 金閣寺、京都水族館 など、主要な観光地へも無理なく移動できます。\n\nチェックイン前後の移動や、早朝・深夜の移動にも負担が少なく、\n京都での滞在時間を落ち着いて使える拠点です。',
            en: 'PREMIUM TOJI is close to Kyoto Station, well placed for both sightseeing and travel.\n\nWorld Heritage Toji is right in front, close enough to visit in the quiet of morning or evening.\n\nFrom Kyoto Station, the rest of the city is easy to reach — Kiyomizu-dera, Kinkaku-ji, the Kyoto Aquarium and other major sights are all comfortably within reach.\n\nTravel before and after check-in, early in the morning or late at night, is easy too — a base that lets you use your time in Kyoto calmly.',
          },
          image: '/images/toji/toji-07.webp',
        },
      ],
    },
    gallery: ['/images/toji/toji-02.webp', '/images/toji/toji-03.webp', '/images/toji/toji-04.webp', '/images/toji/toji-05.webp'],
    info: {
      address: {
        ja: '〒601-8437　京都市南区西九条比永城町119番地',
        en: '119 Hieigijo-cho, Nishikujo, Minami-ku, Kyoto 601-8437',
      },
      rooms: { ja: '15室', en: '15 rooms' },
    },
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7415.9128867342815!2d135.75165824302456!3d34.975565926303965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6001078d95fad2ab%3A0x4b50daa93cb2371a!2sPREMIUM%20TOJI!5e0!3m2!1sja!2sjp!4v1768878801561!5m2!1sja!2sjp',
    // The live Toji page also links Fuji's Agoda and Google listings — left out.
    booking: [{ label: 'Expedia', href: EXPEDIA }],
  },
];

/** Hub page order on the live site: Fuji, Toji, Nagoya. */
export const hubOrder: Hotel['slug'][] = ['fuji', 'toji', 'nagoya'];

export function getHotel(slug: string) {
  return hotels.find((h) => h.slug === slug);
}
