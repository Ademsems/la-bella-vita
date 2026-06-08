"use client";

import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";

const tiles = [
  { id: 0, tall: true },
  { id: 1, tall: false },
  { id: 2, tall: false },
  { id: 3, tall: false },
  { id: 4, tall: true },
  { id: 5, tall: false },
];

function ShimmerTile({ label, tall }: { label: string; tall?: boolean }) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden shimmer-bg ${tall ? "row-span-2" : ""}`}
      style={{ minHeight: tall ? "380px" : "180px" }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 rounded-full bg-white/60 mx-auto mb-2 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-xs text-gray-400 font-medium">{label}</p>
        </div>
      </div>
    </div>
  );
}

export default function GallerySection() {
  const { t } = useT("gallery");

  return (
    <section id="gallery" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#0BBCD4] font-semibold text-sm uppercase tracking-widest">{t("tag")}</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">{t("heading")}</h2>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">{t("subheading")}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4" style={{ gridAutoRows: "180px" }}>
          {tiles.map((tile, i) => (
            <motion.div
              key={tile.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`hover:scale-[1.02] transition-transform duration-300 ${tile.tall ? "row-span-2" : ""}`}
            >
              <ShimmerTile label={t("comingSoon")} tall={tile.tall} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
