"use client";

import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";

export default function FoodSection() {
  const { t } = useT("food");

  return (
    <section id="food" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#F472B6] font-semibold text-sm uppercase tracking-widest">{t("tag")}</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">{t("heading")}</h2>
            <div className="mt-6 space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>{t("body1")}</p>
              <p>{t("body2")}</p>
            </div>
            <button className="mt-8 px-8 py-3 bg-[#F472B6] text-white font-semibold rounded-full hover:bg-[#ec4899] hover:shadow-lg hover:shadow-[#F472B6]/30 hover:scale-105 transition-all duration-300">
              {t("cta")}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#F472B6] via-[#ec4899] to-[#be185d] flex items-center justify-center shadow-2xl">
              <div className="text-center text-white/80 p-8">
                <div className="w-24 h-24 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium opacity-90">Nutrition & Wellness</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
