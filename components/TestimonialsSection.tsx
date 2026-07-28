"use client";

import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";

export default function TestimonialsSection() {
  const { t, tRaw } = useT("testimonials");
  const items = tRaw("items") as { name: string; quote: string }[];

  return (
    <section id="testimonials" className="py-24 bg-beige">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="font-inter text-xs text-turquoise font-semibold uppercase tracking-[0.2em] mb-3">
            {t("tag")}
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-semibold text-gray-900">
            {t("heading")}
          </h2>
          <p className="mt-4 font-inter text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            {t("subheading")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.isArray(items) && items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-champagne hover:border-gold/30 hover:shadow-lg transition-all duration-400"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, s) => (
                  <svg key={s} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="font-inter text-[14px] text-gray-600 leading-relaxed mb-6 italic">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Name */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-turquoise/40 to-med-blue/40 flex-shrink-0" />
                <p className="font-inter text-sm font-semibold text-gray-900">{item.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
