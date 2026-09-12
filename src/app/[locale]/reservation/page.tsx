import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { PageHero } from '@/components/sections/PageHero';
import { ReservationForm } from '@/components/forms/ReservationForm';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArrowLink } from '@/components/ui/ArrowLink';

import { getDictionary } from '@/content/dictionary';
import { site } from '@/content/site';
import { isLocale, localePath, type Locale } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const ja = locale === 'ja';
  return {
    title: ja ? '団体予約受付' : 'Group Reservations',
    description: ja
      ? 'ホテル・レストラン・芸者ショーの団体予約を承ります。お電話またはフォームからお問い合わせください。'
      : 'Group bookings for our hotels, restaurants and geisha performances — by phone or through the form.',
  };
}

export default async function ReservationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const active = locale as Locale;
  const dict = getDictionary(active);

  const options = [
    {
      title: dict.reservation.hotelTitle,
      body: dict.reservation.hotelBody,
      image: '/images/fuji/fuji-03.webp',
      href: '/hotels',
      cta: dict.reservation.detail,
    },
    {
      title: dict.reservation.restaurantTitle,
      body: dict.reservation.restaurantBody,
      image: '/images/reservation/res-01.webp',
      href: '#form',
    },
    {
      title: dict.reservation.showTitle,
      body: dict.reservation.showBody,
      image: '/images/reservation/res-02.webp',
      href: '#form',
      cta: dict.reservation.geishaDetail,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Group Reservations"
        title={dict.reservation.title}
        image="/images/fuji/fuji-03.webp"
        height="h-[58vh] min-h-[22rem] md:h-[70vh]"
      />

      {/* Cross-link to the general enquiry form ---------------------------- */}
      <div className="border-b border-ink/10 bg-page-2">
        <div className="shell flex flex-wrap items-center gap-x-3 gap-y-1 py-5 text-[0.8125rem] text-ink/60">
          <span>{dict.reservation.switchToContact}</span>
          <Link href={localePath(active, '/contact')} className="text-brass underline-offset-4 hover:underline">
            {dict.contact.here}
          </Link>
          <span className="flex-1" />
          <a href="#call" className="border border-brass/50 px-5 py-2 text-[0.75rem] tracking-[0.14em] text-brass hover:bg-brass hover:text-page">
            {dict.reservation.byPhone}
          </a>
          <a href="#form" className="border border-brass/50 px-5 py-2 text-[0.75rem] tracking-[0.14em] text-brass hover:bg-brass hover:text-page">
            {dict.reservation.byForm}
          </a>
        </div>
      </div>

      {/* What we take bookings for ---------------------------------------- */}
      <section className="relative py-20 md:py-28">
        <div className="shell-wide">
          <div className="grid gap-6 md:grid-cols-3 md:gap-7">
            {options.map((option, i) => (
              <Reveal key={option.title} delay={i * 0.1}>
                <Link
                  href={option.href.startsWith('#') ? option.href : localePath(active, option.href)}
                  className="group block h-full"
                >
                  <div className="relative aspect-16/10 w-full overflow-hidden">
                    <Image
                      src={option.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-107"
                    />
                    <div className="absolute inset-0 bg-ink/12" />
                  </div>
                  <h3 className="type-display mt-6 text-[1.125rem] text-ink">{option.title}</h3>
                  <p className="type-body mt-3 text-[0.8125rem]">{option.body}</p>
                  {option.cta && (
                    <span className="mt-5 inline-block border-b border-brass/50 pb-1 text-[0.75rem] tracking-[0.18em] text-brass transition-colors group-hover:border-brass">
                      {option.cta} →
                    </span>
                  )}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* By phone --------------------------------------------------------- */}
      <section id="call" className="relative scroll-mt-24 border-y border-brass/25 bg-page-2 py-16 md:py-20">
        <div className="shell flex flex-wrap items-center justify-between gap-8">
          <div>
            <Reveal>
              <p className="type-eyebrow">{dict.reservation.phoneLeadEn}</p>
            </Reveal>
            <SplitText
              as="h2"
              text={dict.reservation.phoneLead}
              delay={0.06}
              className="type-display mt-4 text-[clamp(1.25rem,2.8vw,2rem)] text-ink"
            />
          </div>

          <Reveal delay={0.14}>
            <a href={`tel:${site.telGroup.replace(/-/g, '')}`} className="group flex items-baseline gap-4">
              <span className="text-[0.625rem] tracking-[0.26em] text-stone uppercase">{dict.common.groupDesk}</span>
              <span className="type-display text-[clamp(1.75rem,4.5vw,3rem)] text-brass transition-opacity duration-400 group-hover:opacity-75">
                {site.telGroup}
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* Form ------------------------------------------------------------- */}
      <section id="form" className="relative scroll-mt-24 py-24 md:py-32">
        <div className="shell">
          <SectionHeading eyebrow={dict.reservation.formLeadEn} title={dict.reservation.formLead} />
          <div className="mt-14">
            <ReservationForm locale={active} />
          </div>

          <Reveal delay={0.1} className="mt-14">
            <ArrowLink href={localePath(active, '/contact')}>{dict.contact.title}</ArrowLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
