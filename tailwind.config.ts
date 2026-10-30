import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary
        turquoise: "#4BC6C8",
        "med-blue": "#7ED6E0",
        // Secondary
        "powder-pink": "#F4D7D0",
        champagne: "#F5EFE6",
        beige: "#EDE4D8",
        // Accent — use sparingly
        gold: "#C6A769",
        // Action accent — CTAs, highlighted keywords, focus badges
        amber: {
          DEFAULT: "#F59E0B",
          dark: "#D97706",
        },
      },
      fontFamily: {
        // Body — Google Sans (next/font/local in app/layout.tsx)
        sans: ["var(--font-google-sans)", "system-ui", "sans-serif"],
        body: ["var(--font-google-sans)", "system-ui", "sans-serif"],
        // Legacy class name used across components; now resolves to Google Sans.
        inter: ["var(--font-google-sans)", "system-ui", "sans-serif"],
        // Headings — Oswald. `display` and `heading` are both kept so components don't change.
        oswald: ["var(--font-oswald)", "Arial Narrow", "system-ui", "sans-serif"],
        display: ["var(--font-oswald)", "Arial Narrow", "system-ui", "sans-serif"],
        heading: ["var(--font-oswald)", "Arial Narrow", "system-ui", "sans-serif"],
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        shimmer: "shimmer 2.4s infinite linear",
        "ken-burns": "ken-burns 12s ease-in-out infinite alternate",
        "fade-in": "fade-in 1.2s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
