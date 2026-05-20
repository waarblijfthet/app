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
        background: "#F5F0E8",
        card: "#FDFAF4",
        primary: "#1C3A2A",
        "text-soft": "#4A5E4E",
        "text-muted": "#8A9E8E",
        accent: "#C4603A",
        "accent-bg": "#FAF0EB",
        "green-light": "#E8F2EC",
        "dark-block": "#1C3A2A",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 20px rgba(28, 58, 42, 0.08)",
        "card-hover": "0 4px 32px rgba(28, 58, 42, 0.12)",
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
