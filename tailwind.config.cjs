/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      column_3: '1680px',
    },
    extend: {
      colors: {
        orange: '#FF6B00',
        white: '#fff',
        black: '#000',
        gray: '#D9D9D9',
        gray_100: '#FAFAFA',
        gray_200: '#F1F1F1',
        gray_300: '#E3E3E3',
        gray_400: '#D2D2D2',
        gray_700: '#717171',
        gray_900: '#1B1B1B',
        black_300: 'rgba(0, 0, 0, 0.30)',
      },
      dropShadow: {
        container: 'drop-shadow(0px 4px 44px rgba(0, 0, 0, 0.12))',
        card_container: 'box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.04)',
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
