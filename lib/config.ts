// ─────────────────────────────────────────────────────────────────────────────
// La Bella Vita — Single source of truth for all external dependencies.
// All values fall back to empty strings so the site never crashes when
// environment variables are absent.
// ─────────────────────────────────────────────────────────────────────────────

// TODO: Set NEXT_PUBLIC_HERO_VIDEO_URL in your Vercel environment variables
export const HERO_VIDEO_URL = process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "";

// TODO: Set NEXT_PUBLIC_INSTAGRAM_TOKEN with a valid Instagram Basic Display API token
// TODO: Set NEXT_PUBLIC_INSTAGRAM_USERNAME e.g. "labellavita"
export const INSTAGRAM_TOKEN = process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN || "";
export const INSTAGRAM_USERNAME = process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME || "@labellavita";

// TODO: Set NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL with the Google My Business embed URL
export const GOOGLE_MAPS_EMBED_URL = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL || "";

// TODO: Set NEXT_PUBLIC_GOOGLE_PLACE_ID with the Google Place ID for live reviews
export const GOOGLE_PLACE_ID = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || "";

// TODO: Set NEXT_PUBLIC_FOOD_COLLAB_URL when the nutrition partnership page is ready
export const FOOD_COLLAB_URL = process.env.NEXT_PUBLIC_FOOD_COLLAB_URL || "";
