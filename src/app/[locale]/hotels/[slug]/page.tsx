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

import { getHotel, hotels, type Hotel } from '@/content/hotels';
import { getDictionary } from '@/content/dictionary';
import { isLocale, locales, localePath, t, type Locale } from '@/lib/i18n';

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

/**
 * Section order follows the live hotel pages: reserve strip, ABOUT OUR HOTEL,
 * THE HOTEL MOVIE, WHATS SPECIAL, GUEST ROOMS, RESERVATION, ホテル情報.
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

      {/* WHATS SPECIAL ---------------------------------------------------- */}
      <section className="relative py-24 md:py-32">
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

      {/* GUEST ROOMS ------------------------------------------------------ */}
      {hotel.rooms && (
        <section className="relative border-t border-ink/10 py-24 md:py-32">
          <div className="shell-wide">
            <SectionHeading eyebrow="Guest Rooms" title={dict.common.rooms} />
            <Reveal delay={0.12}>
              <p className="type-body mx-auto mt-8 max-w-3xl text-center">{t(hotel.rooms.lead, active)}</p>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-3 md:gap-7">
              {hotel.rooms.items.map((room, i) => (
                <RevealImage key={i} delay={i * 0.1}>
                  <div className="relative aspect-4/3 w-full">
                    <Image
                      src={room.image}
                      alt={t(room.name, active)}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-4 text-[0.8125rem] tracking-[0.16em] text-ink/75">{t(room.name, active)}</p>
                </RevealImage>
              ))}
            </div>

            <Reveal delay={0.1}>
              <p className="type-body mx-auto mt-14 max-w-3xl text-center">{t(hotel.rooms.closing, active)}</p>
            </Reveal>
          </div>
        </section>
      )}

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

      {/* Gallery ---------------------------------------------------------- */}
      <section className="relative border-t border-ink/10 py-24 md:py-32">
        <div className="shell-wide">
          <SectionHeading eyebrow="Gallery" title={dict.common.gallery} />
          <div className="mt-14">
            <Gallery items={hotel.gallery.map((src) => ({ src, alt: title }))} closeLabel={dict.common.close} />
          </div>
        </div>
      </section>

      {/* ホテル情報 + map ---------------------------------------------------- */}
      <section className="relative border-t border-ink/10">
        <div className="grid lg:grid-cols-2">
          <div className="flex items-center px-(--spacing-gutter) py-20 md:py-28">
            <div className="w-full max-w-xl">
              <Reveal>
                <p className="type-eyebrow">Information</p>
              </Reveal>
              <SplitText
                as="h2"
                text={dict.common.information}
                delay={0.06}
                className="type-display mt-5 text-[clamp(1.4rem,3vw,2.25rem)] text-ink"
              />

              <Reveal delay={0.16}>
                <dl className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
                  <Row label={dict.common.groupDesk} value="080-4097-9552" href="tel:08040979552" />
                  {hotel.info.tel && (
                    <Row label={dict.common.tel} value={hotel.info.tel} href={`tel:${hotel.info.tel.replace(/-/g, '')}`} />
                  )}
                  {hotel.info.fax && <Row label={dict.common.fax} value={hotel.info.fax} />}
                  <Row label={dict.common.address} value={t(hotel.info.address, active)} />
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
