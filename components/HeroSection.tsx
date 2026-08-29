"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useT, useContent } from "@/lib/i18n";
import { HERO_VIDEO_URL } from "@/lib/config";

export default function HeroSection() {
  const { t } = useT("hero");
  const c = useContent();
  const videoRef = useRef<HTMLVideoElement>(null);

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const springX = useSpring(glowX, { stiffness: 60, damping: 20 });
  const springY = useSpring(glowY, { stiffness: 60, damping: 20 });
  const glowLeft = useTransform(springX, (v) => `${v}%`);
  const glowTop = useTransform(springY, (v) => `${v}%`);

  function handlePointerMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      onMouseMove={handlePointerMove}
      className="relative min-h-screen w-full overflow-hidden flex flex-col"
    >
      {/* Ambient mouse-tracking spotlight (luxury motion pass) */}
      <motion.div
        className="pointer-events-none absolute z-[1] hidden md:block h-[560px] w-[560px] rounded-full bg-gradient-to-r from-[#4BC6C8]/20 via-[#F4D7D0]/15 to-transparent blur-3xl"
        style={{ left: glowLeft, top: glowTop, x: "-50%", y: "-50%" }}
      />

      {/* Background: video OR gradient fallback */}
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
        <div className="absolute inset-0 bg-gradient-to-br from-[#3ab5b7] via-[#5ecdd0] to-[#a8e6e8] overflow-hidden">
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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-32">
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
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-wider leading-none mb-5"
        >
          {t("headline")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="font-heading text-2xl sm:text-3xl text-white/90 italic font-light mb-10"
        >
          {c("hero_subheadline")}
        </motion.p>

        {/* Body copy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease: "easeOut" }}
          className="max-w-2xl mx-auto mb-10 space-y-3"
        >
          {["hero_paragraph_1", "hero_paragraph_2", "hero_paragraph_3", "hero_paragraph_4"].map((key) => (
            <p key={key} className="font-inter text-white/75 text-sm sm:text-base leading-relaxed">
              {c(key)}
            </p>
          ))}
          <p className="font-heading text-white/90 text-xl italic font-light pt-2">
            {c("hero_welcome")}
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
          onClick={scrollToContact}
          className="group btn-sheen px-9 py-4 bg-white text-turquoise font-inter font-semibold text-sm tracking-wide rounded-full border border-gold hover:bg-turquoise hover:text-white hover:border-turquoise hover:scale-105 shadow-lg hover:shadow-turquoise/30 transition-all duration-400"
        >
          {c("hero_button")}
          <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-[10px] font-inter tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
