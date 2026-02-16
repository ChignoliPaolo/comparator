import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["monospace"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgb(0 0 0 / 0.06)",
        "soft-lg": "0 12px 40px -8px rgb(0 0 0 / 0.12)",
        glow: "0 0 40px -8px rgb(59 130 246 / 0.25)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
      },
      colors: {
        offerA: {
          DEFAULT: "hsl(217 91% 58%)",
          muted: "hsl(215 30% 70%)",
          border: "hsl(215 40% 85%)",
          bg: "hsl(217 60% 96%)",
          dark: "hsl(217 75% 45%)",
        },
        offerB: {
          DEFAULT: "hsl(162 73% 42%)",
          muted: "hsl(162 25% 55%)",
          border: "hsl(162 35% 85%)",
          bg: "hsl(162 50% 95%)",
          dark: "hsl(162 65% 32%)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
