'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Wordmark } from '@/components/brand/Wordmark';

const SESSION_KEY = 'vnt:intro-played';

/**
 * A single brass-rule curtain that lifts once per session. Skipping repeats
 * keeps internal navigation quick without losing the arrival moment.
 */
export default function Preloader({ tagline }: { tagline: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    setVisible(true);
    document.body.style.overflow = 'hidden';

    const timer = window.setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1');
      setVisible(false);
      document.body.style.overflow = '';
    }, 2100);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-page"
          exit={{ y: '-100%' }}
          transition={{ duration: 1, ease: [0.83, 0, 0.17, 1] }}
        >
          <motion.div
            className="w-[min(60vw,22rem)] text-brand"
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Wordmark />
          </motion.div>

          <motion.div
            className="mt-6 h-px w-[min(60vw,26rem)] origin-left bg-brass"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.83, 0, 0.17, 1] }}
          />

          <motion.p
            className="mt-6 text-xs tracking-[0.3em] text-stone uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {tagline}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
