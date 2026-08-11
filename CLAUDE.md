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

**Setup:** In the Sheet, one tab per language with columns `key`, `section`, `element`,
`text` (only `text` is read; `section`/`element` are for the client's own bookkeeping).
File → Share → Publish to web → CSV, per tab. Put those two URLs in
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
