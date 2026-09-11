'use client';

import { motion, type Variants } from 'motion/react';
import { cn, splitForStagger } from '@/lib/utils';

const lineVariants: Variants = {
  hidden: {},
  show: (delay: number) => ({ transition: { staggerChildren: 0.035, delayChildren: delay } }),
};

const unitVariants: Variants = {
  hidden: { y: '110%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Reveals text unit-by-unit from behind a mask. Japanese is split per
 * character, Latin per word, so line-breaking stays natural in both.
 */
export function SplitText({
  text,
  className,
  delay = 0,
  once = true,
  as: Tag = 'span',
}: {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p';
}) {
  const lines = text.split('\n');

  return (
    <Tag className={cn('block', className)}>
      {lines.map((line, lineIndex) => (
        <motion.span
          key={lineIndex}
          className="block overflow-hidden"
          initial="hidden"
          whileInView="show"
          viewport={{ once, amount: 0.6 }}
          variants={lineVariants}
          custom={delay + lineIndex * 0.06}
        >
          {splitForStagger(line).map((unit, i) =>
            /^\s+$/.test(unit) ? (
              <span key={i}> </span>
            ) : (
              <motion.span key={i} className="inline-block" variants={unitVariants}>
                {unit}
              </motion.span>
            ),
          )}
        </motion.span>
      ))}
    </Tag>
  );
}

/** Same reveal, but driven on mount instead of on scroll — for hero copy. */
export function SplitTextOnLoad({
  text,
  className,
  delay = 0,
  as: Tag = 'span',
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: 'span' | 'h1' | 'h2' | 'p';
}) {
  const lines = text.split('\n');

  return (
    <Tag className={cn('block', className)}>
      {lines.map((line, lineIndex) => (
        <motion.span
          key={lineIndex}
          className="block overflow-hidden"
          initial="hidden"
          animate="show"
          variants={lineVariants}
          custom={delay + lineIndex * 0.08}
        >
          {splitForStagger(line).map((unit, i) =>
            /^\s+$/.test(unit) ? (
              <span key={i}> </span>
            ) : (
              <motion.span key={i} className="inline-block" variants={unitVariants}>
                {unit}
              </motion.span>
            ),
          )}
        </motion.span>
      ))}
    </Tag>
  );
}
