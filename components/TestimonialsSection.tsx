"use client";

import { motion } from "framer-motion";
import { useT, useContent, useI18n } from "@/lib/i18n";
import { GOOGLE_MAPS_URL } from "@/lib/config";
import type { ReviewsData } from "@/lib/reviews";

/** "6 months ago" / "pred 6 mesiacmi" from an ISO date, in the visitor's language. */
function relativeTime(iso: string | null, locale: string): string {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const days = Math.round((then - Date.now()) / 86_400_000);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  if (Math.abs(days) < 30) return rtf.format(Math.round(days / 7), "week");
  if (Math.abs(days) < 365) return rtf.format(Math.round(days / 30), "month");
  return rtf.format(Math.round(days / 365), "year");
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${count} / 5`}>
      {[...Array(5)].map((_, s) => (
        <svg
          key={s}
          className={`w-4 h-4 ${s < count ? "text-amber" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// Data comes from lib/reviews.ts (live Google Places data, or the curated real reviews).
// Every card links to the verified Google Maps listing.
export default function TestimonialsSection({ data }: { data: ReviewsData }) {
  const { t } = useT("testimonials");
  const { locale } = useI18n();
  const c = useContent();
  const lang = locale === "en" ? "en" : "sk";

  return (
    <section id="testimonials" className="py-24 bg-beige">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <p className="font-inter text-xs text-turquoise font-semibold uppercase tracking-[0.2em] mb-3">
            {t("tag")}
          </p>
          <h2 className="font-heading text-5xl md:text-6xl font-semibold text-gray-900">
            {t("heading")}
          </h2>
          <p className="mt-4 font-inter text-gray-600 text-base max-w-xl mx-auto leading-relaxed">
            {c("reviews_tagline")}
          </p>

          {/* Aggregate rating */}
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("ratingLabel")}
            className="mt-6 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full border border-amber/40 bg-white px-5 py-2.5 shadow-sm transition-all hover:border-amber hover:shadow-md"
          >
            <span className="font-display text-2xl font-semibold text-gray-900">
              {data.rating.toFixed(1).replace(".", lang === "sk" ? "," : ".")}
            </span>
            <Stars count={Math.round(data.rating)} />
            <span className="font-inter text-sm text-gray-600">
              {t("basedOn").replace("{count}", String(data.count))}
            </span>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.reviews.map((review, i) => {
            const when = relativeTime(review.date, locale);
            return (
              <motion.a
                key={review.id}
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${review.author} — ${t("googleLabel")} — ${t("viewOnGoogle")}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: Math.min(i, 5) * 0.1, ease: "easeOut" }}
                className="group flex flex-col bg-white rounded-3xl p-7 sm:p-8 shadow-sm border border-champagne hover:border-amber/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber"
              >
                <div className="flex items-center justify-between mb-5">
                  <Stars count={review.rating} />
                  <span className="font-inter text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    {t("googleLabel")}
                  </span>
                </div>

                <p className="font-inter text-[14px] text-gray-700 leading-relaxed mb-6 line-clamp-[9]">
                  &ldquo;{review.text[lang]}&rdquo;
                </p>

                <div className="mt-auto flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-turquoise/50 to-med-blue/50 flex-shrink-0 flex items-center justify-center font-inter text-sm font-semibold text-gray-800"
                    aria-hidden="true"
                  >
                    {review.author.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-inter text-sm font-semibold text-gray-900 truncate">{review.author}</p>
                    {when && <p className="font-inter text-xs text-gray-500">{when}</p>}
                  </div>
                  <span className="ml-auto hidden pl-2 font-inter text-xs font-medium text-amber-dark whitespace-nowrap sm:inline-block sm:opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    {t("viewOnGoogle")} ↗
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
