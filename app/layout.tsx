import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import { I18nProvider } from "@/lib/i18n";
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
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
