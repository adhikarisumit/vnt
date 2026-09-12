import { site } from '@/content/site';
import { getDictionary } from '@/content/dictionary';
import { localePath, type Locale } from '@/lib/i18n';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { ButtonLink } from '@/components/ui/ArrowLink';

/** Brass band used at the foot of every hotel, venue and hub page. */
export function GroupBookingCTA({ locale, body, title }: { locale: Locale; body?: string; title?: string }) {
  const dict = getDictionary(locale);

  return (
    <section className="relative overflow-hidden border-y border-brass/25 bg-page-2">
      <div className="grain absolute inset-0" />

      <div className="shell relative py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <Reveal>
              <p className="type-eyebrow">Group Reservations</p>
            </Reveal>

            <SplitText
              as="h2"
              text={title ?? dict.reservation.title}
              delay={0.06}
              className="type-display mt-5 text-[clamp(1.6rem,3.6vw,2.75rem)] text-ink"
            />

            {body && (
              <Reveal delay={0.16}>
                <p className="type-body mt-6 max-w-2xl">{body}</p>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.2} className="flex flex-col items-start gap-5 lg:items-end">
            <a
              href={`tel:${site.telGroup.replace(/-/g, '')}`}
              className="group flex items-baseline gap-4"
            >
              <span className="text-[0.6875rem] tracking-[0.24em] text-stone uppercase">
                {dict.common.groupDesk}
              </span>
              <span className="type-display text-[clamp(1.5rem,3.2vw,2.25rem)] text-brass transition-opacity duration-400 group-hover:opacity-75">
                {site.telGroup}
              </span>
            </a>

            <ButtonLink href={localePath(locale, '/reservation')} variant="brass">
              {dict.reservation.byForm}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
