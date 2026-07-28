"use client";

import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";
import { EASYDIET_URL } from "@/lib/config";

export default function FoodEasyDietSection() {
  const { t } = useT("food");

  const heading = t("heading");

  return (
    <section id="nutrition" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text — left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="font-inter text-xs text-turquoise font-semibold uppercase tracking-[0.2em] mb-4">
              {t("tag")}
            </p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-semibold text-gray-900 mb-6 whitespace-pre-line">
              {heading}
            </h2>
            <p className="font-inter text-[15px] text-gray-500 leading-relaxed mb-5">
              {t("body1")}
            </p>
            <p className="font-inter text-[15px] text-gray-500 leading-relaxed mb-8">
              {t("body2")}
            </p>

            {EASYDIET_URL ? (
              <a
                href={EASYDIET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center px-8 py-3.5 bg-turquoise text-white font-inter font-semibold text-sm rounded-full hover:bg-turquoise/90 hover:shadow-lg hover:shadow-turquoise/25 transition-all duration-300"
              >
                {t("cta")}
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
            ) : (
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="group px-8 py-3.5 bg-turquoise text-white font-inter font-semibold text-sm rounded-full hover:bg-turquoise/90 hover:shadow-lg hover:shadow-turquoise/25 transition-all duration-300"
              >
                {t("cta")}
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            )}
          </motion.div>

          {/* Visual — right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[#f0e0c8] via-[#e8d0b0] to-[#d4b896] shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 rounded-full bg-white/30 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl">🍋</span>
                  </div>
                  <p className="font-inter text-white/60 text-xs">EasyDiet</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 w-28 h-28 rounded-full bg-gold/10 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
