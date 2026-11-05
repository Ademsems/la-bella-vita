"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useT, useContent } from "@/lib/i18n";
import { INSTAGRAM_USERNAME } from "@/lib/config";
import type { IgPost } from "@/lib/instagram";

// Posts are fetched on the server (lib/instagram.ts, ISR 1 h) and passed in. An empty list —
// no token, expired token, API error — renders the shimmer placeholder tiles instead.

const IG_ICON_PATH =
  "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d={IG_ICON_PATH} />
    </svg>
  );
}

const TILE_GRADIENTS = [
  "from-[#4BC6C8]/25 to-[#EDE4D8]/40",
  "from-[#F4D7D0]/50 to-[#F5EFE6]/60",
  "from-[#EDE4D8]/50 to-[#d8ccb8]/40",
  "from-[#d0e8ea]/40 to-[#b8d8dc]/30",
  "from-[#F5EFE6]/60 to-[#ede4d4]/50",
  "from-[#F4D7D0]/40 to-[#ecc8be]/30",
];

function ShimmerTile({ index }: { index: number }) {
  return (
    <div
      className={`aspect-square rounded-2xl bg-gradient-to-br ${TILE_GRADIENTS[index % TILE_GRADIENTS.length]} shimmer-bg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-400 cursor-default`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={1.5} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
        </svg>
      </div>
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-gold/30 transition-all duration-400 pointer-events-none" />
    </div>
  );
}

export default function InstagramSection({ posts }: { posts: IgPost[] }) {
  const { t } = useT("instagram");
  const c = useContent();
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const showPlaceholders = posts.length === 0;
  const markFailed = (id: string) => setFailed((f) => (f[id] ? f : { ...f, [id]: true }));

  return (
    <section id="instagram" className="py-24 bg-champagne">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

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
          <h2 className="font-heading text-5xl md:text-6xl font-semibold text-gray-900">
            {t("heading")}
          </h2>
          <p className="mt-4 font-inter text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            {c("instagram_tagline")}
          </p>
        </motion.div>

        {/* Grid — live or placeholders */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {showPlaceholders
            ? Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                >
                  <ShimmerTile index={i} />
                </motion.div>
              ))
            : posts.map((post, i) => (
                <motion.a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram${post.caption ? ` — ${post.caption.slice(0, 80)}` : ""}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className={`group relative block aspect-square overflow-hidden rounded-2xl bg-gradient-to-br ${TILE_GRADIENTS[i % TILE_GRADIENTS.length]} shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-amber`}
                >
                  {!failed[post.id] ? (
                    <Image
                      src={post.imageUrl}
                      alt={post.caption ? post.caption.slice(0, 120) : "Instagram"}
                      fill
                      sizes="(min-width: 768px) 33vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105"
                      onError={() => markFailed(post.id)}
                      // The error can fire before React hydrates (onError then never runs), so also
                      // check on mount for an image that already finished loading with no pixels.
                      ref={(el) => {
                        if (el && el.complete && el.naturalWidth === 0) markFailed(post.id);
                      }}
                    />
                  ) : (
                    // Graceful fallback — brand gradient + icon if the image URL expired or fails
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                      <InstagramIcon className="h-8 w-8" />
                    </div>
                  )}

                  {post.isVideo && (
                    <span className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm">
                      <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                    </span>
                  )}

                  {/* Frosted-glass hover overlay: Instagram glint + caption preview */}
                  <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center gap-3 bg-black/35 p-5 text-center text-white opacity-0 backdrop-blur-[3px] transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/70 bg-white/15 shadow-[0_0_20px_rgba(198,167,105,0.45)] backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
                      <InstagramIcon className="h-5 w-5" />
                    </span>
                    {post.caption && (
                      <p className="line-clamp-3 font-inter text-xs leading-relaxed text-white/95 sm:text-[13px]">
                        {post.caption}
                      </p>
                    )}
                  </div>
                  <div className="pointer-events-none absolute inset-0 z-[6] rounded-2xl border border-transparent transition-colors duration-500 group-hover:border-gold/50" />
                </motion.a>
              ))
          }
        </div>

        {/* Follow CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-8"
        >
          <a
            href={`https://instagram.com/${INSTAGRAM_USERNAME.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-inter text-sm font-semibold text-turquoise hover:text-turquoise/80 transition-colors group"
          >
            <InstagramIcon />
            {c("instagram_button")} {INSTAGRAM_USERNAME}
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
