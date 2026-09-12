import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { PageHero } from '@/components/sections/PageHero';
import { GroupBookingCTA } from '@/components/sections/GroupBookingCTA';
import { Reveal, RevealImage } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Gallery } from '@/components/ui/Gallery';
import { MapEmbed } from '@/components/ui/MapEmbed';
import { VideoEmbed } from '@/components/ui/VideoEmbed';
import { ButtonLink } from '@/components/ui/ArrowLink';

import { getVenue, venues } from '@/content/dining';
import { getDictionary } from '@/content/dictionary';
import { isLocale, locales, localePath, t, type Locale } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.flatMap((locale) => venues.map((v) => ({ locale, slug: v.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const venue = getVenue(slug);
  if (!venue) return {};
  const active: Locale = isLocale(locale) ? locale : 'ja';
  const title = venue.slug === 'geisyatei' ? t(venue.name, active) : `${t(venue.name, active)} | 和楽亭`;

  return {
    title,
    description: t(venue.about[0].body, active).replace(/\s+/g, ' ').slice(0, 150),
    openGraph: { title, images: [venue.hero] },
  };
}

export default async function VenuePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const venue = getVenue(slug);
  if (!venue) notFound();

  const active = locale as Locale;
  const dict = getDictionary(active);
  const name = t(venue.name, active);

  return (
    <>
      <PageHero
        eyebrow={`${venue.romaji} — ${t(venue.area, active)}`}
        title={name}
        lead={t(venue.tagline, active)}
        image={venue.hero}
        alt={name}
      />

      {/* Copy blocks, in the live page's order ----------------------------- */}
      <section className="relative py-24 md:py-32">
        <div className="shell space-y-16 md:space-y-24">
          {venue.about.map((block, i) => (
            <div key={i} className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div>
                <Reveal>
                  <p className="type-display text-[0.6875rem] tracking-[0.26em] text-brass">
                    {block.eyebrow ?? String(i + 1).padStart(2, '0')}
                  </p>
                </Reveal>
                {block.title && (
                  <SplitText
                    as="h2"
                    text={t(block.title, active)}
                    delay={0.06}
                    className="type-display mt-4 text-[clamp(1.25rem,2.8vw,2rem)] text-ink"
                  />
                )}
              </div>
              <div>
                <Reveal delay={0.14}>
                  <p className="type-body whitespace-pre-line">{t(block.body, active)}</p>
                </Reveal>
                {/* The live page prints the English under the Japanese. */}
                {block.bilingual && active === 'ja' && (
                  <Reveal delay={0.2}>
                    <p className="type-body mt-6 text-[0.875rem] text-ink/60">{block.body.en}</p>
                  </Reveal>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Geisha-tei's page carries its own group-booking button under the intro. */}
      {venue.slug === 'geisyatei' && (
        <Reveal className="-mt-8 pb-20 text-center md:-mt-12 md:pb-24">
          <ButtonLink href={localePath(active, '/contact')} variant="brass">
            {dict.dining.groupApply}
          </ButtonLink>
        </Reveal>
      )}

      {/* Film ------------------------------------------------------------- */}
      {venue.youtubeId && (
        <section className="relative border-y border-ink/10">
          <div className="shell-wide py-16 md:py-24">
            <RevealImage>
              <VideoEmbed
                id={venue.youtubeId}
                poster={venue.gallery[0] ?? venue.hero}
                label={active === 'ja' ? '動画を再生' : 'Play film'}
                title={name}
              />
            </RevealImage>
          </div>
        </section>
      )}

      {/* Time schedule ---------------------------------------------------- */}
      {venue.schedule && (
        <section className="relative border-b border-ink/10 py-20 md:py-28">
          <div className="shell">
            <SectionHeading eyebrow="Time Schedule" title={t(venue.schedule.title, active)} />

            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {venue.schedule.times.map((time, i) => (
                <Reveal key={time} delay={i * 0.05} direction="none">
                  <span className="type-display inline-block border border-brass/35 px-6 py-3 text-sm tracking-[0.16em] text-brass">
                    {time}
                  </span>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <p className="type-body mt-10 text-center text-[0.875rem] whitespace-pre-line">{t(venue.schedule.note, active)}</p>
            </Reveal>
            <Reveal delay={0.26}>
              <p className="type-display mt-6 text-center text-[1.05rem] tracking-[0.12em] text-ink">
                <a href="tel:08040979552" className="hover:text-brass">
                  {t(venue.schedule.tel, active)}
                </a>
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* 団体予約 大歓迎です ------------------------------------------------ */}
      {venue.group && (
        <section className="relative border-b border-ink/10 py-20 md:py-28">
          <div className="shell">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <SplitText
                as="h2"
                text={active === 'ja' ? '団体予約\n大歓迎です' : 'Group bookings\nwelcome'}
                className="type-display text-[clamp(1.4rem,3vw,2.25rem)] text-ink"
              />
              <div>
                {venue.group.note && (
                  <Reveal delay={0.14}>
                    <p className="type-body">{t(venue.group.note, active)}</p>
                  </Reveal>
                )}
                <Reveal delay={0.2} className={venue.group.note ? 'mt-8' : ''}>
                  <ButtonLink href={localePath(active, '/contact')} variant="brass">
                    {dict.common.reserve}
                  </ButtonLink>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery ---------------------------------------------------------- */}
      <section className="relative py-24 md:py-32">
        <div className="shell-wide">
          <SectionHeading eyebrow="Gallery" title={dict.common.gallery} />
          <div className="mt-14">
            <Gallery items={venue.gallery.map((src) => ({ src, alt: name }))} closeLabel={dict.common.close} />
          </div>
        </div>
      </section>

      {/* Warakutei band: the group logo and both Ariake shops, as on the
          live yakiniku and yakitori pages. */}
      {venue.slug.startsWith('warakutei') && (
        <section className="relative bg-ink py-16 md:py-20">
          <div className="shell flex flex-col items-center text-center">
            <Reveal direction="none">
              <Image
                src="/images/warakutei/logo-group.webp"
                alt="WARAKUTEI"
                width={900}
                height={307}
                className="h-auto w-[min(22rem,70vw)]"
              />
            </Reveal>
            <p className="mt-2 text-[0.625rem] tracking-[0.28em] text-washi/50 uppercase">{dict.dining.sisterStores}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {venues
                .filter((v) => v.slug.startsWith('warakutei'))
                .map((v) => (
                  <Link
                    key={v.slug}
                    href={localePath(active, `/dining/${v.slug}`)}
                    aria-current={v.slug === venue.slug ? 'page' : undefined}
                    className="type-display border border-washi/30 px-7 py-3 text-[0.9375rem] tracking-[0.12em] text-washi transition-colors hover:border-brass-lit hover:text-brass-lit aria-[current=page]:border-brass-lit aria-[current=page]:text-brass-lit"
                  >
                    {t(v.name, active)}
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Address + map ---------------------------------------------------- */}
      <section className="relative border-t border-ink/10">
        <div className="grid lg:grid-cols-2">
          <div className="flex items-center px-(--spacing-gutter) py-20 md:py-28">
            <div className="w-full max-w-xl">
              <Reveal>
                <p className="type-eyebrow">Address</p>
              </Reveal>
              <SplitText
                as="h2"
                text={dict.common.storeInformation}
                delay={0.06}
                className="type-display mt-5 text-[clamp(1.4rem,3vw,2.25rem)] text-ink"
              />
              <Reveal delay={0.16}>
                <dl className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
                  <div className="grid grid-cols-[7rem_1fr] gap-4 py-4 md:grid-cols-[9rem_1fr]">
                    <dt className="text-[0.6875rem] tracking-[0.2em] text-stone uppercase">{dict.common.address}</dt>
                    <dd className="text-sm leading-relaxed whitespace-pre-line text-ink/80">
                      {t(venue.info.address, active)}
                      {venue.info.addressEnOnJa && active === 'ja' && (
                        <span className="mt-3 block text-ink/60">{venue.info.address.en}</span>
                      )}
                    </dd>
                  </div>
                  {venue.info.tel && (
                    <div className="grid grid-cols-[7rem_1fr] gap-4 py-4 md:grid-cols-[9rem_1fr]">
                      <dt className="text-[0.6875rem] tracking-[0.2em] text-stone uppercase">
                        {venue.info.telLabel ? t(venue.info.telLabel, active) : dict.common.tel}
                      </dt>
                      <dd className="text-sm text-ink/80">
                        <a href={`tel:${venue.info.tel.replace(/-/g, '')}`} className="hover:text-brass">
                          {venue.info.tel}
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>
              </Reveal>
            </div>
          </div>

          <MapEmbed
            src={venue.mapEmbed}
            title={name}
            address={t(venue.info.address, active)}
            cta={dict.common.openInMaps}
            height="h-[24rem] lg:h-full lg:min-h-[32rem]"
          />
        </div>
      </section>

      <GroupBookingCTA locale={active} body={dict.home.groupDining} />
    </>
  );
}
