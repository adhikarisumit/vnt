# VNT GROUP — corporate site

A rebuild of [vntgroup.co.jp](https://vntgroup.co.jp) (previously a STUDIO/Nuxt
no-code site) as a Next.js application: bilingual (JA/EN), animation-led, with a
multi-step group reservation flow and a general enquiry form.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000 -> redirects to /ja or /en
```

```bash
npm run build && npm start
```

Other scripts: `npm run typecheck`, `npm run lint`.

## Environment

Copy `.env.example` to `.env.local`. Forms work without any of it — the payload
is written to the server log instead of emailed, and the visitor still sees the
success state, so nothing breaks in preview environments.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Transactional email via [Resend](https://resend.com). Absent → log only. |
| `MAIL_FROM` | Verified sender on your Resend domain. |
| `MAIL_TO` | Where enquiries land. Comma-separate for several recipients. |

## Structure

```
src/
  app/
    [locale]/            root layout + every page (ja | en)
    api/                 contact + reservation handlers
    sitemap.ts robots.ts icon.svg
  components/
    layout/              header, fullscreen menu, footer, mobile action bar
    motion/              smooth scroll, reveals, split text, parallax, preloader, cursor
    forms/               field primitives, calendar, contact + reservation forms
    ui/                  buttons, headings, gallery + lightbox, map, video facade
    home/ company/       page-specific pieces
  content/               ALL copy and data (see below)
  lib/                   i18n helpers, zod schemas, mail, rate limiter
public/images/           photography, grouped by property
```

### Editing content

Every string on the site lives in `src/content/`, typed as `{ ja, en }` pairs —
no copy is hard-coded in a page.

| File | Holds |
| --- | --- |
| `site.ts` | Company details, navigation, footer columns |
| `dictionary.ts` | UI labels and section copy, per language |
| `hotels.ts` | The three Premium hotels: copy, gallery, rooms, map, OTA links |
| `dining.ts` | Geisha-tei and the two Warakutei venues |
| `business.ts` | Six business areas, HISANO, supplier call, Ikegami Store |
| `company.ts` | President's message, corporate facts, revenue, scope, licences |
| `news.ts` | Announcements — newest first |

Adding a hotel or venue means adding one entry to the relevant array; routes,
sitemap and navigation follow automatically.

## Notes on the build

- **Routing.** `src/app/[locale]` is the root layout, so every page is locale
  scoped. `src/middleware.ts` sends un-prefixed requests to `/ja` or `/en` based
  on `Accept-Language`. All legacy STUDIO URLs 308-redirect to their new
  equivalents (`next.config.ts`).
- **Brand mark.** The client's `VNT.svg` is kept verbatim at
  `public/images/brand/vnt-wordmark.svg` and inlined as
  `components/brand/Wordmark.tsx`, which paints with `currentColor` — brand red
  on paper, washi over photography. The favicon (`app/icon.svg`) is the three
  waves lifted from that same file, so header, footer, intro and tab icon all
  come from one source.
- **Palette.** The site reads light: warm washi paper (`--color-page`) with sumi
  ink text and a brass accent, all defined in `src/app/globals.css`. `ink` and
  `washi` keep their physical meaning throughout, so sections laid over
  photography go on using a dark ink scrim with washi text and the brighter
  `brass-lit` accent, while the rest of the page stays on paper.
- **Animation.** Lenis for inertial scrolling, Motion for reveals. Everything
  respects `prefers-reduced-motion`; the intro curtain plays once per session.
- **Japanese typography.** `splitForStagger` in `lib/utils.ts` splits per
  character for CJK and per word for Latin, keeping trailing punctuation
  attached so a line never opens with 、。」 (禁則処理).
- **Third parties.** Google Maps and YouTube sit behind click-to-load facades —
  no request leaves the page until a visitor asks for it.
- **Forms.** Validated with the same zod schema on both sides, plus a honeypot
  field and a per-IP sliding-window rate limit. The limiter is per-instance
  (`lib/rate-limit.ts`); swap in a shared store if the site is ever scaled
  across regions.
- **Images.** Source photography was pulled from the old site and re-encoded to
  WebP at ≤2400px (322 MB → 8 MB). `sharp` is a devDependency so production
  image optimisation uses it too.

## Deploying

Built for Vercel (`npm run build`, zero config). Any Node host works — the
middleware and the two API routes need a running server, so a fully static
export would mean moving the forms to an external endpoint.

Set the three mail variables in the host's environment before launch, and point
`site.url` in `src/content/site.ts` at the production domain if it changes.
