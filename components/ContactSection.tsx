"use client";

import { motion } from "framer-motion";
import { useT, useContent, useI18n } from "@/lib/i18n";
import { useState } from "react";
import { GOOGLE_MAPS_EMBED_URL, WHATSAPP_NUMBER, WHATSAPP_BASE_URL } from "@/lib/config";

// TODO: Replace GOOGLE_MAPS_EMBED_URL in lib/config.ts with the real Google My Business embed URL
// TODO: Replace GOOGLE_PLACE_ID in lib/config.ts when live Google reviews are needed

const FIELD_CLASS =
  "w-full px-5 py-4 rounded-2xl border border-champagne bg-champagne/50 focus:bg-white focus:border-turquoise/50 focus:outline-none focus:ring-2 focus:ring-turquoise/20 transition-all font-inter text-[15px] text-gray-800 placeholder-gray-400";

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ContactSection() {
  const { t } = useT("contact");
  const { locale } = useI18n();
  const c = useContent();
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", website: "" });
  const [waUrl, setWaUrl] = useState<string | null>(null);

  // WhatsApp lead magnet: the visitor is sent to WhatsApp with a pre-filled message, and a
  // copy of the lead is forwarded to /api/contact (Resend) in the background. Both happen in
  // the same click handler — window.open must run synchronously inside the user gesture or
  // Safari/mobile popup blockers swallow it, so we never `await` the email request first.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const values: Record<string, string> = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      message: form.message.trim() || "—",
    };

    // Background email copy — failures are irrelevant to the visitor (WhatsApp is the real handoff)
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, message: form.message.trim(), locale }),
      keepalive: true,
    }).catch(() => {});

    const text = t("waMessage").replace(
      /\{(name|phone|email|message)\}/g,
      (_, key: string) => values[key]
    );
    const url = `${WHATSAPP_BASE_URL}/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url; // popup blocked — fall back to same-tab navigation

    setWaUrl(url);
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
          <h2 className="font-heading text-5xl md:text-6xl font-semibold text-gray-900">
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
            {waUrl ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-turquoise/10 flex items-center justify-center mb-5">
                  <svg className="w-8 h-8 text-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-heading text-3xl font-semibold text-gray-900 mb-2">
                  {c("contact_success")}
                </h3>
                <div className="h-px w-12 bg-gold mx-auto mt-4 mb-6" />
                {/* Re-open link — covers the case where the browser blocked the new tab */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-inter text-sm font-medium text-turquoise hover:text-gray-900 transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  {c("contact_whatsapp_button")}
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot — hidden from people, bots fill it; /api/contact drops those leads */}
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />
                {/* Name */}
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder={c("contact_field_name")}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className={FIELD_CLASS}
                />
                {/* Phone */}
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  placeholder={c("contact_field_phone")}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                  className={FIELD_CLASS}
                />
                {/* Email */}
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder={c("contact_field_email")}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className={FIELD_CLASS}
                />
                {/* Message / goals */}
                <textarea
                  name="message"
                  placeholder={c("contact_field_message")}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  className={`${FIELD_CLASS} resize-none`}
                />
                <button
                  type="submit"
                  className="group btn-sheen w-full py-4 bg-turquoise text-white font-inter font-semibold text-sm rounded-2xl hover:bg-turquoise/90 hover:scale-[1.02] hover:shadow-lg hover:shadow-turquoise/25 transition-all duration-300 inline-flex items-center justify-center gap-2.5"
                >
                  <WhatsAppIcon />
                  {c("contact_whatsapp_button")}
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
