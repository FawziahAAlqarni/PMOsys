/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          '50': '#f0f9ff',
          '600': '#00582b',
          '800': '#003d1f',
          '900': '#001a0f',
        },
        'secondary': {
          'gold': '#d4af37',
        },
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 16px rgba(0, 88, 43, 0.1)',
      },
    },
  },
  plugins: [],
}
