import Image from 'next/image';
import { notFound } from 'next/navigation';

import { HomeHero } from '@/components/home/HomeHero';
import { BusinessCards } from '@/components/home/BusinessCards';
import { GroupBookingCTA } from '@/components/sections/GroupBookingCTA';
import { Reveal, RevealImage } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { Parallax } from '@/components/motion/Parallax';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { ArrowLink, ButtonLink } from '@/components/ui/ArrowLink';

import { getDictionary } from '@/content/dictionary';
import { hotels } from '@/content/hotels';
import { venues } from '@/content/dining';
import { ikegami, supplierCall } from '@/content/business';
import { isLocale, localePath, t } from '@/lib/i18n';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <HomeHero
        line1={dict.home.heroLine1}
        line2={dict.home.heroLine2}
        intro={dict.home.intro}
        cta={dict.contact.title}
        ctaHref={localePath(locale, '/contact')}
        scrollLabel={dict.common.scroll}
      />

      {/* Business — follows the hero directly, as on the original site. ---- */}
      <section id="business" className="relative py-24 md:py-32">
        <div className="shell">
          {/* Same 1220px block as the cards, so the centred heading sits over their middle. */}
          <div className="mx-auto max-w-[76.25rem]">
            <SectionHeading eyebrow="01 — Business" title={dict.home.businessTitle} lead={dict.home.businessLead} />
            <div className="mt-16">
              <BusinessCards locale={locale} viewMore={dict.common.viewMore} />
            </div>
          </div>
        </div>
      </section>

      {/* Hotels ---------------------------------------------------------- */}
      <section id="hotel" className="relative overflow-hidden border-t border-ink/10 py-24 md:py-32">
        <div className="shell-wide">
          <SectionHeading eyebrow="02 — Stay" title={dict.home.hotelTitle} lead={dict.home.hotelLead} />
          <Reveal delay={0.2} className="mt-8 text-center">
            <ArrowLink href={localePath(locale, '/hotels')}>{dict.common.viewAll}</ArrowLink>
          </Reveal>

          <div className="mt-16 grid gap-5 md:grid-cols-3 md:gap-7">
            {hotels.map((hotel, i) => (
              <PropertyCard
                key={hotel.slug}
                index={i}
                href={localePath(locale, `/hotels/${hotel.slug}`)}
                image={hotel.hero}
                name={hotel.name}
                sub={t(hotel.tagline, locale)}
                meta={t(hotel.location, locale)}
                stars={hotel.stars}
              />
            ))}
          </div>

          <Reveal delay={0.15} className="mt-16">
            <div className="grid gap-8 border border-ink/12 p-8 md:grid-cols-[1.4fr_1fr] md:p-12">
              <p className="type-body whitespace-pre-line">{dict.home.groupHotel}</p>
              <div className="flex items-end justify-start md:justify-end">
                <ButtonLink href={localePath(locale, '/reservation')} variant="outline">
                  {dict.common.reserve}
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Food & Shop ----------------------------------------------------- */}
      <section id="foodshop" className="relative overflow-hidden border-t border-ink/10 py-24 md:py-32">
        <div className="shell-wide">
          <SectionHeading eyebrow="03 — Taste" title={dict.home.diningTitle} lead={dict.home.diningLead} />
          <Reveal delay={0.2} className="mt-8 text-center">
            <ArrowLink href={localePath(locale, '/dining')}>{dict.common.viewAll}</ArrowLink>
          </Reveal>

          <div className="mt-16 grid gap-5 md:grid-cols-2 md:gap-7 xl:grid-cols-4">
            {venues.map((venue, i) => (
              <PropertyCard
                key={venue.slug}
                index={i}
                href={localePath(locale, `/dining/${venue.slug}`)}
                image={venue.hero}
                name={t(venue.name, locale)}
                sub={t(venue.tagline, locale)}
                meta={t(venue.area, locale)}
              />
            ))}
            <PropertyCard
              index={3}
              href={localePath(locale, '/retail')}
              image={ikegami.image}
              name={t(ikegami.name, locale)}
              sub={locale === 'ja' ? '浅草の免税ドラッグストア' : 'Tax-free drugstore in Asakusa'}
              meta={locale === 'ja' ? '東京・浅草' : 'Asakusa, Tokyo'}
            />
          </div>

          <Reveal delay={0.15} className="mt-16">
            <div className="grid gap-8 border border-ink/12 p-8 md:grid-cols-[1.4fr_1fr] md:p-12">
              <p className="type-body whitespace-pre-line">{dict.home.groupDining}</p>
              <div className="flex items-end justify-start md:justify-end">
                <ButtonLink href={localePath(locale, '/reservation')} variant="outline">
                  {dict.common.reserve}
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Supplier call --------------------------------------------------- */}
      <section className="relative overflow-hidden border-t border-ink/10">
        <div className="grid lg:grid-cols-2">
          <Parallax strength={10} className="min-h-[22rem] lg:min-h-[34rem]">
            <Image src="/images/business/oem-02.webp" alt="" fill sizes="50vw" className="object-cover" />
          </Parallax>

          <div className="flex items-center bg-page-2 px-(--spacing-gutter) py-20 md:py-28">
            <div className="max-w-xl">
              <Reveal>
                <p className="type-eyebrow">Suppliers</p>
              </Reveal>
              <SplitText
                as="h2"
                text={t(supplierCall.title, locale)}
                delay={0.06}
                className="type-display mt-5 text-[clamp(1.5rem,3.2vw,2.5rem)] text-ink"
              />
              <Reveal delay={0.18}>
                <p className="type-body mt-7 whitespace-pre-line">{t(supplierCall.body, locale)}</p>
              </Reveal>
              <Reveal delay={0.26} className="mt-10">
                <ButtonLink href={localePath(locale, '/contact')} variant="brass">
                  {dict.contact.title}
                </ButtonLink>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <GroupBookingCTA locale={locale} body={dict.reservation.lead} />

      {/* Contact --------------------------------------------------------- */}
      <section className="relative overflow-hidden py-28 md:py-40">
        <RevealImage className="absolute inset-0">
          <Image src="/images/brand/hero-main.webp" alt="" fill sizes="100vw" className="object-cover opacity-15" />
        </RevealImage>
        <div className="absolute inset-0 bg-linear-to-b from-page via-page/75 to-page" />

        <div className="shell relative text-center">
          <Reveal>
            <p className="type-eyebrow">{dict.home.contactTitle}</p>
          </Reveal>
          <SplitText
            as="h2"
            text={dict.home.contactLead}
            delay={0.08}
            className="type-display mx-auto mt-6 max-w-3xl text-[clamp(1.6rem,4vw,3rem)] text-ink"
          />
          <Reveal delay={0.24} className="mt-12 flex flex-wrap justify-center gap-4">
            <ButtonLink href={localePath(locale, '/contact')} variant="ink">
              {dict.contact.title}
            </ButtonLink>
            <ButtonLink href={localePath(locale, '/reservation')} variant="outline">
              {dict.reservation.title}
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
