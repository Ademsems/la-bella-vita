"use client";

import { useT } from "@/lib/i18n";

const LINKS = [
  { key: "whatIsLbv",       id: "what-is-lbv" },
  { key: "pillars",         id: "pillars" },
  { key: "community",       id: "community" },
  { key: "corporate",       id: "corporate" },
  { key: "contact",         id: "contact" },
];

export default function Footer() {
  const { t }    = useT("footer");
  const { t: tNav } = useT("nav");

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-gray-950 text-white">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">

          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-turquoise to-med-blue flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xs tracking-[0.15em] font-inter">LBV</span>
              </div>
              <span className="font-display text-xl font-semibold">La Bella Vita</span>
            </div>
            <p className="font-heading text-lg italic text-gray-400">{t("tagline")}</p>
          </div>

          <nav className="flex flex-wrap gap-x-7 gap-y-2">
            {LINKS.map(({ key, id }) => (
              <button
                key={key}
                onClick={() => scrollTo(id)}
                className="font-inter text-sm text-gray-400 hover:text-turquoise transition-colors"
              >
                {tNav(key)}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-inter text-xs text-gray-600">
            © {new Date().getFullYear()} La Bella Vita. {t("rights")}
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-turquoise/60" />
            <span className="font-inter text-xs text-gray-600">Made with love in Slovakia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
