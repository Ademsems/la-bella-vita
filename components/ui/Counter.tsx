"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

interface CounterProps {
  value: string;
  className?: string;
  duration?: number;
}

/**
 * Scroll-triggered count-up for stat tiles. Content is sheet-driven free text
 * (e.g. "50+", "98%", "10 rokov"), so this parses the first numeric run and
 * animates just that, keeping any prefix/suffix text intact. Values with no
 * numeric run render as-is — never throws on unexpected sheet content.
 */
export default function Counter({ value, className = "", duration = 1.6 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const match = value.match(/[\d.]+/);
  const [display, setDisplay] = useState(match ? value.replace(match[0], "0") : value);

  useEffect(() => {
    if (!isInView || !match) return;
    const num = parseFloat(match[0]);
    const prefix = value.slice(0, match.index);
    const suffix = value.slice((match.index ?? 0) + match[0].length);
    const isInt = Number.isInteger(num);

    const controls = animate(0, num, {
      duration,
      ease: "easeOut",
      onUpdate(v) {
        const formatted = isInt ? Math.round(v).toString() : v.toFixed(1);
        setDisplay(`${prefix}${formatted}${suffix}`);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
