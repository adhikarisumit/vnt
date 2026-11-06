import Image from 'next/image';

/**
 * Endless horizontal photo strip (the reference's ホテル内景色 / ホテル周辺景色
 * carousels), driven by a CSS keyframe so it needs no client script. The
 * list is doubled so the loop joins without a gap; `reverse` runs it the
 * other way for the second strip. `min-w-0` keeps the strip from widening
 * its grid column to the full track length.
 */
export function PhotoMarquee({ images, title, reverse }: { images: string[]; title: string; reverse?: boolean }) {
  const loop = [...images, ...images];
  return (
    <div className="w-full min-w-0">
      <p className="text-center text-[1rem] tracking-[0.08em] text-black">{title}</p>
      <div className="relative mt-4 w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <ul
          className="flex w-max gap-3 motion-reduce:animate-none"
          style={{ animation: `marquee ${Math.max(28, images.length * 9)}s linear infinite${reverse ? ' reverse' : ''}` }}
        >
          {loop.map((src, i) => (
            <li key={i} className="relative h-[8.5rem] w-[8.5rem] shrink-0 overflow-hidden rounded-md md:h-[9.5rem] md:w-[9.5rem]">
              <Image src={src} alt="" fill sizes="160px" className="object-cover" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
