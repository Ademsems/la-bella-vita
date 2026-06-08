"use client";

import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";

export default function AboutSection() {
  const { t } = useT("about");

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              <div className="aspect-[3/4] rounded-3xl bg-gradient-to-br from-[#0BBCD4] via-[#0891b2] to-[#0e7490] flex items-center justify-center shadow-2xl overflow-hidden">
                <div className="text-center text-white/80 p-8">
                  <div className="w-24 h-24 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium">Alessandro</p>
                  <p className="text-xs opacity-70">Personal Trainer</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-[#F472B6] rounded-full flex flex-col items-center justify-center shadow-xl">
                <span className="text-white font-bold text-2xl">10+</span>
                <span className="text-white text-xs text-center leading-tight px-2">years exp.</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <span className="text-[#0BBCD4] font-semibold text-sm uppercase tracking-widest">{t("tag")}</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">{t("heading")}</h2>
            <div className="mt-6 space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>{t("body1")}</p>
              <p>{t("body2")}</p>
              <p>{t("body3")}</p>
            </div>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-8 px-8 py-3 bg-[#0BBCD4] text-white font-semibold rounded-full hover:bg-[#0891b2] hover:shadow-lg hover:shadow-[#0BBCD4]/30 hover:scale-105 transition-all duration-300"
            >
              {t("cta")}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
