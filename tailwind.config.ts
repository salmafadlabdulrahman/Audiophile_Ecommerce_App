import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			black: '#191919',
  			orange: '#d87d41',
  			gray: '#f1f1f1',
  			darkGray: '#00000080',
  			lightGray: '#ffffff80',
			lightBlack: "#3d3d3d",
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		screens: {
			"xs": "300px",
			"sm": "390px",
			"pre-md": "740px",
			"md": "768px"
		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
