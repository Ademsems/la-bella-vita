"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useT, useContent } from "@/lib/i18n";
import TiltCard from "@/components/ui/TiltCard";
import HudHotspot from "@/components/ui/HudHotspot";

// Braňo's real photos (public/transformation/Brano/). Missing file → brand gradient, never a
// broken image. Order = display order. Which photo is "before"/"after" is not labelled yet.
const BRANO_PHOTOS = [
  "/transformation/Brano/1.jpeg",
  "/transformation/Brano/2.jpeg",
  "/transformation/Brano/3.jpeg",
];

export default function TransformationsSection() {
  const { t } = useT("transformations");
  const c = useContent();

  const [failed, setFailed] = useState<Record<string, boolean>>({});

  const items = [1, 2, 3].map((n) => ({
    name: c(`transform_${n}_name`),
    story: c(`transform_${n}_story`),
  }));

  const CARD_GRADIENTS = [
    "from-[#EDE4D8] to-[#d8ccbc]",
    "from-[#F4D7D0] to-[#e8c4b8]",
    "from-[#d0e8ea] to-[#b8d8dc]",
  ];

  return (
    <section id="transformations" className="py-24 bg-champagne">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <p className="font-inter text-xs text-turquoise font-semibold uppercase tracking-[0.2em] mb-3">
            {t("tag")}
          </p>
          <h2 className="font-heading text-5xl md:text-6xl font-semibold text-gray-900 mb-5">
            {t("heading")}
          </h2>
          <p className="font-heading text-2xl italic text-gray-600 font-light">{c("transform_tagline")}</p>
          <p className="mt-2 font-inter text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            {c("transform_intro")}
          </p>
        </motion.div>

        {/* Visbody paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="max-w-3xl mx-auto mb-14 bg-white rounded-2xl p-6 border border-champagne shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-turquoise" />
            <span className="font-inter text-xs font-semibold text-turquoise tracking-wide uppercase">
              {c("transform_badge")}
            </span>
          </div>
          <p className="font-inter text-sm text-gray-500 leading-relaxed">
            {c("transform_visbody_body")}
          </p>
        </motion.div>

        {/* Featured — Braňo (items[0]) with his real photos */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-7 grid grid-cols-1 lg:grid-cols-5 overflow-hidden rounded-3xl border border-champagne bg-white shadow-sm hover:border-gold/30 hover:shadow-xl transition-all duration-500"
        >
          <div className="grid grid-cols-3 gap-2 p-3 sm:p-4 lg:col-span-3">
            {BRANO_PHOTOS.map((src, p) => (
              <div
                key={src}
                className={`relative aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br ${CARD_GRADIENTS[p % CARD_GRADIENTS.length]}`}
              >
                {!failed[src] && (
                  <Image
                    src={src}
                    alt={`${items[0].name} — ${t("photoAlt")}`}
                    fill
                    sizes="(min-width: 1024px) 20vw, 33vw"
                    className="object-cover object-[center_top]"
                    onError={() => setFailed((f) => ({ ...f, [src]: true }))}
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:col-span-2">
            <div className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-amber/15 px-3 py-1.5">
              <div className="h-2 w-2 rounded-full bg-amber" />
              <span className="font-inter text-[10px] font-semibold uppercase tracking-wide text-gray-800">
                {c("transform_badge")}
              </span>
            </div>
            <p className="mb-3 font-display text-3xl font-semibold text-gray-900">{items[0].name}</p>
            <p className="font-inter text-[15px] leading-relaxed text-gray-600">{items[0].story}</p>
          </div>
        </motion.div>

        {/* Slots for upcoming transformations (Tony, British ambassador) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {items.slice(1).map((item, j) => { const i = j + 1; return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.14, ease: "easeOut" }}
            >
              <TiltCard
                intensity={6}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 border border-champagne hover:border-gold/30 border-beam"
              >
                {/* Photo placeholder */}
                <div className={`h-64 bg-gradient-to-br ${CARD_GRADIENTS[i]} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/40 mx-auto flex items-center justify-center">
                      <svg className="w-8 h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-amber" />
                    <span className="font-inter text-[10px] font-semibold text-gray-700 tracking-wide">
                      {c("transform_badge")}
                    </span>
                  </div>
                  {/* HUD hotspot — expands into the transformation's detail on hover/tap */}
                  <HudHotspot
                    label={item.name}
                    detail={item.story}
                    style={{ left: "14px", bottom: "14px" }}
                  />
                </div>

                <div className="p-7">
                  <p className="font-display text-lg font-semibold text-gray-900 mb-3">{item.name}</p>
                  <p className="font-inter text-[14px] text-gray-500 leading-relaxed">{item.story}</p>
                </div>
              </TiltCard>
            </motion.div>
          ); })}
        </div>
      </div>
    </section>
  );
}
