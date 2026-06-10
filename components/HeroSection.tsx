"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";
import { HERO_VIDEO_URL } from "@/lib/config";

export default function HeroSection() {
  const { t } = useT("hero");
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* ── Background: video OR gradient fallback ─────────────────────── */}
      {HERO_VIDEO_URL ? (
        <video
          ref={videoRef}
          src={HERO_VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        /* Gradient fallback — slow Ken Burns on a colour wash */
        <div className="absolute inset-0 bg-gradient-to-br from-[#3ab5b7] via-[#5ecdd0] to-[#a8e6e8] overflow-hidden">
          {/* Animated blob shapes for visual interest */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 30% 40%, #7ED6E0 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 70% 70%, #F4D7D0 0%, transparent 60%)",
              animation: "ken-burns 12s ease-in-out infinite alternate",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}

      {/* ── Dark overlay ────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/50" />

      {/* ── Soft bottom vignette ────────────────────────────────────────── */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.35em" }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="text-white/70 text-xs font-inter font-medium tracking-[0.35em] uppercase mb-6"
        >
          Wellness · Movement · Community
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="font-playfair text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-wider leading-none mb-5"
        >
          {t("headline")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="font-cormorant text-2xl sm:text-3xl text-white/90 italic font-light mb-12"
        >
          {t("subheadline")}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          onClick={scrollToContact}
          className="group px-9 py-4 bg-white text-turquoise font-inter font-semibold text-sm tracking-wide rounded-full border border-gold hover:bg-turquoise hover:text-white hover:border-turquoise shadow-lg hover:shadow-turquoise/30 transition-all duration-400"
        >
          {t("cta")}
          <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
        </motion.button>
      </div>

      {/* ── Scroll indicator ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-[10px] font-inter tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
