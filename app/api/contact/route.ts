import { NextResponse } from "next/server";
import {
  RESEND_API_URL,
  RESEND_API_KEY,
  CONTACT_TO_EMAIL,
  CONTACT_FROM_EMAIL,
} from "@/lib/config";

// ─────────────────────────────────────────────────────────────────────────────
// Lead forwarding for the WhatsApp lead-magnet form (components/ContactSection.tsx).
//
// The visitor is already being sent to WhatsApp by the time this runs, so this
// endpoint is a best-effort background copy of the lead to email. It must never
// be the reason the form "fails": with no RESEND_API_KEY / CONTACT_TO_EMAIL it
// logs the lead server-side and returns 200 { delivered: false }.
// Calls Resend's REST API directly (no SDK dependency).
// ─────────────────────────────────────────────────────────────────────────────

export const dynamic = "force-dynamic";

const MAX = { name: 120, phone: 40, email: 200, message: 3000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot — real visitors never see/fill this field; bots do.
  if (clean(body.website, 50)) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const name = clean(body.name, MAX.name);
  const phone = clean(body.phone, MAX.phone);
  const email = clean(body.email, MAX.email);
  const message = clean(body.message, MAX.message);
  const locale = body.locale === "en" ? "en" : "sk";

  if (!name || !phone || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) {
    console.log("[contact] RESEND_API_KEY / CONTACT_TO_EMAIL not set — lead not emailed:", {
      name,
      phone,
      email,
      message,
      locale,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  const html = `
    <h2>New La Bella Vita lead</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Site language:</strong> ${locale.toUpperCase()}</p>
    <p><strong>Message / goals:</strong></p>
    <p>${message ? escapeHtml(message).replace(/\n/g, "<br>") : "—"}</p>
    <hr>
    <p style="color:#888;font-size:12px">The visitor was also sent to WhatsApp with this information pre-filled.</p>
  `;

  try {
    const res = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `New lead: ${name}`,
        html,
      }),
    });

    if (!res.ok) {
      console.error("[contact] Resend rejected the email:", res.status, await res.text());
      return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] Resend request failed:", err);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
}
