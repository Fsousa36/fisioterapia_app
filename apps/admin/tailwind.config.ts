import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "#d8dee4",
        background: "#f8fafc",
        foreground: "#0f172a",
        primary: "#0f766e",
        muted: "#64748b"
      }
    }
  },
  plugins: []
};

export default config;
