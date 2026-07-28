"use client";

import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";

export default function WhatIsLBVSection() {
  const { t, tRaw } = useT("whatIsLbv");
  const lines  = tRaw("lines")  as string[];
  const lines2 = tRaw("lines2") as string[];

  return (
    <section id="what-is-lbv" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="font-inter text-xs text-turquoise font-semibold uppercase tracking-[0.2em] mb-4">
            {t("tag")}
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-semibold text-gray-900 mb-10">
            {t("heading")}
          </h2>
        </motion.div>

        {/* Staggered lines */}
        <div className="space-y-3 mb-10">
          {Array.isArray(lines) && lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
              className="font-cormorant text-2xl md:text-3xl text-gray-700 italic font-light"
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Divider quote */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-center gap-4 my-10 max-w-xs mx-auto"
        >
          <div className="flex-1 h-px bg-gold/40" />
          <span className="text-gold text-lg">✦</span>
          <div className="flex-1 h-px bg-gold/40" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="font-cormorant text-3xl md:text-4xl font-semibold text-turquoise mb-4"
        >
          {t("divider")}
        </motion.p>

        <div className="space-y-2 mb-10">
          {Array.isArray(lines2) && lines2.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="font-cormorant text-2xl md:text-3xl text-gray-700 italic font-light"
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="font-inter text-base text-gray-500 leading-relaxed max-w-2xl mx-auto"
        >
          {t("closing")}
        </motion.p>
      </div>
    </section>
  );
}
