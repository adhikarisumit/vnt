import Link from 'next/link';

export default function LocaleNotFound() {
  return (
    <section className="flex min-h-[70vh] items-center">
      <div className="shell text-center">
        <p className="type-display text-[clamp(4rem,16vw,11rem)] leading-none text-ink/10">404</p>
        <h1 className="type-display -mt-8 text-[clamp(1.25rem,3vw,2rem)] text-ink">
          Page not found
        </h1>
        <p className="type-body mx-auto mt-5 max-w-md">
          お探しのページは移動または削除された可能性があります。
          <br />
          The page you were looking for may have moved or been removed.
        </p>
        <Link
          href="/ja"
          className="mt-10 inline-block border border-brass/60 px-9 py-4 text-[0.6875rem] tracking-[0.22em] text-brass uppercase transition-colors duration-400 hover:bg-brass hover:text-page"
        >
          Back to top
        </Link>
      </div>
    </section>
  );
}
