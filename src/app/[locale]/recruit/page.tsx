import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { PageHero } from '@/components/sections/PageHero';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { ButtonLink } from '@/components/ui/ArrowLink';
import { businessAreas } from '@/content/business';
import { getDictionary } from '@/content/dictionary';
import { isLocale, localePath, t, type Locale } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === 'ja' ? '採用情報' : 'Careers' };
}

export default async function RecruitPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const active = locale as Locale;
  const dict = getDictionary(active);

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={dict.recruit.title}
        lead={dict.recruit.lead}
        image="/images/business/oem-03.webp"
        height="h-[52vh] min-h-[20rem] md:h-[62vh]"
      />

      <section className="relative py-24 md:py-32">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SplitText
              as="h2"
              text={dict.recruit.lead}
              className="type-display text-[clamp(1.4rem,3vw,2.25rem)] text-ink"
            />
            <div>
              <Reveal delay={0.12}>
                <p className="type-body">{dict.recruit.body}</p>
              </Reveal>
              <Reveal delay={0.2} className="mt-10">
                <ButtonLink href={localePath(active, '/contact')} variant="brass">
                  {dict.recruit.cta}
                </ButtonLink>
              </Reveal>
            </div>
          </div>

          <div className="mt-20 grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-3">
            {businessAreas.map((area, i) => (
              <Reveal key={area.id} delay={i * 0.06} className="bg-page p-8">
                <p className="type-display text-[0.625rem] tracking-[0.24em] text-brass">{area.no}</p>
                <h3 className="type-display mt-4 text-[1.0625rem] text-ink">{t(area.title, active)}</h3>
                <p className="type-body mt-3 line-clamp-3 text-[0.8125rem]">{t(area.summary, active)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
