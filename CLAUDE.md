# La Bella Vita — Project Log

## Overview
Luxury wellness lifestyle one-pager for personal trainer Alessandro. Built by DunajMedia.
NOT a fitness/gym brand — a lifestyle brand. Visitor should think "this is how I want to live."
Client language: Slovak. All copy in SK is client-final. EN is a faithful translation.

## Stack
Next.js 14 App Router · TypeScript · Tailwind CSS · Framer Motion · custom i18n (`lib/i18n.tsx`, SK default / EN toggle).
Fonts: **Oswald** (headings) + **Google Sans** (body), self-hosted via `next/font/local` (see "Typography (v5)").
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
| amber | `#F59E0B` (`amber`), hover `#D97706` (`amber-dark`) | **Action accent (v5)** — every primary CTA button, hero keyword highlight, focus badges, review stars. Use dark text (`text-gray-900`) on it — white fails contrast |

Design language: Four Seasons × Apple × Amalfi Coast. Morning light, sea, community, movement. **Never gym, never fitness-stock, never bodybuilders.**

## History
- **v1** (Initial build): 10-section one-pager — carousel hero, about, gallery, how-I-work, food collab, financing, testimonials, community, contact. Delivered + pushed to GitHub.
- **v2** (Luxury rebrand): Client sent visual/creative brief. New palette, video hero with gradient fallback, graceful degradation for all assets, `lib/config.ts` as single source of truth. 12 sections + 2 CTA bands. Added Playfair Display, Four Pillars, Transformations, Corporate Wellbeing, Instagram Feed.
- **v3** (Final client copy + new sections): Client sent final Slovak copy. Added: What-is-LBV, Personal Coaching, Online Coaching (Trainerize). Food Collaboration → EasyDiet. Diagnostics branding → Visbody. Optional Testimonials section. Final CTA = client's marked "Variant 1". Dropped generic How-I-Work (absorbed into coaching sections). CLAUDE.md added.
- **v3.1** (Real images + meta title): Client's 8 photos wired into their sections with `next/image`, graceful gradient fallback preserved via `onError` state per component. Files renamed to URL-safe slugs (see Image Assets below). Meta title updated to "LBV - Umenie žiť krásny život" (SK default, static metadata — see note in `app/layout.tsx`).
- **v3.2** (Sheet-driven content layer): All body copy (paragraphs, list items, card text — NOT nav/footer/headings/images) can now be edited live from a published Google Sheet CSV, one tab per language, with the `messages/*.json` values as the always-available offline fallback. See "Sheet-Driven Content" below.
- **v3.3** (CSV header-matching bug fix): Sheet overrides were silently never applying — see "Known Bugs & Fixes" below.
- **v4** (Luxury motion pass — shipped, commit 972d4ce): Ambient
  cursor spotlight, film grain, glassmorphism, 3D pointer-tilt cards, metallic CTA sheen,
  scroll-driven stat counters, Visbody/Transformations HUD hotspots, and a reversible
  display/heading font toggle (Athelas/Vanguard, currently falling back to Playfair/
  Cormorant since no font files are placed yet). See "Luxury Motion Pass (v4)" below.
- **v4.1** (Framing + Community lightbox + WhatsApp lead magnet): taller portrait photo
  containers with top-biased focal points (no more cropped heads), real photos in the
  Community grid with a floating luxury lightbox, and the contact form rebuilt as a
  WhatsApp lead magnet that also emails the lead via Resend. See "Image Framing",
  "Community Gallery & Lightbox" and "WhatsApp Lead Magnet" below.
