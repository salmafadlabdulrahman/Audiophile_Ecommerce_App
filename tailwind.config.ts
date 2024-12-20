import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#191919",
        orange: "#d87d41",
        gray: "#f1f1f1",
        darkGray: "#00000080"
      },
    },
  },
  plugins: [],
} satisfies Config;
