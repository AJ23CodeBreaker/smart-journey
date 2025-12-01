/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Rubik"', '"Noto Sans HK"', '"Noto Sans SC"', 'sans-serif'],
        hand: ['"Patrick Hand"', '"Noto Sans HK"', '"Noto Sans SC"', 'cursive'],
      },
      colors: {
        brand: {
          50: '#fff0f1',
          100: '#ffe1e3',
          200: '#ffc4c9',
          300: '#ffa5ad',
          400: '#fe7a86',
          500: '#e63946', /* Deep Red - Academic & Prestigious */
          600: '#cc1f2e',
          700: '#a6121f',
          800: '#850d18',
          900: '#690812',
          950: '#4a040b',
        }
      }
    }
  },
  plugins: [],
}