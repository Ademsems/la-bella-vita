"use client";

import { useEffect, useState } from "react";
import { useI18n, useT } from "@/lib/i18n";

const NAV_ITEMS = [
  { key: "whatIsLbv",       id: "what-is-lbv" },
  { key: "pillars",         id: "pillars" },
  { key: "coaching",        id: "personal-coaching" },
  { key: "transformations", id: "transformations" },
  { key: "community",       id: "community" },
  { key: "corporate",       id: "corporate" },
  { key: "contact",         id: "contact" },
];

export default function Navbar() {
  const { t }                  = useT("nav");
  const { locale, setLocale }  = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 56);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">

        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="La Bella Vita — home"
          className="flex-shrink-0 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-turquoise to-med-blue flex items-center justify-center shadow-md group-hover:shadow-turquoise/40 group-hover:scale-105 transition-all duration-300">
            <span className="text-white font-bold text-xs tracking-[0.15em] font-inter">LBV</span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-7">
          {NAV_ITEMS.map(({ key, id }) => (
            <button
              key={key}
              onClick={() => scrollTo(id)}
              className={`text-[13px] font-medium tracking-wide transition-colors duration-200 hover:text-turquoise ${
                scrolled ? "text-gray-700" : "text-white/90"
              }`}
            >
              {t(key)}
            </button>
          ))}
        </nav>

        {/* Right: locale + book CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLocale(locale === "sk" ? "en" : "sk")}
            className={`text-[11px] font-semibold tracking-widest px-3 py-1.5 rounded-full border transition-all duration-300 hover:scale-105 ${
              scrolled
                ? "border-turquoise text-turquoise hover:bg-turquoise hover:text-white"
                : "border-white/70 text-white hover:bg-white hover:text-turquoise"
            }`}
          >
            {locale === "sk" ? "EN" : "SK"}
          </button>

          <button
            onClick={() => scrollTo("contact")}
            className={`hidden sm:block text-[13px] font-semibold px-5 py-2 rounded-full border transition-all duration-300 hover:scale-105 ${
              scrolled
                ? "bg-turquoise text-white border-turquoise hover:bg-turquoise/90 hover:shadow-lg hover:shadow-turquoise/25"
                : "bg-white/10 backdrop-blur-sm text-white border-white/50 hover:bg-white hover:text-turquoise"
            }`}
          >
            {t("book")}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className={`xl:hidden p-1.5 ${scrolled ? "text-gray-700" : "text-white"}`}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`xl:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-screen" : "max-h-0"}`}>
        <div className="bg-white/98 backdrop-blur-md border-t border-champagne px-5 py-4 flex flex-col gap-1">
          {NAV_ITEMS.map(({ key, id }) => (
            <button
              key={key}
              onClick={() => scrollTo(id)}
              className="text-left py-2.5 text-[14px] font-medium text-gray-700 hover:text-turquoise transition-colors"
            >
              {t(key)}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="mt-3 py-3 bg-turquoise text-white font-semibold rounded-full text-sm hover:bg-turquoise/90 transition-colors"
          >
            {t("book")}
          </button>
        </div>
      </div>
    </header>
  );
}
