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
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        cormorant: ["var(--font-cormorant)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        // Reversible display/heading tokens — see the ROLLBACK note above
        // --font-display/--font-heading in app/globals.css.
        display: ["var(--font-display)", "serif"],
        heading: ["var(--font-heading)", "serif"],
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
