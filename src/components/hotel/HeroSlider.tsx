'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

/**
 * Full-bleed photo slideshow, as the reference hotel site opens: three
 * photos cross-fading every few seconds, thin arrows left and right, the
 * hotel name centred over the picture and a round "scroll" button sitting
 * on the lower edge.
 */
export function HeroSlider({
  images,
  title,
  stars,
  tagline,
  nextId,
}: {
  images: string[];
  title: string;
  stars: number;
  tagline?: string;
  /** Section the round scroll button leads to. */
  nextId: string;
}) {
  const [index, setIndex] = useState(0);
  const count = images.length;

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + count) % count), [count]);

  useEffect(() => {
    if (count < 2) return;
    const id = window.setInterval(() => go(1), 5500);
    return () => window.clearInterval(id);
  }, [count, go, index]);

  return (
    <section className="relative z-10 h-[70vh] min-h-[26rem] w-full bg-black md:h-[clamp(34rem,56vw,52rem)]">
      <div className="absolute inset-0 overflow-hidden">
      {images.map((src, i) => (
        <div
          key={src + i}
          aria-hidden={i !== index}
          className={cn('absolute inset-0 transition-opacity duration-[1400ms] ease-in-out', i === index ? 'opacity-100' : 'opacity-0')}
        >
          <Image src={src} alt="" fill priority={i === 0} sizes="100vw" className="object-cover" />
        </div>
      ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/5 to-black/30 md:from-black/15 md:to-black/15" />
      </div>

      {/* Hotel name over the photo, as the reference's centred logo. */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.45)]">
        <h1 className="font-[family-name:var(--font-tenor)] text-[clamp(1.6rem,3.6vw,3rem)] leading-tight tracking-[0.2em]">{title}</h1>
        <p className="mt-2 text-[1rem] tracking-[0.3em] text-star md:text-[1.25rem]">{'★'.repeat(stars)}</p>
        {tagline && <p className="mt-5 text-[clamp(0.9rem,1.3vw,1.15rem)] tracking-[0.12em] whitespace-pre-line">{tagline}</p>}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="前の写真"
            className="absolute top-1/2 left-4 -translate-y-1/2 p-3 text-white/85 transition-opacity hover:opacity-60 md:left-8"
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="次の写真"
            className="absolute top-1/2 right-4 -translate-y-1/2 p-3 text-white/85 transition-opacity hover:opacity-60 md:right-8"
          >
            <Chevron dir="right" />
          </button>
          <ul className="absolute bottom-16 left-1/2 flex -translate-x-1/2 gap-2.5 md:bottom-20">
            {images.map((_, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`写真 ${i + 1}`}
                  aria-current={i === index}
                  className={cn('block size-2 rounded-full transition-colors', i === index ? 'bg-white' : 'bg-white/40 hover:bg-white/70')}
                />
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Round scroll button on the lower edge of the photo. */}
      <a
        href={`#${nextId}`}
        aria-label="下へスクロール"
        className="absolute bottom-0 left-1/2 z-20 flex size-12 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border border-black/20 bg-white text-black shadow-[0_6px_18px_rgba(0,0,0,0.12)] transition-transform hover:translate-y-[55%]"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="22" height="40" viewBox="0 0 22 40" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      {dir === 'left' ? <path d="M18 2L4 20l14 18" /> : <path d="M4 2l14 18L4 38" />}
    </svg>
  );
}
