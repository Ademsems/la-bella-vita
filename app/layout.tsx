import type { Metadata } from "next";
import localFont from "next/font/local";
import GlobalEffects from "@/components/ui/GlobalEffects";
import "./globals.css";

// Both families are SIL OFL-licensed (free to self-host). Files live in app/fonts/ as
// Latin + Latin-Extended subsets (covers Slovak diacritics) of the variable fonts.
// `fallback` keeps text visible and the layout close while the woff2 loads.

// Primary / headings
const oswald = localFont({
  src: "./fonts/Oswald-Variable.woff2",
  weight: "200 700",
  style: "normal",
  variable: "--font-oswald",
  display: "swap",
  fallback: ["Arial Narrow", "system-ui", "sans-serif"],
});

// Secondary / body
const googleSans = localFont({
  src: [
    { path: "./fonts/GoogleSans-Variable.woff2", style: "normal" },
    { path: "./fonts/GoogleSans-Italic-Variable.woff2", style: "italic" },
  ],
  weight: "400 700",
  variable: "--font-google-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

// Metadata is static (single-route App Router, no per-locale paths) — defaults to
// Slovak per the project's SK-source-language rule. EN visitors still see this
// title in the browser tab; the in-page content still toggles via lib/i18n.tsx.
export const metadata: Metadata = {
  title: "LBV - Umenie žiť krásny život",
  description:
    "Prémiový wellness a osobný tréning s Alessandrom. Pohyb, výživa, komunita a mentalita — štyri piliere krásneho života.",
  openGraph: {
    title: "La Bella Vita",
    description: "Ži krásny život.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk" className={`${oswald.variable} ${googleSans.variable}`}>
      <body>
        <GlobalEffects />
        {children}
      </body>
    </html>
  );
}
