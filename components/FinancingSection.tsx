"use client";

import { motion } from "framer-motion";
import { useT, useContent } from "@/lib/i18n";

export default function FinancingSection() {
  const { t } = useT("financing");
  const c = useContent();
  const features = [1, 2, 3, 4].map((n) => c(`financing_chip_${n}`));

  return (
    <section id="financing" className="py-24 bg-champagne">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="font-inter text-xs text-turquoise font-semibold uppercase tracking-[0.2em] mb-4">
            {t("tag")}
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
            {t("heading")}
          </h2>
          <p className="font-inter text-gray-500 text-base max-w-2xl mx-auto leading-relaxed mb-12">
            {c("financing_body")}
          </p>

          {/* Feature chips */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-center gap-2 bg-white rounded-full px-5 py-2.5 shadow-sm border border-gold/20"
              >
                <div className="w-5 h-5 rounded-full bg-turquoise/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-inter text-sm text-gray-700 font-medium">{f}</span>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-9 py-4 bg-turquoise text-white font-inter font-semibold text-sm rounded-full hover:bg-turquoise/90 hover:shadow-lg hover:shadow-turquoise/25 hover:scale-105 transition-all duration-300"
          >
            {c("financing_button")}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
