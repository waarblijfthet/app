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
        background: "#F7F8F7",
        card: "#FFFFFF",
        primary: "#16211F",
        "text-soft": "#4A5A56",
        "text-muted": "#8B958F",
        accent: "#0B7A6E",
        "accent-bg": "#E4F1EE",
        "green-light": "#E7F1EE",
        "dark-block": "#16211F",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 20px rgba(22, 33, 31, 0.08)",
        "card-hover": "0 4px 32px rgba(22, 33, 31, 0.12)",
      },
      borderRadius: {
        DEFAULT: "12px",
        lg: "16px",
        xl: "20px",
      },
      animation: {
        "float-1": "float1 6s ease-in-out infinite",
        "float-2": "float2 8s ease-in-out infinite",
        "float-3": "float3 7s ease-in-out infinite",
      },
      keyframes: {
        float1: {
          "0%, 100%": { transform: "translateY(0px) rotate(-1deg)" },
          "50%": { transform: "translateY(-12px) rotate(-1deg)" },
        },
        float2: {
          "0%, 100%": { transform: "translateY(0px) rotate(1.5deg)" },
          "50%": { transform: "translateY(-8px) rotate(1.5deg)" },
        },
        float3: {
          "0%, 100%": { transform: "translateY(0px) rotate(-0.5deg)" },
          "50%": { transform: "translateY(-16px) rotate(-0.5deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
