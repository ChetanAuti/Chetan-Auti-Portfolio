/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#050816',
        panel: 'rgba(11, 17, 32, 0.72)',
        accent: '#6ee7ff',
        accent2: '#8b5cf6',
      },
      boxShadow: {
        glow: '0 0 30px rgba(110, 231, 255, 0.22)',
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at top, rgba(110, 231, 255, 0.18), transparent 40%), radial-gradient(circle at bottom right, rgba(139, 92, 246, 0.18), transparent 35%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.9' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};