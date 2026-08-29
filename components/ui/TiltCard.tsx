"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  style?: React.CSSProperties;
}

/**
 * Pointer-driven 3D tilt wrapper (rotateX/rotateY + subtle scale) for the
 * luxury motion pass. Wrap around a card's visual content — keep entrance
 * animations (opacity/y whileInView) on an outer motion.div, since this
 * component only owns the pointer-follow tilt, not scroll entrance.
 */
export default function TiltCard({ children, className = "", intensity = 10, style }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [intensity, -intensity]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-intensity, intensity]), {
    stiffness: 220,
    damping: 22,
  });
  const scale = useSpring(1, { stiffness: 220, damping: 22 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseEnter() {
    scale.set(1.02);
  }

  function handleMouseLeave() {
    px.set(0.5);
    py.set(0.5);
    scale.set(1);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ ...style, rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
      className={`tilt-perspective ${className}`}
    >
      {children}
    </motion.div>
  );
}
