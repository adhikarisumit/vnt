import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { PageHero } from '@/components/sections/PageHero';
import { GroupBookingCTA } from '@/components/sections/GroupBookingCTA';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { hotels } from '@/content/hotels';
import { getDictionary } from '@/content/dictionary';
import { isLocale, localePath, t, type Locale } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const ja = locale === 'ja';
  return {
    title: ja ? 'ホテル事業' : 'Hotels',
    description: ja
      ? '富士、京都、名古屋。Premium Hotel は日本を代表する観光地に位置し、旅の拠点となるホテルです。'
      : 'Fuji, Kyoto and Nagoya — the Premium Hotels sit in three of Japan’s defining destinations.',
  };
}

export default async function HotelsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const active = locale as Locale;
  const dict = getDictionary(active);

  return (
    <>
      <PageHero
        eyebrow="Premium Hotel"
        title={active === 'ja' ? 'PREMIUM\nHOTEL' : 'PREMIUM\nHOTEL'}
        lead={
          active === 'ja'
            ? '富士、京都、名古屋。\n日本を代表する観光地に位置し、旅の拠点となる三つのホテル。'
            : 'Fuji, Kyoto, Nagoya.\nThree hotels placed where Japan is at its most memorable.'
        }
        image="/images/toji/toji-01.webp"
      />

      {/* Alternating full-width hotel billboards --------------------------- */}
      {hotels.map((hotel, i) => (
        <section
          key={hotel.slug}
          id={hotel.slug}
          className="relative border-t border-ink/10 py-20 md:py-28"
        >
          <div className="shell-wide">
            <div
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
                i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <Reveal direction={i % 2 === 1 ? 'left' : 'right'}>
                <Link href={localePath(active, `/hotels/${hotel.slug}`)} className="group block">
                  <div className="relative aspect-4/3 w-full overflow-hidden">
                    <Image
                      src={hotel.hero}
                      alt={hotel.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-ink/8" />
                  </div>
                </Link>
              </Reveal>

              <div>
                <Reveal>
                  <p className="type-eyebrow">{`0${i + 1} — ${t(hotel.location, active)}`}</p>
                </Reveal>

                <SplitText
                  as="h2"
                  text={hotel.name}
                  delay={0.06}
                  className="type-display mt-5 text-[clamp(1.5rem,3.6vw,2.75rem)] text-ink"
                />

                <Reveal delay={0.14}>
                  <p aria-label={`${hotel.stars} star`} className="mt-4 text-[0.75rem] tracking-[0.34em] text-brass">
                    {'★'.repeat(hotel.stars)}
                  </p>
                </Reveal>

                <Reveal delay={0.2}>
                  <p className="type-mincho mt-6 text-[1.05rem] text-ink/85">{t(hotel.tagline, active)}</p>
                </Reveal>

                <Reveal delay={0.26}>
                  <p className="type-body mt-6 max-w-xl whitespace-pre-line">
                    {t(hotel.about.body, active).split('\n\n')[0]}
                  </p>
                </Reveal>

                <Reveal delay={0.34} className="mt-10">
                  <ArrowLink href={localePath(active, `/hotels/${hotel.slug}`)}>{dict.common.viewMore}</ArrowLink>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      ))}

      <GroupBookingCTA locale={active} body={dict.home.groupHotel} />
    </>
  );
}
