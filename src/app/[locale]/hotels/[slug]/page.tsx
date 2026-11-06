import { Fragment, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { Reveal } from '@/components/motion/Reveal';
import { MapEmbed } from '@/components/ui/MapEmbed';
import { VideoEmbed } from '@/components/ui/VideoEmbed';
import { HotelHeader } from '@/components/hotel/HotelHeader';
import { RoomGallery } from '@/components/hotel/RoomGallery';

import { getHotel, hotels, type Hotel } from '@/content/hotels';
import { getStay, type RouteMode, type Season } from '@/content/hotelStay';
import { getDictionary } from '@/content/dictionary';
import { isLocale, locales, localePath, t, type L10n, type Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export function generateStaticParams() {
  return locales.flatMap((locale) => hotels.map((h) => ({ locale, slug: h.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const hotel = getHotel(slug);
  if (!hotel) return {};
  const active: Locale = isLocale(locale) ? locale : 'ja';
  const title = hotel.pageTitle ?? hotel.name;

  return {
    title,
    description: t(hotel.about.body, active).replace(/\s+/g, ' ').slice(0, 150),
    openGraph: { title, images: [hotel.hero] },
  };
}

/** Clears the pinned hotel header when an in-page link lands. */
const ANCHOR = 'scroll-mt-28 md:scroll-mt-32 lg:scroll-mt-36';

/** Labels for the sections added to the live layout (客室・お食事・アクセス・周辺観光). */
const S = {
  rooms: { ja: '客室', en: 'Guest rooms' },
  dining: { ja: 'お食事', en: 'Dining' },
  access: { ja: 'アクセス', en: 'Access' },
  sightseeing: { ja: '周辺観光', en: 'Sightseeing' },
  checkIn: { ja: 'チェックイン', en: 'Check-in' },
  checkOut: { ja: 'チェックアウト', en: 'Check-out' },
  parking: { ja: '駐車場', en: 'Parking' },
  viewMap: { ja: '地図で見る', en: 'View on map' },
  routes: { ja: '交通のご案内', en: 'Getting here' },
  routeGuide: { ja: 'ルート案内', en: 'Route guide' },
  amenities: { ja: '客室設備', en: 'In the room' },
  bookRoom: { ja: 'この客室を予約する', en: 'Book this room' },
  officialSite: { ja: '公式サイト', en: 'Official site' },
  events: { ja: '季節の行事', en: 'Seasonal events' },
  eventsLead: {
    ja: '四季折々の祭りや行事に合わせて、旅の日程を選ぶのもおすすめです。',
    en: 'Plan your trip around the festivals and events of each season.',
  },
  features: { ja: 'ホテルの特徴', en: 'Hotel features' },
  hotelInfo: { ja: 'ホテル情報', en: 'Hotel information' },
  groupDesk: { ja: '団体受付', en: 'Group desk' },
  groupTitle: { ja: '団体予約はこちらから', en: 'Group bookings' },
  checkAvailability: { ja: 'ホテルの空き情報を確認する', en: 'Check availability' },
  contactForm: { ja: 'お問い合わせフォームへ', en: 'To the contact form' },
  telLabel: { ja: '電話番号', en: 'Tel' },
  faxLabel: { ja: 'FAX番号', en: 'Fax' },
  roomsSub: { ja: '客室紹介', en: 'Our rooms' },
  services: { ja: 'サービス内容', en: 'Services' },
  book: { ja: '予約する', en: 'Reserve' },
  diningSub: { ja: 'お食事のご案内', en: 'Dining guide' },
  accessSub: { ja: '地図・所在地', en: 'Map and address' },
  sightseeingSub: { ja: '観光スポットと体験', en: 'Spots and experiences' },
  fromHotel: { ja: 'ホテルから', en: 'From the hotel' },
  area: { ja: 'エリア情報', en: 'Area information' },
  areaSub: { ja: '周辺施設', en: 'Nearby facilities' },
  addressLabel: { ja: '住所', en: 'Address' },
  hours: { ja: '営業時間', en: 'Hours' },
  when: { ja: '開催日／', en: 'When: ' },
  where: { ja: '開催場所／', en: 'Where: ' },
  timeNote: { ja: '※所要時間は目安です。交通状況により異なります。', en: '* Travel times are approximate and vary with traffic.' },
  eventsNote: { ja: '※開催日程は年により変わります。最新情報をご確認ください。', en: '* Dates change each year; please check the official information.' },
} satisfies Record<string, L10n>;

const SEASON: Record<Season, { mark: string; en: string }> = {
  spring: { mark: '春', en: 'Spring' },
  summer: { mark: '夏', en: 'Summer' },
  autumn: { mark: '秋', en: 'Autumn' },
  winter: { mark: '冬', en: 'Winter' },
};

/** Solid red button, as the reference's 予約する. */
const BTN =
  'inline-flex items-center justify-center rounded-md bg-brass px-10 py-3 text-[0.875rem] tracking-[0.12em] text-white transition-opacity hover:opacity-80';

/** Japanese group titles for the dining cards (grouped by their label). */
const DINING_GROUP: Record<string, L10n> = {
  Breakfast: { ja: 'ご朝食', en: 'Breakfast' },
  'Local Food': { ja: '地元グルメ', en: 'Local food' },
  'Nagoya Meshi': { ja: '名古屋めし', en: 'Nagoya meshi' },
  'Kyoto Cuisine': { ja: '京の味', en: 'Kyoto cuisine' },
  Neighbourhood: { ja: '周辺のお店', en: 'Around the hotel' },
};
const mapsUrl = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const MODE_LABEL: Record<RouteMode, L10n> = {
  train: { ja: '電車', en: 'Train' },
  car: { ja: 'お車', en: 'Car' },
  bus: { ja: 'バス', en: 'Bus' },
  walk: { ja: '徒歩', en: 'Walk' },
  plane: { ja: '空港', en: 'Airport' },
};

/**
 * Photos the live STUDIO pages use that the hotel content does not carry
 * (hero, about portraits, the wide exterior, the four-photo strip). Only Fuji
 * has been pulled so far; the other hotels fall back to their own content.
 */
const LIVE_ART: Partial<
  Record<Hotel['slug'], { hero: string; thumb: string; about: [string, string]; wide: string; strip: string[]; ratings: boolean }>
> = {
  fuji: {
    hero: '/images/live/fuji/u6.jpg',
    thumb: '/images/live/fuji/u5.jpg',
    about: ['/images/live/fuji/about-1.webp', '/images/live/fuji/about-2.webp'],
    wide: '/images/live/fuji/building.webp',
    strip: ['/images/live/fuji/u2.jpg', '/images/live/fuji/u1.jpg', '/images/live/fuji/u3.jpg', '/images/live/fuji/u4.jpg'],
    ratings: true,
  },
};

/**
 * The live hotel page, kept as it is (own header, inset hero with the reserve
 * card and the black group box, ratings, ABOUT, MOVIE, WHATS SPECIAL, photo
 * strip, hotel information), with the estimate's common sections added in
 * the same look: 客室 after the features, お食事, then アクセス and 周辺観光
 * around the strip.
 */
export default async function HotelPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const hotel = getHotel(slug);
  if (!hotel) notFound();

  const active = locale as Locale;
  const dict = getDictionary(active);
  const title = hotel.pageTitle ?? hotel.name;
  const stay = getStay(hotel.slug);
  const L = (v: L10n) => t(v, active);
  const art = LIVE_ART[hotel.slug];

  const diningGroups = Array.from(
    stay.dining.items.reduce((map, item) => {
      const key = item.label;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(item);
      return map;
    }, new Map<string, typeof stay.dining.items>()),
  ).map(([label, items]) => ({ title: DINING_GROUP[label] ? L(DINING_GROUP[label]) : label, items }));  const reserveHref = hotel.booking?.[0]?.href ?? localePath(active, '/reservation');
  const strip = art?.strip ?? [...hotel.gallery, hotel.hero].slice(0, 4);

  const aboutRows = [
    { title: undefined, body: `${L(hotel.about.lede)}\n\n${L(hotel.about.body)}`, image: art?.about[0] ?? hotel.hub.image },
    ...hotel.highlights.map((block, i) => ({
      title: L(block.title),
      body: L(block.body),
      image: i === 0 && art ? art.about[1] : block.image,
    })),
  ];

  return (
    <div id="top">
      <HotelHeader
        name={title}
        stars={hotel.stars}
        reserveHref={reserveHref}
        homeHref={localePath(active)}
        links={[
          { id: 'top', label: 'トップ' },
          { id: 'about', label: 'ホテルについて' },
          { id: 'special', label: 'ホテルの特長' },
          { id: 'rooms', label: '客室' },
          { id: 'dining', label: 'お食事' },
          { id: 'access', label: 'アクセス' },
          { id: 'sightseeing', label: '周辺観光' },
        ]}
      />

      {/* Hero ------------------------------------------------------------ */}
      <section className="relative pb-28 md:pb-16">
        <div className="relative mx-auto h-[26rem] overflow-hidden md:mx-[4.2%] md:h-[clamp(30rem,45vw,41rem)]">
          <Image src={art?.hero ?? hotel.hero} alt={title} fill priority sizes="100vw" className="object-cover" />
          <div className="relative flex h-full flex-col items-center justify-center px-5 text-center text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.25)] md:-mt-6">
            <h1 className="font-[family-name:var(--font-tenor)] text-[clamp(1.6rem,3vw,2.6rem)] tracking-[0.15em]">{title}</h1>
            <p className="mt-1 text-[1.1rem] tracking-[0.2em] md:text-[1.35rem]">{'★'.repeat(hotel.stars)}</p>
            <p className="mt-5 text-[clamp(1.05rem,1.6vw,1.45rem)] tracking-[0.08em]">{L(hotel.tagline)}</p>
            <p className="mt-6 font-[family-name:var(--font-tenor)] text-[0.875rem] leading-[1.7] tracking-[0.15em] whitespace-pre-line md:text-base">
              {hotel.heroEn}
            </p>
          </div>
        </div>

        {/* Reserve card, bottom left, overlapping the photo. */}
        <a
          href={reserveHref}
          target={hotel.booking ? '_blank' : undefined}
          rel="noopener noreferrer"
          className="group absolute bottom-6 left-0 z-10 flex w-[min(92%,36rem)] items-center gap-4 bg-white py-4 pr-6 pl-3 shadow-[0_10px_30px_rgba(0,0,0,0.15)] md:bottom-0 md:gap-5"
        >
          <span className="writing-vertical font-[family-name:var(--font-tenor)] text-[0.75rem] tracking-[0.3em] text-ink-mute">ご予約</span>
          <span className="relative block h-[5.5rem] w-[7.5rem] shrink-0 overflow-hidden">
            <Image src={art?.thumb ?? hotel.gallery[0] ?? hotel.hero} alt="" fill sizes="120px" className="object-cover" />
          </span>
          <span className="flex min-w-0 flex-1 flex-col gap-4">
            <span className="text-[0.8125rem] text-black">{L(S.checkAvailability)}</span>
            <span className="self-end border-b border-black font-[family-name:var(--font-tenor)] text-[0.8125rem] tracking-[0.15em] text-black group-hover:opacity-60">
              ご予約
            </span>
          </span>
        </a>

        {/* Black group box, pinned bottom right like live. */}
        <div className="fixed right-0 bottom-0 z-[110] hidden w-[19rem] flex-col items-center bg-black px-8 py-8 text-white md:flex lg:w-[24rem]">
          <p className="text-[1.5rem] font-medium">{L(S.groupTitle)}</p>
          <a href="tel:08040979552" className="mt-3 flex items-center gap-3 text-[0.9375rem] hover:opacity-75">
            <PhoneIcon /> {L(S.groupDesk)}　080-4097-9552
          </a>
        </div>
      </section>

      {/* Phone: the group box sits under the hero instead of over it. */}
      <a href="tel:08040979552" className="mx-5 -mt-2 mb-4 flex flex-col items-center bg-black px-6 py-5 text-white md:hidden">
        <span className="text-[1.15rem] font-medium">{L(S.groupTitle)}</span>
        <span className="mt-2 flex items-center gap-2 text-[0.875rem]">
          <PhoneIcon /> {L(S.groupDesk)}　080-4097-9552
        </span>
      </a>

      {/* Ratings ---------------------------------------------------------- */}
      {art?.ratings && hotel.rating && (
        <section className="mx-auto grid max-w-[64rem] grid-cols-3 items-start gap-4 px-5 py-12 text-center md:py-16">
          <Rating logo="/images/live/fuji/rate-google.webp" w={300} h={59} label="Review">
            <span className="text-star">★★★★★</span>
            <span className="ml-2 text-[1.35rem] text-ink-mute md:text-[1.75rem]">{hotel.rating.score}</span>
            <span className="text-ink-mute"> / 5</span>
            <span className="ml-1 text-[0.5625rem] text-ink-mute">({hotel.rating.asOf})</span>
          </Rating>
          <Rating logo="/images/live/fuji/rate-agoda.webp" w={126} h={65} label="Hotel Rank">
            <span className="text-star">{'★'.repeat(hotel.stars)}</span>
          </Rating>
          <Rating logo="/images/live/fuji/rate-booking.webp" w={238} h={40} label="Hotel Rank">
            <span className="text-star">{'★'.repeat(hotel.stars)}</span>
          </Rating>
        </section>
      )}

      <SplitPanel>
        {/* ABOUT ---------------------------------------------------------- */}
        <section id="about" className={cn('pt-20 pb-10 md:pt-24', ANCHOR)}>
          <LiveHeading en={'ABOUT\nOUR HOTEL'} title={L(hotel.about.title)} />
          <div className="mt-16 space-y-20 md:mt-24 md:space-y-24">
            {aboutRows.map((row, i) => (
              <PhotoRow key={i} image={row.image} title={row.title} body={row.body} flip={i % 2 === 1} portrait />
            ))}
          </div>
        </section>

        {/* MOVIE ---------------------------------------------------------- */}
        {hotel.youtubeId && (
          <section className="pt-20 pb-16 md:pt-28">
            <LiveHeading en={'THE HOTEL\nMOVIE'} />
            <Reveal className="mx-auto mt-12 max-w-[37.5rem] px-5">
              <VideoEmbed
                id={hotel.youtubeId}
                poster={art?.wide ?? hotel.gallery[0] ?? hotel.hero}
                label={active === 'ja' ? '動画を再生' : 'Play film'}
                title={title}
              />
            </Reveal>
            {hotel.movieText && (
              <Reveal className="mx-auto mt-12 max-w-[46rem] px-5">
                <p className="type-body text-[0.8125rem]">{L(hotel.movieText)}</p>
              </Reveal>
            )}
            <div className="mt-10 text-center">
              <Link href={localePath(active, '/contact')} className="btn-live">
                {L(S.contactForm)}
              </Link>
            </div>
          </section>
        )}

        {art?.wide && (
          <div className="relative aspect-[1340/900] w-full md:aspect-[1340/640]">
            <Image src={art.wide} alt={title} fill sizes="(max-width: 1340px) 100vw, 1340px" className="object-cover" />
          </div>
        )}

        {/* WHATS SPECIAL -------------------------------------------------- */}
        <section id="special" className={cn('pt-20 pb-24 md:pt-28', ANCHOR)}>
          <LiveHeading en="WHATS SPECIAL" title={L(S.features)} lead={L(hotel.special.intro)} />
          <div className="mt-16 space-y-20 md:mt-20 md:space-y-16">
            {hotel.special.blocks.map((block, i) => (
              <PhotoRow
                key={i}
                image={i === 0 && art ? art.about[1] : block.image}
                title={L(block.title)}
                body={L(block.body)}
                flip={i % 2 === 1}
              />
            ))}
          </div>
        </section>

        {/* 客室 (new) ----------------------------------------------------- */}
</SplitPanel>

      {/* ============================================================
          共通テンプレート（見積 2：客室・お食事・アクセス・周辺観光）
          Laid out after the estimate's reference, goderehotel.com:
          Japanese title band per section, rounded white cards, spec
          table + 予約する per room, photo-card dining grid, map above
          the address + route box, two-column sightseeing cards and an
          エリア情報 block. VNT colours (black / red) instead of Godere's gold.
          ============================================================ */}

      {/* 客室 --------------------------------------------------------------- */}
      <section id="rooms" className={cn('bg-white pb-24', ANCHOR)}>
        <JpHeading title={L(S.rooms)} sub={L(S.roomsSub)} />
        <div className="mx-auto max-w-[76.25rem] px-5">
          <p className="type-body mx-auto mt-12 max-w-[46rem] text-center text-[0.8125rem]">{L(stay.rooms.lead)}</p>

          {stay.rooms.services && (
            <Reveal className="mt-12 rounded-xl bg-page-3 p-5 md:p-7">
              <p className="text-center text-[0.875rem] font-medium tracking-[0.08em] text-black">{L(S.services)}</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {stay.rooms.services.map((item, i) => (
                  <li key={i} className="rounded-lg border border-black/10 bg-white p-4">
                    <p className="border-l-[3px] border-brass pl-2.5 text-[0.8125rem] font-medium text-black">{L(item.title)}</p>
                    <p className="mt-2.5 text-[0.75rem] leading-[1.9] whitespace-pre-line text-ink-mute">{L(item.body)}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {stay.rooms.items.map((room, i) => (
            <article key={i} className="mt-16 md:mt-20">
              <RoomDivider />
              <Reveal className="mt-12 text-center">
                <h3 className="text-[1.5rem] font-medium tracking-[0.08em] text-black md:text-[1.75rem]">{L(room.name)}</h3>
                {room.facts?.[0] && <p className="mt-2 text-[0.8125rem] text-stone">{L(room.facts[0].value)}</p>}
              </Reveal>

              <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
                <Reveal className="rounded-xl bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                  <RoomGallery images={[room.image, ...(room.gallery ?? [])]} alt={L(room.name)} />
                </Reveal>

                <Reveal delay={0.08}>
                  <p className="text-[1rem] leading-[1.9] font-medium text-black">{L(room.body)}</p>

                  {room.facts && (
                    <dl className="mt-6 overflow-hidden rounded-lg border border-black/10 bg-white">
                      {room.facts.map((fact, k) => (
                        <div
                          key={k}
                          className={cn('grid grid-cols-[7rem_1fr] gap-4 px-5 py-3 text-[0.8125rem]', k > 0 && 'border-t border-black/10')}
                        >
                          <dt className="font-medium text-black">{L(fact.label)}</dt>
                          <dd className="text-ink-mute">{L(fact.value)}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {room.amenities && (
                    <>
                      <p className="mt-6 text-[0.75rem] text-stone">{L(S.amenities)}</p>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {room.amenities.map((item, k) => (
                          <li key={k} className="rounded-full border border-black/10 bg-page-3 px-3.5 py-1.5 text-[0.75rem] text-ink-mute">
                            {L(item)}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <div className="mt-8 rounded-lg bg-page-3 p-5 text-center">
                    <a href={reserveHref} target={hotel.booking ? '_blank' : undefined} rel="noopener noreferrer" className={BTN}>
                      {L(S.book)}
                    </a>
                  </div>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* お食事 ------------------------------------------------------------- */}
      <section id="dining" className={cn('bg-page-3 pb-24', ANCHOR)}>
        <JpHeading title={L(S.dining)} sub={L(S.diningSub)} />
        <div className="mx-auto max-w-[76.25rem] px-5">
          <p className="type-body mx-auto mt-12 max-w-[46rem] text-center text-[0.8125rem]">{L(stay.dining.lead)}</p>

          {diningGroups.map((group, g) => (
            <div key={g} className="mt-12">
              <h3 className="border-l-4 border-brass pl-3 text-[1rem] font-medium tracking-[0.04em] text-black">{group.title}</h3>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item, i) => (
                  <Reveal key={i} delay={(i % 3) * 0.06}>
                    <article className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                      {item.image ? (
                        <div className="relative aspect-4/3 w-full">
                          <Image src={item.image} alt={L(item.title)} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
                        </div>
                      ) : (
                        // No dish photo yet: a slim red-tinted band instead of an empty photo box.
                        <div aria-hidden className="h-2 w-full bg-brass/70" />
                      )}
                      <div className="flex flex-1 flex-col p-5">
                        <h4 className="text-[0.9375rem] font-medium text-black">{L(item.title)}</h4>
                        <p className="mt-2 text-[0.8125rem] leading-[1.9] text-ink-mute">{L(item.body)}</p>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Four-photo strip, full bleed, as on the live page ----------------- */}
      <div className="grid grid-cols-2 shadow-[0_24px_40px_-12px_rgba(0,0,0,0.25)] md:grid-cols-4">
        {strip.map((src, i) => (
          <div key={i} className="relative aspect-square">
            <Image src={src} alt="" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
          </div>
        ))}
      </div>

      {/* アクセス ----------------------------------------------------------- */}
      <section id="access" className={cn('bg-white pb-24', ANCHOR)}>
        <JpHeading title={L(S.access)} sub={L(S.accessSub)} />
        <div className="mx-auto max-w-[76.25rem] px-5">
          <p className="type-body mx-auto mt-12 max-w-[46rem] text-center text-[0.8125rem]">{L(stay.access.lead)}</p>

          <Reveal className="mt-12 overflow-hidden rounded-xl shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
            <MapEmbed src={hotel.mapEmbed} title={title} address={L(hotel.info.address)} cta={dict.common.openInMaps} height="h-[18rem] md:h-[26rem]" />
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="text-[0.6875rem] tracking-[0.2em] text-stone">{L(S.hotelInfo)}</p>
              <h3 className="mt-2 text-[1.5rem] font-medium tracking-[0.06em] text-brass">{hotel.nameJa}</h3>
              <p className="mt-4 text-[0.9375rem] font-medium text-black">{L(hotel.info.address)}</p>
              <ul className="mt-4 space-y-2.5 text-[0.875rem] text-ink-mute">
                <li className="flex items-center gap-3">
                  <PhoneIcon size={16} /> {L(S.groupDesk)}　
                  <a href="tel:08040979552" className="text-black">080-4097-9552</a>
                </li>
                {hotel.info.tel && (
                  <li className="flex items-center gap-3">
                    <PhoneIcon size={16} /> {L(S.telLabel)}　
                    <a href={`tel:${hotel.info.tel.replace(/-/g, '')}`}>{hotel.info.tel}</a>
                  </li>
                )}
                {hotel.info.fax && (
                  <li className="flex items-center gap-3">
                    <FaxIcon /> {L(S.faxLabel)}　{hotel.info.fax}
                  </li>
                )}
              </ul>

              {(stay.access.checkIn || stay.access.checkOut || stay.access.parking) && (
                <dl className="mt-8 border-t border-black/15 text-[0.8125rem]">
                  {stay.access.checkIn && <InfoRow label={L(S.checkIn)} value={stay.access.checkIn} />}
                  {stay.access.checkOut && <InfoRow label={L(S.checkOut)} value={stay.access.checkOut} />}
                  {stay.access.parking && <InfoRow label={L(S.parking)} value={L(stay.access.parking)} />}
                </dl>
              )}
            </Reveal>

            <Reveal delay={0.08} className="rounded-lg border-l-4 border-brass bg-page-3 p-6 md:p-8">
              <p className="text-[0.875rem] font-medium text-black">{L(S.routes)}</p>
              <ul className="mt-5 space-y-5">
                {stay.access.routes.map((route, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-black text-white">
                      <ModeIcon mode={route.mode} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.875rem] font-medium text-black">
                        {L(MODE_LABEL[route.mode])}：{L(route.from)}
                      </span>
                      <span className="mt-0.5 block text-[0.8125rem] text-ink-mute">{L(route.detail)}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {stay.access.journeys && (
            <div className="mt-14">
              <p className="text-[0.875rem] font-medium text-black">{L(S.routeGuide)}</p>
              <div className="mt-4 grid gap-5 lg:grid-cols-2">
                {stay.access.journeys.map((journey, i) => (
                  <Reveal key={i} delay={(i % 2) * 0.08} className="rounded-lg bg-page-3 p-6 md:p-8">
                    <p className="text-[0.875rem] font-medium text-black">{L(journey.title)}</p>
                    <ol className="mt-5 flex flex-col md:flex-row md:items-center">
                      {journey.steps.map((step, k) => {
                        const last = k === journey.steps.length - 1;
                        return (
                          <Fragment key={k}>
                            <li
                              className={cn(
                                'rounded-md px-3 py-3 text-center text-[0.8125rem] leading-snug md:min-w-[6rem]',
                                last ? 'bg-black text-white' : 'bg-white text-black shadow-[0_2px_8px_rgba(0,0,0,0.06)]',
                              )}
                            >
                              {L(step.place)}
                            </li>
                            {step.leg && (
                              <li className="relative flex items-center gap-3 py-4 pl-4 md:flex-1 md:flex-col md:gap-1.5 md:px-2 md:py-0">
                                <span aria-hidden className="absolute inset-y-0 left-[1.75rem] w-px bg-black/25 md:hidden" />
                                <span aria-hidden className="absolute inset-x-0 top-3.5 hidden h-px bg-black/25 md:block" />
                                <span className="relative flex size-7 shrink-0 items-center justify-center rounded-full bg-black text-white">
                                  <ModeIcon mode={step.leg.mode} />
                                </span>
                                <span className="relative text-[0.75rem] leading-snug whitespace-nowrap text-ink-mute md:text-center">
                                  {L(step.leg.text)}
                                </span>
                              </li>
                            )}
                          </Fragment>
                        );
                      })}
                    </ol>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 周辺観光 ----------------------------------------------------------- */}
      <section id="sightseeing" className={cn('bg-page-3 pb-24', ANCHOR)}>
        <JpHeading title={L(S.sightseeing)} sub={L(S.sightseeingSub)} />
        <div className="mx-auto max-w-[76.25rem] px-5">
          <p className="type-body mx-auto mt-12 max-w-[46rem] text-center text-[0.8125rem]">{L(stay.sightseeing.lead)}</p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {stay.sightseeing.spots.map((spot, i) => (
              <Reveal key={i} delay={(i % 2) * 0.06}>
                <article className="flex h-full flex-col rounded-xl bg-white p-3 shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
                  {spot.image ? (
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                      <Image src={spot.image} alt={L(spot.name)} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                    </div>
                  ) : (
                    // No photo supplied yet: a quiet grey panel with the name keeps the grid even.
                    <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-page-2 px-6 text-center">
                      <span className="text-[1rem] tracking-[0.1em] text-stone">{L(spot.name)}</span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col px-3 pt-5 pb-3">
                    <h3 className="text-[1.0625rem] font-medium tracking-[0.04em] text-black">{L(spot.name)}</h3>
                    <p className="mt-2 flex-1 text-[0.8125rem] leading-[1.9] text-ink-mute">{L(spot.body)}</p>
                    <p className="mt-4 text-[0.8125rem] font-medium text-brass">
                      {L(S.fromHotel)}：{L(spot.time)}
                    </p>
                    {spot.site && (
                      <p className="mt-2 text-[0.75rem] text-stone">
                        {L(S.officialSite)}
                        <br />
                        <a href={spot.site} target="_blank" rel="noopener noreferrer" className="break-all text-ink-mute underline-offset-2 hover:underline">
                          {spot.site}
                        </a>
                      </p>
                    )}
                    <a
                      href={mapsUrl(spot.query)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 w-fit border-b border-black text-[0.75rem] text-black transition-opacity hover:opacity-60"
                    >
                      {L(S.viewMap)} →
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-5 text-right text-[0.6875rem] text-stone">{L(S.timeNote)}</p>

          {stay.sightseeing.facilities && (
            <div className="mt-20">
              <JpHeading title={L(S.area)} sub={L(S.areaSub)} inline />
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {stay.sightseeing.facilities.map((item, i) => (
                  <Reveal key={i} delay={(i % 3) * 0.06}>
                    <article className="h-full rounded-xl bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                      <p className="border-b border-black/10 pb-3 text-[1rem] font-medium text-black">{L(item.kind)}</p>
                      <p className="mt-4 text-[0.875rem] font-medium text-black">{L(item.name)}</p>
                      {item.address && (
                        <p className="mt-1 text-[0.75rem] leading-[1.8] text-ink-mute">
                          {L(S.addressLabel)}：{item.address}
                        </p>
                      )}
                      {item.hours && (
                        <p className="mt-1 text-[0.75rem] text-ink-mute">
                          {L(S.hours)}：{L(item.hours)}
                        </p>
                      )}
                      <p className="mt-2 text-[0.75rem] font-medium text-brass">
                        {L(S.fromHotel)}：{L(item.time)}
                      </p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {stay.sightseeing.events && (
            <div className="mt-20">
              <JpHeading title={L(S.events)} sub={L(S.eventsLead)} inline />
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stay.sightseeing.events.map((event, i) => {
                  const season = SEASON[event.season];
                  return (
                    <Reveal key={i} delay={(i % 4) * 0.06}>
                      <article className="flex h-full flex-col rounded-xl bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                        <span className="type-mincho flex size-10 items-center justify-center rounded-full border border-black text-[1rem] text-black">
                          {season.mark}
                        </span>
                        <h4 className="mt-4 text-[1rem] font-medium text-black">{L(event.name)}</h4>
                        <dl className="mt-3 space-y-1 text-[0.75rem] text-ink-mute">
                          <div>
                            <dt className="inline">{L(S.when)}</dt>
                            <dd className="inline">{L(event.when)}</dd>
                          </div>
                          <div>
                            <dt className="inline">{L(S.where)}</dt>
                            <dd className="inline">{L(event.place)}</dd>
                          </div>
                        </dl>
                        <p className="mt-3 flex-1 text-[0.8125rem] leading-[1.9] text-ink-mute">{L(event.body)}</p>
                        <a
                          href={mapsUrl(event.query)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 self-start border-b border-black text-[0.75rem] text-black hover:opacity-60"
                        >
                          {L(S.viewMap)} →
                        </a>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
              <p className="mt-5 text-right text-[0.6875rem] text-stone">{L(S.eventsNote)}</p>
            </div>
          )}
        </div>
      </section>

      {/* Group logos band, as at the foot of the live hotel pages ---------- */}
      <section className="bg-page-3 py-14 text-center">
        <div className="flex items-center justify-center gap-10 md:gap-16">
          <Image src="/images/warakutei/logo-yakitori-b.svg" alt="和楽亭 焼鳥居酒屋" width={210} height={90} className="h-16 w-auto md:h-20" />
          <Image src="/images/warakutei/logo-yakiniku-b.svg" alt="和楽亭 極上和牛" width={210} height={90} className="h-14 w-auto md:h-16" />
        </div>
        <p className="mt-5 font-[family-name:var(--font-montserrat)] text-[0.6875rem] tracking-[0.08em] text-ink-mute">
          (C) Premium Hotel Group
        </p>
      </section>
    </div>
  );
}

/** The live pages' two-tone panel: #f0f0f0 left half, #f6f6f6 right, 1340px wide. */
function SplitPanel({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-[83.75rem] bg-[linear-gradient(90deg,#f0f0f0_50%,#f6f6f6_50%)]">{children}</div>
  );
}

/** Centred Tenor caps, the short rule, then the Japanese title and lead. */
function LiveHeading({ en, title, lead }: { en: string; title?: string; lead?: string }) {
  return (
    <Reveal className="px-5 text-center">
      <p className="type-eyebrow whitespace-pre-line">{en}</p>
      <span className="eyebrow-rule text-black" />
      {title && (
        <h2 className="mt-7 text-[clamp(1.5rem,2.8vw,2.5rem)] tracking-[0.06em] text-black md:mt-8">{title}</h2>
      )}
      {lead && <p className="type-body mx-auto mt-10 max-w-[46rem] text-left text-[0.8125rem] md:mt-14">{lead}</p>}
    </Reveal>
  );
}

/** Rounded, shadowed photo beside a block of copy; alternates sides. */
function PhotoRow({
  image,
  title,
  body,
  flip,
  portrait,
}: {
  image: string;
  title?: string;
  body: string;
  flip?: boolean;
  portrait?: boolean;
}) {
  return (
    <div className={cn('mx-auto grid max-w-[71rem] items-center gap-10 px-5 md:grid-cols-2 md:gap-14 md:px-10', flip && 'md:[&>*:first-child]:order-2')}>
      <Reveal className="flex justify-center">
        <div className={cn('photo-card relative w-full', portrait ? 'aspect-[3/4] max-w-[25rem]' : 'aspect-[537/590] max-w-[33.5rem]')}>
          <Image src={image} alt="" fill sizes="(max-width: 768px) 100vw, 540px" className="object-cover" />
        </div>
      </Reveal>
      <Reveal delay={0.08} className={cn(flip ? 'md:pl-10' : 'md:pl-2')}>
        {title && <h3 className="text-[1rem] leading-[1.9] font-medium tracking-[0.1em] whitespace-pre-line text-black">{title}</h3>}
        <p className={cn('type-body text-[0.8125rem] whitespace-pre-line', title && 'mt-5')}>{body}</p>
      </Reveal>
    </div>
  );
}

function Rating({ logo, w, h, label, children }: { logo: string; w: number; h: number; label: string; children: ReactNode }) {
  return (
    <Reveal className="flex flex-col items-center">
      <span className="flex h-12 items-end md:h-16">
        <Image src={logo} alt="" width={w} height={h} className="h-auto max-h-full w-auto max-w-full" />
      </span>
      {label === 'Hotel Rank' && <span className="mt-1 text-[0.625rem] text-ink-mute">Hotel Rank</span>}
      <span className="mt-2 text-[0.875rem] tracking-[0.12em] md:text-[1rem]">{children}</span>
    </Reveal>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-black/15 py-3">
      <dt className="text-stone">{label}</dt>
      <dd className="text-black">{value}</dd>
    </div>
  );
}

/**
 * Section title in the reference's (goderehotel.com) manner: a full-width
 * light band with a faint dot pattern, the Japanese title, a short red rule
 * and a small sub line. `inline` drops the band for titles inside a section.
 */
function JpHeading({ title, sub, inline }: { title: string; sub?: string; inline?: boolean }) {
  return (
    <Reveal
      className={cn(
        'text-center',
        !inline &&
          'bg-page-2 px-5 py-12 md:py-14 [background-image:radial-gradient(rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:14px_14px]',
      )}
    >
      <h2 className={cn('tracking-[0.1em] text-black', inline ? 'text-[1.5rem] md:text-[1.75rem]' : 'text-[1.75rem] md:text-[2.125rem]')}>
        {title}
      </h2>
      <span aria-hidden className="mx-auto mt-4 block h-0.5 w-10 bg-brass" />
      {sub && <p className="mt-3 text-[0.8125rem] text-stone">{sub}</p>}
    </Reveal>
  );
}

/** Thin rule with a centre dot between room types, as on the reference's rooms page. */
function RoomDivider() {
  return (
    <div aria-hidden className="relative mx-auto max-w-[60rem]">
      <span className="block h-px w-full bg-black/15" />
      <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-stone-dim" />
    </div>
  );
}

function PhoneIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className="shrink-0">
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z" />
    </svg>
  );
}

function FaxIcon() {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="currentColor" aria-hidden className="shrink-0">
      <path d="M19 8H5a3 3 0 0 0-3 3v6h4v4h12v-4h4v-6a3 3 0 0 0-3-3zm-3 11H8v-5h8v5zm3-7a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-1-9H6v4h12V3z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="currentColor" aria-hidden className="mt-0.5 shrink-0">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

/** Line icons for the access routes, drawn at 16px on the black disc. */
function ModeIcon({ mode }: { mode: RouteMode }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  switch (mode) {
    case 'train':
      return (
        <svg {...common}>
          <rect x="5" y="3" width="14" height="14" rx="3" />
          <path d="M5 10h14M9 14h.01M15 14h.01M8 21l2-4M16 21l-2-4" />
        </svg>
      );
    case 'car':
      return (
        <svg {...common}>
          <path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM7 19v2M17 19v2M5 11h14" />
        </svg>
      );
    case 'bus':
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="15" rx="2" />
          <path d="M4 11h16M8 15h.01M16 15h.01M7 18v3M17 18v3" />
        </svg>
      );
    case 'walk':
      return (
        <svg {...common}>
          <circle cx="13" cy="4" r="1.6" />
          <path d="M9 21l2.5-6.5L14 17v4M11.5 14.5l1-5 3 3 2.5 1M12.5 9.5L9 11v3" />
        </svg>
      );
    case 'plane':
      return (
        <svg {...common}>
          <path d="M10.5 21l1.5-1.5v-5L20 18v-2l-8-5.5V5a1.5 1.5 0 0 0-3 0v5.5L1 16v2l8-3.5v5L10.5 21" transform="translate(1.5 0)" />
        </svg>
      );
  }
}
