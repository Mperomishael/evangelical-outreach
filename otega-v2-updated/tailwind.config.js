/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          /* Primary blue */
          blue: '#1E5AA8',
          blueDark: '#154785',
          sky: '#3B82F6',
          soft: '#E8F1FB',
          /* Milk → white surfaces */
          milk: '#FFFEF9',
          cream: '#F7F4EF',
          white: '#FFFFFF',
          /* Text */
          ink: '#0F172A',
          muted: '#64748B',
          border: '#E2E8F0',
        },
        /* Aliases so any leftover class names still resolve */
        lime: '#1E5AA8',
        yellow: '#3B82F6',
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Manrope', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        iphone: '50px',
      },
      boxShadow: {
        soft: '0 4px 24px rgba(15, 23, 42, 0.06)',
        card: '0 1px 3px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.04)',
        iphone: '0 12px 24px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
};
