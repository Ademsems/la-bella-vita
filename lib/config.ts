// ─────────────────────────────────────────────────────────────────────────────
// La Bella Vita — Single source of truth for all external dependencies.
// All values fall back to empty strings so the site never crashes when
// environment variables are absent. Set these in Vercel → Settings → Env Vars.
// ─────────────────────────────────────────────────────────────────────────────

// TODO: Set NEXT_PUBLIC_HERO_VIDEO_URL to the hosted hero video (mp4 preferred)
export const HERO_VIDEO_URL = process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "";

// TODO: Set NEXT_PUBLIC_INSTAGRAM_TOKEN with a valid Instagram Basic Display API token
// TODO: Set NEXT_PUBLIC_INSTAGRAM_USERNAME e.g. "labellavita"
export const INSTAGRAM_TOKEN = process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN || "";
export const INSTAGRAM_USERNAME = process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME || "";

// TODO: Set NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL with the Google My Business embed URL
export const GOOGLE_MAPS_EMBED_URL = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL || "";

// TODO: Set NEXT_PUBLIC_GOOGLE_PLACE_ID to enable live Google reviews in Testimonials
export const GOOGLE_PLACE_ID = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || "";

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
