# La Bella Vita — Project Log

## Overview
Luxury wellness lifestyle one-pager for personal trainer Alessandro. Built by DunajMedia.
NOT a fitness/gym brand — a lifestyle brand. Visitor should think "this is how I want to live."
Client language: Slovak. All copy in SK is client-final. EN is a faithful translation.

## Stack
Next.js 14 App Router · TypeScript · Tailwind CSS · Framer Motion · custom i18n (`lib/i18n.tsx`, SK default / EN toggle).
Fonts: Playfair Display + Cormorant Garamond (headings), Inter (body).
Repo: github.com/Ademsems/la-bella-vita (branch: master). Hosted on Vercel.

## Brand Palette
| Token | Hex | Use |
|---|---|---|
| turquoise | `#4BC6C8` | Primary — CTAs, icons, highlights |
| med-blue | `#7ED6E0` | Primary — gradients alongside turquoise |
| white | `#FFFFFF` | Backgrounds |
| powder-pink | `#F4D7D0` | Secondary — warm accents |
| champagne | `#F5EFE6` | Secondary — section backgrounds |
| beige | `#EDE4D8` | Secondary — card backgrounds |
| gold | `#C6A769` | Accent ONLY — thin underlines, borders, hover glints |

Design language: Four Seasons × Apple × Amalfi Coast. Morning light, sea, community, movement. **Never gym, never fitness-stock, never bodybuilders.**

## History
- **v1** (Initial build): 10-section one-pager — carousel hero, about, gallery, how-I-work, food collab, financing, testimonials, community, contact. Delivered + pushed to GitHub.
- **v2** (Luxury rebrand): Client sent visual/creative brief. New palette, video hero with gradient fallback, graceful degradation for all assets, `lib/config.ts` as single source of truth. 12 sections + 2 CTA bands. Added Playfair Display, Four Pillars, Transformations, Corporate Wellbeing, Instagram Feed.
- **v3** (Final client copy + new sections): Client sent final Slovak copy. Added: What-is-LBV, Personal Coaching, Online Coaching (Trainerize). Food Collaboration → EasyDiet. Diagnostics branding → Visbody. Optional Testimonials section. Final CTA = client's marked "Variant 1". Dropped generic How-I-Work (absorbed into coaching sections). CLAUDE.md added.
- **v3.1** (Real images + meta title): Client's 8 photos wired into their sections with `next/image`, graceful gradient fallback preserved via `onError` state per component. Files renamed to URL-safe slugs (see Image Assets below). Meta title updated to "LBV - Umenie žiť krásny život" (SK default, static metadata — see note in `app/layout.tsx`).
- **v3.2** (Sheet-driven content layer): All body copy (paragraphs, list items, card text — NOT nav/footer/headings/images) can now be edited live from a published Google Sheet CSV, one tab per language, with the `messages/*.json` values as the always-available offline fallback. See "Sheet-Driven Content" below.
- **v3.3** (CSV header-matching bug fix): Sheet overrides were silently never applying — see "Known Bugs & Fixes" below.
- **v4** (Luxury motion pass — NOT yet committed/pushed, local review only): Ambient
  cursor spotlight, film grain, glassmorphism, 3D pointer-tilt cards, metallic CTA sheen,
  scroll-driven stat counters, Visbody/Transformations HUD hotspots, and a reversible
  display/heading font toggle (Athelas/Vanguard, currently falling back to Playfair/
  Cormorant since no font files are placed yet). See "Luxury Motion Pass (v4)" below.

