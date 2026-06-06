/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // found this on a reddit post lol, looks clean
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'Fira Code'", "monospace"],
      },
      colors: {
        bg: {
          base: "#0f1117",
          surface: "#161b22",
          elevated: "#1c2333",
          hover: "#21293d",
        },
        accent: {
          // spent like 2 hours picking this purple lol
          purple: "#a78bfa",
          blue: "#60a5fa",
          green: "#34d399",
          orange: "#fb923c",
          pink: "#f472b6",
        },
        border: {
          DEFAULT: "#30363d",
          light: "#21293d",
        },
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.3)",
        "card-hover": "0 4px 16px rgba(0,0,0,0.4)",
      },
      animation: {
        shimmer: "shimmer 1.8s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};
