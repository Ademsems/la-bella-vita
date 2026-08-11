"use client";

import { motion } from "framer-motion";
import { useT, useContent } from "@/lib/i18n";
import { useState } from "react";
import { GOOGLE_MAPS_EMBED_URL } from "@/lib/config";

// TODO: Replace GOOGLE_MAPS_EMBED_URL in lib/config.ts with the real Google My Business embed URL
// TODO: Replace GOOGLE_PLACE_ID in lib/config.ts when live Google reviews are needed

export default function ContactSection() {
  const { t } = useT("contact");
  const c = useContent();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    // TODO: Replace console.log with Resend (or similar) API call
    // e.g.: await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) })
    console.log("Contact form submission:", form);
    await new Promise((r) => setTimeout(r, 600)); // simulate latency
    setBusy(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="font-inter text-xs text-turquoise font-semibold uppercase tracking-[0.2em] mb-3">
            {c("contact_tagline")}
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-semibold text-gray-900">
            {t("heading")}
          </h2>
          <p className="mt-4 font-inter text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            {t("subheading")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Form — left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-turquoise/10 flex items-center justify-center mb-5">
                  <svg className="w-8 h-8 text-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-cormorant text-3xl font-semibold text-gray-900 mb-2">
                  {c("contact_success")}
                </h3>
                <div className="h-px w-12 bg-gold mx-auto mt-4" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <input
                  type="text"
                  placeholder={c("contact_field_name")}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-champagne bg-champagne/50 focus:bg-white focus:border-turquoise/50 focus:outline-none focus:ring-2 focus:ring-turquoise/20 transition-all font-inter text-[15px] text-gray-800 placeholder-gray-400"
                />
                {/* Email */}
                <input
                  type="email"
                  placeholder={c("contact_field_email")}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-champagne bg-champagne/50 focus:bg-white focus:border-turquoise/50 focus:outline-none focus:ring-2 focus:ring-turquoise/20 transition-all font-inter text-[15px] text-gray-800 placeholder-gray-400"
                />
                {/* Phone */}
                <input
                  type="tel"
                  placeholder={c("contact_field_phone")}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl border border-champagne bg-champagne/50 focus:bg-white focus:border-turquoise/50 focus:outline-none focus:ring-2 focus:ring-turquoise/20 transition-all font-inter text-[15px] text-gray-800 placeholder-gray-400"
                />
                {/* Message */}
                <textarea
                  placeholder={c("contact_field_message")}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-champagne bg-champagne/50 focus:bg-white focus:border-turquoise/50 focus:outline-none focus:ring-2 focus:ring-turquoise/20 transition-all font-inter text-[15px] text-gray-800 placeholder-gray-400 resize-none"
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="w-full py-4 bg-turquoise text-white font-inter font-semibold text-sm rounded-2xl hover:bg-turquoise/90 hover:shadow-lg hover:shadow-turquoise/25 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {busy ? "..." : c("contact_button")}
                </button>
              </form>
            )}
          </motion.div>

          {/* Map — right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="rounded-3xl overflow-hidden min-h-[420px] shadow-sm border border-champagne"
          >
            {GOOGLE_MAPS_EMBED_URL ? (
              <iframe
                src={GOOGLE_MAPS_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "420px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="La Bella Vita — Google Maps"
              />
            ) : (
              /* TODO: Set GOOGLE_MAPS_EMBED_URL in lib/config.ts */
              <div className="w-full h-full min-h-[420px] bg-gradient-to-br from-turquoise/8 to-med-blue/10 flex flex-col items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-full bg-turquoise/10 flex items-center justify-center">
                  <svg className="w-7 h-7 text-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="font-inter text-sm text-gray-400 font-medium">{t("mapFallback")}</p>
                <div className="h-px w-8 bg-gold/40" />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
