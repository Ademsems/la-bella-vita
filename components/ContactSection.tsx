"use client";

import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";
import { useState } from "react";

// TODO: Replace with the real Google My Business embed URL
const GOOGLE_MAPS_EMBED_URL = "";

export default function ContactSection() {
  const { t } = useT("contact");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up form submission (email service / API route)
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-gray-50">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-[#0BBCD4] flex items-center justify-center mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Ďakujeme!</h3>
                <p className="text-gray-600">Ozveme sa vám do 24 hodín.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  placeholder={t("name")}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0BBCD4] focus:border-transparent transition text-gray-900 placeholder-gray-400"
                />
                <input
                  type="email"
                  placeholder={t("email")}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0BBCD4] focus:border-transparent transition text-gray-900 placeholder-gray-400"
                />
                <input
                  type="tel"
                  placeholder={t("phone")}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0BBCD4] focus:border-transparent transition text-gray-900 placeholder-gray-400"
                />
                <textarea
                  placeholder={t("message")}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0BBCD4] focus:border-transparent transition text-gray-900 placeholder-gray-400 resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-4 bg-[#0BBCD4] text-white font-semibold rounded-2xl hover:bg-[#0891b2] hover:shadow-lg hover:shadow-[#0BBCD4]/30 transition-all duration-300 text-lg"
                >
                  {t("submit")}
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl overflow-hidden shadow-lg min-h-[400px]"
          >
            {GOOGLE_MAPS_EMBED_URL ? (
              <iframe
                src={GOOGLE_MAPS_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              />
            ) : (
              /* TODO: Replace GOOGLE_MAPS_EMBED_URL with the real Google My Business embed URL */
              <div className="w-full h-full min-h-[400px] bg-gradient-to-br from-[#0BBCD4]/10 to-[#0891b2]/10 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#0BBCD4]/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#0BBCD4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium">{t("mapPlaceholder")}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
