"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface HudHotspotProps {
  label: string;
  detail: string;
  style?: React.CSSProperties;
}

/**
 * Pulsing luxury HUD marker. Hover/tap expands a glass detail card — used
 * over the Visbody/coaching showcase visuals. Positioned absolutely by the
 * parent via the `style` prop (expects a `position: relative` ancestor).
 */
export default function HudHotspot({ label, detail, style }: HudHotspotProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="absolute z-20"
      style={style}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((v) => !v)}
    >
      <span className="relative flex h-3.5 w-3.5 cursor-pointer">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/60" />
        <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-gold border border-white/70 shadow-md" />
      </span>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="glass-luxury absolute left-1/2 top-6 z-30 w-48 -translate-x-1/2 rounded-2xl p-3 text-left"
          >
            <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.15em] text-turquoise mb-1">
              {label}
            </p>
            <p className="font-inter text-[12px] leading-snug text-gray-700">{detail}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
