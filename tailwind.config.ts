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
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        offerA: {
          DEFAULT: "hsl(217 91% 60%)",
          muted: "hsl(215 20% 65%)",
          border: "hsl(215 25% 27%)",
          bg: "hsl(217 33% 97%)",
        },
        offerB: {
          DEFAULT: "hsl(160 84% 39%)",
          muted: "hsl(160 20% 55%)",
          border: "hsl(160 25% 27%)",
          bg: "hsl(160 33% 97%)",
        },
      },
      fontFamily: {
        sans: ["system-ui", "sans-serif"],
        mono: ["monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
