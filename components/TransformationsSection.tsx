"use client";

import { motion } from "framer-motion";
import { useT, useContent } from "@/lib/i18n";

export default function TransformationsSection() {
  const { t } = useT("transformations");
  const c = useContent();

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
          <h2 className="font-cormorant text-5xl md:text-6xl font-semibold text-gray-900 mb-5">
            {t("heading")}
          </h2>
          <p className="font-cormorant text-2xl italic text-gray-600 font-light">{c("transform_tagline")}</p>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.14, ease: "easeOut" }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border border-champagne hover:border-gold/30"
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
                  <div className="w-2 h-2 rounded-full bg-turquoise" />
                  <span className="font-inter text-[10px] font-semibold text-gray-700 tracking-wide">
                    {c("transform_badge")}
                  </span>
                </div>
              </div>

              <div className="p-7">
                <p className="font-playfair text-lg font-semibold text-gray-900 mb-3">{item.name}</p>
                <p className="font-inter text-[14px] text-gray-500 leading-relaxed">{item.story}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
