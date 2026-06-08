"use client";

import { useT } from "@/lib/i18n";

export default function Footer() {
  const { t } = useT("footer");

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0BBCD4] to-[#0891b2] flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm tracking-widest">LVB</span>
            </div>
            <div>
              <p className="font-semibold text-lg">La Bella Vita</p>
              <p className="text-gray-400 text-sm">{t("tagline")}</p>
            </div>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} La Bella Vita. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