- **v5** (Typography + amber + Braňo + Maps/reviews): Oswald/Google Sans fonts, amber CTA accent, 4-keyword hero badge, text-contrast scrims, Lucide nutrition icon, Braňo's real transformation photos with Tony/British-ambassador slots, Google Maps embed + clickable review cards. See "Typography (v5)", "Amber accent (v5)", "Transformations (v5)", "Google Maps & Reviews (v5)".
- **v5.1** (Fixes after v5): Online Coaching nutrition icon → Lucide `Salad`; Braňo wired with Before/After badges (named `transform_brano_*` keys); real Google reviews + Places API sync (`lib/reviews.ts`); Quote band and the cta2 "Váš najlepší rok…" band removed; contact subtitle reworded; untracked scratch files git-ignored. See sections below.
- **v5.2** (Live Instagram feed): `lib/instagram.ts` server fetcher (ISR 1 h) + hover-overlay tiles, placeholders on any failure. See "Instagram Feed (v5.2)".
- **v4.2** (Community gallery from real photos): all placeholder tiles replaced by 21 real photos
  (new restaurant-evening shoot + the gym-coaching shots), URL-safe web-sized copies, filter chips
  that hide when empty, "show more" reveal, and the lightbox restyled (frosted frame, gold/turquoise
  arrows, beam-ring dock, neighbour preloading). Camera originals are git-ignored.

