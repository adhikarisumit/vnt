import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { PageHero } from '@/components/sections/PageHero';
import { GroupBookingCTA } from '@/components/sections/GroupBookingCTA';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { SectionHeading } from '@/components/ui/SectionHeading';

import { venues } from '@/content/dining';
import { ikegami } from '@/content/business';
import { getDictionary } from '@/content/dictionary';
import { isLocale, localePath, t, type Locale } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const ja = locale === 'ja';
  return {
    title: ja ? '飲食店事業' : 'Dining & Retail',
    description: ja
      ? '浅草の「芸者亭」、有明の「和楽亭」、そして免税ドラッグストア「イケガミストア」。食と芸能、日々の買いものを通じて日本文化を届けます。'
      : 'Geisha-tei in Asakusa, Warakutei in Ariake, and the Ikegami Store — Japanese culture through food, performance and the everyday shop.',
  };
}

export default async function DiningPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const active = locale as Locale;
  const dict = getDictionary(active);

  return (
    <>
      <PageHero
        eyebrow="Food & Shop"
        title={'FOOD\n& SHOP'}
        lead={
          active === 'ja'
            ? '食を通じて日本文化を体感できる場所を、東京の街につくる。'
            : 'Places in Tokyo where Japanese culture can be tasted, watched and taken home.'
        }
        image="/images/geisya/geisya-01.webp"
      />

      {/* Featured venues -------------------------------------------------- */}
      {venues.map((venue, i) => (
        <section key={venue.slug} className="relative border-t border-ink/10 py-20 md:py-28">
          <div className="shell-wide">
            <div
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
                i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <Reveal direction={i % 2 === 1 ? 'left' : 'right'}>
                <Link href={localePath(active, `/dining/${venue.slug}`)} className="group block">
                  <div className="relative aspect-4/3 w-full overflow-hidden">
                    <Image
                      src={venue.hero}
                      alt={t(venue.name, active)}
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
                  <p className="type-eyebrow">{`0${i + 1} — ${t(venue.area, active)}`}</p>
                </Reveal>
                <SplitText
                  as="h2"
                  text={t(venue.name, active)}
                  delay={0.06}
                  className="type-display mt-5 text-[clamp(1.5rem,3.6vw,2.75rem)] text-ink"
                />
                <Reveal delay={0.16}>
                  <p className="type-mincho mt-5 text-[1.05rem] text-brass">{t(venue.tagline, active)}</p>
                </Reveal>
                <Reveal delay={0.24}>
                  <p className="type-body mt-6 max-w-xl">{t(venue.lede, active)}</p>
                </Reveal>
                <Reveal delay={0.32} className="mt-10">
                  <ArrowLink href={localePath(active, `/dining/${venue.slug}`)}>{dict.common.viewMore}</ArrowLink>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Retail ----------------------------------------------------------- */}
      <section className="relative border-t border-ink/10 py-24 md:py-32">
        <div className="shell-wide">
          <SectionHeading
            eyebrow="Retail"
            title={t(ikegami.name, active)}
            lead={t(ikegami.lede, active)}
          />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <PropertyCard
              href={localePath(active, '/retail')}
              image={ikegami.image}
              name={t(ikegami.name, active)}
              sub={active === 'ja' ? '浅草の免税ドラッグストア' : 'Tax-free drugstore in Asakusa'}
              meta={active === 'ja' ? '東京・浅草' : 'Asakusa, Tokyo'}
              ratio="aspect-4/3"
            />
          </div>
        </div>
      </section>

      <GroupBookingCTA locale={active} body={dict.home.groupDining} />
    </>
  );
}
