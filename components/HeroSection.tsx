"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/lib/i18n";

const slides = [
  { gradient: "from-[#0BBCD4] via-[#0891b2] to-[#0e7490]" },
  { gradient: "from-[#F472B6] via-[#ec4899] to-[#be185d]" },
  { gradient: "from-[#0BBCD4] via-[#a855f7] to-[#F472B6]" },
  { gradient: "from-[#0e7490] via-[#0BBCD4] to-[#67e8f9]" },
  { gradient: "from-[#be185d] via-[#F472B6] to-[#fda4af]" },
];

export default function HeroSection() {
  const { t } = useT("hero");
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className={`absolute inset-0 bg-gradient-to-br ${slides[current].gradient}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full border border-white/10 animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full border border-white/10 animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 shadow-2xl">
            <span className="text-white font-bold text-2xl tracking-widest">LVB</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl leading-tight mb-6"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {t("heading")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-white/90 max-w-2xl mb-10"
        >
          {t("subheading")}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          className="px-8 py-4 bg-white text-[#0BBCD4] font-semibold rounded-full text-lg shadow-2xl hover:shadow-[#0BBCD4]/30 hover:scale-105 hover:bg-[#0BBCD4] hover:text-white transition-all duration-300"
        >
          {t("cta")}
        </motion.button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-white" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
