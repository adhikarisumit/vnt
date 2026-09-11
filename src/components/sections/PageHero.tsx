'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { ScrollFadeOut } from '@/components/motion/Parallax';
import { SplitTextOnLoad } from '@/components/motion/SplitText';
import { cn } from '@/lib/utils';

/**
 * Standard inner-page masthead. The photograph carries an ink scrim so the
 * title can stay washi-white, then washes out into the paper page below.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  alt = '',
  height = 'h-[68vh] min-h-[26rem] md:h-[82vh]',
  align = 'left',
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  image: string;
  alt?: string;
  height?: string;
  align?: 'left' | 'center';
}) {
  return (
    <section className={cn('relative w-full overflow-hidden bg-ink', height)}>
      <ScrollFadeOut className="absolute inset-0">
        <div className="relative h-full w-full">
          <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-ink/45" />
          <div className="absolute inset-0 bg-linear-to-t from-ink/75 via-ink/15 to-ink/35" />
        </div>
      </ScrollFadeOut>

      <div className="grain-dark absolute inset-0" />

      <div
        className={cn(
          'shell-wide relative flex h-full flex-col justify-end pb-20 md:pb-28',
          align === 'center' && 'items-center text-center',
        )}
      >
        {eyebrow && (
          <motion.p
            className="type-eyebrow-lit"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {eyebrow}
          </motion.p>
        )}

        <SplitTextOnLoad
          as="h1"
          text={title}
          delay={0.25}
          className="type-display mt-5 max-w-4xl text-[clamp(2rem,6.4vw,5rem)] text-washi"
        />

        {lead && (
          <motion.p
            className={cn(
              'type-mincho mt-7 max-w-xl text-[0.95rem] whitespace-pre-line text-washi/80',
              align === 'center' && 'mx-auto',
            )}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
          >
            {lead}
          </motion.p>
        )}

        <motion.div
          className="mt-10 h-px w-full origin-left bg-linear-to-r from-brass-lit/80 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.3, delay: 0.7, ease: [0.83, 0, 0.17, 1] }}
        />
      </div>
    </section>
  );
}
