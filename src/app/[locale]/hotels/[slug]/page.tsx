import { Fragment } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { PageHero } from '@/components/sections/PageHero';
import { GroupBookingCTA } from '@/components/sections/GroupBookingCTA';
import { Reveal, RevealImage } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { Parallax } from '@/components/motion/Parallax';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Gallery } from '@/components/ui/Gallery';
import { MapEmbed } from '@/components/ui/MapEmbed';
import { VideoEmbed } from '@/components/ui/VideoEmbed';
import { ButtonLink } from '@/components/ui/ArrowLink';
import { HotelSectionNav } from '@/components/hotel/HotelSectionNav';
import { RoomGallery } from '@/components/hotel/RoomGallery';

import { getHotel, hotels, type Hotel } from '@/content/hotels';
import { getStay, type RouteMode, type Season, type Spot } from '@/content/hotelStay';
import { getDictionary } from '@/content/dictionary';
import { isLocale, locales, localePath, t, type L10n, type Locale } from '@/lib/i18n';

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

const LABEL = 'text-[0.625rem] tracking-[0.28em] text-stone uppercase';

/** Lenis adds scroll-margin-top to its -80px header offset, so this clears the sub-nav. */
const ANCHOR = 'scroll-mt-12 md:scroll-mt-[4.75rem]';

/** Labels for the common template (客室・お食事・アクセス・周辺観光). */
const S = {
  rooms: { ja: '客室', en: 'Rooms' },
  dining: { ja: 'お食事', en: 'Dining' },
  access: { ja: 'アクセス', en: 'Access' },
  sightseeing: { ja: '周辺観光', en: 'Sightseeing' },
  checkIn: { ja: 'チェックイン', en: 'Check-in' },
  checkOut: { ja: 'チェックアウト', en: 'Check-out' },
  parking: { ja: '駐車場', en: 'Parking' },
  fromHotel: { ja: 'ホテルから', en: 'From the hotel' },
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
} satisfies Record<string, L10n>;

