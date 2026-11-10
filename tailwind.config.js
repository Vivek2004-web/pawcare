/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fffdf9',
          100: '#fef8ee',
          200: '#fdf0d5',
          300: '#fae3b8',
        },
        paw: {
          orange: '#ff7043',
          amber: '#f59e0b',
          green: '#10b981',
          softgreen: '#34d399',
          dark: '#1f2937',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -10px rgba(0,0,0,0.06), 0 4px 10px -4px rgba(0,0,0,0.04)',
        'soft-lg': '0 20px 40px -15px rgba(249, 115, 22, 0.12), 0 8px 20px -6px rgba(0,0,0,0.05)',
      }
    },
  },
  plugins: [],
}

