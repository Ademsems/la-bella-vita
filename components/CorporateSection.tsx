"use client";

import { motion } from "framer-motion";
import { useT, useContent } from "@/lib/i18n";

export default function CorporateSection() {
  const { t } = useT("corporate");
  const c = useContent();
  const offerings = [1, 2, 3, 4, 5, 6].map((n) => c(`corporate_item_${n}`));
  const stats = [1, 2, 3].map((n) => ({
    val: c(`corporate_stat_${n}_num`),
    label: c(`corporate_stat_${n}_label`),
  }));

  return (
    <section id="corporate" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Visual — left */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div
              className="relative w-full rounded-3xl overflow-hidden shadow-xl"
              style={{ aspectRatio: "4/3" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a3c] via-[#2a5a5c] to-[#3a7a7c]">
                {/* Light ray effect */}
                <div className="absolute inset-0 opacity-20"
                  style={{
                    background: "radial-gradient(ellipse at 30% 30%, #7ED6E0 0%, transparent 60%)",
                  }}
                />
              </div>

              <div className="absolute inset-0 flex items-end p-8">
                <div>
                  <p className="font-playfair text-white/60 text-xs tracking-[0.25em] uppercase mb-2">
                    Corporate Wellness
                  </p>
                  <h3 className="font-playfair text-white text-3xl font-semibold leading-tight whitespace-pre-line">
                    {c("corporate_overlay")}
                  </h3>
                </div>
              </div>

              {/* Gold corner accent */}
              <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-gold/60 rounded-tr-2xl" />
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mt-5">
              {stats.map(({ val, label }, i) => (
                <div key={i} className="bg-champagne rounded-2xl p-4 text-center border border-beige">
                  <p className="font-playfair text-2xl font-bold text-turquoise">{val}</p>
                  <p className="font-inter text-[10px] text-gray-400 mt-1 leading-tight">{label}</p>
                </div>
              ))}
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

            <h2 className="font-cormorant text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-4">
              {c("corporate_headline")}
            </h2>
            <p className="font-inter text-gray-500 text-[15px] leading-relaxed mb-8">
              {c("corporate_body")}
            </p>

            {/* Offerings list */}
            <ul className="space-y-3.5 mb-10">
              {offerings.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-turquoise/10 flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-inter text-[14px] text-gray-600 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="group px-7 py-3.5 bg-gray-900 text-white font-inter font-semibold text-sm rounded-full hover:bg-gray-800 hover:shadow-lg transition-all duration-300"
            >
              {c("corporate_button")}
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
