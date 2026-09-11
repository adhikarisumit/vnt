'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

/**
 * Google Maps iframe held behind a click-to-load cover, so the third-party
 * frame (and its cookies) only load when a visitor actually asks for the map.
 */
export function MapEmbed({
  src,
  title,
  address,
  cta,
  height = 'h-[24rem] md:h-[32rem]',
}: {
  src: string;
  title: string;
  address: string;
  cta: string;
  height?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative w-full overflow-hidden bg-page-2 ${height}`}>
      {loaded ? (
        <iframe
          src={src}
          title={title}
          className="h-full w-full border-0 grayscale-[0.25] contrast-[1.02]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center"
        >
          <span
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                'linear-gradient(var(--color-page-3) 1px, transparent 1px), linear-gradient(90deg, var(--color-page-3) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
            }}
          />
          <motion.span
            aria-hidden
            className="relative flex h-14 w-14 items-center justify-center rounded-full border border-brass/60 bg-page"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-brass" />
          </motion.span>
          <span className="relative type-mincho text-sm text-ink/80">{address}</span>
          <span className="relative text-[0.6875rem] tracking-[0.28em] text-brass uppercase">{cta}</span>
        </button>
      )}
    </div>
  );
}
