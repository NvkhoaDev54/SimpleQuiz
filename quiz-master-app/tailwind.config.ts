import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*. {js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#135bec",
          hover: "#1d66f0",
          dark: "#0e45b5",
        },
        background: {
          light: "#f6f6f8",
          dark: "#101622",
        },
        surface: {
          light: "#ffffff",
          dark: "#1e293b",
        },
        card: {
          light: "#ffffff",
          dark: "#1c1f27",
        },
        border: {
          light: "#e5e7eb",
          dark: "#282e39",
        },
        text: {
          secondary: "#9da6b9",
        },
        success: "#22c55e",
        error: "#ef4444",
      },
      fontFamily: {
        display: ["var(--font-lexend)", "sans-serif"],
        body: ["var(--font-noto-sans)", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
      },
    },
  },
  plugins: [],
};

export default config;
