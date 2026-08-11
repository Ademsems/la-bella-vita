"use client";

import { motion } from "framer-motion";
import { useContent } from "@/lib/i18n";

interface Props {
  variant: "cta1" | "cta2";
}

const BAND_GRADIENTS = {
  cta1: "from-[#4BC6C8] via-[#5dcfd1] to-[#7ED6E0]",
  cta2: "from-[#3a9ea0] via-[#4BC6C8] to-[#7ED6E0]",
};

export default function CtaBand({ variant }: Props) {
  const c = useContent();
  const line = c(`${variant}_line`);
  const button = c(`${variant}_button`);

  return (
    <section className="relative overflow-hidden py-20">
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-r ${BAND_GRADIENTS[variant]}`} />

      {/* Subtle texture layer */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #F5EFE6 0%, transparent 50%), radial-gradient(circle at 80% 50%, #F4D7D0 0%, transparent 50%)",
        }}
      />

      {/* Gold top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gold/30" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gold/30" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="font-cormorant text-3xl sm:text-4xl md:text-5xl italic text-white font-light mb-8 leading-snug">
            {line}
          </p>

          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="group px-9 py-4 bg-white text-turquoise font-inter font-semibold text-sm tracking-wide rounded-full border border-gold hover:bg-gold hover:text-white hover:border-gold shadow-xl hover:shadow-white/20 transition-all duration-400"
          >
            {button}
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
