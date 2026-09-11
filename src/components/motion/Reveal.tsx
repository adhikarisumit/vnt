'use client';

import { motion, type Variants } from 'motion/react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 36 },
  down: { x: 0, y: -36 },
  left: { x: 36, y: 0 },
  right: { x: -36, y: 0 },
  none: { x: 0, y: 0 },
};

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.9,
  direction = 'up',
  amount = 0.25,
  once = true,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  amount?: number;
  once?: boolean;
  as?: 'div' | 'section' | 'li' | 'article' | 'span';
}) {
  const { x, y } = offsets[direction];
  const Comp = motion[as];

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Comp>
  );
}

/** Staggers direct children. Pair with `RevealItem`. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  amount = 0.2,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
  as?: 'div' | 'ul' | 'section';
}) {
  const Comp = motion[as];
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  return (
    <Comp className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount }} variants={variants}>
      {children}
    </Comp>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

export function RevealItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article' | 'span';
}) {
  const Comp = motion[as];
  return (
    <Comp className={className} variants={itemVariants}>
      {children}
    </Comp>
  );
}

/**
 * Wipes an image in from behind a hard edge while it settles back from a
 * slight zoom. The wipe is a scaling curtain rather than an animated
 * `clip-path`: browsers collapse `inset()` shorthand in the computed style,
 * which leaves the interpolation unable to match its start and end values.
 */
export function RevealImage({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn('relative overflow-hidden', className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="h-full w-full"
        variants={{ hidden: { scale: 1.16 }, show: { scale: 1 } }}
        transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>

      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 origin-bottom bg-page"
        variants={{ hidden: { scaleY: 1 }, show: { scaleY: 0 } }}
        transition={{ duration: 1.1, delay, ease: [0.83, 0, 0.17, 1] }}
      />
    </motion.div>
  );
}