const SEASON: Record<Season, { mark: string; en: string; tint: string }> = {
  spring: { mark: '春', en: 'Spring', tint: '#f4e1e1' },
  summer: { mark: '夏', en: 'Summer', tint: '#e0ead8' },
  autumn: { mark: '秋', en: 'Autumn', tint: '#f1e6c6' },
  winter: { mark: '冬', en: 'Winter', tint: '#dde6ec' },
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
 * Common hotel template. Order: reserve strip, sub-nav, ABOUT, WHATS SPECIAL,
 * MOVIE, 客室, お食事, GALLERY, アクセス, 周辺観光, RESERVATION, group CTA.
 */
export default async function HotelPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const hotel = getHotel(slug);
  if (!hotel) notFound();

  const active = locale as Locale;
  const dict = getDictionary(active);
  const H = dict.hotel;
  const title = hotel.pageTitle ?? hotel.name;
  const stay = getStay(hotel.slug);
  const L = (v: L10n) => t(v, active);

  const pickup = stay.sightseeing.spots.find((spot) => spot.pickup);
  const spots = stay.sightseeing.spots.filter((spot) => spot !== pickup);

  const sections = (['rooms', 'dining', 'access', 'sightseeing'] as const).map((id) => ({
    id,
    label: L(S[id]),
    en: S[id].en,
  }));

  return (
    <>
      <PageHero
        eyebrow={t(hotel.location, active)}
        title={title}
        lead={`${t(hotel.tagline, active)}\n\n${hotel.heroEn}`}
        image={hotel.hero}
        alt={title}
      />

      {/* Rank, review, rooms, RESERVE ------------------------------------- */}
      <section className="border-b border-ink/10 bg-page-2">
        <div className="shell flex flex-wrap items-center justify-between gap-x-10 gap-y-6 py-8">
          <Reveal direction="none">
            <div className="flex items-baseline gap-4">
              <span className={LABEL}>Hotel Rank</span>
              <span className="text-sm tracking-[0.32em] text-brass">{'★'.repeat(hotel.stars)}</span>
            </div>
          </Reveal>

          {hotel.rating && (
            <Reveal direction="none" delay={0.08}>
              <div className="flex items-baseline gap-3">
                <span className={LABEL}>Review</span>
                <span className="type-display text-2xl text-ink">{hotel.rating.score}</span>
                <span className="text-xs text-stone">/ 5</span>
                <span className="text-[0.625rem] text-stone/80">({hotel.rating.asOf})</span>
              </div>
            </Reveal>
          )}

          {hotel.info.rooms && (
            <Reveal direction="none" delay={0.16}>
              <div className="flex items-baseline gap-4">
                <span className={LABEL}>{dict.common.rooms}</span>
                <span className="type-display text-sm text-ink">{t(hotel.info.rooms, active)}</span>
              </div>
            </Reveal>
          )}

          {hotel.booking && (
            <Reveal direction="none" delay={0.22}>
              <div className="flex flex-wrap items-center gap-3">
                <span className={LABEL}>Reserve</span>
                <span className="mr-1 text-[0.8125rem] text-ink/70">{H.checkAvailability}</span>
                {hotel.booking.map((b) => (
                  <ButtonLink key={b.href} href={b.href} external variant="outline" className="px-5 py-2.5 text-[0.6875rem]">
                    {b.label}
                  </ButtonLink>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <HotelSectionNav links={sections} />

      {/* ABOUT OUR HOTEL -------------------------------------------------- */}
      <section className="relative py-24 md:py-32">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
            <div>
              <Reveal>
                <p className="type-eyebrow">About — Our Hotel</p>
              </Reveal>
              <SplitText
                as="h2"
                text={t(hotel.about.title, active)}
                delay={0.06}
                className="type-display mt-5 text-[clamp(1.4rem,3vw,2.25rem)] text-ink"
              />
              <Reveal delay={0.18}>
                <p className="type-mincho mt-8 text-[1.05rem] text-brass">{t(hotel.about.lede, active)}</p>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <p className="type-body whitespace-pre-line">{t(hotel.about.body, active)}</p>
            </Reveal>
          </div>

          <div className="mt-24 space-y-20 md:mt-32 md:space-y-28">
            <BlockRows blocks={hotel.highlights} active={active} />
          </div>
        </div>
      </section>

      {/* WHATS SPECIAL ---------------------------------------------------- */}
      <section className="relative border-t border-ink/10 py-24 md:py-32">
        <div className="shell-wide">
          <SectionHeading eyebrow="Whats Special" title={dict.common.features} />
          <Reveal delay={0.12}>
            <p className="type-body mx-auto mt-8 max-w-3xl text-center">{t(hotel.special.intro, active)}</p>
          </Reveal>

          <div className="mt-16 space-y-20 md:space-y-28">
            <BlockRows blocks={hotel.special.blocks} active={active} />
          </div>
        </div>
      </section>

      {/* THE HOTEL MOVIE -------------------------------------------------- */}
      {hotel.youtubeId && (
        <section className="relative border-y border-ink/10">
          <div className="shell-wide py-16 md:py-24">
            <SectionHeading eyebrow="The Hotel" title="MOVIE" className="mb-10" />
            <RevealImage>
              <VideoEmbed
                id={hotel.youtubeId}
                poster={hotel.gallery[0] ?? hotel.hero}
                label={active === 'ja' ? '動画を再生' : 'Play film'}
                title={title}
              />
            </RevealImage>
            {hotel.movieText && (
              <Reveal delay={0.1}>
                <p className="type-body mx-auto mt-12 max-w-3xl text-center">{t(hotel.movieText, active)}</p>
              </Reveal>
            )}
            <Reveal delay={0.16} className="mt-10 text-center">
              <ButtonLink href={localePath(active, '/contact')} variant="outline">
                {H.contactForm}
              </ButtonLink>
            </Reveal>
          </div>
        </section>
      )}

      {/* 客室 ------------------------------------------------------------- */}
      <section id="rooms" className={`relative border-t border-ink/10 bg-page-2 py-24 md:py-32 ${ANCHOR}`}>
        <div className="shell-wide">
          <SectionHeading eyebrow="Guest Rooms" title={L(S.rooms)} lead={L(stay.rooms.lead)} />

          <div className="mt-14 space-y-20 md:mt-20 md:space-y-28">
            {stay.rooms.items.map((room, i) => (
              <article
                key={i}
                className={`grid items-start gap-10 lg:gap-16 ${
                  i % 2 === 1 ? 'lg:grid-cols-[0.85fr_1.15fr] lg:[&>*:first-child]:order-2' : 'lg:grid-cols-[1.15fr_0.85fr]'
                }`}
              >
                <RevealImage>
                  <RoomGallery images={[room.image, ...(room.gallery ?? [])]} alt={L(room.name)} />
                </RevealImage>

                <Reveal delay={0.1}>
                  <p className={LABEL}>
                    Room {String(i + 1).padStart(2, '0')} — {active === 'ja' ? room.name.en : room.name.ja}
                  </p>
                  <h3 className="type-mincho mt-3 text-[1.35rem] text-ink md:text-[1.6rem]">{L(room.name)}</h3>
                  <p className="type-body mt-6 text-[0.9rem]">{L(room.body)}</p>

                  {room.facts ? (
                    <dl className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
                      {room.facts.map((fact, k) => (
                        <div key={k} className="grid grid-cols-[7rem_1fr] gap-4 py-3">
                          <dt className="text-[0.6875rem] tracking-[0.2em] text-stone">{L(fact.label)}</dt>
                          <dd className="text-sm text-ink/80">{L(fact.value)}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    room.specs && (
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {room.specs.map((spec, k) => (
                          <li key={k} className="border border-ink/15 px-3 py-1 text-[0.6875rem] tracking-[0.12em] text-ink/70">
                            {L(spec)}
                          </li>
                        ))}
                      </ul>
                    )
                  )}

                  {room.amenities && (
                    <>
                      <p className={`${LABEL} mt-8`}>{L(S.amenities)}</p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {room.amenities.map((item, k) => (
                          <li key={k} className="bg-page px-3 py-1.5 text-[0.75rem] text-ink/75">
                            {L(item)}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <div className="mt-9">
                    <ButtonLink
                      href={hotel.booking?.[0]?.href ?? localePath(active, '/reservation')}
                      external={Boolean(hotel.booking?.[0])}
                      variant="brass"
                    >
                      {L(S.bookRoom)}
                    </ButtonLink>
                  </div>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* お食事 ----------------------------------------------------------- */}
      <section id="dining" className={`relative border-t border-ink/10 py-24 md:py-32 ${ANCHOR}`}>
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <SectionHeading eyebrow="Dining" title={L(S.dining)} lead={L(stay.dining.lead)} align="left" />

            <ol className="divide-y divide-ink/10 border-y border-ink/10">
              {stay.dining.items.map((item, i) => (
                <li key={i}>
                  <Reveal delay={i * 0.08}>
                    <div className="grid gap-3 py-8 md:grid-cols-[9rem_1fr] md:gap-8 md:py-10">
                      <p className={LABEL}>{item.label}</p>
                      <div>
                        <h3 className="type-mincho text-[1.15rem] text-ink md:text-[1.25rem]">{L(item.title)}</h3>
                        <p className="type-body mt-3 text-[0.9rem]">{L(item.body)}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Gallery ---------------------------------------------------------- */}
      <section className="relative border-t border-ink/10 py-24 md:py-32">
        <div className="shell-wide">
          <SectionHeading eyebrow="Gallery" title={dict.common.gallery} />
          <div className="mt-14">
            <Gallery items={hotel.gallery.map((src) => ({ src, alt: title }))} closeLabel={dict.common.close} />
          </div>
        </div>
      </section>

      {/* アクセス + map --------------------------------------------------- */}
      <section id="access" className={`relative border-t border-ink/10 bg-page-2 ${ANCHOR}`}>
        <div className="grid lg:grid-cols-2">
          <div className="flex items-center px-(--spacing-gutter) py-20 md:py-28">
            <div className="w-full max-w-xl">
              <SectionHeading eyebrow="Access" title={L(S.access)} lead={L(stay.access.lead)} align="left" />

              <Reveal delay={0.12}>
                <p className={`${LABEL} mt-12`}>{L(S.routes)}</p>
                <ul className="mt-4 space-y-3">
                  {stay.access.routes.map((route, i) => (
                    <li key={i} className="flex items-start gap-4 border border-ink/10 bg-page px-5 py-4">
                      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-ink text-washi">
                        <ModeIcon mode={route.mode} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.625rem] tracking-[0.22em] text-brass uppercase">
                          {L(MODE_LABEL[route.mode])}
                        </span>
                        <span className="mt-1 block text-[0.9rem] text-ink">{L(route.from)}</span>
                        <span className="mt-0.5 block text-[0.8125rem] text-ink/65">{L(route.detail)}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.18}>
                <dl className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
                  <Row label={dict.common.address} value={t(hotel.info.address, active)} />
                  {hotel.info.tel && (
                    <Row label={dict.common.tel} value={hotel.info.tel} href={`tel:${hotel.info.tel.replace(/-/g, '')}`} />
                  )}
                  {hotel.info.fax && <Row label={dict.common.fax} value={hotel.info.fax} />}
                  <Row label={dict.common.groupDesk} value="080-4097-9552" href="tel:08040979552" />
                  {stay.access.checkIn && <Row label={L(S.checkIn)} value={stay.access.checkIn} />}
                  {stay.access.checkOut && <Row label={L(S.checkOut)} value={stay.access.checkOut} />}
                  {stay.access.parking && <Row label={L(S.parking)} value={L(stay.access.parking)} />}
                </dl>
                <p className="mt-6 text-[0.6875rem] tracking-[0.18em] text-stone">{H.credit}</p>
              </Reveal>
            </div>
          </div>

          <MapEmbed
            src={hotel.mapEmbed}
            title={title}
            address={t(hotel.info.address, active)}
            cta={dict.common.openInMaps}
            height="h-[24rem] lg:h-full lg:min-h-[34rem]"
          />
        </div>

        {stay.access.journeys && (
          <div className="shell-wide border-t border-ink/10 py-16 md:py-20">
            <Reveal>
              <p className="type-eyebrow">Route Guide</p>
              <h3 className="type-mincho mt-3 text-[1.25rem] text-ink md:text-[1.4rem]">{L(S.routeGuide)}</h3>
            </Reveal>
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {stay.access.journeys.map((journey, i) => (
                <Reveal key={i} delay={(i % 2) * 0.08} className="border border-ink/10 bg-page p-6 md:p-8">
                  <p className="text-[0.8125rem] tracking-[0.08em] text-brass">{L(journey.title)}</p>
                  <ol className="mt-5 flex flex-col md:flex-row md:items-center">
                    {journey.steps.map((step, k) => {
                      const last = k === journey.steps.length - 1;
                      return (
                        <Fragment key={k}>
                          <li
                            className={`px-3 py-3 text-center text-[0.8125rem] leading-snug md:min-w-[6rem] ${
                              last ? 'bg-ink text-washi' : 'border border-ink/15 text-ink'
                            }`}
                          >
                            {L(step.place)}
                          </li>
                          {step.leg && (
                            <li className="relative flex items-center gap-3 py-4 pl-4 md:flex-1 md:flex-col md:gap-1.5 md:px-2 md:py-0">
                              <span aria-hidden className="absolute inset-y-0 left-[1.75rem] w-px bg-brass/50 md:hidden" />
                              <span aria-hidden className="absolute inset-x-0 top-3.5 hidden h-px bg-brass/50 md:block" />
                              <span className="relative flex size-7 shrink-0 items-center justify-center rounded-full bg-brass text-washi">
                                <ModeIcon mode={step.leg.mode} />
                              </span>
                              <span className="relative text-[0.75rem] leading-snug whitespace-nowrap text-ink/75 md:text-center">
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
      </section>

      {/* 周辺観光 --------------------------------------------------------- */}
      <section id="sightseeing" className={`relative border-t border-ink/10 py-24 md:py-32 ${ANCHOR}`}>
        <div className="shell-wide">
          <SectionHeading eyebrow="Sightseeing" title={L(S.sightseeing)} lead={L(stay.sightseeing.lead)} />

          {pickup && <PickupSpot spot={pickup} active={active} />}

          <div className="mt-14 grid border-t border-l border-ink/10 sm:grid-cols-2 lg:grid-cols-3 md:mt-20">
            {spots.map((spot, i) => (
              <Reveal key={i} delay={(i % 3) * 0.08} className="border-r border-b border-ink/10 bg-page">
                <article className="group flex h-full flex-col">
                  {spot.image ? (
                    <div className="relative aspect-16/10 w-full overflow-hidden">
                      <Image
                        src={spot.image}
                        alt={L(spot.name)}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-[1.4s] ease-(--ease-out-expo) group-hover:scale-[1.05]"
                      />
                    </div>
                  ) : (
                    // No photo supplied yet: a light map-grid panel with the name keeps the grid even.
                    <div className="relative flex aspect-16/10 w-full flex-col items-center justify-center gap-4 bg-page-2 p-7 text-center">
                      <span
                        aria-hidden
                        className="absolute inset-0 opacity-60"
                        style={{
                          backgroundImage:
                            'linear-gradient(var(--color-page-3) 1px, transparent 1px), linear-gradient(90deg, var(--color-page-3) 1px, transparent 1px)',
                          backgroundSize: '36px 36px',
                        }}
                      />
                      <span aria-hidden className="relative flex size-10 items-center justify-center rounded-full border border-brass/60 bg-page">
                        <span className="size-2 rounded-full bg-brass" />
                      </span>
                      <span className="relative type-display text-[0.9375rem] leading-snug tracking-[0.06em] text-brass">
                        {active === 'ja' ? spot.name.en : spot.name.ja}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-7 md:p-9">
                    <div className="flex items-center justify-between gap-4">
                      <span className="type-display text-[2rem] leading-none text-brass/70">
                        {String(i + (pickup ? 2 : 1)).padStart(2, '0')}
                      </span>
                      <span className="rounded-full bg-ink px-3.5 py-1.5 text-[0.6875rem] tracking-[0.08em] text-washi">
                        {L(spot.time)}
                      </span>
                    </div>
                    <h3 className="type-mincho mt-6 text-[1.15rem] leading-snug text-ink md:text-[1.25rem]">{L(spot.name)}</h3>
                    <p className="type-body mt-3 flex-1 text-[0.875rem]">{L(spot.body)}</p>
                    <SpotLinks spot={spot} active={active} className="mt-6" />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mt-6 text-right text-[0.6875rem] text-stone">
              {active === 'ja' ? '※所要時間は目安です。交通状況により異なります。' : '* Travel times are approximate and vary with traffic.'}
            </p>
          </Reveal>

          {stay.sightseeing.events && (
            <div className="mt-24 md:mt-32">
              <SectionHeading eyebrow="Seasonal Events" title={L(S.events)} lead={L(S.eventsLead)} />
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
                {stay.sightseeing.events.map((event, i) => {
                  const season = SEASON[event.season];
                  return (
                    <Reveal key={i} delay={(i % 4) * 0.08}>
                      <article className="flex h-full flex-col">
                        <span
                          className="type-mincho mx-auto flex size-11 items-center justify-center rounded-full text-[1.05rem] text-ink"
                          style={{ backgroundColor: season.tint }}
                          title={season.en}
                        >
                          {season.mark}
                        </span>
                        <h4 className="type-mincho mt-4 text-center text-[1.05rem] text-ink">{L(event.name)}</h4>
                        <dl className="mt-4 space-y-1 px-4 py-3 text-[0.75rem] text-ink/75" style={{ backgroundColor: season.tint }}>
                          <div>
                            <dt className="inline">{active === 'ja' ? '開催日／' : 'When: '}</dt>
                            <dd className="inline">{L(event.when)}</dd>
                          </div>
                          <div>
                            <dt className="inline">{active === 'ja' ? '開催場所／' : 'Where: '}</dt>
                            <dd className="inline">{L(event.place)}</dd>
                          </div>
                        </dl>
                        <p className="type-body mt-4 flex-1 text-[0.8125rem]">{L(event.body)}</p>
                        <a
                          href={mapsUrl(event.query)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-2 self-start border-b border-ink/25 pb-1 text-[0.75rem] tracking-[0.16em] text-ink transition-colors hover:border-brass hover:text-brass"
                        >
                          {L(S.viewMap)} <span aria-hidden>→</span>
                        </a>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
              <Reveal delay={0.1}>
                <p className="mt-6 text-right text-[0.6875rem] text-stone">
                  {active === 'ja' ? '※開催日程は年により変わります。公式情報をご確認ください。' : '* Dates change each year; please check the official information.'}
                </p>
              </Reveal>
            </div>
          )}
        </div>
      </section>

      {/* RESERVATION ------------------------------------------------------ */}
      <section className="relative border-t border-ink/10 bg-page-2 py-20 md:py-28">
        <div className="shell text-center">
          <Reveal>
            <p className="type-eyebrow">Reservation</p>
          </Reveal>
          <SplitText
            as="h2"
            text={H.bookingTitle}
            delay={0.06}
            className="type-display mt-5 text-[clamp(1.4rem,3vw,2.25rem)] text-ink"
          />
          <Reveal delay={0.12}>
            <p className="type-mincho mt-6 text-[1.05rem] text-brass">{H.bookingLead}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="type-body mx-auto mt-5 max-w-2xl whitespace-pre-line">{H.bookingBody}</p>
          </Reveal>
          <Reveal delay={0.24} className="mt-10">
            <ButtonLink href={localePath(active, '/reservation')} variant="brass">
              {H.bookingCta}
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <GroupBookingCTA locale={active} title={H.groupHeading} body={dict.home.groupHotel} />
    </>
  );
}

function BlockRows({ blocks, active }: { blocks: Hotel['highlights']; active: Locale }) {
  return (
    <>
      {blocks.map((block, i) => (
        <div
          key={i}
          className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
        >
          <Parallax strength={9} className="aspect-4/5 w-full">
            <Image src={block.image} alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </Parallax>

          <div>
            <SplitText
              as="h3"
              text={t(block.title, active)}
              delay={0.06}
              className="type-display text-[clamp(1.25rem,2.6vw,2rem)] leading-[1.35] text-ink"
            />
            <Reveal delay={0.18}>
              <p className="type-body mt-7 whitespace-pre-line">{t(block.body, active)}</p>
            </Reveal>
          </div>
        </div>
      ))}
    </>
  );
}

/** 地図で見る + 公式サイト links under a sightseeing spot. */
function SpotLinks({ spot, active, className = '' }: { spot: Spot; active: Locale; className?: string }) {
  const link =
    'inline-flex items-center gap-2 border-b border-ink/25 pb-1 text-[0.75rem] tracking-[0.16em] text-ink transition-colors hover:border-brass hover:text-brass';
  return (
    <div className={`flex flex-wrap gap-x-6 gap-y-3 ${className}`}>
      <a href={mapsUrl(spot.query)} target="_blank" rel="noopener noreferrer" className={link}>
        {t(S.viewMap, active)} <span aria-hidden>→</span>
      </a>
      {spot.site && (
        <a href={spot.site} target="_blank" rel="noopener noreferrer" className={link}>
          {t(S.officialSite, active)} <span aria-hidden>↗</span>
        </a>
      )}
    </div>
  );
}

/** The featured "Pick up" spot, shown large above the sightseeing grid. */
function PickupSpot({ spot, active }: { spot: Spot; active: Locale }) {
  return (
    <Reveal className="mt-14 md:mt-20">
      <article className="grid overflow-hidden bg-page-2 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-center p-8 md:p-12">
          <p className="type-eyebrow">Pick up</p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <h3 className="type-mincho text-[1.35rem] text-ink md:text-[1.6rem]">{t(spot.name, active)}</h3>
            <span className="rounded-full bg-ink px-3.5 py-1.5 text-[0.6875rem] tracking-[0.08em] text-washi">
              {t(spot.time, active)}
            </span>
          </div>
          <p className="type-body mt-5 text-[0.9rem]">{t(spot.body, active)}</p>
          <SpotLinks spot={spot} active={active} className="mt-8" />
        </div>
        {spot.image && (
          <div className="relative aspect-16/10 w-full lg:aspect-auto lg:min-h-[22rem]">
            <Image src={spot.image} alt={t(spot.name, active)} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
          </div>
        )}
      </article>
    </Reveal>
  );
}

function Row({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-4 py-4 md:grid-cols-[9rem_1fr]">
      <dt className="text-[0.6875rem] tracking-[0.2em] text-stone uppercase">{label}</dt>
      <dd className="text-sm leading-relaxed whitespace-pre-line text-ink/80">
        {href ? (
          <a href={href} className="transition-colors hover:text-brass">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

/** Line icons for the access routes, drawn at 16px on the ink disc. */
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
