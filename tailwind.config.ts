import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary 1: Orange
        orange: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316",
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
        },
        heat: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          500: "#F97316",
          600: "#EA580C",
          700: "#C2410C",
        },
        // Primary 2: Light Blue
        lightblue: {
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          300: "#7DD3FC",
          400: "#38BDF8",
          500: "#0EA5E9",
          600: "#0284C7",
          700: "#0369A1",
        },
        cooling: {
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          500: "#0EA5E9",
          600: "#0284C7",
          700: "#0369A1",
        },
        // Primary 3: Crisp White & Slate
        cream: {
          50: "#FFFFFF",
          100: "#F8FAFC",
          200: "#F1F5F9",
          300: "#E2E8F0",
        },
        // Supporting: Red for Danger/Emergency
        danger: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
        },
        // Supporting: Green for Safety
        safety: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
        },
      },
      fontFamily: {
        sans: ["var(--font-kantumruy)", "var(--font-battambang)", "'Kantumruy Pro'", "'Battambang'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        khmer: ["var(--font-kantumruy)", "var(--font-battambang)", "'Kantumruy Pro'", "'Battambang'", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(14, 165, 233, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)",
        card: "0 10px 30px -4px rgba(2, 132, 199, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};
export default config;
