'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { SplitTextOnLoad } from '@/components/motion/SplitText';
import { ButtonLink } from '@/components/ui/ArrowLink';

export function HomeHero({
  line1,
  line2,
  intro,
  cta,
  ctaHref,
  scrollLabel,
}: {
  line1: string;
  line2: string;
  /** Statement set low over the water, where the original site places it. */
  intro: string;
  cta: string;
  ctaHref: string;
  scrollLabel: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  // Starts light so the sky reads as the original's bright blue, then
  // deepens as the hero scrolls away.
  const overlay = useTransform(scrollYProgress, [0, 1], [0.08, 0.6]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-ink">
      <motion.div style={{ y, scale }} className="absolute inset-[-8%]">
        <Image
          src="/images/brand/hero-group.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <motion.div style={{ opacity: overlay }} className="absolute inset-0 bg-ink" />
      {/* Darkens only the low band where the intro copy sits, plus a whisper
          at the top for the header; the sky in between stays bright. */}
      <div className="absolute inset-0 bg-linear-to-t from-ink/65 via-transparent via-40% to-ink/15" />
      <div className="grain-dark absolute inset-0" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="shell-wide relative flex h-full flex-col justify-center md:items-end md:text-right"
      >
        <motion.p
          className="type-eyebrow-lit"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          VNT GROUP
        </motion.p>

        <SplitTextOnLoad
          as="h1"
          text={line1}
          delay={0.35}
          className="type-display mt-6 max-w-5xl text-[clamp(2.25rem,7vw,6rem)] text-washi [text-shadow:0_2px_28px_rgba(21,21,26,0.45)]"
        />

        <motion.p
          className="type-display mt-6 text-[clamp(0.8rem,1.6vw,1.125rem)] tracking-[0.24em] text-washi [text-shadow:0_1px_14px_rgba(21,21,26,0.5)]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85 }}
        >
          {line2}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1 }}
          className="mt-12"
        >
          <ButtonLink href={ctaHref} variant="on-media">
            {cta}
          </ButtonLink>
        </motion.div>

        {/* The original sets this small and white straight onto the busy
            harbour, where it disappears. Here it sits over the darkest band
            of the scrim, larger, behind a brass rule and a soft shadow. */}
        <motion.p
          className="type-mincho absolute bottom-12 left-(--spacing-gutter) text-left max-w-[min(34rem,calc(100%-2*var(--spacing-gutter)))] border-l border-brass-lit/70 pl-5 text-[clamp(0.9rem,1.35vw,1.1rem)] leading-[2.05] whitespace-pre-line text-washi [text-shadow:0_1px_12px_rgba(21,21,26,0.65)] md:bottom-16 md:pl-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {intro}
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute right-(--spacing-gutter) bottom-10 hidden flex-col items-center gap-3 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        style={{ opacity: contentOpacity }}
      >
        <span className="text-[0.625rem] tracking-[0.3em] text-washi/60 uppercase">{scrollLabel}</span>
        <span className="relative block h-14 w-px overflow-hidden bg-washi/25">
          <motion.span
            className="absolute inset-x-0 top-0 block h-1/2 bg-brass-lit"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  );
}
