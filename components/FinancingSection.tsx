"use client";

import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";

export default function FinancingSection() {
  const { t, tRaw } = useT("financing");
  const features = tRaw("features") as string[];

  return (
    <section id="financing" className="py-24 bg-gradient-to-br from-[#0BBCD4] via-[#0891b2] to-[#0e7490] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-white/70 font-semibold text-sm uppercase tracking-widest">{t("tag")}</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white leading-tight">{t("heading")}</h2>
          <p className="mt-6 text-white/90 text-lg leading-relaxed max-w-2xl mx-auto">{t("body")}</p>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.isArray(features) && features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-5 text-white font-medium hover:bg-white/20 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {feature}
              </motion.div>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-10 px-10 py-4 bg-white text-[#0BBCD4] font-semibold rounded-full text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            {t("cta")}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
