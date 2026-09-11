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

import { getVenue, venues } from '@/content/dining';
import { getDictionary } from '@/content/dictionary';
import { isLocale, locales, t, type Locale } from '@/lib/i18n';

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

  return {
    title: t(venue.name, active),
    description: t(venue.lede, active),
    openGraph: { title: t(venue.name, active), images: [venue.hero] },
  };
}

export default async function VenuePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const venue = getVenue(slug);
  if (!venue) notFound();

  const active = locale as Locale;
  const dict = getDictionary(active);

  return (
    <>
      <PageHero
        eyebrow={`${t(venue.area, active)} — ${t(venue.category, active)}`}
        title={t(venue.name, active)}
        lead={t(venue.tagline, active)}
        image={venue.hero}
        alt={t(venue.name, active)}
      />

      {/* About blocks ----------------------------------------------------- */}
      <section className="relative py-24 md:py-32">
        <div className="shell">
          <Reveal>
            <p className="type-mincho max-w-3xl text-[clamp(1.05rem,2.2vw,1.5rem)] leading-[2] text-ink">
              {t(venue.lede, active)}
            </p>
          </Reveal>

          <div className="mt-16 space-y-16 md:mt-24 md:space-y-24">
            {venue.about.map((block, i) => (
              <div key={i} className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                <div>
                  <Reveal>
                    <p className="type-display text-[0.6875rem] tracking-[0.26em] text-brass">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                  </Reveal>
                  <SplitText
                    as="h2"
                    text={t(block.title, active)}
                    delay={0.06}
                    className="type-display mt-4 text-[clamp(1.25rem,2.8vw,2rem)] text-ink"
                  />
                </div>
                <Reveal delay={0.14}>
                  <p className="type-body whitespace-pre-line">{t(block.body, active)}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Film ------------------------------------------------------------- */}
      {venue.youtubeId && (
        <section className="relative border-y border-ink/10">
          <div className="shell-wide py-16 md:py-24">
            <RevealImage>
              <VideoEmbed
                id={venue.youtubeId}
                poster={venue.gallery[0]?.src ?? venue.hero}
                label={active === 'ja' ? '動画を再生' : 'Play film'}
                title={t(venue.name, active)}
              />
            </RevealImage>
          </div>
        </section>
      )}

      {/* Schedule --------------------------------------------------------- */}
      {venue.schedule && (
        <section className="relative border-b border-ink/10 py-20 md:py-28">
          <div className="shell">
            <SectionHeading eyebrow="Time schedule" title={active === 'ja' ? '開催時間' : 'Performance times'} />

            <div className="mt-12 flex flex-wrap gap-3">
              {venue.schedule.times.map((time, i) => (
                <Reveal key={time} delay={i * 0.05} direction="none">
                  <span className="type-display inline-block border border-brass/35 px-6 py-3 text-sm tracking-[0.16em] text-brass">
                    {time}
                  </span>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <p className="type-body mt-8 text-[0.8125rem]">{t(venue.schedule.note, active)}</p>
            </Reveal>
          </div>
        </section>
      )}

      {/* Gallery ---------------------------------------------------------- */}
      <section className="relative py-24 md:py-32">
        <div className="shell-wide">
          <SectionHeading eyebrow="Gallery" title={dict.common.gallery} />
          <div className="mt-14">
            <Gallery
              items={venue.gallery.map((g) => ({ src: g.src, caption: t(g.caption, active) }))}
              closeLabel={dict.common.close}
            />
          </div>
        </div>
      </section>

      {/* Groups ----------------------------------------------------------- */}
      <section className="relative border-t border-ink/10 py-20 md:py-28">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <SplitText
              as="h2"
              text={active === 'ja' ? '団体予約\n大歓迎です' : 'Groups\nvery welcome'}
              className="type-display text-[clamp(1.4rem,3vw,2.25rem)] text-ink"
            />
            <Reveal delay={0.14}>
              <p className="type-body">{t(venue.groupNote, active)}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Information + map ------------------------------------------------ */}
      <section className="relative border-t border-ink/10">
        <div className="grid lg:grid-cols-2">
          <div className="flex items-center px-(--spacing-gutter) py-20 md:py-28">
            <div className="w-full max-w-xl">
              <Reveal>
                <p className="type-eyebrow">Information</p>
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
                    <dd className="text-sm leading-relaxed text-ink/80">{t(venue.info.address, active)}</dd>
                  </div>
                  {venue.info.tel && (
                    <div className="grid grid-cols-[7rem_1fr] gap-4 py-4 md:grid-cols-[9rem_1fr]">
                      <dt className="text-[0.6875rem] tracking-[0.2em] text-stone uppercase">{dict.common.tel}</dt>
                      <dd className="text-sm text-ink/80">
                        <a href={`tel:${venue.info.tel.replace(/-/g, '')}`} className="hover:text-brass">
                          {venue.info.tel}
                        </a>
                      </dd>
                    </div>
                  )}
                  {venue.info.hours && (
                    <div className="grid grid-cols-[7rem_1fr] gap-4 py-4 md:grid-cols-[9rem_1fr]">
                      <dt className="text-[0.6875rem] tracking-[0.2em] text-stone uppercase">{dict.common.hours}</dt>
                      <dd className="text-sm text-ink/80">{t(venue.info.hours, active)}</dd>
                    </div>
                  )}
                </dl>
              </Reveal>
            </div>
          </div>

          <MapEmbed
            src={venue.mapEmbed}
            title={t(venue.name, active)}
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
