// ─────────────────────────────────────────────────────────────────────────────
// Google reviews for the "Alessandro Kabát" listing — server-side only.
//
// Strategy:
//   1. When NEXT_PUBLIC_GOOGLE_PLACE_ID + GOOGLE_MAPS_API_KEY are both set, fetch live data from
//      the Google Places API (New), once per language, cached with ISR for 24 h.
//   2. On ANY problem (keys unset, rate limit, network error, empty/odd payload) fall back to
//      CURATED_REVIEWS below — the real 5-star reviews as they appear on the listing.
// The API key never leaves the server (no NEXT_PUBLIC_ prefix, never passed to the client).
// ─────────────────────────────────────────────────────────────────────────────
import { GOOGLE_PLACE_ID, GOOGLE_MAPS_API_KEY, GOOGLE_PLACES_API_URL } from "@/lib/config";

export interface Review {
  id: string;
  author: string;
  rating: number;
  /** Review text per site language (one is the original, the other Google's/our translation). */
  text: { sk: string; en: string };
  /** ISO date; the card renders it as a relative time ("6 months ago") in the visitor's language. */
  date: string | null;
}

export interface ReviewsData {
  source: "google" | "curated";
  rating: number;
  count: number;
  reviews: Review[];
}

// Real reviews copied from the public listing (https://maps.app.goo.gl/fCf8456QEMdTwamy8) on
// 2026-10-30. Dates are derived from Google's relative labels ("6 months ago" → 2026-04-30,
// "a month ago" → 2026-09-30), so they are approximate. Where a review was written in one
// language, the other language is Google's own translation (Pedram, Bilal: EN originals) or a
// plain translation of the Slovak original (Karolina, Alena, Kristína).
// To refresh by hand: re-copy from the listing, newest/most relevant first.
export const CURATED_REVIEWS: ReviewsData = {
  source: "curated",
  rating: 5,
  count: 5,
  reviews: [
    {
      id: "karolina-sumichrastova",
      author: "Karolina Šumichrastová",
      rating: 5,
      date: "2026-04-30",
      text: {
        sk: "S Alessandrom som mala dva mesiace intenzívnych tréningov a musím povedať, že lepšieho trénera som si ani nemohla vybrať. Jeho osobný a ľudský prístup jednoznačne pomáha k tomu, že človek postupne vidí výsledky a nestráca motiváciu :) Jednoducho sa teší na každý tréning.",
        en: "I had two months of intensive training with Alessandro and I have to say I couldn't have chosen a better trainer. His personal, human approach clearly helps you gradually see results and keep your motivation :) You simply look forward to every session.",
      },
    },
    {
      id: "alena-cuperova",
      author: "Alena Cuperová",
      rating: 5,
      date: "2026-04-30",
      text: {
        sk: "Alessandra odporúčam, profesionálny aj kamarátsky prístup zároveň, teším sa na výsledky pod jeho vedením 😊",
        en: "I recommend Alessandro — a professional and friendly approach at the same time. I'm looking forward to the results under his guidance 😊",
      },
    },
    {
      id: "kristina-haladejova",
      author: "Kristína Haladejová",
      rating: 5,
      date: "2026-09-30",
      text: {
        sk: "Alessandro je presne ten typ trénera, pri ktorom človek pochopí, že cvičenie nie je len o tom odtrpieť si hodinu vo fitku. Na jeho tréningoch oceňujem najmä jeho individuálny prístup, energiu a schopnosť človeka motivovať aj v dňoch, keď sa mu vôbec nechce. Každý cvik vie vysvetliť, prispôsobiť a zároveň človeka správne „potlačiť“ ďalej. Je profesionálny, ale zároveň ľudský a vďaka jeho humoru sú tréningy príjemné a nikdy nie stereotypné. Je vidieť, že ho fitness naozaj baví a že mu záleží na tom, aby jeho klienti neriešili iba vzhľad, ale aj silu, zdravie a celkový životný štýl. Ak hľadáte trénera, ktorý vás nebude len počítať opakovania, ale bude vás sprevádzať celou cestou, Alessandra určite odporúčam.",
        en: "Alessandro is exactly the kind of trainer who makes you realise that working out isn't just about suffering through an hour at the gym. In his sessions I especially appreciate his individual approach, his energy and his ability to motivate you even on days when you don't feel like it at all. He can explain and adapt every exercise and still push you just the right amount further. He is professional but also personable, and thanks to his humour the sessions are enjoyable and never repetitive. You can see that he truly enjoys fitness and cares that his clients focus not only on how they look, but also on strength, health and their overall lifestyle. If you're looking for a trainer who won't just count your reps but will guide you the whole way, I definitely recommend Alessandro.",
      },
    },
    {
      id: "pedram-khakbaz",
      author: "Pedram Khakbaz",
      rating: 5,
      date: "2026-04-30",
      text: {
        sk: "Alessandro je vynikajúci osobný tréner. Je veľmi dobre informovaný, nápomocný a skutočne oddaný svojim klientom. Každé stretnutie je dobre naplánované, motivujúce a prispôsobené vašej úrovni a cieľom. Vytvára pozitívnu atmosféru a pomáha vám zostať konzistentnými a sebavedomými. Vrelo ho odporúčam každému, kto chce profesionálny a efektívny tréning v Bratislave.",
        en: "Alessandro is an excellent personal trainer. He is very knowledgeable, supportive, and truly dedicated to his clients. Every session is well planned, motivating, and tailored to your level and goals. He creates a positive atmosphere and helps you stay consistent and confident. I highly recommend him to anyone who wants professional and effective training in Bratislava.",
      },
    },
    {
      id: "bilal-tyler",
      author: "Bilal Tyler",
      rating: 5,
      date: "2026-04-30",
      text: {
        sk: "S Alessandrom spolupracujem od minulého roka a musím povedať, že je vynikajúci. Veľmi dobre informovaný a hlboko sa stará o svoju prácu a svojich klientov.",
        en: "I have been working with Alessandro since last year and I have to say, he is excellent. Very knowledgeable, and he cares deeply about his work and his clients.",
      },
    },
  ],
};

