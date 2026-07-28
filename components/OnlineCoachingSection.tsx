"use client";

import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";
import { TRAINERIZE_URL } from "@/lib/config";

export default function OnlineCoachingSection() {
  const { t, tRaw } = useT("onlineCoaching");
  const features = tRaw("features") as string[];

  const ICONS = [
    // Training
    <svg key="training" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>,
    // Nutrition
    <svg key="nutrition" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>,
    // Progress
    <svg key="progress" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>,
    // Communication
    <svg key="comm" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>,
    // Support
    <svg key="support" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>,
  ];

  return (
    <section id="online-coaching" className="py-24 bg-champagne">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Visual — left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[#4BC6C8] via-[#3ab5b7] to-[#2a9496] shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-10 h-10 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="font-inter text-white/60 text-xs">Trainerize</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -right-5 w-28 h-28 rounded-full bg-turquoise/10 -z-10" />
          </motion.div>

          {/* Text — right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="font-inter text-xs text-turquoise font-semibold uppercase tracking-[0.2em] mb-4">
              {t("tag")}
            </p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-semibold text-gray-900 mb-6">
              {t("heading")}
            </h2>
            <p className="font-inter text-[15px] text-gray-500 leading-relaxed mb-8">
              {t("body1")}
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {Array.isArray(features) && features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2.5 bg-white rounded-full px-4 py-2.5 shadow-sm border border-champagne">
                  <span className="text-turquoise">{ICONS[i]}</span>
                  <span className="font-inter text-sm font-medium text-gray-700">{feat}</span>
                </div>
              ))}
            </div>

            <p className="font-inter text-[15px] text-gray-500 leading-relaxed mb-8">
              {t("body2")}
            </p>

            {TRAINERIZE_URL ? (
              <a
                href={TRAINERIZE_URL}
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
        </div>
      </div>
    </section>
  );
}
