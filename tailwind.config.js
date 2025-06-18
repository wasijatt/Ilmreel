/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Primary colors - Your brand color
        primary: {
          50: '#e1e1e1',
        
          600: '#059669',
          700: '#04875e',
       
        },
        // Secondary colors - Neutral tones
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Accent colors
        accent: {
          blue: '#3b82f6',
          purple: '#8b5cf6',
          pink: '#ec4899',
          orange: '#f97316',
        },
        // Semantic colors
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
        // Background colors
        background: {
          light: '#ffffff',
          DEFAULT: '#f8fafc',
          dark: '#f1f5f9',
        },
        // Text colors
        text: {
          light: '#64748b',
          DEFAULT: '#334155',
          dark: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      spacing: {
        'sidebar': '16rem',
        'header': '4rem',
        'mobile-nav': '4rem',
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-out': 'slideOut 0.3s ease-in',
        'fade-in': 'fadeIn 0.2s ease-out',
        'fade-out': 'fadeOut 0.2s ease-in',
        'scale-in': 'scaleIn 0.2s ease-out',
        'scale-out': 'scaleOut 0.2s ease-in',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
      },
      boxShadow: {
        'sidebar': '0 0 15px -3px rgba(0, 0, 0, 0.1)',
        'modal': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'button': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'sidebar': '0.5rem',
        'modal': '0.75rem',
        'button': '0.375rem',
      },
      transitionTimingFunction: {
        'sidebar': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'modal': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'button': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'sidebar': '300ms',
        'modal': '200ms',
        'button': '150ms',
      },
      zIndex: {
        'sidebar': '40',
        'modal': '50',
        'toast': '60',
        'dropdown': '30',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
