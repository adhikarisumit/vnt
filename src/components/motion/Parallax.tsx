'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { cn } from '@/lib/utils';

/**
 * Moves its child against the scroll direction as the wrapper crosses the
 * viewport. `strength` is expressed in percent of the element height.
 */
export function Parallax({
  children,
  className,
  strength = 12,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const raw = useTransform(scrollYProgress, [0, 1], [`${strength}%`, `${-strength}%`]);
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div style={{ y }} className="absolute inset-[-15%]">
        {children}
      </motion.div>
    </div>
  );
}

/** Fades and lifts a whole section out as it leaves the top of the viewport. */
export function ScrollFadeOut({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ opacity, y, scale }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
