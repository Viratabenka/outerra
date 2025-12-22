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
        primary: {
          50: "#f0f9f4",
          100: "#dcf2e3",
          200: "#bce4cb",
          300: "#8fcea8",
          400: "#5ab07e",
          500: "#36915d",
          600: "#27744a",
          700: "#215c3d",
          800: "#1d4a33",
          900: "#183d2b",
        },
        accent: {
          50: "#fef3f2",
          100: "#fee4e2",
          200: "#fececa",
          300: "#fdaba5",
          400: "#fa7a70",
          500: "#f24e42",
          600: "#df2f22",
          700: "#bb2419",
          800: "#9a2118",
          900: "#80221a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;

