"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/lib/i18n";
import { useState } from "react";

type Category = string;

// 9 placeholder tiles with assigned categories
const TILES: { id: number; category: string; tall: boolean }[] = [
  { id: 1,  category: "Beh",      tall: true  },
  { id: 2,  category: "Komunita", tall: false },
  { id: 3,  category: "Raňajky",  tall: false },
  { id: 4,  category: "Volejbal", tall: false },
  { id: 5,  category: "More",     tall: true  },
  { id: 6,  category: "Workshop", tall: false },
  { id: 7,  category: "Komunita", tall: false },
  { id: 8,  category: "Beh",      tall: false },
  { id: 9,  category: "Raňajky",  tall: false },
];

// SK category names — used to match tile.category regardless of active locale
const FILTER_KEYS_SK = ["Všetko", "Beh", "Volejbal", "Raňajky", "Workshop", "More", "Komunita"];

// Tile gradients
const TILE_GRADIENTS = [
  "from-[#4BC6C8]/30 via-[#7ED6E0]/20 to-[#EDE4D8]/30",
  "from-[#F4D7D0]/40 via-[#f0c8be]/30 to-[#EDE4D8]/20",
  "from-[#EDE4D8]/50 via-[#e0d4c4]/40 to-[#d8ccb8]/30",
  "from-[#F5EFE6]/60 via-[#ede4d4]/40 to-[#ddd0c0]/30",
  "from-[#d0e8ea]/40 via-[#b8d8dc]/30 to-[#a0c8cc]/20",
  "from-[#F4D7D0]/30 via-[#ecc8be]/25 to-[#F5EFE6]/40",
];

export default function EventsSection() {
  const { t, tRaw } = useT("events");
  const filters = tRaw("filters") as string[];
  const [active, setActive] = useState<string>(filters[0] ?? "Všetko");

  // Map active filter (any locale) to SK category for tile matching
  const skIndex = filters.indexOf(active);
  const activeSk = skIndex > 0 ? FILTER_KEYS_SK[skIndex] : null; // null = "All"

  const visible = activeSk
    ? TILES.filter((tile) => tile.category === activeSk)
    : TILES;

  return (
    <section id="events" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <p className="font-inter text-xs text-turquoise font-semibold uppercase tracking-[0.2em] mb-3">
            {t("tag")}
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-semibold text-gray-900">
            {t("heading")}
          </h2>
          <p className="mt-4 font-inter text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            {t("subheading")}
          </p>
        </motion.div>

        {/* Filter chips */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {Array.isArray(filters) && filters.map((f: Category) => (
            <button
              key={f}
              onClick={() => setActive(f)}
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

        {/* Masonry-style grid */}
        <motion.div
          layout
          className="columns-2 md:columns-3 gap-4 space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((tile, i) => (
              <motion.div
                key={tile.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.05 }}
                className={`break-inside-avoid rounded-2xl overflow-hidden shimmer-bg group cursor-default hover:scale-[1.02] transition-transform duration-400 ${
                  tile.tall ? "h-64" : "h-44"
                }`}
              >
                <div className={`w-full h-full bg-gradient-to-br ${TILE_GRADIENTS[tile.id % TILE_GRADIENTS.length]} relative`}>
                  {/* Category label */}
                  <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="font-inter text-[10px] font-semibold text-turquoise tracking-wide uppercase">
                      {tile.category}
                    </span>
                  </div>

                  {/* Photo placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-7 h-7 text-gray-300 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="font-inter text-[10px] text-gray-400">{t("comingSoon")}</p>
                    </div>
                  </div>

                  {/* Gold border on hover */}
                  <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-gold/40 transition-all duration-400 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
