/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // New light‑blue theme for the outer site
        brand: {
          bg: '#E3F2FD',
          surface: '#FFFFFF',
          surfaceAlt: '#F8FBFF',
          primary: '#1E88E5',
          primaryDark: '#0D47A1',
          text: '#0D47A1',
          textMuted: '#546E7A',
        },
        cream: '#F1E5C6',
        // Keep any existing colours your other pages rely on
        lime: '#C6FF3D',
        yellow: '#FFD23F',
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', ...],
      },
      borderRadius: {
        'iphone': '50px',
      },
      boxShadow: {
        'iphone': '0 12px 24px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
};
