import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        accent: {
          100: '#73a5ff',
          300: '#4c8dff',
          500: '#397df6',
          700: '#2f68cc',
          900: '#234e99',
        },
        success: {
          100: '#80ffbf',
          300: '#22e584',
          500: '#14cc70',
          700: '#0f9954',
          900: '#0a6638',
        },
        danger: {
          100: '#ff8099',
          300: '#f23d61',
          400: '#ff0000',
          500: '#cc1439',
          700: '#990f2b',
          900: '#660a1d',
        },
        warning: {
          100: '#ffd073',
          300: '#e5ac39',
          500: '#d99000',
          700: '#996600',
          900: '#664400',
        },
        dark: {
          100: '#4c4c4c',
          300: '#333333',
          500: '#171717',
          600: '#212121',
          700: '#0d0d0d',
          900: '#000000',
        },
        light: {
          100: '#ffffff',
          300: '#f7fbff',
          500: '#edf3fa',
          700: '#d5dae0',
          900: '#8d9094',
        },
      },
      fontFamily: {
        primary: ['Inter', 'sans-serif'],
      },
      fontSize: {
        xxs: '0.625rem',
        xs: '0.75rem',
        s: '0.875rem',
        m: '1rem',
        l: '1.125rem',
        xl: '1.25rem',
        xxl: '1.625rem',
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      lineHeight: {
        xs: '8px',
        s: '16px',
        m: '24px',
        l: '36px',
      },
      backgroundColor: {
        overlay: 'rgba(0, 0, 0, 0.60)',
      },
    },
  },
  plugins: [],
} satisfies Config
