import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: "#0E79B2",
        onPrimary: "#ffffff",

        secondary: "#F7B32B",
        onSecondary: "#1e1e1e",

        accent: "#FF3C38",
        onAccent: "#ffffff",

        // Backgrounds
        background: "#F1F5F9",
        surface: "#ffffff",
        muted: "#94A3B8",

        // Text colors
        text: "#1E293B",
        subtle: "#475569",

        // Border colors
        border: "#E2E8F0",

        // States
        success: "#22C55E",
        error: "#EF4444",
        warning: "#F59E0B",
        info: "#3B82F6",
      },
    },
  },
  plugins: [],
};

export default config;
