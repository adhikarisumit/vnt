import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { PageHero } from '@/components/sections/PageHero';
import { GroupBookingCTA } from '@/components/sections/GroupBookingCTA';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { ArrowLink, ButtonLink } from '@/components/ui/ArrowLink';
import { hotels, hubOrder } from '@/content/hotels';
import { getDictionary } from '@/content/dictionary';
import { isLocale, localePath, t, type Locale } from '@/lib/i18n';

// The live hub page's meta description.
const INTRO = {
  ja: '富士、京都、名古屋。\nPremium Hotel は日本を代表する観光地に位置し旅の拠点となるホテルです。',
  en: 'Fuji, Kyoto, Nagoya.\nThe Premium Hotels stand in some of Japan’s best-known destinations — each a base for your travels.',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const ja = locale === 'ja';
  return { title: 'Premium Hotel', description: (ja ? INTRO.ja : INTRO.en).replace('\n', '') };
}

export default async function HotelsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const active = locale as Locale;
  const dict = getDictionary(active);
  const ordered = hubOrder.map((slug) => hotels.find((h) => h.slug === slug)!);

  return (
    <>
      <PageHero eyebrow="Premium Hotel" title={'PREMIUM\nHOTEL'} lead={INTRO[active]} image="/images/toji/toji-01.webp" />

      <section className="border-b border-ink/10 bg-page-2">
        <div className="shell flex justify-center py-10">
          <ButtonLink href={localePath(active, '/reservation')} variant="brass">
            {dict.hotel.groupEnquiry}
          </ButtonLink>
        </div>
      </section>

      {ordered.map((hotel, i) => (
        <Fragment key={hotel.slug}>
          <section id={hotel.slug} className="relative border-t border-ink/10 py-20 md:py-28">
            <div className="shell-wide">
              <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                <Reveal direction={i % 2 === 1 ? 'left' : 'right'}>
                  <Link href={localePath(active, `/hotels/${hotel.slug}`)} className="group block">
                    <div className="relative aspect-4/3 w-full overflow-hidden">
                      <Image
                        src={hotel.hub.image}
                        alt={hotel.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      />
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
                  <Reveal delay={0.12}>
                    <p aria-label={`${hotel.stars} star`} className="mt-4 text-[0.75rem] tracking-[0.34em] text-brass">
                      {'★'.repeat(hotel.stars)}
                    </p>
                  </Reveal>
                  <Reveal delay={0.18}>
                    <p className="type-mincho mt-6 text-[1.05rem] text-brass">{t(hotel.hub.title, active)}</p>
                  </Reveal>
                  <Reveal delay={0.24}>
                    <p className="type-body mt-6 max-w-xl whitespace-pre-line">{t(hotel.hub.body, active)}</p>
                  </Reveal>
                  <Reveal delay={0.3} className="mt-10">
                    <ArrowLink href={localePath(active, `/hotels/${hotel.slug}`)}>{dict.hotel.viewMore}</ArrowLink>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>

          {hotel.hub.divider && (
            <section className="border-t border-ink/10 py-16 md:py-20">
              <div className="shell text-center">
                <SplitText
                  as="p"
                  text={hotel.hub.divider}
                  className="type-display text-[clamp(1.4rem,3.4vw,2.5rem)] leading-[1.3] text-ink/80"
                />
              </div>
            </section>
          )}
        </Fragment>
      ))}

      <GroupBookingCTA locale={active} body={dict.home.groupHotel} />
    </>
  );
}
