'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

/**
 * Live home hero: the Yokohama harbour photo under the white header, the
 * Mincho line and its English echo set right, a white shadowed button, and
 * the three-line statement low on the left over the water. The live page's
 * stray "Type Something" placeholder is left out.
 */
export function HomeHero({
  line1,
  line2,
  intro,
  cta,
  ctaHref,
}: {
  line1: string;
  line2: string;
  intro: string;
  cta: string;
  ctaHref: string;
  scrollLabel?: string;
}) {
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="relative h-[34rem] w-full overflow-hidden md:h-[clamp(34rem,53vw,54rem)]">
      <Image src="/images/brand/hero-group.webp" alt="" fill priority sizes="100vw" className="object-cover" />
      {/* Barely there: keeps the white type readable on bright sky without
          changing how the photograph looks. */}
      <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/20" />

      <div className="relative flex h-full flex-col items-end justify-center px-5 text-right md:-mt-[4%] md:px-[8.5%]">
        <motion.h1
          {...rise(0.15)}
          className="type-mincho text-[clamp(1.85rem,2.6vw,2.4rem)] tracking-[0.12em] text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.25)]"
        >
          {line1}
        </motion.h1>
        <motion.p
          {...rise(0.35)}
          className="mt-4 font-[family-name:var(--font-tenor)] text-[clamp(1rem,1.2vw,1.1rem)] tracking-[0.04em] text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.3)]"
        >
          {line2}
        </motion.p>
        <motion.div {...rise(0.55)} className="mt-7 md:mt-8">
          <Link href={ctaHref} className="btn-live min-w-[14rem] md:min-w-[12rem]">
            {cta}
          </Link>
        </motion.div>
      </div>

      <motion.p
        {...rise(0.75)}
        className="absolute bottom-[20%] left-5 text-[clamp(0.95rem,1vw,1.05rem)] leading-[1.7] whitespace-pre-line text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.45)] md:bottom-[13%] md:left-[12.5%] md:text-[0.9375rem]"
      >
        {intro}
      </motion.p>
    </section>
  );
}
