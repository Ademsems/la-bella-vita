"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";

export default function MyStorySection() {
  const { t } = useT("myStory");
  const [imgFailed, setImgFailed] = useState(false);

  const paragraphs = ["body1", "body2", "body3", "body4", "body5", "body6", "body7"];

  return (
    <section id="my-story" className="py-24 bg-beige">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Photo placeholder — left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-br from-[#4BC6C8] via-[#7ED6E0] to-[#a8e8eb] shadow-2xl">
              {!imgFailed ? (
                <Image
                  src="/images/05-moj-pribeh.jpg"
                  alt={t("heading")}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-white/30 mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-12 h-12 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <p className="font-inter text-white/50 text-xs">Alessandro</p>
                  </div>
                </div>
              )}
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-gold/10 -z-10" />
            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-turquoise/10 -z-10" />
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
            <h2 className="font-cormorant text-5xl md:text-6xl font-semibold text-gray-900 mb-8">
              {t("heading")}
            </h2>

            <div className="space-y-4">
              {paragraphs.map((key) => (
                <p key={key} className="font-inter text-[15px] text-gray-600 leading-relaxed">
                  {t(key)}
                </p>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-gold/30" />
              <p className="font-cormorant text-xl italic text-gold font-light">
                {t("signature")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
