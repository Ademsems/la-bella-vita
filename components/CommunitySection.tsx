"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useT, useContent } from "@/lib/i18n";
import { useState } from "react";
import Lightbox, { type LightboxImage } from "@/components/ui/Lightbox";

type Category = string;

interface Photo {
  /** Stable key for React + the onError map. */
  id: string;
  /** Slovak category — must match an entry of FILTER_KEYS_SK (the locked filter chips). */
  category: string;
  /** Always a URL-safe path under /images (no spaces, no "&", no diacritics). */
  src: string;
  /** width / height of the source file — sizes the lightbox frame so nothing is cropped. */
  ratio: number;
}

// ── Community photo registry ────────────────────────────────────────────────────────────
// Files live in public/images/. Web-sized copies only (1800 px wide, ~0.6 MB): the full-res
// camera originals ("Zaži LBV-NNN.jpg", 20–33 MB) are git-ignored and never deployed.
// To add a photo: put a URL-safe, web-sized JPG in public/images/ and add one line below.
const R_LBV = 1800 / 3198; // community-lbv-NNN.jpg  (dinner / quiz evening shoot)
const R_AK = 2000 / 3554;  // community-ak-NN.jpg    (gym coaching shoot, was "Aless&Kika-NN")

const lbv = (n: string, category: string): Photo => ({
  id: `lbv-${n}`, category, src: `/images/community-lbv-${n}.jpg`, ratio: R_LBV,
});
const ak = (n: string, category: string): Photo => ({
  id: `ak-${n}`, category, src: `/images/community-ak-${n}.jpg`, ratio: R_AK,
});

// Order is the reading order of the grid (row by row) and of the lightbox.
const PHOTOS: Photo[] = [
  { id: "komunita", category: "Komunita", src: "/images/03-komunita.jpg", ratio: 4672 / 7008 },
  lbv("019", "Komunita"),
  ak("06", "Workshop"),
  lbv("045", "Komunita"),
  lbv("016", "Komunita"),
  lbv("035", "Komunita"),
  ak("13", "Beh"),
  lbv("028", "Komunita"),
  lbv("039", "Komunita"),
  lbv("024", "Komunita"),
  ak("09", "Workshop"),
  ak("04", "Workshop"),
  lbv("021", "Komunita"),
  lbv("018", "Komunita"),
  lbv("046", "Komunita"),
  lbv("013", "Komunita"),
  lbv("029", "Komunita"),
  lbv("026", "Komunita"),
  lbv("027", "Komunita"),
  lbv("042", "Komunita"),
  lbv("022", "Komunita"),
];

/** Photos shown before "show more" (3 columns × 3 rows on desktop). */
const INITIAL_VISIBLE = 9;

const FILTER_KEYS_SK = ["Všetko", "Beh", "Volejbal", "Raňajky", "Workshop", "More", "Komunita"];

const TILE_GRADIENTS = [
  "from-[#4BC6C8]/30 via-[#7ED6E0]/20 to-[#EDE4D8]/30",
  "from-[#F4D7D0]/40 via-[#f0c8be]/30 to-[#EDE4D8]/20",
  "from-[#EDE4D8]/50 via-[#e0d4c4]/40 to-[#d8ccb8]/30",
  "from-[#F5EFE6]/60 via-[#ede4d4]/40 to-[#ddd0c0]/30",
  "from-[#d0e8ea]/40 via-[#b8d8dc]/30 to-[#a0c8cc]/20",
  "from-[#F4D7D0]/30 via-[#ecc8be]/25 to-[#F5EFE6]/40",
];

