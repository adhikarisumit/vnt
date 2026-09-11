'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'motion/react';

/**
 * Click-to-play YouTube facade — keeps the player (and its cookies) off the
 * page until a visitor asks for it, and keeps LCP off a third-party iframe.
 */
export function VideoEmbed({
  id,
  poster,
  label,
  title,
}: {
  id: string;
  poster: string;
  label: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-page-2">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0"
          aria-label={label}
        >
          <Image src={poster} alt="" fill sizes="100vw" className="object-cover" />
          <span className="absolute inset-0 bg-ink/45 transition-colors duration-500 group-hover:bg-ink/30" />

          <motion.span
            className="absolute top-1/2 left-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brass-lit/70 bg-ink/40 backdrop-blur-sm md:h-24 md:w-24"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              aria-hidden
              className="ml-1 block h-0 w-0 border-y-[9px] border-l-[15px] border-y-transparent border-l-brass-lit"
            />
          </motion.span>

          <span className="absolute bottom-6 left-6 text-[0.6875rem] tracking-[0.28em] text-washi/75 uppercase">
            {label}
          </span>
        </button>
      )}
    </div>
  );
}
