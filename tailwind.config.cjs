/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: '#FF6B00',
        white: '#fff',
        black: '#000',
        gray: '#D9D9D9',
        gray_300: '#E3E3E3',
        gray_400: '#D2D2D2',
      },
      dropShadow: {
        container: 'drop-shadow(0px 4px 44px rgba(0, 0, 0, 0.12))',
      },
    },
  },
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar-hide'),
  ],
};
