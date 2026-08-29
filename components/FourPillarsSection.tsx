"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useT, useContent } from "@/lib/i18n";
import { EASYDIET_URL } from "@/lib/config";
import TiltCard from "@/components/ui/TiltCard";

const PILLAR_GRADIENTS = [
  "from-[#4BC6C8] via-[#7ED6E0] to-[#a8e8eb]",
  "from-[#f0e0c8] via-[#e8d0b0] to-[#d4b896]",
  "from-[#F4D7D0] via-[#f0c8be] to-[#e8b4a6]",
  "from-[#EDE4D8] via-[#e0d4c4] to-[#c8baa8]",
];

// Client-supplied photos — falls back to the gradient above if a file is ever missing
const PILLAR_IMAGES = [
  "/images/01-pohyb.jpg",
  "/images/02-vyziva.jpg",
  "/images/03-komunita.jpg",
  "/images/04-nastavenie-mysle.jpg",
];

type PillarName = { italian: string; title: string };

/**
 * The NUTRIZIONE body (pillar_nutrition_body_2) is one sheet-editable sentence
 * that naturally mentions "EasyDiet". We turn that substring into a link at
 * render time instead of splitting the sentence into separate sheet keys —
 * keeps the CSV row a single natural paragraph for content editors.
 */
function renderWithEasyDietLink(text: string) {
  const idx = text.indexOf("EasyDiet");
  if (idx === -1) return text;

  const before = text.slice(0, idx);
  const after = text.slice(idx + "EasyDiet".length);

  return (
    <>
      {before}
      {EASYDIET_URL ? (
        <a
          href={EASYDIET_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 text-white hover:text-gold transition-colors"
        >
          EasyDiet
        </a>
      ) : (
        <span className="font-semibold">EasyDiet</span>
      )}
      {after}
    </>
  );
}

export default function FourPillarsSection() {
  const { t, tRaw } = useT("pillars");
  const c = useContent();
  const names = tRaw("items") as PillarName[];
  const [failed, setFailed] = useState<boolean[]>([false, false, false, false]);

  const bodies = [
    c("pillar_movement_body"),
    null, // NUTRIZIONE renders its own multi-paragraph block below
    c("pillar_community_body"),
    c("pillar_mindset_body"),
  ];

  const markFailed = (i: number) =>
    setFailed((prev) => prev.map((v, idx) => (idx === i ? true : v)));

  return (
    <section id="pillars" className="py-24 bg-champagne">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="font-inter text-xs text-turquoise font-semibold uppercase tracking-[0.2em] mb-3">
            {t("tag")}
          </p>
          <h2 className="font-heading text-5xl md:text-6xl font-semibold text-gray-900">
            {t("heading")}
          </h2>
          <p className="mt-4 font-inter text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            {c("pillars_tagline")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.isArray(names) && names.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
            >
              <TiltCard
                intensity={8}
                className="group relative overflow-hidden rounded-3xl cursor-default min-h-[420px] border-beam"
              >
                {/* Gradient fallback — always rendered underneath */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${PILLAR_GRADIENTS[i]} transition-transform duration-700 group-hover:scale-[1.03]`}
                />

                {/* Real photo — layered on top, hidden if it fails to load */}
                {!failed[i] && (
                  <Image
                    src={PILLAR_IMAGES[i]}
                    alt={pillar.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    onError={() => markFailed(i)}
                  />
                )}

                <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-gold/50 transition-all duration-500 pointer-events-none z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <div className="relative z-10 h-full flex flex-col justify-end p-7">
                  <p className="font-display text-white/60 text-xs tracking-[0.25em] uppercase mb-1">
                    {pillar.italian}
                  </p>
                  <h3 className="font-display text-white text-3xl font-semibold mb-3">
                    {pillar.title}
                  </h3>

                  {/* NUTRIZIONE pillar (index 1) has 3 paragraphs incl. inline EasyDiet link */}
                  {i === 1 ? (
                    <div className="font-inter text-white/80 text-sm leading-relaxed space-y-2">
                      <p>{c("pillar_nutrition_body_1")}</p>
                      <p>{renderWithEasyDietLink(c("pillar_nutrition_body_2"))}</p>
                      <p>{c("pillar_nutrition_body_3")}</p>
                    </div>
                  ) : (
                    <p className="font-inter text-white/80 text-sm leading-relaxed">
                      {bodies[i]}
                    </p>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