## Section Order (v3)
0. Navbar
1. Hero (video + gradient fallback, full client copy)
2. What is La Bella Vita
3. Quote Band (Schopenhauer, gold underline)
4. Four Pillars (Movimento / Nutrizione / Comunità / Mentalità)
5. My Story (About Alessandro — personal, handle with care)
6. Personal Coaching
7. Online Coaching (Trainerize)
8. Transformations (Visbody)
[CTA Band — between 8 and 9]
9. Food Collaboration (EasyDiet)
10. Financing Program
11. La Bella Vita Community (masonry + filter chips)
12. Corporate Wellbeing
[CTA Band — between 12 and 13]
13. Instagram Feed (graceful token-less fallback)
14. Testimonials (OPTIONAL — isolated, can be deleted in one step)
15. Final CTA (Variant 1 — client's favorite)
16. Contact (form + Maps)
Footer

## External Config (`lib/config.ts`) — all empty by default
| Constant | Env var (Vercel) |
|---|---|
| `HERO_VIDEO_URL` | `NEXT_PUBLIC_HERO_VIDEO_URL` |
| `INSTAGRAM_TOKEN` | `NEXT_PUBLIC_INSTAGRAM_TOKEN` |
| `INSTAGRAM_USERNAME` | `NEXT_PUBLIC_INSTAGRAM_USERNAME` |
| `GOOGLE_MAPS_EMBED_URL` | `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL` |
| `GOOGLE_PLACE_ID` | `NEXT_PUBLIC_GOOGLE_PLACE_ID` |
| `EASYDIET_URL` | `NEXT_PUBLIC_EASYDIET_URL` |
| `TRAINERIZE_URL` | `NEXT_PUBLIC_TRAINERIZE_URL` |
| `SHEET_CSV_URL_SK` | `NEXT_PUBLIC_SHEET_CSV_URL_SK` |
| `SHEET_CSV_URL_EN` | `NEXT_PUBLIC_SHEET_CSV_URL_EN` |

## Sheet-Driven Content (v3.2)
Body copy — paragraphs, list items, chip labels, card text — is editable live from a
published Google Sheet, without a redeploy. **Nav links, footer, section H2s, uppercase
eyebrow labels, the four Pillar names (Movimento/Nutrizione/Comunità/Mentalità), community
filter chips, the hero wordmark, meta title, and all images stay hardcoded in code —
they are never sheet-driven.**

**Priority order:** Google Sheet CSV (runtime) → `messages/*.json` flat keys (build-time
fallback) → the key itself (should never surface — every canonical key has a fallback).
A bad, empty, or unreachable sheet can never break the page.

**Setup:** In the Sheet, one tab per language with a key column and a text column (plus
any number of reference-only columns in between — see "Known Bugs & Fixes" for why the
parser doesn't care about their exact names). The published sheet's real headers are
editor-facing labels: `key (do not edit)`, `Section`, `What is this text?`,
`TEXT — EDIT HERE (SK)` (or `(EN)` on the English tab) — only the key and text columns
are read. File → Share → Publish to web → CSV, per tab. Put those two URLs in
`NEXT_PUBLIC_SHEET_CSV_URL_SK` / `_EN` in Vercel. Leave empty to run purely on the JSON
fallback.

**How it's wired:**
- `lib/content.ts` — `parseCsv()` (dependency-free, RFC 4180 quoted-field parser),
  `fetchContent(url)` (fetches + builds a `{key: text}` map, returns `{}` on *any* failure
  — bad URL, network error, empty body, malformed row), `getContent(sheet, fallback)`
  (sheet wins per-key only when non-empty, otherwise fallback is kept).
- `app/page.tsx` (`Home`, now an async server component) fetches both language CSVs
  server-side, merges each against its JSON fallback, and passes `contentSk`/`contentEn`
  into `<I18nProvider>`. The CSV URLs are read and used only on the server — they never
  reach the browser.
- `lib/i18n.tsx` — `I18nProvider` now accepts `contentSk`/`contentEn` props; the SK/EN
  toggle switches between the two merged maps client-side with zero network calls and no
  reload. New `useContent()` hook returns `c(key)` for canonical sheet-driven keys,
  alongside the existing `useT(namespace)` for locked/nested strings.
- **Canonical keys** are the flat, top-level string values in `messages/sk.json` /
  `messages/en.json` (e.g. `hero_subheadline`, `coaching_item_3`, `finalcta_line_2`).
  Everything else in those files is a nested object (`nav`, `footer`, `hero.headline`,
  `pillars.tag`, `pillars.items[].italian/title`, etc.) and stays locked — read via
  `useT()`, never sheet-driven. `app/page.tsx`'s `extractFallback()` picks only the
  top-level string entries to build the fallback map, so locked/nested groups never leak
  into the sheet-driven layer.
- **NUTRIZIONE pillar exception:** the canonical list only allows 3 body keys
  (`pillar_nutrition_body_1..3`) for what used to be 5 pieces (2 paragraphs + an inline
  "EasyDiet" link + 2 more fragments). `pillar_nutrition_body_2` is now one natural
  sentence that mentions "EasyDiet" inline; `FourPillarsSection.tsx` finds that substring
  at render time and wraps it in a link to `EASYDIET_URL` (or a plain bold span if unset).
  Content editors just write a normal sentence — no manual link markup needed.
- **New canonical keys with no prior equivalent:** `corporate_overlay` (the dark-card
  headline, was hardcoded English-only) and `corporate_stat_1..3_num/label` (the 3 stat
  tiles, were hardcoded in the component). Both now have SK + EN fallback values and are
  sheet-editable like everything else in that section.

### Known Bugs & Fixes
- **v3.3 — CSV headers never matched, overrides silently no-op'd.** The v3.2 parser in
  `lib/content.ts` matched columns by *exact* header name (`row.key`, `row.text`). The
  real published Sheet's headers are editor-facing labels — `key (do not edit)`,
  `TEXT — EDIT HERE (SK)` / `(EN)` — so the exact match never hit, `fetchContent()`
  silently returned `{}` every time (by design, per the "never break the page" contract),
  and the site always rendered the JSON fallback with zero errors anywhere. Nothing
  looked broken; nothing ever changed when the sheet was edited.
  **Fix:** `parseCsv()` now returns `{ headers, rows }`; a `findColumn()` helper matches
  the key/text columns by **case-insensitive prefix** (`startsWith("key")` /
  `startsWith("text")`) instead of exact name, so `key (do not edit)` and
  `TEXT — EDIT HERE (SK)`/`(EN)` both resolve correctly regardless of annotation text or
  language suffix. Reference-only columns (`Section`, `What is this text?`) are still
  ignored — neither starts with `key` or `text`.
  **Lesson for future column renames:** the parser is now resilient to *cosmetic*
  header changes (extra words, punctuation, per-language suffixes) as long as the header
  still *starts with* `key` or `text`. A rename to something that doesn't start with
  either word (e.g. "Content" instead of "Text — ...") would still silently break it —
  if sheet edits ever stop showing up on the site again, check the actual CSV headers
  first (`curl` the published CSV URL) before assuming it's a caching or fetch issue.

## Luxury Motion Pass (v4)

Ambient, motion-heavy visual layer added on top of the existing brand palette and
graceful-degradation rules. Nothing here changes copy, images, or the sheet-driven
content layer — purely presentational.

**New shared components (`components/ui/`):**
- `TiltCard.tsx` — pointer-driven 3D tilt (`rotateX`/`rotateY` + `scale: 1.02`) via
  framer-motion `useMotionValue`/`useSpring`. Wraps a card's *visual* content; keep the
  existing scroll-entrance `motion.div` (`whileInView`) as the outer wrapper and put
  `TiltCard` inside it — entrance and tilt compose independently. Applied to: Four
  Pillars cards, Personal/Online Coaching visuals, Transformations cards, Corporate
  Wellbeing's dark visual card.
- `Counter.tsx` — scroll-triggered count-up. Parses the first numeric run out of a
  sheet-driven string (`"50+"`, `"98%"`) and animates just that span, leaving prefix/
  suffix text untouched; values with no digits render statically. Applied to Corporate
  Wellbeing's 3 stat tiles. (Transformations has no numeric stat content yet — the
  component is ready to reuse there the moment a `transform_stat_*` key exists.)
- `HudHotspot.tsx` — pulsing gold dot, expands into a `.glass-luxury` detail card on
  hover/tap. Applied over each Transformations/Visbody card photo, showing that card's
  own name/story (no new content keys needed).
- `GlobalEffects.tsx` — mounted once in `app/layout.tsx`, renders the fixed film-grain
  overlay only. Purely decorative and `pointer-events: none`, so it can never block
  interaction or break a page that fails to load it.

**New CSS utilities (`app/globals.css`):**
- `.glass-luxury` — frosted glass card (`backdrop-blur` + translucent white + soft
  turquoise shadow). Used for Corporate stat tiles, Personal Coaching's "included" box,
  Online Coaching's feature pills, and `HudHotspot`'s popover.
- `.border-beam` — gold→turquoise gradient border sweep on hover, paired with
  `.glass-luxury`/`TiltCard` cards via `border-beam` in the className.
- `.text-metallic` — animated gold/turquoise clipped-gradient text, used on the
  Corporate stat numbers.
- `.btn-sheen` (pair with `hover:scale-105`) — metallic sheen sweep on primary CTAs
  (Hero, both CTA bands, Corporate, Personal/Online Coaching buttons).
- `.tilt-perspective` — CSS `perspective` for `TiltCard`.
- `.grain-overlay` — fixed, `pointer-events: none`, inline-SVG noise texture at low
  opacity + `mix-blend-mode: overlay`.
- Hero section also got its own ambient cursor-tracking radial glow (inline in
  `HeroSection.tsx`, via framer-motion `useMotionValue`/`useSpring` on `left`/`top` —
  not the same as `.grain-overlay`, which is the separate always-on grain texture).

**Display/heading font toggle (Athelas / Vanguard) — reversible in one line:**
- `messages`/components still use the same `font-display` / `font-heading` Tailwind
  classes (renamed from `font-playfair` / `font-cormorant` across every component —
  the old `font-playfair`/`font-cormorant` classes still exist in `globals.css` and
  `tailwind.config.ts` for reference/rollback, just unused now).
- `app/globals.css` declares `--font-display` / `--font-heading` as
  `'Athelas'/'Vanguard', var(--font-playfair)/var(--font-cormorant), serif` — i.e.
  Athelas/Vanguard first, falling back to the existing Google fonts, then generic serif.
- Athelas and Vanguard are **not implemented via `next/font/local`** on purpose: that
  API throws a build error if the referenced file is missing, which would violate the
  "must not break the build if font files aren't placed" requirement. Instead they're
  declared as plain `@font-face` rules pointing at `public/fonts/Athelas-Regular.woff2`
  / `public/fonts/Vanguard-Regular.woff2` (not present yet) — a missing file just 404s
  silently and the browser keeps rendering the fallback font. **To activate the real
  faces:** drop licensed `.woff2` files at those two exact paths; nothing else changes.
  **To roll back to Playfair Display / Cormorant Garamond only:** in `app/globals.css`,
  change the two `--font-display`/`--font-heading` lines to
  `var(--font-playfair), serif` / `var(--font-cormorant), serif` — one line each, no
  component edits required.

**Verification performed (local only — not committed/pushed per this session's request):**
- `npm run build` and `npm run lint` — see session output for pass/fail.
- Dev server left running for manual browser review before any commit.

## Image Assets (`public/images/`)
Client-supplied photos, renamed from their original Slovak filenames (which had spaces/commas/diacritics — unsafe in URLs) to slugs. Original name → new path → wired into:

| Original filename | New path | Component |
|---|---|---|
| `1. Pohyb.jpg` | `/images/01-pohyb.jpg` | `FourPillarsSection.tsx` — MOVIMENTO card |
| `2. Výživa.jpg` | `/images/02-vyziva.jpg` | `FourPillarsSection.tsx` — NUTRIZIONE card |
| `3. Komunita.jpg` | `/images/03-komunita.jpg` | `FourPillarsSection.tsx` — COMUNITÀ card |
| `4. Nastavenie mysle.jpg` | `/images/04-nastavenie-mysle.jpg` | `FourPillarsSection.tsx` — MENTALITÀ card |
| `5. Môj príbeh.jpg` | `/images/05-moj-pribeh.jpg` | `MyStorySection.tsx` — portrait |
| `6. Individuálny prístup.jpg` | `/images/06-individualny-pristup.jpg` | `PersonalCoachingSection.tsx` — visual |
| `7. Trainerize.jpg` | `/images/07-trainerize.jpg` | `OnlineCoachingSection.tsx` — visual |
| `8. Jedlo ako radosť, nie ako trest.jpg` | `/images/08-jedlo-ako-radost.jpg` | `FoodEasyDietSection.tsx` — visual |

All 8 use `next/image` with `fill` + `onError` — if a file is ever deleted/renamed, the component falls back to its original gradient placeholder (icon + label), never a broken-image icon. Sections with no client photo yet (Transformations, Community gallery, Corporate Wellbeing, Final CTA band) are untouched and still use gradient-only placeholders.

## Graceful Degradation Rules
- Missing image → styled gradient placeholder div, **never** a broken-image icon
- Missing hero video → full-viewport gradient fallback, identical layout
- Missing Instagram token → 6 shimmer tiles + follow label, zero crash
- Missing Google Maps URL → styled pin-icon placeholder div
- Missing GOOGLE_PLACE_ID → skip live fetch, show placeholder review cards
- Missing EASYDIET_URL / TRAINERIZE_URL → button rendered disabled, no crash

## i18n Notes
- `lib/i18n.tsx` — custom React context, no next-intl plugin (removed — compat issues with Next 14 on Windows)
- `useT("section")` → namespaced `t(key)` and `tRaw(key)` (returns raw JSON for arrays)
- Webpack alias `@/` → project root — added manually in `next.config.mjs` (Windows path fix)
- Locale stored in cookie `locale`; toggles instantly without page reload

## Rules for Future Sessions
1. Run `npm run build` before committing — must pass with zero errors.
2. Never hardcode external URLs. Always use `lib/config.ts`.
3. All visible text must come from `messages/sk.json` / `messages/en.json` — nothing hardcoded in components.
4. SK is the source language (client-final). EN is derived.
5. Update this file at the end of every session.
