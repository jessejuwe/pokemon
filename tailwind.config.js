/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--primary) / <alpha-value>)',
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
      screens: {
        mdx: '720px', // => @media (min-width: 720px) { ... }
        big: '900px', // => @media (min-width: 900px) { ... }
        exLG: '1009px', // => @media (min-width: 1200px) { ... }
        wide: '2000px', // => @media (min-width: 2000px) { ... }
      },
    },
  },
  plugins: [],
};
