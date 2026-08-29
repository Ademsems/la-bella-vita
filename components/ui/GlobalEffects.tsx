"use client";

/**
 * Mounted once in app/layout.tsx. Purely decorative, pointer-events-none —
 * can never block interaction or break a page that fails to load it.
 */
export default function GlobalEffects() {
  return <div className="grain-overlay" aria-hidden="true" />;
}
