import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "navy-dark": "#001f3f",
        "navy-medium": "#003366",
        "navy-light": "#00509e",
        "gold-classic": "#FFCC00",
        white: "#ffffff",
        "off-white": "#f8f9fa",
      },
    },
  },
  plugins: [daisyui],
};
export default config;
