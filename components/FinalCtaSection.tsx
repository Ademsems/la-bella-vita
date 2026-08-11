"use client";

import { motion } from "framer-motion";
import { useContent } from "@/lib/i18n";

export default function FinalCtaSection() {
  const c = useContent();

  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative overflow-hidden py-28 bg-gray-950">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 40%, #4BC6C8 0%, transparent 55%), radial-gradient(circle at 80% 60%, #F4D7D0 0%, transparent 50%)",
        }}
      />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-16 bg-gold/40" />
            <span className="text-gold/60 text-sm">✦</span>
            <div className="h-px w-16 bg-gold/40" />
          </div>

          <p className="font-cormorant text-3xl md:text-4xl lg:text-5xl italic text-white font-light leading-snug mb-3">
            {c("finalcta_line_1")}
          </p>
          <p className="font-cormorant text-3xl md:text-4xl lg:text-5xl italic text-white/80 font-light leading-snug mb-8">
            {c("finalcta_line_2")}
          </p>

          <div className="h-px w-12 bg-gold/40 mx-auto mb-8" />

          <p className="font-playfair text-xl md:text-2xl text-turquoise font-semibold mb-2">
            {c("finalcta_line_3")}
          </p>
          <p className="font-playfair text-xl md:text-2xl text-turquoise font-semibold mb-12">
            {c("finalcta_line_4")}
          </p>

          <button
            onClick={scrollToContact}
            className="group px-10 py-4 bg-turquoise text-white font-inter font-semibold text-sm rounded-full hover:bg-turquoise/90 hover:shadow-xl hover:shadow-turquoise/30 transition-all duration-400 border border-turquoise/0 hover:border-turquoise"
          >
            {c("finalcta_button")}
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
