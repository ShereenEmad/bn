/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'gradient': 'gradient 6s ease infinite',
        'float': 'float 3s ease-in-out infinite',
        'float-delayed': 'float 3s ease-in-out infinite 1.5s',
        'spin-slow': 'spin 8s linear infinite',
        'spin-reverse': 'spin 6s linear infinite reverse',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'orbit': 'orbit 4s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        orbit: {
          '0%': { 
            transform: 'rotate(0deg) translateX(20px) rotate(0deg)',
            left: '50%',
            top: '50%'
          },
          '100%': { 
            transform: 'rotate(360deg) translateX(20px) rotate(-360deg)',
            left: '50%',
            top: '50%'
          },
        },
      },
      fontFamily: {
        'arabic': ['Tajawal', 'sans-serif'],
      },
    },
  },
  plugins: [],
};