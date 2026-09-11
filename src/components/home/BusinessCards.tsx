'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { businessAreas } from '@/content/business';
import { localePath, t, type Locale } from '@/lib/i18n';

/**
 * The six business areas as editorial plates: a landscape photograph, then the
 * index, a rule and the copy set on paper beneath it. The index sits on paper
 * rather than over the image so it stays legible whatever photograph the
 * client swaps in later. Corner rules and the hairline draw in on hover.
 *
 * Geometry follows the live site measured at 1440px: three 378×250 photos
 * with 43px between columns, i.e. a 1220px-wide block.
 */
export function BusinessCards({ locale, viewMore }: { locale: Locale; viewMore: string }) {
  return (
    <ul className="mx-auto grid max-w-[76.25rem] gap-x-6 gap-y-14 md:grid-cols-2 md:gap-x-8 xl:grid-cols-3 xl:gap-x-[43px]">
      {businessAreas.map((area, i) => {
        const body = (
          <>
            {/* One area carries no photograph on the live site; the slot is
                still reserved so every card's copy sits on the same baseline. */}
            {area.image ? (
              <div className="relative aspect-[378/250] w-full overflow-hidden bg-page-2">
                <Image
                  src={area.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-106"
                />

                {/* Corner bracket, top right. */}
                <span
                  aria-hidden
                  className="absolute top-5 right-5 h-6 w-6 origin-top-right scale-75 opacity-0 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100 group-hover:opacity-100"
                >
                  <span className="absolute top-0 right-0 h-px w-full bg-brass-lit" />
                  <span className="absolute top-0 right-0 h-full w-px bg-brass-lit" />
                </span>
              </div>
            ) : (
              <div aria-hidden className="hidden aspect-[378/250] w-full md:block" />
            )}

            <div className="pt-6">
              <div className="flex items-center gap-4">
                <span className="type-display text-[0.625rem] tracking-[0.3em] text-brass">{area.no}</span>
                <span className="relative h-px flex-1 bg-ink/12">
                  <span className="absolute inset-0 origin-left scale-x-0 bg-brass transition-transform duration-700 ease-[cubic-bezier(0.83,0,0.17,1)] group-hover:scale-x-100" />
                </span>
              </div>

              <h3 className="type-display mt-5 text-[clamp(1.05rem,1.6vw,1.3rem)] text-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                {t(area.title, locale)}
              </h3>

              <p className="type-body mt-4 text-[0.8125rem] leading-[1.95]">{t(area.summary, locale)}</p>

              {area.href && (
                <span className="mt-6 inline-flex items-center gap-2.5 text-[0.6875rem] tracking-[0.2em] text-brass uppercase">
                  {viewMore}
                  <span
                    aria-hidden
                    className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </span>
              )}
            </div>
          </>
        );

        return (
          <motion.li
            key={area.id}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {area.href ? (
              <Link href={localePath(locale, area.href)} className="group block">
                {body}
              </Link>
            ) : (
              <div className="group block">{body}</div>
            )}
          </motion.li>
        );
      })}
    </ul>
  );
}
