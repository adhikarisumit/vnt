'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { RevealImage } from '@/components/motion/Reveal';

export type GalleryItem = { src: string; caption: string };

/** Masonry-ish grid that opens into a keyboard-navigable lightbox. */
export function Gallery({ items, closeLabel }: { items: GalleryItem[]; closeLabel: string }) {
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback(
    (delta: number) => setOpen((i) => (i === null ? null : (i + delta + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, step]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {items.map((item, i) => (
          <RevealImage key={item.src + i} delay={(i % 4) * 0.08} className="group">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="relative block aspect-[4/5] w-full overflow-hidden"
              aria-label={item.caption}
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-107"
              />
              <span className="absolute inset-0 bg-linear-to-t from-ink/75 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />
              <span className="absolute right-4 bottom-4 left-4 text-left text-[0.6875rem] tracking-[0.18em] text-washi/85 uppercase">
                {item.caption}
              </span>
            </button>
          </RevealImage>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[160] flex items-center justify-center bg-ink/96 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setOpen(null)}
          >
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="absolute top-6 right-6 z-10 text-[0.6875rem] tracking-[0.28em] text-washi/70 uppercase hover:text-brass-lit"
            >
              {closeLabel}
            </button>

            <motion.figure
              key={open}
              className="relative max-h-[86vh] w-full max-w-5xl"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[3/2] w-full">
                <Image
                  src={items[open].src}
                  alt={items[open].caption}
                  fill
                  sizes="90vw"
                  className="object-contain"
                  priority
                />
              </div>
              <figcaption className="mt-5 flex items-center justify-between text-[0.6875rem] tracking-[0.2em] text-washi/60 uppercase">
                <button type="button" onClick={() => step(-1)} className="hover:text-brass-lit">
                  ← Prev
                </button>
                <span>{items[open].caption}</span>
                <button type="button" onClick={() => step(1)} className="hover:text-brass-lit">
                  Next →
                </button>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
