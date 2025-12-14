/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { 
        sans: ['Cairo', 'sans-serif'] 
      },
      colors: {
        primary: { 
          50: '#f0fdf4', // خلفيات فاتحة جداً
          100: '#dcfce7',
          500: '#006c35', 
          600: '#00582b', // اللون الرسمي
          700: '#004522', 
          800: '#00361a',
          900: '#002010'
        },
        secondary: { 
          gold: '#c5a065', // الذهبي الرسمي
          light: '#e8dec8',
          dark: '#a38045'
        },
        surface: '#ffffff',
        background: '#f8fafc' // رمادي مائل للأزرق خفيف جداً للخلفية العامة
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}