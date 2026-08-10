"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";

export default function PersonalCoachingSection() {
  const { t, tRaw } = useT("personalCoaching");
  const inclusions = tRaw("inclusions") as string[];
  const [imgFailed, setImgFailed] = useState(false);

  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="personal-coaching" className="py-24 bg-white">
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
            <h2 className="font-cormorant text-5xl md:text-6xl font-semibold text-gray-900 mb-6">
              {t("heading")}
            </h2>

            <div className="space-y-3 mb-8">
              <p className="font-cormorant text-2xl italic text-gray-600 font-light">{t("intro1")}</p>
              <p className="font-cormorant text-2xl italic text-gray-600 font-light">{t("intro2")}</p>
              <p className="font-inter text-[15px] text-gray-500 leading-relaxed">{t("intro3")}</p>
            </div>

            <div className="bg-champagne/60 rounded-2xl p-6 mb-8">
              <p className="font-inter text-sm font-semibold text-gray-800 mb-4 uppercase tracking-[0.1em]">
                {t("inclLabel")}
              </p>
              <ul className="space-y-2.5">
                {Array.isArray(inclusions) && inclusions.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-turquoise/15 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-inter text-[14px] text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={scrollToContact}
              className="group px-8 py-3.5 bg-turquoise text-white font-inter font-semibold text-sm rounded-full hover:bg-turquoise/90 hover:shadow-lg hover:shadow-turquoise/25 transition-all duration-300"
            >
              {t("cta")}
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </motion.div>

          {/* Visual — right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[#EDE4D8] via-[#d8ccbc] to-[#c4b4a0] shadow-xl">
              {!imgFailed ? (
                <Image
                  src="/images/06-individualny-pristup.jpg"
                  alt={t("heading")}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 rounded-full bg-white/30 mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-10 h-10 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <p className="font-inter text-white/50 text-xs">Osobný coaching</p>
                  </div>
                </div>
              )}
            </div>
            <div className="absolute -bottom-5 -left-5 w-28 h-28 rounded-full bg-powder-pink/30 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
