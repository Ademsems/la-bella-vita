"use client";

import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";
import { EASYDIET_URL } from "@/lib/config";

const PILLAR_GRADIENTS = [
  "from-[#4BC6C8] via-[#7ED6E0] to-[#a8e8eb]",
  "from-[#f0e0c8] via-[#e8d0b0] to-[#d4b896]",
  "from-[#F4D7D0] via-[#f0c8be] to-[#e8b4a6]",
  "from-[#EDE4D8] via-[#e0d4c4] to-[#c8baa8]",
];

type PillarItem = {
  italian: string;
  title: string;
  body?: string;
  body1?: string;
  body2?: string;
  easydiet?: string;
  body3?: string;
  body4?: string;
};

export default function FourPillarsSection() {
  const { t, tRaw } = useT("pillars");
  const items = tRaw("items") as PillarItem[];

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
          <h2 className="font-cormorant text-5xl md:text-6xl font-semibold text-gray-900">
            {t("heading")}
          </h2>
          <p className="mt-4 font-inter text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            {t("subheading")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.isArray(items) && items.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-3xl cursor-default"
              style={{ minHeight: "420px" }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${PILLAR_GRADIENTS[i]} transition-transform duration-700 group-hover:scale-[1.03]`}
              />
              <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-gold/50 transition-all duration-500 pointer-events-none z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              <div className="relative z-10 h-full flex flex-col justify-end p-7">
                <p className="font-playfair text-white/60 text-xs tracking-[0.25em] uppercase mb-1">
                  {pillar.italian}
                </p>
                <h3 className="font-playfair text-white text-3xl font-semibold mb-3">
                  {pillar.title}
                </h3>

                {/* NUTRIZIONE pillar (index 1) has inline EasyDiet link */}
                {i === 1 && pillar.body1 ? (
                  <div className="font-inter text-white/80 text-sm leading-relaxed space-y-2">
                    <p>{pillar.body1}</p>
                    <p>
                      {pillar.body2}{" "}
                      {EASYDIET_URL ? (
                        <a
                          href={EASYDIET_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-2 text-white hover:text-gold transition-colors"
                        >
                          {pillar.easydiet}
                        </a>
                      ) : (
                        <span className="font-semibold">{pillar.easydiet}</span>
                      )}
                      {pillar.body3}
                    </p>
                    <p>{pillar.body4}</p>
                  </div>
                ) : (
                  <p className="font-inter text-white/80 text-sm leading-relaxed">
                    {pillar.body}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
