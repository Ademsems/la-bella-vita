"use client";

import { useEffect, useState } from "react";
import { useI18n, useT } from "@/lib/i18n";

const navIds = [
  { key: "about", id: "about" },
  { key: "gallery", id: "gallery" },
  { key: "howIWork", id: "how-i-work" },
  { key: "food", id: "food" },
  { key: "financing", id: "financing" },
  { key: "testimonials", id: "testimonials" },
  { key: "community", id: "community" },
  { key: "contact", id: "contact" },
];

export default function Navbar() {
  const { t } = useT("nav");
  const { locale, setLocale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleLocale = () => setLocale(locale === "sk" ? "en" : "sk");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="La Bella Vita"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0BBCD4] to-[#0891b2] flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
            <span className="text-white font-bold text-sm tracking-widest">LVB</span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navIds.map(({ key, id }) => (
            <button
              key={key}
              onClick={() => scrollTo(id)}
              className={`text-sm font-medium transition-colors hover:text-[#0BBCD4] ${
                scrolled ? "text-gray-700" : "text-white"
              }`}
            >
              {t(key)}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLocale}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all hover:scale-105 ${
              scrolled
                ? "border-[#0BBCD4] text-[#0BBCD4] hover:bg-[#0BBCD4] hover:text-white"
                : "border-white text-white hover:bg-white hover:text-[#0BBCD4]"
            }`}
          >
            {locale === "sk" ? "EN" : "SK"}
          </button>

          <button
            onClick={() => scrollTo("contact")}
            className="hidden sm:block text-sm font-semibold px-4 py-2 rounded-full bg-[#0BBCD4] text-white hover:bg-[#0891b2] hover:shadow-lg hover:scale-105 transition-all"
          >
            {t("bookSession")}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden p-1 ${scrolled ? "text-gray-700" : "text-white"}`}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg py-4 px-6 flex flex-col gap-3">
          {navIds.map(({ key, id }) => (
            <button
              key={key}
              onClick={() => scrollTo(id)}
              className="text-left text-gray-700 font-medium hover:text-[#0BBCD4] transition-colors py-1"
            >
              {t(key)}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="mt-2 text-sm font-semibold px-4 py-2 rounded-full bg-[#0BBCD4] text-white hover:bg-[#0891b2] transition-all"
          >
            {t("bookSession")}
          </button>
        </div>
      )}
    </header>
  );
}
