import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { PageHero } from '@/components/sections/PageHero';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { news } from '@/content/news';
import { getDictionary } from '@/content/dictionary';
import { isLocale, t, type Locale } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === 'ja' ? 'ニュース' : 'News' };
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const active = locale as Locale;
  const dict = getDictionary(active);

  const sorted = [...news].sort((a, b) => b.date.localeCompare(a.date));
  const formatter = new Intl.DateTimeFormat(active === 'ja' ? 'ja-JP' : 'en-GB', { dateStyle: 'long' });

  return (
    <>
      <PageHero
        eyebrow="News"
        title={dict.news.title}
        image="/images/brand/hero-group.webp"
        height="h-[46vh] min-h-[18rem] md:h-[56vh]"
      />

      <section className="relative py-20 md:py-28">
        <div className="shell">
          {sorted.length === 0 ? (
            <p className="type-body">{dict.news.empty}</p>
          ) : (
            <RevealGroup as="ul" className="divide-y divide-ink/10 border-y border-ink/10">
              {sorted.map((item) => (
                <RevealItem key={item.slug} as="li">
                  <article className="grid gap-6 py-9 md:grid-cols-[10rem_1fr_14rem] md:gap-10">
                    <div className="flex flex-wrap items-baseline gap-4 md:flex-col md:items-start md:gap-2">
                      <time dateTime={item.date} className="type-display text-sm tracking-[0.14em] text-brass">
                        {formatter.format(new Date(item.date))}
                      </time>
                      <span className="border border-ink/20 px-3 py-1 text-[0.5625rem] tracking-[0.2em] text-stone uppercase">
                        {t(item.category, active)}
                      </span>
                    </div>

                    <div>
                      <h2 className="type-mincho text-[1.05rem] leading-relaxed text-ink">
                        {t(item.title, active)}
                      </h2>
                      <p className="type-body mt-3 text-[0.8125rem]">{t(item.body, active)}</p>
                    </div>

                    {item.image && (
                      <div className="relative aspect-16/10 w-full overflow-hidden md:aspect-4/3">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 100vw, 14rem"
                          className="object-cover"
                        />
                      </div>
                    )}
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </div>
      </section>
    </>
  );
}