## Section Order (v3, updated v5.1 — Quote band and the "best year" CTA band removed)
0. Navbar
1. Hero (video + gradient fallback, full client copy)
2. What is La Bella Vita
3. Four Pillars (Movimento / Nutrizione / Comunità / Mentalità)
4. My Story (About Alessandro — personal, handle with care)
5. Personal Coaching
6. Online Coaching (Trainerize)
7. Transformations (Visbody)
[CTA Band "cta1" — between 7 and 8]
8. Food Collaboration (EasyDiet)
9. Financing Program
10. La Bella Vita Community (masonry + filter chips)
11. Corporate Wellbeing
12. Instagram Feed (graceful token-less fallback)
13. Google Reviews / Testimonials (OPTIONAL — isolated, can be deleted in one step)
14. Final CTA (Variant 1 — client's favorite)
15. Contact (form + Maps)
Footer

## External Config (`lib/config.ts`) — all empty by default
| Constant | Env var (Vercel) |
|---|---|
| `HERO_VIDEO_URL` | `NEXT_PUBLIC_HERO_VIDEO_URL` |
| `INSTAGRAM_ACCESS_TOKEN` | `INSTAGRAM_ACCESS_TOKEN` — **server-only** (replaced the old `NEXT_PUBLIC_INSTAGRAM_TOKEN`, which would have shipped the token to every visitor's browser) |
| `INSTAGRAM_USER_ID` | `INSTAGRAM_USER_ID` — server-only; only needed when the token starts with `EAA` (Facebook-platform token) |
| `INSTAGRAM_USERNAME` | `NEXT_PUBLIC_INSTAGRAM_USERNAME` (defaults to `trainer_aless`; public, used for the follow link) |
| `GOOGLE_MAPS_EMBED_URL` | `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL` (defaults to a keyless `google.com/maps?q=…&ll=48.1403914,17.1236786&output=embed` of the same place) |
| `GOOGLE_PLACE_ID` | `NEXT_PUBLIC_GOOGLE_PLACE_ID` (the `ChIJ…` Place ID; enables live reviews together with the key below) |
| `GOOGLE_MAPS_API_KEY` | `GOOGLE_MAPS_API_KEY` — **server-only**, Places API (New) key, restrict it to that API |
| `EASYDIET_URL` | `NEXT_PUBLIC_EASYDIET_URL` |
| `TRAINERIZE_URL` | `NEXT_PUBLIC_TRAINERIZE_URL` |
| `SHEET_CSV_URL_SK` | `NEXT_PUBLIC_SHEET_CSV_URL_SK` |
| `SHEET_CSV_URL_EN` | `NEXT_PUBLIC_SHEET_CSV_URL_EN` |
| `GOOGLE_MAPS_URL` | `NEXT_PUBLIC_GOOGLE_MAPS_URL` (defaults to `https://maps.app.goo.gl/fCf8456QEMdTwamy8` — the "Alessandro Kabát" listing) |
| `WHATSAPP_NUMBER` | `NEXT_PUBLIC_WHATSAPP_NUMBER` (defaults to `421948120052`, digits only, no `+`) |
| `RESEND_API_KEY` | `RESEND_API_KEY` — **server-only**, no `NEXT_PUBLIC_` prefix |
| `CONTACT_TO_EMAIL` | `CONTACT_TO_EMAIL` — server-only, inbox that receives leads |
| `CONTACT_FROM_EMAIL` | `CONTACT_FROM_EMAIL` — server-only, sender on a Resend-verified domain (default `La Bella Vita <onboarding@resend.dev>` only delivers to the Resend account owner) |

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

**Fonts:** the v4 Athelas/Vanguard toggle was removed in v5 — see "Typography (v5)".

**Verification:** `npm run build` and `npm run lint` clean; shipped in commit 972d4ce.

## Image Framing (v4.1)
Every client photo is **portrait** (aspect 0.56–0.67), so the old `aspect-square` / `aspect-[3/4]`
containers cropped heads off. Containers are now taller and every `next/image` uses
`object-cover object-[center_top]` so the crop only ever trims the bottom:
- Personal Coaching, Online Coaching, Food/EasyDiet visuals: `aspect-square` → `aspect-[3/4]`
- My Story portrait: `aspect-[3/4]` → `aspect-[2/3]`
- Four Pillars cards: `min-h-[420px]` → `min-h-[520px] sm:min-h-[560px]`
Rule for new photos: never put a portrait photo in a square/landscape box with default
centering — use a portrait container + `object-[center_top]` (or a ~30% focal point for
full-body gym shots where heads sit 30–40% down the frame, as in the Community grid).

## Community Gallery & Lightbox (v4.1 → v4.2)
**Gallery (`CommunitySection.tsx`)** — a `PHOTOS` registry of **21 real photos**; the old
"Fotografia čoskoro" placeholder tiles are gone (the same gradient + icon now only appears as the
`onError` fallback if a file fails to load). Grid is `grid-cols-2 md:grid-cols-3`, tiles
`aspect-[3/4]` + `object-[center_15%]` (heads in these photos sit 12–45% down the frame; 15%
only trims the top ~4%). First 9 show; a "Zobraziť viac fotografií (+N)" / "Zobraziť menej" button
reveals the rest (`INITIAL_VISIBLE`). The lightbox always cycles **every** photo in the active
filter, revealed or not. Filter chips are the locked list from `messages/*.json`, but a chip is
only rendered when at least one photo has that category (currently Všetko · Beh · Workshop ·
Komunita; Volejbal / Raňajky / More reappear automatically the day a photo is tagged with them).

**Registered assets (`public/images/`) — all URL-safe, web-sized:**
| File | Source | Category |
|---|---|---|
| `03-komunita.jpg` | existing (also the Comunità pillar photo) | Komunita |
| `community-ak-04/06/09.jpg` | renamed from `Aless&Kika-04/06/09.jpg` | Workshop (gym coaching) |
| `community-ak-13.jpg` | renamed from `Aless&Kika-13.jpg` | Beh |
| `community-lbv-013 … 046.jpg` (16 files: 013 016 018 019 021 022 024 026 027 028 029 035 039 042 045 046) | web copies of camera originals `Zaži LBV-NNN.jpg` (restaurant dinner / quiz evening) | Komunita |

**How to add community photos:** export a web-sized JPG (**≈1800 px wide, sRGB, quality ~80,
≤ ~0.7 MB**, no EXIF) with a **URL-safe name** (lowercase, no spaces, no `&`, no diacritics) into
`public/images/`, then add one line to `PHOTOS` (the `lbv()` / `ak()` helpers build the path and
ratio; plain objects work too). Order in `PHOTOS` = grid reading order = lightbox order.
**Never put camera originals in the repo.** The 16 originals (`Zaži LBV-NNN.jpg`, 20–33 MB each,
~440 MB, 3944×7008, name has a space and a decomposed "ž") sit untracked in `public/images/` and are
blocked by `.gitignore` (`/public/images/Za*LBV-*.jpg`). The web copies were produced with Pillow:
EXIF-orient → convert to sRGB → Lanczos resize to 1800 px wide → JPEG q80 progressive, metadata
stripped. (Unreferenced `public/Aless&Kika-01…16.jpg` duplicates also exist untracked at the
`public/` root — not wired, not committed.) `next/image` encodes odd filenames, but slugs avoid
the whole class of problem — the old `&` names were renamed for that reason.

**Lightbox (`components/ui/Lightbox.tsx`)** — full-screen floating viewer:
- Frame: `backdrop-blur-2xl bg-white/10 border border-white/20 shadow-[0_25px_50px_-12px_rgba(75,198,200,0.25)]`
  (+ `ring-gold/30`) over a blurred dark backdrop; sized from each photo's `ratio`
  (`min(88vw, 70vh × ratio)`) so nothing is cropped.
- Transitions: Framer Motion `opacity` + `scale` (`AnimatePresence mode="wait"`).
- Controls: delicate gold-bordered, turquoise-glow arrow buttons (and close button); counter "n / N".
  Touch/mouse **swipe** (`drag="x"`, snap-back, distance 70 px or velocity 450 triggers prev/next);
  **keyboard** `←` `→` navigate, `Esc` closes; click on the backdrop closes; page scroll locked while
  open; focus moves into the dialog and is restored on close.
- **Dock** (bottom): 3 tiles — previous · **active** · next (cyclic). The active tile has the
  always-on `.beam-ring` (animated gold↔turquoise ring + glow, `globals.css`); clicking a tile
  jumps to that photo. The ring is drawn outside the button, so image clipping lives on an inner
  `<span>` — don't put `overflow-hidden` on the button itself.
- **Preloading:** the previous/next photos are rendered hidden (`sr-only`, `loading="eager"`) with the
  *same* `sizes` string as the stage image (`STAGE_SIZES`), so the browser fetches the identical
  optimized URL and navigation is instant. Keep the two `sizes` values in sync.
- Rendered through a **portal into `<body>`** — every `<section>` has `will-change: transform`
  in `globals.css`, which makes a `position: fixed` child position relative to the section,
  not the screen. Don't remove the portal.
- Graceful degradation: grid tiles, the stage image and the dock thumbnails each have `onError`
  → brand-gradient fallback, never a broken-image icon.
- UI labels (close/prev/next/open, show more/less) are locked nested strings under `community.*`
  in `messages/*.json` — not sheet-driven.
- Dev-only quirk: locally there's no `sharp`, so `next/image` uses the slow WASM optimizer and the
  first view of each photo is slow (gradient shows meanwhile). On Vercel it's fast.

## Typography (v5)
- **Oswald** = headings, **Google Sans** = body. Both are SIL OFL (free to self-host). Source files the
  client dropped in `public/fonts/oswald/` and `public/fonts/Google Sans/` are **git-ignored** (full TTF
  sets, ~7 MB, would be served publicly). What ships are Latin + Latin-Extended **woff2 subsets** of the
  variable fonts in `app/fonts/`: `Oswald-Variable.woff2` (35 KB, wght 200–700), `GoogleSans-Variable.woff2`
  (107 KB) and `GoogleSans-Italic-Variable.woff2` (112 KB), wght 400–700. Slovak diacritics (č š ž ď ľ ť ň ô ä ŕ ĺ) verified present.
  Regenerate with `python -m fontTools.subset <ttf→woff2> --unicodes="U+0020-007E,U+00A0-024F,U+2010-2027,…" --flavor=woff2`.
- `app/layout.tsx` loads them with `next/font/local` → CSS vars `--font-oswald`, `--font-google-sans` (with
  `Arial Narrow`/`system-ui`/`sans-serif` fallbacks) on `<html>`. Playfair, Cormorant, Inter, Athelas, Vanguard and the Adobe Fonts
  kit (`NEXT_PUBLIC_ADOBE_FONTS_KIT_ID`) were **removed**. A missing woff2 now fails the build (by design — the files are committed).
- `tailwind.config.ts`: `font-heading` / `font-display` / `font-oswald` → Oswald; `font-sans` / `font-body` → Google Sans;
  **`font-inter` is a legacy alias for Google Sans** (kept so ~100 components needed no edit — it is NOT Inter any more).
- Oswald has no italic: `globals.css` forces `font-style: normal` on `.font-heading/.font-display/.font-oswald`, so `italic` on headings is ignored.

## Amber accent (v5)
`amber` `#F59E0B` / `amber-dark` `#D97706` in `tailwind.config.ts` (+ CSS vars `--color-amber*`). Applied to: Navbar "Book", Hero,
both CTA bands, Final CTA, Contact submit, Personal/Online Coaching, Corporate and EasyDiet buttons (`bg-amber text-gray-900
hover:bg-amber-dark`), the first hero keyword + separators, pillar Italian labels, review stars, the transformation badge dots and the nutrition icon.
Turquoise stays the brand/primary colour for everything non-CTA.
**Hero badge** is `hero.tagline` in `messages/*.json` (locked nested string): SK `Pohyb · Výživa · Komunita · Nastavenie mysle`,
EN `Movement · Nutrition · Community · Mindset`; the component splits on ` · `.
**Contrast:** hero overlay `black/45→70`, hero text `white/90` + text-shadow, Pillar scrim `black/80 → 40 → 5`, a `black/45→transparent` scrim over the
Personal/Online/My Story/EasyDiet photos (`z-[1]`), fallback label text `white/90`. **Nutrition icon:** Lucide `Salad` (replaces the 🍋 emoji) — badge over the
EasyDiet photo, the large fallback icon, and (v5.1) the "Nutrition" feature pill in Online Coaching (`OnlineCoachingSection.tsx`, `ICONS[1]`, same `w-5 h-5` / turquoise as the others). (The 🍋 is still in `hero_button` copy — client text, untouched.)

## Transformations (v5 → v5.1)
Slot 1 is **Braňo**, a featured full-width card using `public/transformation/Brano/{1,2,3}.jpeg` (`/transformation/Brano/N.jpeg`; `next/image`
serves them as WebP/AVIF automatically — no separate WebP files are committed; `onError` → brand gradient).
**Asset mapping (client-confirmed, consent confirmed): `1.jpeg` = AFTER ("Po" / "After", amber badge); `2.jpeg` and `3.jpeg` = BEFORE ("Pred" / "Before", dark badge).**
Display order is before → after (`2, 3, 1`) — see `BRANO_PHOTOS` in `TransformationsSection.tsx`. Badge labels are `transformations.before/after` in `messages/*.json`.
Slots 2–3 are **Tony** and **British ambassador** placeholders (gradient + person icon + "coming soon").
**Keys are named, not numbered:** `transform_brano_name/story`, `transform_tony_*`, `transform_ambassador_*` (the old `transform_1..3_*` were removed), so stale numbered rows
in the published Sheet are never read and cannot overwrite Braňo. There was never a "Martin" — the removed placeholders were Martina / Tomáš / Katarína.
`transform_brano_story` is **draft copy written without client input** (qualitative only: body recomposition, sustainable habits, energy — no numbers). Get it approved/replaced.

## Google Maps & Reviews (v5 → v5.1)
- `GOOGLE_MAPS_URL` = https://maps.app.goo.gl/fCf8456QEMdTwamy8 (resolves to "Alessandro Kabát", Bratislava, 48.1403914, 17.1236786). Contact section embeds the
  keyless iframe (`GOOGLE_MAPS_EMBED_URL`) over a placeholder (visible if the embed is blocked) and has an external button `contact.viewOnMaps`
  ("Zobraziť na Google Maps" / "View on Google Maps", `target="_blank" rel="noopener noreferrer"`).
- **Reviews (`lib/reviews.ts`, fetched in `app/page.tsx`, passed to `TestimonialsSection` as `data`):**
  1. If `NEXT_PUBLIC_GOOGLE_PLACE_ID` **and** `GOOGLE_MAPS_API_KEY` are set → `GET https://places.googleapis.com/v1/places/{id}?fields=reviews,rating,userRatingCount&languageCode=sk|en`
     (key in the `X-Goog-Api-Key` header, server-side only), one call per language, `next: { revalidate: 86400 }` (24 h ISR). Only ≥4★ non-empty reviews are shown (the API returns at most 5).
  2. Anything else (keys unset, quota/rate limit, network error, empty payload) → `CURATED_REVIEWS`: the **5 real reviews** from the listing (5.0 ★, 5 reviews — Karolina Šumichrastová,
     Alena Cuperová, Kristína Haladejová, Pedram Khakbaz, Bilal Tyler), copied 2026-10-30. Pedram/Bilal were written in English (SK = Google's translation); the other three are Slovak originals
     (EN = our translation). Dates are approximate (derived from Google's "6 months ago"), shown as relative time via `Intl.RelativeTimeFormat`. Refresh by hand if you want newer ones.
  The old `review_N_*` placeholder keys (Martina K., Tomáš B., Lucia M.) were deleted. `reviews_tagline` stays sheet-driven.
- Cards (`TestimonialsSection`) and the aggregate "5,0 ★ 5 recenzií na Google" pill are `<a>` links to `GOOGLE_MAPS_URL`. **Not yet done:** a Place ID (`ChIJ…`) is not known — the listing URL only exposes the
  feature ID — so live sync stays off until it is set in Vercel (find it with Google's Place ID Finder).

## Contact copy (v5.1)
`contact.subheading` is the only place the sentence appears: SK "Napíšte nám — ozveme sa do 24 hodín a nastavíme spolu váš prvý krok." /
EN "Write to us — we will get back to you within 24 hours and set your first step together." It was already rendered once in the code (no duplicate under the form); the cause of the live duplicate was the Sheet's `contact_tagline` row (it held this sentence and fed the eyebrow above the H2).
Fixed: the eyebrow is now the locked `contact.tag` ("Začnime" / "Let's begin"); `contact_tagline` is no longer read, so that Sheet row can be ignored or deleted.

## Instagram Feed (v5.2)
- **Fetcher:** `lib/instagram.ts` → `getInstagramPosts()`, called in `app/page.tsx` (server) and passed to `InstagramSection` as `posts`. The token never reaches the browser
  (`INSTAGRAM_ACCESS_TOKEN`, no `NEXT_PUBLIC_`; verified absent from the HTML and `.next/static`).
- **Endpoint:** `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=12` for Instagram-Login tokens (`IGAA…`/`IGQ…`).
  For Facebook-platform tokens (`EAA…`) it uses `https://graph.facebook.com/v21.0/{INSTAGRAM_USER_ID}/media` instead (needs `INSTAGRAM_USER_ID`; without it → placeholders).
- **Caching:** `fetch(..., { next: { revalidate: 3600 } })` — at most one Meta request per hour (the page itself revalidates every 5 min because of the Sheet fetch, but this fetch is served from the data cache).
- **Fallback:** no token / invalid or expired token / non-2xx / network error / malformed JSON → `[]` → the original 6 shimmer tiles + follow link. Meta's error message is logged
  (`[instagram] feed unavailable (400): …`) **without** the URL/token. The page can never 500 because of Instagram.
- **Tiles:** latest 6 posts with an image (video → `thumbnail_url` + play badge; carousel → first image). Each is `<a href={permalink} target="_blank" rel="noopener noreferrer">`; `next/image`
  (`remotePatterns` already allows any https host); image zooms `scale-105` on hover/focus; frosted-glass overlay (`bg-black/35 backdrop-blur`) with a gold-ringed Instagram glint + 3-line caption.
  `onError` → gradient + Instagram icon, plus a mount-time `img.complete && naturalWidth === 0` check because an error that fires *before hydration* never reaches React's `onError`
  (found while testing; the same latent gap exists in the other `onError` fallbacks).
- **Token status at time of writing:** the client's token is a valid **`EAA…` Facebook token with `instagram_basic` but no Pages permission**, so `graph.instagram.com` rejects it
  ("Cannot parse access token") and the Instagram account ID can't be looked up from it → the site shows placeholders. To go live, either (a) generate an Instagram-Login token for the
  `trainer_aless` account (Meta developer dashboard → Instagram → API setup with Instagram login → generate token; long-lived tokens last 60 days and must be refreshed via
  `GET graph.instagram.com/refresh_access_token`), or (b) keep the `EAA` token and set `INSTAGRAM_USER_ID` to the Instagram professional account's numeric ID.
  The token lives in `.env.local` (git-ignored) locally and must be set in Vercel for production. **Never hardcode it in `lib/config.ts`** — the repo is public.

## WhatsApp Lead Magnet (v4.1)
`ContactSection.tsx` form: Name, Phone, Email (all required), Message/goals (optional), plus a
hidden honeypot field. Primary button = WhatsApp icon + `contact_whatsapp_button`
("Napíšte nám na WhatsApp" / "Contact us on WhatsApp"; replaced the old `contact_button` key —
if the published Sheet still has a `contact_button` row it is simply ignored).
**On submit (same click handler, no `await` before `window.open`):**
1. `fetch("/api/contact", { keepalive: true })` fires in the background — never awaited, errors
   swallowed (WhatsApp is the real handoff; a failed email must not block the visitor).
2. `window.open("https://wa.me/<WHATSAPP_NUMBER>?text=…")` in a new tab, with
   `encodeURIComponent` of the locale-specific template from `contact.waMessage` (locked nested
   string; `{name} {phone} {email} {message}` placeholders; empty message becomes "—"):
   SK `Dobrý deň Aless, mám záujem o tréning. Moje meno: …, Telefón: …, Email: …, Správa: …` /
   EN `Hello Aless, I am interested in coaching. Name: …, Phone: …, Email: …, Message: …`.
   The open has to stay synchronous inside the click or Safari/mobile popup blockers kill it;
   if it is blocked anyway, the page navigates to the wa.me URL in the same tab.
3. The form is replaced by the success message (`contact_success`) plus a re-open WhatsApp link.
**`app/api/contact/route.ts`** — validates (name/phone present, email format, length caps),
drops honeypot hits, HTML-escapes everything, then POSTs to Resend's REST API
(`RESEND_API_URL` in `lib/config.ts`; no SDK dependency) with `reply_to` set to the lead's email.
With `RESEND_API_KEY` or `CONTACT_TO_EMAIL` unset it logs the lead to the server console and
returns `200 { ok: true, delivered: false }`; a Resend failure returns 502 (ignored by the client).

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

All 8 use `next/image` with `fill` + `onError` — if a file is ever deleted/renamed, the component falls back to its original gradient placeholder (icon + label), never a broken-image icon. Sections with no client photo yet (Transformations, Corporate Wellbeing, Final CTA band) still use gradient-only placeholders. The Community gallery's photos are listed under "Community Gallery & Lightbox" above.

## Graceful Degradation Rules
- Missing image → styled gradient placeholder div, **never** a broken-image icon
- Missing hero video → full-viewport gradient fallback, identical layout
- Missing/invalid Instagram token or API error → 6 shimmer tiles + follow label, zero crash
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
