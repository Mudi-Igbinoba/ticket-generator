import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#D9D9D9',
          200: '#24A0B5',
          300: '#197686',
          400: '#08252B',
          500: '#02191d',
          600: '#0A0C11',
          700: '#041E23',
          800: '#0E464F',
          900: '#05252C',
          1000: '#07373F',
          1100: '#052228',
          1200: '#2C545B',
          1300: '#12464E',
          1400: '#031E21',
          1500: '#08343C',
          1600: '#133D44'
        }
      },
      screens: {
        '2md': '991px',
        xs: '350px'
      },
      fontFamily: {
        alatsi: ['var(--font-alatsi)'],
        roboto: ['var(--font-roboto)']
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config;
