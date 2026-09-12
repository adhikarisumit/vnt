'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

export type PropertyCardProps = {
  href: string;
  image: string;
  name: string;
  sub?: string;
  meta?: string;
  stars?: number;
  index?: number;
  ratio?: string;
};

/** Tall image card with a slow zoom, used for hotels and dining venues. */
export function PropertyCard({
  href,
  image,
  name,
  sub,
  meta,
  stars,
  index = 0,
  ratio = 'aspect-[3/4]',
}: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={href} className="group block">
        <div className={`relative w-full overflow-hidden ${ratio}`}>
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/60 to-ink/5" />

          <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
            {meta && (
              <p className="text-[0.625rem] tracking-[0.26em] text-brass-lit uppercase">{meta}</p>
            )}
            <h3 className="type-display mt-2.5 text-[clamp(1.1rem,2vw,1.5rem)] text-washi">{name}</h3>
            {sub && <p className="type-mincho mt-2 line-clamp-2 text-[0.8125rem] whitespace-pre-line text-washi/65">{sub}</p>}

            {stars ? (
              <p aria-label={`${stars} star`} className="mt-3 text-[0.7rem] tracking-[0.3em] text-brass-lit">
                {'★'.repeat(stars)}
              </p>
            ) : null}
          </div>

          <span
            aria-hidden
            className="absolute right-6 bottom-6 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-brass-lit/70 text-brass-lit opacity-0 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100"
          >
            →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
