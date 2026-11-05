// ─────────────────────────────────────────────────────────────────────────────
// La Bella Vita — Single source of truth for all external dependencies.
// All values fall back to empty strings so the site never crashes when
// environment variables are absent. Set these in Vercel → Settings → Env Vars.
// ─────────────────────────────────────────────────────────────────────────────

// TODO: Set NEXT_PUBLIC_HERO_VIDEO_URL to the hosted hero video (mp4 preferred)
export const HERO_VIDEO_URL = process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "";

// Instagram feed (lib/instagram.ts). The access token is SERVER-ONLY — no NEXT_PUBLIC_ prefix, so it is
// never inlined into the browser bundle (a NEXT_PUBLIC_ token would be visible to every visitor).
// TODO: Set INSTAGRAM_ACCESS_TOKEN in Vercel (and .env.local for local dev). Empty → placeholder tiles.
export const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN || "";
export const INSTAGRAM_API_URL = "https://graph.instagram.com/me/media";
// Only for Facebook-platform tokens ("EAA…"): they need the Instagram professional account's numeric ID.
// Not needed for "IGAA…" tokens.
export const INSTAGRAM_FACEBOOK_API_URL = "https://graph.facebook.com/v21.0";
// Public, non-secret account ID of @trainer_aless (shown in Meta's token dialog); override via env if the account changes.
export const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID || "17841400649668967";
export const INSTAGRAM_USERNAME = process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME || "trainer_aless";

// Verified Google Maps listing ("Alessandro Kabát", Bratislava). Review cards and the
// "View on Google Maps" button link here.
export const GOOGLE_MAPS_URL =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL || "https://maps.app.goo.gl/fCf8456QEMdTwamy8";

// Keyless embed of the same place (coordinates from the resolved listing). Override with
// NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL (e.g. a Google "Share → Embed a map" URL) if needed.
export const GOOGLE_MAPS_EMBED_URL =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ||
  "https://www.google.com/maps?q=Alessandro+Kab%C3%A1t&ll=48.1403914,17.1236786&z=16&output=embed";

// Live Google reviews (lib/reviews.ts): set NEXT_PUBLIC_GOOGLE_PLACE_ID (the "ChIJ…" Place ID) AND the
// server-only GOOGLE_MAPS_API_KEY (Places API (New) enabled, key restricted to that API). Leave either
// empty and the Testimonials section shows the curated real reviews instead — never an error.
export const GOOGLE_PLACE_ID = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || "";
export const GOOGLE_PLACES_API_URL = "https://places.googleapis.com/v1/places";
// Server-only (no NEXT_PUBLIC_ prefix → never inlined into the browser bundle)
export const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || "";

// TODO: Set NEXT_PUBLIC_EASYDIET_URL when the EasyDiet partnership link is ready
export const EASYDIET_URL = process.env.NEXT_PUBLIC_EASYDIET_URL || "";

// TODO: Set NEXT_PUBLIC_TRAINERIZE_URL to link the "Online Coaching" CTA button
export const TRAINERIZE_URL = process.env.NEXT_PUBLIC_TRAINERIZE_URL || "";

// TODO: Set NEXT_PUBLIC_SHEET_CSV_URL_SK / _EN to published Google Sheet CSV exports
// (File → Share → Publish to web → CSV, one tab per language). When empty, the site
// renders entirely from the messages/*.json fallback — see lib/content.ts.
export const SHEET_CSV_URL_SK = process.env.NEXT_PUBLIC_SHEET_CSV_URL_SK || "";
export const SHEET_CSV_URL_EN = process.env.NEXT_PUBLIC_SHEET_CSV_URL_EN || "";

// WhatsApp lead magnet — number in international format, digits only (no "+").
// Defaults to Alessandro's number; override with NEXT_PUBLIC_WHATSAPP_NUMBER if it changes.
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "421948120052";
export const WHATSAPP_BASE_URL = "https://wa.me";

// ── Server-only (no NEXT_PUBLIC_ prefix → never inlined into the browser bundle) ──
// Used by app/api/contact/route.ts to forward leads by email via Resend.
// TODO: Set RESEND_API_KEY in Vercel. When empty, the route logs the lead and returns 200 — never errors.
// TODO: Set CONTACT_TO_EMAIL to the inbox that should receive leads.
// TODO: Set CONTACT_FROM_EMAIL to a sender on a Resend-verified domain (the default only
//       delivers to the Resend account owner's own address — fine for first tests).
export const RESEND_API_URL = "https://api.resend.com/emails";
export const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
export const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "";
export const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "La Bella Vita <onboarding@resend.dev>";
