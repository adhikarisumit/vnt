'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { businessAreas } from '@/content/business';
import { localePath, t, type Locale } from '@/lib/i18n';

/** Fills the one slot the live page leaves empty (商品企画・製造販売). */
const FALLBACK_IMAGE: Record<string, string> = { product: '/images/business/product-02.webp' };

/**
 * The six business areas as on the live home page: photo, Mincho title,
 * copy, and 詳しく見る set right. Three columns, 378×250 photos with 43px
 * gaps at 1440px.
 */
export function BusinessCards({ locale, viewMore }: { locale: Locale; viewMore: string }) {
  return (
    <ul className="mx-auto grid max-w-[76.25rem] gap-x-6 gap-y-14 md:grid-cols-2 md:gap-x-8 xl:grid-cols-3 xl:gap-x-[43px]">
      {businessAreas.map((area, i) => {
        const image = area.image ?? FALLBACK_IMAGE[area.id];
        const body = (
          <>
            <div className="relative aspect-[378/250] w-full overflow-hidden bg-page-2">
              {image && (
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
            </div>

            <h3 className="type-mincho mt-6 text-[1.375rem] text-black">{t(area.title, locale)}</h3>
            <p className="mt-3 text-[0.9375rem] leading-[1.7] tracking-[0.03em] text-ink-mute">{t(area.summary, locale)}</p>

            {area.href && (
              <span className="mt-3 block text-right text-[0.875rem] text-ink-mute group-hover:text-brand">{viewMore}</span>
            )}
          </>
        );

        return (
          <motion.li
            key={area.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: (i % 3) * 0.08 }}
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
