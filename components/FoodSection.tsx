"use client";

import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";
// Replaced by FoodEasyDietSection — kept to avoid orphan file errors

export default function FoodSection() {
  const { t } = useT("food");

  // Heading may contain \n for a two-line display
  const headingLines = t("heading").split("\n");

  return (
    <section id="food" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image — left */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div
              className="relative w-full rounded-3xl overflow-hidden shadow-xl"
              style={{ aspectRatio: "4/5" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#f0e0c8] via-[#e8d0b0] to-[#F4D7D0] flex items-center justify-center">
                <div className="text-center px-8">
                  <div className="w-16 h-16 rounded-full bg-white/40 mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <p className="font-inter text-white/70 text-xs tracking-widest uppercase">Mediterranean Nutrition</p>
                </div>
              </div>
              {/* Decorative corner */}
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b border-r border-gold rounded-br-3xl pointer-events-none" />
            </div>
          </motion.div>

          {/* Text — right */}
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="font-inter text-xs text-turquoise font-semibold uppercase tracking-[0.2em] mb-4">
              {t("tag")}
            </p>

            <h2 className="font-cormorant text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-8">
              {headingLines.map((line, i) => (
                <span key={i}>{line}{i < headingLines.length - 1 && <br />}</span>
              ))}
            </h2>

            <div className="space-y-4 font-inter text-gray-500 text-[15px] leading-relaxed mb-10">
              <p>{t("body1")}</p>
              <p>{t("body2")}</p>
            </div>

            <button
              disabled
              className="px-7 py-3 bg-powder-pink text-gray-800 font-inter font-semibold text-sm rounded-full border border-gold/30 opacity-75 cursor-default"
            >
              {t("cta")}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
