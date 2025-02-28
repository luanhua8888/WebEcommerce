/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E6E6FA',
        'primary-dark': '#D8BFD8',
        secondary: '#D8BFD8',
        tertiary: '#C8A2C8',
        danger: '#e3342f',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 1.5s infinite',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #E6E6FA, #D8BFD8, #C8A2C8)',
      },
    },
  },
  plugins: [],
}