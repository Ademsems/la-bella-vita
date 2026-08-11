"use client";

import { motion } from "framer-motion";
import { useContent } from "@/lib/i18n";

export default function QuoteSection() {
  const c = useContent();

  return (
    <section className="py-28 bg-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Opening quotation mark */}
          <div className="font-cormorant text-7xl text-turquoise/30 leading-none mb-2 select-none">&ldquo;</div>

          <blockquote className="font-cormorant text-3xl sm:text-4xl md:text-5xl italic text-gray-800 leading-snug font-light">
            {c("quote_text")}
          </blockquote>

          {/* Gold underline */}
          <div className="flex justify-center mt-8 mb-6">
            <div className="h-px w-16 bg-gold" />
          </div>

          <p className="font-inter text-sm text-gray-400 tracking-widest uppercase">
            {c("quote_author")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
