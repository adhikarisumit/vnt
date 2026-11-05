'use client';

import { useState } from 'react';
import Image from 'next/image';

/**
 * Main room photo with a thumbnail strip underneath (pattern from the estimate's
 * reference sites): clicking a thumbnail swaps the main photo.
 */
export function RoomGallery({ images, alt }: { images: string[]; alt: string }) {
  const [current, setCurrent] = useState(0);

  return (
    <div>
      <div className="relative aspect-4/3 w-full overflow-hidden">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className={`object-cover transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
            priority={false}
          />
        ))}
      </div>

      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-4 gap-3">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`${alt} ${i + 1}`}
                aria-current={i === current}
                className={`relative block aspect-4/3 w-full overflow-hidden transition-opacity duration-300 ${
                  i === current ? 'opacity-100 ring-1 ring-brass ring-offset-2 ring-offset-page-2' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Image src={src} alt="" fill sizes="12rem" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
