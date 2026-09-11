'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

/**
 * A brass ring that trails the pointer and swells over interactive targets.
 * Only mounts on devices with a real hover-capable pointer.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 34, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 380, damping: 34, mass: 0.35 });

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduced.matches) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setActive(Boolean(el?.closest('a, button, [data-cursor="hover"], input, select, textarea')));
    };

    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[150] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.span
        className="block rounded-full border border-brass"
        animate={{
          width: active ? 48 : 22,
          height: active ? 48 : 22,
          marginLeft: active ? -24 : -11,
          marginTop: active ? -24 : -11,
          backgroundColor: active ? 'rgba(179,146,79,0.14)' : 'rgba(179,146,79,0)',
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}
