// ─────────────────────────────────────────────────────────────────────────────
// Instagram feed — server-side only (imported by app/page.tsx, never by a client component).
//
// Two token flavours are supported:
//   • Instagram Login token ("IGAA…" / "IGQ…") → https://graph.instagram.com/me/media   (default)
//   • Facebook-platform token ("EAA…")          → https://graph.facebook.com/{INSTAGRAM_USER_ID}/media
//     (needs INSTAGRAM_USER_ID — the Instagram professional account's numeric ID)
//
// Responses are cached with ISR for 1 hour. ANY problem (no token, expired/invalid token, rate
// limit, network error, odd payload) resolves to an empty list, which the section renders as the
// usual shimmer placeholder tiles — the page can never throw because of Instagram.
// ─────────────────────────────────────────────────────────────────────────────
import {
  INSTAGRAM_ACCESS_TOKEN,
  INSTAGRAM_API_URL,
  INSTAGRAM_FACEBOOK_API_URL,
  INSTAGRAM_USER_ID,
} from "@/lib/config";

export interface IgPost {
  id: string;
  caption: string;
  isVideo: boolean;
  /** Photo URL, or the cover frame for videos. */
  imageUrl: string;
  permalink: string;
  timestamp: string;
}

interface GraphMedia {
  id: string;
  caption?: string;
  media_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp?: string;
}

const FIELDS = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp";
const POST_COUNT = 6;

function endpoint(): string | null {
  if (!INSTAGRAM_ACCESS_TOKEN) return null;
  if (INSTAGRAM_ACCESS_TOKEN.startsWith("EAA")) {
    // Facebook-platform token: the Instagram account ID is mandatory
    return INSTAGRAM_USER_ID ? `${INSTAGRAM_FACEBOOK_API_URL}/${INSTAGRAM_USER_ID}/media` : null;
  }
  return INSTAGRAM_API_URL;
}

/** Latest posts (max 6) with a usable image, or [] on any failure. Never throws. */
export async function getInstagramPosts(): Promise<IgPost[]> {
  const base = endpoint();
  if (!base) return [];

  try {
    const url = `${base}?fields=${FIELDS}&limit=12&access_token=${encodeURIComponent(INSTAGRAM_ACCESS_TOKEN)}`;
    const res = await fetch(url, { next: { revalidate: 3600 } }); // ISR: ≤ 1 request / hour
    if (!res.ok) {
      // Log Meta's message only — never the URL, which contains the token
      const body = (await res.json().catch(() => null)) as { error?: { message?: string } } | null;
      console.warn(`[instagram] feed unavailable (${res.status}): ${body?.error?.message ?? "no details"}`);
      return [];
    }
    const json = (await res.json()) as { data?: GraphMedia[] };

    return (json.data ?? [])
      .map((m): IgPost | null => {
        const isVideo = m.media_type === "VIDEO";
        const imageUrl = isVideo ? m.thumbnail_url : m.media_url;
        if (!imageUrl || !m.permalink) return null;
        return {
          id: m.id,
          caption: (m.caption ?? "").trim(),
          isVideo,
          imageUrl,
          permalink: m.permalink,
          timestamp: m.timestamp ?? "",
        };
      })
      .filter((p): p is IgPost => p !== null)
      .slice(0, POST_COUNT);
  } catch {
    return [];
  }
}
