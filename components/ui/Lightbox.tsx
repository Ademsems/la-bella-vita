"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";

export interface LightboxImage {
  src: string;
  alt: string;
  /** width / height of the source photo — sizes the frame so nothing is cropped. */
  ratio: number;
}

interface LightboxProps {
  images: LightboxImage[];
  /** Active image index, or null when closed. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  labels: { close: string; prev: string; next: string };
}

const SWIPE_DISTANCE = 70;
const SWIPE_VELOCITY = 450;

/** Frame height as a share of the viewport height. */
const FRAME_VH = 70;

/**
 * `sizes` for the stage image. The frame is min(88vw, FRAME_VH * ratio) wide; every photo is
 * a ~0.56 portrait, so ~40vh covers it. The hidden neighbour preloads use the SAME string, so
 * the browser requests the exact same optimized URL and navigation hits the cache.
 */
const STAGE_SIZES = "min(88vw, 40vh)";

// Opacity + scale only (swipe/drag supplies the directional motion)
const fade = {
  enter: { opacity: 0, scale: 0.94 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.94 },
};

const ARROW_BTN =
  "flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-white/10 text-gold " +
  "shadow-[0_0_20px_rgba(75,198,200,0.25)] backdrop-blur-xl transition-all duration-300 " +
  "hover:scale-110 hover:border-turquoise hover:bg-turquoise/20 hover:text-white " +
  "hover:shadow-[0_0_28px_rgba(75,198,200,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-turquoise";

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}

/**
 * Full-screen floating photo viewer — frosted-glass frame, backdrop blur, gold/turquoise arrow
 * controls, swipe + keyboard navigation, and a 3-tile dock (previous · active · next) whose
 * active tile carries an animated gold/turquoise beam ring. Rendered through a portal into
 * <body>: every <section> carries `will-change: transform` (globals.css), which would turn a
 * `position: fixed` overlay into one positioned relative to the section instead of the screen.
 *
 * Every image keeps the project's graceful-degradation contract: if a file fails to load,
 * the brand gradient shows instead of a broken-image icon.
 */
export default function Lightbox({ images, index, onClose, onIndexChange, labels }: LightboxProps) {
  const [mounted, setMounted] = useState(false);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const dialogRef = useRef<HTMLDivElement>(null);
  const open = index !== null && images.length > 0;
  const count = images.length;

  useEffect(() => setMounted(true), []);

  const go = useCallback(
    (delta: number) => {
      if (index === null || count < 2) return;
      onIndexChange((index + delta + count) % count);
    },
    [index, count, onIndexChange]
  );

  // Keyboard: ← / → navigate, Esc closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go, onClose]);

  // Lock page scroll while open, move focus into the dialog, restore it on close
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) go(1);
    else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) go(-1);
  };

  if (!mounted) return null;

  const current = index !== null ? images[index] : null;
  const prevIndex = index !== null ? (index - 1 + count) % count : 0;
  const nextIndex = index !== null ? (index + 1) % count : 0;
  const thumbIndexes =
    index !== null ? Array.from(new Set([prevIndex, index, nextIndex])) : [];
  const preloadIndexes =
    index !== null && count > 1 ? Array.from(new Set([prevIndex, nextIndex])).filter((i) => i !== index) : [];

  const markFailed = (src: string) => setFailed((f) => ({ ...f, [src]: true }));

  return createPortal(
    <AnimatePresence>
      {open && current && index !== null && (
        <motion.div
          key="lightbox"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-[100] outline-none"
        >
          {/* Backdrop — click anywhere outside the frame to close */}
          <div
            className="absolute inset-0 bg-[#0d1f20]/70 backdrop-blur-xl"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Close */}
          <button
            onClick={onClose}
            aria-label={labels.close}
            className={`absolute right-4 top-4 z-20 !h-11 !w-11 sm:right-8 sm:top-8 ${ARROW_BTN}`}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {/* Counter */}
          {count > 1 && (
            <p className="absolute left-1/2 top-6 z-20 -translate-x-1/2 font-inter text-[11px] font-medium uppercase tracking-[0.3em] text-white/70 sm:top-9">
              {index + 1} / {count}
            </p>
          )}

          {/* Arrows */}
          {count > 1 && (
            <>
              <button
                onClick={() => go(-1)}
                aria-label={labels.prev}
                className={`absolute left-3 top-1/2 z-20 -translate-y-1/2 sm:left-8 ${ARROW_BTN}`}
              >
                <Chevron dir="left" />
              </button>
              <button
                onClick={() => go(1)}
                aria-label={labels.next}
                className={`absolute right-3 top-1/2 z-20 -translate-y-1/2 sm:right-8 ${ARROW_BTN}`}
              >
                <Chevron dir="right" />
              </button>
            </>
          )}

          {/* Stage */}
          <div className="pointer-events-none relative z-10 flex h-full items-center justify-center pb-28 pt-16">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                variants={fade}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
                drag="x"
                dragSnapToOrigin
                dragElastic={0.25}
                onDragEnd={handleDragEnd}
                className="pointer-events-auto cursor-grab rounded-[28px] border border-white/20 bg-white/10 p-2 shadow-[0_25px_50px_-12px_rgba(75,198,200,0.25)] ring-1 ring-gold/30 backdrop-blur-2xl active:cursor-grabbing sm:p-2.5"
              >
                <div
                  className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#4BC6C8] via-[#7ED6E0] to-[#F4D7D0]"
                  style={{
                    aspectRatio: current.ratio,
                    width: `min(88vw, calc(${FRAME_VH}vh * ${current.ratio}))`,
                  }}
                >
                  {failed[current.src] ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="h-12 w-12 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  ) : (
                    <Image
                      src={current.src}
                      alt={current.alt}
                      fill
                      priority
                      draggable={false}
                      sizes={STAGE_SIZES}
                      className="select-none object-cover"
                      onError={() => markFailed(current.src)}
                    />
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Warm the cache for the previous/next photo (same `sizes` → same optimized URL) */}
          {preloadIndexes.map((i) =>
            failed[images[i].src] ? null : (
              <div key={`preload-${i}`} className="sr-only" aria-hidden="true">
                <Image
                  src={images[i].src}
                  alt=""
                  fill
                  loading="eager"
                  sizes={STAGE_SIZES}
                  onError={() => markFailed(images[i].src)}
                />
              </div>
            )
          )}

          {/* Thumbnail dock — previous · active · next */}
          {count > 1 && (
            <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-2.5 shadow-[0_8px_32px_rgba(75,198,200,0.15)] backdrop-blur-2xl sm:bottom-8">
              {thumbIndexes.map((i) => {
                const img = images[i];
                const active = i === index;
                return (
                  <button
                    key={i}
                    onClick={() => onIndexChange(i)}
                    aria-label={img.alt}
                    aria-current={active}
                    className={`rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-turquoise ${
                      active
                        ? "beam-ring h-[76px] w-[56px]"
                        : "h-16 w-12 opacity-60 hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    {/* The ring is drawn outside the button, so the clipping lives on this inner box */}
                    <span className="relative block h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#4BC6C8] via-[#7ED6E0] to-[#F4D7D0]">
                      {!failed[img.src] && (
                        <Image
                          src={img.src}
                          alt=""
                          fill
                          draggable={false}
                          sizes="64px"
                          className="object-cover object-[center_20%]"
                          onError={() => markFailed(img.src)}
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
