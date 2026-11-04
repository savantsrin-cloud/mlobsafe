/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Kantumruy Pro"', 'system-ui', '-apple-system', 'sans-serif'],
        khmer: ['"Kantumruy Pro"', 'system-ui', 'sans-serif']
      },
      colors: {
        shade: {
          50: '#FBF9F5',
          100: '#F5EFE6',
          200: '#E8DCCB',
          800: '#1E293B',
          900: '#0F172A',
        },
        heat: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
        },
        water: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
        },
        emergency: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
        },
        safe: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
        }
      }
    },
  },
  plugins: [],
}
