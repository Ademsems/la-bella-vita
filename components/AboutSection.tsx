"use client";

import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";

export default function AboutSection() {
  const { t } = useT("about");

  return (
    <section id="about" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Portrait — left */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              {/* Main portrait placeholder */}
              <div
                className="w-full rounded-3xl overflow-hidden shadow-xl"
                style={{ aspectRatio: "4/5" }}
              >
                <div className="w-full h-full bg-gradient-to-br from-[#4BC6C8] via-[#7ED6E0] to-[#EDE4D8] flex items-center justify-center">
                  <div className="text-center text-white/70 px-8">
                    <div className="w-20 h-20 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <p className="font-inter text-sm font-medium">Alessandro</p>
                    <p className="font-inter text-xs opacity-60 mt-1">Personal Trainer</p>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl px-5 py-4 border border-champagne">
                <p className="font-display text-3xl font-bold text-turquoise leading-none">10+</p>
                <p className="font-inter text-xs text-gray-500 mt-1 leading-tight">rokov<br />skúseností</p>
              </div>

              {/* Decorative gold line */}
              <div className="absolute -top-4 -left-4 w-20 h-20 border-t border-l border-gold rounded-tl-3xl pointer-events-none" />
            </div>
          </motion.div>

          {/* Text — right */}
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="order-1 lg:order-2"
          >
            <p className="font-inter text-xs text-turquoise font-semibold uppercase tracking-[0.2em] mb-4">
              {t("tag")}
            </p>

            <h2 className="font-heading text-5xl md:text-6xl font-semibold text-gray-900 leading-tight mb-2">
              {t("heading")}
            </h2>
            <p className="font-heading text-xl italic text-gray-400 mb-8">
              {t("subheading")}
            </p>

            <div className="space-y-5 font-inter text-gray-600 text-[15px] leading-relaxed">
              <p>{t("body1")}</p>
              <p>{t("body2")}</p>
              <p>{t("body3")}</p>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <button
                onClick={() => document.getElementById("how-i-work")?.scrollIntoView({ behavior: "smooth" })}
                className="group px-7 py-3 bg-turquoise text-white font-inter font-semibold text-sm rounded-full hover:bg-turquoise/90 hover:shadow-lg hover:shadow-turquoise/25 transition-all duration-300"
              >
                {t("cta")}
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>
              {/* Gold accent line */}
              <div className="h-px w-12 bg-gold" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
