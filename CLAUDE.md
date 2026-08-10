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
