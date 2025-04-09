/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Neue Haas Grotesk Display Pro"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'], 
      },
      animation: {
        'gradient-left-to-right': 'gradient-left-to-right 3s linear infinite',
      },
      keyframes: {
        'gradient-left-to-right': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide"),],
};