export default function CommunitySection() {
  const { t, tRaw } = useT("community");
  const c = useContent();
  const filters = tRaw("filters") as string[];
  const [active, setActive] = useState<string>(filters[0] ?? "Všetko");
  const [expanded, setExpanded] = useState(false);

  const skIndex = filters.indexOf(active);
  const activeSk = skIndex > 0 ? FILTER_KEYS_SK[skIndex] : null;

  // Only offer filter chips that actually have photos (an empty chip would show a blank grid)
  const categoriesWithPhotos = new Set(PHOTOS.map((p) => p.category));
  const visibleFilters = Array.isArray(filters)
    ? filters.filter((_, i) => i === 0 || categoriesWithPhotos.has(FILTER_KEYS_SK[i]))
    : [];

  const filtered = activeSk ? PHOTOS.filter((p) => p.category === activeSk) : PHOTOS;
  const shown = expanded ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hiddenCount = filtered.length - shown.length;

  // The lightbox cycles every photo in the active filter, including ones not yet revealed
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxLabels = tRaw("lightbox") as { close: string; prev: string; next: string; open: string };
  const altFor = (p: Photo) => `${t("heading")} — ${p.category}`;
  const lightboxImages: LightboxImage[] = filtered.map((p) => ({
    src: p.src,
    ratio: p.ratio,
    alt: altFor(p),
  }));

  const [failedPhotos, setFailedPhotos] = useState<Record<string, boolean>>({});

  const selectFilter = (f: string) => {
    setActive(f);
    setExpanded(false);
  };

  return (
    <section id="community" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-4"
        >
          <p className="font-inter text-xs text-turquoise font-semibold uppercase tracking-[0.2em] mb-3">
            {t("tag")}
          </p>
          <h2 className="font-heading text-5xl md:text-6xl font-semibold text-gray-900">
            {t("heading")}
          </h2>
          <p className="mt-4 font-inter text-gray-600 text-lg font-light italic max-w-xl mx-auto">
            {c("community_tagline")}
          </p>
          <p className="mt-3 font-inter text-gray-500 text-base max-w-2xl mx-auto leading-relaxed">
            {c("community_body")}
          </p>
        </motion.div>

        {/* Filter chips */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10 mt-10">
          {visibleFilters.map((f: Category) => (
            <button
              key={f}
              onClick={() => selectFilter(f)}
              className={`font-inter text-sm px-5 py-2 rounded-full border transition-all duration-250 ${
                active === f
                  ? "bg-turquoise text-white border-turquoise shadow-sm"
                  : "bg-white text-gray-600 border-champagne hover:border-turquoise/50 hover:text-turquoise"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Photo grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <AnimatePresence mode="popLayout">
            {shown.map((photo, i) => {
              const failed = failedPhotos[photo.id];

              return (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: Math.min(i, 8) * 0.05 }}
                  className="relative aspect-[3/4] rounded-2xl overflow-hidden shimmer-bg group cursor-zoom-in hover:scale-[1.02] transition-transform duration-400"
                >
                  <div className={`w-full h-full bg-gradient-to-br ${TILE_GRADIENTS[i % TILE_GRADIENTS.length]} relative`}>
                    {!failed && (
                      <Image
                        src={photo.src}
                        alt={altFor(photo)}
                        fill
                        sizes="(min-width: 768px) 33vw, 50vw"
                        className="object-cover object-[center_15%] transition-transform duration-700 group-hover:scale-[1.04]"
                        onError={() => setFailedPhotos((f) => ({ ...f, [photo.id]: true }))}
                      />
                    )}
                    <button
                      type="button"
                      aria-label={`${lightboxLabels?.open ?? ""} — ${photo.category}`}
                      onClick={() => setLightboxIndex(filtered.indexOf(photo))}
                      className="absolute inset-0 z-10 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    />
                    <div className="absolute top-3 left-3 z-[5] bg-white/80 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="font-inter text-[10px] font-semibold text-turquoise tracking-wide uppercase">
                        {photo.category}
                      </span>
                    </div>
                    {/* Graceful fallback — brand gradient + icon if the file ever fails to load */}
                    {failed && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <svg className="w-7 h-7 text-gray-300 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="font-inter text-[10px] text-gray-400">{t("comingSoon")}</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-gold/40 transition-all duration-400 pointer-events-none z-[11]" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Show more / less — keeps the page from growing by ~2000px on load */}
        {filtered.length > INITIAL_VISIBLE && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="group font-inter text-sm font-medium px-7 py-3 rounded-full border border-gold/60 text-gray-700 bg-white hover:border-turquoise hover:text-turquoise hover:shadow-md hover:shadow-turquoise/15 transition-all duration-300"
            >
              {expanded ? t("showLess") : `${t("showMore")} (+${hiddenCount})`}
            </button>
          </div>
        )}

        <Lightbox
          images={lightboxImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
          labels={lightboxLabels}
        />
      </div>
    </section>
  );
}
