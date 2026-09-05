/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        marine: {
          950: '#040914',
          900: '#071326',
          850: '#0b1d38',
          800: '#10274c',
          700: '#193b6e',
          600: '#235396',
          500: '#3272c7',
        },
        biolum: {
          cyan: '#06b6d4',
          glow: '#22d3ee',
          emerald: '#10b981',
          seafoam: '#34d399',
          amber: '#f59e0b',
          coral: '#f43f5e',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.3)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
        'glow-coral': '0 0 25px -5px rgba(244, 63, 94, 0.3)',
        'glow-subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 0 15px -3px rgba(6, 182, 212, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'ripple': 'ripple 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