interface PlacesReview {
  name?: string;
  rating?: number;
  publishTime?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string };
}
interface PlacesResponse {
  rating?: number;
  userRatingCount?: number;
  reviews?: PlacesReview[];
}

async function fetchPlace(lang: "sk" | "en"): Promise<PlacesResponse> {
  const url =
    `${GOOGLE_PLACES_API_URL}/${encodeURIComponent(GOOGLE_PLACE_ID)}` +
    `?fields=reviews,rating,userRatingCount&languageCode=${lang}`;
  const res = await fetch(url, {
    headers: { "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY },
    next: { revalidate: 86400 }, // ISR: at most one refresh per day
  });
  if (!res.ok) throw new Error(`Places API ${res.status}`);
  return (await res.json()) as PlacesResponse;
}

/**
 * Live reviews when configured, curated reviews otherwise. Never throws and never returns an
 * empty list, so the Testimonials section can always render.
 */
export async function getReviews(): Promise<ReviewsData> {
  if (!GOOGLE_PLACE_ID || !GOOGLE_MAPS_API_KEY) return CURATED_REVIEWS;

  try {
    const [sk, en] = await Promise.all([fetchPlace("sk"), fetchPlace("en")]);
    const enByName = new Map((en.reviews ?? []).map((r) => [r.name, r]));

    const reviews: Review[] = (sk.reviews ?? [])
      .map((r, i): Review | null => {
        const skText = r.text?.text?.trim();
        const enText = (enByName.get(r.name)?.text?.text ?? r.originalText?.text ?? skText)?.trim();
        if (!skText || !enText || (r.rating ?? 0) < 4) return null; // only show good, non-empty reviews
        return {
          id: r.name ?? `review-${i}`,
          author: r.authorAttribution?.displayName ?? "Google",
          rating: Math.round(r.rating ?? 5),
          text: { sk: skText, en: enText },
          date: r.publishTime ?? null,
        };
      })
      .filter((r): r is Review => r !== null);

    if (reviews.length === 0) return CURATED_REVIEWS;
    return {
      source: "google",
      rating: sk.rating ?? CURATED_REVIEWS.rating,
      count: sk.userRatingCount ?? reviews.length,
      reviews,
    };
  } catch {
    return CURATED_REVIEWS;
  }
}
