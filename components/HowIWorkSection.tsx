"use client";

import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";

const STEP_ICONS = [
  // Handshake / meeting
  <svg key="0" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
  // Body scan
  <svg key="1" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>,
  // Plan
  <svg key="2" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>,
  // Journey / progress
  <svg key="3" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>,
];

export default function HowIWorkSection() {
  const { t, tRaw } = useT("howIWork");
  const steps = tRaw("steps") as { title: string; desc: string }[];

  return (
    <section id="how-i-work" className="py-24 bg-white">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.isArray(steps) && steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
              className="group relative bg-champagne rounded-3xl p-8 hover:bg-beige hover:shadow-lg hover:-translate-y-1 transition-all duration-400 border border-transparent hover:border-gold/20"
            >
              {/* Step number — faint behind */}
              <span className="absolute top-5 right-6 font-playfair text-6xl font-bold text-beige group-hover:text-champagne transition-colors select-none leading-none">
                {i + 1}
              </span>

              {/* Icon */}
              <div className="relative w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 text-turquoise shadow-sm group-hover:shadow-turquoise/20 group-hover:scale-110 transition-all duration-300">
                {STEP_ICONS[i]}
              </div>

              <h3 className="font-cormorant text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="font-inter text-sm text-gray-500 leading-relaxed">
                {step.desc}
              </p>

              {/* Gold bottom accent on hover */}
              <div className="absolute bottom-0 inset-x-8 h-px bg-gold/0 group-hover:bg-gold/40 transition-all duration-400 rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
