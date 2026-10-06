import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import GlobalEffects from "@/components/ui/GlobalEffects";
import { ADOBE_FONTS_KIT_ID, ADOBE_FONTS_BASE_URL } from "@/lib/config";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
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
    <html
      lang="sk"
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <body>
        {/*
          Adobe Fonts web project (licensed Athelas) — only when the kit ID is set.
          Deliberately NOT inside an explicit <head> and deliberately a ternary → null:
          a custom <head> in the root layout plus an empty-string child ("" from `id && …`)
          caused a hydration mismatch that made React discard the server HTML and crash
          (React error #329, blank hero). A stylesheet <link> is valid in <body>.
        */}
        {ADOBE_FONTS_KIT_ID ? (
          <link rel="stylesheet" href={`${ADOBE_FONTS_BASE_URL}/${ADOBE_FONTS_KIT_ID}.css`} />
        ) : null}
        <GlobalEffects />
        {children}
      </body>
    </html>
  );
}
